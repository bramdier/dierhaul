"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PlaneIcon } from "lucide-react";
import { FormEvent, useState } from "react";

function parseAwb(value: string) {
  const compact = value.replace(/[\s-]/g, "");
  if (!/^\d{11}$/.test(compact)) return null;
  return `${compact.slice(0, 3)}-${compact.slice(3)}`;
}

export default function AwbLookup() {
  const [awb, setAwb] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [checkedAwb, setCheckedAwb] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseAwb(awb);
    if (!parsed) {
      setInvalid(true);
      setCheckedAwb(null);
      return;
    }
    setInvalid(false);
    setAwb(parsed);
    setCheckedAwb(parsed);
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          <Field data-invalid={invalid || undefined}>
            <FieldLabel htmlFor="awb">Air waybill</FieldLabel>
            <Input
              id="awb"
              name="awb"
              inputMode="numeric"
              autoComplete="off"
              placeholder="126-12345678"
              aria-invalid={invalid || undefined}
              value={awb}
              onChange={(event) => {
                setAwb(event.target.value);
                setInvalid(false);
              }}
            />
            <FieldDescription>
              Three-digit airline prefix, then eight digits.
            </FieldDescription>
            {invalid ? (
              <FieldError>Enter an air waybill as 123-12345678.</FieldError>
            ) : null}
          </Field>
          <Button type="submit">Look up AWB</Button>
        </FieldGroup>
      </form>
      {checkedAwb ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PlaneIcon />
            </EmptyMedia>
            <EmptyTitle>No airline status for {checkedAwb}</EmptyTitle>
            <EmptyDescription>
              Airline tracking reads FSU status messages — received from the
              shipper, departed, arrived, received from the flight, ready for
              delivery, and delivered — including offload discrepancies. ONE
              Record is the later source for the same shipment. This lookup is
              not connected to that feed. The Express (DHL) tab cannot trace an
              airline air waybill.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DEMO_EMAIL, DEMO_WHATSAPP } from "@/lib/module-content";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function DemoForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [invalid, setInvalid] = useState({
    name: false,
    email: false,
    message: false,
  });

  function update(key: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextInvalid = {
      name: values.name.trim().length === 0,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()),
      message: values.message.trim().length === 0,
    };
    setInvalid(nextInvalid);
    if (nextInvalid.name || nextInvalid.email || nextInvalid.message) {
      return;
    }

    const subject = "Demo request — Dierhaul";
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Company: ${values.company.trim() || "—"}`,
      "",
      values.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${DEMO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const whatsappHref = `https://wa.me/${DEMO_WHATSAPP}?text=${encodeURIComponent("I would like a demo of Dierhaul for airline cargo.")}`;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        <Field data-invalid={invalid.name || undefined}>
          <FieldLabel htmlFor="demo-name">Name</FieldLabel>
          <Input
            id="demo-name"
            name="name"
            autoComplete="name"
            aria-invalid={invalid.name || undefined}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
          />
          {invalid.name ? <FieldError>Enter your name.</FieldError> : null}
        </Field>
        <Field data-invalid={invalid.email || undefined}>
          <FieldLabel htmlFor="demo-email">Work email</FieldLabel>
          <Input
            id="demo-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={invalid.email || undefined}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
          />
          {invalid.email ? (
            <FieldError>Enter a valid email address.</FieldError>
          ) : null}
        </Field>
        <Field>
          <FieldLabel htmlFor="demo-company">Airline or company</FieldLabel>
          <Input
            id="demo-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
          />
          <FieldDescription>Optional.</FieldDescription>
        </Field>
        <Field data-invalid={invalid.message || undefined}>
          <FieldLabel htmlFor="demo-message">What do you want to see?</FieldLabel>
          <Textarea
            id="demo-message"
            name="message"
            rows={5}
            aria-invalid={invalid.message || undefined}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
          />
          {invalid.message ? (
            <FieldError>Tell us which part of the operation to walk through.</FieldError>
          ) : null}
        </Field>
      </FieldGroup>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">Request a demo</Button>
        <Button
          nativeButton={false}
          render={
            <a href={whatsappHref} rel="noopener noreferrer" target="_blank" />
          }
          variant="outline"
        >
          WhatsApp
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Submit opens an email to {DEMO_EMAIL} in your mail app. Nothing is
        stored by this form.
      </p>
    </form>
  );
}

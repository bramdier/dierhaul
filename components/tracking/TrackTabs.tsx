"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwbLookup from "@/components/tracking/AwbLookup";
import ShipmentTracker from "@/components/tracking/ShipmentTracker";
import type { TrackerConfig } from "@/lib/db/schema";

export default function TrackTabs({ config }: { config: TrackerConfig }) {
  return (
    <Tabs defaultValue="awb">
      <TabsList>
        <TabsTrigger value="awb">Air waybill</TabsTrigger>
        <TabsTrigger value="express">Express (DHL)</TabsTrigger>
      </TabsList>
      <TabsContent value="awb" className="pt-4">
        <AwbLookup />
      </TabsContent>
      <TabsContent value="express" className="pt-4">
        <div className="flex flex-col gap-4">
          <Alert>
            <AlertTitle>DHL Express support</AlertTitle>
            <AlertDescription>
              This lookup uses DHL Express. It does not track airline air
              waybills.
            </AlertDescription>
          </Alert>
          <ShipmentTracker config={config} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AwbLookup from "@/components/tracking/AwbLookup";
import ShipmentTracker from "@/components/tracking/ShipmentTracker";
import type { TrackerContent } from "@/lib/tracker-content";

export default function TrackTabs({ config }: { config: TrackerContent }) {
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
              This form is for express shipment numbers. It does not track
              airline air waybills, and live carrier lookup is not available
              on this site.
            </AlertDescription>
          </Alert>
          <ShipmentTracker config={config} />
        </div>
      </TabsContent>
    </Tabs>
  );
}

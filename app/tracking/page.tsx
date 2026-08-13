"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TrackingData {
  id: string;
  modality: string;
  status: string;
  origin: string;
  originTime: string;
  dest: string;
  destInfo: string;
  eta: string;
  commodity: string;
  weight: string;
  volume: string;
  mawb: string;
}

const sampleData: Record<string, TrackingData> = {
  "LGFX-89214": {
    id: "LGFX-89214-DXB-COK",
    modality: "Air Freight (Express)",
    status: "In Transit - On Schedule",
    origin: "Dubai (DXB)",
    originTime: "Departed: Aug 12, 06:15",
    dest: "Cochin (COK)",
    destInfo: "Final Hub Station",
    eta: "Tomorrow, 14:30 GST",
    commodity: "Industrial High-Precision Valves",
    weight: "1,420.00 KG",
    volume: "2.40 CBM (2 Skids)",
    mawb: "176-88291041",
  },
  "LGFX-44120": {
    id: "LGFX-44120-JBL-LON",
    modality: "Ocean Freight (FCL 40ft)",
    status: "At Sea - Vessel En Route",
    origin: "Jebel Ali Port (UAE)",
    originTime: "Departed: Aug 10, 11:30",
    dest: "Port of London (UK)",
    destInfo: "Final Hub Station",
    eta: "In 6 Days (Aug 18)",
    commodity: "Automotive Electrical Assemblies",
    weight: "18,500.00 KG",
    volume: "62.00 CBM (1 x 40ft HC)",
    mawb: "OOLU-992188210",
  },
  "LGFX-90113": {
    id: "LGFX-90113-DXB-RUH",
    modality: "Overland Road Freight (Bonded)",
    status: "Out for Final Delivery",
    origin: "Dubai, UAE",
    originTime: "Departed: Aug 13, 05:00",
    dest: "Riyadh Logistics Park, KSA",
    destInfo: "Final Destination",
    eta: "Today, 18:00 AST",
    commodity: "Commercial Retail Electronics",
    weight: "3,800.00 KG",
    volume: "14.50 CBM",
    mawb: "LGFX-TR-88190",
  },
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("LGFX-89214");
  const [currentData, setCurrentData] = useState<TrackingData>(sampleData["LGFX-89214"]);

  const handleSearch = (searchId: string) => {
    const q = searchId.toUpperCase().trim();
    setQuery(q);
    if (sampleData[q]) {
      setCurrentData(sampleData[q]);
    } else {
      setCurrentData({
        id: `${q}-CUSTOM-EXP`,
        modality: "General Freight Modality",
        status: "Active In Transit",
        origin: "Origin Dispatch Hub",
        originTime: "Departed: Recent",
        dest: "Destination Terminal",
        destInfo: "Final Hub Station",
        eta: "Within 48-72 Hours",
        commodity: "General Commercial Cargo",
        weight: "850.00 KG",
        volume: "1.80 CBM",
        mawb: "N/A",
      });
    }
  };

  useEffect(() => {
    const initialId = searchParams.get("id");
    if (initialId) {
      handleSearch(initialId);
    }
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <main className="flex-grow max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 w-full">
      {/* Search Bar Section */}
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-secondary-container shadow-sm mb-8">
        <div className="max-w-3xl">
          <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
            Satellite & Port Telemetry
          </span>
          <h1 className="font-headline-md text-2xl md:text-3xl font-bold text-on-background mb-4">
            Track Global Consignment
          </h1>

          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary">
                qr_code_scanner
              </span>
              <input
                id="trackingQuery"
                required
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-secondary-container bg-surface focus:ring-1 focus:ring-primary focus:border-primary text-sm font-mono"
                placeholder="Enter HAWB / BL / Tracking ID (e.g. LGFX-89214)"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-primary-container text-white px-7 py-3 rounded-lg font-label-bold text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">search</span>
              Search Consignment
            </button>
          </form>

          <div className="flex flex-wrap gap-2 items-center mt-3 text-xs text-secondary">
            <span>Quick Lookup Demos:</span>
            <button
              type="button"
              onClick={() => handleSearch("LGFX-89214")}
              className="px-2.5 py-1 bg-surface-container rounded hover:bg-surface-container-high text-primary font-mono font-medium"
            >
              LGFX-89214 (Air)
            </button>
            <button
              type="button"
              onClick={() => handleSearch("LGFX-44120")}
              className="px-2.5 py-1 bg-surface-container rounded hover:bg-surface-container-high text-primary font-mono font-medium"
            >
              LGFX-44120 (Ocean)
            </button>
            <button
              type="button"
              onClick={() => handleSearch("LGFX-90113")}
              className="px-2.5 py-1 bg-surface-container rounded hover:bg-surface-container-high text-primary font-mono font-medium"
            >
              LGFX-90113 (Road)
            </button>
          </div>
        </div>
      </div>

      {/* Active Tracking Dashboard */}
      <div id="trackingDashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Timeline & Checkpoints (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-secondary-container shadow-sm">
            {/* Summary Header */}
            <div className="flex flex-wrap justify-between items-start gap-4 pb-6 border-b border-secondary-container">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    id="badgeStatus"
                    className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {currentData.status}
                  </span>
                  <span
                    id="badgeModality"
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface-container text-on-surface"
                  >
                    {currentData.modality}
                  </span>
                </div>
                <h2
                  id="trackingIdDisplay"
                  className="font-mono text-xl md:text-2xl font-bold text-on-background"
                >
                  {currentData.id}
                </h2>
                <p className="text-xs text-secondary mt-0.5">
                  Master Air Waybill (MAWB):{" "}
                  <span className="font-mono font-bold text-on-surface">
                    {currentData.mawb}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-secondary block">
                  Estimated Final Delivery
                </span>
                <span
                  id="etaDisplay"
                  className="font-headline-md text-base md:text-lg font-bold text-primary"
                >
                  {currentData.eta}
                </span>
              </div>
            </div>

            {/* Route Visual Indicator */}
            <div className="py-6 flex items-center justify-between gap-4 text-center">
              <div className="flex-1">
                <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center mx-auto mb-2 shadow">
                  <span className="material-symbols-outlined text-lg">
                    flight_takeoff
                  </span>
                </div>
                <div id="originDisplay" className="font-bold text-sm text-on-background">
                  {currentData.origin}
                </div>
                <div className="text-[11px] text-secondary">
                  {currentData.originTime}
                </div>
              </div>

              <div className="flex-1 relative flex items-center justify-center">
                <div className="w-full h-1 bg-emerald-500 rounded"></div>
                <div className="absolute bg-emerald-600 text-white rounded-full p-1 shadow">
                  <span className="material-symbols-outlined text-xs">
                    local_shipping
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-2 border border-secondary-container">
                  <span className="material-symbols-outlined text-lg">
                    pin_drop
                  </span>
                </div>
                <div id="destDisplay" className="font-bold text-sm text-on-background">
                  {currentData.dest}
                </div>
                <div className="text-[11px] text-secondary">
                  {currentData.destInfo}
                </div>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-6 pt-4 border-t border-secondary-container">
              <h4 className="font-label-bold text-xs uppercase tracking-wider text-secondary">
                Milestone Progression
              </h4>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-secondary-container">
                {/* Step 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline">
                      <h5 className="font-bold text-xs md:text-sm text-on-background">
                        Customs Cleared & Pre-Border Passed
                      </h5>
                      <span className="text-[11px] text-secondary">Today, 11:20 GST</span>
                    </div>
                    <p className="text-xs text-secondary mt-0.5">
                      Air Cargo Clearance Terminal - Hub 2, Dubai International Airport.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline">
                      <h5 className="font-bold text-xs md:text-sm text-on-background">
                        Flight Departed & Transiting
                      </h5>
                      <span className="text-[11px] text-secondary">Today, 06:15 GST</span>
                    </div>
                    <p className="text-xs text-secondary mt-0.5">
                      Flight EK-530 en-route to Cochin International Airport Cargo Bay.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline">
                      <h5 className="font-bold text-xs md:text-sm text-on-background">
                        Cargo Manifest & Consolidation Sealed
                      </h5>
                      <span className="text-[11px] text-secondary">Yesterday, 19:40 GST</span>
                    </div>
                    <p className="text-xs text-secondary mt-0.5">
                      Logifex Al Qusais Distribution Warehouse Hub, UAE.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10">
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline">
                      <h5 className="font-bold text-xs md:text-sm text-on-background">
                        Booking Confirmed & Cargo Received
                      </h5>
                      <span className="text-[11px] text-secondary">Yesterday, 14:00 GST</span>
                    </div>
                    <p className="text-xs text-secondary mt-0.5">
                      Initial payload scan and hazardous materials check completed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Shipment Meta & Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cargo Details Card */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-secondary-container shadow-sm space-y-4">
            <h3 className="font-headline-md text-base font-bold text-on-background flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">inventory_2</span>
              Cargo Specifications
            </h3>

            <div className="text-xs space-y-2.5">
              <div className="flex justify-between pb-1.5 border-b border-secondary-container">
                <span className="text-secondary">Commodity:</span>
                <span id="metaCommodity" className="font-bold text-on-surface">
                  {currentData.commodity}
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-secondary-container">
                <span className="text-secondary">Gross Weight:</span>
                <span id="metaWeight" className="font-bold text-on-surface">
                  {currentData.weight}
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-secondary-container">
                <span className="text-secondary">Total Volume:</span>
                <span id="metaVolume" className="font-bold text-on-surface">
                  {currentData.volume}
                </span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-secondary-container">
                <span className="text-secondary">Incoterm:</span>
                <span className="font-bold text-on-surface">
                  CIF (Cost, Insurance, Freight)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Insurance Cover:</span>
                <span className="font-bold text-emerald-700">Fully Underwritten</span>
              </div>
            </div>

            <div className="pt-3 border-t border-secondary-container flex flex-col gap-2">
              <button
                onClick={() =>
                  alert("Digital e-Waybill & Customs Clearance Manifest downloaded successfully.")
                }
                className="w-full py-2.5 border border-secondary-container rounded-lg text-xs font-label-bold text-secondary hover:text-on-background hover:bg-surface transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download e-Manifest (PDF)
              </button>
              <Link
                href="/contact"
                className="w-full py-2.5 bg-surface text-primary rounded-lg text-xs font-label-bold text-center hover:bg-surface-container transition-colors"
              >
                Contact Assigned Dispatcher
              </Link>
            </div>
          </div>

          {/* Telemetry & Sensor Badge */}
          <div className="bg-surface p-6 rounded-2xl border border-secondary-container shadow-sm text-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-on-surface">
              <span className="material-symbols-outlined text-primary">sensors</span>
              Live Smart Sensor Status
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-white rounded-lg border border-secondary-container">
                <div className="text-secondary text-[10px] uppercase">Temperature</div>
                <div className="font-mono font-bold text-on-surface mt-0.5">
                  +21.4°C (Normal)
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-secondary-container">
                <div className="text-secondary text-[10px] uppercase">Shock / Tilt</div>
                <div className="font-mono font-bold text-emerald-700 mt-0.5">
                  0.02G (Stable)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary">Loading telemetry...</div>}>
      <TrackingContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
  const [service, setService] = useState("Air Freight");
  const [origin, setOrigin] = useState("Dubai, UAE");
  const [dest, setDest] = useState("Cochin (COK), India");
  const [weight, setWeight] = useState<number>(1250);
  const [dimL, setDimL] = useState<number>(120);
  const [dimW, setDimW] = useState<number>(80);
  const [dimH, setDimH] = useState<number>(100);
  const [cargoType, setCargoType] = useState("General Cargo (Palletized)");
  const [commodity, setCommodity] = useState("Industrial Electrical Parts");
  const [fullName, setFullName] = useState("Rashid Al Mansoori");
  const [company, setCompany] = useState("Apex Engineering Trading LLC");
  const [email, setEmail] = useState("logistics@apexeng.ae");
  const [phone, setPhone] = useState("+971 50 882 1920");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalRefId, setModalRefId] = useState("");
  const [priceEstimate, setPriceEstimate] = useState("");

  const cbm = ((dimL * dimW * dimH) / 1000000).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "LGFX-Q" + Math.floor(10000 + Math.random() * 90000);
    setModalRefId(ref);

    let estBase = 0;
    if (service.includes("Air")) estBase = weight * 1.6;
    else if (service.includes("Sea"))
      estBase = Math.max(weight * 0.4, parseFloat(cbm) * 180);
    else estBase = weight * 0.85;

    const low = Math.round(estBase);
    const high = Math.round(estBase * 1.25);
    setPriceEstimate(`$${low.toLocaleString()} - $${high.toLocaleString()} USD`);

    setModalOpen(true);
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      {/* Sidebar - Why Logifex? (4 columns on lg) */}
      <aside className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-6">
        <div className="bg-surface-container-lowest p-8 border border-secondary-container rounded-xl shadow-sm relative overflow-hidden">
          <div className="chevron-pattern absolute inset-0 opacity-20 pointer-events-none"></div>
          <h2 className="font-headline-md text-xl text-on-surface mb-6 relative z-10 font-bold">
            Why Ship with Logifex?
          </h2>

          <ul className="space-y-6 relative z-10">
            <li className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary-container shadow-sm">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <div>
                <h3 className="font-label-bold text-sm text-on-surface mb-0.5 font-bold">
                  Guaranteed Transit Speeds
                </h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Direct scheduled routes across Air, Ocean, and Multimodal
                  corridors worldwide.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary-container shadow-sm">
                <span className="material-symbols-outlined">account_tree</span>
              </div>
              <div>
                <h3 className="font-label-bold text-sm text-on-surface mb-0.5 font-bold">
                  Tailored Supply Route Strategy
                </h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Dedicated logistics engineers optimize payload capacity,
                  tariff structures, and lead times.
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 text-primary-container shadow-sm">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <h3 className="font-label-bold text-sm text-on-surface mb-0.5 font-bold">
                  Secure Handling & Telemetry
                </h3>
                <p className="text-secondary text-xs leading-relaxed">
                  Electronic documentation, scheduled dispatches, and end-to-end
                  cargo insurance.
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-secondary-container relative z-10">
            <p className="text-secondary font-label-bold text-xs uppercase tracking-wider mb-3">
              Need Immediate Assistance?
            </p>
            <div className="flex flex-col gap-2.5 text-sm font-medium">
              <a
                className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors"
                href="tel:+97145752307"
              >
                <span className="material-symbols-outlined text-base">call</span>
                UAE: +971 45752307
              </a>
              <a
                className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors"
                href="tel:+914842778899"
              >
                <span className="material-symbols-outlined text-base">call</span>
                India: +91 484 277 8899
              </a>
              <a
                className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors"
                href="mailto:info@logifexgroup.com"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                info@logifexgroup.com
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-secondary-container relative shadow-sm">
          <img
            alt="Logistics Warehouse"
            className="w-full h-52 object-cover"
            src="/images/warehouse.png"
          />
          <div className="p-4 bg-surface-container-lowest border-t border-secondary-container text-xs text-secondary">
            <span className="font-bold text-on-surface">
              Global Warehouse Hubs:
            </span>{" "}
            Consolidation & 3PL facilities across Dubai, Cochin, and London.
          </div>
        </div>
      </aside>

      {/* Form Area (8 columns on lg) */}
      <section className="lg:col-span-8 order-1 lg:order-2">
        <div className="mb-6">
          <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
            Instant Estimation & Booking
          </span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface font-bold mb-2">
            Request Freight Rate Quote
          </h1>
          <p className="text-secondary font-body-md text-sm">
            Provide your shipment parameters below to receive a customized rate
            and transit breakdown.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest border border-secondary-container rounded-xl p-6 md:p-10 shadow-sm flex flex-col gap-8"
        >
          {/* Step 1: Service Type */}
          <div>
            <h3 className="font-headline-md text-lg text-on-surface mb-4 flex items-center gap-3 font-bold">
              <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-label-bold text-xs">
                1
              </span>
              Select Transport Modality
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  id: "Air Freight",
                  label: "Air Freight",
                  time: "1-4 Days",
                  icon: "flight_takeoff",
                },
                {
                  id: "Sea Freight",
                  label: "Ocean / Sea",
                  time: "12-30 Days",
                  icon: "directions_boat",
                },
                {
                  id: "Road Freight",
                  label: "Road / Overland",
                  time: "Door-to-Door",
                  icon: "local_shipping",
                },
                {
                  id: "Multimodal",
                  label: "Multimodal",
                  time: "Optimized",
                  icon: "hub",
                },
              ].map((item) => (
                <label key={item.id} className="cursor-pointer relative">
                  <input
                    type="radio"
                    name="service"
                    value={item.id}
                    checked={service === item.id}
                    onChange={(e) => setService(e.target.value)}
                    className="peer sr-only"
                  />
                  <div className="border-2 border-secondary-container rounded-xl p-4 flex flex-col items-center gap-2 hover:border-primary-container transition-all peer-checked:border-primary-container peer-checked:bg-surface-container-low text-center">
                    <span className="material-symbols-outlined text-secondary peer-checked:text-primary-container text-3xl">
                      {item.icon}
                    </span>
                    <span className="font-label-bold text-xs text-on-surface">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-secondary">
                      {item.time}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <hr className="border-secondary-container" />

          {/* Step 2: Routing */}
          <div>
            <h3 className="font-headline-md text-lg text-on-surface mb-4 flex items-center gap-3 font-bold">
              <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-label-bold text-xs">
                2
              </span>
              Origin & Destination Routing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Origin Location / Port *
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">
                    location_on
                  </span>
                  <input
                    required
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm"
                    placeholder="e.g. Dubai Port (DXB / Jebel Ali)"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Destination Location / Port *
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">
                    pin_drop
                  </span>
                  <input
                    required
                    value={dest}
                    onChange={(e) => setDest(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm"
                    placeholder="e.g. Cochin Port (COK), India"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-secondary-container" />

          {/* Step 3: Shipment Details */}
          <div>
            <h3 className="font-headline-md text-lg text-on-surface mb-4 flex items-center gap-3 font-bold">
              <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-label-bold text-xs">
                3
              </span>
              Payload & Dimension Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Total Gross Weight (KG) *
                </label>
                <input
                  required
                  min={1}
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm"
                  placeholder="e.g. 1500"
                  type="number"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Dimensions (L × W × H in cm) — Volume:{" "}
                  <span className="text-primary font-bold">{cbm} CBM</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    value={dimL}
                    onChange={(e) => setDimL(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-center text-sm"
                    placeholder="Length"
                    type="number"
                  />
                  <span className="text-secondary text-sm">×</span>
                  <input
                    value={dimW}
                    onChange={(e) => setDimW(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-center text-sm"
                    placeholder="Width"
                    type="number"
                  />
                  <span className="text-secondary text-sm">×</span>
                  <input
                    value={dimH}
                    onChange={(e) => setDimH(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-center text-sm"
                    placeholder="Height"
                    type="number"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Container / Cargo Type
                </label>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-sm text-on-surface"
                >
                  <option>General Cargo (Palletized)</option>
                  <option>FCL 20ft Standard Container</option>
                  <option>FCL 40ft High Cube Container</option>
                  <option>LCL Consolidated Cargo</option>
                  <option>Temperature Controlled / Pharma</option>
                  <option>Dangerous Goods (DG / IMO)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Commodity & Special Handling Notes
                </label>
                <input
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full px-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-sm"
                  placeholder="e.g. Industrial Machinery, Fragile, Stackable"
                  type="text"
                />
              </div>
            </div>
          </div>

          <hr className="border-secondary-container" />

          {/* Step 4: Contact Info */}
          <div>
            <h3 className="font-headline-md text-lg text-on-surface mb-4 flex items-center gap-3 font-bold">
              <span className="w-7 h-7 rounded-full bg-primary-container text-white flex items-center justify-center font-label-bold text-xs">
                4
              </span>
              Client & Dispatch Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-sm"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Company Name
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-sm"
                  placeholder="Logistics Corp"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Work Email Address *
                </label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-sm"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                  Phone / WhatsApp Number *
                </label>
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary text-sm"
                  placeholder="+971 50 123 4567"
                  type="tel"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-secondary-container">
            <span className="text-xs text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-emerald-600">
                lock
              </span>
              Data encrypted. Instant quotation dispatch.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary-container text-white hover:bg-primary transition-all duration-200 px-8 py-3.5 rounded-lg font-label-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
            >
              Calculate & Request Quote
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 md:p-8 border border-secondary-container shadow-2xl relative">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">
                  check_circle
                </span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-background mb-1">
                Quote Request Generated!
              </h3>
              <p className="text-xs text-secondary mb-4">
                Reference ID:{" "}
                <span className="font-mono font-bold text-primary">
                  {modalRefId}
                </span>{" "}
                • Dispatched to Freight Engine
              </p>

              <div className="bg-surface p-4 rounded-xl border border-secondary-container text-xs space-y-2 mb-6">
                <div className="flex justify-between pb-1 border-b border-secondary-container">
                  <span className="text-secondary">Selected Modality:</span>
                  <span className="font-bold text-on-surface">{service}</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-secondary-container">
                  <span className="text-secondary">Route:</span>
                  <span className="font-bold text-on-surface">
                    {origin} &rarr; {dest}
                  </span>
                </div>
                <div className="flex justify-between pb-1 border-b border-secondary-container">
                  <span className="text-secondary">Weight & Volume:</span>
                  <span className="font-bold text-on-surface">
                    {weight.toLocaleString()} KG ({cbm} CBM)
                  </span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm text-primary">
                  <span>Estimated Rate Bracket:</span>
                  <span>{priceEstimate}</span>
                </div>
              </div>

              <p className="text-xs text-secondary mb-6 leading-relaxed">
                Our global trade desk has logged your request. A formal rate
                breakdown and proforma terms have been dispatched to{" "}
                <span className="font-bold text-on-surface">{email}</span>.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 bg-primary-container text-white py-2.5 rounded-lg font-label-bold text-sm hover:bg-primary transition-colors"
                >
                  Done
                </button>
                <Link
                  href="/contact"
                  className="flex-1 border border-secondary-container text-center py-2.5 rounded-lg font-label-bold text-sm hover:bg-surface transition-colors"
                >
                  Contact Trade Desk
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

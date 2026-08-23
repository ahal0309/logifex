"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalRefId, setModalRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "LGFX-ENQ" + Math.floor(10000 + Math.random() * 90000);
    setModalRefId(ref);
    setModalOpen(true);
  };

  return (
    <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
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
                href="tel:+442079460912"
              >
                <span className="material-symbols-outlined text-base">call</span>
                UK: +44 20 7946 0912
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
            Contact Us
          </span>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-on-surface font-bold mb-2">
            Customer Enquiry
          </h1>
          <p className="text-secondary font-body-md text-sm">
            Please fill out the form below with your details and message, and our team will get back to you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest border border-secondary-container rounded-xl p-6 md:p-10 shadow-sm flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                Customer Name *
              </label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm"
                placeholder="Your full name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                Company Name
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm"
                placeholder="Your company name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                Email Address *
              </label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm"
                placeholder="name@company.com"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
                Contact Number / WhatsApp Number *
              </label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm"
                placeholder="+971 50 123 4567"
                type="tel"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-label-bold text-xs text-on-surface uppercase tracking-wider">
              Message / Enquiry *
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-secondary-container rounded-lg bg-surface focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-on-surface text-sm resize-y"
              placeholder="How can we help you today?"
              rows={5}
            ></textarea>
          </div>

          <div className="flex items-center justify-start pt-4 border-t border-secondary-container">
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary-container text-white hover:bg-primary transition-all duration-200 px-8 py-3.5 rounded-lg font-label-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm"
            >
              Submit Enquiry
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full p-6 md:p-8 border border-secondary-container shadow-2xl relative text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">
                  check_circle
                </span>
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-background mb-2">
                Enquiry Submitted!
              </h3>
              <p className="text-sm text-secondary mb-6 leading-relaxed">
                Thank you for reaching out, {fullName}. We have received your message and our team will get back to you shortly at {email}.
              </p>

              <button
                onClick={() => {
                  setModalOpen(false);
                  setFullName("");
                  setCompany("");
                  setEmail("");
                  setPhone("");
                  setMessage("");
                }}
                className="w-full bg-primary-container text-white py-3 rounded-lg font-label-bold text-sm hover:bg-primary transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

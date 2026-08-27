"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactClient({ content }: { content: any[] }) {
  const getVal = (key: string, fallback: string) => 
    content?.find(c => c.content_key === key)?.content_value || fallback;

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Commercial Rates & Quotations");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 w-full space-y-12">
      <div className="max-w-3xl">
        <span className="text-primary-container font-label-bold text-xs uppercase tracking-wider block mb-1">
          {getVal("tagline", "Global Trade Desk")}
        </span>
        <h1 className="font-headline-md text-3xl md:text-4xl font-bold text-on-background mb-3">
          {getVal("title", "Connect with our Regional Logistics Hubs")}
        </h1>
        <p className="text-secondary font-body-md text-sm leading-relaxed">
          {getVal("description", "Speak directly with experienced freight forwarders, customs brokers, and project cargo specialists across the UAE, India, and the UK.")}
        </p>
      </div>

      {/* Office Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* UAE Headquarters */}
        <div
          id="uae"
          className="p-6 bg-surface-container-lowest rounded-2xl border-2 border-primary-container shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-primary text-white rounded text-[11px] font-bold uppercase tracking-wider">
                Global HQ
              </span>
              <span className="material-symbols-outlined text-primary-container text-2xl">
                apartment
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                UAE Headquarters - Dubai
              </h3>
              <p className="text-xs text-secondary mt-1">
                Al Qusais 2, PO Box 89201, Dubai, United Arab Emirates
              </p>
            </div>
            <div className="space-y-2 text-xs text-on-surface pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">
                  call
                </span>
                <a href="tel:+97145752307" className="hover:underline font-bold">
                  +971 45752307
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">
                  mail
                </span>
                <a
                  href="mailto:info@logifexgroup.com"
                  className="hover:underline"
                >
                  info@logifexgroup.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                <span>Mon - Fri: 08:30 - 18:00 GST</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-secondary-container">
            <Link
              href="/quote"
              className="block text-center py-2 bg-primary-container text-white rounded text-xs font-label-bold hover:bg-primary transition-colors"
            >
              Dispatch from UAE
            </Link>
          </div>
        </div>

        {/* India Operations */}
        <div
          id="india"
          className="p-6 bg-surface-container-lowest rounded-2xl border border-secondary-container shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-surface-container text-on-surface rounded text-[11px] font-bold uppercase tracking-wider">
                South Asia Hub
              </span>
              <span className="material-symbols-outlined text-tertiary text-2xl">
                location_city
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                India Regional Center
              </h3>
              <p className="text-xs text-secondary mt-1">
                Tripunithura, Cochin, Kerala 682301, India
              </p>
            </div>
            <div className="space-y-2 text-xs text-on-surface pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">
                  call
                </span>
                <a
                  href="tel:+914842778899"
                  className="hover:underline font-bold"
                >
                  +91 484 277 8899
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">
                  mail
                </span>
                <a
                  href="mailto:india@logifexgroup.com"
                  className="hover:underline"
                >
                  india@logifexgroup.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                <span>Mon - Sat: 09:00 - 18:30 IST</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-secondary-container">
            <Link
              href="/quote"
              className="block text-center py-2 bg-surface text-on-surface border border-secondary-container rounded text-xs font-label-bold hover:bg-surface-container transition-colors"
            >
              Dispatch from India
            </Link>
          </div>
        </div>

        {/* UK Hub */}
        <div
          id="uk"
          className="p-6 bg-surface-container-lowest rounded-2xl border border-secondary-container shadow-sm flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-surface-container text-on-surface rounded text-[11px] font-bold uppercase tracking-wider">
                European Gateway
              </span>
              <span className="material-symbols-outlined text-tertiary text-2xl">
                domain
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg font-bold text-on-background">
                UK & Europe Hub
              </h3>
              <p className="text-xs text-secondary mt-1">
                London Logistics Corridor, Greater London, United Kingdom
              </p>
            </div>
            <div className="space-y-2 text-xs text-on-surface pt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">
                  call
                </span>
                <a
                  href="tel:+442079460912"
                  className="hover:underline font-bold"
                >
                  +44 20 7946 0912
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">
                  mail
                </span>
                <a href="mailto:uk@logifexgroup.com" className="hover:underline">
                  uk@logifexgroup.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <span className="material-symbols-outlined text-sm">
                  schedule
                </span>
                <span>Mon - Fri: 08:00 - 17:00 GMT</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-secondary-container">
            <Link
              href="/quote"
              className="block text-center py-2 bg-surface text-on-surface border border-secondary-container rounded text-xs font-label-bold hover:bg-surface-container transition-colors"
            >
              Dispatch from UK / EU
            </Link>
          </div>
        </div>
      </div>

      {/* Contact Form & Emergency Dispatch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-secondary-container shadow-sm">
          <h3 className="font-headline-md text-xl font-bold text-on-background mb-1">
            Send a Direct Operational Inquiry
          </h3>
          <p className="text-xs text-secondary mb-6">
            Our forwarders reply within 1 hour during active business hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-bold text-xs text-on-surface">
                  Your Name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                  placeholder="Full Name"
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-bold text-xs text-on-surface">
                  Email Address *
                </label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                  placeholder="email@company.com"
                  type="email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-bold text-xs text-on-surface">
                  Phone / Mobile
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                  placeholder="+971 50 123 4567"
                  type="tel"
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-bold text-xs text-on-surface">
                  Inquiry Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm"
                >
                  <option>Commercial Rates & Quotations</option>
                  <option>Active Consignment Tracking Support</option>
                  <option>Customs Clearance & HS Tariff Advisory</option>
                  <option>Contract Logistics & Bonded Warehousing</option>
                  <option>Carrier & Airline Vendor Partnership</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-label-bold text-xs text-on-surface">
                Message Details *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-secondary-container rounded-lg bg-surface text-sm resize-none"
                placeholder="Provide consignment details, dates, or specific requirements..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary-container text-white px-7 py-3 rounded-lg font-label-bold text-sm hover:bg-primary transition-colors flex items-center gap-2"
            >
              Send Message
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>

          {submitted && (
            <div className="mt-4 p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-200 animate-in fade-in duration-200">
              ✓ Your message has been routed to the regional dispatch desk. We
              will respond shortly.
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-surface rounded-2xl border border-secondary-container shadow-sm space-y-3">
            <h4 className="font-headline-md text-sm font-bold text-on-surface uppercase tracking-wider">
              Emergency Cargo Dispatch
            </h4>
            <p className="text-xs text-secondary leading-relaxed">
              For out-of-gauge (AOG), temperature excursions, or time-critical
              flight departures, reach our 24/7 hotline directly:
            </p>
            <div className="p-3 bg-white rounded-lg border border-secondary-container text-xs font-mono font-bold text-primary flex items-center justify-between">
              <span>24/7 Hotline:</span>
              <span>+971 45752307</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-secondary-container shadow-sm">
            <img
              alt="Logifex Logistics Operations"
              className="w-full h-48 object-cover"
              src="/images/sea-freight.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

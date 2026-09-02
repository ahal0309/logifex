import React from "react";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import CareerListingsClient from "@/components/CareerListingsClient";

export const metadata: Metadata = {
  title: "Careers | Logifex Freight Services",
  description: "Join our team at Logifex Freight Services. Explore current job openings.",
};

export const revalidate = 0;

export default async function CareersPage() {
  const supabase = createClient();
  const { data: jobs, error } = await supabase
    .from("careers")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-surface-container-lowest border-b border-secondary-container pt-20 pb-16">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h1 className="font-headline-display text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface mb-6">
            Join Our <span className="text-primary">Team</span>
          </h1>
          <p className="font-body-md text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            At Logifex Freight Services, we believe that our people are our greatest asset. 
            We are always looking for passionate, driven individuals to help us deliver 
            precision in motion across the globe.
          </p>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="mb-12">
            <h2 className="font-headline-display text-3xl font-bold text-on-surface mb-4">
              Current Openings
            </h2>
            <p className="text-secondary">
              Discover opportunities to grow your career with a global logistics leader.
            </p>
          </div>

          <CareerListingsClient jobs={jobs || []} />
        </div>
      </section>
    </div>
  );
}

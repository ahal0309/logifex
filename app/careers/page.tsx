import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Logifex Freight Services",
  description: "Join our team at Logifex Freight Services. Explore current job openings.",
};

const jobs = [
  {
    id: 1,
    title: "Logistics Coordinator",
    location: "UAE HQ (Dubai)",
    type: "Full-Time",
    department: "Operations",
    description: "Coordinate and monitor supply chain operations, ensure effective communication with clients and suppliers, and resolve any arising problems or complaints.",
  },
  {
    id: 2,
    title: "Sales Executive - Freight Forwarding",
    location: "India Hub (Cochin)",
    type: "Full-Time",
    department: "Sales",
    description: "Drive new business acquisition and maintain relationships with existing clients to promote our comprehensive freight solutions.",
  },
  {
    id: 3,
    title: "Customs Brokerage Specialist",
    location: "UK Hub (London)",
    type: "Full-Time",
    department: "Compliance",
    description: "Ensure compliance with international customs regulations and facilitate the smooth clearance of goods for our clients.",
  }
];

export default function CareersPage() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-surface border border-secondary-container rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="mb-4">
                  <span className="inline-block bg-primary-container/10 text-primary px-3 py-1 rounded-full text-xs font-label-bold mb-3 uppercase tracking-wider">
                    {job.department}
                  </span>
                  <h3 className="font-headline-display text-xl font-bold text-on-surface mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-secondary font-medium">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[18px]">work</span>
                      {job.type}
                    </span>
                  </div>
                </div>
                
                <p className="text-secondary text-sm mb-6 flex-grow leading-relaxed">
                  {job.description}
                </p>
                
                <a 
                  href={`mailto:info@logifexgroup.com?subject=Application for ${job.title} - ${job.location}`}
                  className="mt-auto block text-center bg-primary text-white font-label-bold py-2.5 rounded-lg hover:bg-primary-container transition-colors w-full"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-surface-container-low border border-secondary-container rounded-xl p-8 text-center max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">mail</span>
            <h3 className="font-headline-display text-xl font-bold text-on-surface mb-3">
              Don't see a perfect fit?
            </h3>
            <p className="text-secondary mb-6">
              We're always open to meeting talented professionals. Send your resume and a cover letter detailing how you can contribute to Logifex.
            </p>
            <a 
              href="mailto:info@logifexgroup.com?subject=General Application" 
              className="inline-block border-2 border-primary text-primary font-label-bold px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors"
            >
              Send General Application
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

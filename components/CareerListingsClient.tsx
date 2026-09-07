"use client";

import React, { useState } from "react";
import ApplyModal from "./ApplyModal";
import JobDetailsModal from "./JobDetailsModal";

interface CareerListingsClientProps {
  jobs: any[];
}

export default function CareerListingsClient({ jobs }: CareerListingsClientProps) {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleApplyClick = (job: any | null) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(false); // Close details modal if open
    setIsApplyModalOpen(true);
  };

  const handleDetailsClick = (job: any) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setSelectedJob(null);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-surface border border-secondary-container rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer hover:border-primary/30"
              onClick={() => handleDetailsClick(job)}
            >
              <div className="mb-4">
                <span className="inline-block bg-primary-container/10 text-primary px-3 py-1 rounded-full text-xs font-label-bold mb-3 uppercase tracking-wider">
                  {job.department}
                </span>
                <h3 className="font-headline-display text-xl font-bold text-on-surface mb-2 flex justify-between items-center">
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
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-secondary">
            No open positions at the moment. Please check back later.
          </div>
        )}
      </div>

      <div className="mt-16 bg-surface-container-low border border-secondary-container rounded-xl p-8 text-center max-w-3xl mx-auto">
        <span className="material-symbols-outlined text-4xl text-primary mb-4">mail</span>
        <h3 className="font-headline-display text-xl font-bold text-on-surface mb-3">
          Don't see a perfect fit?
        </h3>
        <p className="text-secondary mb-6">
          We're always open to meeting talented professionals. Send your resume and a cover letter detailing how you can contribute to Logifex.
        </p>
        <button 
          onClick={() => handleApplyClick(null)}
          className="inline-block border-2 border-primary text-primary font-label-bold px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-colors"
        >
          Send General Application
        </button>
      </div>

      {isDetailsModalOpen && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={closeDetailsModal} 
          onApply={handleApplyClick} 
        />
      )}

      {isApplyModalOpen && (
        <ApplyModal job={selectedJob} onClose={closeApplyModal} />
      )}
    </>
  );
}

import React from "react";

interface JobDetailsModalProps {
  job: any;
  onClose: () => void;
  onApply: (job: any) => void;
}

export default function JobDetailsModal({ job, onClose, onApply }: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-surface border border-secondary-container rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 mt-10 md:mt-0 relative flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-secondary-container bg-surface">
          <div>
            <span className="inline-block bg-primary-container/10 text-primary px-3 py-1 rounded-full text-xs font-label-bold mb-3 uppercase tracking-wider">
              {job.department}
            </span>
            <h2 className="font-headline-display text-2xl md:text-3xl font-bold text-on-surface mb-2">
              {job.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-secondary font-medium">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">work</span>
                {job.type}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow scrollbar-thin">
          <div className="text-on-surface text-base leading-relaxed whitespace-pre-wrap">
            {job.description}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-secondary-container bg-surface-container-lowest flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg font-label-bold text-sm text-secondary hover:bg-surface-container-low transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onApply(job)}
            className="px-8 py-2.5 bg-primary text-white rounded-lg font-label-bold text-sm hover:bg-primary-container transition-colors shadow-sm"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

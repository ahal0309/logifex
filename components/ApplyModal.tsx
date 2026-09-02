"use client";

import React, { useState, useRef } from "react";
import toast from "react-hot-toast";

interface ApplyModalProps {
  job: any;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    coverLetter: "",
    joinTime: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("jobTitle", job ? job.title : "General Application");
      submitData.append("jobLocation", job ? job.location : "");
      submitData.append("name", formData.name);
      submitData.append("phone", formData.phone);
      submitData.append("email", formData.email);
      submitData.append("coverLetter", formData.coverLetter);
      submitData.append("joinTime", formData.joinTime);
      submitData.append("resume", file);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!");
        onClose();
      } else {
        toast.error(result.error || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-surface border border-secondary-container rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 mt-10 md:mt-0 relative">
        <div className="flex justify-between items-center p-6 border-b border-secondary-container">
          <div>
            <h2 className="font-headline-display text-2xl font-bold text-on-surface">
              {job ? `Apply for ${job.title}` : "General Application"}
            </h2>
            {job && <p className="text-secondary text-sm">{job.location} • {job.department}</p>}
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-on-surface transition-colors p-2"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
          <form id="apply-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-label-bold text-on-surface block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-secondary-container rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-label-bold text-on-surface block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-secondary-container rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-label-bold text-on-surface block">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-secondary-container rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-label-bold text-on-surface block">
                  How soon can you join? <span className="text-red-500">*</span>
                </label>
                <select
                  name="joinTime"
                  required
                  value={formData.joinTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-surface-container-lowest border border-secondary-container rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                >
                  <option value="" disabled>Select availability</option>
                  <option value="Immediately">Immediately</option>
                  <option value="1 Week">1 Week</option>
                  <option value="15 Days">15 Days</option>
                  <option value="1 Month">1 Month</option>
                  <option value="More than 1 Month">More than 1 Month</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-label-bold text-on-surface flex justify-between">
                <span>Cover Letter <span className="text-red-500">*</span></span>
                <span className={`text-xs ${formData.coverLetter.length > 500 ? 'text-red-500' : 'text-secondary'}`}>
                  {formData.coverLetter.length}/500
                </span>
              </label>
              <textarea
                name="coverLetter"
                required
                maxLength={500}
                rows={4}
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-surface-container-lowest border border-secondary-container rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none"
                placeholder="Briefly explain why you are a good fit for this role..."
              ></textarea>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-label-bold text-on-surface block">
                Resume (PDF/DOC) <span className="text-red-500">*</span>
              </label>
              <div 
                className="w-full border-2 border-dashed border-secondary-container rounded-xl p-6 flex flex-col items-center justify-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  required
                />
                <span className="material-symbols-outlined text-4xl text-primary mb-2">upload_file</span>
                {file ? (
                  <div className="text-center">
                    <p className="text-sm font-bold text-on-surface">{file.name}</p>
                    <p className="text-xs text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-bold text-on-surface mb-1">Click to upload resume</p>
                    <p className="text-xs text-secondary">Max 5MB</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-secondary-container bg-surface-container-lowest flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-lg font-label-bold text-sm text-secondary hover:bg-surface-container-low transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="apply-form"
            disabled={isSubmitting || formData.coverLetter.length > 500}
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-label-bold text-sm hover:bg-primary-container transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

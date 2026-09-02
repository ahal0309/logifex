"use client";

import { useState } from "react";

export default function DynamicGalleryInput() {
  const [inputs, setInputs] = useState<number[]>([0]); // Start with one input

  const addInput = () => {
    setInputs([...inputs, Date.now()]);
  };

  const removeInput = (idToRemove: number) => {
    setInputs(inputs.filter((id) => id !== idToRemove));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        Gallery Images (Slide View)
      </label>
      
      <div className="space-y-3">
        {inputs.map((id, index) => (
          <div key={id} className="flex items-center gap-3">
            <input 
              type="file" 
              name="gallery" 
              accept="image/*" 
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" 
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeInput(id)}
                className="w-10 h-10 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                title="Remove image"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addInput}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-full transition-colors mt-2"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        Add another image
      </button>
      
      <p className="text-xs text-gray-500 mt-2">
        Click the + button to add multiple images to the event slider.
      </p>
    </div>
  );
}

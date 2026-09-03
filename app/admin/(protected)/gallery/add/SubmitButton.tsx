'use client'

import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`px-6 py-3 font-medium rounded-lg transition-colors shadow-sm flex items-center justify-center min-w-[140px] ${
        pending 
          ? 'bg-gray-400 text-white cursor-not-allowed' 
          : 'bg-red-600 hover:bg-red-700 text-white'
      }`}
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Uploading...
        </>
      ) : 'Save Media'}
    </button>
  )
}

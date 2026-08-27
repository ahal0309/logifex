'use client'

import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import { uploadHeroMedia } from '@/app/admin/actions'

export default function UploadForm({ item }: { item: any }) {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    const loadingToast = toast.loading('Uploading...')
    try {
      const result = await uploadHeroMedia(formData)
      if (result?.error) {
        toast.error(result.error, { id: loadingToast })
      } else {
        toast.success('Successfully uploaded!', { id: loadingToast })
        formRef.current?.reset()
      }
    } catch (e) {
      toast.error('An error occurred during upload', { id: loadingToast })
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <input type="hidden" name="page" value={item.page} />
      <input type="hidden" name="section" value={item.section} />
      <input type="hidden" name="content_key" value={item.content_key} />
      <input type="hidden" name="content_type" value={item.content_type} />
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          Upload New {item.content_type === 'video_url' ? 'Video' : 'Image'}
        </label>
        <input
          type="file"
          name="media"
          accept={item.content_type === 'video_url' ? 'video/mp4' : 'image/*'}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
      >
        Upload & Replace
      </button>
    </form>
  )
}

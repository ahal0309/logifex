'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function ImagesAdminPage() {
  const [images, setImages] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    const { data, error } = await supabase.storage.from('public-assets').list()
    if (data) {
      // get public URLs
      const imagesWithUrls = data.filter(d => d.name !== '.emptyFolderPlaceholder').map(file => {
        const { data: publicUrl } = supabase.storage.from('public-assets').getPublicUrl(file.name)
        return { ...file, url: publicUrl.publicUrl }
      })
      setImages(imagesWithUrls)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)
      setMessage('')
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('public-assets')
        .upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      setMessage('Image uploaded successfully!')
      fetchImages()
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Image Library</h2>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
          />
          {uploading && <p className="mt-3 text-sm font-medium text-red-600">Uploading...</p>}
          {message && <p className="mt-3 text-sm font-medium text-gray-900">{message}</p>}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image) => (
            <div key={image.name} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-square shadow-sm">
              <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gray-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                <p className="text-xs text-white font-medium break-all mb-3">{image.name}</p>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(image.url)
                    alert('URL copied to clipboard!')
                  }}
                  className="px-4 py-1.5 bg-white/90 hover:bg-white text-gray-900 font-semibold text-xs rounded transition-colors shadow-sm"
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
          {images.length === 0 && !uploading && (
            <div className="col-span-full py-8 text-center text-gray-500">
              No images found in the public-assets bucket.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

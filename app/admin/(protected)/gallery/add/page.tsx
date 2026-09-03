import { addGalleryMedia } from '../../../actions'
import Link from 'next/link'
import SubmitButton from './SubmitButton'

export default function AddGalleryMediaPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Add Gallery Media</h2>
        <Link href="/admin/gallery" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">
          Back to Gallery
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <form action={addGalleryMedia} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Media Title</label>
              <input type="text" name="title" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="e.g. Annual Logistics Conference 2026" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Media Type *</label>
              <select name="media_type" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors">
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File *</label>
              <input type="file" name="media" accept="image/*,video/*" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
              <input type="number" name="display_order" defaultValue="0" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select name="is_active" className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors">
                <option value="true">Active (Visible)</option>
                <option value="false">Hidden (Draft)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

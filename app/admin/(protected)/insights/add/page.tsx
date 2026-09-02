import { addInsight } from '../../../actions'
import Link from 'next/link'
import DynamicGalleryInput from './DynamicGalleryInput'

export default function AddInsightPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Add New Insight</h2>
        <Link href="/admin/insights" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">
          Back to Insights
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <form action={addInsight} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Insight Title *</label>
              <input type="text" name="title" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="e.g. Navigating Logistics in 2026" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <input type="text" name="category" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="e.g. News, Events, Blogs" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Published *</label>
              <input type="date" name="date_published" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image Upload *</label>
            <input type="file" name="image" accept="image/*" required className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
            <p className="text-xs text-gray-500 mt-1">Upload the main cover image directly from your computer.</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description Paragraphs</label>
            <textarea name="description" rows={8} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="Write the detailed description here..."></textarea>
          </div>

          <DynamicGalleryInput />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <button type="submit" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              Save Insight
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

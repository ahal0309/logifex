import { addCareer } from '../../../actions'
import Link from 'next/link'

export default function AddCareerPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Add New Career</h2>
        <Link href="/admin/careers" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">
          Back to Careers
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <form action={addCareer} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input type="text" name="title" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input type="text" name="location" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="e.g. UAE HQ (Dubai)" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type *</label>
              <input type="text" name="type" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" defaultValue="Full-Time" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
              <input type="text" name="department" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="e.g. Operations" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea name="description" required rows={4} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors"></textarea>
          </div>

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
              Save Career
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

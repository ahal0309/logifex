import { createClient } from '@/lib/supabase/server'
import { updateCareer } from '../../../actions'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditCareerPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: career } = await supabase
    .from('careers')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!career) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Edit Career</h2>
        <Link href="/admin/careers" className="text-gray-500 font-medium hover:text-gray-900 transition-colors">
          Back to Careers
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
        <form action={updateCareer} className="space-y-6">
          <input type="hidden" name="id" value={career.id} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input type="text" name="title" required defaultValue={career.title} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input type="text" name="location" required defaultValue={career.location} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="e.g. UAE HQ (Dubai)" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type *</label>
              <input type="text" name="type" required defaultValue={career.type} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Department *</label>
              <input type="text" name="department" required defaultValue={career.department} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" placeholder="e.g. Operations" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea name="description" required rows={4} defaultValue={career.description} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
              <input type="number" name="display_order" defaultValue={career.display_order} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select name="is_active" defaultValue={career.is_active ? 'true' : 'false'} className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none shadow-sm transition-colors">
                <option value="true">Active (Visible)</option>
                <option value="false">Hidden (Draft)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              Update Career
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

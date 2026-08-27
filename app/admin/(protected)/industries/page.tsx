import { createClient } from '@/lib/supabase/server'
import { deleteIndustry, toggleIndustryStatus } from '../../actions'
import Link from 'next/link'

export default async function IndustriesAdminPage() {
  const supabase = createClient()
  const { data: industries } = await supabase
    .from('industries')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Industries</h2>
        <Link 
          href="/admin/industries/add" 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Industry
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-600">Order</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Tag</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {industries?.map((ind) => (
              <tr key={ind.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-500">{ind.display_order}</td>
                <td className="p-4 font-medium text-gray-900">{ind.title}</td>
                <td className="p-4 text-gray-600">{ind.tag}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${ind.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {ind.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <form action={async () => {
                    'use server'
                    await toggleIndustryStatus(ind.id, ind.is_active)
                  }} className="inline">
                    <button type="submit" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                      Toggle Status
                    </button>
                  </form>
                  <form action={async () => {
                    'use server'
                    await deleteIndustry(ind.id)
                  }} className="inline">
                    <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(!industries || industries.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No industries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

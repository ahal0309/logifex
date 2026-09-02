import { createClient } from '@/lib/supabase/server'
import { deleteInsight, toggleInsightStatus } from '../../actions'
import Link from 'next/link'

export default async function InsightsAdminPage() {
  const supabase = createClient()
  const { data: insights } = await supabase
    .from('insights')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Insights</h2>
        <Link 
          href="/admin/insights/add" 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Insight
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-600">Order</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {insights?.map((insight) => (
              <tr key={insight.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-500">{insight.display_order}</td>
                <td className="p-4 font-medium text-gray-900">{insight.title}</td>
                <td className="p-4 text-gray-600">{insight.category}</td>
                <td className="p-4 text-gray-600">{new Date(insight.date_published).toLocaleDateString()}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${insight.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {insight.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <form action={async () => {
                    'use server'
                    await toggleInsightStatus(insight.id, insight.is_active)
                  }} className="inline">
                    <button type="submit" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                      Toggle Status
                    </button>
                  </form>
                  <form action={async () => {
                    'use server'
                    await deleteInsight(insight.id)
                  }} className="inline">
                    <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(!insights || insights.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">No insights found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { count: careersCount } = await supabase
    .from('careers')
    .select('*', { count: 'exact', head: true })
    
  const { count: contentCount } = await supabase
    .from('site_content')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h3 className="text-gray-500 font-medium mb-2">Total Job Postings</h3>
          <div className="text-4xl font-bold text-gray-900">{careersCount || 0}</div>
        </div>
        
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
          <h3 className="text-gray-500 font-medium mb-2">Editable Content Blocks</h3>
          <div className="text-4xl font-bold text-gray-900">{contentCount || 0}</div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
        <div className="flex gap-4">
          <a href="/admin/careers" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm">Manage Careers</a>
          <a href="/admin/media" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-sm">Manage Hero Media</a>
        </div>
      </div>
    </div>
  )
}

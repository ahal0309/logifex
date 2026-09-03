import { createClient } from '@/lib/supabase/server'
import { deleteGalleryMedia, toggleGalleryMediaStatus } from '../../actions'
import Link from 'next/link'

export default async function GalleryAdminPage() {
  const supabase = createClient()
  const { data: galleries } = await supabase
    .from('galleries')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
        <Link 
          href="/admin/gallery/add" 
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Media
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-sm font-semibold text-gray-600">Order</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Preview</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Type</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleries?.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-500">{item.display_order}</td>
                <td className="p-4">
                  {item.media_type === 'image' ? (
                    <img src={item.media_url} alt={item.title} className="h-12 w-16 object-cover rounded shadow-sm border border-gray-200" />
                  ) : (
                    <video src={item.media_url} className="h-12 w-16 object-cover rounded shadow-sm border border-gray-200" />
                  )}
                </td>
                <td className="p-4 font-medium text-gray-900">{item.title}</td>
                <td className="p-4 text-gray-600 capitalize">{item.media_type}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {item.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-3">
                  <form action={async () => {
                    'use server'
                    await toggleGalleryMediaStatus(item.id, item.is_active)
                  }} className="inline">
                    <button type="submit" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                      Toggle Status
                    </button>
                  </form>
                  <form action={async () => {
                    'use server'
                    await deleteGalleryMedia(item.id)
                  }} className="inline">
                    <button type="submit" className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {(!galleries || galleries.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">No media found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

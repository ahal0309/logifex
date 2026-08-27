import { createClient } from '@/lib/supabase/server'
import UploadForm from './UploadForm'

export const dynamic = 'force-dynamic'

export default async function MediaAdminPage() {
  const supabase = createClient()

  // Fetch all site content that are images or videos
  const { data: mediaItems } = await supabase
    .from('site_content')
    .select('*')
    .in('content_type', ['image_url', 'video_url'])
    .order('page')

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Hero Media</h1>
          <p className="text-sm text-gray-500 mt-1">Manage hero images and videos across all pages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems?.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border shadow-sm">
            <h3 className="font-semibold text-lg capitalize">{item.page} Page</h3>
            <p className="text-sm text-gray-500 mb-4">{item.section} - {item.content_key.replace(/_/g, ' ')}</p>
            
            <div className="aspect-video w-full rounded-lg bg-gray-100 overflow-hidden relative mb-4 border">
              {item.content_type === 'video_url' ? (
                <video src={item.content_value} className="w-full h-full object-cover" muted loop playsInline autoPlay />
              ) : (
                <img src={item.content_value} alt={item.content_key} className="w-full h-full object-cover" />
              )}
            </div>

            <UploadForm item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

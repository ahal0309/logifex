import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights - Logifex Freight Services",
  description: "Stay updated with the latest news, events, and blogs from Logifex Freight Services.",
};

export default async function InsightsPage() {
  const supabase = createClient();
  const { data: insights } = await supabase
    .from("insights")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("date_published", { ascending: false });

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <section
        className="relative w-full min-h-[40vh] md:min-h-[50vh] flex items-end pb-12 md:pb-20 bg-inverse-surface bg-cover bg-center text-white overflow-hidden"
        style={{ backgroundImage: `url('/images/about_hero_logistics.webp')` }}
      >
        <div className="absolute inset-0 hero-overlay"></div>
        <div className="absolute inset-0 opacity-15 chevron-pattern pointer-events-none"></div>
 
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-headline-display text-5xl sm:text-6xl md:text-8xl font-black mb-4 leading-none text-white uppercase tracking-tight">
            Insights
          </h1>
          <p className="text-surface-variant font-body-lg text-base sm:text-lg md:text-xl">
            News, Events, and Blogs from Logifex.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="w-full bg-white py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <h2 className="font-headline-display text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              Our Gallery
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore moments, events, and highlights from Logifex.
            </p>
          </div>
          
          <GalleryGrid />
        </div>
      </div>

      {/* Insights Section */}
      <div className="w-full bg-gray-50 py-20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <h2 className="font-headline-display text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              Our Insights
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Read our latest news, articles, and industry updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights?.map((insight) => (
              <Link href={`/insights/${insight.id}`} key={insight.id} className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer block">
                {/* Image Container */}
                <div className="relative h-56 md:h-64 w-full overflow-hidden bg-gray-200">
                  <img
                    src={insight.image_url}
                    alt={insight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow uppercase tracking-wider">
                      {insight.category}
                    </span>
                  </div>
                </div>
                
                {/* Content Block */}
                <div className="flex-1 p-6 bg-white border-t-[5px] border-primary flex flex-col justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-semibold mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      {new Date(insight.date_published).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </p>
                    <h3 className="font-headline-display text-xl font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                      {insight.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
            {(!insights || insights.length === 0) && (
              <div className="col-span-full py-12 text-center text-gray-500">
                <p className="text-xl font-semibold">No insights available at the moment.</p>
                <p className="mt-2">Check back later for news and updates.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponent to fetch and render the gallery
async function GalleryGrid() {
  const supabase = createClient();
  const { data: galleries } = await supabase
    .from("galleries")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (!galleries || galleries.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p className="text-xl font-semibold">No gallery media available yet.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
      {galleries.map((item) => (
        <div key={item.id} className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-gray-100 break-inside-avoid w-full">
          {item.media_type === "image" ? (
            <img
              src={item.media_url}
              alt={item.title}
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <video
              src={item.media_url}
              controls
              controlsList="nodownload noremoteplayback noplaybackrate"
              disablePictureInPicture
              disableRemotePlayback
              className="w-full h-auto block"
              preload="metadata"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
            <h3 className="text-white font-semibold text-lg drop-shadow-md">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

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

      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 bg-gray-50">
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
            <div className="col-span-full py-20 text-center text-gray-500">
              <p className="text-xl font-semibold">No insights available at the moment.</p>
              <p className="mt-2">Check back later for news and updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

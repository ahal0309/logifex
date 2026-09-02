import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Carousel from "./Carousel";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: insight } = await supabase
    .from("insights")
    .select("title")
    .eq("id", params.id)
    .single();

  if (!insight) return { title: "Insight Not Found - Logifex" };

  return {
    title: `${insight.title} - Logifex Insights`,
    description: `Read more about ${insight.title} on Logifex Freight Services.`,
  };
}

export default async function InsightDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: insight } = await supabase
    .from("insights")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!insight) {
    notFound();
  }

  // Fetch recent insights for sidebar
  const { data: recentInsights } = await supabase
    .from("insights")
    .select("id, title, image_url")
    .neq("id", params.id)
    .eq("is_active", true)
    .order("date_published", { ascending: false })
    .limit(4);

  // Handle gallery_urls parsing safely
  // Start with the main cover image, then append gallery images
  let images: string[] = [insight.image_url];
  if (insight.gallery_urls) {
    try {
      const parsed = typeof insight.gallery_urls === 'string' 
        ? JSON.parse(insight.gallery_urls) 
        : insight.gallery_urls;
      
      if (Array.isArray(parsed)) {
        images = [...images, ...parsed];
      }
    } catch (e) {
      console.error("Failed to parse gallery URLs", e);
    }
  }

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white min-h-screen">
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

      <div className="w-full max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          
          {/* Gallery Slider */}
          {images.length > 0 && (
            <Carousel images={images} />
          )}

          {/* Title & Metadata */}
          <div className="space-y-4 pb-6 border-b border-gray-100">
            <h1 className="font-headline-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {insight.title}
            </h1>
            <p className="text-gray-500 text-sm">
              Published on {new Date(insight.date_published).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </div>

          {/* Description Paragraphs */}
          {insight.description ? (
            <div className="prose prose-lg max-w-none text-gray-700 font-body-lg">
              {insight.description.split('\n').map((paragraph: string, idx: number) => (
                paragraph.trim() ? <p key={idx} className="mb-6 leading-relaxed text-[17px]">{paragraph}</p> : null
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No detailed description available.</p>
          )}

          {/* Back Button */}
          <div className="pt-8">
            <Link 
              href="/insights" 
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Back to Insights
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

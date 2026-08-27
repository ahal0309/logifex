import { createClient } from "@/lib/supabase/server"
import HomeClient from "./HomeClient"

export const metadata = {
  title: "Logifex Freight Services | Connecting Businesses. Moving Possibilities.",
  description:
    "Logifex Freight Services offers world-class Air, Rail, Road, Sea, and Multimodal logistics solutions. We ensure fast, compliant, and reliable global transport.",
};

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient()
  
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "home")

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  return <HomeClient content={content || []} services={services || []} />
}

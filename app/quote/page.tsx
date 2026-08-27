import { createClient } from "@/lib/supabase/server"
import QuoteClient from "./QuoteClient"

export default async function QuotePage() {
  const supabase = createClient()
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "quote")

  return <QuoteClient content={content || []} />
}

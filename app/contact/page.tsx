import { createClient } from "@/lib/supabase/server"
import ContactClient from "./ContactClient"

export default async function ContactPage() {
  const supabase = createClient()
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "contact")

  return <ContactClient content={content || []} />
}

import { createClient } from "@/lib/supabase/server"
import HeaderClient from "./HeaderClient"

export default async function Header() {
  const supabase = createClient()
  const { data: content } = await supabase
    .from("site_content")
    .select("*")
    .eq("page", "global")
    .eq("section", "header")

  return <HeaderClient content={content || []} />
}

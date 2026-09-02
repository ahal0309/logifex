import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .like("content_value", "%global_network_map.jpg%");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  console.log("Found rows:", data);

  for (const row of data || []) {
    const newValue = row.content_value.replace(".jpg", ".webp");
    console.log(`Updating ${row.content_key} from ${row.content_value} to ${newValue}`);
    
    const { error: updateError } = await supabase
      .from("site_content")
      .update({ content_value: newValue })
      .eq("id", row.id);
      
    if (updateError) {
      console.error("Error updating row:", updateError);
    } else {
      console.log("Updated successfully!");
    }
  }
}

main();

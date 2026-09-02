require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Using Service Role key if possible for updates, but anon key might work if policies allow it, or we can use service role.
// Let's use service_role key to bypass RLS for this admin operation.
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey; 

const supabase = createClient(supabaseUrl, serviceKey);

async function updateTable(tableName, columnNames) {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return;
  }

  let count = 0;
  for (const row of data) {
    let updated = false;
    const updates = {};

    for (const col of columnNames) {
      if (row[col] && typeof row[col] === 'string') {
        const original = row[col];
        const newUrl = original.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        if (original !== newUrl) {
          updates[col] = newUrl;
          updated = true;
        }
      }
    }

    if (updated) {
      const { error: updateError } = await supabase.from(tableName).update(updates).eq('id', row.id);
      if (updateError) {
        console.error(`Error updating row ${row.id} in ${tableName}:`, updateError);
      } else {
        console.log(`Updated row ${row.id} in ${tableName}:`, updates);
        count++;
      }
    }
  }
  console.log(`Finished updating ${count} rows in ${tableName}.`);
}

async function run() {
  await updateTable('services', ['image', 'image_url']);
  await updateTable('industries', ['image', 'image_url']);
  await updateTable('hero_images', ['image_url']); // If exists
}

run();

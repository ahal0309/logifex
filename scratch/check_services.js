import fs from 'fs';
import path from 'path';

// Read env directly
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key) env[key.trim()] = val.join('=').trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

fetch(`${supabaseUrl}/rest/v1/services?select=id,title,display_order`, {
  method: 'GET',
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`
  }
})
.then(res => res.json())
.then(data => {
  console.log('Services:', data.length);
  console.log(data.map(d => `${d.display_order}: ${d.title}`).sort());
});

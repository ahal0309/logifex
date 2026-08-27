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

fetch(`${supabaseUrl}/rest/v1/site_content?content_key=eq.about_bg_image`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({ content_value: '/images/about_bg_new.jpg' })
})
.then(res => res.json())
.then(data => {
  console.log('Successfully updated:', data);
})
.catch(err => {
  console.error('Error updating:', err);
});

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

const newText = "Comprehensive global logistics and supply chain solutions tailored specifically to the rigorous demands of your industry. From chartered cargo flights and vast global container vessel networks to temperature-controlled overland road linehauls, bonded warehousing, and multi-modal transit strategies, Logifex synchronizes world commerce. Our dedicated teams act as an extension of your own business, meticulously planning every stage of the journey. Whether it involves highly sensitive pharmaceuticals, massive project machinery, or fast-paced consumer goods, we guarantee the deployment of state-of-the-art tracking, strict regulatory compliance, and a commitment to ensuring secure, on-time deliveries no matter how complex the route.";

fetch(`${supabaseUrl}/rest/v1/site_content?page=eq.services&content_key=eq.subtitle`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({ content_value: newText })
})
.then(res => res.json())
.then(data => {
  console.log('Successfully updated subtitle:', data);
})
.catch(err => {
  console.error('Error updating:', err);
});

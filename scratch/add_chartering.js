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

const newService = {
  title: "Chartering Services",
  description: "Comprehensive air and vessel chartering solutions tailored to your specific logistics requirements.",
  supporting_text: "Air Charter • Vessel Charter",
  image_url: "/images/services/chartering_services_1788179565123.jpg",
  href: "/services/chartering-services",
  is_active: true,
  display_order: 15
};

fetch(`${supabaseUrl}/rest/v1/services`, {
  method: 'POST',
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify(newService)
})
.then(res => res.json())
.then(data => {
  console.log('Inserted Service:', data);
})
.catch(err => {
  console.error(err);
});

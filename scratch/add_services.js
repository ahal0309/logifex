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

const newServices = [
  {
    title: 'Cross Trading',
    description: 'Efficient cross-trade logistics, managing shipments directly between origins and destinations without entering the country of operation.',
    supporting_text: 'Global Reach • Direct Delivery',
    image_url: '/images/services/cross-trading.jpeg',
    href: '/services/cross-trading',
    display_order: 13
  },
  {
    title: 'Cross Stuffing',
    description: 'Expert cross-stuffing services, safely transferring cargo between containers to optimize routing and lower costs.',
    supporting_text: 'Cargo Transfer • Cost Optimization',
    image_url: '/images/services/cross-stuffing.jpeg',
    href: '/services/cross-stuffing',
    display_order: 14
  }
];

fetch(`${supabaseUrl}/rest/v1/services`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Prefer': 'return=representation'
  },
  body: JSON.stringify(newServices)
})
.then(res => res.json())
.then(data => {
  console.log('Successfully inserted:', data);
})
.catch(err => {
  console.error('Error inserting:', err);
});

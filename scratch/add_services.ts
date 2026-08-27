import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addServices() {
  const newServices = [
    {
      title: 'Couriers',
      description: 'Fast and reliable courier services for time-sensitive documents and parcels.',
      supporting_text: 'Express Delivery • Local & Global',
      image_url: '/images/services/couriers.jpeg',
      href: '/services/couriers',
      display_order: 10
    },
    {
      title: 'Relocation',
      description: 'Comprehensive relocation services for residential and commercial moving.',
      supporting_text: 'Office & Home • Seamless Moving',
      image_url: '/images/services/relocation.jpeg',
      href: '/services/relocation',
      display_order: 11
    },
    {
      title: 'Project Cargos',
      description: 'End-to-end logistics solutions for complex and large-scale project cargo.',
      supporting_text: 'Heavy Machinery • Infrastructure',
      image_url: '/images/services/project-cargo.jpeg',
      href: '/services/project-cargo',
      display_order: 12
    }
  ];

  const { data, error } = await supabase.from('services').insert(newServices).select();
  
  if (error) {
    console.error('Error inserting services:', error);
  } else {
    console.log('Successfully inserted services:', data);
  }
}

addServices();

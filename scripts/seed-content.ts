import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const initialData = [
  // HEADER
  { page: 'global', section: 'header', content_key: 'logo_text', content_value: 'Logifex' },
  { page: 'global', section: 'header', content_key: 'nav_home', content_value: 'Home' },
  { page: 'global', section: 'header', content_key: 'nav_about', content_value: 'About' },
  { page: 'global', section: 'header', content_key: 'nav_services', content_value: 'Services' },
  { page: 'global', section: 'header', content_key: 'nav_careers', content_value: 'Careers' },
  { page: 'global', section: 'header', content_key: 'nav_contact', content_value: 'Contact' },
  { page: 'global', section: 'header', content_key: 'nav_quote', content_value: 'Get Quote' },

  // FOOTER
  { page: 'global', section: 'footer', content_key: 'about_text', content_value: 'Logifex Freight Services provides reliable, flexible, and end-to-end logistics solutions connecting businesses globally.' },
  { page: 'global', section: 'footer', content_key: 'uae_address', content_value: 'UAE HQ: Dubai, United Arab Emirates' },
  { page: 'global', section: 'footer', content_key: 'india_address', content_value: 'India Hub: Cochin, Kerala' },
  { page: 'global', section: 'footer', content_key: 'uk_address', content_value: 'UK Hub: London, United Kingdom' },
  { page: 'global', section: 'footer', content_key: 'copyright', content_value: '© 2024 Logifex Freight Services. All rights reserved.' },

  // CONTACT PAGE
  { page: 'contact', section: 'hero', content_key: 'tagline', content_value: 'Global Trade Desk' },
  { page: 'contact', section: 'hero', content_key: 'title', content_value: 'Connect with our Regional Logistics Hubs' },
  { page: 'contact', section: 'hero', content_key: 'description', content_value: 'Speak directly with experienced freight forwarders, customs brokers, and project cargo specialists across the UAE, India, and the UK.' },
  
  { page: 'contact', section: 'uae', content_key: 'title', content_value: 'UAE Headquarters - Dubai' },
  { page: 'contact', section: 'uae', content_key: 'address', content_value: 'Al Qusais 2, PO Box 89201, Dubai, United Arab Emirates' },
  { page: 'contact', section: 'uae', content_key: 'phone', content_value: '+971 45752307' },
  { page: 'contact', section: 'uae', content_key: 'email', content_value: 'info@logifexgroup.com' },

  { page: 'contact', section: 'india', content_key: 'title', content_value: 'India Regional Center' },
  { page: 'contact', section: 'india', content_key: 'address', content_value: 'Tripunithura, Cochin, Kerala 682301, India' },
  { page: 'contact', section: 'india', content_key: 'phone', content_value: '+91 484 277 8899' },
  { page: 'contact', section: 'india', content_key: 'email', content_value: 'india@logifexgroup.com' },

  { page: 'contact', section: 'uk', content_key: 'title', content_value: 'UK & Europe Hub' },
  { page: 'contact', section: 'uk', content_key: 'address', content_value: 'London Logistics Corridor, Greater London, United Kingdom' },
  { page: 'contact', section: 'uk', content_key: 'phone', content_value: '+44 20 7946 0912' },
  { page: 'contact', section: 'uk', content_key: 'email', content_value: 'uk@logifexgroup.com' },

  { page: 'contact', section: 'form', content_key: 'title', content_value: 'Send a Direct Operational Inquiry' },
  { page: 'contact', section: 'form', content_key: 'subtitle', content_value: 'Our forwarders reply within 1 hour during active business hours.' },

  // QUOTE PAGE
  { page: 'quote', section: 'hero', content_key: 'tagline', content_value: 'Rate Request & Quotation' },
  { page: 'quote', section: 'hero', content_key: 'title', content_value: 'Get a Freight Estimate' },
  { page: 'quote', section: 'hero', content_key: 'description', content_value: 'Provide your shipment details below, and our pricing team will formulate a competitive, comprehensive quote tailored to your timeline and cargo specifications.' },

  // SERVICES PAGE
  { page: 'services', section: 'hero', content_key: 'title', content_value: 'Our Services' },
  { page: 'services', section: 'hero', content_key: 'subtitle', content_value: 'Comprehensive global logistics and supply chain solutions tailored to your industry.' },
  { page: 'services', section: 'hero', content_key: 'hero_image', content_value: '/images/freight_services_banner.jpg', content_type: 'image_url' },
];

async function seed() {
  console.log('Starting seed...');
  for (const item of initialData) {
    const { error } = await supabase
      .from('site_content')
      .upsert(
        { ...item, content_type: item.content_type || 'text', updated_at: new Date().toISOString() },
        { onConflict: 'page,section,content_key,group_id' }
      );
    if (error) {
      console.error('Error inserting', item.content_key, error);
    } else {
      console.log('Inserted:', item.page, item.section, item.content_key);
    }
  }
  console.log('Seed complete.');
}

seed();

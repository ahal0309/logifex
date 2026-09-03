-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Careers Table
CREATE TABLE IF NOT EXISTS public.careers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    department TEXT NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for careers
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active careers" ON public.careers FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can do everything on careers" ON public.careers FOR ALL USING (auth.role() = 'authenticated');

-- 2. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    supporting_text TEXT NOT NULL,
    image_url TEXT NOT NULL,
    href TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can do everything on services" ON public.services FOR ALL USING (auth.role() = 'authenticated');

-- 3. Industries Table
CREATE TABLE IF NOT EXISTS public.industries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    tag TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for industries
ALTER TABLE public.industries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active industries" ON public.industries FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can do everything on industries" ON public.industries FOR ALL USING (auth.role() = 'authenticated');

-- 4. Site Content Table
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content_key TEXT NOT NULL,
    content_value TEXT,
    content_type TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    group_id TEXT,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (page, section, content_key, group_id)
);

-- RLS for site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can do everything on site content" ON public.site_content FOR ALL USING (auth.role() = 'authenticated');

-- 5. Storage Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('public-assets', 'public-assets', true) ON CONFLICT DO NOTHING;

-- RLS for Storage
CREATE POLICY "Public can view assets" ON storage.objects FOR SELECT USING (bucket_id = 'public-assets');
CREATE POLICY "Admins can upload assets" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can update assets" ON storage.objects FOR UPDATE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');
CREATE POLICY "Admins can delete assets" ON storage.objects FOR DELETE USING (bucket_id = 'public-assets' AND auth.role() = 'authenticated');

-- 6. Initial Seed Data
-- Careers
INSERT INTO public.careers (title, location, type, department, description, display_order) VALUES
('Logistics Coordinator', 'UAE HQ (Dubai)', 'Full-Time', 'Operations', 'Coordinate and monitor supply chain operations, ensure effective communication with clients and suppliers, and resolve any arising problems or complaints.', 1),
('Sales Executive - Freight Forwarding', 'India Hub (Cochin)', 'Full-Time', 'Sales', 'Drive new business acquisition and maintain relationships with existing clients to promote our comprehensive freight solutions.', 2),
('Customs Brokerage Specialist', 'UK Hub (London)', 'Full-Time', 'Compliance', 'Ensure compliance with international customs regulations and facilitate the smooth clearance of goods for our clients.', 3)
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO public.services (title, description, supporting_text, image_url, href, display_order) VALUES
('Air Freight', 'Fast, reliable, and secure air freight solutions for time-sensitive shipments.', 'Global Air Transit • Priority Cargo', '/images/air-freight.png', '/services/air-freight', 1),
('Sea Freight', 'Reliable and economical ocean freight solutions for global cargo transportation.', 'Ocean Carrier • FCL & LCL Consolidation', '/images/sea-freight.png', '/services/sea-freight', 2),
('Road Transport', 'Flexible cross-border and door-to-door road transportation solutions.', 'GCC Linehaul • Overland Transport', '/images/road-transport.png', '/services/road-transport', 3),
('Intermodal Logistics', 'Seamless coordination across multiple transportation modes for efficient cargo movement.', 'Rail & Multimodal Connectivity', '/images/intermodal-logistics.png', '/services/intermodal', 4),
('Customs Clearance', 'Efficient customs documentation and clearance support for smooth international shipments.', 'Licensed Brokerage • HS Code Compliance', '/images/customs-clearance.png', '/services/customs-clearance', 5),
('Warehousing', 'Secure and organized warehousing solutions for efficient inventory management.', 'Bonded Facilities • WMS Inventory', '/images/warehousing.png', '/services/warehousing', 6),
('Packing and Labelling', 'Professional packing and labelling solutions to ensure cargo protection and compliance.', 'Cargo Protection • Industrial Compliance', '/images/packing-labelling.png', '/services/packing-labelling', 7),
('Roro', 'Specialized roll-on/roll-off shipping for wheeled cargo, vehicles, and heavy machinery.', 'Vehicle Logistics • Roll-On/Roll-Off', '/images/roro.png', '/services/roro', 8),
('Breakbulk', 'Tailored transport and lifting solutions for heavy, oversized, and non-containerized cargo.', 'Heavy Lift • Oversized Cargo', '/images/breakbulk.png', '/services/breakbulk', 9)
ON CONFLICT DO NOTHING;

-- Industries
INSERT INTO public.industries (title, tag, description, image_url, display_order) VALUES
('Manufacturing', 'Industrial Logistics', 'High-volume assembly logistics, industrial raw materials, and finished goods distribution.', '/images/industries/professional_high_quality_full_frame_photograph_of_a_modern_manufacturing.png', 1),
('Retail & E-commerce', 'Omnichannel Retail', 'End-to-end warehousing, order fulfillment, and swift last-mile delivery networks.', '/images/industries/professional_high_quality_full_frame_photograph_for_retail_e_commerce._a_person.png', 2),
('Pharmaceuticals', 'Healthcare Logistics', 'Strict temperature-controlled cold chains, GDP compliance, and medical equipment transport.', '/images/industries/professional_high_quality_full_frame_photograph_for_the_pharmaceuticals.png', 3),
('FMCG', 'Fast-Moving Goods', 'Rapid inventory turnaround, grocery distribution, and high-frequency supply chains.', '/images/industries/professional_high_quality_full_frame_photograph_for_the_fmcg_fast_moving.png', 4),
('Oil And Gas', 'Energy & Resources', 'Heavy machinery linehaul, hazardous material compliance, and remote site supply support.', '/images/industries/professional_high_quality_full_frame_photograph_for_the_oil_and_gas_industry..png', 5),
('Automation', 'Advanced Tech', 'Precision electronics transport, high-tech robotics component supply, and cleanroom handling.', '/images/industries/professional_high_quality_full_frame_photograph_for_the_automation_industry..png', 6),
('Food Stuff', 'Cold Chain', 'Perishable grocery logistics, food safety standards compliance, and temperature-monitored shipping.', '/images/industries/professional_high_quality_full_frame_photograph_for_the_food_industry._a.png', 7),
('Automobile', 'Automotive Logistics', 'Just-in-time auto parts sequencing, finished vehicle shipping, and spare parts distribution.', '/images/industries/professional_high_quality_full_frame_photograph_for_the_automobile_industry._a.png', 8),
('Aviation', 'Aerospace', 'Critical AOG (Aircraft on Ground) logistics support, engine transport, and custom chartering.', '/images/industries/professional_high_quality_full_frame_photograph_for_the_aviation_industry._a.png', 9)
ON CONFLICT DO NOTHING;

-- Site Content
INSERT INTO public.site_content (page, section, content_key, content_value, content_type) VALUES
('home', 'hero', 'headline_line1', 'Seamless Freight,', 'text'),
('home', 'hero', 'headline_line2', 'Seamless Solutions.', 'text'),
('home', 'hero', 'subtext', 'Trusted Freight. Tailored Solutions. We offer world-class Air, Rail, Road, Sea, and specialized multimodal logistics – ensuring fast, compliant, and reliable global transport.', 'text'),
('home', 'hero', 'hero_video', '/images/hero-video.mp4', 'text'),
('home', 'about', 'about_bg_image', '/images/warehouse.png', 'image_url'),
('about', 'hero', 'image_url', '/images/about_hero_logistics.jpg', 'image_url'),
('about', 'hero', 'tagline', 'Connecting Businesses. Moving Possibilities.', 'text')
ON CONFLICT DO NOTHING;

-- 7. Insights Table
CREATE TABLE IF NOT EXISTS public.insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date_published DATE NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    gallery_urls JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for insights
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active insights" ON public.insights FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can do everything on insights" ON public.insights FOR ALL USING (auth.role() = 'authenticated');

-- 8. Galleries Table
CREATE TABLE IF NOT EXISTS public.galleries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    media_url TEXT NOT NULL,
    media_type TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for galleries
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active galleries" ON public.galleries FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can do everything on galleries" ON public.galleries FOR ALL USING (auth.role() = 'authenticated');

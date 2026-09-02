import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const newIndustries = [
  {
    title: "Oil & Gas",
    tag: "oil-gas",
    description: "Project cargo, drilling equipment, spare parts, DG cargo, air freight",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_the_oil_and_gas_industry..png",
    is_active: true,
    display_order: 1
  },
  {
    title: "Construction & Infrastructure",
    tag: "construction-infrastructure",
    description: "Heavy machinery, steel, building materials, project cargo, ODC",
    image_url: "/images/industries/construction_materials.jpg",
    is_active: true,
    display_order: 2
  },
  {
    title: "Manufacturing",
    tag: "manufacturing",
    description: "Raw materials, machinery, components, finished goods",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_of_a_modern_manufacturing.png",
    is_active: true,
    display_order: 3
  },
  {
    title: "Automotive",
    tag: "automotive",
    description: "Vehicles, spare parts, CKD/SKD, RORO, urgent parts",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_the_automobile_industry._a.png",
    is_active: true,
    display_order: 4
  },
  {
    title: "Pharmaceuticals & Healthcare",
    tag: "pharmaceuticals-healthcare",
    description: "Air freight, temperature-controlled cargo, medical equipment",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_the_pharmaceuticals.png",
    is_active: true,
    display_order: 5
  },
  {
    title: "Food & Beverage",
    tag: "food-beverage",
    description: "FCL/LCL, reefer containers, food products, customs clearance",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_the_food_industry._a.png",
    is_active: true,
    display_order: 6
  },
  {
    title: "FMCG",
    tag: "fmcg",
    description: "High-volume container shipments, warehousing, distribution",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_the_fmcg_fast_moving.png",
    is_active: true,
    display_order: 7
  },
  {
    title: "Retail & Wholesale",
    tag: "retail-wholesale",
    description: "FCL/LCL, consolidation, warehousing and distribution",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_retail_e_commerce._a_person.png",
    is_active: true,
    display_order: 8
  },
  {
    title: "E-commerce",
    tag: "e-commerce",
    description: "Air freight, sea freight, fulfillment, returns",
    image_url: "/images/industries/ecommerce_logistics_1788178060673.jpg",
    is_active: true,
    display_order: 9
  },
  {
    title: "Electronics & Electrical",
    tag: "electronics-electrical",
    description: "High-value cargo, air freight, secure warehousing",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_the_automation_industry..png",
    is_active: true,
    display_order: 10
  },
  {
    title: "Chemicals & Petrochemicals",
    tag: "chemicals-petrochemicals",
    description: "DG cargo, tank containers, specialized documentation",
    image_url: "/images/industries/chemicals_products.jpg",
    is_active: true,
    display_order: 11
  },
  {
    title: "Machinery & Industrial Equipment",
    tag: "machinery-industrial",
    description: "Heavy machinery, OOG/ODC, breakbulk and project cargo",
    image_url: "/images/industries/machinery_logistics_1788178080067.jpg",
    is_active: true,
    display_order: 12
  },
  {
    title: "Renewable Energy",
    tag: "renewable-energy",
    description: "Solar panels, batteries, turbines, project cargo",
    image_url: "/images/industries/renewable_energy.jpg",
    is_active: true,
    display_order: 13
  },
  {
    title: "Power & Utilities",
    tag: "power-utilities",
    description: "Transformers, generators, cables, turbines and equipment",
    image_url: "/images/industries/power_utilities_logistics_1788178095200.jpg",
    is_active: true,
    display_order: 14
  },
  {
    title: "Mining & Metals",
    tag: "mining-metals",
    description: "Machinery, metals, minerals, heavy and bulk cargo",
    image_url: "/images/industries/steel_metal.jpg",
    is_active: true,
    display_order: 15
  },
  {
    title: "Agriculture & Agro Products",
    tag: "agriculture-agro",
    description: "Rice, spices, grains, fertilizers, agricultural machinery",
    image_url: "/images/industries/agriculture_agro.jpg",
    is_active: true,
    display_order: 16
  },
  {
    title: "Textiles & Garments",
    tag: "textiles-garments",
    description: "Fabric, yarn, garments, accessories, air/sea freight",
    image_url: "/images/industries/textiles_garments.jpg",
    is_active: true,
    display_order: 17
  },
  {
    title: "Furniture & Interior Products",
    tag: "furniture-interior",
    description: "Furniture, fittings, fixtures, FCL/LCL shipments",
    image_url: "/images/industries/furniture_home.jpg",
    is_active: true,
    display_order: 18
  },
  {
    title: "Aerospace & Aviation",
    tag: "aerospace-aviation",
    description: "AOG shipments, aircraft parts, time-critical air freight",
    image_url: "/images/industries/professional_high_quality_full_frame_photograph_for_the_aviation_industry._a.png",
    is_active: true,
    display_order: 19
  },
  {
    title: "Marine & Shipbuilding",
    tag: "marine-shipbuilding",
    description: "Ship spares, marine equipment, engines, urgent deliveries",
    image_url: "/images/industries/marine_supplies.jpg",
    is_active: true,
    display_order: 20
  },
  {
    title: "Engineering & EPC Companies",
    tag: "engineering-epc",
    description: "Complete project logistics, breakbulk, heavy lift, multimodal",
    image_url: "/images/industries/engineering_project.jpg",
    is_active: true,
    display_order: 21
  }
];

async function run() {
  console.log("Deleting existing industries...");
  const { error: delError } = await supabase.from('industries').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) {
    console.error("Error deleting:", delError);
    return;
  }
  
  console.log("Inserting new industries...");
  const { error: insError } = await supabase.from('industries').insert(newIndustries);
  if (insError) {
    console.error("Error inserting:", insError);
  } else {
    console.log("Successfully updated 21 industries!");
  }
}

run();

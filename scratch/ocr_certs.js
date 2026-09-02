const Tesseract = require('tesseract.js');
const path = require('path');

const images = [
  'cert-1.jpg',
  'cert-2.jpg',
  'cert-3.jpg',
  'cert-4.jpg',
  'cert-5.jpg',
  'cert-6.jpg',
];

async function run() {
  for (const img of images) {
    const p = path.join(__dirname, '../public/images/certificates/', img);
    console.log(`Processing ${img}...`);
    try {
      const { data: { text } } = await Tesseract.recognize(p, 'eng', { logger: () => {} });
      console.log(`--- ${img} ---\n${text.substring(0, 150)}\n`);
    } catch(e) {
      console.error(e);
    }
  }
}
run();

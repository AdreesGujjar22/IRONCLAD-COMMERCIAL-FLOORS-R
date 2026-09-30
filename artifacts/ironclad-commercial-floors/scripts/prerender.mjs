// Post-build prerender: writes a real HTML file per route (title, meta, canonical,
// JSON-LD and crawlable body copy) so Google does not depend on JavaScript.
// Uses the SSR bundle (dist/server) so the HTML sent to crawlers is the same markup React renders.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist/public');
const serverDir = join(root, 'dist/server');
const entry = readdirSync(serverDir).find((f) => /^entry-server\.(m?js)$/.test(f));
if (!entry) throw new Error('SSR bundle not found in dist/server');
const { render, services, areas, faqItems, reviews, pageMeta } = await import(pathToFileURL(join(serverDir, entry)).href);
const SITE = 'https://ironcladcommercialfloors.ca';
const NAME = 'Ironclad Commercial Floors';
const PHONE = '(604) 540-3999';
const TEL = 'tel:+16045403999';
const LASTMOD = new Date().toISOString().slice(0, 10);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const business = {
  '@type': 'LocalBusiness', '@id': `${SITE}/#business`, name: NAME, url: SITE,
  description: 'Commercial flooring installation, repair, replacement and epoxy flooring across Vancouver and the Lower Mainland.',
  telephone: '+1-604-540-3999', priceRange: '$$', image: `${SITE}/assets/ironclad-interior.webp`,
  logo: `${SITE}/assets/ironclad-logo.webp`,
  address: { '@type': 'PostalAddress', streetAddress: '783 E 60th Ave', addressLocality: 'Vancouver', addressRegion: 'BC', postalCode: 'V5X 2A5', addressCountry: 'CA' },
  geo: { '@type': 'GeoCoordinates', latitude: 49.2158, longitude: -123.0910 },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  areaServed: areas.map((a) => a.name),
  hasMap: 'https://www.google.com/maps/search/?api=1&query=IRONCLAD+COMMERCIAL+FLOORS+783+E+60th+Ave+Vancouver+BC',
};


const pages = [];
pages.push({ path: '/', ...pageMeta.home, crumbs: [] });
pages.push({ path: '/services', ...pageMeta.services, crumbs: [['Services', '/services']] });
for (const s of services) pages.push({ path: `/services/${s.slug}`, title: s.title, description: s.description, image: s.image, crumbs: [['Services', '/services'], [s.name, `/services/${s.slug}`]], faqs: s.faqs, service: s });
pages.push({ path: '/areas', ...pageMeta.areas, crumbs: [['Service areas', '/areas']] });
for (const a of areas) pages.push({ path: `/areas/${a.slug}`, title: a.title, description: a.description, crumbs: [['Service areas', '/areas'], [a.name, `/areas/${a.slug}`]], area: a });
pages.push({ path: '/contact', ...pageMeta.contact, crumbs: [['Contact', '/contact']] });
pages.push({ path: '/faq', ...pageMeta.faq, crumbs: [['FAQ', '/faq']], faqs: faqItems });
pages.push({ path: '/reviews', ...pageMeta.reviews, crumbs: [['Reviews', '/reviews']] });

const graph = (p) => {
  const url = SITE + (p.path === '/' ? '/' : p.path);
  const g = [business];
  if (p.path === '/') g.push({ '@type': 'WebSite', '@id': `${SITE}/#website`, name: NAME, url: SITE, publisher: { '@id': `${SITE}/#business` } });
  else g.push({ '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ...p.crumbs].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + u })) });
  if (p.service) g.push({ '@type': 'Service', name: p.service.name, description: p.description, provider: { '@id': `${SITE}/#business` }, areaServed: areas.map((a) => a.name), url });
  if (p.area) g.push({ '@type': 'Service', name: `Commercial flooring in ${p.area.name}`, description: p.description, provider: { '@id': `${SITE}/#business` }, areaServed: p.area.name, url });
  if (p.faqs && p.path === '/faq') g.push({ '@type': 'FAQPage', mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) });
  return { '@context': 'https://schema.org', '@graph': g };
};

const template = readFileSync(join(dist, 'index.html'), 'utf8')
  .replace(/<title>[\s\S]*?<\/title>/, '')
  .replace(/<meta (name|property)="(description|robots|og:[a-z:]+|twitter:[a-z:]+)"[^>]*>\s*/g, '')
  .replace(/<link rel="canonical"[^>]*>\s*/g, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '');

for (const p of pages) {
  const url = SITE + p.path;
  const img = SITE + (p.image || '/assets/ironclad-interior.webp');
  const head = `<title>${esc(p.title)}</title>
    <meta name="description" content="${esc(p.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(p.title)}" />
    <meta property="og:description" content="${esc(p.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="${NAME}" />
    <meta property="og:locale" content="en_CA" />
    <meta property="og:image" content="${img}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.title)}" />
    <meta name="twitter:description" content="${esc(p.description)}" />
    <meta name="twitter:image" content="${img}" />
    <script type="application/ld+json" id="ironclad-structured-data">${JSON.stringify(graph(p))}</script>`;
  const html = template
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${render(p.path)}</div>`);
  const out = p.path === '/' ? join(dist, 'index.html') : join(dist, p.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE}${p.path === '/' ? '/' : p.path}</loc><lastmod>${LASTMOD}</lastmod></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
console.log(`Prerendered ${pages.length} pages + sitemap.xml`);

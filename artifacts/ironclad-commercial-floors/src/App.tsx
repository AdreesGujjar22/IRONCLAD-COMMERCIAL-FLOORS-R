import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Layers3,
  Menu,
  Phone,
  Ruler,
  ShieldCheck,
  Star,
  Wrench,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  useParams,
  Router as WouterRouter,
} from 'wouter';

const phoneHref = 'tel:+16045403999';
const phoneLabel = '(604) 540-3999';
const mapHref =
  'https://www.google.com/maps/search/?api=1&query=IRONCLAD+COMMERCIAL+FLOORS+783+E+60th+Ave+Vancouver+BC';
const gmbEmbedSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.1947246002865!2d-123.09095292351502!3d49.215834071382915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5486751bef21a57d%3A0x41cd6e337360bab!2sIRONCLAD%20COMMERCIAL%20FLOORS!5e0!3m2!1sen!2s!4v1790622081160!5m2!1sen!2s';
const siteName = 'Ironclad Commercial Floors';
const lastUpdated = '2026-09-29';
const lastUpdatedLabel = 'Updated September 29, 2026';

import { services, areas, faqItems, reviews, pageMeta } from './site-data';

const localBusinessSchema = {
  '@type': 'LocalBusiness',
  '@id': 'https://ironcladcommercialfloors.ca/#business',
  name: siteName,
  description:
    'Commercial flooring installation, repair, replacement, and epoxy flooring across Vancouver and the Lower Mainland.',
  telephone: '+1-604-540-3999',
  url: 'https://ironcladcommercialfloors.ca',
  image: 'https://ironcladcommercialfloors.ca/assets/ironclad-interior.webp',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '783 E 60th Ave',
    addressLocality: 'Vancouver',
    addressRegion: 'BC',
    postalCode: 'V5X 2A5',
    addressCountry: 'CA',
  },
  areaServed: areas.map((area) => area.name),
  hasMap: mapHref,
};

function makeSchema(pageSchema: Record<string, unknown>, crumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...localBusinessSchema },
      { ...pageSchema, dateModified: lastUpdated },
      {
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    ],
  };
}

function SEO({
  title,
  description,
  schema,
  image = '/assets/ironclad-interior.webp',
}: {
  title: string;
  description: string;
  schema: Record<string, unknown>;
  image?: string;
}) {
  const [location] = useLocation();

  useEffect(() => {
    document.title = title;
    const absoluteUrl = new URL(location, window.location.origin).toString();
    const absoluteImage = new URL(image, window.location.origin).toString();
    const metas: [string, string, string][] = [
      ['name', 'description', description],
      ['name', 'robots', 'index, follow'],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:type', 'website'],
      ['property', 'og:url', absoluteUrl],
      ['property', 'og:site_name', siteName],
      ['property', 'og:image', absoluteImage],
      ['property', 'og:image:alt', `${siteName} commercial flooring work`],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', absoluteImage],
    ];
    metas.forEach(([attribute, key, content]) => {
      let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', absoluteUrl);

    let structuredData = document.head.querySelector('#ironclad-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'ironclad-structured-data';
      structuredData.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }, [description, image, location, schema, title]);

  return null;
}

function AppLink({
  href,
  children,
  onClick,
  className = '',
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`transition-colors hover:text-[#a7d65f] ${className}`}
    >
      {children}
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  return (
    <header className="absolute left-0 right-0 top-0 z-30 border-b border-white/15 text-[#f3efe7]">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <AppLink href="/" onClick={closeMenu}>
          <span className="flex items-center gap-3">
            <img
              src="/assets/ironclad-logo.webp"
              alt="Ironclad Commercial Floors logo"
              className="h-12 w-12 rounded-sm object-cover"
              width="96"
              height="96"
            />
            <span className="hidden text-[11px] font-bold uppercase leading-[1.05] tracking-[.18em] sm:block">
              Ironclad
              <br />
              <span className="text-[#a7d65f]">Commercial Floors</span>
            </span>
          </span>
        </AppLink>
        <nav
          className="hidden items-center gap-7 text-[11px] font-bold uppercase tracking-[.14em] lg:flex"
          aria-label="Primary navigation"
        >
          <AppLink href="/services">Services</AppLink>
          <AppLink href="/areas">Service areas</AppLink>
          <AppLink href="/reviews">Reviews</AppLink>
          <AppLink href="/faq">FAQ</AppLink>
           <AppLink href="/contact">Contact</AppLink>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={phoneHref}
            className="hidden items-center gap-2 text-[12px] font-bold tracking-[.06em] transition-colors hover:text-[#a7d65f] sm:flex"
          >
            <Phone size={15} /> {phoneLabel}
          </a>
          <a
             href="/contact"
            className="hidden bg-[#a7d65f] px-4 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-[#102021] transition-colors hover:bg-[#d1f28e] md:block"
          >
            Request a quote <ArrowUpRight size={14} className="ml-2 inline" />
          </a>
          <button
            type="button"
             className="cursor-pointer p-2 lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-[#102021]/75 transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={closeMenu}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-[min(88vw,380px)] flex-col bg-[#102021] px-7 pb-8 pt-6 text-[#f3efe7] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <span className="flex items-center gap-3">
            <img src="/assets/ironclad-logo.webp" alt="Ironclad Commercial Floors logo" className="h-10 w-10 rounded-sm object-cover" width="80" height="80" />
            <span className="text-[10px] font-bold uppercase leading-[1.05] tracking-[.16em]">Ironclad<br /><span className="text-[#a7d65f]">Commercial Floors</span></span>
          </span>
          <button type="button" className="cursor-pointer p-2" aria-label="Close menu" onClick={closeMenu}><X size={22} /></button>
        </div>
        <nav className="flex flex-col gap-6 pt-10 text-sm font-bold uppercase tracking-[.16em]" aria-label="Mobile navigation links">
          <AppLink href="/services" onClick={closeMenu}>Services</AppLink>
          <AppLink href="/areas" onClick={closeMenu}>Service areas</AppLink>
          <AppLink href="/reviews" onClick={closeMenu}>Reviews</AppLink>
          <AppLink href="/faq" onClick={closeMenu}>FAQ</AppLink>
          <AppLink href="/contact" onClick={closeMenu}>Contact</AppLink>
        </nav>
        <div className="mt-auto border-t border-white/15 pt-6">
          <a href={phoneHref} className="flex items-center gap-3 text-[#a7d65f]"><Phone size={16} /> {phoneLabel}</a>
          <p className="mt-3 font-mono-label text-[9px] uppercase tracking-[.14em] text-[#9eaba0]">24/7 rapid service available</p>
        </div>
      </aside>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#102021] py-8 text-[#c5cec3]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-5 text-[10px] sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex items-center gap-3">
          <img
            src="/assets/ironclad-logo.webp"
            alt="Ironclad Commercial Floors logo"
            className="h-9 w-9 rounded-sm object-cover"
            width="72"
            height="72"
          />
          <span className="font-bold uppercase tracking-[.15em]">{siteName}</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono-label uppercase tracking-[.12em]" aria-label="Footer navigation">
          <AppLink href="/services">Services</AppLink>
          <AppLink href="/areas">Areas</AppLink>
          <AppLink href="/reviews">Reviews</AppLink>
          <AppLink href="/faq">FAQ</AppLink>
           <AppLink href="/contact">Quote</AppLink>
        </nav>
         <div className="text-right">
           <p className="font-mono-label uppercase tracking-[.12em] text-[#7e8c82]">© {siteName}</p>
           <p className="mt-2 font-mono-label text-[9px] uppercase tracking-[.12em] text-[#687566]">{lastUpdatedLabel}</p>
         </div>
      </div>
    </footer>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden bg-[#f3efe7] text-[#102021]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>{children}</div>;
}

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono-label text-[10px] uppercase tracking-[.16em] text-[#869188]">
      <AppLink href="/">Home</AppLink>
      {items.map((item) => (
        <span key={item.name} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? <AppLink href={item.href}>{item.name}</AppLink> : <span className="text-[#c9d0c5]">{item.name}</span>}
        </span>
      ))}
    </nav>
  );
}

function StandardHero({
  kicker,
  title,
  intro,
  crumbs,
  image,
  imageAlt,
}: {
  kicker: string;
  title: ReactNode;
  intro: string;
  crumbs: { name: string; href?: string }[];
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#102021] pb-20 pt-36 text-[#f3efe7] sm:pb-28 sm:pt-44">
      <div className="hero-grid absolute inset-0 opacity-70" />
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-50 mix-blend-luminosity" width="1200" height="900" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102021] via-[#102021]/70 to-transparent" />
        </div>
      )}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <Breadcrumbs items={crumbs} />
        <div className="mt-14 max-w-[780px]">
          <p className="flex items-center gap-3 font-mono-label text-[10px] uppercase tracking-[.24em] text-[#a7d65f]">
            <span className="h-px w-10 bg-[#a7d65f]" /> {kicker}
          </p>
          <h1 className="mt-7 font-display text-[clamp(3.3rem,8vw,7rem)] font-bold leading-[.88] tracking-[-.06em]">
            {title}
          </h1>
          <p className="mt-8 max-w-[600px] text-lg leading-relaxed text-[#c9d0c5] sm:text-xl">{intro}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="/contact" className="inline-flex items-center justify-center bg-[#a7d65f] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-[#102021] transition-transform hover:-translate-y-1">
              Get a site estimate <ArrowUpRight size={16} className="ml-3" />
            </a>
            <a href={phoneHref} className="inline-flex items-center justify-center border border-[#c9d0c5]/40 px-6 py-4 text-xs font-bold uppercase tracking-[.16em] transition-colors hover:border-[#a7d65f] hover:text-[#a7d65f]">
              <Phone size={15} className="mr-3" /> Call 24/7 service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', scope: 'Installation', message: '' });
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="flex min-h-[420px] flex-col justify-center">
        <div className="mb-7 flex h-14 w-14 items-center justify-center bg-[#a7d65f]"><Check size={28} /></div>
        <p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">Inquiry received</p>
        <h3 className="mt-4 font-display text-4xl font-bold leading-none tracking-[-.04em]">We&apos;ll be in touch.</h3>
        <p className="mt-5 max-w-[400px] text-sm leading-relaxed text-[#53615c]">Thanks for reaching out to Ironclad Commercial Floors. For urgent service, call us now at {phoneLabel}.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="mt-8 self-start border-b border-[#102021] pb-1 text-[10px] font-bold uppercase tracking-[.16em]">Send another inquiry</button>
      </div>
    );
  }
  return (
    <form onSubmit={submitInquiry} className="grid gap-5 sm:grid-cols-2">
      {([
        ['name', 'Name', 'Your name', 'text', true],
        ['company', 'Company', 'Company name', 'text', false],
        ['phone', 'Phone', '(604) 000-0000', 'tel', true],
        ['email', 'Email', 'you@company.com', 'email', true],
      ] as const).map(([field, label, placeholder, type, required]) => (
        <label key={field} className="text-[10px] font-bold uppercase tracking-[.14em]">
          {label}
          <input required={required} type={type} value={form[field]} onChange={(event) => updateField(field, event.target.value)} className="mt-2 w-full border-0 border-b border-[#aeb7aa] bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#788c5c]" placeholder={placeholder} />
        </label>
      ))}
      <label className="text-[10px] font-bold uppercase tracking-[.14em] sm:col-span-2">
        What do you need?
        <select value={form.scope} onChange={(event) => updateField('scope', event.target.value)} className="mt-2 w-full border-0 border-b border-[#aeb7aa] bg-transparent px-0 py-3 text-base font-normal outline-none">
          <option>Installation</option><option>Repair</option><option>Replacement</option><option>Epoxy or concrete</option><option>Not sure yet</option>
        </select>
      </label>
      <label className="text-[10px] font-bold uppercase tracking-[.14em] sm:col-span-2">
        A few details
        <textarea rows={3} value={form.message} onChange={(event) => updateField('message', event.target.value)} className="mt-2 w-full resize-none border-0 border-b border-[#aeb7aa] bg-transparent px-0 py-3 text-base font-normal outline-none transition-colors focus:border-[#788c5c]" placeholder="Tell us about the space, timing, or urgency." />
      </label>
      <div className="flex items-center justify-between gap-5 pt-3 sm:col-span-2">
        <p className="max-w-[240px] text-[10px] leading-relaxed text-[#687566]">By submitting, you are asking Ironclad to contact you about your flooring needs.</p>
        <button type="submit" className="inline-flex shrink-0 items-center bg-[#102021] px-5 py-4 text-[10px] font-bold uppercase tracking-[.15em] text-[#f3efe7] transition-transform hover:-translate-y-1">Send inquiry <ArrowUpRight size={15} className="ml-3 text-[#a7d65f]" /></button>
      </div>
    </form>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-16 bg-[#17302e] py-24 text-[#f3efe7] sm:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="mb-5 font-mono-label text-[10px] uppercase tracking-[.2em] text-[#a7d65f]">Start with a conversation</p>
            <h2 className="font-display text-5xl font-bold leading-[.93] tracking-[-.05em] sm:text-7xl">Tell us what<br />the floor<br /><span className="text-[#a7d65f]">needs.</span></h2>
            <p className="mt-8 max-w-[390px] text-base leading-relaxed text-[#c4cec2]">Share a few details and we&apos;ll follow up to arrange your free on-site estimate. Need a rapid response? Call us directly.</p>
            <a href={phoneHref} className="mt-9 inline-flex items-center text-lg font-bold text-[#a7d65f]"><Phone size={18} className="mr-3" /> {phoneLabel}</a>
            <p className="mt-4 font-mono-label text-[9px] uppercase tracking-[.16em] text-[#9eaba0]">24/7 rapid service available</p>
          </div>
          <div className="bg-[#f3efe7] p-6 text-[#102021] sm:p-10"><QuoteForm /></div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  useReveal();
  const schema = makeSchema(
    {
      '@type': 'WebSite',
      '@id': 'https://ironcladcommercialfloors.ca/#website',
      name: siteName,
      url: 'https://ironcladcommercialfloors.ca',
      publisher: { '@id': 'https://ironcladcommercialfloors.ca/#business' },
    },
    [{ name: 'Home', url: '/' }],
  );
  return (
    <PageShell>
      <SEO title={pageMeta.home.title} description={pageMeta.home.description} schema={schema} />
      <main id="top">
        <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#102021] pb-16 pt-32 text-[#f3efe7] sm:min-h-[800px] sm:pb-24">
          <div className="hero-grid absolute inset-0 opacity-70" />
          <div className="absolute inset-y-0 right-0 hidden w-[55%] bg-[#182b2a] lg:block">
            <img src="/assets/ironclad-interior.webp" alt="Finished commercial interior with hardwood flooring" className="h-full w-full object-cover opacity-75 mix-blend-luminosity" width="1400" height="1100" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#102021] via-[#102021]/60 to-transparent" />
            <div className="absolute inset-0 bg-[#5b6a43]/15 mix-blend-color" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-[750px]">
              <Reveal><p className="mb-7 flex items-center gap-3 font-mono-label text-[10px] uppercase tracking-[.24em] text-[#a7d65f]"><span className="h-px w-10 bg-[#a7d65f]" /> Vancouver / Lower Mainland</p></Reveal>
              <Reveal delay={1}><h1 className="font-display text-[clamp(3.45rem,9vw,8.5rem)] font-bold leading-[.86] tracking-[-.06em]">Floors that<br /><span className="text-[#a7d65f]">hold the line.</span></h1></Reveal>
              <Reveal delay={2}><p className="mt-9 max-w-[500px] text-lg leading-relaxed text-[#c9d0c5] sm:text-xl">Commercial flooring is not a cosmetic decision. It is the surface your business runs on. We install, repair, and replace it without losing your schedule.</p></Reveal>
              <Reveal delay={3}><div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="#contact" className="inline-flex items-center justify-center bg-[#a7d65f] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-[#102021] transition-transform hover:-translate-y-1">Get a site estimate <ArrowUpRight size={16} className="ml-3" /></a><a href={phoneHref} className="inline-flex items-center justify-center border border-[#c9d0c5]/40 px-6 py-4 text-xs font-bold uppercase tracking-[.16em] hover:border-[#a7d65f] hover:text-[#a7d65f]"><Phone size={15} className="mr-3" /> Call 24/7 service</a></div></Reveal>
            </div>
            <div className="mt-20 grid max-w-[700px] grid-cols-2 gap-x-8 gap-y-6 border-t border-white/20 pt-6 sm:grid-cols-4">{['Red Seal installers', '$5M WCB insured', '10-year warranty', '24/7 rapid service'].map((item, index) => <Reveal key={item}><div className="text-[11px] font-bold uppercase leading-snug tracking-[.1em] text-[#d4dad0]"><span className="mb-2 block font-mono-label text-[10px] text-[#a7d65f]">0{index + 1}</span>{item}</div></Reveal>)}</div>
          </div>
        </section>
        <section className="border-b border-[#c2c8bb] bg-[#e4e5dd] py-7"><div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><p className="font-mono-label text-[10px] uppercase tracking-[.19em] text-[#4d5a57]">One accountable flooring partner</p><div className="flex flex-wrap gap-x-7 gap-y-2 text-xs font-bold uppercase tracking-[.12em] text-[#102021]"><span>Vancouver</span><span>Burnaby</span><span>Surrey</span><span>Richmond</span><span>Lower Mainland</span></div></div></section>
        <section id="services" className="scroll-mt-16 bg-[#f3efe7] py-24 sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="mb-14 flex flex-col justify-between gap-7 sm:flex-row sm:items-end"><div className="max-w-[650px]"><p className="mb-5 font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">What we put under you</p><h2 className="font-display text-5xl font-bold leading-[.95] tracking-[-.045em] text-[#102021] sm:text-7xl">Built for the<br /><span className="text-[#788c5c]">real world.</span></h2></div><p className="max-w-[330px] text-sm leading-relaxed text-[#53615c]">From an active warehouse to a customer-facing lobby, we match the floor to the work it has to survive.</p></div><div className="grid gap-5 lg:grid-cols-3">{services.slice(0, 3).map((service, index) => <article key={service.slug} className={`group image-frame relative overflow-hidden bg-[#17302e] text-[#f3efe7] ${index === 0 ? 'lg:mt-10' : index === 2 ? 'lg:-mt-6' : ''}`}><div className="aspect-[1.05/1] overflow-hidden"><img src={service.image} alt={service.imageAlt} className="image-shift h-full w-full object-cover opacity-60 mix-blend-luminosity" width="900" height="860" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#102021] via-[#102021]/30 to-transparent" /></div><div className="absolute inset-x-0 bottom-0 p-6 sm:p-8"><div className="mb-7 flex items-center justify-between"><span className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#a7d65f]">{service.kicker}</span>{index === 0 ? <Ruler size={20} className="text-[#a7d65f]" /> : index === 1 ? <Layers3 size={20} className="text-[#a7d65f]" /> : <Wrench size={20} className="text-[#a7d65f]" />}</div><h3 className="font-display text-3xl font-bold leading-none tracking-[-.03em]">{service.name}</h3><p className="mt-4 max-w-[320px] text-sm leading-relaxed text-[#ccd4ca]">{service.intro}</p><a href={`/services/${service.slug}`} className="mt-7 inline-flex items-center text-[10px] font-bold uppercase tracking-[.16em] text-[#a7d65f]">View service details <ArrowUpRight size={14} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></article>)}</div><div className="mt-12 text-center"><a href="/services" className="border-b border-[#102021] pb-2 text-[10px] font-bold uppercase tracking-[.16em]">View every service</a></div></div></section>
        <section id="approach" className="scroll-mt-16 bg-[#102021] py-24 text-[#f3efe7] sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div className="relative"><div className="image-frame overflow-hidden border border-[#6b7b6d]/30"><img src="/assets/ironclad-team.webp" alt="Ironclad installer working on a commercial floor" className="image-shift aspect-[.92/1] w-full object-cover opacity-90" width="900" height="980" loading="lazy" /></div><div className="absolute -bottom-7 -right-5 bg-[#a7d65f] p-5 text-[#102021] sm:-right-8"><ShieldCheck size={26} /><p className="mt-3 max-w-[125px] text-[10px] font-bold uppercase leading-snug tracking-[.13em]">Bonded workmanship warranty</p><p className="mt-1 font-mono-label text-[10px]">10 years</p></div></div><div><p className="mb-5 font-mono-label text-[10px] uppercase tracking-[.2em] text-[#a7d65f]">A calmer way to manage flooring</p><h2 className="font-display text-5xl font-bold leading-[.94] tracking-[-.05em] sm:text-7xl">The job site<br />shouldn&apos;t be<br /><span className="text-[#a7d65f]">your problem.</span></h2><p className="mt-8 max-w-[530px] text-lg leading-relaxed text-[#c9d0c5]">A good floor is only half the job. The other half is knowing who is showing up, what happens next, and when you can open the doors again.</p><div className="mt-10 grid max-w-[620px] border-t border-white/15 sm:grid-cols-2">{[['01', 'We scope it clearly', 'Free on-site estimates and a written plan before work begins.'], ['02', 'We work around you', 'Overnight, weekend, and phased work designed to keep your operation moving.'], ['03', 'We own the finish', 'Red Seal certified installers, a $5M WCB policy, and a 10-year bonded warranty.'], ['04', 'We answer the phone', 'Rapid service when a damaged floor cannot wait for tomorrow.']].map(([number, title, copy]) => <div key={number} className="border-b border-white/15 py-6 sm:pr-7"><span className="font-mono-label text-[10px] text-[#a7d65f]">{number}</span><h3 className="mt-3 font-display text-2xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[#aebbb1]">{copy}</p></div>)}</div></div></div></div></section>
        <section className="bg-[#a7d65f] py-20 text-[#102021]"><div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:px-12"><p className="font-mono-label text-[10px] font-bold uppercase tracking-[.2em]">For the people keeping<br />business moving</p><h2 className="font-display text-4xl font-bold leading-[.95] tracking-[-.045em] sm:text-6xl">When your floor fails,<br />we don&apos;t make you wait.</h2></div></section>
        <section id="coverage" className="scroll-mt-16 bg-[#e4e5dd] py-24 sm:py-28"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-[1fr_.85fr] lg:items-center"><div><p className="mb-5 font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">Local, not distant</p><h2 className="font-display text-5xl font-bold leading-[.95] tracking-[-.05em] text-[#102021] sm:text-7xl">Close enough<br />to show up.</h2><p className="mt-7 max-w-[510px] text-lg leading-relaxed text-[#53615c]">Ironclad is based at 783 E 60th Ave in Vancouver and serves the businesses that keep the Lower Mainland running.</p><div className="mt-9 flex flex-wrap gap-2">{areas.map((area) => <a key={area.slug} href={`/areas/${area.slug}`} className="border border-[#aeb7aa] px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] transition-colors hover:border-[#102021]">{area.name}</a>)}</div></div><div className="relative bg-[#102021] p-8 text-[#f3efe7] sm:p-12"><div className="absolute right-8 top-8 text-[#a7d65f]"><Building2 size={29} /></div><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#a7d65f]">The Ironclad desk</p><address className="mt-12 not-italic"><p className="font-display text-3xl font-bold leading-tight">783 E 60th Ave<br />Vancouver, BC<br />V5X 2A5</p></address><a href={phoneHref} className="mt-9 inline-flex items-center border-t border-white/20 pt-5 text-sm font-bold text-[#a7d65f]"><Phone size={15} className="mr-3" /> {phoneLabel}</a><a href={mapHref} target="_blank" rel="noopener noreferrer" className="mt-5 block text-[10px] font-bold uppercase tracking-[.15em] text-[#c5cec3] hover:text-[#a7d65f]">Open map directions <ArrowUpRight size={13} className="ml-2 inline" /></a></div></div></div></section>
        <section className="bg-[#f3efe7] py-20"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-8 border-t border-[#c2c8bb] pt-8 sm:flex-row sm:items-end"><div><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">Proof from the field</p><h2 className="mt-4 font-display text-5xl font-bold leading-none tracking-[-.05em]">Trusted when<br /><span className="text-[#788c5c]">timing matters.</span></h2></div><a href="/reviews" className="text-[10px] font-bold uppercase tracking-[.16em] text-[#53615c] hover:text-[#102021]">Read project feedback <ArrowUpRight size={14} className="ml-2 inline" /></a></div></div></section>
        <ContactSection />
      </main>
    </PageShell>
  );
}

function ServicesIndex() {
  useReveal();
  const schema = makeSchema({ '@type': 'CollectionPage', name: 'Commercial Flooring Services', description: 'Commercial flooring services from Ironclad Commercial Floors.' }, [{ name: 'Services', url: '/services' }]);
  return (
    <PageShell>
      <SEO title={pageMeta.services.title} description={pageMeta.services.description} schema={schema} />
      <main><StandardHero kicker="What we do" title={<>The right floor<br />for the work.</>} intro="Commercial flooring is a performance decision. Explore the systems, surfaces, and services Ironclad uses to help Lower Mainland businesses keep moving." crumbs={[{ name: 'Services' }]} image="/assets/ironclad-epoxy.webp" imageAlt="Commercial epoxy flooring surface" /><section className="bg-[#f3efe7] py-24 sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((service) => <a key={service.slug} href={`/services/${service.slug}`} className="group image-frame relative overflow-hidden bg-[#17302e] text-[#f3efe7]"><div className="aspect-[1.08/1] overflow-hidden"><img src={service.image} alt={service.imageAlt} className="image-shift h-full w-full object-cover opacity-55 mix-blend-luminosity" width="900" height="850" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-[#102021] via-[#102021]/25 to-transparent" /></div><div className="absolute inset-x-0 bottom-0 p-7"><span className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#a7d65f]">{service.kicker}</span><h2 className="mt-4 font-display text-3xl font-bold leading-none tracking-[-.03em]">{service.name}</h2><p className="mt-4 text-sm leading-relaxed text-[#ccd4ca]">{service.bestFor}</p><span className="mt-6 inline-flex items-center text-[10px] font-bold uppercase tracking-[.16em] text-[#a7d65f]">Explore service <ArrowUpRight size={14} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></div></a>)}</div></div></section><ContactSection /></main>
    </PageShell>
  );
}

function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);
  useReveal();
  if (!service) return <NotFoundPage />;
  const schema = makeSchema({ '@type': 'Service', '@id': `https://ironcladcommercialfloors.ca/services/${service.slug}#service`, name: service.name, description: service.description, provider: { '@id': 'https://ironcladcommercialfloors.ca/#business' }, areaServed: areas.map((area) => area.name) }, [{ name: 'Services', url: '/services' }, { name: service.name, url: `/services/${service.slug}` }]);
  return (
    <PageShell>
      <SEO title={service.title} description={service.description} schema={schema} image={service.image} />
      <main><StandardHero kicker={service.kicker} title={service.name} intro={service.intro} crumbs={[{ name: 'Services', href: '/services' }, { name: service.name }]} image={service.image} imageAlt={service.imageAlt} /><section className="bg-[#f3efe7] py-24 sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-[1fr_.8fr]"><div><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">The work, clearly scoped</p><h2 className="mt-5 font-display text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">Built around<br /><span className="text-[#788c5c]">your operation.</span></h2><p className="mt-8 max-w-[580px] text-lg leading-relaxed text-[#53615c]">{service.intro} Our team can review the surface, access, schedule, and desired finish before recommending the practical next step.</p><ul className="mt-10 grid gap-4 sm:grid-cols-2">{service.bullets.map((bullet) => <li key={bullet} className="flex gap-3 border-t border-[#c2c8bb] pt-4 text-sm leading-relaxed text-[#263a37]"><Check size={17} className="mt-0.5 shrink-0 text-[#788c5c]" />{bullet}</li>)}</ul></div><div className="bg-[#e4e5dd] p-8 sm:p-12"><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">A strong fit for</p><h2 className="mt-5 font-display text-3xl font-bold leading-tight">{service.bestFor}</h2><div className="mt-10 border-t border-[#b3bdb1] pt-7"><p className="text-sm leading-relaxed text-[#53615c]">Need a fast answer? Call Ironclad directly for 24/7 rapid service and a free on-site estimate.</p><a href={phoneHref} className="mt-6 inline-flex items-center text-sm font-bold text-[#102021]"><Phone size={16} className="mr-3" /> {phoneLabel}</a></div></div></div></div></section><section className="bg-[#102021] py-24 text-[#f3efe7] sm:py-28"><div className="mx-auto max-w-[900px] px-5 sm:px-8 lg:px-12"><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#a7d65f]">Questions about {service.name.toLowerCase()}</p><h2 className="mt-5 font-display text-5xl font-bold leading-none tracking-[-.05em] sm:text-7xl">Before the work<br /><span className="text-[#a7d65f]">starts.</span></h2><div className="mt-10 divide-y divide-white/15">{service.faqs.map((faq) => <details key={faq.question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-8 font-display text-2xl font-bold">{faq.question}<ChevronDown size={20} className="shrink-0 text-[#a7d65f] transition-transform group-open:rotate-180" /></summary><p className="max-w-[700px] pt-4 text-base leading-relaxed text-[#c4cec2]">{faq.answer}</p></details>)}</div></div></section><ContactSection /></main>
    </PageShell>
  );
}

function AreasIndex() {
  const schema = makeSchema({ '@type': 'CollectionPage', name: 'Ironclad Commercial Flooring Service Areas', description: 'Service areas for Ironclad Commercial Floors across Vancouver and the Lower Mainland.' }, [{ name: 'Service areas', url: '/areas' }]);
  return <PageShell><SEO title={pageMeta.areas.title} description={pageMeta.areas.description} schema={schema} /><main><StandardHero kicker="Where we work" title={<>Close enough<br />to show up.</>} intro="Ironclad is based in Vancouver and serves the businesses that keep the Lower Mainland running. Find your area and start the conversation." crumbs={[{ name: 'Service areas' }]} image="/assets/ironclad-interior.webp" imageAlt="Commercial flooring in a finished interior" /><section className="bg-[#e4e5dd] py-24 sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{areas.map((area) => <a key={area.slug} href={`/areas/${area.slug}`} className="group border border-[#b7c0b5] bg-[#f3efe7] p-8 transition-colors hover:border-[#102021]"><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#788c5c]">Service area</p><h2 className="mt-6 font-display text-4xl font-bold leading-none tracking-[-.04em]">{area.name}</h2><p className="mt-5 text-sm leading-relaxed text-[#53615c]">{area.intro}</p><span className="mt-8 inline-flex items-center text-[10px] font-bold uppercase tracking-[.16em]">Explore area <ArrowUpRight size={14} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span></a>)}</div></div></section><ContactSection /></main></PageShell>;
}

function AreaPage() {
  const { slug } = useParams<{ slug: string }>();
  const area = areas.find((item) => item.slug === slug);
  if (!area) return <NotFoundPage />;
  const schema = makeSchema({ '@type': 'Service', '@id': `https://ironcladcommercialfloors.ca/areas/${area.slug}#service`, name: `Commercial flooring services in ${area.name}`, description: area.description, provider: { '@id': 'https://ironcladcommercialfloors.ca/#business' }, areaServed: area.name }, [{ name: 'Service areas', url: '/areas' }, { name: area.name, url: `/areas/${area.slug}` }]);
  return <PageShell><SEO title={area.title} description={area.description} schema={schema} image="/assets/ironclad-interior.webp" /><main><StandardHero kicker={`Serving ${area.name}`} title={<>Commercial floors<br />in {area.name}.</>} intro={area.intro} crumbs={[{ name: 'Service areas', href: '/areas' }, { name: area.name }]} image="/assets/ironclad-interior.webp" imageAlt={`Commercial flooring project in ${area.name}`} /><section className="bg-[#f3efe7] py-24 sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="grid gap-14 lg:grid-cols-[1fr_.85fr] lg:items-start"><div><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">Local support, practical planning</p><h2 className="mt-5 font-display text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">A flooring partner<br /><span className="text-[#788c5c]">near the work.</span></h2><p className="mt-8 max-w-[580px] text-lg leading-relaxed text-[#53615c]">{area.localCopy}</p><div className="mt-10 grid gap-4 sm:grid-cols-3">{area.highlights.map((highlight) => <div key={highlight} className="border-t border-[#c2c8bb] pt-4 text-sm font-bold leading-relaxed">{highlight}</div>)}</div></div><div className="bg-[#102021] p-8 text-[#f3efe7] sm:p-12"><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#a7d65f]">Vancouver central dispatch</p><address className="mt-10 not-italic font-display text-3xl font-bold leading-tight">783 E 60th Ave<br />Vancouver, BC<br />V5X 2A5</address><a href={mapHref} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center border-t border-white/20 pt-5 text-[10px] font-bold uppercase tracking-[.14em] text-[#a7d65f]">Get directions <ArrowUpRight size={14} className="ml-2" /></a><iframe title={`Google Business Profile map for Ironclad Commercial Floors in ${area.name}`} src={gmbEmbedSrc} className="mt-8 h-56 w-full border-0 opacity-90" width="600" height="450" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div></div></div></section><section className="bg-[#a7d65f] py-20 text-[#102021]"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center"><div><p className="font-mono-label text-[10px] font-bold uppercase tracking-[.2em]">Need a local estimate?</p><h2 className="mt-4 font-display text-4xl font-bold leading-none tracking-[-.04em] sm:text-6xl">Let&apos;s walk the space.</h2></div><a href="/contact" className="inline-flex items-center bg-[#102021] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-[#f3efe7]">Request a quote <ArrowUpRight size={15} className="ml-3 text-[#a7d65f]" /></a></div></div></section></main></PageShell>;
}

function ContactPage() {
  const description = pageMeta.contact.description;
  const schema = makeSchema(
    {
      '@type': 'ContactPage',
      '@id': 'https://ironcladcommercialfloors.ca/contact#contact',
      name: 'Contact Ironclad Commercial Floors',
      description,
      about: { '@id': 'https://ironcladcommercialfloors.ca/#business' },
    },
    [{ name: 'Contact', url: '/contact' }],
  );
  return (
    <PageShell>
      <SEO title={pageMeta.contact.title} description={pageMeta.contact.description} schema={schema} image="/assets/ironclad-installation.webp" />
      <main>
        <StandardHero
          kicker="Start the conversation"
          title={<>Let&apos;s walk<br />the space.</>}
          intro="Tell us what the floor needs, where the work is located, and when your team needs it done. We will help scope the practical next step."
          crumbs={[{ name: 'Contact' }]}
          image="/assets/ironclad-installation.webp"
          imageAlt="Ironclad Commercial Floors installation work"
        />
        <ContactSection />
        <section className="bg-[#e4e5dd] py-20 sm:py-28">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
            <div>
              <p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">Find the Ironclad desk</p>
              <h2 className="mt-5 font-display text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">Vancouver<br /><span className="text-[#788c5c]">central dispatch.</span></h2>
              <address className="mt-8 not-italic text-base leading-relaxed text-[#53615c]">783 E 60th Ave<br />Vancouver, BC V5X 2A5</address>
              <a href={mapHref} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center text-[10px] font-bold uppercase tracking-[.16em]">Open Google Business Profile <ArrowUpRight size={14} className="ml-2" /></a>
            </div>
            <iframe
              title="Google Business Profile map for Ironclad Commercial Floors"
              src={gmbEmbedSrc}
              width="600"
              height="450"
              className="h-[320px] w-full border-0 sm:h-[420px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function FAQPage() {
  const schema = makeSchema({ '@type': 'FAQPage', '@id': 'https://ironcladcommercialfloors.ca/faq#faq', mainEntity: faqItems.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }, [{ name: 'FAQ', url: '/faq' }]);
  return <PageShell><SEO title={pageMeta.faq.title} description={pageMeta.faq.description} schema={schema} /><main><StandardHero kicker="Straight answers" title={<>Questions<br />on the floor?</>} intro="Here are clear answers to the questions Vancouver businesses ask before they plan commercial flooring work." crumbs={[{ name: 'FAQ' }]} image="/assets/ironclad-repair.webp" imageAlt="Commercial flooring repair tools and materials" /><section className="bg-[#f3efe7] py-24 sm:py-32"><div className="mx-auto max-w-[980px] px-5 sm:px-8 lg:px-12"><div className="divide-y divide-[#c2c8bb]">{faqItems.map((faq) => <details key={faq.question} className="group py-7"><summary className="flex cursor-pointer list-none items-center justify-between gap-8 font-display text-2xl font-bold tracking-[-.02em] sm:text-3xl">{faq.question}<ChevronDown size={21} className="shrink-0 text-[#788c5c] transition-transform group-open:rotate-180" /></summary><p className="max-w-[760px] pt-5 text-base leading-relaxed text-[#53615c]">{faq.answer}</p></details>)}</div><div className="mt-16 border-t border-[#c2c8bb] pt-8"><p className="text-sm text-[#53615c]">Still planning the project? <a href="/#contact" className="font-bold text-[#102021] underline decoration-[#a7d65f] decoration-2 underline-offset-4">Request a free on-site estimate</a> or call <a href={phoneHref} className="font-bold text-[#102021] underline decoration-[#a7d65f] decoration-2 underline-offset-4">{phoneLabel}</a>.</p></div></div></section></main></PageShell>;
}

function ReviewsPage() {
  const reviewSchema = makeSchema({ '@type': 'ReviewPage', '@id': 'https://ironcladcommercialfloors.ca/reviews#reviews', name: 'Ironclad Commercial Floors Reviews', about: { '@id': 'https://ironcladcommercialfloors.ca/#business' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: String(reviews.length), bestRating: '5', worstRating: '1' }, review: reviews.map((review) => ({ '@type': 'Review', author: { '@type': 'Person', name: review.author }, reviewBody: review.body, reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' }, itemReviewed: { '@id': 'https://ironcladcommercialfloors.ca/#business' } })) }, [{ name: 'Reviews', url: '/reviews' }]);
  return <PageShell><SEO title={pageMeta.reviews.title} description={pageMeta.reviews.description} schema={reviewSchema} image="/assets/ironclad-team.webp" /><main><StandardHero kicker="Proof from the field" title={<>Trusted when<br />timing matters.</>} intro="Commercial floors have to perform after the crew leaves. Here is what project partners have said about working with Ironclad." crumbs={[{ name: 'Reviews' }]} image="/assets/ironclad-team.webp" imageAlt="Ironclad commercial flooring installer" /><section className="bg-[#e4e5dd] py-24 sm:py-32"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col justify-between gap-8 border-b border-[#b7c0b5] pb-10 sm:flex-row sm:items-end"><div><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">Google profile snapshot</p><div className="mt-4 flex items-center gap-4"><span className="font-display text-7xl font-bold leading-none">5.0</span><div><div className="flex gap-1 text-[#788c5c]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={19} fill="currentColor" />)}</div><p className="mt-2 text-sm text-[#53615c]">{reviews.length} reviews listed for Ironclad Commercial Floors</p></div></div></div><a href={mapHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[.16em]">View Google profile <ArrowUpRight size={14} className="ml-2" /></a></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{reviews.map((review) => <article key={review.author} className="bg-[#f3efe7] p-7 sm:p-9"><div className="flex gap-1 text-[#788c5c]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div><blockquote className="mt-8 font-display text-2xl font-bold leading-tight tracking-[-.02em]">&ldquo;{review.body}&rdquo;</blockquote><div className="mt-8 border-t border-[#c2c8bb] pt-5"><p className="text-sm font-bold">{review.author}</p><p className="mt-1 text-xs leading-relaxed text-[#53615c]">{review.details}</p><p className="mt-2 font-mono-label text-[9px] uppercase tracking-[.12em] text-[#788c5c]">Google Business Profile</p></div></article>)}</div></div></section><section className="bg-[#f3efe7] py-24"><div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start"><div><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#687566]">Work with the same standard</p><h2 className="mt-5 font-display text-5xl font-bold leading-[.95] tracking-[-.05em] sm:text-7xl">Your project<br /><span className="text-[#788c5c]">starts here.</span></h2></div><div className="grid gap-4 sm:grid-cols-2">{['Free on-site estimates', 'Red Seal installers', '$5M WCB insured', '10-year warranty'].map((item) => <div key={item} className="border-t border-[#c2c8bb] pt-4 text-sm font-bold">{item}</div>)}</div></div></div></section><ContactSection /></main></PageShell>;
}

function NotFoundPage() {
  return <PageShell><main className="bg-[#102021] px-5 pb-32 pt-48 text-[#f3efe7]"><div className="mx-auto max-w-[900px]"><p className="font-mono-label text-[10px] uppercase tracking-[.2em] text-[#a7d65f]">404 / Page not found</p><h1 className="mt-7 font-display text-7xl font-bold leading-none tracking-[-.06em] sm:text-9xl">Wrong<br /><span className="text-[#a7d65f]">surface.</span></h1><p className="mt-8 max-w-[520px] text-lg leading-relaxed text-[#c9d0c5]">The page you requested is not here. Start with our services, service areas, or call Ironclad directly.</p><div className="mt-10 flex flex-wrap gap-5 text-[10px] font-bold uppercase tracking-[.16em]"><a href="/" className="bg-[#a7d65f] px-6 py-4 text-[#102021]">Back to home</a><a href="/services" className="border border-white/30 px-6 py-4">View services</a></div></div></main></PageShell>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={ServicesIndex} />
      <Route path="/services/:slug" component={ServicePage} />
      <Route path="/areas" component={AreasIndex} />
      <Route path="/areas/:slug" component={AreaPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/faq" component={FAQPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')} ssrPath={ssrPath}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </WouterRouter>
  );
}

export default App;

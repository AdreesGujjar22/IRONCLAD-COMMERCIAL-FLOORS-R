export type ServicePageData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  kicker: string;
  intro: string;
  image: string;
  imageAlt: string;
  bullets: string[];
  bestFor: string;
  faqs: { question: string; answer: string }[];
};

export const services: ServicePageData[] = [
  {
    slug: 'commercial-flooring-installation',
    name: 'Commercial Flooring Installation',
    title: 'Floor Installation, Vancouver | Ironclad Commercial Floors',
    description:
      'Professional commercial floor installation in Vancouver BC from Red Seal installers. Careful prep, durable materials, overnight or weekend work. Free quotes.',
    kicker: '01 / Build right',
    intro:
      'New construction and renovation projects need a flooring partner who understands the material, the substrate, and the schedule. We coordinate all three.',
    image: '/assets/ironclad-installation.webp',
    imageAlt: 'Installer fitting commercial flooring during a Vancouver project',
    bullets: [
      'Luxury vinyl plank and resilient flooring',
      'Carpet tile for offices and shared spaces',
      'Subfloor preparation and moisture checks',
      'Overnight, weekend, and phased installation',
    ],
    bestFor: 'Offices, retail spaces, warehouses, and new commercial fit-outs.',
    faqs: [
      {
        question: 'What commercial flooring materials do you install?',
        answer:
          'We install luxury vinyl plank, carpet tile, resilient flooring, epoxy systems, and other commercial-grade surfaces matched to the space and expected traffic.',
      },
      {
        question: 'Can installation happen outside business hours?',
        answer:
          'Yes. Overnight, weekend, and phased scheduling can help active businesses keep staff, customers, and operations moving while work is completed.',
      },
    ],
  },
  {
    slug: 'commercial-epoxy-flooring',
    name: 'Commercial Epoxy Flooring',
    title: 'Epoxy Floor Coating, Vancouver | Ironclad Commercial Floors',
    description:
      'Seamless epoxy floor coating in Vancouver BC for warehouses, shops and busy facilities. Chemical and impact resistant, with phased work. Get a free estimate.',
    kicker: '02 / Take the impact',
    intro:
      'Epoxy is a performance decision. We build seamless, chemical-resistant floors that stand up to oil, tires, equipment, and heavy daily traffic.',
    image: '/assets/ironclad-epoxy.webp',
    imageAlt: 'Commercial epoxy flooring application by an Ironclad installer',
    bullets: [
      'Seamless epoxy coating systems',
      'Chemical, stain, and impact resistance',
      'Concrete surface preparation and grinding',
      'Phased work for active facilities',
    ],
    bestFor: 'Warehouses, manufacturing plants, service bays, and high-traffic commercial facilities.',
    faqs: [
      {
        question: 'How long does commercial epoxy flooring take?',
        answer:
          'Project timing depends on floor size, prep, moisture, and cure requirements. Ironclad can plan phased or off-hours work around the facility schedule.',
      },
      {
        question: 'Can epoxy flooring handle heavy equipment?',
        answer:
          'Commercial epoxy systems are designed for demanding use. We match the system and preparation to equipment traffic, impact, chemicals, and the surface condition.',
      },
    ],
  },
  {
    slug: 'garage-epoxy-flooring',
    name: 'Garage Epoxy Flooring',
    title: 'Garage Epoxy Floors, Vancouver | Ironclad Commercial Floors',
    description:
      'Garage epoxy floors in Vancouver BC for parking areas, fleets and shops. Oil and stain resistant, easy to clean, installed over a weekend. Get a free estimate.',
    kicker: '03 / Keep it moving',
    intro:
      'Garage floors work hard. Our epoxy systems are built for vehicle traffic, oil, tires, and the daily wear that parking and fleet facilities cannot avoid.',
    image: '/assets/ironclad-epoxy.webp',
    imageAlt: 'Durable epoxy floor surface for a commercial garage',
    bullets: [
      'Fleet and parking facility floors',
      'Oil and stain-resistant surfaces',
      'Slip-conscious finish options',
      'Phased work to reduce downtime',
    ],
    bestFor: 'Parking garages, fleet facilities, automotive spaces, and commercial service bays.',
    faqs: [
      {
        question: 'Is garage epoxy suitable for commercial parking areas?',
        answer:
          'Yes. We specify commercial systems for vehicle traffic and can plan installation in phases when the facility must remain partially operational.',
      },
      {
        question: 'How soon can vehicles return to the space?',
        answer:
          'Return-to-service timing depends on the system, conditions, and cure. Your project plan will include the specific foot and vehicle traffic windows.',
      },
    ],
  },
  {
    slug: 'commercial-flooring-repair',
    name: 'Commercial Flooring Repair',
    title: 'Flooring Repair, Vancouver | Ironclad Commercial Floors',
    description:
      'Commercial flooring repair in Vancouver BC for cracked concrete, damaged tile and peeling epoxy. Fast response, minimal downtime and free on-site estimates.',
    kicker: '04 / Get back to work',
    intro:
      'A damaged floor can create a safety issue, slow a team down, or make a customer-facing space feel neglected. We respond with focused repair plans.',
    image: '/assets/ironclad-repair.webp',
    imageAlt: 'Commercial flooring repair work in progress',
    bullets: [
      'Damaged tile and resilient flooring repair',
      'Cracked concrete and spalled joint repair',
      'Peeling epoxy assessment and repair',
      'Rapid response for urgent floor problems',
    ],
    bestFor: 'Active businesses that need a safe, usable surface without a full replacement.',
    faqs: [
      {
        question: 'Can you repair a floor without closing the whole business?',
        answer:
          'Often, yes. Ironclad can plan targeted repairs, overnight shifts, or phased work to limit disruption to staff, customers, and freight lines.',
      },
      {
        question: 'When should a floor be repaired instead of replaced?',
        answer:
          'The decision depends on damage, surface condition, traffic, and the cost of continued maintenance. We inspect the floor and explain the practical options.',
      },
    ],
  },
  {
    slug: 'commercial-flooring-replacement',
    name: 'Commercial Flooring Replacement',
    title: 'Floor Replacement, Vancouver | Ironclad Commercial Floors',
    description:
      'Commercial floor replacement in Vancouver BC. We remove worn surfaces and install durable new flooring, phased around your team. Get a free on-site estimate.',
    kicker: '05 / Start clean',
    intro:
      'When repairs are no longer enough, replacement gives the space a reliable reset. We remove worn surfaces and install a floor selected for how you operate.',
    image: '/assets/ironclad-replacement.webp',
    imageAlt: 'Hands preparing commercial flooring for replacement',
    bullets: [
      'Removal and preparation of existing flooring',
      'Material selection based on traffic and use',
      'Clear phasing for occupied spaces',
      'Clean, durable commercial finishes',
    ],
    bestFor: 'Worn offices, retail floors, commercial kitchens, and facilities ready for a longer-term solution.',
    faqs: [
      {
        question: 'How do you choose a replacement floor?',
        answer:
          'We consider traffic, moisture, cleaning, safety, appearance, and schedule before recommending a commercial-grade material and installation approach.',
      },
      {
        question: 'Can flooring replacement be phased by area?',
        answer:
          'Yes. Phasing by room, department, or operating shift can reduce the amount of space that is unavailable at one time.',
      },
    ],
  },
  {
    slug: 'concrete-polishing',
    name: 'Concrete Polishing',
    title: 'Concrete Polishing, Vancouver | Ironclad Commercial Floors',
    description:
      'Commercial concrete polishing in Vancouver BC for warehouses, showrooms and retail. A hard-wearing, low-maintenance finish. Book a free on-site estimate today.',
    kicker: '06 / Reveal the slab',
    intro:
      'Polished concrete gives a working floor a clean, low-maintenance finish while keeping the strength of the slab beneath it.',
    image: '/assets/ironclad-interior.webp',
    imageAlt: 'Finished polished floor in a commercial interior',
    bullets: [
      'Concrete surface assessment and preparation',
      'Polished finishes for active commercial spaces',
      'Durable, easy-care floor surfaces',
      'Planning around facility use and access',
    ],
    bestFor: 'Retail, showrooms, warehouses, offices, and commercial interiors with exposed concrete.',
    faqs: [
      {
        question: 'Where is polished concrete a good fit?',
        answer:
          'It can suit commercial interiors where durability, cleanability, and a refined exposed-slab finish matter, including retail, office, and warehouse spaces.',
      },
      {
        question: 'Does concrete polishing require major downtime?',
        answer:
          'The schedule depends on the existing slab and desired finish. We can discuss phased or off-hours work for active businesses.',
      },
    ],
  },
  {
    slug: 'luxury-vinyl-plank',
    name: 'Luxury Vinyl Plank',
    title: 'Luxury Vinyl Plank, Vancouver | Ironclad Commercial Floors',
    description:
      'Luxury vinyl plank installation in Vancouver BC for offices, retail and clinics. Durable commercial-grade LVP, careful prep, flexible scheduling. Free quotes.',
    kicker: '07 / Make an impression',
    intro:
      'Luxury vinyl plank brings a finished, welcoming look to commercial interiors while staying practical for daily foot traffic and maintenance.',
    image: '/assets/ironclad-interior.webp',
    imageAlt: 'Luxury vinyl plank flooring in a finished commercial interior',
    bullets: [
      'Commercial-grade LVP installation',
      'Subfloor preparation and layout planning',
      'Wood-look finishes for customer-facing spaces',
      'Phased installation for occupied businesses',
    ],
    bestFor: 'Offices, retail, hospitality, clinics, and customer-facing commercial interiors.',
    faqs: [
      {
        question: 'Is luxury vinyl plank suitable for commercial use?',
        answer:
          'Commercial-grade LVP can be a practical choice for businesses that want a finished appearance, durable wear layer, and straightforward ongoing care.',
      },
      {
        question: 'Can you install LVP over an existing floor?',
        answer:
          'The existing surface must be assessed first. Proper prep and a suitable substrate are important to the performance and appearance of the finished floor.',
      },
    ],
  },
  {
    slug: 'carpet-tile-installation',
    name: 'Carpet Tile Installation',
    title: 'Office Carpet Tile, Vancouver | Ironclad Commercial Floors',
    description:
      'Office carpet tile installation in Vancouver BC for shared workspaces and corridors. Comfortable, easy to replace and phased around your team. Free quotes.',
    kicker: '08 / Work quietly',
    intro:
      'Carpet tile can make offices and shared spaces feel quieter, warmer, and more comfortable. We install it with a layout and maintenance plan in mind.',
    image: '/assets/ironclad-team.webp',
    imageAlt: 'Installer working on commercial flooring in a shared space',
    bullets: [
      'Commercial carpet tile layouts',
      'Subfloor preparation and transitions',
      'Phased work for occupied offices',
      'Maintainable replacement planning',
    ],
    bestFor: 'Offices, meeting spaces, corridors, and shared commercial interiors.',
    faqs: [
      {
        question: 'Why choose carpet tile for an office?',
        answer:
          'Carpet tile can support a quieter, more comfortable office environment and makes future localized replacement more practical than replacing a whole broadloom area.',
      },
      {
        question: 'Can carpet tile be installed while an office is occupied?',
        answer:
          'Yes. Layout and phasing can be planned around teams, meeting rooms, and access requirements to keep the office usable during the work.',
      },
    ],
  },
];

export type AreaPageData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  localCopy: string;
  highlights: string[];
};

export const areas: AreaPageData[] = [
  {
    slug: 'vancouver',
    name: 'Vancouver',
    title: 'Flooring Contractor Vancouver | Ironclad Commercial Floors',
    description:
      'Commercial flooring contractor in Vancouver BC based at 783 E 60th Ave. Installation, epoxy, repair and replacement with 24/7 rapid service. Free estimates.',
    intro:
      'Ironclad Commercial Floors is based at 783 E 60th Ave and helps Vancouver businesses keep their spaces safe, durable, and ready for work.',
    localCopy:
      'From office fit-outs to urgent floor repairs, our Vancouver team plans the work around the building, the traffic, and the schedule that keeps your operation moving.',
    highlights: ['Central Vancouver headquarters', '24/7 rapid service', 'Free on-site estimates'],
  },
  {
    slug: 'burnaby',
    name: 'Burnaby',
    title: 'Flooring Contractor Burnaby | Ironclad Commercial Floors',
    description:
      'Commercial flooring contractor serving Burnaby BC. Installation, epoxy, repair and replacement with overnight and weekend scheduling. Request a free estimate.',
    intro:
      'Burnaby businesses need floors that can handle offices, logistics, retail, and heavy daily traffic. Ironclad brings commercial flooring support close to the work.',
    localCopy:
      'We can coordinate installation, repair, or epoxy work around active facilities in Burnaby, including phased and off-hours scheduling when downtime matters.',
    highlights: ['Serving Burnaby facilities', 'Phased scheduling', 'Commercial-grade systems'],
  },
  {
    slug: 'surrey',
    name: 'Surrey',
    title: 'Flooring Contractor Surrey | Ironclad Commercial Floors',
    description:
      'Commercial flooring contractor serving Surrey BC. Installation, epoxy, repair and replacement for warehouses, retail and offices. Request a free estimate now.',
    intro:
      'Surrey is home to growing commercial, industrial, retail, and warehouse spaces. Ironclad helps owners and operators plan flooring work that lasts.',
    localCopy:
      'Our team can assess the existing floor, recommend a practical system, and organize the work around access, freight, staff, and customer traffic in Surrey.',
    highlights: ['Serving Surrey businesses', 'Durability-first recommendations', 'Flexible work windows'],
  },
  {
    slug: 'richmond',
    name: 'Richmond',
    title: 'Flooring Contractor Richmond | Ironclad Commercial Floors',
    description:
      'Commercial flooring contractor serving Richmond BC. Installation, epoxy, repair and replacement, phased around your operation. Request a free on-site estimate.',
    intro:
      'Richmond facilities depend on reliable, easy-care floors. Ironclad works with commercial operators on surfaces selected for their actual use and traffic.',
    localCopy:
      'Whether the need is a customer-facing finish or an impact-resistant industrial system, we can plan Richmond flooring work with the operating schedule in mind.',
    highlights: ['Serving Richmond facilities', 'Material and substrate planning', 'Overnight and weekend options'],
  },
  {
    slug: 'lower-mainland',
    name: 'Lower Mainland',
    title: 'Flooring in the Lower Mainland | Ironclad Commercial Floors',
    description:
      'Commercial flooring contractor across the Lower Mainland BC. Installation, epoxy, repair and replacement, with rapid response and free on-site estimates today.',
    intro:
      'Ironclad serves businesses across the Lower Mainland with one accountable partner for commercial flooring installation, repair, replacement, and epoxy.',
    localCopy:
      'Our service area includes Vancouver, Burnaby, Surrey, Richmond, and nearby BC communities. Call to discuss your facility, timing, and next step.',
    highlights: ['One accountable partner', 'Greater Vancouver coverage', 'Rapid response available'],
  },
];

export const faqItems = [
  {
    question: 'What commercial flooring services does Ironclad provide?',
    answer:
      'Ironclad provides commercial flooring installation, repair, replacement, industrial epoxy flooring, garage epoxy flooring, concrete polishing, luxury vinyl plank, and carpet tile installation across Vancouver and the Lower Mainland.',
  },
  {
    question: 'How do you minimize downtime for operating businesses?',
    answer:
      'We provide overnight, weekend, and phased flooring installations and repairs. Project timing and access are planned around your staff, customers, freight, and operating needs.',
  },
  {
    question: 'Are Ironclad crews licensed, insured, and certified in BC?',
    answer:
      'Ironclad states that it carries $5,000,000 in commercial general liability insurance, full WorkSafeBC coverage, and Red Seal certified installers trained in commercial surface preparation and moisture testing.',
  },
  {
    question: 'How do I get a free commercial flooring estimate?',
    answer:
      'Call Ironclad Commercial Floors at (604) 540-3999 or use the quote form to request an on-site consultation. The team can review the space, surface, timing, and scope.',
  },
  {
    question: 'What areas does Ironclad serve?',
    answer:
      'Ironclad is based in Vancouver and serves Vancouver, Burnaby, Surrey, Richmond, and nearby Lower Mainland communities.',
  },
  {
    question: 'How quickly can Ironclad respond to an urgent flooring issue?',
    answer:
      'Ironclad advertises 24/7 rapid service. For an urgent floor problem, call (604) 540-3999 so the team can discuss the situation and next step directly.',
  },
];

export const reviews = [
  {
    author: 'Tejinder Sharma',
    details: '6 reviews · 2 photos · a month ago',
    body: 'We contacted Ironclad about changing the glue down LVP in our office space in Metrotown Burnaby. They are hands down the best commercial flooring company as they work around your needs and timelines. They did detailed work in prepping the … More',
  },
  {
    author: 'Abhishek Bansal',
    details: '1 review · 1 photo · 23 hours ago',
    body: 'These guys are one of the good ones in flooring industry, they do reasonable price with quality work. They make sure your project get done in said timeline.',
  },
  {
    author: 'Basil Sultan',
    details: '14 reviews · 1 photo · 2 days ago',
    body: 'Best epoxy company in Burnaby. They did quality epoxy work on our production floor within a long weekend which was highly needed for our work. Great communication and highly professional',
  },
  {
    author: 'jas Atwal',
    details: '1 review · 4 days ago',
    body: 'These guys did parkade coating in one of our facility in Coquitlam. They did a solid job within the timeline at a reasonable price. Highly recommend for commercial flooring solutions in metro Vancouver.',
  },
  {
    author: 'sep ghoreishi',
    details: 'Local Guide · 22 reviews · 3 photos · a week ago',
    body: 'Ironclad floors did an amazing job. They changed the old cracked stained concrete floor to a great epoxy floor finish in my man cave in Burnaby. I had the issue of water pooling in my garage which they were able to fix with grinding. Highly recommmed for garage epoxy floors.',
  },
  {
    author: 'anjali khanna',
    details: '9 reviews · a week ago',
    body: 'Great guys, did an amazing job at my workshop by doing polyaspartic flake epoxy floors. Best epoxy guys in POCO.',
  },
  {
    author: 'navjeet kaur',
    details: '7 reviews · 4 photos · a week ago',
    body: 'Great experience with Ironclad commercial floors. Very professional and reliable company to get the flooring done. They have all this options which usually regular flooring stores dont carry which were the main reason for us to get in touch … More',
  },
  {
    author: 'Emmett Morton',
    details: 'Local Guide · 24 reviews · a week ago',
    body: 'This company did an incredible job on the epoxy floor in our Surrey location. Our old and cracked concrete in our building now looks like a luxury-high end space. Highly recommend for commercial flooring in metro Vancouver area.',
  },
  {
    author: 'Sukh Maan',
    details: '3 reviews · 2 photos · a week ago',
    body: 'We contacted Ironclad regarding our warehouse project in Port Coquitlam. Our experience with them is outstanding, they are professionals, communicated well, stick to the timeline, did a great install. They have good quality vinyl flooring at a reasonable price. Great flooring company. More',
  },
  {
    author: 'Khush',
    details: '3 reviews · 2 photos · a week ago',
    body: 'Ironclad did a great job doing epoxy floors in our auto shop in Burnaby. We were thinking of getting it done for years but we needed to get it done over the weekend which most of the companies don’t offer, but ironclad got the job done in a … More',
  },
];

export const pageMeta = {
  home: { title: 'Commercial Flooring, Vancouver | Ironclad Commercial Floors', description: 'Commercial flooring in Vancouver BC: installation, epoxy, repair, replacement, polished concrete, LVP and carpet tile. Red Seal crews. Free on-site estimates.' },
  services: { title: 'Flooring Services, Vancouver | Ironclad Commercial Floors', description: 'Explore commercial flooring services in Vancouver BC: installation, epoxy, repair, replacement, polished concrete, LVP and carpet tile. Get a free estimate.' },
  areas: { title: 'Areas We Serve, Lower Mainland | Ironclad Commercial Floors', description: 'Commercial flooring service areas across Vancouver, Burnaby, Surrey, Richmond and the Lower Mainland. Installation, epoxy, repair and replacement. Call today.' },
  contact: { title: 'Contact Us for a Free Estimate | Ironclad Commercial Floors', description: 'Contact Ironclad Commercial Floors in Vancouver BC for a free on-site estimate, urgent floor repairs or flooring questions. Call (604) 540-3999 or message us.' },
  faq: { title: 'Flooring Questions, Vancouver | Ironclad Commercial Floors', description: 'Answers to common commercial flooring questions in Vancouver BC: timelines, downtime, insurance, certifications, service areas and how to get a free estimate.' },
  reviews: { title: 'Flooring Reviews, Vancouver | Ironclad Commercial Floors', description: 'Read commercial flooring reviews for Ironclad in Vancouver BC. Real Google feedback on epoxy, LVP and parkade work, weekend schedules and clear communication.' },
} as const;

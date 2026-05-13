const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Moh Badrujaman',
  alternateName: 'badrudev',
  url: 'https://badrudev.vercel.app',
  image: 'https://badrudev.vercel.app/og-image.png',
  sameAs: [
    'https://github.com/badru9',
    'https://www.linkedin.com/in/mohammad-badrujaman-784278259/',
  ],
  jobTitle: 'Frontend-focused Fullstack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Available for hire',
  },
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'TailwindCSS',
    'Laravel',
    'ExpressJS',
  ],
  description:
    'Frontend-focused Fullstack Developer with 2+ years of professional experience building production web applications.',
  email: 'mohbadrujaman@gmail.com',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'badrudev Portfolio',
  url: 'https://badrudev.vercel.app',
  description:
    'Portfolio of Moh Badrujaman — Frontend-focused Fullstack Developer',
  author: {
    '@type': 'Person',
    name: 'Moh Badrujaman',
  },
};

export default function JsonLd() {
  const schemaData = [personSchema, websiteSchema];

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData, null, 2),
      }}
    />
  );
}
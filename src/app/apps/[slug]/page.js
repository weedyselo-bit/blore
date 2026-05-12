import Image from 'next/image'
import { supabase } from '../../../lib/supabase'

export async function generateMetadata({ params }) {
  const { slug } = await params

  const { data: app } = await supabase
    .from('apps')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!app) {
    return {
      title: 'App Not Found | BLORE',
      description: 'The requested app could not be found on BLORE.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const shortDescription =
    app.description.length > 155
      ? app.description.slice(0, 152) + '...'
      : app.description

  const appUrl = `https://blore.vercel.app/apps/${app.slug}`

  return {
    title: `${app.title} | BLORE`,
    description: shortDescription,

    alternates: {
      canonical: appUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `${app.title} | BLORE`,
      description: shortDescription,
      url: appUrl,
      siteName: 'BLORE',

      images: [
        {
          url: app.image,
          width: 1200,
          height: 630,
          alt: app.title,
        },
      ],

      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: `${app.title} | BLORE`,
      description: shortDescription,
      images: [app.image],
    },
  }
}

export default async function AppDetailPage({ params }) {
  const { slug } = await params

  const { data: app, error } = await supabase
    .from('apps')
    .select('*')
    .eq('slug', slug)
    .single()

  console.log("APP:", app)
  console.log("ERROR:", error)

  if (!app) {
    return (
      <div className="min-h-screen bg-zinc-950 p-10 text-white">
        App not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-10 text-white">
     
     <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.title,
      description: app.description,
      image: app.image,
      applicationCategory: app.category,
      softwareVersion: app.version,
      operatingSystem: 'Windows',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    }),
  }}
/>

      <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-3xl">
  <Image
    src={app.image}
    alt={app.title}
    fill
    priority
    className="object-cover"
      />

</div>
      <h1 className="mb-4 text-5xl font-black">{app.title}</h1>

      <p className="mb-6 text-zinc-400">{app.description}</p>

      <p>Category: {app.category}</p>
      <p>Version: {app.version}</p>
      <p>Size: {app.size}</p>

      <a
        href={app.download_link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-2xl bg-white px-6 py-3 font-bold text-black"
      >
        Download
      </a>
    </div>
  )
}
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
    ],

    sitemap: 'https://blore.vercel.app/sitemap.xml',
  }
}
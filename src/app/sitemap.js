import { supabase } from './lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://blore.vercel.app'

  const { data: apps } = await supabase
    .from('apps')
    .select('slug')

  const appUrls =
    apps?.map((app) => ({
      url: `${baseUrl}/apps/${app.slug}`,
      lastModified: new Date(),
    })) || []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...appUrls,
  ]
}
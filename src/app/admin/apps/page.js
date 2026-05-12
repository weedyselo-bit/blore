'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminAppsPage() {
  const router = useRouter()
  const [apps, setApps] = useState([])
  const [editingApp, setEditingApp] = useState(null)
  const [loading, setLoading] = useState(true)
const ADMIN_EMAIL = 'weedy.selo@gmail.com'

  useEffect(() => {
  async function checkAdmin() {
    const { data } = await supabase.auth.getUser()

    if (!data.user) {
      router.push('/admin/login')
      return
    }

    if (data.user.email !== ADMIN_EMAIL) {
      await supabase.auth.signOut()
      router.push('/admin/login')
      return
    }

    fetchApps()
  }

  checkAdmin()
}, [router])

  async function fetchApps() {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      alert(error.message)
      return
    }

    setApps(data || [])
    setLoading(false)
  }

  async function deleteApp(app) {
  const confirmDelete = confirm(`Delete "${app.title}"?`)

  if (!confirmDelete) return

  const imagePath = app.image?.split('/thumbnails/')[1]

  if (imagePath) {
    const { error: storageError } = await supabase.storage
      .from('thumbnails')
      .remove([imagePath])

    if (storageError) {
      console.log(storageError)
      alert('Failed to delete image')
      return
    }
  }

  const { error } = await supabase
    .from('apps')
    .delete()
    .eq('id', app.id)

  if (error) {
    alert(error.message)
    return
  }

  fetchApps()
}

  async function updateApp(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('apps')
      .update({
        title: editingApp.title,
        slug: editingApp.slug,
        description: editingApp.description,
        image: editingApp.image,
        version: editingApp.version,
        size: editingApp.size,
        category: editingApp.category,
        download_link: editingApp.download_link,
      })
      .eq('id', editingApp.id)

    if (error) {
      alert(error.message)
      return
    }

    alert('App updated')
    setEditingApp(null)
    fetchApps()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 p-10 text-white">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black">Manage Apps</h1>

          <button
            onClick={() => router.push('/admin/upload')}
            className="rounded-xl bg-white px-4 py-2 font-bold text-black"
          >
            Upload New
          </button>
        </div>

        {editingApp && (
          <form
            onSubmit={updateApp}
            className="mb-10 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <h2 className="text-2xl font-bold">Edit App</h2>

            <input
              value={editingApp.title}
              onChange={(e) =>
                setEditingApp({ ...editingApp, title: e.target.value })
              }
              className="w-full rounded-xl bg-zinc-950 p-4"
            />

            <input
              value={editingApp.slug}
              onChange={(e) =>
                setEditingApp({ ...editingApp, slug: e.target.value })
              }
              className="w-full rounded-xl bg-zinc-950 p-4"
            />

            <textarea
              value={editingApp.description}
              onChange={(e) =>
                setEditingApp({
                  ...editingApp,
                  description: e.target.value,
                })
              }
              className="h-40 w-full rounded-xl bg-zinc-950 p-4"
            />

            <input
              value={editingApp.image}
              onChange={(e) =>
                setEditingApp({ ...editingApp, image: e.target.value })
              }
              className="w-full rounded-xl bg-zinc-950 p-4"
            />

            <input
              value={editingApp.version}
              onChange={(e) =>
                setEditingApp({ ...editingApp, version: e.target.value })
              }
              className="w-full rounded-xl bg-zinc-950 p-4"
            />

            <input
              value={editingApp.size}
              onChange={(e) =>
                setEditingApp({ ...editingApp, size: e.target.value })
              }
              className="w-full rounded-xl bg-zinc-950 p-4"
            />

            <input
              value={editingApp.category}
              onChange={(e) =>
                setEditingApp({ ...editingApp, category: e.target.value })
              }
              className="w-full rounded-xl bg-zinc-950 p-4"
            />

            <input
              value={editingApp.download_link}
              onChange={(e) =>
                setEditingApp({
                  ...editingApp,
                  download_link: e.target.value,
                })
              }
              className="w-full rounded-xl bg-zinc-950 p-4"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-xl bg-white px-5 py-3 font-bold text-black"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() => setEditingApp(null)}
                className="rounded-xl border border-zinc-700 px-5 py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">{app.title}</h2>
                <p className="text-sm text-zinc-400">{app.slug}</p>
                <p className="mt-2 text-sm text-zinc-500">
                  {app.category} • {app.version} • {app.size}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/apps/${app.slug}`)}
                  className="rounded-xl border border-zinc-700 px-4 py-2"
                >
                  View
                </button>

                <button
                  onClick={() => setEditingApp(app)}
                  className="rounded-xl bg-white px-4 py-2 font-bold text-black"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteApp(app)}
                  className="rounded-xl bg-red-600 px-4 py-2 font-bold text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
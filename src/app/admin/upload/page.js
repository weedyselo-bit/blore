'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter } from 'next/navigation'

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function UploadPage() {
    const router = useRouter()

    const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [version, setVersion] = useState('')
  const [size, setSize] = useState('')
  const [category, setCategory] = useState('')
  const [downloadLink, setDownloadLink] = useState('')
const [imageFile, setImageFile] = useState(null)

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
  }

  checkAdmin()
}, [router])

  async function handleSubmit(e) {
    e.preventDefault()

if (
  !title ||
  !slug ||
  !description ||
  !version ||
  !size ||
  !category ||
  !downloadLink ||
  !imageFile
) {
  alert('Please fill all fields')
  return
}

if (!imageFile.type.startsWith('image/')) {
  alert('File must be an image')
  return
}

if (imageFile.size > 5 * 1024 * 1024) {
  alert('Image too large, max 5MB')
  return
}

const { data: existingApp } = await supabase
  .from('apps')
  .select('id')
  .eq('slug', slug)
  .maybeSingle()

if (existingApp) {
  alert('Slug already exists')
  return
}

setUploading(true)

    const fileName = `${Date.now()}-${imageFile.name}`

const { error: imageError } = await supabase.storage
  .from('thumbnails')
  .upload(fileName, imageFile)

if (imageError) {
  console.log(imageError)
  setUploading(false)
  alert('Failed upload image')
  return
}

const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/thumbnails/${fileName}`

    const { error } = await supabase
      .from('apps')
      .insert([
        {
          title,
          slug,
          description,
          image: imageUrl,
          version,
          size,
          category,
          download_link: downloadLink,
        },
      ])

    console.log(error)

if (error) {
  setUploading(false)
  alert(error.message)
  return
}

    if (!error) {
  setUploading(false)

  alert('App uploaded successfully')

  setTitle('')
  setSlug('')
  setDescription('')
  setVersion('')
  setSize('')
  setCategory('')
  setDownloadLink('')
  setImageFile(null)

  router.push('/admin/apps')
}
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-10 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-black">
          Upload App
        </h1>

<button
  onClick={async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }}
  className="mb-6 rounded-xl border border-zinc-700 px-4 py-2 text-sm"
>
  Logout
</button>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
  setTitle(e.target.value)
  setSlug(generateSlug(e.target.value))
}}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            type="text"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-40 w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            type="text"
            placeholder="Version"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            type="text"
            placeholder="Download Link"
            value={downloadLink}
            onChange={(e) => setDownloadLink(e.target.value)}
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <button
  type="submit"
  disabled={uploading}
  className="w-full rounded-xl bg-white p-4 font-bold text-black disabled:opacity-50"
>
  {uploading ? 'Uploading...' : 'Upload App'}
</button>
        </form>
      </div>
    </div>
  )
}
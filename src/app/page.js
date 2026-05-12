'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function BloreHomePage() {
  const [apps, setApps] = useState([])
  const [search, setSearch] = useState('')
const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
  async function fetchApps() {
    const { data, error } = await supabase
      .from('apps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
      return
    }

    setApps(data || [])
  }

  fetchApps()

  window.addEventListener('focus', fetchApps)

  return () => {
    window.removeEventListener('focus', fetchApps)
  }
}, [])
const categories = ['All', ...new Set(apps.map((app) => app.category))]
const filteredApps = apps.filter((app) => {
  const matchSearch =
    app.title.toLowerCase().includes(search.toLowerCase())

  const matchCategory =
    selectedCategory === 'All' ||
    app.category === selectedCategory

  return matchSearch && matchCategory
})

  return (

    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">BLORE</h1>
            <p className="text-sm text-zinc-400">
              Modern software & game hub
            </p>
          </div>

          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#" className="text-zinc-300 hover:text-white">
              Home
            </a>
            <a href="#" className="text-zinc-300 hover:text-white">
              Games
            </a>
            <a href="#" className="text-zinc-300 hover:text-white">
              Apps
            </a>
            <a href="#" className="text-zinc-300 hover:text-white">
              Trending
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
              Fast • Minimal • Modern
            </div>

            <h2 className="mb-6 text-5xl font-black leading-tight">
              Download Games & Apps Without the Chaos
            </h2>

            <p className="mb-8 max-w-xl text-lg text-zinc-400">
              Clean interface, fast navigation, organized categories, and a
              modern experience focused on usability.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105">
                Explore Games
              </button>

              <button className="rounded-2xl border border-zinc-700 px-6 py-3 font-semibold text-white hover:bg-zinc-900">
                Latest Uploads
              </button>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
              <input
  type="text"
  placeholder="Search apps or software..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-5 py-4 outline-none focus:border-white"
/>

<div className="mt-6 flex flex-wrap gap-3">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`rounded-xl px-4 py-2 text-sm transition ${
        selectedCategory === category
          ? 'bg-white text-black'
          : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
      }`}
    >
      {category}
    </button>
  ))}
</div>
                
              
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold">Trending Downloads</h3>
            <p className="mt-2 text-zinc-400">
              Popular releases this week
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredApps.map((game) => (
            <div
               key={game.id}
    className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-zinc-600"
  >
    <img
      src={game.image}
      alt={game.title}
      className="h-56 w-full object-cover"
    />

    <div className="p-6">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
          {game.category}
        </span>

        <span className="text-sm text-zinc-400">
          {game.version}
        </span>
      </div>

      <h4 className="mb-3 text-2xl font-bold">
        {game.title}
      </h4>

      <p className="mb-4 text-sm text-zinc-400">
        {game.description}
      </p>

      <div className="mb-5 flex items-center justify-between text-sm text-zinc-400">
        <span>File Size</span>
        <span>{game.size}</span>
      </div>

      <Link
        href={`/apps/${game.slug}`}
        className="block w-full rounded-2xl bg-white px-4 py-3 text-center font-semibold text-black transition hover:scale-[1.02]"
      >
        View Details
      </Link>
    </div>
  </div>
))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">BLORE</p>
            <p>Modern digital distribution platform.</p>
          </div>

          <div className="flex gap-6">
            <a href="#">About</a>
            <a href="#">DMCA</a>
            <a href="#">Privacy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">BLORE</h1>
            <p className="text-sm text-zinc-400">
              Game & App Distribution Platform
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop"
              alt="Game Banner"
              className="mb-8 h-[420px] w-full rounded-3xl object-cover"
            />

            <h1 className="mb-4 text-5xl font-black">
              Cyber Drift Ultimate Edition
            </h1>

            <p className="mb-8 text-lg text-zinc-400">
              Futuristic racing-action game with cinematic combat and immersive
              multiplayer gameplay.
            </p>

            <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="mb-2 text-sm text-zinc-500">Version</p>
                <h3 className="text-xl font-bold">v2.4.1</h3>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="mb-2 text-sm text-zinc-500">File Size</p>
                <h3 className="text-xl font-bold">12 GB</h3>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="mb-2 text-sm text-zinc-500">Updated</p>
                <h3 className="text-xl font-bold">May 2026</h3>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="mb-2 text-sm text-zinc-500">Developer</p>
                <h3 className="text-xl font-bold">Blore Studio</h3>
              </div>
            </div>

            <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <h2 className="mb-6 text-3xl font-bold">
                System Requirements
              </h2>

              <ul className="space-y-3 text-zinc-400">
                <li>OS: Windows 10/11</li>
                <li>CPU: Intel Core i5</li>
                <li>RAM: 8 GB</li>
                <li>GPU: GTX 1060</li>
                <li>Storage: 20 GB</li>
              </ul>
            </section>
          </div>

          <aside>
            <div className="sticky top-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <h2 className="mb-6 text-3xl font-bold">
                Download Options
              </h2>

              <button className="mb-4 w-full rounded-2xl bg-white px-5 py-4 text-lg font-bold text-black">
                Direct Download
              </button>

              <button className="w-full rounded-2xl border border-zinc-700 px-5 py-4 text-lg font-bold">
                Mirror Download
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
'use client'
import Link from 'next/link'
import {
  Play,
  ArrowLeft,
  Layers,
  Terminal,
  Sparkles,
  Download,
} from 'lucide-react'
import { useCodeStore } from '@/store/useCodeStore'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { mode, setMode, runPython, code } = useCodeStore()

  // Function to handle file download
  const handleDownload = () => {
    if (mode === 'web') {
      // Create a full HTML file with CSS and JS injected
      const fullHtml = `
<!DOCTYPE html>
<html>
  <head>
    <style>${code.css}</style>
  </head>
  <body>
    ${code.html}
    <script>${code.javascript}</script>
  </body>
</html>`

      const blob = new Blob([fullHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'index.html'
      a.click()
    } else {
      // Download Python file
      const blob = new Blob([code.python], { type: 'text/x-python' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'main.py'
      a.click()
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl z-50 shrink-0 relative">
      {/* 1. Left Section */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-x-1"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
            <ArrowLeft size={18} />
          </div>
        </Link>

        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-gray-700 to-transparent mx-2 hidden sm:block"></div>

        {/* 2. Mode Switcher */}
        <div className="flex bg-black/60 p-1.5 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={() => setMode('web')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden',
              mode === 'web'
                ? 'text-white shadow-lg shadow-blue-500/25'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5',
            )}
          >
            {mode === 'web' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 -z-10" />
            )}
            <Layers size={16} />
            <span className="hidden sm:block">Web Editor</span>
          </button>

          <button
            onClick={() => setMode('python')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative overflow-hidden',
              mode === 'python'
                ? 'text-white shadow-lg shadow-yellow-600/25'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5',
            )}
          >
            {mode === 'python' && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 -z-10" />
            )}
            <Terminal size={16} />
            <span className="hidden sm:block">Python Editor</span>
          </button>
        </div>
      </div>

      {/* 3. Right Section: Actions */}
      <div className="flex items-center gap-3">
        {/* DOWNLOAD BUTTON */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 transition-all active:scale-95"
          title="Download Code"
        >
          <Download size={16} />
          <span className="hidden sm:block">Save</span>
        </button>

        {mode === 'python' && (
          <button
            onClick={runPython}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.6)] transition-all duration-300 active:scale-95 border border-white/10"
          >
            <Play
              size={16}
              fill="currentColor"
              className="group-hover:scale-110 transition-transform"
            />
            <span>Run Code</span>
            <div className="absolute inset-0 -z-10 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 w-full h-full skew-x-12 blur-md" />
          </button>
        )}

        {mode === 'web' && (
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-blue-400/80 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            <Sparkles size={12} /> Live Preview
          </div>
        )}
      </div>
    </div>
  )
}

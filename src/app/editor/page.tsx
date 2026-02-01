'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2, Code2 } from 'lucide-react' // Icons for the loading screen
import Navbar from '@/components/Navbar'
import FileTabs from '@/components/FileTabs'
import CodeEditor from '@/components/CodeEditor'
import WebPreview from '@/components/WebPreview'
import OutputPanel from '@/components/OutputPanel'
import { useCodeStore } from '@/store/useCodeStore'

function EditorContent() {
  const { mode, setMode } = useCodeStore()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if the URL has ?mode=python or ?mode=web
    const modeParam = searchParams.get('mode')
    if (modeParam === 'python' || modeParam === 'web') {
      setMode(modeParam)
    }
  }, [searchParams, setMode])

  return (
    <main className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col md:flex-row h-full relative overflow-hidden">
        {/* LEFT PANE: Editor & Tabs */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full border-r border-white/5 flex flex-col bg-[#1e1e1e] relative">
          {/* Tab Bar Area */}
          <div className="shrink-0 z-10 shadow-sm">
            <FileTabs />
          </div>

          {/* Editor Area */}
          <div className="flex-1 relative min-h-0">
            <CodeEditor />
          </div>
        </div>

        {/* RIGHT PANE: Live Preview OR Output */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#0a0a0a] flex flex-col relative">
          {/* Subtle Inner Shadow for Depth */}
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none"></div>

          {mode === 'web' ? <WebPreview /> : <OutputPanel />}
        </div>
      </div>
    </main>
  )
}

// 2. Custom Loading Screen Component
function LoadingScreen() {
  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Outer Ring */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping blur-xl"></div>
        {/* Logo */}
        <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-4 rounded-2xl shadow-2xl relative z-10">
          <Code2 size={40} className="animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-3 text-gray-400 mt-4">
        <Loader2 className="animate-spin text-blue-500" size={18} />
        <span className="text-sm font-medium tracking-wide uppercase">
          Initializing Environment...
        </span>
      </div>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <EditorContent />
    </Suspense>
  )
}

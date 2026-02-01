'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2, Code2 } from 'lucide-react'
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels' // NEW IMPORTS

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
    const modeParam = searchParams.get('mode')
    // Make sure 'logic' is included here!
    if (
      modeParam === 'python' ||
      modeParam === 'web' ||
      modeParam === 'logic'
    ) {
      setMode(modeParam)
    }
  }, [searchParams, setMode])

  return (
    <main className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <Navbar />

      {/* Main Workspace Area with Resizable Panels */}
      <div className="flex-1 relative overflow-hidden">
        {/* 'auto' makes it switch to vertical stack on mobile automatically if supported, 
            but for explicit control we stick to horizontal for desktop-like feel or implement a media query check */}
        <PanelGroup direction="horizontal" autoSaveId="persistence">
          {/* LEFT PANE: Editor */}
          <Panel
            defaultSize={50}
            minSize={20}
            className="flex flex-col bg-[#1e1e1e] border-r border-white/5 relative"
          >
            <div className="shrink-0 z-10 shadow-sm">
              <FileTabs />
            </div>
            <div className="flex-1 relative min-h-0">
              <CodeEditor />
            </div>
          </Panel>

          {/* RESIZER HANDLE */}
          <PanelResizeHandle className="w-2 bg-[#0a0a0a] hover:bg-blue-600 transition-colors flex items-center justify-center cursor-col-resize group z-50">
            <div className="h-8 w-1 rounded-full bg-white/20 group-hover:bg-white transition-colors"></div>
          </PanelResizeHandle>

          {/* RIGHT PANE: Preview / Output */}
          <Panel
            defaultSize={50}
            minSize={20}
            className="flex flex-col bg-[#0a0a0a] relative"
          >
            {/* Subtle Inner Shadow */}
            <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent z-10 pointer-events-none"></div>

            {mode === 'web' ? <WebPreview /> : <OutputPanel />}
          </Panel>
        </PanelGroup>
      </div>
    </main>
  )
}

function LoadingScreen() {
  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping blur-xl"></div>
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

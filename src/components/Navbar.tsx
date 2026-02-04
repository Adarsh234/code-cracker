'use client'
import Link from 'next/link'
import {
  Play,
  ArrowLeft,
  Layers,
  Terminal,
  Download,
  ChevronDown,
  Check,
  Settings, // <--- NEW IMPORT
} from 'lucide-react'
import { useCodeStore, SUPPORTED_LANGUAGES } from '@/store/useCodeStore'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import SettingsModal from './SettingsModal' // <--- NEW IMPORT

export default function Navbar() {
  const { mode, setMode, language, setLanguage, runCode, code } = useCodeStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false) // <--- NEW STATE

  // Helper to find current language object
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.id === language)

  const handleDownload = () => {
    if (mode === 'web') {
      const fullHtml = `<!DOCTYPE html><html><head><style>${code.css}</style></head><body>${code.html}<script>${code.javascript}</script></body></html>`
      const blob = new Blob([fullHtml], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'index.html'
      a.click()
    } else {
      const codeKey = language === 'javascript' ? 'javascript_node' : language
      const content = code[codeKey as keyof typeof code]

      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = currentLang?.file || 'code.txt'
      a.click()
    }
  }

  return (
    <>
      {/* RENDER SETTINGS MODAL */}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}

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

          <div className="h-8 w-[1px] bg-gray-700 mx-2 hidden sm:block"></div>

          {/* 2. Unified Mode Switcher */}
          <div className="flex bg-black/60 p-1.5 rounded-xl border border-white/10 shadow-inner">
            {/* Web Button */}
            <button
              onClick={() => setMode('web')}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative overflow-hidden',
                mode === 'web'
                  ? 'text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-500 hover:text-gray-300',
              )}
            >
              {mode === 'web' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 -z-10" />
              )}
              <Layers size={16} /> <span className="hidden sm:block">Web</span>
            </button>

            {/* Logic/Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setMode('logic')
                  setIsDropdownOpen(!isDropdownOpen)
                }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative overflow-hidden',
                  mode === 'logic'
                    ? 'text-white shadow-lg shadow-purple-600/25'
                    : 'text-gray-500 hover:text-gray-300',
                )}
              >
                {mode === 'logic' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 -z-10" />
                )}
                <Terminal size={16} />
                <span className="hidden sm:block">
                  {currentLang?.name || 'Logic'}
                </span>
                <ChevronDown
                  size={12}
                  className={cn(
                    'transition-transform',
                    isDropdownOpen && 'rotate-180',
                  )}
                />
              </button>

              {/* The Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-40 bg-[#1e1e1e] border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => {
                          setMode('logic')
                          setLanguage(lang.id)
                          setIsDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center justify-between"
                      >
                        {lang.name}
                        {language === lang.id && (
                          <Check size={14} className="text-purple-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 3. Right Section */}
        <div className="flex items-center gap-3">
          {/* NEW: Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5"
            title="Editor Settings"
          >
            <Settings size={20} />
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium border border-white/10 transition-all active:scale-95"
          >
            <Download size={16} /> <span className="hidden sm:block">Save</span>
          </button>

          {mode === 'logic' && (
            <button
              onClick={runCode}
              className="group relative flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-[0_0_20px_-5px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_-5px_rgba(34,197,94,0.6)] transition-all active:scale-95 border border-white/10"
            >
              <Play size={16} fill="currentColor" />
              <span>Run</span>
            </button>
          )}
        </div>
      </div>
    </>
  )
}

'use client'
import { useCodeStore } from '@/store/useCodeStore'
import { FileCode, FileJson, FileType, Code } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FileTabs() {
  const { activeFile, setActiveFile, mode } = useCodeStore()

  if (mode === 'python')
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-b border-gray-800 text-yellow-500 text-sm font-mono">
        <Code size={14} /> main.py
      </div>
    )

  const tabs = [
    {
      id: 'html',
      label: 'index.html',
      icon: <FileCode size={14} className="text-orange-500" />,
    },
    {
      id: 'css',
      label: 'style.css',
      icon: <FileType size={14} className="text-blue-400" />,
    },
    {
      id: 'javascript',
      label: 'script.js',
      icon: <FileJson size={14} className="text-yellow-400" />,
    },
  ] as const

  return (
    <div className="flex bg-[#18181b] border-b border-gray-800">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveFile(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-r border-gray-800 transition-colors select-none',
            activeFile === tab.id
              ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500'
              : 'text-gray-500 hover:bg-[#1e1e1e]/50 hover:text-gray-300 border-t-2 border-t-transparent',
          )}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  )
}

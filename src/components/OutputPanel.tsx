'use client'
import { useCodeStore } from '@/store/useCodeStore'
import { Terminal } from 'lucide-react'

export default function OutputPanel() {
  const { output } = useCodeStore()

  return (
    <div className="h-full w-full bg-[#1e1e1e] flex flex-col border-l border-gray-800">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-gray-800 text-gray-400 text-xs uppercase tracking-wider font-semibold shrink-0">
        <Terminal size={14} />
        <span>Console</span>
      </div>

      <div className="flex-1 p-4 font-mono text-sm overflow-auto text-gray-300">
        {output ? (
          <pre className="whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2 opacity-50">
            <Terminal size={32} />
            <p>Run code to see output</p>
          </div>
        )}
      </div>
    </div>
  )
}

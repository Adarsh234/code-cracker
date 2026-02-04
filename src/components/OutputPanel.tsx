'use client'
import { useCodeStore } from '@/store/useCodeStore'
import { Terminal, Keyboard, Trash2 } from 'lucide-react' // Import Trash2

export default function OutputPanel() {
  const { output, stdin, setStdin, clearOutput } = useCodeStore() // Get clearOutput

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] text-gray-300 font-mono text-sm">
      {/* 1. INPUT AREA (STDIN) */}
      <div className="h-1/3 border-b border-white/10 flex flex-col">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e]/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <Keyboard size={12} /> Program Input (Stdin)
        </div>
        <textarea
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          placeholder="Enter inputs here (e.g. for Python input() or C++ cin)..."
          className="flex-1 w-full bg-transparent p-4 resize-none outline-none text-white placeholder-gray-600 focus:bg-white/5 transition-colors"
          spellCheck={false}
        />
      </div>

      {/* 2. OUTPUT AREA (STDOUT) */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* HEADER WITH CLEAR BUTTON */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e]/50 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Terminal size={12} /> Console Output
          </div>

          {output && (
            <button
              onClick={clearOutput}
              className="p-1 hover:bg-white/10 rounded-md text-gray-500 hover:text-red-400 transition-colors"
              title="Clear Console"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        <div className="flex-1 p-4 overflow-auto whitespace-pre-wrap leading-relaxed">
          {output ? (
            <span
              className={
                output.startsWith('> Error') ? 'text-red-400' : 'text-green-300'
              }
            >
              {output}
            </span>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2 opacity-50">
              <Terminal size={32} />
              <p>Run code to see output</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

'use client'
import { useCodeStore, SUPPORTED_LANGUAGES } from '@/store/useCodeStore'
import { cn } from '@/lib/utils'
import { FileCode, FileJson, FileType, File } from 'lucide-react'

export default function FileTabs() {
  const { mode, activeFile, setActiveFile, language } = useCodeStore()

  // Get the filename for the current logic language (e.g., "main.py" or "main.cpp")
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.id === language)
  const logicFileName = currentLangObj ? currentLangObj.file : 'script.txt'

  return (
    <div className="flex items-center bg-[#1e1e1e] border-b border-white/5 overflow-x-auto no-scrollbar">
      {/* ----------------- WEB MODE TABS ----------------- */}
      {mode === 'web' && (
        <>
          <button
            onClick={() => setActiveFile('html')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-r border-white/5 transition-colors min-w-[120px]',
              activeFile === 'html'
                ? 'bg-[#1e1e1e] text-orange-400 border-t-2 border-t-orange-400'
                : 'bg-[#18181b] text-gray-500 hover:text-gray-300 hover:bg-[#1e1e1e]',
            )}
          >
            <FileCode size={14} /> index.html
          </button>

          <button
            onClick={() => setActiveFile('css')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-r border-white/5 transition-colors min-w-[120px]',
              activeFile === 'css'
                ? 'bg-[#1e1e1e] text-blue-400 border-t-2 border-t-blue-400'
                : 'bg-[#18181b] text-gray-500 hover:text-gray-300 hover:bg-[#1e1e1e]',
            )}
          >
            <FileType size={14} /> style.css
          </button>

          <button
            onClick={() => setActiveFile('javascript')}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-r border-white/5 transition-colors min-w-[120px]',
              activeFile === 'javascript'
                ? 'bg-[#1e1e1e] text-yellow-400 border-t-2 border-t-yellow-400'
                : 'bg-[#18181b] text-gray-500 hover:text-gray-300 hover:bg-[#1e1e1e]',
            )}
          >
            <FileJson size={14} /> script.js
          </button>
        </>
      )}

      {/* ----------------- LOGIC MODE TAB ----------------- */}
      {mode === 'logic' && (
        <button
          className={cn(
            'flex items-center gap-2 px-6 py-2.5 text-sm font-medium border-r border-white/5 bg-[#1e1e1e] text-purple-400 border-t-2 border-t-purple-400 min-w-[140px]',
          )}
        >
          <File size={14} /> {logicFileName}
        </button>
      )}

      {/* Empty space filler */}
      <div className="flex-1 bg-[#18181b] h-[41px] border-b border-white/5"></div>
    </div>
  )
}

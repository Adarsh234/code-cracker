'use client'
import { useRef } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import { useCodeStore } from '@/store/useCodeStore'
import { Wand2 } from 'lucide-react'

export default function CodeEditor() {
  // 1. Get 'settings' from the store
  const { mode, language, activeFile, code, updateCode, settings } =
    useCodeStore()

  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run()
    }
  }

  // Determine what code to show
  let currentCode = ''
  let currentLang = 'javascript' // for syntax highlighting

  if (mode === 'web') {
    if (activeFile === 'html') {
      currentCode = code.html
      currentLang = 'html'
    } else if (activeFile === 'css') {
      currentCode = code.css
      currentLang = 'css'
    } else {
      currentCode = code.javascript
      currentLang = 'javascript'
    }
  } else {
    // Logic Mode
    const codeKey = language === 'javascript' ? 'javascript_node' : language
    currentCode = code[codeKey as keyof typeof code] || ''
    currentLang = language === 'javascript' ? 'javascript' : language
  }

  const handleChange = (value: string | undefined) => {
    if (mode === 'web') {
      updateCode(activeFile, value || '')
    } else {
      const codeKey = language === 'javascript' ? 'javascript_node' : language
      updateCode(codeKey, value || '')
    }
  }

  // 2. Define settings with fallbacks (prevents crash if settings are undefined)
  const fontSize = settings?.fontSize || 14
  const wordWrap = settings?.wordWrap || 'on'
  const showMinimap = settings?.minimap || false

  return (
    <div className="h-full w-full bg-[#1e1e1e] relative group">
      {/* FORMAT BUTTON (Hidden by default, appears on hover) */}
      <button
        onClick={handleFormat}
        className="absolute top-4 right-5 z-20 p-2 bg-white/5 hover:bg-blue-600 text-gray-400 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/5 shadow-xl"
        title="Format Code"
      >
        <Wand2 size={16} />
      </button>

      <Editor
        height="100%"
        language={currentLang}
        theme="vs-dark"
        value={currentCode}
        onChange={handleChange}
        onMount={handleEditorDidMount}
        // 3. Pass the settings to the Monaco Editor options
        options={{
          minimap: { enabled: showMinimap }, // dynamic
          fontSize: fontSize, // dynamic
          wordWrap: wordWrap, // dynamic
          padding: { top: 16 },
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  )
}

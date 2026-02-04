'use client'
import { useRef } from 'react'
import Editor, { OnMount } from '@monaco-editor/react'
import { useCodeStore } from '@/store/useCodeStore'
import { Wand2 } from 'lucide-react'

export default function CodeEditor() {
  const { mode, language, activeFile, code, updateCode } = useCodeStore()

  // 1. Create a reference to hold the editor instance
  const editorRef = useRef<any>(null)

  // 2. Capture the editor when it loads
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  // 3. Function to trigger the built-in formatter
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
    // Mapping store keys (like 'javascript_node') to values
    const codeKey = language === 'javascript' ? 'javascript_node' : language
    currentCode = code[codeKey as keyof typeof code] || ''

    // Mapping for Monaco Syntax Highlighting
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

  return (
    // Added 'relative' and 'group' classes here for the floating button
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
        onMount={handleEditorDidMount} // Attach the reference here
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16 },
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2, // Added for better formatting
        }}
      />
    </div>
  )
}

'use client'
import Editor from '@monaco-editor/react'
import { useCodeStore } from '@/store/useCodeStore'

export default function CodeEditor() {
  const { mode, language, activeFile, code, updateCode } = useCodeStore()

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
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        language={currentLang}
        theme="vs-dark"
        value={currentCode}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16 },
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          fontLigatures: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

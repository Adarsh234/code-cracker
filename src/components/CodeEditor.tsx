'use client'
import Editor from '@monaco-editor/react'
import { useCodeStore } from '@/store/useCodeStore'

export default function CodeEditor() {
  const { activeFile, code, updateCode } = useCodeStore()

  const languageMap = {
    html: 'html',
    css: 'css',
    javascript: 'javascript',
    python: 'python',
  }

  return (
    <div className="h-full w-full bg-[#1e1e1e]">
      <Editor
        height="100%"
        theme="vs-dark"
        language={languageMap[activeFile]}
        value={code[activeFile]}
        onChange={(value) => updateCode(activeFile, value || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Menlo, monospace',
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

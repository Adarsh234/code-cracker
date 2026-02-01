'use client'
import { useCodeStore } from '@/store/useCodeStore'
import { Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function WebPreview() {
  const { code } = useCodeStore()

  // FIX: Initialize with 'about:blank' instead of empty string ''
  // This prevents the browser from trying to re-download the whole page
  const [src, setSrc] = useState('about:blank')

  useEffect(() => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            html, body { height: 100%; margin: 0; padding: 0; }
            ${code.css}
          </style>
        </head>
        <body>
          ${code.html}
          <script>
            try {
              ${code.javascript}
            } catch (err) {
              console.error("JS Error:", err);
            }
          </script>
        </body>
      </html>
    `

    setSrc(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`)
  }, [code.html, code.css, code.javascript])

  return (
    <div className="h-full w-full flex flex-col bg-white border-l border-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-300 shrink-0">
        <div className="flex items-center gap-2 text-gray-600">
          <Globe size={14} />
          <span className="text-xs font-bold uppercase tracking-wide">
            Live Browser
          </span>
        </div>
      </div>

      <div className="flex-1 relative bg-white">
        <iframe
          src={src}
          title="preview"
          className="absolute inset-0 w-full h-full border-none bg-white"
          sandbox="allow-scripts allow-modals allow-same-origin"
        />
      </div>
    </div>
  )
}

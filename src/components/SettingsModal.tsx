'use client'
import { X, Type, WrapText, Map } from 'lucide-react'
import { useCodeStore } from '@/store/useCodeStore'

export default function SettingsModal({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings } = useCodeStore()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-96 bg-[#1e1e1e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#252526]">
          <h2 className="text-lg font-semibold text-white">Editor Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Font Size */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Type size={16} className="text-blue-400" /> Font Size
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="32"
                step="1"
                value={settings.fontSize}
                onChange={(e) =>
                  updateSettings('fontSize', parseInt(e.target.value))
                }
                className="flex-1 accent-blue-500 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="w-8 text-right text-white font-mono">
                {settings.fontSize}px
              </span>
            </div>
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <WrapText size={16} className="text-purple-400" /> Word Wrap
            </label>
            <button
              onClick={() =>
                updateSettings(
                  'wordWrap',
                  settings.wordWrap === 'on' ? 'off' : 'on',
                )
              }
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.wordWrap === 'on' ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.wordWrap === 'on' ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
          </div>

          {/* Minimap */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Map size={16} className="text-green-400" /> Minimap
            </label>
            <button
              onClick={() => updateSettings('minimap', !settings.minimap)}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.minimap ? 'bg-green-600' : 'bg-gray-700'}`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.minimap ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#252526] border-t border-white/5 text-center">
          <p className="text-xs text-gray-500">
            Changes allow you to customize your workspace.
          </p>
        </div>
      </div>
    </div>
  )
}

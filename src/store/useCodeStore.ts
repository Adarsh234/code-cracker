import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1. Define supported languages and their versions for Piston API
export const SUPPORTED_LANGUAGES = [
  { id: 'python', name: 'Python', version: '3.10.0', file: 'main.py' },
  { id: 'javascript', name: 'Node.js', version: '18.15.0', file: 'index.js' },
  { id: 'cpp', name: 'C++', version: '10.2.0', file: 'main.cpp' },
  { id: 'java', name: 'Java', version: '15.0.2', file: 'Main.java' },
  { id: 'go', name: 'Go', version: '1.16.2', file: 'main.go' },
]

interface CodeStore {
  mode: 'web' | 'logic' // Changed 'python' to generic 'logic'
  language: string // Track current language (python, cpp, etc.)
  activeFile: string // 'html', 'css', 'js' OR 'code'

  code: {
    html: string
    css: string
    javascript: string
    // Logic Mode Snippets
    python: string
    javascript_node: string
    cpp: string
    java: string
    go: string
  }
  output: string

  setMode: (mode: 'web' | 'logic') => void
  setLanguage: (lang: string) => void
  setActiveFile: (file: string) => void
  updateCode: (field: string, value: string) => void
  runCode: () => void // Renamed from runPython
}

// Initial Boilerplates
const BOILERPLATES = {
  python: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("CodeCracker"))`,
  javascript_node: `console.log("Hello from Node.js environment!");\n\nconst numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);`,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`,
  go: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`,
}

export const useCodeStore = create<CodeStore>()(
  persist(
    (set, get) => ({
      mode: 'web',
      language: 'python',
      activeFile: 'html',

      code: {
        html: `<div class="container">\n  <h1>CodeCracker</h1>\n  <p>Start editing to see magic happen.</p>\n</div>`,
        css: `body { background: #0f172a; color: white; display: grid; place-items: center; height: 100vh; font-family: sans-serif; }`,
        javascript: `console.log("Web mode active");`,

        // Load defaults
        python: BOILERPLATES.python,
        javascript_node: BOILERPLATES.javascript_node,
        cpp: BOILERPLATES.cpp,
        java: BOILERPLATES.java,
        go: BOILERPLATES.go,
      },

      output: '',

      setMode: (mode) => set({ mode }),

      setLanguage: (language) => set({ language }),

      setActiveFile: (file) => set({ activeFile: file }),

      updateCode: (field, value) =>
        set((state) => ({ code: { ...state.code, [field]: value } })),

      runCode: async () => {
        const { language, code } = get()
        set({ output: `> Preparing ${language} environment...` })

        // Find config for selected language
        const langConfig = SUPPORTED_LANGUAGES.find((l) => l.id === language)
        if (!langConfig) return

        // Map store keys to Piston keys (e.g. javascript -> javascript_node)
        const codeKey = language === 'javascript' ? 'javascript_node' : language
        const sourceCode = code[codeKey as keyof typeof code]

        try {
          const response = await fetch(
            'https://emkc.org/api/v2/piston/execute',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                language: langConfig.id,
                version: langConfig.version,
                files: [{ content: sourceCode }],
              }),
            },
          )

          const data = await response.json()

          if (data.run) {
            set({
              output: `> Output:\n${data.run.output}\n\n[Exit Code: ${data.run.code}]`,
            })
          } else {
            set({ output: '> Error: Could not execute code.' })
          }
        } catch (error) {
          set({ output: '> Error: Failed to connect to server.' })
        }
      },
    }),
    {
      name: 'code-cracker-storage',
      partialize: (state) => ({
        code: state.code,
        mode: state.mode,
        language: state.language,
      }),
    },
  ),
)

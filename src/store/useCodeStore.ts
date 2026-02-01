import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1. Supported Languages
export const SUPPORTED_LANGUAGES = [
  { id: 'python', name: 'Python', version: '3.10.0', file: 'main.py' },
  { id: 'javascript', name: 'Node.js', version: '18.15.0', file: 'index.js' },
  { id: 'cpp', name: 'C++', version: '10.2.0', file: 'main.cpp' },
  { id: 'java', name: 'Java', version: '15.0.2', file: 'Main.java' },
  { id: 'go', name: 'Go', version: '1.16.2', file: 'main.go' },
]

interface CodeStore {
  mode: 'web' | 'logic'
  language: string
  activeFile: string

  code: {
    html: string
    css: string
    javascript: string
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
  runCode: () => void
}

// 2. Logic Boilerplates
const BOILERPLATES = {
  python: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("CodeCracker"))\n\n# Try changing the message above!`,
  javascript_node: `console.log("Hello from Node.js environment!");\n\nconst numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);`,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}`,
  go: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello from Go!")\n}`,
}

// 3. Rich Web Boilerplate (Restored)
const WEB_BOILERPLATE = {
  html: `<div class="container">
  <h1>Welcome to <br/><span>CodeCracker</span></h1>
  <p>CodeCracker is a versatile code editor built to enhance 
  your coding experience with its intuitive interface and 
  powerful features.</p>
  
  <button id="btn">Click to Test JS</button>
</div>`,
  css: `/* CSS Styling */
body {
  background-color: #0f172a;
  color: #e2e8f0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
}

.container {
  text-align: center;
  max-width: 600px;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
}

h1 { font-size: 3rem; margin-bottom: 1rem; line-height: 1.1; }
h1 span { color: #3b82f6; font-weight: 800; }
p { font-size: 1.1rem; line-height: 1.6; color: #94a3b8; margin-bottom: 2rem; }

button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}
button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }`,
  javascript: `// JavaScript Logic
const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  btn.innerText = 'It Works!';
  btn.style.backgroundColor = '#10b981';
  alert('JavaScript is connected successfully!');
});`,
}

export const useCodeStore = create<CodeStore>()(
  persist(
    (set, get) => ({
      mode: 'web',
      language: 'python',
      activeFile: 'html',

      code: {
        // Load the Rich Web Boilerplate
        html: WEB_BOILERPLATE.html,
        css: WEB_BOILERPLATE.css,
        javascript: WEB_BOILERPLATE.javascript,

        // Load Logic Boilerplates
        python: BOILERPLATES.python,
        javascript_node: BOILERPLATES.javascript_node,
        cpp: BOILERPLATES.cpp,
        java: BOILERPLATES.java,
        go: BOILERPLATES.go,
      },

      output: '',

      setMode: (mode) => set({ mode }),
      setLanguage: (language) => set({ language }),
      setActiveFile: (activeFile) => set({ activeFile }),

      updateCode: (field, value) =>
        set((state) => ({ code: { ...state.code, [field]: value } })),

      runCode: async () => {
        const { language, code } = get()
        set({ output: `> Preparing ${language} environment...` })

        const langConfig = SUPPORTED_LANGUAGES.find((l) => l.id === language)
        if (!langConfig) return

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
      // CRITICAL FIX: Changed name to 'v2' to force a reset of user's local storage
      name: 'code-cracker-storage-v2',
      partialize: (state) => ({
        code: state.code,
        mode: state.mode,
        language: state.language,
      }),
    },
  ),
)

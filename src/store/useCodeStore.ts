import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

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
  stdin: string

  // NEW: Editor Settings
  settings: {
    fontSize: number
    wordWrap: 'on' | 'off'
    minimap: boolean
  }

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
  isSaving: boolean

  setMode: (mode: 'web' | 'logic') => void
  setLanguage: (lang: string) => void
  setActiveFile: (file: string) => void
  setStdin: (value: string) => void
  updateCode: (field: string, value: string) => void

  // NEW: Update Settings
  updateSettings: (key: keyof CodeStore['settings'], value: any) => void

  runCode: () => void
  clearOutput: () => void
  saveToCloud: (userId: string) => Promise<void>
  loadFromCloud: (userId: string) => Promise<void>
}

// 2. Logic Boilerplates (Interactive)
const BOILERPLATES = {
  python: `name = input("What is your name? ")\nprint(f"Hello, {name}!")\n\n# Type a name in the Input box and click Run!`,
  javascript_node: `console.log("Hello from Node.js environment!");\n\nconst numbers = [1, 2, 3, 4, 5];\nconst sum = numbers.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << "Enter your name: ";\n    cin >> name;\n    cout << "Hello " << name << " from C++!" << endl;\n    return 0;\n}`,
  java: `import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.println("Enter your name: ");\n        if(scanner.hasNext()) {\n            String name = scanner.next();\n            System.out.println("Hello " + name + " from Java!");\n        }\n    }\n}`,
  go: `package main\nimport "fmt"\n\nfunc main() {\n    var name string\n    fmt.Println("Enter your name: ")\n    fmt.Scanln(&name)\n    fmt.Println("Hello", name, "from Go!")\n}`,
}

// 3. Rich Web Boilerplate (Restored from your snippet)
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
      stdin: '', // Initialize Input

      settings: {
        fontSize: 14,
        wordWrap: 'on',
        minimap: false,
      },

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
      isSaving: false,

      setMode: (mode) => set({ mode }),
      setLanguage: (language) => set({ language }),
      setActiveFile: (activeFile) => set({ activeFile }),
      setStdin: (stdin) => set({ stdin }),

      updateSettings: (key, value) =>
        set((state) => ({ settings: { ...state.settings, [key]: value } })),

      clearOutput: () => set({ output: '' }),

      updateCode: (field, value) =>
        set((state) => ({ code: { ...state.code, [field]: value } })),

      runCode: async () => {
        const { language, code, stdin } = get()
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
                stdin: stdin, // Send Input
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

      saveToCloud: async (userId: string) => {
        set({ isSaving: true })
        const { code, mode, language } = get()

        try {
          const { error } = await supabase.from('workspaces').upsert({
            user_id: userId,
            code: code,
            mode: mode,
            language: language,
            updated_at: new Date(),
          })

          if (error) throw error
          // Optional: Add a toast notification here "Saved!"
        } catch (error) {
          console.error('Error saving to cloud:', error)
        } finally {
          set({ isSaving: false })
        }
      },

      loadFromCloud: async (userId: string) => {
        try {
          const { data, error } = await supabase
            .from('workspaces')
            .select('*')
            .eq('user_id', userId)
            .single()

          if (error && error.code !== 'PGRST116') throw error // Ignore 'not found' error

          if (data) {
            set({
              code: data.code, // Load the saved code
              mode: data.mode,
              language: data.language,
            })
          }
        } catch (error) {
          console.error('Error loading from cloud:', error)
        }
      },
    }),
    {
      // Updated to v4 to ensure everything (UI + Boilerplates) reloads fresh
      name: 'code-cracker-storage-v5',
      partialize: (state) => ({
        code: state.code,
        mode: state.mode,
        language: state.language,
        stdin: state.stdin,
        settings: state.settings,
      }),
    },
  ),
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CodeStore {
  mode: 'web' | 'python'
  activeFile: 'html' | 'css' | 'javascript' | 'python'
  code: {
    html: string
    css: string
    javascript: string
    python: string
  }
  output: string
  setMode: (mode: 'web' | 'python') => void
  setActiveFile: (file: 'html' | 'css' | 'javascript' | 'python') => void
  updateCode: (file: string, value: string) => void
  runPython: () => void
}

export const useCodeStore = create<CodeStore>()(
  persist(
    (set, get) => ({
      mode: 'web',
      activeFile: 'html',

      code: {
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

        python: `# Python Playground
# Calculate Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print("Calculating Fibonacci Sequence...")
for i in range(10):
    print(f"Fib({i}) = {fibonacci(i)}")`,
      },

      output: '',

      setMode: (mode) => {
        set({ mode, activeFile: mode === 'web' ? 'html' : 'python' })
      },

      setActiveFile: (file) => set({ activeFile: file }),

      updateCode: (file, value) =>
        set((state) => ({ code: { ...state.code, [file]: value } })),

      runPython: async () => {
        const { code } = get()
        set({ output: '> Connecting to Python Runtime...' })

        try {
          const response = await fetch(
            'https://emkc.org/api/v2/piston/execute',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                language: 'python',
                version: '3.10.0',
                files: [{ content: code.python }],
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
      name: 'code-cracker-storage', // The key in localStorage
      partialize: (state) => ({ code: state.code, mode: state.mode }), // Only save code and mode
    },
  ),
)

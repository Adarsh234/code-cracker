# CodeCracker v2 🚀

![GitHub language count](https://img.shields.io/github/languages/count/Adarsh234/CodeCracker)
![GitHub top language](https://img.shields.io/github/languages/top/Adarsh234/CodeCracker)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![GitHub last commit](https://img.shields.io/github/last-commit/Adarsh234/CodeCracker)
![License](https://img.shields.io/badge/license-MIT-blue)

![CodeCracker Banner](https://via.placeholder.com/1200x400.png?text=CodeCracker+v2+Preview)
**Code, Run, & Create Instantly.**

CodeCracker is an advanced, browser-based Integrated Development Environment (IDE) built with **Next.js 15**. It features a modern, glassmorphism UI and supports both instant web development previews and server-side logic execution for multiple programming languages.

## ✨ Features

### 🌐 Dual-Mode Environment

- **Web Editor:** Real-time environment for **HTML, CSS, and JavaScript**. Changes are reflected instantly in a crash-proof live preview pane.
- **Logic Editor:** A powerful environment to write and execute backend logic.

### ⚡ Multi-Language Support

Execute code instantly via the [Piston API](https://github.com/engineer-man/piston). Supported languages include:

- 🐍 **Python** (v3.10.0)
- 🚀 **C++** (v10.2.0)
- ☕ **Java** (v15.0.2)
- 🐹 **Go** (v1.16.2)
- 🟢 **Node.js** (v18.15.0)

### 🎨 Premium UI/UX

- **Glassmorphism Design:** A sleek, dark-themed interface (`#0a0a0a`) with frosted glass effects.
- **Resizable Panels:** Customize your workspace by dragging the divider between the code and preview panes.
- **Monaco Editor:** Powered by the same engine as VS Code, providing syntax highlighting, bracket matching, and auto-formatting.
- **Responsive:** Fully optimized for desktop and tablet usage.

### 💾 Persistence & portability

- **Auto-Save:** Never lose your work. Code is automatically saved to your browser's local storage.
- **Download Code:** Export your projects as `.html` files (Web Mode) or source files like `.py`, `.cpp`, etc. (Logic Mode).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (with Persist Middleware)
- **Code Editor:** `@monaco-editor/react`
- **UI Components:** `lucide-react`, `framer-motion`
- **Layout:** `react-resizable-panels`
- **Execution API:** [Piston API](https://emkc.org/)

---

## 🚀 Getting Started

Follow these steps to run CodeCracker locally on your machine.

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/your-username/codecracker.git](https://github.com/your-username/codecracker.git)
   cd codecracker
   ```

2. **Install dependencies**

```bash
npm install

```

3. **Run the development server**

```bash
npm run dev

```

4. **Open your browser**
   Navigate to [Code_Cracker](https://code-cracker-five.vercel.app/) to see the app running.

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── page.tsx            # Landing Page
│   └── editor/
│       └── page.tsx        # Main Editor Layout
├── components/
│   ├── Navbar.tsx          # Navigation & Mode Switcher
│   ├── CodeEditor.tsx      # Monaco Editor Instance
│   ├── WebPreview.tsx      # Live HTML Iframe
│   ├── OutputPanel.tsx     # Logic Console Output
│   └── FileTabs.tsx        # Dynamic Tab Bar
├── store/
│   └── useCodeStore.ts     # Global State (Zustand)
└── lib/
    └── utils.ts            # Helper functions

```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve CodeCracker, feel free to fork the repository and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- **Piston API** for the amazing code execution engine.
- **Lucide** for the beautiful icon set.
- **Vercel** for hosting infrastructure.

---

Made with ❤️ by [Adarsh](https://github.com/Adarsh234)

```

```

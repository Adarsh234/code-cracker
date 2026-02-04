# CodeCracker v2 🚀

![GitHub language count](https://img.shields.io/github/languages/count/Adarsh234/code-cracker)
![GitHub top language](https://img.shields.io/github/languages/top/Adarsh234/code-cracker)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)
![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![GitHub last commit](https://img.shields.io/github/last-commit/Adarsh234/code-cracker)
![License](https://img.shields.io/badge/license-MIT-blue)

![CodeCracker Banner](https://github.com/user-attachments/assets/fabeec2d-2177-42a1-b2c2-1bb1e945a1e1)

**Code, Run, & Create Instantly.**

CodeCracker is an advanced, browser-based Integrated Development Environment (IDE) built with **Next.js 15**. It features a modern glassmorphism UI, real-time cloud synchronization, and supports both instant web previews and server-side logic execution for multiple programming languages.

## ✨ Features

### 🌐 Dual-Mode Environment
- **Web Editor:** Real-time environment for **HTML, CSS, and JavaScript**. Changes are reflected instantly in a crash-proof live preview pane.
- **Logic Editor:** A powerful environment to write and execute backend logic with **Standard Input (Stdin)** support for interactive programs.

### ☁️ Cloud & Auth (New!)
- **User Authentication:** Secure Sign-in/Sign-up via Google and Email (powered by **Clerk**).
- **Cloud Sync:** Automatically saves your workspace to the cloud (powered by **Supabase**). Access your code from any device.
- **Persistence:** Local storage backup ensures you never lose work even if offline.

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
- **Editor Customization:** Settings modal to adjust **Font Size**, **Word Wrap**, and **Minimap**.
- **Smart Tools:** Includes a **Code Formatter** (Prettier) and **Console Cleaner**.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** [Clerk](https://clerk.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **State Management:** Zustand (with Persist Middleware)
- **Code Editor:** `@monaco-editor/react`
- **UI Components:** `lucide-react`, `framer-motion`, `react-resizable-panels`
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
   git clone [https://github.com/Adarsh234/code-cracker.git](https://github.com/Adarsh234/code-cracker.git)
   cd code-cracker


2. **Install dependencies**
```bash
npm install

```


3. **Configure Environment Variables**
Create a `.env.local` file in the root directory and add your keys:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=[https://your-project.supabase.co](https://your-project.supabase.co)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR...

```


4. **Run the development server**
```bash
npm run dev

```


5. **Open your browser**
Navigate to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the app running.

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── page.tsx            # Landing Page with Auth UI
│   ├── layout.tsx          # Root Layout (Clerk Provider)
│   └── editor/
│       └── page.tsx        # Main Editor Layout
├── components/
│   ├── Navbar.tsx          # Nav, Cloud Status, User Profile
│   ├── CodeEditor.tsx      # Monaco Instance + Format Button
│   ├── SettingsModal.tsx   # Editor Preferences (Font/Wrap)
│   ├── WebPreview.tsx      # Live HTML Iframe
│   ├── OutputPanel.tsx     # Console Output + Stdin Input
│   └── FileTabs.tsx        # Dynamic Tab Bar
├── store/
│   └── useCodeStore.ts     # Global State (Zustand + Supabase Logic)
├── lib/
│   ├── supabase.ts         # Supabase Client
│   └── utils.ts            # Helpers
└── middleware.ts           # Clerk Auth Middleware

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

* **Piston API** for the amazing code execution engine.
* **Lucide** for the beautiful icon set.
* **Clerk & Supabase** for powering the backend infrastructure.

---

Made with ❤️ by [Adarsh](https://github.com/Adarsh234)

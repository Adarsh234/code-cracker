'use client'
import Link from 'next/link'
import {
  Code2,
  ArrowRight,
  Github,
  Zap,
  Cpu,
  Globe,
  Layers,
  Terminal,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black text-white selection:bg-blue-500/30 overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-10%] -z-10 m-auto h-[500px] w-[500px] rounded-full bg-blue-600 opacity-20 blur-[120px] animate-pulse"></div>
      <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-purple-600 opacity-10 blur-[100px]"></div>

      {/* Navigation */}
      <nav className="border-b border-white/5 p-4 md:px-8 flex justify-between items-center backdrop-blur-xl sticky top-0 z-50 bg-black/10">
        {/* Logo Area */}
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
            <Code2 className="text-white" size={20} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            CodeCracker
          </span>
        </div>

        {/* NEW: Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link
            href="/editor?mode=web"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Layers size={16} /> Web Editor
          </Link>
          <Link
            href="/editor?mode=python"
            className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
          >
            <Terminal size={16} /> Python Editor
          </Link>
        </div>

        {/* GitHub Link */}
        <div className="flex gap-4">
          <Link
            href="https://github.com/Adarsh234"
            target="_blank"
            className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
          >
            <Github size={22} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-medium mb-8 backdrop-blur-md shadow-lg shadow-blue-500/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>v2.0 Now Available</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 drop-shadow-2xl"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
              Code, Run, &
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x bg-[length:200%_auto]">
              Create Instantly.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
          >
            An advanced browser-based IDE supporting{' '}
            <strong className="text-blue-200">
              HTML, CSS, JavaScript, and Python
            </strong>
            . Experience real-time previews and instant logic execution without
            any setup.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link
              href="/editor?mode=web"
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]"
            >
              <span className="mr-2">Start Coding</span>
              <ArrowRight
                className="transition-transform group-hover:translate-x-1"
                size={18}
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine" />
            </Link>

            <Link
              href="https://github.com/Adarsh234/CodeCracker"
              target="_blank"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 px-8 font-medium text-white transition-all hover:bg-white/10 hover:border-white/20 backdrop-blur-sm"
            >
              View on GitHub
            </Link>
          </motion.div>
        </motion.div>
      </main>

      {/* Feature Grid */}
      <section className="px-4 md:px-12 max-w-7xl mx-auto pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Globe className="text-blue-400" />}
            title="Multi-Language"
            desc="Seamless support for Web technologies (HTML/CSS/JS) and Python logic out of the box."
            delay={0.2}
          />
          <FeatureCard
            icon={<Zap className="text-yellow-400" />}
            title="Instant Execution"
            desc="Run your code immediately with our optimized client-side runners. No waiting time."
            delay={0.3}
          />
          <FeatureCard
            icon={<Cpu className="text-purple-400" />}
            title="Monaco Editor"
            desc="Powered by the same engine as VS Code. Enjoy syntax highlighting and formatting."
            delay={0.4}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-500 bg-black/20 backdrop-blur-sm">
        <p>
          Designed & Built by{' '}
          <span className="text-white font-medium hover:text-blue-400 transition-colors cursor-default">
            Adarsh
          </span>
          .
        </p>
        <p className="text-sm mt-2 opacity-60">
          &copy; {new Date().getFullYear()} CodeCracker. Open Source.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode
  title: string
  desc: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10"
    >
      <div className="mb-6 p-4 bg-gradient-to-br from-white/5 to-white/0 w-fit rounded-xl border border-white/5 group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300">
        {desc}
      </p>
    </motion.div>
  )
}

import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, InfoBox, StatusBadge, ArchitectureDiagram } from '../components/Layout';
import { ArrowRight, Code, Shield, Eye, Brain, Layers, Users, GitBranch, ExternalLink, Github } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-16">
      <PageHeader title="About TOM" subtitle="An open-source personal AI agent runtime designed to understand requests, plan multi-step tasks, use registered tools, and verify whether actions actually succeeded." breadcrumbs={[{ label: 'About', href: '/about' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading subtitle="Why an AI assistant needs more than a language model">The Problem</SectionHeading>
        <div className="text-editorial space-y-4 mb-12">
          <p className="text-lg">A language model can generate plausible text. But generating text about an action is not the same as performing it. An AI that says "I opened the app" has not opened anything — it has produced words.</p>
          <p>Real agency requires planning, grounded tool execution, observation of actual outcomes, verification against expectations, recovery when things go wrong, explicit permissions for consequential actions, and a clear record of what happened.</p>
          <p><strong>TOM (Task-Oriented Multimodal)</strong> is built on this principle: an agent must be able to act in the real world, observe what actually happened, and honestly report whether it succeeded.</p>
        </div>

        <SectionHeading subtitle="Core principles guiding development">Project Principles</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { icon: Code, title: 'Open Source First', desc: 'Apache-2.0 licensed. All code, documentation, and research notes are public.' },
            { icon: Shield, title: 'Local-First Where Practical', desc: 'Local model inference, local memory storage. Your data stays on your machine.' },
            { icon: Layers, title: 'Provider-Neutral', desc: 'Replaceable AI model providers through OpenAI-compatible endpoints.' },
            { icon: Eye, title: 'Transparent Capability Reporting', desc: 'Every capability has an honest status. No confusion between code and working integration.' },
            { icon: Brain, title: 'User Approval for Impact', desc: 'High-impact actions require explicit confirmation.' },
            { icon: GitBranch, title: 'Honest About Limitations', desc: 'UNKNOWN is a valid outcome. Failure is information, not embarrassment.' },
          ].map((p, i) => (
            <div key={i} className="card">
              <p.icon size={20} className="text-gray-400 mb-3" />
              <h3 className="font-semibold text-black mb-1">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.desc}</p>
            </div>
          ))}
        </div>

        <SectionHeading>Modular Architecture</SectionHeading>
        <div className="text-editorial space-y-3 mb-8">
          <p>TOM is organized into distinct modules with clear boundaries:</p>
        </div>
        <div className="space-y-2 mb-8">
          {[
            { name: 'runtime', desc: 'Core AgentRuntime orchestrating planning, policy, tool execution, verification, and memory' },
            { name: 'planner', desc: 'RulePlanner for deterministic plans, ModelPlanner for LLM-generated plans' },
            { name: 'tools', desc: 'Registered tool system with descriptions, input schemas, permissions, risk classifications' },
            { name: 'browser', desc: 'Playwright adapter with navigation policy, session boundaries, approval gates' },
            { name: 'voice', desc: 'Full-duplex WebSocket, ASR interfaces, neural VAD, turn prediction, TTS factories' },
            { name: 'perception', desc: 'Screenshot/UI-tree fusion and multimodal verification' },
            { name: 'security', desc: 'Permission enforcement, secret redaction, API auth, privacy boundaries' },
            { name: 'android', desc: 'Kotlin device agent with challenge/HMAC handshake, accessibility observations' },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <code className="font-mono text-sm text-black font-medium flex-shrink-0 w-24">{m.name}</code>
              <span className="text-sm text-gray-600">{m.desc}</span>
            </div>
          ))}
        </div>

        <InfoBox variant="info">
          <strong>Note:</strong> The current architecture has more than one tool registry and execution path. Legacy and live-device paths still exist and have not been completely consolidated.
        </InfoBox>

        <ArchitectureDiagram />

        <div className="flex flex-wrap gap-3 mt-12">
          <Link to="/docs/quick-start" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
          <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="btn-secondary"><Github size={16} /> Repository</a>
          <Link to="/roadmap" className="btn-ghost">View Roadmap →</Link>
        </div>
      </div>
    </div>
  );
}



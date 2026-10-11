import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, InfoBox } from '../components/Layout';
import { ArrowRight, Code, Shield, Eye, Brain, Layers, Users, GitBranch } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About TOM"
        subtitle="An open-source personal AI agent runtime designed to understand requests, plan multi-step tasks, use registered tools, and verify whether actions actually succeeded."
        breadcrumbs={[{ label: 'About', href: '/about' }]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading subtitle="Why an AI assistant needs more than a language model">The Problem</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-12">
          <p>A language model can generate plausible text. But generating text about an action is not the same as performing it. An AI that says "I opened the app" has not opened anything — it has produced words. Real agency requires planning, grounded tool execution, observation of actual outcomes, verification against expectations, recovery when things go wrong, explicit permissions for consequential actions, and a clear record of what happened.</p>
          <p>TOM (Task-Oriented Multimodal) is built on this principle: <strong>an agent must be able to act in the real world, observe what actually happened, and honestly report whether it succeeded.</strong> Not "the model said it succeeded" — but "the observation confirms the expected state change."</p>
          <p>This is why TOM includes a planner, a tool registry, permission policies, approval gates, observation collection, action-specific success predicates, bounded recovery, memory, and event infrastructure. These are not optional features — they are the minimum architecture for an agent that can be trusted to act on behalf of a user.</p>
        </div>

        <SectionHeading subtitle="Core principles guiding development">Project Principles</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            { icon: Code, title: 'Open Source First', desc: 'Apache-2.0 licensed. All code, documentation, and research notes are public. No hidden capabilities or undisclosed limitations.' },
            { icon: Shield, title: 'Local-First Where Practical', desc: 'Local model inference, local memory storage, local configuration. Your data stays on your machine unless you explicitly configure otherwise.' },
            { icon: Layers, title: 'Provider-Neutral', desc: 'Replaceable AI model providers. TOM communicates through OpenAI-compatible endpoints. Switch models without rewriting logic.' },
            { icon: Eye, title: 'Transparent Capability Reporting', desc: 'Every capability has an honest status. We never confuse a code implementation with a successful real-world integration.' },
            { icon: Brain, title: 'User Approval for Impact', desc: 'High-impact actions require explicit confirmation. The user decides what the agent is allowed to do.' },
            { icon: GitBranch, title: 'Honest About Limitations', desc: 'We do not fabricate success. UNKNOWN is a valid and valuable outcome. Failure is information, not embarrassment.' },
          ].map((p, i) => (
            <div key={i} className="p-4 border border-wheat-dark/30 rounded-sm">
              <p.icon size={18} className="text-ochre-dark mb-2" />
              <h3 className="font-sans font-semibold text-sm text-ink mb-1">{p.title}</h3>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <SectionHeading subtitle="How TOM is organized">Modular Architecture</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>TOM is organized into distinct modules with clear boundaries:</p>
          <ul className="list-none space-y-3 pl-0">
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">runtime</span>
              <span>Core AgentRuntime orchestrating planning, policy, tool execution, verification, and memory.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">planner</span>
              <span>RulePlanner for deterministic plans, ModelPlanner for LLM-generated plans with structured output validation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">tools</span>
              <span>Registered tool system with explicit descriptions, input arguments, permissions, and risk classifications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">browser</span>
              <span>Playwright browser adapter with navigation policy, session boundaries, and captured page state.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">voice</span>
              <span>Full-duplex voice WebSocket, ASR interfaces, neural VAD, turn prediction, TTS factories.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">perception</span>
              <span>Screenshot/UI-tree fusion and multimodal verification for grounded action validation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">security</span>
              <span>Permission enforcement, secret redaction, API bearer-token configuration, privacy boundaries.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-mono text-xs text-ochre-dark mt-1 flex-shrink-0">android</span>
              <span>Kotlin device agent with challenge/HMAC handshake, accessibility observations, and post-action verification.</span>
            </li>
          </ul>
        </div>

        <InfoBox variant="info">
          <strong>Note:</strong> The current architecture has more than one tool registry and execution path. Legacy and live-device paths still exist and have not been completely consolidated. This is documented honestly — the system is evolving.
        </InfoBox>

        <SectionHeading subtitle="Who TOM is for">Intended Users</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-12">
          <p>TOM is designed for developers, researchers, and technically-minded users who want to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Experiment with AI agent architectures that prioritize verification over claimed success</li>
            <li>Run local model inference without depending on cloud APIs for every decision</li>
            <li>Control an Android device or browser through an AI agent with explicit permissions</li>
            <li>Study how planning, tool use, observation, and verification compose into an agent runtime</li>
            <li>Contribute to open-source research in grounded AI action and evidence-based execution</li>
          </ul>
        </div>

        <SectionHeading subtitle="What TOM cannot yet do">Current Limitations</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-12">
          <ul className="list-disc pl-5 space-y-2">
            <li>Real local model inference has not been validated on every user's hardware</li>
            <li>TTS synthesis depends on model availability, device capability, and configuration</li>
            <li>Android automation depends on device version, app behavior, accessibility availability, and permissions</li>
            <li>Browser automation cannot bypass CAPTCHAs, authentication walls, or browser security</li>
            <li>Memory is not uniformly encrypted; production deployments need additional safeguards</li>
            <li>Payment, booking, and financial operations require authoritative provider evidence — TOM does not fabricate completion</li>
            <li>The system is single-user and single-worker; multi-tenant deployment requires additional engineering</li>
          </ul>
        </div>

        <SectionHeading>Future Direction</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-12">
          <p>TOM's roadmap focuses on:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Completing real Qwen inference tests on supported hardware</li>
            <li>Validating actual TTS audio output end-to-end</li>
            <li>Testing connected Android devices with real post-action predicates</li>
            <li>Improving evidence collection and bounded recovery</li>
            <li>Consolidating execution paths into a unified agent loop</li>
            <li>Adding deployment-safe persistent state and improved secret redaction</li>
            <li>Publishing reproducible research benchmarks</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <Link to="/docs/quick-start" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-parchment text-sm font-sans font-medium rounded-sm hover:bg-ink-light transition-colors">
            Get Started <ArrowRight size={14} />
          </Link>
          <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/20 text-ink text-sm font-sans font-medium rounded-sm hover:bg-wheat/30 transition-colors">
            <GitBranch size={15} /> View Repository
          </a>
          <Link to="/roadmap" className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/20 text-ink text-sm font-sans font-medium rounded-sm hover:bg-wheat/30 transition-colors">
            View Roadmap <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

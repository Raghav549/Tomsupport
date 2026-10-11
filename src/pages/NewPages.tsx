import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, InfoBox, StatusBadge, CodeBlock } from '../components/Layout';
import { SEO, BreadcrumbSchema, FAQPageSchema } from '../components/SEO';
import { ArrowRight, Cpu, Brain, Layers, Globe, Smartphone, Mic, Shield, Eye, Clock, Database, Lock, Wifi, FileText, Check, GitBranch, BookOpen, Terminal, Download, ExternalLink, AlertTriangle, Zap, Code, Users, Heart, Monitor, Copy } from 'lucide-react';

// ===== FEATURES PAGE =====
export function FeaturesPage() {
  return (
    <div className="pt-16">
      <SEO title="Features" description="Explore TOM's core features: AI planning, tool registry, browser automation, Android control, voice interface, verification engine, memory, and permissions." />
      <PageHeader title="Features" subtitle="Comprehensive capabilities for building reliable AI agents." />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: 'AI Planning', desc: 'Rule-based and model-driven planning with structured output validation', link: '/local-ai' },
            { icon: Layers, title: 'Tool Registry', desc: 'Explicit tool contracts with permissions and risk classification', link: '/tool-registry' },
            { icon: Globe, title: 'Browser Automation', desc: 'Playwright-based browser control with approval gates', link: '/browser-automation' },
            { icon: Smartphone, title: 'Android Control', desc: 'Kotlin device agent with accessibility observations', link: '/android-automation' },
            { icon: Mic, title: 'Voice Interface', desc: 'Full-duplex voice with ASR, VAD, and TTS', link: '/voice-tts' },
            { icon: Eye, title: 'Verification Engine', desc: 'Action-specific predicates for VERIFIED, FAILED, UNKNOWN', link: '/verification' },
            { icon: Database, title: 'Memory & Context', desc: 'Local memory with JSONL persistence', link: '/memory' },
            { icon: Shield, title: 'Permissions', desc: 'Risk classification and approval gates', link: '/security' },
            { icon: Cpu, title: 'Local AI', desc: 'Ollama integration with Qwen models', link: '/local-ai' },
          ].map((f, i) => (
            <Link key={i} to={f.link} className="card group hover-lift">
              <f.icon size={24} className="text-gray-400 group-hover:text-black transition-colors mb-3" />
              <h3 className="font-semibold text-black mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{f.desc}</p>
              <span className="text-xs text-gray-400 group-hover:text-black transition-colors">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== HOW IT WORKS PAGE =====
export function HowItWorksPage() {
  return (
    <div className="pt-16">
      <SEO title="How TOM Works" description="Understand TOM's execution pipeline: request intake, planning, permission checks, tool execution, observation, verification, and memory." />
      <PageHeader title="How TOM Works" subtitle="From natural language to verified action." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>The Execution Pipeline</SectionHeading>
        <div className="space-y-4 mb-12">
          {[
            { step: '1', title: 'Request Intake', desc: 'Natural language request received via API, WebSocket, or voice.' },
            { step: '2', title: 'Context Loading', desc: 'Relevant memory and conversation context loaded.' },
            { step: '3', title: 'Plan Generation', desc: 'RulePlanner or ModelPlanner generates structured plan.' },
            { step: '4', title: 'Permission Check', desc: 'Each action checked against permission policy and risk classification.' },
            { step: '5', title: 'Tool Execution', desc: 'Registered tool selected and executed through appropriate adapter.' },
            { step: '6', title: 'Observation', desc: 'Fresh observation collected after action execution.' },
            { step: '7', title: 'Verification', desc: 'Action-specific predicate evaluates observation. VERIFIED, FAILED, or UNKNOWN.' },
            { step: '8', title: 'Recovery', desc: 'Bounded recovery attempted where supported.' },
            { step: '9', title: 'Result Reporting', desc: 'Final outcome reported with verification status and evidence.' },
            { step: '10', title: 'Memory Update', desc: 'Successful outcomes stored for future reference.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{item.step}</span>
              <div>
                <h4 className="font-semibold text-black mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== ARCHITECTURE PAGE =====
export function ArchitecturePage() {
  return (
    <div className="pt-16">
      <SEO title="Architecture" description="TOM's modular architecture: AgentRuntime, planner, tool registry, browser adapter, voice pipeline, perception, security, and Android agent." />
      <PageHeader title="Architecture" subtitle="Modular design with clear boundaries." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Core Modules</SectionHeading>
        <div className="space-y-3 mb-8">
          {[
            { name: 'AgentRuntime', desc: 'Main orchestration loop' },
            { name: 'Planner', desc: 'RulePlanner and ModelPlanner interfaces' },
            { name: 'ToolRegistry', desc: 'Registered tool contracts' },
            { name: 'ApprovalGate', desc: 'Consequential action confirmation' },
            { name: 'PermissionPolicy', desc: 'Permission enforcement rules' },
            { name: 'MemoryStore', desc: 'Context and history persistence' },
            { name: 'EventBus', desc: 'Correlated task/action events' },
            { name: 'BrowserAdapter', desc: 'Playwright browser automation' },
            { name: 'VoicePipeline', desc: 'ASR, VAD, TTS integration' },
            { name: 'AndroidAgent', desc: 'Kotlin device agent' },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <code className="font-mono text-sm text-black font-medium flex-shrink-0 w-32">{m.name}</code>
              <span className="text-sm text-gray-600">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== LOCAL AI PAGE =====
export function LocalAIPage() {
  return (
    <div className="pt-16">
      <SEO title="Local AI & Models" description="Run AI models locally with Ollama. Privacy-first, provider-neutral, replaceable models. Qwen-family support." />
      <PageHeader title="Local AI & Models" subtitle="Privacy-first inference on your machine." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Local vs Hosted</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="font-semibold text-black mb-3">Local Inference</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" /> Data stays on your machine</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" /> No API costs per request</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" /> No network dependency</li>
              <li className="flex items-start gap-2"><AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" /> Requires sufficient RAM/VRAM</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="font-semibold text-black mb-3">Hosted Inference</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2"><Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" /> No local hardware requirements</li>
              <li className="flex items-start gap-2"><Check size={14} className="text-green-600 mt-0.5 flex-shrink-0" /> Access to latest models</li>
              <li className="flex items-start gap-2"><AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" /> Data sent to third party</li>
              <li className="flex items-start gap-2"><AlertTriangle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" /> API costs per request</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== OLLAMA QWEN PAGE =====
export function OllamaQwenPage() {
  return (
    <div className="pt-16">
      <SEO title="Ollama & Qwen Integration" description="Configure local model inference with Ollama and Qwen models. Step-by-step setup for Windows and Linux." />
      <PageHeader title="Ollama & Qwen" subtitle="Local model inference setup." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Setup Guide</SectionHeading>
        <CodeBlock title="1. Install Ollama" code={`# Download from https://ollama.com
# Or use winget on Windows:
winget install Ollama.Ollama`} />
        <CodeBlock title="2. Pull Qwen model" code={`ollama pull qwen3:4b
ollama list`} />
        <CodeBlock title="3. Configure TOM" code={`TOM_LLM_ENABLED=true
TOM_LLM_BASE_URL=http://127.0.0.1:11434/v1
TOM_LLM_MODEL=qwen3:4b
TOM_LLM_API_KEY=`} />
      </div>
    </div>
  );
}

// ===== VOICE TTS PAGE =====
export function VoiceTTsPage() {
  return (
    <div className="pt-16">
      <SEO title="Voice & Qwen3-TTS" description="Full-duplex voice interface with streaming ASR, neural VAD, turn prediction, and Qwen3-TTS synthesis." />
      <PageHeader title="Voice & Qwen3-TTS" subtitle="Natural voice interaction." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Voice Infrastructure</SectionHeading>
        <div className="text-editorial space-y-3 mb-8">
          <ul className="list-disc pl-5 space-y-2">
            <li>16 kHz PCM16 incoming audio</li>
            <li>24 kHz PCM16 outgoing audio</li>
            <li>Streaming ASR interfaces</li>
            <li>Neural VAD for voice activity detection</li>
            <li>Turn prediction and barge-in handling</li>
            <li>Qwen3-TTS synthesis adapter</li>
          </ul>
        </div>
        <InfoBox variant="warning">
          <strong>Note:</strong> Qwen3-TTS generates complete waveform then packetizes. This is buffered inference, not native streaming.
        </InfoBox>
      </div>
    </div>
  );
}

// ===== BROWSER AUTOMATION PAGE =====
export function BrowserAutomationPage() {
  return (
    <div className="pt-16">
      <SEO title="Browser Automation" description="Playwright-based browser automation with navigation policy, session boundaries, captured page state, and approval gates." />
      <PageHeader title="Browser Automation" subtitle="Playwright-based web interaction." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Setup</SectionHeading>
        <CodeBlock title="Install browser dependencies" code={`pip install -e ".[browser]"
playwright install chromium`} />
        <InfoBox variant="warning">
          <strong>Reality check:</strong> Cannot bypass CAPTCHAs, authentication, or browser security.
        </InfoBox>
      </div>
    </div>
  );
}

// ===== ANDROID AUTOMATION PAGE =====
export function AndroidAutomationPage() {
  return (
    <div className="pt-16">
      <SEO title="Android Automation" description="Kotlin device agent with authentication, accessibility observations, screenshots, and post-action verification." />
      <PageHeader title="Android Automation" subtitle="Kotlin device agent." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Device Agent</SectionHeading>
        <div className="text-editorial space-y-3 mb-8">
          <ul className="list-disc pl-5 space-y-2">
            <li>Challenge/HMAC handshake authentication</li>
            <li>Accessibility observations and screenshots</li>
            <li>Post-action verification</li>
            <li>App opening, tapping, text entry, navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ===== TOOL REGISTRY PAGE =====
export function ToolRegistryPage() {
  return (
    <div className="pt-16">
      <SEO title="Tool Registry" description="Explicit tool contracts with descriptions, input schemas, permissions, risk classifications, and provider adapters." />
      <PageHeader title="Tool Registry" subtitle="Explicit tool contracts." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Tool Categories</SectionHeading>
        <div className="space-y-4 mb-8">
          {[
            { category: 'Local Document Tools', status: 'requires-config' },
            { category: 'Public Read-Only APIs', status: 'requires-config' },
            { category: 'Browser Tools', status: 'requires-config' },
            { category: 'Android Tools', status: 'experimental' },
            { category: 'Integration Registry', status: 'implemented' },
          ].map((cat, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="font-medium text-black">{cat.category}</span>
              <StatusBadge status={cat.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== VERIFICATION PAGE =====
export function VerificationPage() {
  return (
    <div className="pt-16">
      <SEO title="Verification Engine" description="Action-specific success predicates evaluating VERIFIED, FAILED, or UNKNOWN outcomes based on fresh observations." />
      <PageHeader title="Verification Engine" subtitle="Honest outcome reporting." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Three Outcomes</SectionHeading>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="card text-center border-2 border-green-100">
            <h3 className="font-bold text-green-700 text-lg mb-2">VERIFIED</h3>
            <p className="text-xs text-gray-600">Observation confirms expected state</p>
          </div>
          <div className="card text-center border-2 border-red-100">
            <h3 className="font-bold text-red-700 text-lg mb-2">FAILED</h3>
            <p className="text-xs text-gray-600">Observation contradicts expected outcome</p>
          </div>
          <div className="card text-center border-2 border-gray-200">
            <h3 className="font-bold text-gray-600 text-lg mb-2">UNKNOWN</h3>
            <p className="text-xs text-gray-600">Insufficient evidence</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SECURITY PAGE =====
export function SecurityPage() {
  return (
    <div className="pt-16">
      <SEO title="Security & Permissions" description="Permission enforcement, risk classification, operator authentication, API bearer tokens, and privacy boundaries." />
      <PageHeader title="Security & Permissions" subtitle="Explicit permission enforcement." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>API Authentication</SectionHeading>
        <CodeBlock title="Bearer token" code={`TOM_API_TOKEN=your-strong-secret`} />
        <InfoBox variant="warning">
          <strong>Critical:</strong> Never publish or commit TOM_API_TOKEN.
        </InfoBox>
      </div>
    </div>
  );
}

// ===== MEMORY PAGE =====
export function MemoryPage() {
  return (
    <div className="pt-16">
      <SEO title="Memory & Context" description="Local memory store, JSONL-based durable storage, contextual conversation handling, and replaceable storage boundary." />
      <PageHeader title="Memory & Context" subtitle="Local memory with persistence." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="warning">
          <strong>Privacy:</strong> Memory is not uniformly encrypted. Production needs additional safeguards.
        </InfoBox>
      </div>
    </div>
  );
}

// ===== INSTALLATION PAGE =====
export function InstallationPage() {
  return (
    <div className="pt-16">
      <SEO title="Installation Guide" description="Complete installation guide for TOM. Python 3.12+, virtual environments, dependencies, and configuration." />
      <PageHeader title="Installation Guide" subtitle="Get TOM running on your machine." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <CodeBlock title="Quick Install" code={`python -m venv venv
source venv/bin/activate  # Linux/Mac
pip install -e ".[dev]"
cp .env.example .env
python -m uvicorn tom.api.app:app --host 127.0.0.1 --port 8787`} />
      </div>
    </div>
  );
}

// ===== TUTORIALS PAGE =====
export function TutorialsPage() {
  return (
    <div className="pt-16">
      <SEO title="Tutorials" description="Step-by-step tutorials for using TOM. Learn planning, tool use, browser automation, Android control, and voice interaction." />
      <PageHeader title="Tutorials" subtitle="Learn TOM step by step." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-4">
          {['Basic Planning', 'Tool Registration', 'Browser Automation', 'Android Control', 'Voice Interface', 'Verification'].map((t, i) => (
            <div key={i} className="card"><h3 className="font-semibold text-black">{t}</h3></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== EXAMPLES PAGE =====
export function ExamplesPage() {
  return (
    <div className="pt-16">
      <SEO title="Examples" description="Real-world examples of TOM in action. Flight booking, research tasks, Android automation, and more." />
      <PageHeader title="Examples" subtitle="See TOM in action." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">
          {['Flight Search & Booking', 'Multi-Step Research', 'Android App Navigation', 'Voice-Controlled Tasks'].map((ex, i) => (
            <div key={i} className="card"><h3 className="font-semibold text-black mb-2">{ex}</h3><p className="text-sm text-gray-600">Example workflow demonstrating TOM capabilities.</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== BENCHMARKS PAGE =====
export function BenchmarksPage() {
  return (
    <div className="pt-16">
      <SEO title="Benchmarks & Testing" description="Historical test results: 276 passing tests, lint, mypy, compile checks. Honest reporting of what was and was not tested." />
      <PageHeader title="Benchmarks & Testing" subtitle="Honest test reporting." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="info">
          <strong>Historical results (Oct 5, 2026):</strong> 276 passing tests, lint/mypy/compile passing. Real inference, TTS, Android, browser not tested in that environment.
        </InfoBox>
      </div>
    </div>
  );
}

// ===== RESEARCH PAPERS PAGE =====
export function ResearchPapersPage() {
  return (
    <div className="pt-16">
      <SEO title="Research Papers" description="Research informing TOM's design: V-Droid, VeriSafe Agent, AndroidWorld, OSWorld, Qwen UI-Agent, Qwen-CUA." />
      <PageHeader title="Research Papers" subtitle="Academic foundations." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">
          {['V-Droid', 'VeriSafe Agent', 'VeriGUI', 'AndroidWorld', 'OSWorld', 'Qwen UI-Agent', 'Qwen-CUA'].map((p, i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-black mb-2">{p}</h3>
              <span className="badge badge-gray">Reference requires verification</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== CHANGELOG PAGE =====
export function ChangelogPage() {
  return (
    <div className="pt-16">
      <SEO title="Changelog" description="TOM release history and version updates." />
      <PageHeader title="Changelog" subtitle="Release history." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-semibold text-black mb-2">v0.1.0 — Initial Release</h3>
            <p className="text-sm text-gray-600">Core runtime, tool registry, planner, verification engine, memory, API endpoints.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== CONTRIBUTING PAGE =====
export function ContributingPage() {
  return (
    <div className="pt-16">
      <SEO title="Contributing" description="How to contribute to TOM. Code, research, documentation, testing, bug reports, and more." />
      <PageHeader title="Contributing" subtitle="Join the project." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <CodeBlock title="Git workflow" code={`git clone https://github.com/Raghav509/TOM.git
git checkout -b feature/your-feature
pip install -e ".[dev]"
pytest tests/
git commit -m "Add: clear description"
git push && open PR`} />
      </div>
    </div>
  );
}

// ===== SUPPORT PAGE =====
export function SupportPage() {
  return (
    <div className="pt-16">
      <SEO title="Support" description="Get help with TOM. Community forums, GitHub issues, documentation, and contact information." />
      <PageHeader title="Support" subtitle="Get help." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="https://github.com/Raghav509/TOM/issues" target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3"><AlertTriangle size={20} /><div><p className="font-semibold text-black text-sm">GitHub Issues</p><p className="text-xs text-gray-500">Report bugs</p></div></a>
          <Link to="/faq" className="card flex items-center gap-3"><BookOpen size={20} /><div><p className="font-semibold text-black text-sm">FAQ</p><p className="text-xs text-gray-500">Common questions</p></div></Link>
        </div>
      </div>
    </div>
  );
}

// ===== LICENSE PAGE =====
export function LicensePage() {
  return (
    <div className="pt-16">
      <SEO title="License" description="TOM is licensed under Apache-2.0. Open source, free to use, modify, and distribute." />
      <PageHeader title="License" subtitle="Apache-2.0" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-editorial">
          <p>TOM is licensed under the Apache License, Version 2.0. See the <a href="https://github.com/Raghav509/TOM/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-black underline">full license text</a> on GitHub.</p>
        </div>
      </div>
    </div>
  );
}

// ===== PRIVACY PAGE =====
export function PrivacyPage() {
  return (
    <div className="pt-16">
      <SEO title="Privacy Policy" description="TOM privacy policy. Local-first design, data handling, and your rights." />
      <PageHeader title="Privacy Policy" subtitle="Your data, your control." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-editorial space-y-4">
          <p>TOM is designed with local-first principles. Your data stays on your machine unless you explicitly configure external services.</p>
          <p>Memory is not uniformly encrypted. Production deployments need additional safeguards before storing sensitive data.</p>
        </div>
      </div>
    </div>
  );
}

// ===== TERMS PAGE =====
export function TermsPage() {
  return (
    <div className="pt-16">
      <SEO title="Terms of Service" description="TOM terms of service. Use responsibilities and limitations." />
      <PageHeader title="Terms of Service" subtitle="Use responsibilities." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-editorial">
          <p>TOM is provided as-is under the Apache-2.0 license. Users are responsible for configuring permissions, verifying actions, and understanding limitations.</p>
        </div>
      </div>
    </div>
  );
}

// ===== DONATE PAGE =====
import { useState } from 'react';
import { launchUpiPayment, getDesktopPaymentOptions } from '../utils/payment';

const FUNDRAISING_GOAL = 100000;
const INITIAL_RAISED = 9870;

export function DonatePage() {
  const [amount, setAmount] = useState<number | ''>('');
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'desktop-fallback'>('idle');
  const [upiLink, setUpiLink] = useState('');
  const [desktopOptions, setDesktopOptions] = useState<{ label: string; url: string }[]>([]);
  const raised = INITIAL_RAISED;
  const remaining = FUNDRAISING_GOAL - raised;
  const percentage = (raised / FUNDRAISING_GOAL) * 100;
  const presets = [50, 100, 250, 500, 1000];

  const handleDonate = () => {
    if (!amount || amount <= 0) return;

    // Attempt to launch UPI payment
    const result = launchUpiPayment({ amount, transactionNote: 'TOM donation support' });
    setUpiLink(result.link);

    if (result.success && result.method === 'direct') {
      // Mobile: UPI app launch was attempted
      setShowModal(false);
      setPaymentStatus('pending');
    } else {
      // Desktop or failed: show fallback options
      setShowModal(false);
      setPaymentStatus('desktop-fallback');
      setDesktopOptions(getDesktopPaymentOptions(Number(amount)));
    }
  };

  return (
    <div className="pt-16">
      <SEO title="Donate to TOM" description="Support TOM's open-source development. Your donations fund testing hardware, model inference, documentation, research, and security improvements." />
      <PageHeader title="Support TOM" subtitle="Help us build the future of open-source AI agents" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress Card */}
        <div className="card-elevated mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Fundraising Progress</p>
              <p className="heading-sans text-4xl">₹{raised.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-500">raised of ₹{FUNDRAISING_GOAL.toLocaleString('en-IN')} goal</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-black">{percentage.toFixed(2)}%</p>
              <p className="text-sm text-gray-500">₹{remaining.toLocaleString('en-IN')} remaining</p>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-3">₹{INITIAL_RAISED.toLocaleString('en-IN')} is the owner-provided initial display value. Totals update only from trusted confirmed records.</p>
        </div>

        {/* How donations help */}
        <SectionHeading>How Donations Support TOM</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {['Testing hardware (Android devices, GPUs)', 'Model inference resources for benchmarks', 'Documentation and tutorials', 'Research time and publication', 'Website and community hosting', 'Security audits and hardening'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <Check size={14} className="text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>

        {/* Donate Button */}
        <div className="text-center py-8">
          <button onClick={() => setShowModal(true)} className="btn-primary !text-lg !px-8 !py-4">
            <Heart size={18} /> Donate to TOM
          </button>
        </div>

        {/* Donation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <h3 className="heading-sans text-2xl mb-2">Choose Amount</h3>
              <p className="text-sm text-gray-500 mb-6">Select a preset or enter a custom amount in INR.</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {presets.map(p => (
                  <button key={p} onClick={() => setAmount(p)} className={`py-3 rounded-xl text-sm font-semibold transition-all ${amount === p ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    ₹{p.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value ? Number(e.target.value) : '')} placeholder="Custom amount" className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" min="1" max="100000" />
              </div>
              {amount && amount > 0 && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-600">Amount: <strong>₹{Number(amount).toLocaleString('en-IN')}</strong></p>
                  <p className="text-xs text-gray-400 mt-1">Purpose: TOM development support</p>
                </div>
              )}
              <button onClick={handleDonate} disabled={!amount || amount <= 0} className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed">
                Pay ₹{amount ? Number(amount).toLocaleString('en-IN') : '0'}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">Payment via UPI. Receipt issued only after verified confirmation.</p>
              <button onClick={() => setShowModal(false)} className="btn-ghost w-full mt-2 justify-center">Cancel</button>
            </div>
          </div>
        )}

        {/* Payment Status - Mobile pending */}
        {paymentStatus === 'pending' && (
          <div className="card-elevated text-center py-8">
            <div className="w-12 h-12 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
            <h3 className="heading-sans text-xl mb-2">Awaiting Payment Confirmation</h3>
            <p className="text-sm text-gray-500 mb-4">Your UPI app should have opened. Complete the payment there.</p>
            <p className="text-xs text-gray-400 mb-4">Opening a UPI app does not confirm payment. Totals update only after verified backend confirmation.</p>
            {upiLink && (
              <a href={upiLink} className="btn-secondary inline-flex text-sm">
                <Smartphone size={14} /> Retry UPI App
              </a>
            )}
          </div>
        )}

        {/* Payment Status - Desktop fallback */}
        {paymentStatus === 'desktop-fallback' && (
          <div className="card-elevated py-8">
            <div className="text-center mb-6">
              <Monitor size={32} className="text-gray-400 mx-auto mb-3" />
              <h3 className="heading-sans text-xl mb-2">Complete Your Donation</h3>
              <p className="text-sm text-gray-500">UPI apps are typically available on mobile devices. Choose an option below:</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 px-6">
              {desktopOptions.map((opt, i) => (
                <a key={i} href={opt.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  {opt.label === 'Copy UPI Link' ? <Copy size={16} /> : <Smartphone size={16} />}
                  <div>
                    <p className="font-semibold text-sm text-black">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.label === 'Copy UPI Link' ? 'Use in any UPI app' : 'Open in installed app'}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center mt-6 px-6">
              <p className="text-xs text-gray-400">Or scan a QR code with any UPI app from your phone. Amount: <strong>₹{Number(amount).toLocaleString('en-IN')}</strong></p>
              <p className="text-xs text-gray-400 mt-2">Payment confirmation requires backend verification. Opening an app does not confirm payment.</p>
            </div>
          </div>
        )}

        <InfoBox variant="info">
          <strong>Transparency:</strong> We do not invent payment receipts, tax-deductibility claims, or financial records. Donation totals update only from verified confirmed transactions. Card details are never stored in frontend code.
        </InfoBox>
      </div>
    </div>
  );
}

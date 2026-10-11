import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Shield, Eye, Brain, Mic, Smartphone, Globe, Layers, CheckCircle, AlertTriangle, Clock, Zap, BookOpen, Users, Heart, ExternalLink, Github } from 'lucide-react';
import { ArchitectureDiagram, StatusBadge, DemoLabel } from '../components/Layout';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="paper-texture-light relative overflow-hidden">
        <div className="absolute inset-0 fibers" />
        {/* Registration marks */}
        <div className="absolute top-4 left-4 text-[8px] font-mono text-ink-muted opacity-20">+</div>
        <div className="absolute top-4 right-4 text-[8px] font-mono text-ink-muted opacity-20">+</div>
        <div className="absolute bottom-4 left-4 text-[8px] font-mono text-ink-muted opacity-20">+</div>
        <div className="absolute bottom-4 right-4 text-[8px] font-mono text-ink-muted opacity-20">+</div>
        {/* Decorative side element */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <svg width="120" height="300" viewBox="0 0 120 300" fill="none" className="opacity-[0.06]">
            <circle cx="60" cy="60" r="40" stroke="#2c2416" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="25" stroke="#2c2416" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="10" stroke="#2c2416" strokeWidth="0.5" />
            <line x1="60" y1="100" x2="60" y2="200" stroke="#2c2416" strokeWidth="0.5" />
            <circle cx="60" cy="240" r="30" stroke="#2c2416" strokeWidth="0.5" />
            <line x1="30" y1="240" x2="90" y2="240" stroke="#2c2416" strokeWidth="0.5" />
            <line x1="60" y1="210" x2="60" y2="270" stroke="#2c2416" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-ochre-dark">Open Source · Apache-2.0</span>
              <span className="w-8 h-px bg-ochre/40" />
              <span className="text-xs font-mono text-ink-muted">v0.1 — Evolving</span>
            </div>
            <h1 className="display-serif text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.1] mb-6">
              An AI Agent Built to<br />
              <span className="text-ochre-dark">Act</span>, <span className="text-olive-dark">Observe</span>, and <span className="text-rust">Verify</span>.
            </h1>
            <p className="body-sans text-lg md:text-xl text-ink-light max-w-2xl mb-8 leading-relaxed">
              TOM combines AI planning, registered tools, contextual memory, browser and Android bridges, voice interfaces, explicit permissions, and action-specific verification — so you can see what actually happened, not just what was claimed.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/docs/quick-start" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-parchment text-sm font-sans font-medium rounded-sm hover:bg-ink-light transition-colors">
                Explore TOM <ArrowRight size={15} />
              </Link>
              <Link to="/docs" className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/20 text-ink text-sm font-sans font-medium rounded-sm hover:bg-wheat/30 transition-colors">
                <BookOpen size={15} /> Documentation
              </Link>
              <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/20 text-ink text-sm font-sans font-medium rounded-sm hover:bg-wheat/30 transition-colors">
                <Github size={15} /> View GitHub
              </a>
              <Link to="/community" className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink/20 text-ink text-sm font-sans font-medium rounded-sm hover:bg-wheat/30 transition-colors">
                <Users size={15} /> Community
              </Link>
              <Link to="/support" className="inline-flex items-center gap-2 px-5 py-2.5 border border-ochre/30 text-ochre-dark text-sm font-sans font-medium rounded-sm hover:bg-ochre/5 transition-colors">
                <Heart size={15} /> Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-8">
          <p className="diagram-label mb-2">System Architecture</p>
          <h2 className="display-serif text-2xl md:text-3xl text-ink">How TOM Processes a Request</h2>
          <p className="body-sans text-ink-muted mt-2 max-w-xl mx-auto text-sm">From natural language to verified action — every step is observable, every outcome is evaluated.</p>
        </div>
        <ArchitectureDiagram />
      </section>

      {/* Capability Overview */}
      <section className="paper-texture-dark py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="display-serif text-2xl md:text-3xl text-ink mb-2">Capability Overview</h2>
          <p className="body-sans text-ink-muted mb-8 max-w-2xl">Honest status reporting. What's implemented, what needs configuration, what's experimental, and what's planned.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: 'Planning & Reasoning', desc: 'Rule-based and model-based planners with structured output validation', status: 'implemented' },
              { icon: Cpu, title: 'Local Model Inference', desc: 'OpenAI-compatible endpoint via Ollama with Qwen-family models', status: 'requires-config' },
              { icon: Layers, title: 'Registered Tool System', desc: 'Explicit tool contracts with permissions, descriptions, and input validation', status: 'implemented' },
              { icon: Globe, title: 'Browser Automation', desc: 'Playwright adapter with navigation policy, session boundaries, and approval gates', status: 'requires-config' },
              { icon: Smartphone, title: 'Android Device Agent', desc: 'Kotlin agent with accessibility observations, device auth, and post-action verification', status: 'experimental' },
              { icon: Mic, title: 'Voice & Speech', desc: 'Full-duplex WebSocket, streaming ASR, neural VAD, TTS with Qwen3-TTS adapter', status: 'experimental' },
              { icon: Shield, title: 'Permissions & Approval', desc: 'Risk classification, approval gates for consequential actions, operator authentication', status: 'implemented' },
              { icon: Eye, title: 'Verification Engine', desc: 'Action-specific success predicates with VERIFIED, FAILED, and UNKNOWN outcomes', status: 'implemented' },
              { icon: Clock, title: 'Memory & Context', desc: 'Local memory store, JSONL persistence, contextual conversation handling', status: 'implemented' },
            ].map((cap, i) => (
              <div key={i} className="paper-layer p-5 relative">
                <div className="flex items-start justify-between mb-3">
                  <cap.icon size={20} className="text-ochre-dark" />
                  <StatusBadge status={cap.status} />
                </div>
                <h3 className="font-sans font-semibold text-ink text-sm mb-1.5">{cap.title}</h3>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification-First Principles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="diagram-label mb-2">Core Philosophy</p>
            <h2 className="display-serif text-3xl md:text-4xl text-ink mb-4">Verification First</h2>
            <p className="body-sans text-ink-light leading-relaxed mb-4">
              An execution acknowledgement or changed screen is not enough to declare task success. TOM's verification sequence is: observe → plan → act → collect a fresh observation → evaluate an action-specific success predicate → continue, recover, stop, or report uncertainty.
            </p>
            <p className="body-sans text-ink-light leading-relaxed mb-4">
              Three distinct outcomes: <strong className="text-olive-dark">VERIFIED</strong>, <strong className="text-rust">FAILED</strong>, and <strong className="text-ink-muted">UNKNOWN</strong>. Failure and uncertainty are valuable honest outcomes — not bugs to hide.
            </p>
            <Link to="/capabilities/verification" className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-ochre-dark hover:text-rust transition-colors">
              Read about verification <ArrowRight size={14} />
            </Link>
          </div>
          <div className="diagram-container">
            <div className="space-y-4">
              {[
                { step: '01', label: 'Observe', desc: 'Capture current state before action', color: 'bg-ochre/10 border-ochre/30' },
                { step: '02', label: 'Plan', desc: 'Generate structured action plan', color: 'bg-olive/10 border-olive/30' },
                { step: '03', label: 'Act', desc: 'Execute through registered tool', color: 'bg-clay/10 border-clay/30' },
                { step: '04', label: 'Re-observe', desc: 'Collect fresh observation post-action', color: 'bg-rust/10 border-rust/30' },
                { step: '05', label: 'Evaluate', desc: 'Apply action-specific success predicate', color: 'bg-ink/5 border-ink/20' },
                { step: '06', label: 'Report', desc: 'VERIFIED · FAILED · UNKNOWN', color: 'bg-sage/10 border-sage/30' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 border rounded-sm ${item.color}`}>
                  <span className="font-mono text-xs text-ink-muted w-6">{item.step}</span>
                  <div>
                    <span className="font-sans font-semibold text-sm text-ink">{item.label}</span>
                    <span className="font-sans text-xs text-ink-muted ml-2">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Example Workflows */}
      <section className="paper-texture-dark py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="diagram-label mb-2">Example Workflows</p>
          <h2 className="display-serif text-2xl md:text-3xl text-ink mb-8">What TOM Can Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Search and Navigate',
                steps: ['User: "Find flights from Delhi to Mumbai tomorrow"', 'Planner generates search steps', 'Browser tool opens travel site', 'Observation captures results', 'Predicate verifies results loaded', 'Memory stores context for follow-up'],
                status: 'requires-config'
              },
              {
                title: 'Android App Interaction',
                steps: ['User: "Open Maps and search for nearest cafe"', 'Device agent authenticates', 'Opens Maps app via intent', 'Accessibility observation confirms app', 'Enters search query', 'Post-action verification checks results'],
                status: 'experimental'
              },
              {
                title: 'Multi-Step Research',
                steps: ['User: "Research Qwen3 model capabilities"', 'Planner breaks into sub-tasks', 'Browser searches documentation', 'Extracts relevant information', 'Verifies each source', 'Compiles structured summary'],
                status: 'requires-config'
              },
              {
                title: 'Voice-Controlled Task',
                steps: ['User speaks request via WebSocket', 'ASR transcribes to text', 'Agent processes and plans', 'TTS speaks confirmation', 'Tools execute with verification', 'Voice reports final outcome'],
                status: 'experimental'
              },
            ].map((workflow, i) => (
              <div key={i} className="paper-layer p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-sans font-semibold text-sm text-ink">{workflow.title}</h3>
                  <StatusBadge status={workflow.status} />
                </div>
                <ol className="space-y-1.5">
                  {workflow.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs font-sans text-ink-muted">
                      <span className="font-mono text-ochre-dark mt-0.5 flex-shrink-0">{String(j + 1).padStart(2, '0')}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <DemoLabel text="These workflows illustrate intended behavior. Actual execution depends on configuration, available tools, and connected services." />
        </div>
      </section>

      {/* Project Maturity */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <p className="diagram-label mb-2">Transparency</p>
        <h2 className="display-serif text-2xl md:text-3xl text-ink mb-6">Project Maturity</h2>
        <p className="body-sans text-ink-light max-w-3xl mb-8">
          TOM is an evolving engineering project, not a magically omnipotent AI. We believe in transparent capability reporting — here's where things stand.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Implemented Foundations', desc: 'Core runtime, tool registry, planner interfaces, permission system, verification framework, API endpoints, event infrastructure', icon: CheckCircle, color: 'text-olive-dark' },
            { label: 'Requires Configuration', desc: 'Local model inference (Ollama), browser automation (Playwright), workspace tools, public API adapters, TTS engines', icon: Zap, color: 'text-ochre-dark' },
            { label: 'Experimental', desc: 'Android device agent, full-duplex voice, Qwen3-TTS synthesis, neural VAD, semantic memory adapters', icon: AlertTriangle, color: 'text-rust' },
            { label: 'Planned / Future', desc: 'Production multi-tenant auth, encrypted storage, comprehensive benchmarks, additional integrations, hardened deployment', icon: Clock, color: 'text-ink-muted' },
          ].map((item, i) => (
            <div key={i} className="p-4 border border-wheat-dark/30 rounded-sm">
              <item.icon size={18} className={`${item.color} mb-2`} />
              <h3 className="font-sans font-semibold text-sm text-ink mb-1.5">{item.label}</h3>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Research Highlights */}
      <section className="paper-texture-dark py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="diagram-label mb-2">Research</p>
              <h2 className="display-serif text-2xl md:text-3xl text-ink">Research Foundations</h2>
            </div>
            <Link to="/research" className="text-sm font-sans text-ochre-dark hover:text-rust transition-colors flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'V-Droid', area: 'Mobile GUI Automation', desc: 'Video-based navigation for Android device agents using visual grounding.' },
              { title: 'VeriSafe Agent', area: 'Evidence-Based Verification', desc: 'Safety verification frameworks for autonomous agent actions in real environments.' },
              { title: 'AndroidWorld', area: 'Execution-Based Evaluation', desc: 'Benchmark for evaluating Android agents through real device interaction.' },
            ].map((paper, i) => (
              <Link to="/research" key={i} className="paper-layer p-5 hover:shadow-md transition-shadow group">
                <span className="text-xs font-mono text-ochre-dark uppercase tracking-wider">{paper.area}</span>
                <h3 className="font-serif text-lg text-ink mt-1 mb-2 group-hover:text-ochre-dark transition-colors">{paper.title}</h3>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">{paper.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution & Donation CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="paper-layer p-6 md:p-8">
            <Users size={24} className="text-olive-dark mb-3" />
            <h3 className="display-serif text-xl text-ink mb-2">Contribute to TOM</h3>
            <p className="body-sans text-sm text-ink-muted mb-4">
              TOM is open source and welcomes contributions: code, research, documentation, hardware testing, model compatibility reports, and bug reports.
            </p>
            <Link to="/contribute" className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-ochre-dark hover:text-rust transition-colors">
              Contribution guide <ArrowRight size={14} />
            </Link>
          </div>
          <div className="paper-layer p-6 md:p-8">
            <Heart size={24} className="text-rust mb-3" />
            <h3 className="display-serif text-xl text-ink mb-2">Support Development</h3>
            <p className="body-sans text-sm text-ink-muted mb-4">
              Donations support testing hardware, model inference resources, documentation, research, hosting, and security improvements. Transparent funding, no fabricated totals.
            </p>
            <Link to="/support" className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-ochre-dark hover:text-rust transition-colors">
              Support TOM <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

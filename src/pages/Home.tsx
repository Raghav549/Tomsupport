import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Heart, Users, Mic, Globe, Smartphone, Brain, Shield, Eye, Clock, Layers, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { WolfLogo, WolfMark } from '../components/WolfLogo';
import { StatusBadge, DemoLabel, useScrollReveal } from '../components/Layout';
import { SEO, OrganizationSchema, SoftwareApplicationSchema } from '../components/SEO';

// ===== VOICE WAVEFORM =====
function VoiceWaveform({ active = false }: { active?: boolean }) {
  const bars = 24;
  return (
    <div className="flex items-center gap-[2px] h-8">
      {Array.from({ length: bars }).map((_, i) => {
        const baseHeight = active ? Math.sin(i * 0.5) * 12 + 14 : 3;
        return (
          <div key={i} className={`w-[3px] rounded-full transition-all ${active ? 'bg-black' : 'bg-gray-200'}`}
            style={{
              height: `${baseHeight}px`,
              transition: active ? 'height 0.15s ease' : 'height 0.5s ease',
              animationDelay: `${i * 30}ms`,
              opacity: active ? 0.6 + Math.sin(i * 0.3) * 0.4 : 0.3
            }} />
        );
      })}
    </div>
  );
}

// ===== HERO DEMO - Flight Booking Simulation =====
function HeroDemo() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const steps = [
    { type: 'voice', speaker: 'user', text: '"TOM, find me a flight to Delhi tomorrow."' },
    { type: 'voice', speaker: 'tom', text: 'Sure. What departure city should I use?' },
    { type: 'voice', speaker: 'user', text: '"Patna."' },
    { type: 'action', text: 'TOM is searching flights…' },
    { type: 'browser', text: 'Opening flight search…' },
    { type: 'result', text: 'Found 3 flights. Comparing schedules and fares…' },
    { type: 'approval', text: 'Please confirm booking details before proceeding.' },
    { type: 'verify', text: 'Collecting booking evidence…' },
    { type: 'success', text: 'Booking verified. Confirmation: BK-2847.' },
  ];

  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setStep(s => (s + 1) % steps.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, steps.length]);

  return (
    <div className="browser-mockup w-full max-w-lg">
      <div className="browser-bar">
        <div className="browser-dot" /><div className="browser-dot" /><div className="browser-dot" />
        <div className="flex-1 mx-3 px-3 py-1 bg-white rounded-md text-xs text-gray-400 font-mono border border-gray-100">
          tom.agent/flight-search
        </div>
        <button onClick={() => setIsPaused(!isPaused)} className="p-1 hover:bg-gray-100 rounded" aria-label={isPaused ? 'Play' : 'Pause'}>
          {isPaused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>
      <div className="p-5 min-h-[280px] flex flex-col">
        <DemoLabel />
        {/* Voice waveform */}
        <div className="mb-4">
          <VoiceWaveform active={step < 3} />
        </div>
        <div className="flex-1 flex flex-col justify-center mt-2 space-y-3">
          {steps.slice(Math.max(0, step - 3), step + 1).map((s, i) => (
            <div key={step - 3 + i} className={`animate-fade-up ${i === Math.min(3, step) ? 'opacity-100' : 'opacity-40'}`}>
              {s.type === 'voice' && (
                <div className={`flex items-start gap-3 ${s.speaker === 'tom' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${s.speaker === 'tom' ? 'bg-black' : 'bg-gray-100'}`}>
                    {s.speaker === 'tom' ? <WolfMark size={14} className="text-white" /> : <Mic size={12} className="text-gray-500" />}
                  </div>
                  <div className={`px-3 py-2 rounded-2xl text-sm max-w-[240px] ${s.speaker === 'tom' ? 'bg-black text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                    {s.text}
                  </div>
                </div>
              )}
              {s.type === 'action' && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
                  {s.text}
                </div>
              )}
              {s.type === 'browser' && (
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={12} className="text-gray-400" />
                    <span className="text-xs font-mono text-gray-400">flights.example.com</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <p className="text-[10px] text-gray-400">Patna → Delhi</p>
                      <p className="text-xs font-semibold">6:30 AM</p>
                      <p className="text-[10px] text-green-600">₹4,200</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <p className="text-[10px] text-gray-400">Patna → Delhi</p>
                      <p className="text-xs font-semibold">2:15 PM</p>
                      <p className="text-[10px] text-green-600">₹3,800</p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <p className="text-[10px] text-gray-400">Patna → Delhi</p>
                      <p className="text-xs font-semibold">9:45 PM</p>
                      <p className="text-[10px] text-green-600">₹3,500</p>
                    </div>
                  </div>
                </div>
              )}
              {s.type === 'approval' && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield size={12} className="text-amber-600" />
                    <span className="text-xs font-semibold text-amber-800">Awaiting your approval</span>
                  </div>
                  <p className="text-xs text-amber-700">TOM pauses before consequential actions. Confirm to proceed.</p>
                </div>
              )}
              {s.type === 'verify' && (
                <div className="flex items-center gap-2 text-sm">
                  <Eye size={14} className="text-blue-500" />
                  <span className="text-gray-600">{s.text}</span>
                </div>
              )}
              {s.type === 'success' && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <span className="text-sm font-medium text-green-800">{s.text}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <span className="text-xs font-mono text-gray-400">Step {step + 1}/{steps.length}</span>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === step ? 'bg-black w-4' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== ECOSYSTEM ANIMATION =====
function EcosystemAnimation() {
  const services = [
    { name: 'WhatsApp', angle: 0, status: 'planned', color: '#25D366' },
    { name: 'Google', angle: 51, status: 'requires-config', color: '#4285F4' },
    { name: 'Instagram', angle: 103, status: 'planned', color: '#E4405F' },
    { name: 'Spotify', angle: 154, status: 'planned', color: '#1DB954' },
    { name: 'YouTube', angle: 206, status: 'planned', color: '#FF0000' },
    { name: 'Google Pay', angle: 257, status: 'requires-config', color: '#4285F4' },
    { name: 'Facebook', angle: 308, status: 'planned', color: '#1877F2' },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Center wolf */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center shadow-lg">
          <WolfLogo size={40} className="text-white" />
        </div>
      </div>
      {/* Orbiting services */}
      {services.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const r = 42;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        return (
          <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
            <button
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-2 shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 ${active === i ? 'border-black scale-110 shadow-md' : 'border-gray-200'}`}
              aria-label={s.name}
            >
              <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.name.slice(0, 2)}</span>
            </button>
            {active === i && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg animate-fade-in z-10">
                <p className="font-semibold">{s.name}</p>
                <p className="text-gray-400 text-[10px]">{s.status === 'planned' ? 'Planned' : 'Requires Config'}</p>
              </div>
            )}
          </div>
        );
      })}
      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
        {services.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const r = 42;
          const x = 50 + r * Math.cos(rad);
          const y = 50 + r * Math.sin(rad);
          return (
            <line key={i} x1="50" y1="50" x2={x} y2={y} stroke={active === i ? '#171717' : '#e5e5e5'} strokeWidth={active === i ? '0.3' : '0.15'} className="transition-all duration-300" />
          );
        })}
      </svg>
    </div>
  );
}

// ===== FEATURE SLIDES =====
const slides = [
  { id: 'speak', title: 'Speak Naturally', icon: Mic, desc: 'Use your voice to give TOM tasks. Full-duplex WebSocket with streaming ASR, neural VAD, and natural turn-taking.', color: 'bg-blue-50' },
  { id: 'plan', title: 'Plan Multi-Step Tasks', icon: Brain, desc: 'TOM breaks complex requests into structured plans. Rule-based and model-based planners with validation and recovery.', color: 'bg-purple-50' },
  { id: 'tools', title: 'Browser & Android Tools', icon: Globe, desc: 'Interact with websites through Playwright and Android devices through an authenticated Kotlin agent with accessibility observations.', color: 'bg-green-50' },
  { id: 'approve', title: 'Pause for Approval', icon: Shield, desc: 'Consequential actions require your explicit confirmation. TOM never proceeds with purchases, messages, or deletions without asking.', color: 'bg-amber-50' },
  { id: 'verify', title: 'Verify What Actually Happened', icon: Eye, desc: 'Fresh observations, action-specific predicates. VERIFIED, FAILED, or UNKNOWN — never fabricated success.', color: 'bg-emerald-50' },
  { id: 'local', title: 'Local Qwen Models', icon: Layers, desc: 'Run inference locally through Ollama. Your data stays on your machine. Provider-neutral, replaceable models.', color: 'bg-gray-50' },
  { id: 'extend', title: 'Extend with Open Source', icon: Users, desc: 'Registered tools, replaceable adapters, open architecture. Contribute code, research, documentation, or testing.', color: 'bg-rose-50' },
];

function FeatureSlides() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    setCurrent(i);
    trackRef.current?.scrollTo({ left: i * (trackRef.current.clientWidth * 0.85 + 24), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div ref={trackRef} className="slider-track px-4 sm:px-8">
        {slides.map((slide, i) => (
          <div key={slide.id} className="slider-item w-[85vw] sm:w-[400px]">
            <div className={`card-elevated h-full ${slide.color}`}>
              <slide.icon size={28} className="text-gray-700 mb-4" />
              <h3 className="heading-sans text-xl mb-2">{slide.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{slide.desc}</p>
              <div className="mt-4 pt-4 border-t border-gray-200/50">
                <StatusBadge status={i < 4 ? 'implemented' : i < 6 ? 'requires-config' : 'implemented'} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={() => goTo(Math.max(0, current - 1))} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-black w-6' : 'bg-gray-300 hover:bg-gray-400'}`} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <button onClick={() => goTo(Math.min(slides.length - 1, current + 1))} className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Next">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ===== HOME PAGE =====
export default function HomePage() {
  useScrollReveal();
  return (
    <div className="pt-16">
      <SEO
        title="TOM - AI Agent Runtime"
        description="Open-source AI agent runtime with planning, tools, browser automation, Android control, voice, and verification. Built to act, observe, and verify."
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            OrganizationSchema(),
            SoftwareApplicationSchema()
          ]
        }}
      />
      {/* HERO */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="animate-fade-up">
              <h1 className="heading-sans text-4xl sm:text-5xl lg:text-[3.5rem] text-black mb-5 leading-[1.1] tracking-tight">
                AI That Acts,<br />Observes & Verifies
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-7 max-w-md leading-relaxed">
                TOM is an open-source AI agent runtime with planning, tools, browser automation, Android control, voice, and verification.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/docs/quick-start" className="btn-primary">
                  Explore TOM <ArrowRight size={16} />
                </Link>
                <Link to="/docs" className="btn-secondary">
                  View Documentation
                </Link>
              </div>
            </div>
            <div className="animate-fade-up delay-300">
              <HeroDemo />
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATION ECOSYSTEM */}
      <section className="py-20 md:py-28 bg-gray-50/50" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Integration Ecosystem</p>
              <h2 className="heading-sans text-3xl md:text-4xl text-black mb-4">Connect → Request → Act → Observe → Verify</h2>
              <p className="text-editorial mb-6">TOM is designed to interact with the services you use. Each integration follows the same pattern: connect, request permission, perform supported operations, observe the response, and verify the result.</p>
              <p className="text-sm text-gray-500 mb-6">Hover over each service to see its integration status. Most are planned or require configuration — none are falsely claimed as connected.</p>
              <Link to="/capabilities/integrations" className="btn-ghost !text-black">View all integrations →</Link>
            </div>
            <EcosystemAnimation />
          </div>
        </div>
      </section>

      {/* FEATURE SLIDES */}
      <section className="py-20 md:py-28" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Capabilities</p>
          <h2 className="heading-sans text-3xl md:text-4xl text-black">What TOM Can Do</h2>
        </div>
        <FeatureSlides />
      </section>

      {/* ARCHITECTURE */}
      <section className="py-20 md:py-28 bg-gray-50/50" data-reveal>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Architecture</p>
            <h2 className="heading-sans text-3xl md:text-4xl text-black mb-4">How TOM Processes a Request</h2>
            <p className="text-editorial max-w-xl mx-auto">From natural language to verified action — every step is observable, every outcome is evaluated honestly.</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
            <DemoLabel />
            <svg viewBox="0 0 800 200" className="w-full mt-6" fill="none">
              {/* Simplified flow */}
              {[
                { x: 40, label: 'Request', sub: 'input' },
                { x: 180, label: 'Plan', sub: 'reason' },
                { x: 320, label: 'Permission', sub: 'check' },
                { x: 460, label: 'Execute', sub: 'tools' },
                { x: 600, label: 'Observe', sub: 'fresh' },
                { x: 720, label: 'Verify', sub: 'predicate' },
              ].map((node, i) => (
                <g key={i}>
                  <rect x={node.x} y={60} width={100} height={60} rx={12} fill={i === 5 ? '#171717' : '#fff'} stroke="#e5e5e5" strokeWidth="1.5" />
                  <text x={node.x + 50} y={88} textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600, fill: i === 5 ? '#fff' : '#171717' }}>{node.label}</text>
                  <text x={node.x + 50} y={105} textAnchor="middle" style={{ fontSize: '9px', fontFamily: 'JetBrains Mono', fill: i === 5 ? 'rgba(255,255,255,0.5)' : '#a3a3a3' }}>{node.sub}</text>
                  {i < 5 && <path d={`M${node.x + 100} 90 L${node.x + 120} 90`} stroke="#d4d4d4" strokeWidth="1.5" markerEnd="url(#arrow)" />}
                </g>
              ))}
              <defs><marker id="arrow" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto"><polygon points="0 0, 6 2, 0 4" fill="#d4d4d4" /></marker></defs>
            </svg>
          </div>
        </div>
      </section>

      {/* CAPABILITY STATUS */}
      <section className="py-20 md:py-28" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Transparency</p>
            <h2 className="heading-sans text-3xl md:text-4xl text-black mb-4">Honest Status Reporting</h2>
            <p className="text-editorial max-w-xl mx-auto">We never confuse code with working integration. Every capability has a truthful status.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Implemented', count: '8', desc: 'Core runtime, tools, permissions, verification, memory, events', badge: 'badge-green' },
              { label: 'Requires Config', count: '5', desc: 'Local models, browser, workspace, public APIs, OAuth', badge: 'badge-amber' },
              { label: 'Experimental', count: '4', desc: 'Android agent, voice, TTS, VAD', badge: 'badge-blue' },
              { label: 'Planned', count: '3', desc: 'Semantic memory, encrypted storage, multi-tenant', badge: 'badge-gray' },
            ].map((cat, i) => (
              <div key={i} className="card text-center">
                <span className={`badge ${cat.badge} mb-3`}>{cat.label}</span>
                <p className="heading-sans text-4xl text-black my-2">{cat.count}</p>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <WolfLogo size={48} className="text-white mx-auto mb-6 opacity-80" />
          <h2 className="heading-sans text-3xl md:text-4xl text-white mb-4">Built to Act, Observe, and Verify</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">TOM is open source and evolving. Explore the code, contribute, or support development.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/docs/quick-start" className="btn-primary !bg-white !text-black hover:!bg-gray-100">Get Started</Link>
            <Link to="/donate" className="btn-secondary !border-white/20 !text-white hover:!bg-white/10"><Heart size={16} /> Donate</Link>
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="btn-secondary !border-white/20 !text-white hover:!bg-white/10"><Github size={16} /> GitHub</a>
          </div>
        </div>
      </section>
    </div>
  );
}

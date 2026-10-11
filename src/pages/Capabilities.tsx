import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, InfoBox, StatusBadge, CodeBlock, DemoLabel } from '../components/Layout';
import { Search, Filter, Cpu, Brain, Layers, Globe, Smartphone, Mic, Shield, Eye, Clock, Database, Lock, Wifi, FileText } from 'lucide-react';

const capabilities = [
  { id: 'runtime', title: 'Agent Runtime', icon: Cpu, status: 'implemented', category: 'core', desc: 'Core execution pipeline: request intake, planning, policy checks, tool execution, observation, verification, recovery, memory.' },
  { id: 'planning', title: 'Planning & Reasoning', icon: Brain, status: 'implemented', category: 'core', desc: 'Deterministic RulePlanner and configurable ModelPlanner with structured output validation.' },
  { id: 'tools', title: 'Registered Tool System', icon: Layers, status: 'implemented', category: 'core', desc: 'Explicit tool contracts with descriptions, input arguments, permissions, risk classifications.' },
  { id: 'verification', title: 'Verification Engine', icon: Eye, status: 'implemented', category: 'core', desc: 'Action-specific success predicates evaluating VERIFIED, FAILED, or UNKNOWN outcomes.' },
  { id: 'permissions', title: 'Permissions & Approval', icon: Shield, status: 'implemented', category: 'core', desc: 'Risk classification, approval gates for consequential actions, operator authentication.' },
  { id: 'memory', title: 'Memory & Context', icon: Database, status: 'implemented', category: 'core', desc: 'Local memory store, JSONL-based durable storage, contextual conversation handling.' },
  { id: 'local-models', title: 'Local Model Inference', icon: Cpu, status: 'requires-config', category: 'models', desc: 'OpenAI-compatible endpoint via Ollama with Qwen-family models.' },
  { id: 'tts', title: 'Voice Synthesis (TTS)', icon: Mic, status: 'experimental', category: 'voice', desc: 'Qwen3-TTS service adapter for real synthesis when dependencies are available.' },
  { id: 'asr', title: 'Speech Recognition', icon: Mic, status: 'experimental', category: 'voice', desc: 'Streaming ASR interfaces for voice input processing.' },
  { id: 'browser', title: 'Browser Automation', icon: Globe, status: 'requires-config', category: 'platforms', desc: 'Playwright adapter with navigation policy, session boundaries, approval gates.' },
  { id: 'android', title: 'Android Device Agent', icon: Smartphone, status: 'experimental', category: 'platforms', desc: 'Kotlin agent with device auth, accessibility observations, post-action verification.' },
  { id: 'voice-ws', title: 'Voice WebSocket', icon: Wifi, status: 'experimental', category: 'voice', desc: 'Full-duplex voice WebSocket with 16 kHz PCM16 audio streams.' },
  { id: 'events', title: 'Event Infrastructure', icon: Clock, status: 'implemented', category: 'core', desc: 'Correlated task/action events with sequence numbers and verification outcomes.' },
  { id: 'workspace', title: 'Local Workspace Tools', icon: FileText, status: 'requires-config', category: 'tools', desc: 'Read-only filesystem access constrained by allowed paths and traversal checks.' },
  { id: 'public-apis', title: 'Public Read-Only APIs', icon: Wifi, status: 'requires-config', category: 'tools', desc: 'Read-only adapters for public APIs. Configuration required per provider.' },
  { id: 'semantic-memory', title: 'Semantic Memory', icon: Brain, status: 'planned', category: 'core', desc: 'Semantic memory adapters for richer context retrieval.' },
  { id: 'calendar', title: 'Calendar Integration', icon: Clock, status: 'not-available', category: 'integrations', desc: 'Unavailable until concrete provider adapter is configured.' },
  { id: 'payments', title: 'Payment Integration', icon: Lock, status: 'not-available', category: 'integrations', desc: 'Unavailable until authoritative provider evidence is configured.' },
  { id: 'messaging', title: 'Messaging Integration', icon: FileText, status: 'not-available', category: 'integrations', desc: 'Android intents exist but complete integration requires provider validation.' },
];

const categories = ['all', 'core', 'models', 'voice', 'platforms', 'tools', 'integrations'];

export default function CapabilitiesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const filtered = capabilities.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-16">
      <PageHeader title="Capabilities" subtitle="A searchable catalogue with honest status reporting. We distinguish implemented, requires-config, experimental, unavailable, and planned." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <InfoBox variant="warning"><strong>Important:</strong> A code implementation or passing unit test is not the same as a successful real-world integration.</InfoBox>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search capabilities..." className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-black transition-colors" />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${category === cat ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map(cap => (
            <div key={cap.id} className="card group hover:border-gray-300">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <cap.icon size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                  <h3 className="font-semibold text-black text-sm">{cap.title}</h3>
                </div>
                <StatusBadge status={cap.status} />
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center py-12 text-gray-400">No capabilities match your search.</p>}
      </div>
    </div>
  );
}

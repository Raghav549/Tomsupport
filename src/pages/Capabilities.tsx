import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, StatusBadge, InfoBox } from '../components/Layout';
import { Search, Filter, Cpu, Brain, Layers, Globe, Smartphone, Mic, Shield, Eye, Clock, Database, Lock, Wifi, FileText } from 'lucide-react';

const capabilities = [
  { id: 'runtime', title: 'Agent Runtime', icon: Cpu, status: 'implemented', category: 'core', desc: 'Core execution pipeline: request intake, context handling, plan generation, policy checks, tool selection, execution, observation, success evaluation, recovery, result reporting, and memory.', details: 'AgentRuntime orchestrates the full loop. Contains tool registry, planner/provider boundaries, approval gate, permission policy, responder, memory store, and event infrastructure. Note: legacy and live-device execution paths still exist and have not been completely consolidated.' },
  { id: 'planning', title: 'Planning & Reasoning', icon: Brain, status: 'implemented', category: 'core', desc: 'Deterministic RulePlanner and configurable ModelPlanner using OpenAI-compatible providers. Structured plans with validation and bounded repair.', details: 'RulePlanner generates deterministic plans. ModelPlanner uses LLM output with structured validation. Supports Qwen-family models via Ollama. Includes model output validation, bounded repair/recovery, and explicit model/provider errors.' },
  { id: 'tools', title: 'Registered Tool System', icon: Layers, status: 'implemented', category: 'core', desc: 'Explicit tool contracts with descriptions, input arguments, permissions, risk classifications, and provider adapters.', details: 'Tools are registered with explicit descriptions and input schemas. Each tool has permission requirements and risk classification. The system distinguishes between a registered tool and a configured, reachable, successfully tested integration.' },
  { id: 'verification', title: 'Verification Engine', icon: Eye, status: 'implemented', category: 'core', desc: 'Action-specific success predicates evaluating VERIFIED, FAILED, or UNKNOWN outcomes based on fresh observations.', details: 'Every action type has its own success predicate. Opening an app checks foreground package/activity. Tapping checks intended target. Typing checks resulting value. Search checks query and result state. Financial operations require authoritative provider evidence.' },
  { id: 'permissions', title: 'Permissions & Approval', icon: Shield, status: 'implemented', category: 'core', desc: 'Risk classification, approval gates for consequential actions, operator authentication, and explicit permission enforcement.', details: 'Actions are classified by risk. High-impact actions (messages, purchases, payments, bookings, deletions) require explicit confirmation. TOM_API_TOKEN provides operator authentication. Single token is not equivalent to multi-tenant authorization.' },
  { id: 'memory', title: 'Memory & Context', icon: Database, status: 'implemented', category: 'core', desc: 'Local memory store, JSONL-based durable storage, contextual conversation handling, and replaceable storage boundary.', details: 'Memory is not uniformly encrypted. Some disk access remains synchronous. Production deployments need secure storage, retention controls, and export/delete capabilities. Workspace tools use TOM_WORKSPACE_DIR with path constraints.' },
  { id: 'local-models', title: 'Local Model Inference', icon: Cpu, status: 'requires-config', category: 'models', desc: 'OpenAI-compatible endpoint via Ollama. Qwen-family models for text reasoning, planning, and structured output.', details: 'Requires Ollama service running locally with a downloaded model. Configuration via TOM_LLM_ENABLED, TOM_LLM_BASE_URL, TOM_LLM_MODEL. Actual availability depends on hardware, installed Ollama, downloaded model, and resources.' },
  { id: 'tts', title: 'Voice Synthesis (TTS)', icon: Mic, status: 'experimental', category: 'voice', desc: 'Qwen3-TTS service adapter supporting real synthesis when dependencies, checkpoint, device, and configuration are available.', details: 'Current implementation generates complete waveform then packetizes for transport. This is buffered model inference, not guaranteed native incremental streaming. Requires TOM_QWEN3_TTS_MODEL_DIR, device configuration, and model checkpoint.' },
  { id: 'asr', title: 'Speech Recognition (ASR)', icon: Mic, status: 'experimental', category: 'voice', desc: 'Streaming ASR interfaces for voice input processing with 16 kHz PCM16 incoming audio.', details: 'ASR interfaces are defined and integrated into the voice WebSocket pipeline. Actual recognition quality depends on the configured ASR provider and model availability.' },
  { id: 'vad', title: 'Voice Activity Detection', icon: Mic, status: 'experimental', category: 'voice', desc: 'Neural VAD for detecting speech segments, turn prediction, and interruption/barge-in handling.', details: 'Neural VAD is integrated into the voice pipeline. Turn prediction and barge-in concepts are implemented but depend on real audio input for validation.' },
  { id: 'browser', title: 'Browser Automation', icon: Globe, status: 'requires-config', category: 'platforms', desc: 'Playwright adapter with navigation policy, session boundaries, captured page state, and approval gates for consequential actions.', details: 'Requires browser extra installation and Playwright Chromium. Cannot bypass CAPTCHAs, authentication, or browser security. Application-specific behavior varies.' },
  { id: 'android', title: 'Android Device Agent', icon: Smartphone, status: 'experimental', category: 'platforms', desc: 'Kotlin agent with device authentication, challenge/HMAC handshake, accessibility observations, screenshots, and post-action verification.', details: 'Supports opening apps, URLs, tapping, text entry, swiping, scrolling, navigation, Maps search, Calendar, email/SMS, calls, and UPI intents. Actual success depends on Android version, app behavior, accessibility, permissions, and connectivity.' },
  { id: 'voice-ws', title: 'Voice WebSocket', icon: Wifi, status: 'experimental', category: 'voice', desc: 'Full-duplex voice WebSocket with 16 kHz PCM16 incoming and 24 kHz PCM16 outgoing audio streams.', details: 'Supports voice sessions, voice profiles, and real-time audio transport. Connection requires proper authentication and compatible client.' },
  { id: 'events', title: 'Event Infrastructure', icon: Clock, status: 'implemented', category: 'core', desc: 'Correlated task and action events with sequence numbers, task IDs, action IDs, lifecycle tracking, and verification outcomes.', details: 'WebSocket endpoint at /v1/events/ws provides real-time event streaming. Events include task lifecycle, verification outcomes, errors, and approval boundaries.' },
  { id: 'workspace', title: 'Local Workspace Tools', icon: FileText, status: 'requires-config', category: 'tools', desc: 'Read-only filesystem listing and reading constrained by allowed paths, traversal checks, symlink restrictions, and size limits.', details: 'Enabled via TOM_WORKSPACE_DIR. Read-only confinement is not a complete OS sandbox. Path traversal is checked. Symlinks are restricted.' },
  { id: 'public-apis', title: 'Public Read-Only API Adapters', icon: Wifi, status: 'requires-config', category: 'tools', desc: 'Read-only adapters for public APIs. No write operations. Configuration required for each provider.', details: 'Available through /v1/public-apis endpoint. Each adapter requires explicit configuration. Read-only by design.' },
  { id: 'semantic-memory', title: 'Semantic Memory', icon: Brain, status: 'planned', category: 'core', desc: 'Semantic memory adapters for richer context retrieval. Replaceable storage boundary.', details: 'Adapter interface is defined. Actual semantic retrieval depends on configured embedding model and vector store.' },
  { id: 'calendar', title: 'Calendar Integration', icon: Clock, status: 'not-available', category: 'integrations', desc: 'Calendar event creation and retrieval. Currently unavailable until concrete provider adapter is configured and validated.', details: 'Android intent for Calendar exists but is not equivalent to a complete calendar integration. Provider adapter required.' },
  { id: 'payments', title: 'Payment Integration', icon: Lock, status: 'not-available', category: 'integrations', desc: 'UPI and payment verification. Unavailable until authoritative provider evidence is configured.', details: 'Android UPI intent exists but a "Payment successful" message alone is not authoritative proof. Provider/backend evidence required.' },
  { id: 'messaging', title: 'Messaging Integration', icon: FileText, status: 'not-available', category: 'integrations', desc: 'Email and SMS sending via configured providers. Android intents exist but complete integration requires provider validation.', details: 'SMS/email Android intents exist. Full integration with delivery confirmation requires provider adapter.' },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'core', label: 'Core' },
  { id: 'models', label: 'Models' },
  { id: 'voice', label: 'Voice' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'tools', label: 'Tools' },
  { id: 'integrations', label: 'Integrations' },
];

export default function CapabilitiesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = capabilities.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || c.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <PageHeader
        title="Capabilities"
        subtitle="A searchable, filterable catalogue of TOM's capabilities with honest status reporting. We distinguish implemented foundations, features requiring configuration, experimental capabilities, unavailable integrations, and planned items."
        breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }]}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <InfoBox variant="warning">
          <strong>Important:</strong> A code implementation or passing unit test is not the same as a successful real-world integration. Status labels reflect the current state honestly. "Requires Configuration" means the code exists but needs external services, hardware, or credentials to function.
        </InfoBox>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search capabilities..."
              className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-wheat-dark/40 rounded-sm text-sm font-sans text-ink placeholder:text-ink-muted focus:outline-none focus:border-ochre"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-ink-muted" />
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors ${
                  category === cat.id
                    ? 'bg-ink text-parchment border-ink'
                    : 'bg-ivory text-ink-muted border-wheat-dark/40 hover:border-ochre/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filtered.map(cap => (
            <div key={cap.id} className="paper-layer p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <cap.icon size={18} className="text-ochre-dark flex-shrink-0" />
                  <h3 className="font-sans font-semibold text-ink">{cap.title}</h3>
                </div>
                <StatusBadge status={cap.status} />
              </div>
              <p className="body-sans text-sm text-ink-light mb-2">{cap.desc}</p>
              <p className="font-sans text-xs text-ink-muted leading-relaxed">{cap.details}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-ink-muted font-sans text-sm">
              No capabilities match your search. Try different terms or clear filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

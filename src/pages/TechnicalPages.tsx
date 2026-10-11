import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, CodeBlock, InfoBox, StatusBadge, DemoLabel, ArchitectureDiagram } from '../components/Layout';
import { ArrowRight } from 'lucide-react';

// ============ AGENT RUNTIME PAGE ============
export function AgentRuntimePage() {
  return (
    <div>
      <PageHeader title="Agent Runtime" subtitle="The conceptual execution pipeline: how TOM processes a request from intake to verified result." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Agent Runtime', href: '/capabilities/runtime' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>The Execution Pipeline</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>TOM's AgentRuntime orchestrates a structured execution pipeline. Each request flows through distinct stages:</p>
        </div>
        <div className="space-y-3 mb-8">
          {[
            { step: '1', title: 'Request Intake', desc: 'Natural language request received via API, WebSocket, or voice pipeline.' },
            { step: '2', title: 'Context Handling', desc: 'Relevant memory and conversation context loaded. Available tools and permissions evaluated.' },
            { step: '3', title: 'Plan Generation', desc: 'RulePlanner generates deterministic plan, or ModelPlanner generates LLM-based plan with structured output validation.' },
            { step: '4', title: 'Policy & Permission Checks', desc: 'Each planned action checked against permission policy. Risk classification applied. Approval gates triggered for high-impact actions.' },
            { step: '5', title: 'Tool Selection & Execution', desc: 'Registered tool selected based on plan. Tool executed through appropriate adapter (local, browser, Android, API).' },
            { step: '6', title: 'Observation', desc: 'Fresh observation collected after action execution. Not the action result — the actual resulting state.' },
            { step: '7', title: 'Success Predicate Evaluation', desc: 'Action-specific predicate evaluates observation against expected outcome. Produces VERIFIED, FAILED, or UNKNOWN.' },
            { step: '8', title: 'Recovery (if supported)', desc: 'On failure, bounded recovery attempted where the action type supports it. Not all actions have recovery paths.' },
            { step: '9', title: 'Result Reporting', desc: 'Final outcome reported with verification status, evidence, and confidence level.' },
            { step: '10', title: 'Memory Update', desc: 'Successful outcomes and context stored in memory for future reference.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-3 border-l-2 border-ochre/30 bg-ochre/5">
              <span className="font-mono text-sm text-ochre-dark font-semibold mt-0.5">{item.step}</span>
              <div>
                <h4 className="font-sans font-semibold text-sm text-ink">{item.title}</h4>
                <p className="font-sans text-xs text-ink-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <InfoBox variant="info">
          <strong>Architecture note:</strong> TOM contains a core AgentRuntime, tool registry, planner/provider boundaries, approval gate, permission policy, responder, memory store, and event infrastructure. Different legacy and live-device execution paths still exist and have not been completely consolidated. Not every tool follows an identical universal autonomous loop.
        </InfoBox>

        <SectionHeading>Core Components</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            { name: 'AgentRuntime', desc: 'Main orchestration loop' },
            { name: 'ToolRegistry', desc: 'Registered tool contracts' },
            { name: 'Planner (Rule/Model)', desc: 'Plan generation strategies' },
            { name: 'ApprovalGate', desc: 'Consequential action confirmation' },
            { name: 'PermissionPolicy', desc: 'Permission enforcement rules' },
            { name: 'Responder', desc: 'Result formatting and delivery' },
            { name: 'MemoryStore', desc: 'Context and history persistence' },
            { name: 'EventBus', desc: 'Correlated task/action events' },
          ].map((comp, i) => (
            <div key={i} className="p-3 border border-wheat-dark/30 rounded-sm">
              <code className="font-mono text-xs text-ochre-dark">{comp.name}</code>
              <p className="font-sans text-xs text-ink-muted mt-1">{comp.desc}</p>
            </div>
          ))}
        </div>

        <ArchitectureDiagram />
      </div>
    </div>
  );
}

// ============ PLANNING PAGE ============
export function PlanningPage() {
  return (
    <div>
      <PageHeader title="Planning & Reasoning" subtitle="How TOM generates action plans: deterministic rules and configurable model-based reasoning." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Planning', href: '/capabilities/planning' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Two Planner Strategies</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="paper-layer p-5">
            <h3 className="font-sans font-semibold text-ink mb-2">RulePlanner</h3>
            <p className="font-sans text-sm text-ink-light mb-3">Deterministic plan generation based on predefined rules and patterns. No model inference required. Predictable, fast, and transparent.</p>
            <StatusBadge status="implemented" />
          </div>
          <div className="paper-layer p-5">
            <h3 className="font-sans font-semibold text-ink mb-2">ModelPlanner</h3>
            <p className="font-sans text-sm text-ink-light mb-3">Configurable planner using an OpenAI-compatible model provider. Generates structured plans with output validation and bounded repair.</p>
            <StatusBadge status="requires-config" />
          </div>
        </div>

        <SectionHeading subtitle="Qwen-family models via Ollama local inference">Model Configuration</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-6">
          <p>TOM's ModelPlanner communicates with an OpenAI-compatible endpoint. The repository documents Ollama's endpoint at <code className="code-mono text-ochre-dark">http://127.0.0.1:11434/v1</code> and the <code className="code-mono text-ochre-dark">qwen3:4b</code> model as a local starting point.</p>
          <p>Actual model availability depends on your machine, installed Ollama service, downloaded model, and available resources. Not every Qwen model fits every computer.</p>
        </div>

        <SectionHeading>Environment Variables</SectionHeading>
        <table className="editorial-table mb-6">
          <thead>
            <tr><th>Variable</th><th>Purpose</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">TOM_LLM_ENABLED</code></td><td>Enable model-based planning</td><td><code className="font-mono text-xs">true</code></td></tr>
            <tr><td><code className="font-mono text-xs">TOM_LLM_BASE_URL</code></td><td>OpenAI-compatible endpoint URL</td><td><code className="font-mono text-xs">http://127.0.0.1:11434/v1</code></td></tr>
            <tr><td><code className="font-mono text-xs">TOM_LLM_MODEL</code></td><td>Model tag to use</td><td><code className="font-mono text-xs">qwen3:4b</code></td></tr>
            <tr><td><code className="font-mono text-xs">TOM_LLM_API_KEY</code></td><td>API key (empty for local Ollama)</td><td><code className="font-mono text-xs">(empty)</code></td></tr>
            <tr><td><code className="font-mono text-xs">TOM_PLANNER_ALLOW_FALLBACK</code></td><td>Allow fallback to RulePlanner</td><td><code className="font-mono text-xs">true</code></td></tr>
            <tr><td><code className="font-mono text-xs">TOM_LLM_TIMEOUT_SECONDS</code></td><td>Request timeout</td><td><code className="font-mono text-xs">30</code></td></tr>
          </tbody>
        </table>

        <CodeBlock title="Example .env configuration (placeholder values)" code={`TOM_LLM_ENABLED=true
TOM_LLM_BASE_URL=http://127.0.0.1:11434/v1
TOM_LLM_MODEL=qwen3:4b
TOM_LLM_API_KEY=
TOM_PLANNER_ALLOW_FALLBACK=true
TOM_LLM_TIMEOUT_SECONDS=30`} />

        <InfoBox variant="warning">
          <strong>Important:</strong> Keep the configured model tag consistent with the installed model. Never commit credentials or .env files. The model must actually be downloaded and available in your Ollama instance.
        </InfoBox>

        <SectionHeading>Structured Output & Validation</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>ModelPlanner validates model output against expected plan structure. When output is malformed:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bounded repair attempts are made (configurable limit)</li>
            <li>If repair fails, explicit model/provider errors are raised</li>
            <li>Fallback to RulePlanner is available when <code className="code-mono text-ochre-dark">TOM_PLANNER_ALLOW_FALLBACK=true</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============ TOOLS PAGE ============
export function ToolsPage() {
  return (
    <div>
      <PageHeader title="Tool System" subtitle="Registered tools make capabilities explicit and replaceable. Each tool has a description, input schema, permissions, and risk classification." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Tools', href: '/capabilities/tools' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Registered Tool Contracts</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>Every tool in TOM is explicitly registered with:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Description:</strong> What the tool does, in natural language</li>
            <li><strong>Input Arguments:</strong> Structured schema defining required and optional parameters</li>
            <li><strong>Tool Results:</strong> Expected result format</li>
            <li><strong>Permissions:</strong> What access the tool requires</li>
            <li><strong>Risk Classification:</strong> How consequential the action is</li>
          </ul>
        </div>

        <InfoBox variant="info">
          <strong>Distinction:</strong> A registered tool is not the same as a configured, reachable, successfully tested integration. Registration means the tool contract exists in code. Actual execution depends on external services, hardware, configuration, and connectivity.
        </InfoBox>

        <SectionHeading>Tool Categories</SectionHeading>
        <div className="space-y-4 mb-8">
          {[
            { category: 'Local Document Tools', status: 'requires-config', desc: 'File reading, workspace listing. Constrained by TOM_WORKSPACE_DIR, path traversal checks, symlink restrictions, and size limits.' },
            { category: 'Public Read-Only API Adapters', status: 'requires-config', desc: 'Read-only adapters for public APIs. No write operations. Each requires explicit provider configuration.' },
            { category: 'Browser Tools', status: 'requires-config', desc: 'Navigation, interaction, and observation through Playwright. Subject to navigation policy and approval gates.' },
            { category: 'Android Tools', status: 'experimental', desc: 'Device interaction through Kotlin agent. App opening, tapping, text entry, navigation, intents. Depends on device connectivity and accessibility.' },
            { category: 'Integration Registry', status: 'implemented', desc: 'Reports actual configuration status. Does not pretend unavailable integrations exist.' },
          ].map((cat, i) => (
            <div key={i} className="p-4 border border-wheat-dark/30 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-sans font-semibold text-sm text-ink">{cat.category}</h3>
                <StatusBadge status={cat.status} />
              </div>
              <p className="font-sans text-xs text-ink-muted">{cat.desc}</p>
            </div>
          ))}
        </div>

        <InfoBox variant="warning">
          <strong>Evolving architecture:</strong> The current system has more than one tool registry and execution path. The overall architecture is still evolving toward consolidation.
        </InfoBox>
      </div>
    </div>
  );
}

// ============ VERIFICATION PAGE ============
export function VerificationPage() {
  return (
    <div>
      <PageHeader title="Verification & Recovery" subtitle="An execution acknowledgement is not task success. TOM observes, evaluates, and reports honestly." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Verification', href: '/capabilities/verification' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading subtitle="The signature feature of TOM">Verification-First Design</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>An execution acknowledgement or changed screen is <strong>not enough</strong> to declare task success. TOM's verification sequence is:</p>
          <div className="p-4 bg-ochre/5 border border-ochre/20 rounded-sm my-4">
            <p className="font-mono text-sm text-ink text-center">
              observe → plan → act → <strong>collect fresh observation</strong> → <strong>evaluate success predicate</strong> → continue / recover / stop / report uncertainty
            </p>
          </div>
          <p>Three distinct outcomes:</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 border-2 border-olive/30 bg-olive/5 rounded-sm text-center">
            <h3 className="font-sans font-bold text-olive-dark text-lg mb-1">VERIFIED</h3>
            <p className="font-sans text-xs text-ink-muted">Fresh observation confirms expected state change through action-specific predicate.</p>
          </div>
          <div className="p-4 border-2 border-rust/30 bg-rust/5 rounded-sm text-center">
            <h3 className="font-sans font-bold text-rust text-lg mb-1">FAILED</h3>
            <p className="font-sans text-xs text-ink-muted">Observation contradicts expected outcome. Action did not achieve its goal.</p>
          </div>
          <div className="p-4 border-2 border-ink-muted/30 bg-ink/5 rounded-sm text-center">
            <h3 className="font-sans font-bold text-ink-muted text-lg mb-1">UNKNOWN</h3>
            <p className="font-sans text-xs text-ink-muted">Insufficient evidence to confirm or deny. Pending, ambiguous, or unevaluable state.</p>
          </div>
        </div>

        <SectionHeading>Action-Specific Predicates</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-6">
          <p>Each action type has its own verification logic:</p>
        </div>
        <table className="editorial-table mb-8">
          <thead><tr><th>Action</th><th>Verification Method</th></tr></thead>
          <tbody>
            <tr><td>Open App</td><td>Check foreground package/activity, optionally a UI anchor</td></tr>
            <tr><td>Tap</td><td>Check intended target or post-state change</td></tr>
            <tr><td>Type Text</td><td>Check resulting input value matches expected</td></tr>
            <tr><td>Search</td><td>Check requested query, result state, optional result anchors</td></tr>
            <tr><td>Navigate</td><td>Check expected destination reached</td></tr>
            <tr><td>File Actions</td><td>Check relevant terminal filesystem state</td></tr>
            <tr><td>Send Message</td><td>Check recipient/message and sent/delivered evidence</td></tr>
            <tr><td>Make Call</td><td>Check call state and connection evidence</td></tr>
            <tr><td>Calendar Event</td><td>Check event evidence in calendar system</td></tr>
            <tr><td>Payment/UPI</td><td>Require authoritative provider or merchant/backend evidence</td></tr>
          </tbody>
        </table>

        <InfoBox variant="warning">
          <strong>Critical:</strong> A visible "Payment successful" message or screenshot alone is <strong>not</strong> authoritative proof of a completed UPI transaction. Pending, processing, ambiguous, and insufficiently evidenced payment states must remain UNKNOWN.
        </InfoBox>

        <SectionHeading>Evidence Sources</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-6">
          <p>Potential evidence sources include:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accessibility metadata and resource IDs</li>
            <li>OCR and vision-based screen interpretation</li>
            <li>System state queries (foreground app, activity, package)</li>
            <li>Provider callbacks and API responses</li>
            <li>Backend receipts and transaction confirmations</li>
          </ul>
          <p className="mt-3"><strong>No single evidence source works for every app.</strong> Verification must be action-specific and context-aware.</p>
        </div>

        <SectionHeading>Recovery</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>When verification returns FAILED, TOM may attempt bounded recovery:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Re-observe to confirm the failure is real (not a transient state)</li>
            <li>Retry the action with adjusted parameters (bounded attempts)</li>
            <li>Try an alternative approach if available</li>
            <li>Report failure with evidence if recovery is exhausted or not applicable</li>
          </ul>
          <p>Recovery is bounded — it does not retry indefinitely. Not all actions have recovery paths.</p>
        </div>

        <InfoBox variant="success">
          <strong>Design philosophy:</strong> Failure and uncertainty are valuable honest outcomes. Pretending everything succeeds erodes trust. TOM reports what it actually knows, with evidence.
        </InfoBox>
      </div>
    </div>
  );
}

// ============ MEMORY PAGE ============
export function MemoryPage() {
  return (
    <div>
      <PageHeader title="Memory & Context" subtitle="Local memory, contextual conversation handling, and durable storage with honest privacy limitations." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Memory', href: '/capabilities/memory' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Memory Architecture</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>TOM's memory system provides:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Local memory store:</strong> In-process context for the current session</li>
            <li><strong>JSONL-based durable storage:</strong> Persistent memory across sessions where configured</li>
            <li><strong>Contextual conversation handling:</strong> Maintaining relevant context across interactions</li>
            <li><strong>Semantic memory adapters:</strong> Replaceable boundary for richer retrieval (planned)</li>
            <li><strong>Replaceable storage boundary:</strong> Storage backend can be swapped</li>
          </ul>
        </div>

        <InfoBox variant="warning">
          <strong>Privacy limitations:</strong> Memory is <strong>not uniformly encrypted</strong>. Some disk access remains synchronous. Production deployments need secure storage, retention controls, export/delete capabilities, and appropriate privacy safeguards <strong>before</strong> storing sensitive data.
        </InfoBox>

        <SectionHeading>Workspace Tools</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-6">
          <p>Local workspace tools can be enabled using <code className="code-mono text-ochre-dark">TOM_WORKSPACE_DIR</code>:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Read-only filesystem listing and reading</li>
            <li>Constrained by allowed paths</li>
            <li>Traversal checks prevent directory escape</li>
            <li>Symlink restrictions prevent following links outside workspace</li>
            <li>Size limits prevent reading excessively large files</li>
          </ul>
        </div>

        <CodeBlock title="Workspace configuration" code={`# .env
TOM_WORKSPACE_DIR=/home/user/tom-workspace

# The workspace is read-only. This is NOT a complete OS sandbox.
# Path traversal is checked. Symlinks are restricted.`} />

        <InfoBox variant="info">
          TOM does not have infinite memory or perfect recall. Context windows are bounded by the configured model. Long conversations may lose earlier context. Memory persistence depends on proper configuration and storage availability.
        </InfoBox>
      </div>
    </div>
  );
}

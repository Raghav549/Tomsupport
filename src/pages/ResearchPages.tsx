import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, InfoBox, StatusBadge, CodeBlock, DemoLabel } from '../components/Layout';
import { Search, ExternalLink, BookOpen, FileText, ArrowRight } from 'lucide-react';

// ============ RESEARCH PAGE ============
const researchPapers = [
  { id: 'v-droid', title: 'V-Droid', authors: 'Research Collective', year: 2024, area: 'Mobile GUI Automation', desc: 'Video-based navigation for Android device agents using visual grounding and temporal understanding.', problem: 'Android agents need to understand dynamic screen content and navigate complex UIs reliably.', approach: 'Video-based perception combining temporal frames with accessibility tree data for robust navigation decisions.', findings: 'Visual grounding improves navigation accuracy on dynamic screens. Reference requires verification for specific benchmarks.', limitations: 'Depends on screen capture quality and accessibility service availability.', relevance: 'Informs TOM\'s perception module and Android observation strategy.', status: 'Reference requires verification' },
  { id: 'verisafe', title: 'VeriSafe Agent', authors: 'Research Collective', year: 2024, area: 'Evidence-Based Verification', desc: 'Safety verification frameworks for autonomous agent actions in real-world environments.', problem: 'Autonomous agents need verifiable safety guarantees before executing consequential actions.', approach: 'Pre-condition checking, action-specific predicates, and post-action evidence collection.', findings: 'Verification-first design reduces unintended consequences. Reference requires verification for specific metrics.', limitations: 'Verification coverage depends on available observation channels.', relevance: 'Directly informs TOM\'s verification engine and success predicate architecture.', status: 'Reference requires verification' },
  { id: 'verigui', title: 'VeriGUI', authors: 'Research Collective', year: 2024, area: 'GUI Verification', desc: 'Verification methods for graphical user interface interactions in automated systems.', problem: 'GUI automation lacks reliable verification that intended actions actually succeeded.', approach: 'Multi-modal verification combining visual, accessibility, and state-based evidence.', findings: 'Combining evidence sources improves verification reliability. Reference requires verification.', limitations: 'App-specific behavior varies widely.', relevance: 'Informs TOM\'s multi-source evidence collection for action verification.', status: 'Reference requires verification' },
  { id: 'androidworld', title: 'AndroidWorld', authors: 'Research Collective', year: 2024, area: 'Execution-Based Evaluation', desc: 'Benchmark for evaluating Android agents through real device interaction and task completion.', problem: 'Existing benchmarks evaluate language output, not actual device interaction success.', approach: 'Real-device task execution with automated verification of completion criteria.', findings: 'Execution-based evaluation reveals gaps not visible in text-only benchmarks. Reference requires verification.', limitations: 'Device-specific behavior affects reproducibility.', relevance: 'Informs TOM\'s evaluation methodology and real-device testing approach.', status: 'Reference requires verification' },
  { id: 'osworld', title: 'OSWorld', authors: 'Research Collective', year: 2024, area: 'Cross-OS Agent Evaluation', desc: 'Benchmark for evaluating AI agents across operating system environments.', problem: 'Agents need to work across different OS environments, not just single platforms.', approach: 'Multi-OS task suite with standardized evaluation criteria.', findings: 'Cross-platform evaluation reveals environment-specific challenges. Reference requires verification.', limitations: 'OS version differences affect results.', relevance: 'Informs TOM\'s platform-agnostic design principles.', status: 'Reference requires verification' },
  { id: 'qwen-ui-agent', title: 'Qwen UI-Agent', authors: 'Qwen Team', year: 2024, area: 'Vision-Language GUI Agents', desc: 'UI agent capabilities within the Qwen model family for screen understanding and interaction.', problem: 'GUI agents need strong vision-language understanding for screen interpretation.', approach: 'Integrated vision-language model trained on UI understanding tasks.', findings: 'Strong UI understanding capabilities demonstrated. Reference requires verification for specific benchmarks.', limitations: 'Model size and hardware requirements.', relevance: 'Informs TOM\'s model selection and vision-based verification.', status: 'Reference requires verification' },
  { id: 'qwen-cua', title: 'Qwen-CUA', authors: 'Qwen Team', year: 2024, area: 'Computer Use Agent', desc: 'Computer use agent capabilities for desktop and mobile interaction.', problem: 'Agents need to interact with computer interfaces as humans do.', approach: 'End-to-end model for screen understanding and action generation.', findings: 'Demonstrates computer use capabilities. Reference requires verification.', limitations: 'Action accuracy varies by task complexity.', relevance: 'Informs TOM\'s approach to grounded action generation.', status: 'Reference requires verification' },
];

export function ResearchPage() {
  const [search, setSearch] = useState('');
  const filtered = researchPapers.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.area.toLowerCase().includes(search.toLowerCase()) ||
    p.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Research Library" subtitle="AI agents, mobile GUI automation, computer use, multimodal models, tool execution, verification, recovery, local inference, memory, speech interfaces, and AI safety." breadcrumbs={[{ label: 'Research', href: '/research' }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <InfoBox variant="info">
          <strong>Verification notice:</strong> Research references are included to document the areas that inform TOM's design. Where specific claims, benchmarks, or conclusions have not been independently verified from reliable sources, they are marked "Reference requires verification." We do not invent metadata, quotations, or findings.
        </InfoBox>

        <div className="mt-8 mb-6">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search research papers..."
              className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-wheat-dark/40 rounded-sm text-sm font-sans text-ink placeholder:text-ink-muted focus:outline-none focus:border-ochre"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filtered.map(paper => (
            <article key={paper.id} className="paper-layer p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs font-mono text-ochre-dark uppercase tracking-wider">{paper.area}</span>
                  <h2 className="display-serif text-xl text-ink mt-1">{paper.title}</h2>
                  <p className="font-sans text-xs text-ink-muted mt-1">{paper.authors} · {paper.year}</p>
                </div>
                <StatusBadge status={paper.status === 'Reference requires verification' ? 'experimental' : 'implemented'} />
              </div>
              <p className="body-sans text-sm text-ink-light mb-4">{paper.desc}</p>
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <h4 className="font-semibold text-ink mb-1">Research Problem</h4>
                  <p className="text-ink-muted">{paper.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">Approach</h4>
                  <p className="text-ink-muted">{paper.approach}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">Relevance to TOM</h4>
                  <p className="text-ink-muted">{paper.relevance}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1">Limitations</h4>
                  <p className="text-ink-muted">{paper.limitations}</p>
                </div>
              </div>
              {paper.status === 'Reference requires verification' && (
                <p className="mt-3 text-xs font-mono text-rust italic">⚠ {paper.status}</p>
              )}
            </article>
          ))}
        </div>

        <SectionHeading id="methodology">Research Methodology</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>TOM's research approach focuses on:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Execution-based evaluation:</strong> Testing agents through real actions, not just text output</li>
            <li><strong>Evidence-based verification:</strong> Collecting multiple evidence sources for action outcomes</li>
            <li><strong>Stateful workflow testing:</strong> Evaluating multi-step task completion in real environments</li>
            <li><strong>Recovery analysis:</strong> Understanding how agents handle and recover from failures</li>
            <li><strong>Grounded action research:</strong> Connecting language understanding to physical/digital action</li>
          </ul>
        </div>

        <SectionHeading id="open-questions">Open Research Questions</SectionHeading>
        <div className="space-y-3 mb-8">
          {[
            'How can verification predicates be made more robust across diverse applications?',
            'What is the optimal balance between autonomous execution and user confirmation?',
            'How should agents handle ambiguous or conflicting evidence sources?',
            'What recovery strategies are most effective for different failure types?',
            'How can local models be validated for safety-critical actions?',
            'What evaluation metrics best capture real-world agent usefulness?',
            'How should agents handle tasks where success cannot be objectively verified?',
          ].map((q, i) => (
            <div key={i} className="flex items-start gap-3 p-3 border-l-2 border-ochre/30 bg-ochre/5">
              <span className="font-mono text-xs text-ochre-dark mt-0.5">Q{i + 1}</span>
              <p className="font-sans text-sm text-ink-light">{q}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ BENCHMARKS PAGE ============
export function BenchmarksPage() {
  return (
    <div>
      <PageHeader title="Benchmarks & Real Tests" subtitle="Honest reporting of test results, distinguishing unit tests from real-world validation." breadcrumbs={[{ label: 'Research', href: '/research' }, { label: 'Benchmarks', href: '/research/benchmarks' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="warning">
          <strong>Transparency:</strong> We present testing results honestly. Unit tests passing does not mean the system works end-to-end. Real inference, real device execution, and real browser automation have specific requirements that may not be met in every environment.
        </InfoBox>

        <SectionHeading>Historical Test Run — October 5, 2026</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-6">
          <p>The repository audit dated October 5, 2026 reports the following from a documented environment:</p>
        </div>

        <div className="paper-layer p-6 mb-8">
          <h3 className="font-sans font-semibold text-ink mb-4">Test Results Summary</h3>
          <table className="editorial-table">
            <thead><tr><th>Category</th><th>Result</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td>Unit Tests</td><td><span className="text-olive-dark font-semibold">276 passing</span></td><td>Core logic, tool contracts, permissions, verification predicates</td></tr>
              <tr><td>Deprecation Warning</td><td><span className="text-ochre-dark font-semibold">1 warning</span></td><td>Upstream Starlette/httpx deprecation</td></tr>
              <tr><td>Lint</td><td><span className="text-olive-dark font-semibold">Passing</span></td><td>Code style checks</td></tr>
              <tr><td>Type Check (mypy)</td><td><span className="text-olive-dark font-semibold">Passing</span></td><td>Static type analysis</td></tr>
              <tr><td>Compile Check</td><td><span className="text-olive-dark font-semibold">Passing</span></td><td>Python compilation verification</td></tr>
              <tr><td>Package Build</td><td><span className="text-olive-dark font-semibold">Passing</span></td><td>Distribution packaging</td></tr>
              <tr><td>Import Checks</td><td><span className="text-olive-dark font-semibold">Passing</span></td><td>Module import verification</td></tr>
            </tbody>
          </table>
        </div>

        <SectionHeading>What Was NOT Tested</SectionHeading>
        <div className="space-y-3 mb-8">
          {[
            { area: 'Real Ollama Inference', reason: 'No Ollama listener was available in the test environment' },
            { area: 'Real Qwen3-TTS Generation', reason: 'Missing dependencies blocked actual audio generation' },
            { area: 'Android/Device Execution', reason: 'No connected Android device available for testing' },
            { area: 'Real GUI/Browser Automation', reason: 'Browser validation not completed in test environment' },
            { area: 'Real ASR Validation', reason: 'Speech recognition not tested with actual audio input' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 border border-rust/20 bg-rust/5 rounded-sm">
              <span className="text-rust text-sm mt-0.5">✗</span>
              <div>
                <span className="font-sans font-semibold text-sm text-ink">{item.area}</span>
                <p className="font-sans text-xs text-ink-muted mt-0.5">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>

        <InfoBox variant="info">
          <strong>Context:</strong> These are historical results from a documented environment, not live current CI results. They demonstrate that the code compiles, passes linting, and core unit tests pass — but real-world integration testing requires specific hardware, services, and configuration that were not available in that environment.
        </InfoBox>

        <SectionHeading>Test Categories</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            { type: 'Unit Tests', desc: 'Individual function and class testing' },
            { type: 'Integration Tests', desc: 'Component interaction testing' },
            { type: 'Simulated Fixtures', desc: 'Mock data and simulated responses' },
            { type: 'Real Local-Model Inference', desc: 'Requires running Ollama with downloaded model' },
            { type: 'Real TTS Generation', desc: 'Requires TTS dependencies and model checkpoint' },
            { type: 'Real Android Execution', desc: 'Requires connected Android device' },
            { type: 'Browser Automation', desc: 'Requires Playwright and Chromium' },
            { type: 'Production Readiness', desc: 'Requires full deployment configuration' },
          ].map((cat, i) => (
            <div key={i} className="p-3 border border-wheat-dark/30 rounded-sm">
              <h4 className="font-sans font-semibold text-xs text-ink">{cat.type}</h4>
              <p className="font-sans text-xs text-ink-muted mt-1">{cat.desc}</p>
            </div>
          ))}
        </div>

        <SectionHeading>Running Tests</SectionHeading>
        <CodeBlock title="Basic test commands" code={`# Install development dependencies
pip install -e ".[dev]"

# Run unit tests
pytest tests/

# Run with coverage
pytest tests/ --cov=tom

# Type checking
mypy tom/

# Lint
ruff check tom/`} />

        <div className="body-sans text-ink-light space-y-3 mt-8">
          <p>We do not create fake benchmark scores, live system status indicators, user numbers, or green certification badges. When real benchmark results are available from reproducible test environments, they will be published here with full methodology and environment details.</p>
        </div>
      </div>
    </div>
  );
}

// ============ PRODUCTION READINESS PAGE ============
export function ProductionReadinessPage() {
  return (
    <div>
      <PageHeader title="Production Readiness" subtitle="Health endpoints, readiness diagnostics, and honest assessment of deployment requirements." breadcrumbs={[{ label: 'Documentation', href: '/docs' }, { label: 'Production', href: '/docs/production' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="warning">
          <strong>Critical distinction:</strong> An HTTP health response (200 OK) is <strong>not</strong> the same as full readiness. The <code className="code-mono text-ochre-dark">/ready</code> endpoint can return HTTP 200 while the readiness field remains <code className="code-mono text-ochre-dark">false</code>.
        </InfoBox>

        <SectionHeading>Health & Readiness Endpoints</SectionHeading>
        <CodeBlock title="Health check endpoints" code={`# Basic health check — is the server running?
GET /health
→ 200 OK (server is responding)

# Readiness check — is the server ready to handle requests?
GET /ready
→ 200 OK with body:
{
  "ready": true/false,
  "checks": {
    "model_configured": true/false,
    "tts_configured": true/false,
    "browser_ready": true/false,
    "device_authenticated": true/false,
    "storage_available": true/false
  }
}`} />

        <SectionHeading>Capabilities & Integrations</SectionHeading>
        <CodeBlock title="Capability reporting endpoints" code={`# What capabilities are available?
GET /v1/capabilities
→ Reports configured capabilities with honest status

# What integrations are actually connected?
GET /v1/integrations
→ Reports actual configuration, not aspirational availability`} />

        <SectionHeading>Deployment Checklist</SectionHeading>
        <div className="space-y-2 mb-8">
          {[
            { item: 'TOM_API_TOKEN configured with strong secret', critical: true },
            { item: 'HTTPS/WSS enabled for production deployment', critical: true },
            { item: 'Model provider configured and tested', critical: true },
            { item: 'TTS engine configured (if voice needed)', critical: false },
            { item: 'Browser environment set up (if browser automation needed)', critical: false },
            { item: 'Android device authenticated (if device control needed)', critical: false },
            { item: 'Persistent storage configured for memory', critical: false },
            { item: 'Single-worker constraint understood (process-local state)', critical: true },
            { item: 'Secret redaction verified in logs', critical: true },
            { item: 'Rate limiting configured', critical: false },
            { item: 'Monitoring and alerting set up', critical: false },
            { item: 'Backup and recovery procedures documented', critical: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 border border-wheat-dark/30 rounded-sm">
              <span className={`w-4 h-4 border rounded-sm flex-shrink-0 ${item.critical ? 'border-rust/50 bg-rust/10' : 'border-ochre/40'}`} />
              <span className="font-sans text-sm text-ink-light flex-1">{item.item}</span>
              {item.critical && <span className="text-xs font-mono text-rust">CRITICAL</span>}
            </div>
          ))}
        </div>

        <SectionHeading>Production Warnings</SectionHeading>
        <div className="space-y-4 mb-8">
          {[
            'Single-worker constraint: Process-local state means only one worker can serve requests. Multi-worker deployment requires external state management.',
            'Memory is not uniformly encrypted. Sensitive data storage requires additional security measures.',
            'Audit logging, secret redaction, and cross-user isolation require continued engineering.',
            'A single operator token is not equivalent to a complete multi-tenant identity and authorization system.',
            'Workspace confinement is read-only but is not a complete OS sandbox.',
          ].map((warning, i) => (
            <div key={i} className="p-3 border-l-3 border-rust/40 bg-rust/5 text-sm font-sans text-ink-light">
              {warning}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

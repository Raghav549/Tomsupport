import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, CodeBlock, InfoBox, StatusBadge, DemoLabel } from '../components/Layout';
import { BookOpen, ArrowRight, Terminal, Shield, Cpu, Mic, Smartphone, Globe, Database, Layers, Zap } from 'lucide-react';

// ============ DOCUMENTATION HUB ============
export function DocsPage() {
  const sections = [
    { title: 'Quick Start', href: '/docs/quick-start', icon: Zap, desc: 'Get TOM running in minutes' },
    { title: 'Windows Setup', href: '/docs/quick-start', icon: Terminal, desc: 'Windows-specific installation' },
    { title: 'Linux Setup', href: '/docs/quick-start', icon: Terminal, desc: 'Linux installation guide' },
    { title: 'Environment Variables', href: '/docs/configuration', icon: Layers, desc: 'Complete configuration reference' },
    { title: 'Model Setup', href: '/docs/qwen3-ollama', icon: Cpu, desc: 'Local model inference configuration' },
    { title: 'Voice/TTS Setup', href: '/docs/voice-setup', icon: Mic, desc: 'Voice pipeline configuration' },
    { title: 'Android Setup', href: '/docs/android-setup', icon: Smartphone, desc: 'Device agent build and setup' },
    { title: 'Browser Setup', href: '/docs/browser-setup', icon: Globe, desc: 'Playwright browser configuration' },
    { title: 'API Reference', href: '/docs/api-reference', icon: BookOpen, desc: 'Complete API documentation' },
    { title: 'Security Guide', href: '/docs/security', icon: Shield, desc: 'Authentication and permissions' },
    { title: 'Architecture', href: '/docs/architecture', icon: Database, desc: 'System design and components' },
    { title: 'Troubleshooting', href: '/docs/troubleshooting', icon: Zap, desc: 'Common issues and solutions' },
  ];

  return (
    <div>
      <PageHeader title="Documentation" subtitle="Complete guides for installing, configuring, and using TOM. From quick start to production deployment." breadcrumbs={[{ label: 'Documentation', href: '/docs' }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((s, i) => (
            <Link key={i} to={s.href} className="paper-layer p-5 hover:shadow-md transition-shadow group">
              <s.icon size={20} className="text-ochre-dark mb-3" />
              <h3 className="font-sans font-semibold text-sm text-ink group-hover:text-ochre-dark transition-colors">{s.title}</h3>
              <p className="font-sans text-xs text-ink-muted mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 paper-layer p-6">
          <h2 className="display-serif text-xl text-ink mb-3">Basic Development Flow</h2>
          <CodeBlock title="Python development setup" code={`# Requires Python 3.11 or newer
python --version

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# .\\venv\\Scripts\\Activate.ps1  # Windows PowerShell

# Install with development dependencies
pip install -e ".[dev]"

# Copy environment configuration
cp .env.example .env  # Linux/Mac
# Copy-Item .env.example .env  # Windows PowerShell

# Edit .env with your configuration
# (see Environment Variables reference)

# Start the server
python -m uvicorn tom.api.app:app --host 127.0.0.1 --port 8787

# Check endpoints
curl http://127.0.0.1:8787/health
curl http://127.0.0.1:8787/ready
curl http://127.0.0.1:8787/v1/capabilities
curl http://127.0.0.1:8787/v1/integrations`} />
        </div>
      </div>
    </div>
  );
}

// ============ API REFERENCE PAGE ============
export function ApiReferencePage() {
  return (
    <div>
      <PageHeader title="API Reference" subtitle="Documented API surface. Verify current schemas and authentication rules against implementation." breadcrumbs={[{ label: 'Documentation', href: '/docs' }, { label: 'API Reference', href: '/docs/api-reference' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="info">
          <strong>Note:</strong> This documents the API surface as described in the project. Always verify current schemas and authentication rules against the actual implementation. Operator endpoints may require <code className="code-mono text-ochre-dark">Authorization: Bearer &lt;token&gt;</code>.
        </InfoBox>

        <SectionHeading>Health & Readiness</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/health</code></td><td>Basic server health check</td></tr>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/ready</code></td><td>Readiness diagnostic (may return 200 with ready=false)</td></tr>
          </tbody>
        </table>

        <SectionHeading>Agent Operations</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">POST</code></td><td><code className="font-mono text-xs">/v1/agent</code></td><td>Submit a task to the agent</td></tr>
            <tr><td><code className="font-mono text-xs">POST</code></td><td><code className="font-mono text-xs">/v1/agent/approve</code></td><td>Approve a pending consequential action</td></tr>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/v1/agent/:id/pending</code></td><td>Get pending approvals for a task</td></tr>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/v1/tasks/:id</code></td><td>Get task status and results</td></tr>
          </tbody>
        </table>

        <CodeBlock title="Example: Submit a task" code={`POST /v1/agent
Authorization: Bearer <your-tom-api-token>
Content-Type: application/json

{
  "request": "Open the browser and search for TOM agent",
  "context": {}
}

# Response:
{
  "task_id": "task_abc123",
  "status": "planning",
  "plan": [...]
}`} />

        <SectionHeading>Configuration & Capabilities</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">GET/POST</code></td><td><code className="font-mono text-xs">/v1/profile</code></td><td>Get/update user profile</td></tr>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/v1/capabilities</code></td><td>List configured capabilities</td></tr>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/v1/integrations</code></td><td>List configured integrations</td></tr>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/v1/public-apis</code></td><td>List available public API adapters</td></tr>
          </tbody>
        </table>

        <SectionHeading>Credentials</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/v1/credentials</code></td><td>List stored credentials (metadata only)</td></tr>
            <tr><td><code className="font-mono text-xs">POST</code></td><td><code className="font-mono text-xs">/v1/credentials</code></td><td>Store a credential</td></tr>
            <tr><td><code className="font-mono text-xs">DELETE</code></td><td><code className="font-mono text-xs">/v1/credentials</code></td><td>Remove a stored credential</td></tr>
          </tbody>
        </table>

        <SectionHeading>WebSockets</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Endpoint</th><th>Purpose</th><th>Auth</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">/v1/events/ws</code></td><td>Real-time task and action events</td><td>Operator bearer token</td></tr>
            <tr><td><code className="font-mono text-xs">/v1/voice/ws</code></td><td>Full-duplex voice audio</td><td>Operator bearer token</td></tr>
          </tbody>
        </table>

        <SectionHeading>Android Device Bridge</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">GET</code></td><td><code className="font-mono text-xs">/v1/device/live</code></td><td>Device connection status</td></tr>
            <tr><td><code className="font-mono text-xs">WS</code></td><td><code className="font-mono text-xs">/ws</code></td><td>Device bridge WebSocket</td></tr>
          </tbody>
        </table>
        <InfoBox variant="info">Device bridge authentication uses challenge/HMAC handshake, different from operator bearer token authentication.</InfoBox>

        <SectionHeading>Voice & TTS</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">Various</code></td><td><code className="font-mono text-xs">/v1/tts/qwen3/*</code></td><td>Qwen3-TTS synthesis routes</td></tr>
            <tr><td><code className="font-mono text-xs">Various</code></td><td>Voice synthesis routes</td><td>TTS engine operations</td></tr>
          </tbody>
        </table>

        <SectionHeading>Google OAuth</SectionHeading>
        <div className="body-sans text-sm text-ink-light mb-8">
          <p>Google OAuth integration routes are available for configured OAuth flows. These require proper OAuth client configuration and callback URL setup.</p>
        </div>
      </div>
    </div>
  );
}

// ============ ROADMAP PAGE ============
export function RoadmapPage() {
  const roadmapItems = [
    { category: 'Core Reliability', items: ['Consolidate execution paths into unified agent loop', 'Improve error handling and recovery across all tool types', 'Add comprehensive integration tests for core flows'] },
    { category: 'Real Local Model Validation', items: ['Complete real Qwen inference tests on supported hardware', 'Validate structured output across model versions', 'Document hardware requirements for different model sizes'] },
    { category: 'Voice Quality & Latency', items: ['Validate actual TTS audio output end-to-end', 'Measure and optimize voice pipeline latency', 'Test interruption and barge-in handling'] },
    { category: 'Android End-to-End Testing', items: ['Test connected Android device with real tasks', 'Verify post-action predicates on real apps', 'Document device compatibility matrix'] },
    { category: 'Browser Reliability', items: ['Improve navigation policy and session management', 'Test across different websites and web apps', 'Enhance page state capture and verification'] },
    { category: 'Research & Benchmarks', items: ['Publish reproducible research benchmarks', 'Complete execution-based evaluation suite', 'Document methodology and environment requirements'] },
    { category: 'Privacy & Memory', items: ['Add encrypted storage option for sensitive data', 'Implement retention and export/delete controls', 'Improve secret redaction in logs'] },
    { category: 'Community Infrastructure', items: ['Set up discussion forums and issue templates', 'Create contribution guidelines and onboarding', 'Establish release process and changelog'] },
    { category: 'Integrations', items: ['Configure and validate calendar provider adapter', 'Add payment verification with authoritative evidence', 'Implement messaging delivery confirmation'] },
    { category: 'Developer Experience', items: ['Improve error messages and debugging output', 'Add more code examples and tutorials', 'Create IDE integration guides'] },
    { category: 'Production Hardening', items: ['Add deployment-safe persistent state', 'Implement multi-worker support', 'Complete security audit and hardening'] },
  ];

  return (
    <div>
      <PageHeader title="Roadmap" subtitle="Planned improvements organized by area. These are roadmap items unless already proven implemented." breadcrumbs={[{ label: 'Roadmap', href: '/roadmap' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="info">
          <strong>Transparency:</strong> These are planned items, not promises. Priorities may shift based on community feedback, available resources, and discovered challenges. Items are marked as roadmap goals unless already proven implemented.
        </InfoBox>

        <div className="space-y-8 mt-8">
          {roadmapItems.map((section, i) => (
            <div key={i} className="paper-layer p-5">
              <h3 className="font-sans font-semibold text-ink mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-ochre rounded-full" />
                {section.category}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm font-sans text-ink-light">
                    <span className="w-4 h-4 border border-ochre/30 rounded-sm flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

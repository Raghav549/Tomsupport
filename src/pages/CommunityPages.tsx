import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, InfoBox, CodeBlock, DemoLabel, StatusBadge } from '../components/Layout';
import { Users, Heart, MessageSquare, Bug, Lightbulb, BookOpen, GitBranch, ExternalLink, Github, Mail, Shield, ArrowRight } from 'lucide-react';

// ============ COMMUNITY PAGE ============
export function CommunityPage() {
  return (
    <div>
      <PageHeader title="Community" subtitle="Project discussions, questions, setup help, research conversations, feature requests, and contribution opportunities." breadcrumbs={[{ label: 'Community', href: '/community' }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <InfoBox variant="info">
          <strong>Community status:</strong> TOM's community infrastructure is being set up. Discussion forums, issue templates, and contribution workflows are being established. For now, the GitHub repository is the primary community hub.
        </InfoBox>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {[
            { icon: MessageSquare, title: 'General Discussion', desc: 'Project announcements and general conversations about TOM', status: 'Coming soon' },
            { icon: Lightbulb, title: 'Questions & Setup Help', desc: 'Get help with installation, configuration, and usage', status: 'Use GitHub Discussions' },
            { icon: BookOpen, title: 'AI Research', desc: 'Discuss research papers, model experiments, and agent architectures', status: 'Coming soon' },
            { icon: Bug, title: 'Bug Reports', desc: 'Report issues with clear reproduction steps', status: 'Use GitHub Issues' },
            { icon: GitBranch, title: 'Feature Requests', desc: 'Suggest new capabilities and improvements', status: 'Use GitHub Issues' },
            { icon: Heart, title: 'Showcase', desc: 'Share projects built with or inspired by TOM', status: 'Coming soon' },
          ].map((cat, i) => (
            <div key={i} className="paper-layer p-5">
              <cat.icon size={20} className="text-ochre-dark mb-3" />
              <h3 className="font-sans font-semibold text-sm text-ink mb-1">{cat.title}</h3>
              <p className="font-sans text-xs text-ink-muted mb-3">{cat.desc}</p>
              <span className="text-xs font-mono text-ink-muted">{cat.status}</span>
            </div>
          ))}
        </div>

        <SectionHeading>Community Guidelines</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <ul className="list-disc pl-5 space-y-2">
            <li>Be respectful and constructive in all interactions</li>
            <li>Search existing issues and discussions before creating new ones</li>
            <li>Provide clear reproduction steps for bug reports</li>
            <li>Share your environment details (OS, Python version, hardware) when asking for help</li>
            <li>Label research references clearly — distinguish verified facts from hypotheses</li>
            <li>Respect privacy — do not share credentials, personal data, or sensitive configurations</li>
            <li>Report security vulnerabilities privately (see Security page)</li>
          </ul>
        </div>

        <div className="paper-layer p-6 text-center">
          <Github size={32} className="text-ink mx-auto mb-3" />
          <h3 className="display-serif text-xl text-ink mb-2">Join on GitHub</h3>
          <p className="body-sans text-sm text-ink-muted mb-4">The GitHub repository is the primary hub for issues, pull requests, and discussions.</p>
          <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-parchment text-sm font-sans font-medium rounded-sm hover:bg-ink-light transition-colors">
            View Repository <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ============ CONTRIBUTE PAGE ============
export function ContributePage() {
  return (
    <div>
      <PageHeader title="Contribute to TOM" subtitle="How to contribute code, research, documentation, testing, and more to the TOM project." breadcrumbs={[{ label: 'Community', href: '/community' }, { label: 'Contribute', href: '/contribute' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Ways to Contribute</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { title: 'Code', desc: 'Fix bugs, add features, improve performance, write tests' },
            { title: 'Research', desc: 'Contribute research notes, evaluation methods, benchmark designs' },
            { title: 'Documentation', desc: 'Improve guides, add examples, fix errors, translate' },
            { title: 'Testing', desc: 'Test on different hardware, report compatibility, validate integrations' },
            { title: 'Model Reports', desc: 'Report model compatibility, performance, and quality observations' },
            { title: 'Bug Reports', desc: 'Report issues with clear reproduction steps and environment details' },
            { title: 'Security', desc: 'Report vulnerabilities privately through security disclosure process' },
            { title: 'Community', desc: 'Help others, answer questions, share knowledge' },
          ].map((item, i) => (
            <div key={i} className="p-4 border border-wheat-dark/30 rounded-sm">
              <h3 className="font-sans font-semibold text-sm text-ink mb-1">{item.title}</h3>
              <p className="font-sans text-xs text-ink-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <SectionHeading>Contribution Workflow</SectionHeading>
        <CodeBlock title="Standard Git workflow" code={`# 1. Fork the repository on GitHub
# https://github.com/Raghav509/TOM

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/TOM.git
cd TOM

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes
# ... edit code, add tests, update docs ...

# 5. Run tests
pip install -e ".[dev]"
pytest tests/
mypy tom/
ruff check tom/

# 6. Commit with clear messages
git add .
git commit -m "Add feature: clear description of changes"

# 7. Push to your fork
git push origin feature/your-feature-name

# 8. Open a Pull Request on GitHub`} />

        <SectionHeading>Code Style & Standards</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <ul className="list-disc pl-5 space-y-2">
            <li>Follow existing code style (enforced by ruff)</li>
            <li>Add type hints (checked by mypy)</li>
            <li>Write tests for new functionality</li>
            <li>Update documentation for API changes</li>
            <li>Keep pull requests focused on a single concern</li>
            <li>Write clear commit messages explaining what and why</li>
            <li>Do not commit .env files, credentials, or secrets</li>
          </ul>
        </div>

        <InfoBox variant="info">
          <strong>Note:</strong> We do not invent maintainer or contributor identities. All contributors are credited through their GitHub profiles and commit history.
        </InfoBox>

        <div className="paper-layer p-6 text-center mt-8">
          <h3 className="display-serif text-xl text-ink mb-2">Ready to Contribute?</h3>
          <p className="body-sans text-sm text-ink-muted mb-4">Start by exploring open issues or proposing improvements.</p>
          <a href="https://github.com/Raghav509/TOM/issues" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-parchment text-sm font-sans font-medium rounded-sm hover:bg-ink-light transition-colors">
            View Open Issues <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ============ SUPPORT / DONATION PAGE ============
export function SupportPage() {
  return (
    <div>
      <PageHeader title="Support TOM" subtitle="Transparent donation and sponsorship information. How contributions support development, testing, research, and infrastructure." breadcrumbs={[{ label: 'Support', href: '/support' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="warning">
          <strong>Transparency notice:</strong> Donation infrastructure is not yet configured. The information below describes intended use of funds and suggested support levels. No payment processing, donation totals, sponsor names, or financial records are displayed until real records exist. All payment flows must use a verified provider with server-side confirmation.
        </InfoBox>

        <SectionHeading>How Donations Support TOM</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>Contributions may support:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Testing hardware:</strong> Android devices, GPUs for local inference testing</li>
            <li><strong>Model inference resources:</strong> Cloud compute for benchmark runs</li>
            <li><strong>Documentation:</strong> Technical writing, diagrams, tutorials</li>
            <li><strong>Research:</strong> Time for experimentation, evaluation, and publication</li>
            <li><strong>Hosting:</strong> Website, documentation site, community infrastructure</li>
            <li><strong>Security:</strong> Audits, penetration testing, hardening</li>
          </ul>
        </div>

        <SectionHeading>Suggested Support Levels</SectionHeading>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { amount: '₹100–250', label: 'Supporter', desc: 'Help cover basic hosting and documentation costs' },
            { amount: '₹500–1,000', label: 'Contributor', desc: 'Support testing hardware and model inference resources' },
            { amount: '₹2,500+', label: 'Sponsor', desc: 'Fund research, security audits, and major development efforts' },
          ].map((tier, i) => (
            <div key={i} className="paper-layer p-5 text-center">
              <p className="display-serif text-2xl text-ochre-dark mb-1">{tier.amount}</p>
              <p className="font-sans font-semibold text-sm text-ink mb-2">{tier.label}</p>
              <p className="font-sans text-xs text-ink-muted">{tier.desc}</p>
            </div>
          ))}
        </div>

        <InfoBox variant="info">
          <strong>Payment status:</strong> Payment links, sponsorship platforms, and recurring support options are not yet configured. When available, they will use verified payment providers. Card details are never stored in frontend code. Secret keys are never exposed in client bundles.
        </InfoBox>

        <SectionHeading>Funding Transparency</SectionHeading>
        <div className="paper-layer p-6 mb-8">
          <div className="text-center py-8">
            <p className="font-mono text-sm text-ink-muted mb-2">Funding data not yet configured</p>
            <p className="font-sans text-xs text-ink-muted">When real funding records exist, this section will display:</p>
            <ul className="mt-4 text-left max-w-md mx-auto space-y-1 text-xs font-sans text-ink-muted">
              <li>• Current funding goal</li>
              <li>• Amount raised (with verification)</li>
              <li>• Expenses and allocation</li>
              <li>• Receipts and reporting period</li>
              <li>• Sponsor acknowledgements (with consent)</li>
            </ul>
          </div>
        </div>

        <div className="body-sans text-ink-light space-y-3">
          <p>We do not invent bank details, UPI IDs, QR codes, tax-deductibility claims, financial records, sponsor names, donation totals, or successful payment receipts. All financial information will be accurate and verifiable when available.</p>
        </div>
      </div>
    </div>
  );
}

// ============ FAQ PAGE ============
export function FAQPage() {
  const faqs = [
    { q: 'What is TOM?', a: 'TOM (Task-Oriented Multimodal) is an open-source personal AI agent runtime. It combines AI planning, registered tools, contextual memory, browser and Android bridges, voice interfaces, permissions, and action-specific verification.' },
    { q: 'How is TOM different from a chatbot?', a: 'A chatbot generates text. TOM acts in the real world — it plans tasks, executes them through registered tools, observes what actually happened, and verifies whether actions succeeded. It does not just claim success; it checks.' },
    { q: 'How does the agent loop work?', a: 'Request → Context → Plan → Permission check → Tool execution → Fresh observation → Success predicate evaluation → Result (VERIFIED/FAILED/UNKNOWN) → Memory update.' },
    { q: 'What does "local inference" mean?', a: 'Running AI models on your own machine instead of sending data to cloud APIs. TOM supports local inference through Ollama with OpenAI-compatible endpoints. Your data stays on your machine.' },
    { q: 'Does TOM support Qwen models?', a: 'TOM communicates through OpenAI-compatible endpoints. The repository documents Qwen-family models via Ollama as a starting point. Actual support depends on your hardware, installed Ollama, and downloaded model.' },
    { q: 'How does Android control work?', a: 'A Kotlin device agent runs on your Android device and communicates with TOM through an authenticated WebSocket bridge. It uses accessibility services for observations and can perform actions like opening apps, tapping, typing, and navigation.' },
    { q: 'What does "verification" mean?', a: 'After executing an action, TOM collects a fresh observation and evaluates an action-specific success predicate. It reports VERIFIED (confirmed success), FAILED (confirmed failure), or UNKNOWN (insufficient evidence). It does not pretend everything succeeds.' },
    { q: 'How is voice/TTS configured?', a: 'Voice uses a full-duplex WebSocket with streaming ASR, neural VAD, and TTS. Qwen3-TTS is supported when dependencies, model checkpoint, and device are available. Configuration is through environment variables.' },
    { q: 'Which integrations are real?', a: 'The integration registry reports actual configuration. Core runtime, tool system, permissions, and verification are implemented. Local model inference, browser automation, and voice require configuration. Calendar, payments, and messaging integrations are not yet available.' },
    { q: 'Can TOM perform UPI payments?', a: 'TOM has Android intents for UPI but a "Payment successful" message is not authoritative proof. Real payment verification requires provider/backend evidence. TOM does not fabricate payment completion.' },
    { q: 'What hardware do I need?', a: 'Requirements vary by model. Local inference needs sufficient RAM/VRAM for your chosen model. Browser automation needs Playwright and Chromium. Android control needs a connected device. There are no universal minimums — check your hardware against your chosen model.' },
    { q: 'How do I run tests?', a: 'Install with pip install -e ".[dev]", then run pytest tests/. See the Benchmarks page for what was and was not tested in the documented environment.' },
    { q: 'How can I contribute?', a: 'Code, research, documentation, testing, bug reports, model compatibility reports — see the Contribute page for the contribution workflow.' },
    { q: 'How are donations handled?', a: 'Donation infrastructure is not yet configured. When available, payments will use verified providers with server-side confirmation. No card details in frontend code. Transparent reporting when real records exist.' },
    { q: 'What is not yet production-ready?', a: 'Multi-tenant auth, encrypted storage, comprehensive benchmarks, many integrations, and hardened deployment. See the Production Readiness page for details.' },
  ];

  return (
    <div>
      <PageHeader title="Frequently Asked Questions" subtitle="Common questions about TOM, its capabilities, configuration, and limitations." breadcrumbs={[{ label: 'FAQ', href: '/faq' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="paper-layer p-5">
              <h3 className="font-sans font-semibold text-ink mb-2">{faq.q}</h3>
              <p className="body-sans text-sm text-ink-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ CONTACT PAGE ============
export function ContactPage() {
  return (
    <div>
      <PageHeader title="Contact" subtitle="Secure contact, security disclosures, collaboration enquiries, and project links." breadcrumbs={[{ label: 'Contact', href: '/contact' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Project Links</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="paper-layer p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <Github size={20} className="text-ink" />
            <div>
              <p className="font-sans font-semibold text-sm text-ink">GitHub Repository</p>
              <p className="font-sans text-xs text-ink-muted">github.com/Raghav509/TOM</p>
            </div>
          </a>
          <a href="https://github.com/Raghav509/TOM/issues" target="_blank" rel="noopener noreferrer" className="paper-layer p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
            <Bug size={20} className="text-rust" />
            <div>
              <p className="font-sans font-semibold text-sm text-ink">Report Issues</p>
              <p className="font-sans text-xs text-ink-muted">GitHub Issues</p>
            </div>
          </a>
        </div>

        <SectionHeading>Security Disclosures</SectionHeading>
        <InfoBox variant="warning">
          <strong>Security vulnerabilities:</strong> Please report security vulnerabilities privately. Do not open public issues for security problems. Contact information for security disclosures will be provided when configured.
        </InfoBox>

        <SectionHeading>Collaboration & Research</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>For research collaboration, sponsorship enquiries, or other project-related communication, please use the GitHub repository's discussion features or issue tracker.</p>
          <p>Maintainer contact information will be displayed here only when supplied by the project owner.</p>
        </div>

        <InfoBox variant="info">
          Contact forms with backend validation, spam protection, and secure submission are planned but not yet implemented. Current contact is through GitHub.
        </InfoBox>
      </div>
    </div>
  );
}

// ============ SECURITY PAGE ============
export function SecurityPage() {
  return (
    <div>
      <PageHeader title="Security & Privacy" subtitle="Permission enforcement, authentication, credential handling, and privacy boundaries." breadcrumbs={[{ label: 'Security', href: '/security' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Permission Enforcement</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>TOM enforces permissions at multiple levels:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Tool-level permissions:</strong> Each tool declares required permissions</li>
            <li><strong>Risk classification:</strong> Actions classified by consequence level</li>
            <li><strong>Approval gates:</strong> High-impact actions require explicit user confirmation</li>
            <li><strong>Operator authentication:</strong> API access requires bearer token</li>
          </ul>
        </div>

        <SectionHeading>API Authentication</SectionHeading>
        <CodeBlock title="Bearer token authentication" code={`# Generate a strong secret locally
# Linux/Mac:
openssl rand -hex 32

# Windows PowerShell:
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})

# Set in .env (never commit this file):
TOM_API_TOKEN=your-strong-secret-here

# Use in API requests:
curl -H "Authorization: Bearer your-strong-secret-here" \\
  http://127.0.0.1:8787/v1/capabilities`} />

        <InfoBox variant="warning">
          <strong>Critical:</strong> TOM_API_TOKEN should be a strong secret generated locally. It must <strong>never</strong> be published, committed to version control, or shared. A single operator token is <strong>not</strong> equivalent to a complete multi-tenant identity and authorization system.
        </InfoBox>

        <SectionHeading>High-Impact Actions</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>Actions requiring explicit confirmation according to policy:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sending messages (email, SMS)</li>
            <li>Purchases and payments</li>
            <li>Bookings and reservations</li>
            <li>Deleting data or files</li>
            <li>Account changes (password, email, settings)</li>
            <li>Navigation to sensitive domains</li>
          </ul>
        </div>

        <SectionHeading>Android Device Authentication</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>The Android device bridge uses challenge/HMAC handshake authentication, separate from operator bearer tokens. Device identity is verified through cryptographic challenge-response.</p>
        </div>

        <SectionHeading>Privacy Boundaries</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Local-first:</strong> Data stays on your machine unless you configure external services</li>
            <li><strong>Secret redaction:</strong> Goals to redact secrets from logs (continuing engineering)</li>
            <li><strong>Workspace confinement:</strong> Read-only filesystem access constrained by allowed paths (not a complete OS sandbox)</li>
            <li><strong>Memory encryption:</strong> Not uniformly encrypted — production needs additional safeguards</li>
          </ul>
        </div>

        <InfoBox variant="warning">
          <strong>Ongoing work:</strong> Audit logging, secret redaction, cross-user isolation, and deployment hardening require continued engineering. The current system is designed for single-user local deployment, not multi-tenant production.
        </InfoBox>
      </div>
    </div>
  );
}

// ============ INTEGRATIONS PAGE ============
export function IntegrationsPage() {
  return (
    <div>
      <PageHeader title="Integrations" subtitle="Catalogue of local and external integrations with honest status reporting." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Integrations', href: '/capabilities/integrations' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="info">
          <strong>Honest reporting:</strong> The integration registry reports actual configuration status. It does not pretend unavailable integrations exist. An Android intent is not equivalent to a completed integration.
        </InfoBox>

        <SectionHeading>Available Integrations</SectionHeading>
        <div className="space-y-4 mb-8">
          {[
            { name: 'Local Ollama / Qwen Inference', status: 'requires-config', desc: 'OpenAI-compatible local model endpoint via Ollama' },
            { name: 'Qwen3-TTS', status: 'experimental', desc: 'Text-to-speech synthesis (requires dependencies and model)' },
            { name: 'Browser / Playwright', status: 'requires-config', desc: 'Browser automation with Chromium' },
            { name: 'Android Device Agent', status: 'experimental', desc: 'Kotlin device agent with accessibility and verification' },
            { name: 'Voice / ASR', status: 'experimental', desc: 'Speech recognition interfaces' },
            { name: 'Neural VAD', status: 'experimental', desc: 'Voice activity detection' },
            { name: 'Semantic Memory', status: 'planned', desc: 'Semantic memory adapters (interface defined)' },
            { name: 'Google OAuth', status: 'requires-config', desc: 'OAuth integration paths (requires configuration)' },
            { name: 'Public Read-Only APIs', status: 'requires-config', desc: 'Read-only adapters for public APIs' },
          ].map((int, i) => (
            <div key={i} className="p-4 border border-wheat-dark/30 rounded-sm flex items-start justify-between gap-4">
              <div>
                <h3 className="font-sans font-semibold text-sm text-ink">{int.name}</h3>
                <p className="font-sans text-xs text-ink-muted mt-1">{int.desc}</p>
              </div>
              <StatusBadge status={int.status} />
            </div>
          ))}
        </div>

        <SectionHeading>Unavailable Integrations</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-6">
          <p>The following remain <strong>unavailable</strong> until concrete provider adapters are configured and validated:</p>
        </div>
        <div className="space-y-2 mb-8">
          {[
            'Calendar (complete integration — Android intent exists but is not equivalent)',
            'Email sending (complete integration — Android intent exists but delivery confirmation required)',
            'Messaging (complete integration — delivery confirmation required)',
            'Payments / UPI (authoritative provider evidence required — screenshot is not proof)',
            'Flights, Finance, Transport, Maps, Places, News',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 text-sm font-sans text-ink-muted">
              <span className="text-rust">✗</span>
              {item}
            </div>
          ))}
        </div>

        <InfoBox variant="warning">
          <strong>Important:</strong> Never present an Android intent as a completed payment integration. UPI and payment operations require authoritative provider or merchant/backend evidence, not just an intent launch or success message.
        </InfoBox>
      </div>
    </div>
  );
}

// ============ GITHUB PAGE ============
export function GitHubPage() {
  return (
    <div>
      <PageHeader title="GitHub Repository" subtitle="Source code, issues, pull requests, and project structure." breadcrumbs={[{ label: 'GitHub', href: '/github' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="paper-layer p-6 mb-8 text-center">
          <Github size={40} className="text-ink mx-auto mb-3" />
          <h2 className="display-serif text-2xl text-ink mb-2">Raghav509/TOM</h2>
          <p className="body-sans text-sm text-ink-muted mb-4">Task-Oriented Multimodal Agent Runtime · Apache-2.0</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-parchment text-sm font-sans font-medium rounded-sm hover:bg-ink-light transition-colors">
              View Repository <ExternalLink size={14} />
            </a>
            <a href="https://github.com/Raghav509/TOM/issues" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 text-ink text-sm font-sans font-medium rounded-sm hover:bg-wheat/30 transition-colors">
              Issues
            </a>
            <a href="https://github.com/Raghav509/TOM/pulls" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-ink/20 text-ink text-sm font-sans font-medium rounded-sm hover:bg-wheat/30 transition-colors">
              Pull Requests
            </a>
          </div>
        </div>

        <SectionHeading>Clone & Install</SectionHeading>
        <CodeBlock title="Clone the repository" code={`git clone https://github.com/Raghav509/TOM.git
cd TOM

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# .\\venv\\Scripts\\Activate.ps1  # Windows

# Install with development dependencies
pip install -e ".[dev]"

# Copy environment configuration
cp .env.example .env
# Edit .env with your settings`} />

        <SectionHeading>Project Structure</SectionHeading>
        <InfoBox variant="info">
          This is an architectural overview. File behavior may vary — verify against the actual implementation.
        </InfoBox>
        <div className="code-block mt-4">
          <pre className="text-xs leading-relaxed">{`TOM/
├── tom/                      # Core Python package
│   ├── runtime.py            # AgentRuntime: planning, policy, execution, verification, memory
│   ├── planner.py            # RulePlanner and ModelPlanner interfaces
│   ├── providers.py          # Model provider adapters
│   ├── memory.py             # Local memory boundary
│   ├── tools.py              # Tool contracts and registration
│   ├── permissions.py        # Permission enforcement
│   ├── production.py         # Readiness reporting
│   ├── integration_registry.py  # Reports configured integrations
│   ├── public_api_tools.py   # Public read-only API adapters
│   ├── api/
│   │   ├── app.py            # FastAPI application
│   │   ├── bridge_server.py  # Authenticated Android bridge
│   │   └── voice_ws.py       # Voice WebSocket transport
│   ├── browser/              # Browser safety and session boundaries
│   ├── voice/                # ASR, VAD, turn prediction, TTS contracts
│   ├── perception/           # Screenshot/UI-tree fusion, multimodal verification
│   └── security/             # Privacy and security boundaries
├── android/                  # Kotlin device agent
├── frontend/                 # Live-activity web view
├── docs/                     # Documentation
├── deploy/                   # Deployment configurations
├── scripts/                  # Utility scripts
└── tests/                    # Test suite`}</pre>
        </div>

        <SectionHeading>License</SectionHeading>
        <div className="body-sans text-ink-light">
          <p>TOM is licensed under the <strong>Apache License 2.0</strong>. See the repository for the full license text.</p>
        </div>
      </div>
    </div>
  );
}

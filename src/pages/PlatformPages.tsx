import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, CodeBlock, InfoBox, StatusBadge } from '../components/Layout';

// ============ VOICE PAGE ============
export function VoicePage() {
  return (
    <div>
      <PageHeader title="Voice & Speech" subtitle="Full-duplex voice infrastructure: WebSocket transport, streaming ASR, neural VAD, turn prediction, and TTS synthesis." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Voice', href: '/capabilities/voice' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Voice Infrastructure</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>TOM's voice system provides a full-duplex voice pipeline through WebSocket transport:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>16 kHz PCM16</strong> incoming audio from client</li>
            <li><strong>24 kHz PCM16</strong> outgoing audio to client</li>
            <li><strong>Streaming ASR interfaces</strong> for real-time speech recognition</li>
            <li><strong>Neural VAD</strong> for voice activity detection</li>
            <li><strong>Turn prediction</strong> for natural conversation flow</li>
            <li><strong>Interruption/barge-in</strong> handling</li>
            <li><strong>Voice sessions</strong> and <strong>voice profiles</strong></li>
          </ul>
        </div>

        <SectionHeading>Qwen3-TTS Integration</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-6">
          <p>The Qwen3-TTS service adapter supports real synthesis when its dependencies, checkpoint, device, and configuration are available.</p>
        </div>

        <InfoBox variant="warning">
          <strong>Important distinction:</strong> The current local Qwen3-TTS implementation generates a <strong>complete waveform</strong> and then packetizes it for transport. This is <strong>buffered model inference</strong>, not guaranteed native incremental speech generation. True low-latency streaming TTS requires a different architecture.
        </InfoBox>

        <SectionHeading>Configuration</SectionHeading>
        <table className="editorial-table mb-6">
          <thead><tr><th>Variable</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code className="font-mono text-xs">TOM_TTS_ENGINE</code></td><td>TTS engine selection</td></tr>
            <tr><td><code className="font-mono text-xs">TOM_QWEN3_TTS_STREAM_URL</code></td><td>Remote Qwen3-TTS endpoint URL</td></tr>
            <tr><td><code className="font-mono text-xs">TOM_QWEN3_TTS_MODEL_DIR</code></td><td>Local model directory path</td></tr>
            <tr><td><code className="font-mono text-xs">TOM_QWEN3_TTS_DEVICE</code></td><td>Compute device (cpu/cuda)</td></tr>
            <tr><td><code className="font-mono text-xs">TOM_QWEN3_TTS_AUTH_TOKEN</code></td><td>Authentication token for remote endpoint</td></tr>
          </tbody>
        </table>

        <CodeBlock title="TTS configuration examples (placeholder values)" code={`# Remote endpoint mode
TOM_TTS_ENGINE=qwen3-tts
TOM_QWEN3_TTS_STREAM_URL=https://your-tts-endpoint.example.com/v1/tts
TOM_QWEN3_TTS_AUTH_TOKEN=your-secure-token-here

# Local model mode
TOM_TTS_ENGINE=qwen3-tts-local
TOM_QWEN3_TTS_MODEL_DIR=/path/to/qwen3-tts-checkpoint
TOM_QWEN3_TTS_DEVICE=cuda  # or cpu`} />

        <SectionHeading>Language Support</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>The production documentation describes an <strong>English-only production router</strong>. Hindi/Hinglish availability must not be assumed without a validated provider. Do not rely on Hindi or Hinglish voice as production-ready without actual validation.</p>
        </div>

        <InfoBox variant="info">
          <strong>Troubleshooting:</strong> Common issues include missing dependencies, unavailable model checkpoints, incorrect device configuration, connection timeouts to remote endpoints, and insufficient VRAM for local inference. Check that the model is fully downloaded and the device has adequate resources.
        </InfoBox>
      </div>
    </div>
  );
}

// ============ ANDROID PAGE ============
export function AndroidPage() {
  return (
    <div>
      <PageHeader title="Android Device Agent" subtitle="Kotlin device agent with authentication, accessibility observations, and post-action verification." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Android', href: '/capabilities/android' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Device Agent Architecture</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>The Android device agent is a Kotlin application that runs on the target device and communicates with TOM through an authenticated WebSocket bridge:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Device authentication:</strong> Challenge/HMAC handshake for secure pairing</li>
            <li><strong>Sequence checks:</strong> Message ordering and replay prevention</li>
            <li><strong>Device identity:</strong> Unique device identification</li>
            <li><strong>Task/action correlation:</strong> Linking actions to originating tasks</li>
            <li><strong>Accessibility observations:</strong> UI tree capture and element identification</li>
            <li><strong>Screenshots:</strong> Visual state capture for verification</li>
            <li><strong>Post-action verification:</strong> Confirming action outcomes on-device</li>
          </ul>
        </div>

        <SectionHeading>Available Device Tools</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-4">
          <p>The following device tools are available in the code. Each has its own permission and reliability requirements:</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {[
            'Open apps by package or visible name',
            'Open URLs in browser',
            'Google search',
            'Tap coordinates',
            'Tap accessibility nodes or grounded targets',
            'Enter text into fields',
            'Swipe gestures',
            'Long press',
            'Select nodes',
            'Scroll (directional)',
            'Navigate back / home / recents',
            'Maps search',
            'Open Calendar',
            'Compose email / SMS',
            'Initiate phone calls',
            'Video-call intents',
            'Create calendar events',
            'Initiate UPI / payment intents',
          ].map((tool, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-sans text-ink-light">
              <span className="w-1.5 h-1.5 bg-ochre rounded-full flex-shrink-0" />
              {tool}
            </div>
          ))}
        </div>

        <InfoBox variant="warning">
          <strong>Important limitations:</strong> Supported actions depend on Android version, app behavior, accessibility availability, permissions, installed apps, and device connectivity. Consequential operations require appropriate confirmation and platform/provider support. TOM does <strong>not</strong> promise unrestricted control of every Android application, bypassing authentication, defeating CAPTCHAs, or universal success on secure screens.
        </InfoBox>

        <SectionHeading>Live Device Bridge</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>The live device WebSocket bridge (<code className="code-mono text-ochre-dark">/v1/device/live</code> and <code className="code-mono text-ochre-dark">/ws</code>) provides real-time communication between TOM and the connected Android device. Authentication differs from operator sockets — the device bridge uses device-specific credentials.</p>
        </div>

        <CodeBlock title="Android bridge endpoints" code={`# Device live bridge
GET  /v1/device/live          # Check device connection status
WS   /ws                       # WebSocket bridge for device communication

# Authentication differs from operator endpoints
# Device uses challenge/HMAC handshake`} />
      </div>
    </div>
  );
}

// ============ BROWSER PAGE ============
export function BrowserPage() {
  return (
    <div>
      <PageHeader title="Browser Automation" subtitle="Playwright browser adapter with navigation policy, session boundaries, and approval gates for consequential actions." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Browser', href: '/capabilities/browser' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Browser Adapter</SectionHeading>
        <div className="body-sans text-ink-light space-y-4 mb-8">
          <p>TOM's browser automation uses the Playwright adapter to interact with web pages:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Navigation policy checks:</strong> URL allowlisting and domain restrictions</li>
            <li><strong>Browser session boundaries:</strong> Isolated sessions with defined lifetimes</li>
            <li><strong>Captured page state:</strong> Screenshots, DOM snapshots, and accessibility trees</li>
            <li><strong>Grounded browser actions:</strong> Click, type, select with element verification</li>
            <li><strong>Approval gates:</strong> Explicit confirmation for purchases, account changes, and consequential actions</li>
          </ul>
        </div>

        <SectionHeading>Setup</SectionHeading>
        <CodeBlock title="Install browser dependencies" code={`# Install with browser extra
pip install -e ".[browser]"

# Install Playwright Chromium
playwright install chromium`} />

        <InfoBox variant="warning">
          <strong>Reality check:</strong> Actual browser automation requires a configured and functioning browser environment. Application-specific authentication, dynamic pages, CAPTCHAs, permission boundaries, and browser security can prevent automation. TOM cannot bypass these protections.
        </InfoBox>

        <SectionHeading>Approval Gates</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>Consequential browser actions require explicit user approval:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Purchases and payment flows</li>
            <li>Account changes (password, email, settings)</li>
            <li>Form submissions with personal data</li>
            <li>Downloads from untrusted sources</li>
            <li>Navigation to sensitive domains</li>
          </ul>
          <p>The approval gate pauses execution and waits for explicit user confirmation before proceeding.</p>
        </div>

        <SectionHeading>Page State Capture</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>After each action, TOM captures the resulting page state for verification:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Screenshot of current viewport</li>
            <li>Accessibility tree snapshot</li>
            <li>URL and title verification</li>
            <li>Element state checks (visibility, text content)</li>
          </ul>
          <p>This fresh observation feeds into the success predicate evaluation.</p>
        </div>
      </div>
    </div>
  );
}

// ============ MODELS PAGE ============
export function ModelsPage() {
  return (
    <div>
      <PageHeader title="Model & Local AI" subtitle="Local inference vs hosted inference, model replaceability, privacy trade-offs, and hardware considerations." breadcrumbs={[{ label: 'Capabilities', href: '/capabilities' }, { label: 'Models', href: '/capabilities/models' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Local vs Hosted Inference</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="paper-layer p-5">
            <h3 className="font-sans font-semibold text-ink mb-3">Local Inference</h3>
            <ul className="space-y-2 text-sm font-sans text-ink-light">
              <li>✓ Data stays on your machine</li>
              <li>✓ No API costs per request</li>
              <li>✓ No network dependency</li>
              <li>✗ Requires sufficient RAM/VRAM</li>
              <li>✗ Model download required</li>
              <li>✗ Hardware-dependent performance</li>
              <li>✗ Limited to installed models</li>
            </ul>
          </div>
          <div className="paper-layer p-5">
            <h3 className="font-sans font-semibold text-ink mb-3">Hosted Inference</h3>
            <ul className="space-y-2 text-sm font-sans text-ink-light">
              <li>✓ No local hardware requirements</li>
              <li>✓ Access to latest models</li>
              <li>✓ Managed infrastructure</li>
              <li>✗ Data sent to third party</li>
              <li>✗ API costs per request</li>
              <li>✗ Network dependency</li>
              <li>✗ Rate limits and availability</li>
            </ul>
          </div>
        </div>

        <SectionHeading>Model Families & Roles</SectionHeading>
        <table className="editorial-table mb-8">
          <thead><tr><th>Role</th><th>Purpose</th><th>Examples</th></tr></thead>
          <tbody>
            <tr><td>Text Reasoning & Planning</td><td>Generate plans, reason about tasks</td><td>Qwen3, other LLMs</td></tr>
            <tr><td>Vision & Screenshot Interpretation</td><td>Understand screen content</td><td>Vision-capable models</td></tr>
            <tr><td>Speech Recognition (ASR)</td><td>Convert speech to text</td><td>ASR models</td></tr>
            <tr><td>Voice Activity Detection</td><td>Detect speech segments</td><td>Neural VAD models</td></tr>
            <tr><td>Turn Prediction</td><td>Predict conversation turns</td><td>Turn-taking models</td></tr>
            <tr><td>Speech Synthesis (TTS)</td><td>Convert text to speech</td><td>Qwen3-TTS</td></tr>
          </tbody>
        </table>

        <InfoBox variant="info">
          <strong>Key insight:</strong> Installing a model, passing an import check, or connecting to an API does <strong>not</strong> prove task success. The model must actually produce correct output for the specific task. Configuration ≠ capability.
        </InfoBox>

        <SectionHeading>Hardware Considerations</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>Local inference requirements vary significantly by model:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>RAM/VRAM:</strong> Larger models need more memory. Quantization reduces requirements but may affect quality.</li>
            <li><strong>Storage:</strong> Model files must be downloaded. Sizes range from GBs to tens of GBs.</li>
            <li><strong>Compute:</strong> CPU inference is slower. GPU acceleration requires compatible hardware and drivers.</li>
            <li><strong>Context limits:</strong> Each model has maximum context window sizes.</li>
          </ul>
          <p className="mt-3">There are no universal minimum requirements. Check your specific hardware against the model you intend to use.</p>
        </div>

        <SectionHeading>Diagnostic Checklist</SectionHeading>
        <div className="space-y-2 mb-8">
          {[
            'Is Ollama (or your model service) running?',
            'Is the configured model actually downloaded and available?',
            'Does your hardware meet the model\'s requirements?',
            'Can you reach the endpoint (check URL and port)?',
            'Are API keys set correctly (if using hosted inference)?',
            'Does a simple test request succeed?',
            'Is the model producing coherent output for your task?',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 text-sm font-sans text-ink-light">
              <span className="w-4 h-4 border border-ochre/40 rounded-sm flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ QWEN3 OLLAMA PAGE ============
export function Qwen3OllamaPage() {
  return (
    <div>
      <PageHeader title="Qwen3 & Ollama Setup" subtitle="Configuring local model inference with Ollama and Qwen-family models." breadcrumbs={[{ label: 'Documentation', href: '/docs' }, { label: 'Qwen3 & Ollama', href: '/docs/qwen3-ollama' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>Overview</SectionHeading>
        <div className="body-sans text-ink-light space-y-3 mb-8">
          <p>TOM communicates with an OpenAI-compatible local model endpoint. Ollama provides this compatibility layer, allowing TOM to use local Qwen models through a standard interface.</p>
          <p>The repository documents the Ollama endpoint at <code className="code-mono text-ochre-dark">http://127.0.0.1:11434/v1</code> and <code className="code-mono text-ochre-dark">qwen3:4b</code> as a starting point. Actual availability depends on your machine.</p>
        </div>

        <SectionHeading>Windows PowerShell Setup</SectionHeading>
        <CodeBlock title="1. Create Python virtual environment" code={`# Create and activate virtual environment
python -m venv venv
.\\venv\\Scripts\\Activate.ps1`} />

        <CodeBlock title="2. Install Ollama" code={`# Download and install Ollama from https://ollama.com
# Or use winget:
winget install Ollama.Ollama`} />

        <CodeBlock title="3. Download the model" code={`# Pull the Qwen3 model
ollama pull qwen3:4b

# Verify installation
ollama list`} />

        <CodeBlock title="4. Configure TOM environment" code={`# Copy example environment file
Copy-Item .env.example .env

# Edit .env with your configuration
TOM_LLM_ENABLED=true
TOM_LLM_BASE_URL=http://127.0.0.1:11434/v1
TOM_LLM_MODEL=qwen3:4b
TOM_LLM_API_KEY=
TOM_PLANNER_ALLOW_FALLBACK=true
TOM_LLM_TIMEOUT_SECONDS=30`} />

        <InfoBox variant="warning">
          <strong>Important:</strong> Keep the configured model tag (<code className="code-mono text-ochre-dark">qwen3:4b</code>) consistent with the installed model. If you pull a different model, update <code className="code-mono text-ochre-dark">TOM_LLM_MODEL</code> to match. Never commit .env files or credentials.
        </InfoBox>

        <SectionHeading>Troubleshooting</SectionHeading>
        <div className="space-y-4 mb-8">
          {[
            { issue: 'Ollama service unavailable', solution: 'Ensure Ollama is running. Check with `ollama list`. Restart the Ollama service if needed.' },
            { issue: 'Incorrect model name', solution: 'Verify the model tag matches exactly. Run `ollama list` to see available models. The tag in TOM_LLM_MODEL must match.' },
            { issue: 'Connection timeout', solution: 'Check that the URL is correct (http://127.0.0.1:11434/v1). Ensure no firewall is blocking the port. Increase TOM_LLM_TIMEOUT_SECONDS if needed.' },
            { issue: 'Malformed structured responses', solution: 'The model may not support structured output well. Try TOM_PLANNER_ALLOW_FALLBACK=true to use RulePlanner instead.' },
            { issue: 'Memory pressure', solution: 'Smaller models need less RAM. If qwen3:4b is too large, try a smaller quantization or model. Monitor system memory during inference.' },
            { issue: 'Fallback configuration', solution: 'Set TOM_PLANNER_ALLOW_FALLBACK=true to automatically use RulePlanner when ModelPlanner fails.' },
          ].map((item, i) => (
            <div key={i} className="p-4 border border-wheat-dark/30 rounded-sm">
              <h4 className="font-sans font-semibold text-sm text-rust mb-1">{item.issue}</h4>
              <p className="font-sans text-xs text-ink-muted">{item.solution}</p>
            </div>
          ))}
        </div>

        <InfoBox variant="info">
          <strong>Note:</strong> This setup has not been verified on your specific computer. Results depend on your hardware, operating system, Ollama version, and network configuration. Test thoroughly before relying on local inference for important tasks.
        </InfoBox>
      </div>
    </div>
  );
}

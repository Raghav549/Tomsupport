import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, SectionHeading, InfoBox, StatusBadge, CodeBlock, DemoLabel, ArchitectureDiagram } from '../components/Layout';
import { WolfLogo, WolfMark } from '../components/WolfLogo';
import { ArrowRight, ExternalLink, Github, Heart, Check, Copy, Download, MessageCircle } from 'lucide-react';

// ===== DONATION / SUPPORT PAGE =====
const FUNDRAISING_GOAL = 100000;
const INITIAL_RAISED = 9870;

export function SupportPage() {
  const [amount, setAmount] = useState<number | ''>('');
  const [showModal, setShowModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success'>('idle');
  const raised = INITIAL_RAISED;
  const remaining = FUNDRAISING_GOAL - raised;
  const percentage = (raised / FUNDRAISING_GOAL) * 100;
  const presets = [100, 250, 500, 1000, 2500];

  const handleDonate = () => {
    if (!amount || amount <= 0) return;
    setShowModal(false);
    setPaymentStatus('pending');
    // In production, this would initiate UPI handoff via configured backend
  };

  const generateUpiLink = (amt: number) => {
    const params = new URLSearchParams({ pa: encodeURIComponent('raghavkashyap2229@oksbi'), pn: 'TOM Project', am: amt.toString(), cu: 'INR', tn: 'TOM donation support' });
    return `upi://pay?${params.toString()}`;
  };

  return (
    <div className="pt-16">
      <PageHeader title="Support TOM" subtitle="Transparent donation information. How contributions support development, testing, research, and infrastructure." breadcrumbs={[{ label: 'Support', href: '/support' }]} />
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

        {/* Payment Status */}
        {paymentStatus === 'pending' && (
          <div className="card-elevated text-center py-8">
            <div className="w-12 h-12 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
            <h3 className="heading-sans text-xl mb-2">Awaiting Payment Confirmation</h3>
            <p className="text-sm text-gray-500 mb-4">Your payment is being processed. Totals update only after trusted backend confirmation.</p>
            <p className="text-xs text-gray-400">If your UPI app opened, complete the payment there. You can optionally submit a reference for manual verification.</p>
          </div>
        )}

        <InfoBox variant="info">
          <strong>Transparency:</strong> We do not invent payment receipts, tax-deductibility claims, or financial records. Donation totals update only from verified confirmed transactions. Card details are never stored in frontend code.
        </InfoBox>
      </div>
    </div>
  );
}

// ===== COMMUNITY REGISTRATION =====
export function CommunityJoinPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ firstName: '', surname: '', email: '', country: '', state: '', city: '', language: 'English', interests: [] as string[], skills: '', experience: '', contribution: '', github: '', portfolio: '', participation: '', consent: false });
  const [token, setToken] = useState('');
  const [completed, setCompleted] = useState(false);
  const totalSteps = 9;

  const interestOptions = ['AI Agents', 'Qwen Models', 'Local AI', 'Android Automation', 'Browser Automation', 'Voice Systems', 'Research', 'Python', 'Kotlin', 'Security', 'UI/UX', 'Open Source'];

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));
  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };

  const next = () => { if (step < totalSteps) setStep(step + 1); };
  const prev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = () => {
    // Generate a cryptographically random token
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    const newToken = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    setToken(newToken);
    setCompleted(true);
  };

  const copyToken = () => { navigator.clipboard.writeText(token); };

  if (completed) {
    return (
      <div className="pt-16">
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-green-600" />
          </div>
          <h1 className="heading-sans text-3xl mb-3">Your TOM Community Registration Is Ready</h1>
          <p className="text-gray-500 mb-8">Download your PDF and follow the steps below to complete your registration.</p>

          <div className="space-y-3 mb-8">
            <button className="btn-primary w-full"><Download size={16} /> Download Registration PDF</button>
            <button onClick={copyToken} className="btn-secondary w-full"><Copy size={16} /> Copy Registration Token</button>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8">
            <p className="font-mono text-xs text-gray-400 mb-3">REGISTRATION TOKEN</p>
            <p className="font-mono text-lg text-black break-all select-all">{token}</p>
          </div>

          <div className="text-left space-y-4 mb-8">
            <h3 className="font-semibold">Next Steps:</h3>
            {[
              'Download your registration PDF',
              'Copy your registration token',
              'Open WhatsApp using the button below',
              'Send your PDF and registration token for manual review',
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <span className="text-sm text-gray-700">{s}</span>
              </div>
            ))}
          </div>

          <a href={`https://wa.me/9693747328?text=${encodeURIComponent('Hi, I have completed my TOM community registration. Please find my PDF and token attached.')}`} target="_blank" rel="noopener noreferrer" className="btn-primary w-full !bg-green-600 hover:!bg-green-700">
            <MessageCircle size={18} /> Continue on WhatsApp
          </a>
          <p className="text-xs text-gray-400 mt-4">Sending the PDF/token is a registration-review step, not proof of membership approval. Attach the PDF manually in WhatsApp.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <PageHeader title="Join the Community" subtitle="Register to participate in TOM discussions, research, testing, and contributions." breadcrumbs={[{ label: 'Community', href: '/community' }, { label: 'Join', href: '/community/join' }]} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-gray-400">Step {step} of {totalSteps}</span>
            <span className="text-xs font-mono text-gray-400">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} /></div>
        </div>

        <div className="card-elevated">
          {step === 1 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">What's your name?</h2>
              <p className="text-sm text-gray-500 mb-6">We'll use this for your community profile.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">First Name</label><input value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="Jane" /></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Surname</label><input value={formData.surname} onChange={e => updateField('surname', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="Doe" /></div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">Your email address</h2>
              <p className="text-sm text-gray-500 mb-6">Used for community updates and verification.</p>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
              <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="jane@example.com" />
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">Where are you based?</h2>
              <p className="text-sm text-gray-500 mb-6">Optional — helps us understand our community.</p>
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Country</label><input value={formData.country} onChange={e => updateField('country', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="India" /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-medium text-gray-500 mb-1 block">State</label><input value={formData.state} onChange={e => updateField('state', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="Delhi" /></div>
                  <div><label className="text-xs font-medium text-gray-500 mb-1 block">City</label><input value={formData.city} onChange={e => updateField('city', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="New Delhi" /></div>
                </div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Preferred Language</label><input value={formData.language} onChange={e => updateField('language', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="English" /></div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">What interests you?</h2>
              <p className="text-sm text-gray-500 mb-6">Select all that apply.</p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(i => (
                  <button key={i} onClick={() => toggleInterest(i)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.interests.includes(i) ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{i}</button>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">Your skills & experience</h2>
              <p className="text-sm text-gray-500 mb-6">Help us match you with relevant opportunities.</p>
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Skills</label><input value={formData.skills} onChange={e => updateField('skills', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="Python, Machine Learning, ..." /></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Experience Level</label><select value={formData.experience} onChange={e => updateField('experience', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black"><option value="">Select...</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Expert</option></select></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Preferred Contribution</label><input value={formData.contribution} onChange={e => updateField('contribution', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="Code, docs, testing, research..." /></div>
              </div>
            </div>
          )}
          {step === 6 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">Your profiles (optional)</h2>
              <p className="text-sm text-gray-500 mb-6">Link your public profiles if you'd like.</p>
              <div className="space-y-4">
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">GitHub Profile</label><input value={formData.github} onChange={e => updateField('github', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="https://github.com/username" /></div>
                <div><label className="text-xs font-medium text-gray-500 mb-1 block">Portfolio / Website</label><input value={formData.portfolio} onChange={e => updateField('portfolio', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black" placeholder="https://yoursite.com" /></div>
              </div>
            </div>
          )}
          {step === 7 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">How will you participate?</h2>
              <p className="text-sm text-gray-500 mb-6">Select your preferred community activities.</p>
              <div className="flex flex-wrap gap-2">
                {['Discussions', 'Research', 'Testing', 'Documentation', 'Coding', 'Sharing Experiments'].map(p => (
                  <button key={p} onClick={() => updateField('participation', p)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${formData.participation === p ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{p}</button>
                ))}
              </div>
            </div>
          )}
          {step === 8 && (
            <div>
              <h2 className="heading-sans text-2xl mb-1">Review your information</h2>
              <p className="text-sm text-gray-500 mb-6">Check your details before submitting.</p>
              <div className="space-y-3 bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm"><strong>Name:</strong> {formData.firstName} {formData.surname}</p>
                <p className="text-sm"><strong>Email:</strong> {formData.email}</p>
                {formData.country && <p className="text-sm"><strong>Location:</strong> {[formData.city, formData.state, formData.country].filter(Boolean).join(', ')}</p>}
                {formData.interests.length > 0 && <p className="text-sm"><strong>Interests:</strong> {formData.interests.join(', ')}</p>}
                {formData.skills && <p className="text-sm"><strong>Skills:</strong> {formData.skills}</p>}
                {formData.github && <p className="text-sm"><strong>GitHub:</strong> {formData.github}</p>}
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={formData.consent} onChange={e => updateField('consent', e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300" />
                <span className="text-xs text-gray-600">I consent to the privacy policy. My data will be used only for community onboarding. I can request deletion at any time.</span>
              </label>
            </div>
          )}
          {step === 9 && (
            <div className="text-center py-4">
              <WolfMark size={40} className="text-black mx-auto mb-4" />
              <h2 className="heading-sans text-2xl mb-2">Ready to submit?</h2>
              <p className="text-sm text-gray-500 mb-6">Your registration will generate a unique token and downloadable PDF.</p>
              <p className="text-xs text-gray-400">Backend not configured — this is a demo flow. No real token will be issued.</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button onClick={prev} disabled={step === 1} className="btn-ghost disabled:opacity-30">← Back</button>
            {step < totalSteps ? (
              <button onClick={next} className="btn-primary">Continue →</button>
            ) : (
              <button onClick={handleSubmit} disabled={!formData.consent} className="btn-primary disabled:opacity-40">Submit Registration</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== REMAINING PAGES (consolidated) =====
export function ResearchPage() {
  return (
    <div className="pt-16">
      <PageHeader title="Research Library" subtitle="AI agents, mobile GUI automation, verification, recovery, local inference, and safety research." breadcrumbs={[{ label: 'Research', href: '/research' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="info"><strong>Verification notice:</strong> Where specific claims have not been independently verified, they are marked accordingly.</InfoBox>
        <div className="space-y-4 mt-8">
          {['V-Droid', 'VeriSafe Agent', 'VeriGUI', 'AndroidWorld', 'OSWorld', 'Qwen UI-Agent', 'Qwen-CUA'].map((title, i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">{['Mobile GUI', 'Verification', 'GUI Verification', 'Android Eval', 'Cross-OS', 'Vision-Language', 'Computer Use'][i]}</p>
                  <h3 className="font-semibold text-black text-lg">{title}</h3>
                </div>
                <span className="badge badge-gray">Reference requires verification</span>
              </div>
              <p className="text-sm text-gray-500">Research in {['mobile GUI automation', 'evidence-based verification', 'GUI verification methods', 'execution-based evaluation', 'cross-OS agent evaluation', 'vision-language GUI agents', 'computer use agents'][i]} informing TOM's design.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DocsPage() {
  return (
    <div className="pt-16">
      <PageHeader title="Documentation" subtitle="Complete guides for installing, configuring, and using TOM." breadcrumbs={[{ label: 'Docs', href: '/docs' }]} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Quick Start', desc: 'Get TOM running in minutes' },
            { title: 'Environment Variables', desc: 'Complete configuration reference' },
            { title: 'Model Setup', desc: 'Local model inference' },
            { title: 'Voice/TTS Setup', desc: 'Voice pipeline configuration' },
            { title: 'Android Setup', desc: 'Device agent build' },
            { title: 'Browser Setup', desc: 'Playwright configuration' },
            { title: 'API Reference', desc: 'Complete API docs' },
            { title: 'Security Guide', desc: 'Auth and permissions' },
            { title: 'Architecture', desc: 'System design' },
          ].map((s, i) => (
            <Link key={i} to="/docs/quick-start" className="card group hover:border-gray-300">
              <h3 className="font-semibold text-black group-hover:text-gray-600 transition-colors">{s.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
        <div className="card-elevated mt-8">
          <h2 className="heading-sans text-xl mb-4">Basic Development Flow</h2>
          <CodeBlock title="Setup" code={`python -m venv venv && source venv/binactivate
pip install -e ".[dev]"
cp .env.example .env
python -m uvicorn tom.api.app:app --host 127.0.0.1 --port 8787`} />
        </div>
      </div>
    </div>
  );
}

export function RoadmapPage() {
  const items = [
    { cat: 'Core Reliability', tasks: ['Consolidate execution paths', 'Improve error handling', 'Add integration tests'] },
    { cat: 'Local Model Validation', tasks: ['Complete real Qwen inference tests', 'Validate structured output', 'Document hardware requirements'] },
    { cat: 'Voice Quality', tasks: ['Validate TTS audio end-to-end', 'Measure latency', 'Test interruption handling'] },
    { cat: 'Android Testing', tasks: ['Test connected device', 'Verify post-action predicates', 'Document compatibility'] },
    { cat: 'Research', tasks: ['Publish reproducible benchmarks', 'Complete evaluation suite'] },
    { cat: 'Privacy', tasks: ['Encrypted storage option', 'Retention controls', 'Secret redaction'] },
    { cat: 'Production', tasks: ['Persistent state', 'Multi-worker support', 'Security hardening'] },
  ];
  return (
    <div className="pt-16">
      <PageHeader title="Roadmap" subtitle="Planned improvements. These are goals, not promises." breadcrumbs={[{ label: 'Roadmap', href: '/roadmap' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-6">
          {items.map((s, i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-black mb-3 flex items-center gap-2"><span className="w-2 h-2 bg-black rounded-full" />{s.cat}</h3>
              <ul className="space-y-2">{s.tasks.map((t, j) => (<li key={j} className="flex items-center gap-2 text-sm text-gray-600"><span className="w-3 h-3 border border-gray-300 rounded" />{t}</li>))}</ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommunityPage() {
  return (
    <div className="pt-16">
      <PageHeader title="Community" subtitle="Discussions, questions, research, feature requests, and contributions." breadcrumbs={[{ label: 'Community', href: '/community' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="info">Community infrastructure is being set up. GitHub is the primary hub for now.</InfoBox>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {[{ title: 'General Discussion', desc: 'Project announcements' }, { title: 'Questions & Help', desc: 'Setup and usage help' }, { title: 'Research', desc: 'Papers and experiments' }, { title: 'Bug Reports', desc: 'Report issues' }, { title: 'Feature Requests', desc: 'Suggest improvements' }, { title: 'Showcase', desc: 'Share your projects' }].map((c, i) => (
            <div key={i} className="card"><h3 className="font-semibold text-black mb-1">{c.title}</h3><p className="text-sm text-gray-500">{c.desc}</p></div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/community/join" className="btn-primary">Join the Community <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}

export function ContributePage() {
  return (
    <div className="pt-16">
      <PageHeader title="Contribute to TOM" subtitle="Code, research, documentation, testing, and more." breadcrumbs={[{ label: 'Community', href: '/community' }, { label: 'Contribute', href: '/contribute' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {['Code', 'Research', 'Documentation', 'Testing', 'Model Reports', 'Bug Reports', 'Security', 'Community'].map((c, i) => (
            <div key={i} className="card"><h3 className="font-semibold text-black">{c}</h3></div>
          ))}
        </div>
        <CodeBlock title="Git workflow" code={`git clone https://github.com/YOUR-USERNAME/TOM.git
cd TOM && git checkout -b feature/your-feature
pip install -e ".[dev]" && pytest tests/
git commit -m "Add: clear description"
git push && open PR on GitHub`} />
      </div>
    </div>
  );
}

export function FAQPage() {
  const faqs = [
    { q: 'What is TOM?', a: 'An open-source personal AI agent runtime combining planning, tools, memory, browser/Android bridges, voice, permissions, and verification.' },
    { q: 'How is TOM different from a chatbot?', a: 'TOM acts in the real world — it plans, executes, observes, and verifies. It does not just generate text about actions.' },
    { q: 'What does verification mean?', a: 'After executing, TOM collects a fresh observation and evaluates an action-specific predicate. Results: VERIFIED, FAILED, or UNKNOWN.' },
    { q: 'Does TOM support Qwen?', a: 'TOM uses OpenAI-compatible endpoints. Qwen via Ollama is documented as a starting point. Availability depends on your hardware.' },
    { q: 'Can TOM perform UPI payments?', a: 'TOM has Android intents but requires authoritative provider evidence. It does not fabricate payment completion.' },
    { q: 'What hardware do I need?', a: 'Requirements vary by model. Check your hardware against your chosen model. No universal minimums.' },
  ];
  return (
    <div className="pt-16">
      <PageHeader title="FAQ" subtitle="Common questions about TOM." breadcrumbs={[{ label: 'FAQ', href: '/faq' }]} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-4">{faqs.map((f, i) => (<div key={i} className="card"><h3 className="font-semibold text-black mb-2">{f.q}</h3><p className="text-sm text-gray-600">{f.a}</p></div>))}</div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="pt-16">
      <PageHeader title="Contact" subtitle="Project links, security disclosures, and collaboration." breadcrumbs={[{ label: 'Contact', href: '/contact' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3"><Github size={20} /><div><p className="font-semibold text-black text-sm">GitHub</p><p className="text-xs text-gray-500">Repository</p></div></a>
          <a href="https://github.com/Raghav509/TOM/issues" target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3"><ExternalLink size={20} /><div><p className="font-semibold text-black text-sm">Issues</p><p className="text-xs text-gray-500">Report bugs</p></div></a>
        </div>
        <InfoBox variant="warning">Report security vulnerabilities privately. Do not open public issues for security problems.</InfoBox>
      </div>
    </div>
  );
}

export function SecurityPage() {
  return (
    <div className="pt-16">
      <PageHeader title="Security & Privacy" subtitle="Permissions, authentication, and privacy boundaries." breadcrumbs={[{ label: 'Security', href: '/security' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <SectionHeading>API Authentication</SectionHeading>
        <CodeBlock title="Bearer token" code={`# Generate strong secret
openssl rand -hex 32
# Set in .env (never commit):
TOM_API_TOKEN=your-strong-secret`} />
        <InfoBox variant="warning"><strong>Critical:</strong> TOM_API_TOKEN must never be published. A single token is not equivalent to multi-tenant authorization.</InfoBox>
        <SectionHeading>High-Impact Actions</SectionHeading>
        <p className="text-editorial mb-4">Messages, purchases, payments, bookings, deletions, and account changes require explicit confirmation.</p>
      </div>
    </div>
  );
}

export function GitHubPage() {
  return (
    <div className="pt-16">
      <PageHeader title="GitHub Repository" subtitle="Source code, issues, and pull requests." breadcrumbs={[{ label: 'GitHub', href: '/github' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="card-elevated text-center mb-8">
          <Github size={40} className="mx-auto mb-3" />
          <h2 className="heading-sans text-2xl mb-2">Raghav509/TOM</h2>
          <p className="text-sm text-gray-500 mb-4">Apache-2.0</p>
          <div className="flex justify-center gap-3">
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="btn-primary">View Repository</a>
            <a href="https://github.com/Raghav509/TOM/issues" target="_blank" rel="noopener noreferrer" className="btn-secondary">Issues</a>
          </div>
        </div>
        <CodeBlock title="Clone" code={`git clone https://github.com/Raghav509/TOM.git
cd TOM && pip install -e ".[dev]"`} />
      </div>
    </div>
  );
}

export function ApiReferencePage() {
  return (
    <div className="pt-16">
      <PageHeader title="API Reference" subtitle="Documented API surface. Verify against implementation." breadcrumbs={[{ label: 'Docs', href: '/docs' }, { label: 'API', href: '/docs/api-reference' }]} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <InfoBox variant="info">Verify current schemas and authentication rules against the actual implementation.</InfoBox>
        <SectionHeading>Endpoints</SectionHeading>
        <div className="space-y-2">
          {[['GET', '/health', 'Server health'], ['GET', '/ready', 'Readiness (may return ready=false)'], ['POST', '/v1/agent', 'Submit task'], ['POST', '/v1/agent/approve', 'Approve action'], ['GET', '/v1/capabilities', 'List capabilities'], ['GET', '/v1/integrations', 'List integrations']].map(([m, e, d], i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <code className="font-mono text-xs font-bold text-black w-12">{m}</code>
              <code className="font-mono text-sm text-gray-700 flex-1">{e}</code>
              <span className="text-xs text-gray-500">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

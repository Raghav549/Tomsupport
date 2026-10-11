import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Github, ArrowRight, ChevronRight } from 'lucide-react';
import { WolfWordmark, WolfMark } from './WolfLogo';

const navItems = [
  { label: 'Product', href: '/about' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Research', href: '/research' },
  { label: 'Docs', href: '/docs' },
  { label: 'Community', href: '/community' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Donate', href: '/donate' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <WolfWordmark />

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-full transition-all ${
                  location.pathname === item.href
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black rounded-full hover:bg-gray-50 transition-all"
              aria-label="GitHub">
              <Github size={16} />
              <span className="hidden xl:inline">GitHub</span>
            </a>
            <Link to="/docs/quick-start" className="btn-primary !py-2 !px-4 !text-sm hidden sm:inline-flex">
              Get Started
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-600 hover:text-black" aria-label="Menu">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map(item => (
              <Link key={item.href} to={item.href}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  location.pathname === item.href ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer"
              className="px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl flex items-center gap-2">
              <Github size={16} /> GitHub
            </a>
            <Link to="/docs/quick-start" className="btn-primary mt-2 !text-sm">Get Started →</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <WolfWordmark />
            <p className="mt-4 text-sm text-gray-500 max-w-xs leading-relaxed">
              An open-source personal AI agent runtime. Built to act, observe, and verify. Apache-2.0 licensed.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Project</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-black transition-colors">About</Link></li>
              <li><Link to="/capabilities" className="text-gray-600 hover:text-black transition-colors">Capabilities</Link></li>
              <li><Link to="/roadmap" className="text-gray-600 hover:text-black transition-colors">Roadmap</Link></li>
              <li><Link to="/research" className="text-gray-600 hover:text-black transition-colors">Research</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/docs" className="text-gray-600 hover:text-black transition-colors">Documentation</Link></li>
              <li><Link to="/docs/api-reference" className="text-gray-600 hover:text-black transition-colors">API Reference</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-black transition-colors">FAQ</Link></li>
              <li><Link to="/github" className="text-gray-600 hover:text-black transition-colors">GitHub</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Community</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/community" className="text-gray-600 hover:text-black transition-colors">Community</Link></li>
              <li><Link to="/contribute" className="text-gray-600 hover:text-black transition-colors">Contribute</Link></li>
              <li><Link to="/donate" className="text-gray-600 hover:text-black transition-colors">Donate</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400">TOM is open source. Apache-2.0. No trademark or institutional claims.</p>
          <div className="flex items-center gap-4">
            <Link to="/security" className="text-xs text-gray-400 hover:text-black transition-colors">Security</Link>
            <Link to="/contact" className="text-xs text-gray-400 hover:text-black transition-colors">Contact</Link>
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHeader({ title, subtitle, breadcrumbs }: { title: string; subtitle?: string; breadcrumbs?: { label: string; href: string }[] }) {
  return (
    <div className="pt-24 pb-12 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {breadcrumbs && (
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={10} />
                <Link to={b.href} className="hover:text-black transition-colors">{b.label}</Link>
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="heading-sans text-4xl md:text-5xl text-black mb-4">{title}</h1>
        {subtitle && <p className="text-editorial text-lg md:text-xl max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { cls: string; label: string }> = {
    'implemented': { cls: 'badge-green', label: 'Implemented' },
    'tests-available': { cls: 'badge-green', label: 'Tests Available' },
    'requires-config': { cls: 'badge-amber', label: 'Requires Config' },
    'hardware-dependent': { cls: 'badge-blue', label: 'Hardware Dependent' },
    'experimental': { cls: 'badge-blue', label: 'Experimental' },
    'not-available': { cls: 'badge-red', label: 'Not Available' },
    'planned': { cls: 'badge-gray', label: 'Planned' },
  };
  const c = map[status] || map['planned'];
  return <span className={`badge ${c.cls}`}>{c.label}</span>;
}

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="my-4">
      {title && <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">{title}</p>}
      <pre className="code-block"><code>{code}</code></pre>
    </div>
  );
}

export function InfoBox({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'bg-blue-50 border-blue-100 text-blue-900',
    warning: 'bg-amber-50 border-amber-100 text-amber-900',
    success: 'bg-green-50 border-green-100 text-green-900',
  };
  return <div className={`border rounded-xl px-5 py-4 my-5 text-sm ${styles[variant]}`}>{children}</div>;
}

export function DemoLabel({ text }: { text?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse-soft" />
      {text || 'Illustrative demo — no real booking or payment'}
    </div>
  );
}

export function SectionHeading({ children, id, subtitle }: { children: React.ReactNode; id?: string; subtitle?: string }) {
  return (
    <div className="mb-8" id={id}>
      <h2 className="heading-sans text-2xl md:text-3xl text-black mb-2">{children}</h2>
      {subtitle && <p className="text-editorial text-base max-w-2xl">{subtitle}</p>}
      <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-transparent mt-4" />
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 my-8 overflow-x-auto">
      <DemoLabel />
      <svg viewBox="0 0 800 280" className="w-full max-w-3xl mx-auto mt-6" fill="none">
        <rect x="20" y="110" width="120" height="60" rx="12" fill="#fff" stroke="#171717" strokeWidth="1.5" />
        <text x="80" y="137" textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600, fill: '#171717' }}>User Request</text>
        <text x="80" y="153" textAnchor="middle" style={{ fontSize: '9px', fontFamily: 'JetBrains Mono', fill: '#a3a3a3' }}>natural language</text>
        <path d="M140 140 L180 140" stroke="#171717" strokeWidth="1.5" markerEnd="url(#arr)" />
        <rect x="180" y="100" width="110" height="80" rx="12" fill="#fff" stroke="#171717" strokeWidth="1.5" />
        <text x="235" y="135" textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600, fill: '#171717' }}>Planner</text>
        <text x="235" y="155" textAnchor="middle" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', fill: '#a3a3a3' }}>Rule | Model</text>
        <path d="M290 140 L330 140" stroke="#171717" strokeWidth="1.5" markerEnd="url(#arr)" />
        <rect x="330" y="100" width="110" height="80" rx="12" fill="#fff" stroke="#171717" strokeWidth="1.5" />
        <text x="385" y="135" textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600, fill: '#171717' }}>Permission</text>
        <text x="385" y="155" textAnchor="middle" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', fill: '#a3a3a3' }}>check &amp; approve</text>
        <path d="M440 140 L480 140" stroke="#171717" strokeWidth="1.5" markerEnd="url(#arr)" />
        <rect x="480" y="100" width="110" height="80" rx="12" fill="#fff" stroke="#171717" strokeWidth="1.5" />
        <text x="535" y="135" textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600, fill: '#171717' }}>Tool Execute</text>
        <text x="535" y="155" textAnchor="middle" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', fill: '#a3a3a3' }}>registered tools</text>
        <path d="M535 180 L535 210" stroke="#171717" strokeWidth="1.5" markerEnd="url(#arr)" />
        <rect x="480" y="210" width="110" height="50" rx="12" fill="#fff" stroke="#171717" strokeWidth="1.5" />
        <text x="535" y="240" textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600, fill: '#171717' }}>Observe</text>
        <path d="M480 235 L420 235" stroke="#171717" strokeWidth="1.5" markerEnd="url(#arr)" />
        <rect x="310" y="210" width="110" height="50" rx="12" fill="#fff" stroke="#171717" strokeWidth="1.5" />
        <text x="365" y="240" textAnchor="middle" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600, fill: '#171717' }}>Verify</text>
        <path d="M310 235 L250 235" stroke="#171717" strokeWidth="1.5" markerEnd="url(#arr)" />
        <rect x="140" y="210" width="110" height="50" rx="12" fill="#171717" stroke="#171717" strokeWidth="1.5" />
        <text x="195" y="233" textAnchor="middle" style={{ fontSize: '10px', fontFamily: 'Inter', fontWeight: 600, fill: '#fff' }}>VERIFIED</text>
        <text x="195" y="248" textAnchor="middle" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono', fill: 'rgba(255,255,255,0.6)' }}>| FAILED | UNKNOWN</text>
        <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#171717" /></marker></defs>
      </svg>
    </div>
  );
}

// Scroll reveal hook
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}

// Scroll to top button
function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-black text-white rounded-full shadow-lg hover:scale-105 transition-all flex items-center justify-center"
      aria-label="Scroll to top">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
    </button>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollTop />
    </div>
  );
}

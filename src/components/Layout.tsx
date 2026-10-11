import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Github, ExternalLink, ChevronRight, BookOpen, Cpu, Shield, Layers, MessageSquare, Heart, Map, FileText, Users, Code, Zap, Eye, Mic, Smartphone, Globe, Brain, Database, CheckCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react';

// ============ TOM WORDMARK ============
export function TomWordmark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' };
  return (
    <Link to="/" className="flex items-center gap-2 group" aria-label="TOM Home">
      <svg width={size === 'lg' ? 36 : size === 'md' ? 28 : 22} height={size === 'lg' ? 36 : size === 'md' ? 28 : 22} viewBox="0 0 36 36" fill="none" className="flex-shrink-0">
        <rect x="2" y="2" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-ink" />
        <path d="M10 12h16M18 12v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ochre-dark" />
        <circle cx="10" cy="22" r="2" fill="currentColor" className="text-olive" />
        <circle cx="26" cy="22" r="2" fill="currentColor" className="text-rust" />
        <path d="M12 22h12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" className="text-ink-muted" />
      </svg>
      <span className={`display-serif ${sizes[size]} text-ink tracking-tight`}>
        TOM
      </span>
      {size !== 'sm' && (
        <span className="hidden sm:inline text-[0.6rem] font-mono uppercase tracking-[0.15em] text-ink-muted mt-1">
          Agent Runtime
        </span>
      )}
    </Link>
  );
}

// ============ STATUS BADGE ============
export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { className: string; label: string }> = {
    'implemented': { className: 'status-implemented', label: 'Implemented' },
    'tests-available': { className: 'status-implemented', label: 'Tests Available' },
    'requires-config': { className: 'status-requires-config', label: 'Requires Config' },
    'hardware-dependent': { className: 'status-experimental', label: 'Hardware Dependent' },
    'experimental': { className: 'status-experimental', label: 'Experimental' },
    'not-available': { className: 'status-not-available', label: 'Not Yet Available' },
    'planned': { className: 'status-planned', label: 'Planned' },
  };
  const c = config[status] || config['planned'];
  return <span className={`status-badge ${c.className}`}>{c.label}</span>;
}

// ============ CODE BLOCK ============
export function CodeBlock({ code, lang = 'bash', title }: { code: string; lang?: string; title?: string }) {
  return (
    <div className="my-4">
      {title && <div className="diagram-label mb-1">{title}</div>}
      <pre className="code-block"><code>{code}</code></pre>
    </div>
  );
}

// ============ SECTION HEADING ============
export function SectionHeading({ children, id, subtitle }: { children: React.ReactNode; id?: string; subtitle?: string }) {
  return (
    <div className="mb-8" id={id}>
      <h2 className="display-serif text-3xl md:text-4xl text-ink mb-2">{children}</h2>
      {subtitle && <p className="body-sans text-ink-muted text-lg max-w-2xl">{subtitle}</p>}
      <hr className="editorial-rule mt-4" />
    </div>
  );
}

// ============ PAGE HEADER ============
export function PageHeader({ title, subtitle, breadcrumbs }: { title: string; subtitle?: string; breadcrumbs?: { label: string; href: string }[] }) {
  return (
    <div className="paper-texture-light border-b border-wheat-dark/30 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-3 left-3 text-[7px] font-mono text-ink-muted opacity-15 hidden sm:block">TOM</div>
      <div className="absolute top-3 right-3 text-[7px] font-mono text-ink-muted opacity-15 hidden sm:block">§</div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ochre/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {breadcrumbs && (
          <nav className="flex items-center gap-1 text-xs font-mono text-ink-muted mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-ochre-dark transition-colors">Home</Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <ChevronRight size={10} />
                <Link to={b.href} className="hover:text-ochre-dark transition-colors">{b.label}</Link>
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="display-serif text-4xl md:text-5xl text-ink mb-3">{title}</h1>
        {subtitle && <p className="body-sans text-ink-light text-lg md:text-xl max-w-3xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}

// ============ DEMO LABEL ============
export function DemoLabel({ text = "Illustrative demonstration — not connected to a running TOM instance" }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-mono text-ochre-dark bg-amber/10 border border-amber/20 px-3 py-1.5 rounded-sm">
      <AlertTriangle size={12} />
      <span>{text}</span>
    </div>
  );
}

// ============ INFO BOX ============
export function InfoBox({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'border-ochre/30 bg-ochre/5',
    warning: 'border-rust/30 bg-rust/5',
    success: 'border-olive/30 bg-olive/5',
  };
  return (
    <div className={`border-l-3 ${styles[variant]} px-4 py-3 my-4 text-sm body-sans text-ink-light`}>
      {children}
    </div>
  );
}

// ============ ARCHITECTURE DIAGRAM ============
export function ArchitectureDiagram() {
  return (
    <div className="diagram-container my-8 overflow-x-auto">
      <DemoLabel />
      <svg viewBox="0 0 800 320" className="w-full max-w-3xl mx-auto mt-4" fill="none">
        {/* User Request */}
        <rect x="20" y="130" width="120" height="60" rx="3" fill="#f5f0e8" stroke="#2c2416" strokeWidth="1.5" />
        <text x="80" y="155" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter' }}>User Request</text>
        <text x="80" y="172" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '9px', fontFamily: 'JetBrains Mono' }}>natural language</text>

        {/* Arrow */}
        <path d="M140 160 L180 160" stroke="#c4956a" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Planner */}
        <rect x="180" y="120" width="110" height="80" rx="3" fill="#ebe5d9" stroke="#2c2416" strokeWidth="1.5" />
        <text x="235" y="150" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Planner</text>
        <text x="235" y="168" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>RulePlanner |</text>
        <text x="235" y="180" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>ModelPlanner</text>

        {/* Arrow */}
        <path d="M290 160 L330 160" stroke="#c4956a" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Policy + Approval */}
        <rect x="330" y="120" width="110" height="80" rx="3" fill="#f0ebe0" stroke="#6b7c5e" strokeWidth="1.5" />
        <text x="385" y="150" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Policy &amp;</text>
        <text x="385" y="165" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Approval</text>
        <text x="385" y="182" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>permissions</text>

        {/* Arrow */}
        <path d="M440 160 L480 160" stroke="#c4956a" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Tool Execution */}
        <rect x="480" y="120" width="110" height="80" rx="3" fill="#ebe5d9" stroke="#2c2416" strokeWidth="1.5" />
        <text x="535" y="148" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Tool</text>
        <text x="535" y="163" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Execution</text>
        <text x="535" y="180" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>registered tools</text>

        {/* Arrow down */}
        <path d="M535 200 L535 240" stroke="#c4956a" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Observation */}
        <rect x="480" y="240" width="110" height="60" rx="3" fill="#f5f0e8" stroke="#9c5e42" strokeWidth="1.5" />
        <text x="535" y="265" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Observation</text>
        <text x="535" y="282" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>fresh state</text>

        {/* Arrow left */}
        <path d="M480 270 L420 270" stroke="#9c5e42" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Success Predicate */}
        <rect x="310" y="240" width="110" height="60" rx="3" fill="#f0ebe0" stroke="#9c5e42" strokeWidth="1.5" />
        <text x="365" y="265" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Success</text>
        <text x="365" y="280" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Predicate</text>

        {/* Arrow to Memory */}
        <path d="M310 270 L250 270" stroke="#6b7c5e" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Memory */}
        <rect x="140" y="240" width="110" height="60" rx="3" fill="#ebe5d9" stroke="#6b7c5e" strokeWidth="1.5" />
        <text x="195" y="265" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Memory</text>
        <text x="195" y="282" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>context + result</text>

        {/* Arrow to Result */}
        <path d="M195 240 L195 200 L80 200 L80 210" stroke="#6b7c5e" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* Result */}
        <rect x="20" y="210" width="120" height="50" rx="3" fill="#f5f0e8" stroke="#2c2416" strokeWidth="1.5" />
        <text x="80" y="232" textAnchor="middle" className="fill-ink" style={{ fontSize: '11px', fontFamily: 'Inter', fontWeight: 600 }}>Result</text>
        <text x="80" y="247" textAnchor="middle" className="fill-ink-muted" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>VERIFIED | FAILED | UNKNOWN</text>

        {/* Feedback loop arrow */}
        <path d="M365 240 L365 210 Q365 200 355 200 L300 200 Q290 200 290 190 L290 120 Q290 110 280 110 L245 110 Q235 110 235 120" stroke="#c4956a" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arrowhead)" />
        <text x="330" y="105" textAnchor="middle" className="fill-ochre-dark" style={{ fontSize: '8px', fontFamily: 'JetBrains Mono' }}>retry / recover</text>

        {/* Arrowhead marker */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#c4956a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

// ============ NAVIGATION ============
const navItems = [
  { label: 'Product', href: '/about' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Research', href: '/research' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Community', href: '/community' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Support', href: '/support' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <header className="sticky top-0 z-50 paper-texture border-b border-wheat-dark/30 no-print backdrop-blur-[2px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          <TomWordmark size="sm" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-sans text-ink-light hover:text-ink transition-colors relative py-1 ${
                  location.pathname === item.href ? 'nav-active text-ink font-medium' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-ink-muted hover:text-ink transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <a
              href="https://github.com/Raghav509/TOM"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
              aria-label="GitHub repository"
            >
              <Github size={18} />
              <span className="hidden md:inline text-xs font-mono">GitHub</span>
            </a>
            <Link
              to="/docs/quick-start"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-parchment text-sm font-sans font-medium rounded-sm hover:bg-ink-light transition-colors"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-ink-muted hover:text-ink"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="pb-4 animate-fade-in">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                placeholder="Search documentation, capabilities, research..."
                className="w-full pl-10 pr-4 py-2.5 bg-ivory border border-wheat-dark/40 rounded-sm text-sm font-sans text-ink placeholder:text-ink-muted focus:outline-none focus:border-ochre"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-wheat-dark/30 paper-texture animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map(item => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2.5 text-sm font-sans rounded-sm transition-colors ${
                  location.pathname === item.href
                    ? 'bg-wheat/50 text-ink font-medium'
                    : 'text-ink-light hover:bg-wheat/30'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <hr className="editorial-rule my-2" />
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer"
              className="px-3 py-2.5 text-sm font-sans text-ink-light hover:bg-wheat/30 rounded-sm flex items-center gap-2">
              <Github size={16} /> GitHub Repository
            </a>
            <Link to="/docs/quick-start" className="mt-2 px-4 py-2.5 bg-ink text-parchment text-sm font-sans font-medium rounded-sm text-center">
              Get Started →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============ FOOTER ============
export function Footer() {
  return (
    <footer className="paper-texture-dark border-t border-wheat-dark/40 mt-auto relative">
      {/* Decorative top rule */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-ochre/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <TomWordmark size="sm" />
            <p className="mt-3 text-xs font-sans text-ink-muted max-w-xs leading-relaxed">
              An open-source personal AI agent runtime. Built to act, observe, and verify. Apache-2.0 licensed.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-3">Project</h4>
            <ul className="space-y-2 text-sm font-sans text-ink-light">
              <li><Link to="/about" className="hover:text-ink transition-colors">About</Link></li>
              <li><Link to="/capabilities" className="hover:text-ink transition-colors">Capabilities</Link></li>
              <li><Link to="/roadmap" className="hover:text-ink transition-colors">Roadmap</Link></li>
              <li><Link to="/research" className="hover:text-ink transition-colors">Research</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-3">Resources</h4>
            <ul className="space-y-2 text-sm font-sans text-ink-light">
              <li><Link to="/docs" className="hover:text-ink transition-colors">Documentation</Link></li>
              <li><Link to="/docs/api-reference" className="hover:text-ink transition-colors">API Reference</Link></li>
              <li><Link to="/docs/quick-start" className="hover:text-ink transition-colors">Quick Start</Link></li>
              <li><Link to="/faq" className="hover:text-ink transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-muted mb-3">Community</h4>
            <ul className="space-y-2 text-sm font-sans text-ink-light">
              <li><Link to="/community" className="hover:text-ink transition-colors">Community</Link></li>
              <li><Link to="/contribute" className="hover:text-ink transition-colors">Contribute</Link></li>
              <li><Link to="/support" className="hover:text-ink transition-colors">Support TOM</Link></li>
              <li><a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors flex items-center gap-1">GitHub <ExternalLink size={10} /></a></li>
            </ul>
          </div>
        </div>
        <hr className="editorial-rule mb-6" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans text-ink-muted">
          <p>TOM is an open-source project. Licensed under Apache-2.0. No trademark, institutional affiliation, or funding claims are made.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-ink transition-colors">Contact</Link>
            <Link to="/security" className="hover:text-ink transition-colors">Security</Link>
            <a href="https://github.com/Raghav509/TOM" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              <Github size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ SCROLL TO TOP ============
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-ink/80 text-parchment rounded-sm shadow-lg hover:bg-ink transition-colors flex items-center justify-center no-print"
      aria-label="Scroll to top"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 11V3M7 3L3 7M7 3L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ============ LAYOUT ============
export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col paper-texture text-ink">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

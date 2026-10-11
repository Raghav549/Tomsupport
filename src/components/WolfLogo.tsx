import React from 'react';

export function WolfLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* Wolf head - geometric, elegant */}
      <path d="M32 4L14 18v16l6 8h4l8 14 8-14h4l6-8V18L32 4z" fill="currentColor" />
      {/* Inner ear detail */}
      <path d="M20 16l6-6v10l-6 4z" fill="rgba(255,255,255,0.15)" />
      <path d="M44 16l-6-6v10l6 4z" fill="rgba(255,255,255,0.15)" />
      {/* Eyes */}
      <ellipse cx="24" cy="28" rx="3" ry="2.5" fill="#fff" />
      <ellipse cx="40" cy="28" rx="3" ry="2.5" fill="#fff" />
      <circle cx="24.5" cy="28" r="1.5" fill="currentColor" />
      <circle cx="40.5" cy="28" r="1.5" fill="currentColor" />
      {/* Snout */}
      <path d="M28 34l4 4 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Nose */}
      <ellipse cx="32" cy="35" rx="2" ry="1.5" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

export function WolfMark({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 2L6 10v10l4 4h2l4 6 4-6h2l4-4V10L16 2z" fill="currentColor" />
      <circle cx="12" cy="15" r="1.2" fill="#fff" />
      <circle cx="20" cy="15" r="1.2" fill="#fff" />
      <path d="M14 20l2 2 2-2" stroke="#fff" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function WolfWordmark({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'text-white' : 'text-black';
  return (
    <a href="/" className={`flex items-center gap-2.5 group ${color}`} aria-label="TOM Home">
      <WolfLogo size={30} className={`transition-transform duration-300 group-hover:scale-105 ${color}`} />
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight leading-none">TOM</span>
        <span className="text-[9px] font-mono uppercase tracking-[0.15em] opacity-50 leading-none mt-0.5">Agent Runtime</span>
      </div>
    </a>
  );
}

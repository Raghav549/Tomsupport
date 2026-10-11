import React from 'react';

/**
 * TOM Wolf-Face Emblem
 * Original geometric wolf head design representing intelligence, focus, and precision.
 * Used consistently across: navigation, footer, favicon, PDFs, loading states, donation receipts.
 */
export function WolfLogo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {/* Left ear */}
      <path d="M18 8L8 24L16 22L22 14L18 8Z" fill="currentColor" />
      {/* Right ear */}
      <path d="M46 8L56 24L48 22L42 14L46 8Z" fill="currentColor" />
      {/* Main head shape */}
      <path d="M16 22C16 22 12 28 12 34C12 40 16 46 22 50L32 56L42 50C48 46 52 40 52 34C52 28 48 22 48 22L42 18L32 16L22 18L16 22Z" fill="currentColor" />
      {/* Inner ear highlights */}
      <path d="M18 12L12 22L17 20L20 15L18 12Z" fill="rgba(255,255,255,0.12)" />
      <path d="M46 12L52 22L47 20L44 15L46 12Z" fill="rgba(255,255,255,0.12)" />
      {/* Forehead detail */}
      <path d="M26 20L32 18L38 20L36 24L32 22L28 24L26 20Z" fill="rgba(255,255,255,0.08)" />
      {/* Eye sockets */}
      <ellipse cx="24" cy="32" rx="5" ry="4" fill="rgba(255,255,255,0.15)" />
      <ellipse cx="40" cy="32" rx="5" ry="4" fill="rgba(255,255,255,0.15)" />
      {/* Eyes - almond shaped */}
      <path d="M20 32C20 30 22 28.5 24 28.5C26 28.5 28 30 28 32C28 34 26 35.5 24 35.5C22 35.5 20 34 20 32Z" fill="#fff" />
      <path d="M36 32C36 30 38 28.5 40 28.5C42 28.5 44 30 44 32C44 34 42 35.5 40 35.5C38 35.5 36 34 36 32Z" fill="#fff" />
      {/* Pupils - focused forward */}
      <circle cx="24.5" cy="32" r="2" fill="currentColor" />
      <circle cx="40.5" cy="32" r="2" fill="currentColor" />
      {/* Eye shine */}
      <circle cx="23.5" cy="31" r="0.7" fill="rgba(255,255,255,0.6)" />
      <circle cx="39.5" cy="31" r="0.7" fill="rgba(255,255,255,0.6)" />
      {/* Snout bridge */}
      <path d="M29 36L32 34L35 36L34 42L32 44L30 42L29 36Z" fill="rgba(255,255,255,0.1)" />
      {/* Nose */}
      <path d="M29 42C29 40.5 30.5 39 32 39C33.5 39 35 40.5 35 42C35 43.5 33.5 45 32 45C30.5 45 29 43.5 29 42Z" fill="rgba(255,255,255,0.25)" />
      {/* Mouth line */}
      <path d="M28 47L32 50L36 47" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cheek fur lines */}
      <path d="M16 36L20 38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M16 40L19 41" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M48 36L44 38" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M48 40L45 41" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
    </svg>
  );
}

/**
 * Compact wolf mark for small spaces (nav, badges, etc.)
 */
export function WolfMark({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M9 4L4 12L8 11L11 7L9 4Z" fill="currentColor" />
      <path d="M23 4L28 12L24 11L21 7L23 4Z" fill="currentColor" />
      {/* Head */}
      <path d="M8 11C8 11 6 14 6 17C6 20 8 23 11 25L16 28L21 25C24 23 26 20 26 17C26 14 24 11 24 11L21 9L16 8L11 9L8 11Z" fill="currentColor" />
      {/* Eyes */}
      <ellipse cx="12" cy="16" rx="2.2" ry="1.8" fill="#fff" />
      <ellipse cx="20" cy="16" rx="2.2" ry="1.8" fill="#fff" />
      <circle cx="12.2" cy="16" r="1" fill="currentColor" />
      <circle cx="20.2" cy="16" r="1" fill="currentColor" />
      {/* Nose */}
      <ellipse cx="16" cy="21" rx="1.5" ry="1.2" fill="rgba(255,255,255,0.3)" />
      {/* Mouth */}
      <path d="M14 23.5L16 25L18 23.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Wolf wordmark combining logo + text
 */
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

/**
 * Wolf icon for loading states, favicons, etc.
 */
export function WolfSpinner({ size = 40 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <WolfLogo size={size} className="text-black animate-pulse" />
    </div>
  );
}

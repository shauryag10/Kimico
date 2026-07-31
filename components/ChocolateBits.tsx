/** Tiny chocolate-themed SVG ornaments used in the scroll animations. */

export function ChocoPiece({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="1" y="1" width="18" height="18" rx="4" fill="#31190d" />
      <rect x="3.6" y="3.6" width="12.8" height="12.8" rx="2.5" fill="#54301a" />
      <rect x="6.4" y="6.4" width="7.2" height="7.2" rx="1.6" fill="#6d4220" />
      <path
        d="M4 5.2c.5-.9 1.4-1.5 2.4-1.7"
        stroke="#8a5a30"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A classic twist-wrapped candy in brand-red foil — reads clearly at ~24px. */
export function WrappedChoco({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 22" fill="none" aria-hidden="true" className={className}>
      {/* twist wrappers */}
      <path d="M12 11 4 4.6q2.2 4.2 1.6 6.4Q6.2 13.2 4 17.4Z" fill="#d5161e" />
      <path d="M28 11l8-6.4q-2.2 4.2-1.6 6.4.6 2.2 1.6 6.4Z" fill="#d5161e" />
      <path d="M12 11 7 8.4M12 11l-5 2.6" stroke="#8f0d13" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M28 11l5-2.6M28 11l5 2.6" stroke="#8f0d13" strokeWidth="0.8" strokeLinecap="round" />
      {/* crimp where the twist meets the body */}
      <path d="M11.9 8.2c-1 1.8-1 3.8 0 5.6" stroke="#9c0f15" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M28.1 8.2c1 1.8 1 3.8 0 5.6" stroke="#9c0f15" strokeWidth="0.9" strokeLinecap="round" />
      {/* candy body */}
      <circle cx="20" cy="11" r="8" fill="#e01b22" />
      <ellipse cx="20" cy="12.8" rx="7" ry="5.6" fill="#b31218" opacity="0.5" />
      {/* wrapper stripes */}
      <path
        d="M16 4.4c1.6 3.4 1.9 10 .6 13.4"
        stroke="#f6e7c2"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M23.2 4.1c1.6 3.5 1.9 10.2.6 13.7"
        stroke="#f6e7c2"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="20" cy="11" r="8" stroke="#9c0f15" strokeWidth="0.9" />
      {/* gloss */}
      <ellipse
        cx="16.6"
        cy="7"
        rx="2.9"
        ry="1.7"
        fill="#ffffff"
        opacity="0.55"
        transform="rotate(-28 16.6 7)"
      />
    </svg>
  );
}

export function CandyTwist({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 14" fill="currentColor" aria-hidden="true" className={className}>
      <ellipse cx="15" cy="7" rx="6.2" ry="5.2" />
      <path d="M8.9 7 3 2.6 5.2 7 3 11.4Z" opacity="0.75" />
      <path d="M21.1 7 27 2.6 24.8 7 27 11.4Z" opacity="0.75" />
      <path
        d="M11.5 4.6c1.2 1.6 5.2 1.9 7-.4"
        stroke="#f6f1ea"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

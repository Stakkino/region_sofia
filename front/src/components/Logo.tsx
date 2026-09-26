export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" className="rounded-lg overflow-hidden shrink-0">
        {/* Drapeau de Madagascar : bande blanche (hampe) + rouge/vert */}
        <rect x="0" y="0" width="16" height="40" fill="var(--color-mada-blanc)" />
        <rect x="16" y="0" width="24" height="20" fill="var(--color-mada-rouge)" />
        <rect x="16" y="20" width="24" height="20" fill="var(--color-mada-vert)" />
        {/* Cornes de zébu, en noir pour contraster sur les 3 couleurs */}
        <g transform="translate(0.5, 6) scale(0.5)">
          <path d="M32 40 C 26 40, 22 34, 22 26 C 22 18, 16 12, 8 12"
            stroke="#1E1A16" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M32 40 C 38 40, 42 34, 42 26 C 42 18, 48 12, 56 12"
            stroke="#1E1A16" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M24 40 C 24 46, 28 50, 32 50 C 36 50, 40 46, 40 40 C 40 36, 36 34, 32 34 C 28 34, 24 36, 24 40 Z"
            stroke="#1E1A16" strokeWidth="5" strokeLinejoin="round" fill="none" />
        </g>
      </svg>
      <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-wide">
        SOFIA
      </span>
    </div>
  );
}
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cornes de zébu stylisées */}
        <path
          d="M32 40 C 26 40, 22 34, 22 26 C 22 18, 16 12, 8 12"
          stroke="var(--color-terracotta)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M32 40 C 38 40, 42 34, 42 26 C 42 18, 48 12, 56 12"
          stroke="var(--color-terracotta)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Tête / base */}
        <path
          d="M24 40 C 24 46, 28 50, 32 50 C 36 50, 40 46, 40 40 C 40 36, 36 34, 32 34 C 28 34, 24 36, 24 40 Z"
          stroke="var(--color-vert)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-wide">
        SOFIA
      </span>
    </div>
  );
}
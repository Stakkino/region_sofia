import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/districts", label: "Districts" },
  { href: "/communes", label: "Communes" },
  { href: "/territoire", label: "Territoire" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-fond)]/90 backdrop-blur border-b border-[var(--color-vert)]/15">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-[var(--color-terracotta)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/a-propos#proposer"
          className="hidden md:inline-block text-sm font-medium px-4 py-2 rounded-full bg-[var(--color-vert)] text-[var(--color-fond)] hover:bg-[var(--color-terracotta)] transition-colors"
        >
          Proposer un lieu
        </Link>
      </div>
    </header>
  );
}
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/districts", label: "Districts" },
  { href: "/communes", label: "Communes" },
  { href: "/territoire", label: "Territoire" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-4 z-50 px-4">
      <header className="max-w-6xl mx-auto bg-white/95 backdrop-blur rounded-full shadow-lg shadow-black/5 border border-black/5">
        <div className="px-5 h-16 flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--color-mada-vert)]/10 hover:text-[var(--color-mada-vert)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/a-propos#proposer"
            className="hidden md:inline-block text-sm font-semibold px-5 py-2.5 rounded-full bg-[var(--color-mada-rouge)] text-white hover:bg-[var(--color-mada-vert)] transition-colors"
          >
            Proposer un lieu
          </Link>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav className="md:hidden flex flex-col gap-1 px-5 pb-4 border-t border-black/5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium border-b border-black/5 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/a-propos#proposer"
              onClick={() => setOpen(false)}
              className="mt-3 text-center text-sm font-semibold px-4 py-2.5 rounded-full bg-[var(--color-mada-rouge)] text-white"
            >
              Proposer un lieu
            </Link>
          </nav>
        )}
      </header>
    </div>
  );
}
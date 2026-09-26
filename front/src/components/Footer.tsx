import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, MessengerIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <div className="px-4 mt-24 mb-4">
      <div className="max-w-6xl mx-auto flag-border">
        <footer className="bg-[#161310] text-white/90 rounded-[1.4rem] overflow-hidden">
          <div className="px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl mb-2 text-white">
                SOFIA
              </h3>
              <p className="text-sm text-white/60">
                Système d&apos;Intelligence Territoriale dédié au développement,
                à la valorisation culturelle et à la promotion de la Région Sofia.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-white">Partenariats</h4>
              <p className="text-sm text-white/60 mb-3">
                Établissement, école, lieu touristique ? Rejoignez la plateforme.
              </p>
              <Link
                href="/a-propos#proposer"
                className="inline-block text-sm font-semibold px-4 py-2 rounded-full bg-[var(--color-mada-vert)] text-white hover:bg-[var(--color-mada-rouge)] transition-colors"
              >
                Proposer un établissement
              </Link>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-white">Contact & Support</h4>
              <ul className="text-sm text-white/60 space-y-2">
                <li className="flex items-center gap-2"><Mail size={16} /> jhenstakkino@gmail.com</li>
                <li className="flex items-center gap-2"><Phone size={16} /> +261 38 80 865 33</li>
                <li className="flex items-center gap-2"><Phone size={16} /> +261 32 49 559 40</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-white">Réseaux Sociaux</h4>
              <p className="text-sm text-white/60 mb-3">NJAKANERA Stakkino</p>
              <div className="flex gap-3">
                <span className="p-2 rounded-full bg-white/10 hover:bg-[var(--color-mada-rouge)] transition-colors cursor-pointer">
                  <FacebookIcon className="w-5 h-5" />
                </span>
                <span className="p-2 rounded-full bg-white/10 hover:bg-[var(--color-mada-rouge)] transition-colors cursor-pointer">
                  <MessengerIcon className="w-5 h-5" />
                </span>
                <span className="p-2 rounded-full bg-white/10 hover:bg-[var(--color-mada-rouge)] transition-colors cursor-pointer">
                  <InstagramIcon className="w-5 h-5" />
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>&copy; 2026 Digital Sofia System — Tous droits réservés.</p>
            <div className="flex items-center gap-2 bg-white/95 rounded-full px-3 py-1.5">
              <span className="text-black/60">Partenaire &amp; sponsor officiel</span>
              <Image src="/partners/nostos-logo.png" alt="Nostos" width={60} height={30} />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
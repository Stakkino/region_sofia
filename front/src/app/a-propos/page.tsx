import { Eye, ShieldCheck, Database, MapPinned, GraduationCap, Landmark, Mail, Phone, MessageCircle } from "lucide-react";

export default function AProposPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="px-6 pt-16 pb-20 text-center max-w-3xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-(--color-mada-vert) mb-3">
          Découvrez notre mission
        </p>
        <h1 className="font-(family-name:--font-heading) text-4xl sm:text-5xl mb-5">
          L&apos;Intelligence Territoriale au service de la{" "}
          <span className="text-(--color-mada-rouge) italic">Région Sofia</span>
        </h1>
        <p className="text-(--color-muted) text-lg">
          SOFIA (Système d&apos;Intelligence Territoriale) est une plateforme numérique
          d&apos;avant-garde conçue pour centraliser, analyser et valoriser les dynamiques
          de développement, le patrimoine culturel et le potentiel économique de notre territoire.
        </p>
      </section>

      {/* Vision / Mission */}
      <section className="px-6 mb-20">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <Eye className="text-(--color-mada-vert) mb-4" size={28} />
            <h2 className="font-(family-name:--font-heading) text-2xl mb-3">Notre Vision</h2>
            <p className="text-(--color-muted)">
              Devenir le hub numérique de référence pour la gouvernance locale et
              l&apos;attractivité territoriale. Nous croyons qu&apos;un développement
              durable et harmonieux de la Région Sofia repose sur une connaissance
              précise de ses réalités et sur l&apos;accès transparent à l&apos;information.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ShieldCheck className="text-(--color-mada-vert) mb-4" size={28} />
            <h2 className="font-(family-name:--font-heading) text-2xl mb-3">Notre Mission</h2>
            <p className="text-(--color-muted)">
              Connecter les institutions, les acteurs économiques, les établissements
              d&apos;enseignement et les citoyens. À travers la collecte de données
              stratégiques, SOFIA éclaire la prise de décision, stimule les partenaires
              locaux et fait rayonner la culture unique de la région.
            </p>
          </div>
        </div>
      </section>

      {/* Les 4 Piliers */}
      <section className="px-6 mb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-(family-name:--font-heading) text-3xl text-center mb-10">
            Les Piliers du Système SOFIA
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Pilier
              icon={<Database size={24} />}
              titre="Intelligence Globale"
              texte="Centralisation des indicateurs démographiques, économiques et logistiques pour une cartographie fidèle des opportunités régionales."
            />
            <Pilier
              icon={<MapPinned size={24} />}
              titre="Valorisation du Territoire"
              texte="Mise en lumière des communes, des infrastructures et des initiatives locales afin de renforcer l'attractivité et le tourisme."
            />
            <Pilier
              icon={<GraduationCap size={24} />}
              titre="Réseau Éducatif & Public"
              texte="Intégration et promotion des lycées, universités, centres de formation et services publics qui bâtissent le capital humain de la région."
            />
            <Pilier
              icon={<Landmark size={24} />}
              titre="Culture & Identité"
              texte="Préservation de l'héritage historique, des traditions et du patrimoine immatériel qui font la fierté de la communauté Sofia."
            />
          </div>
        </div>
      </section>

      {/* Proposer un lieu */}
      <section id="proposer" className="px-6 pb-24">
        <div className="max-w-3xl mx-auto bg-(--color-mada-vert) rounded-3xl p-8 sm:p-12 text-white text-center">
          <h2 className="font-(family-name:--font-heading) text-3xl mb-4">
            Vous gérez un hôtel, un restaurant ou un lieu touristique ?
          </h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">
            Rejoignez la plateforme SOFIA et faites découvrir votre établissement aux
            visiteurs de la région. C&apos;est simple : envoyez-nous vos informations
            (nom, catégorie, photos, contact, localisation) par WhatsApp ou email,
            et nous les intégrons directement sur le site.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 text-left mb-8">
            <Step numero="1" texte="Préparez vos informations : nom, description, photos, adresse et contact" />
            <Step numero="2" texte="Envoyez-les par WhatsApp ou email à l'un des contacts ci-dessous" />
            <Step numero="3" texte="Votre établissement apparaît sur SOFIA sous quelques jours" />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
            <a
                href="mailto:jhenstakkino@gmail.com"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white text-(--color-mada-vert) font-semibold px-5 py-3 rounded-full text-sm sm:text-base hover:bg-(--color-fond) transition-colors"
            >
                <Mail size={18} className="shrink-0" /> jhenstakkino@gmail.com
            </a>
            <a
                href="https://wa.me/261388086533"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white/15 border border-white/30 font-semibold px-5 py-3 rounded-full text-sm sm:text-base hover:bg-white/25 transition-colors"
            >
                <MessageCircle size={18} className="shrink-0" /> +261 38 80 865 33
            </a>
            <a
                href="https://wa.me/261324955940"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white/15 border border-white/30 font-semibold px-5 py-3 rounded-full text-sm sm:text-base hover:bg-white/25 transition-colors"
            >
                <Phone size={18} className="shrink-0" /> +261 32 49 559 40
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Pilier({ icon, titre, texte }: { icon: React.ReactNode; titre: string; texte: string }) {
  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm">
      <div className="text-(--color-mada-vert) mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{titre}</h3>
      <p className="text-sm text-(--color-muted)">{texte}</p>
    </div>
  );
}

function Step({ numero, texte }: { numero: string; texte: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-4">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white text-(--color-mada-vert) font-bold text-sm mb-2">
        {numero}
      </span>
      <p className="text-sm text-white/90">{texte}</p>
    </div>
  );
}
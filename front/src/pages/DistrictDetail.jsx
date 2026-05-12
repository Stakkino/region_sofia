import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDistrictDetail } from '../services/api';
import { ArrowLeft, CloudSun, Map, History, ShieldAlert, Building2 } from 'lucide-react';

const DistrictDetail = () => {
    const { id } = useParams();
    const [district, setDistrict] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDistrictDetail(id)
            .then(res => {
                setDistrict(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="dd-loading">
            <div className="dd-loading-inner">
                <div className="dd-loading-ring" />
                <p className="dd-loading-text">Chargement du district…</p>
            </div>
        </div>
    );

    if (!district) return (
        <div className="dd-loading">
            <p className="dd-loading-text">Ce district est introuvable.</p>
        </div>
    );

    const iconMap = {
        histoire: <History size={18} />,
        fady:     <ShieldAlert size={18} />,
    };

    return (
        <div className="dd-root">

            {/* ── HERO HEADER ── */}
            <header className="dd-header">
                <div className="dd-header-bg" />
                <div className="dd-header-vignette" />

                <div className="dd-header-inner">
                    <Link to="/" className="dd-back-link">
                        <ArrowLeft size={16} />
                        <span>Retour à l'accueil</span>
                    </Link>

                    <div className="dd-header-meta">
                        <span className="dd-header-overline">Région Sofia · Madagascar</span>
                        <h1 className="dd-header-title">District de<br /><em>{district.nom}</em></h1>
                        <p className="dd-header-sub">Code postal {district.code_postal}</p>
                    </div>
                </div>
            </header>

            {/* ── BODY ── */}
            <main className="dd-main">
                <div className="dd-grid">

                    {/* ── COL GAUCHE ── */}
                    <div className="dd-col-left">

                        {/* Contenus IA */}
                        {district.contenus_ia?.map((info, index) => (
                            <article key={index} className="dd-card dd-card-ia">
                                <div className="dd-card-tag">
                                    <span className="dd-tag-icon">{iconMap[info.type_contenu] ?? <History size={18} />}</span>
                                    <span className="dd-tag-label">
                                        {info.type_contenu === 'histoire' ? 'Histoire & Patrimoine' : 'Culture & Traditions'}
                                    </span>
                                </div>
                                <p className="dd-ia-text">{info.texte}</p>
                            </article>
                        ))}

                        {/* Communes */}
                        <div className="dd-card">
                            <div className="dd-card-tag">
                                <span className="dd-tag-icon"><Map size={18} /></span>
                                <span className="dd-tag-label">Communes du district</span>
                                <span className="dd-badge">{district.nb_commune}</span>
                            </div>

                            <div className="dd-communes-grid">
                                {district.communes?.map(c => (
                                    <div key={c.id} className="dd-commune-item">
                                        <span className="dd-commune-name">{c.nom}</span>
                                        <span className="dd-commune-pop">{c.population?.toLocaleString('fr-FR')} habitants</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── COL DROITE ── */}
                    <div className="dd-col-right">

                        {/* Météo */}
                        <div className="dd-card dd-card-meteo">
                            <div className="dd-meteo-header">
                                <div>
                                    <p className="dd-meteo-overline">Conditions actuelles</p>
                                    <h2 className="dd-meteo-title">Météo locale</h2>
                                </div>
                                <div className="dd-meteo-icon">
                                    <CloudSun size={28} />
                                </div>
                            </div>

                            <div className="dd-meteo-temp">
                                {district.meteo_info?.temp ?? '--'}
                                <span className="dd-meteo-unit">°C</span>
                            </div>

                            <div className="dd-meteo-state">{district.meteo_info?.etat ?? '---'}</div>

                            <div className="dd-meteo-divider" />

                            <p className="dd-meteo-desc">{district.description_climat}</p>
                        </div>

                        {/* Statistiques */}
                        <div className="dd-card dd-card-stats">
                            <div className="dd-card-tag">
                                <span className="dd-tag-icon dd-tag-icon--light"><Building2 size={18} /></span>
                                <span className="dd-tag-label dd-tag-label--light">Données territoriales</span>
                            </div>

                            <div className="dd-stats-list">
                                <div className="dd-stat-row">
                                    <span className="dd-stat-label">Superficie</span>
                                    <span className="dd-stat-value">{district.superficie} km²</span>
                                </div>
                                <div className="dd-stat-row">
                                    <span className="dd-stat-label">Distance depuis Antsohihy</span>
                                    <span className="dd-stat-value">{district.distance_vers_antsohihy} km</span>
                                </div>
                                <div className="dd-stat-row">
                                    <span className="dd-stat-label">Nombre de communes</span>
                                    <span className="dd-stat-value">{district.nb_commune}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

        </div>
    );
};

export default DistrictDetail;

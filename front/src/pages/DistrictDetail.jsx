import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDistrictDetail } from '../services/api';
import { ArrowLeft, CloudSun, Map, History, ShieldAlert, Building2 } from 'lucide-react';

const DistrictDetail = () => {
    const { id } = useParams(); // Maka ny ID avy amin'ny URL (ex: /district/1)
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

    if (loading) return <div className="p-20 text-center font-bold">Fandinihana ny antsipiriany...</div>;
    if (!district) return <div className="p-20 text-center">Tsy hita io district io.</div>;

    return (
        <div className="min-h-screen bg-sofia-light pb-20">
            {/* NAVIGATION & HEADER */}
            <div className="bg-sofia-green text-white p-8 shadow-xl">
                <Link to="/" className="inline-flex items-center text-sofia-gold hover:underline mb-6">
                    <ArrowLeft size={20} className="mr-2" /> Hiverina amin'ny fandraisana
                </Link>
                <h1 className="text-5xl font-black uppercase tracking-tighter">
                    District {district.nom}
                </h1>
                <p className="opacity-70 mt-2 font-mono">Code Postal: {district.code_postal} | Région SOFIA</p>
            </div>

            <div className="container mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* COLONNE GAUCHE: IA & CULTURE */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Tantara & Fady avy amin'ny IA */}
                    {district.contenus_ia?.map((info, index) => (
                        <div key={index} className="glass-card p-8 fade-in-up">
                            <div className="flex items-center gap-3 mb-4 text-sofia-green">
                                {info.type_contenu === 'histoire' ? <History /> : <ShieldAlert />}
                                <h2 className="text-2xl font-bold capitalize">{info.type_contenu}</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed first-letter:text-4xl first-letter:font-bold">
                                {info.texte}
                            </p>
                        </div>
                    ))}

                    {/* LISITRY NY COMMUNE */}
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Map className="text-sofia-gold" /> Ireo Kaominina ({district.nb_commune})
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {district.communes?.map(c => (
                                <div key={c.id} className="bg-white p-4 rounded-lg border-l-4 border-sofia-green shadow-sm">
                                    <span className="font-bold text-sofia-green">{c.nom}</span>
                                    <p className="text-xs text-gray-400">{c.population} mponina</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COLONNE DROITE: METEO & INFOS TECHNIQUES */}
                <div className="space-y-8">
                    {/* METEO DINAMIKA (JSONField avy amin'ny IA) */}
                    <div className="bg-white p-8 rounded-3xl shadow-2xl border-t-8 border-sofia-gold">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-xl font-black">MÉTÉO 6H</h2>
                            <CloudSun size={32} className="text-sofia-gold animate-bounce" />
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500">Toetr'andro</span>
                                <span className="font-bold">{district.meteo_info?.etat || "---"}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-gray-500">Temperature</span>
                                <span className="font-bold text-2xl">{district.meteo_info?.temp || "--"}°C</span>
                            </div>
                            <p className="text-sm italic text-gray-500 mt-4">
                                {district.description_climat}
                            </p>
                        </div>
                    </div>

                    {/* STATISTIQUES */}
                    <div className="glass-card p-8 bg-sofia-green text-white">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Building2 /> Antontan'isa
                        </h2>
                        <div className="text-sm space-y-2 opacity-90">
                            <p>Velarantany: {district.superficie} km²</p>
                            <p>Halavirana: {district.distance_vers_antsohihy} km miala an'Antsohihy</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DistrictDetail;
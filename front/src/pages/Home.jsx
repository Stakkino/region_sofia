import React, { useEffect, useState } from 'react';
import { getRegions } from '../services/api';
import { MapPin, Wind, ArrowRight } from 'lucide-react';

const Home = () => {
    const [regionData, setRegionData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Automatisation de l'année pour le côté "Pro"
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        getRegions()
            .then(res => {
                // On prend la première région (SOFIA)
                if(res.data.length > 0) setRegionData(res.data[0]);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur Backend:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="h-screen flex items-center justify-center bg-sofia-light text-sofia-green font-bold">
            Chargement des données de la Sofia...
        </div>
    );

    return (
        <div className="min-h-screen bg-sofia-light">
            {/* --- HERO SECTION --- */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-sofia-green text-white">
                <div className="container mx-auto px-6 z-10">
                    <div className="max-w-3xl fade-in-up">
                        <h1 className="text-6xl font-bold mb-4 tracking-tight">
                            Région <span className="text-sofia-gold">{regionData?.nom || "SOFIA"}</span>
                        </h1>
                        <p className="text-xl mb-8 leading-relaxed opacity-90 font-light">
                            Explorez le cœur du Nord-Ouest Malgache. Une terre d'accueil Tsimihety, 
                            sublimée par l'intelligence artificielle pour une expérience voyageur inédite.
                        </p>
                        
                        {/* Rectification du conflit flex/inline-flex */}
                        <div className="inline-flex items-center gap-4 glass-card p-4 text-sofia-green font-medium">
                            <Wind className="text-sofia-gold animate-pulse" />
                            <span>Météo locale : {regionData?.meteo_actuelle || "Calcul en cours..."}</span>
                        </div>
                    </div>
                </div>
                
                {/* Rectification v4 : bg-linear-to-t au lieu de bg-gradient-to-t */}
                <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-sofia-light to-transparent"></div>
            </section>

            {/* --- SECTION DISTRICTS --- */}
            <section className="container mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="fade-in-up">
                        <h2 className="text-4xl font-bold text-sofia-green">Nos Districts</h2>
                        <div className="w-24 h-1.5 bg-sofia-gold mt-3 rounded-full"></div>
                    </div>
                    <p className="text-gray-600 max-w-md italic border-l-4 border-sofia-gold pl-4">
                        La Sofia s'étend sur {regionData?.nb_district || 7} districts majeurs, 
                        allant des plaines rizicoles aux massifs montagneux.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {regionData?.districts?.map((district) => (
                        <div key={district.id} className="glass-card district-card-hover group overflow-hidden">
                            <div className="h-56 bg-gray-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-sofia-green/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                <span className="absolute top-4 right-4 bg-sofia-green text-white px-4 py-1 rounded-full text-xs font-black tracking-widest shadow-lg">
                                    CP {district.code_postal}
                                </span>
                            </div>
                            
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-3 text-sofia-green">{district.nom}</h3>
                                <div className="flex items-center text-gray-500 mb-6 text-sm font-medium">
                                    <MapPin size={16} className="mr-2 text-sofia-gold" />
                                    {district.distance_vers_antsohihy} km d'Antsohihy
                                </div>
                                
                                <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3">
                                    {district.description_climat || "Informations climatiques en cours de synchronisation par l'IA..."}
                                </p>
                                
                                <button className="flex items-center gap-2 text-sofia-green font-black uppercase text-xs tracking-widest group-hover:gap-4 transition-all">
                                    Découvrir le district <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SIGNATURE PROFESSIONNELLE --- */}
            <footer className="bg-white border-t border-gray-100 py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-8 flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-sofia-gold rounded-full"></div>
                        <div className="w-2 h-2 bg-sofia-green rounded-full"></div>
                        <div className="w-2 h-2 bg-sofia-gold rounded-full"></div>
                    </div>
                    <p className="text-gray-400 text-sm tracking-[0.2em] uppercase mb-4">
                        Projet Intelligence Territoriale
                    </p>
                    <h3 className="text-xl font-bold text-sofia-green">
                        NJAKANERA Nostos Duk'S Stakkino
                    </h3>
                    <p className="text-gray-500 mt-2 font-light">
                        Backend Developer & AI Specialist
                    </p>
                    <p className="mt-10 text-xs text-gray-300 font-mono">
                        © {currentYear} — DIGITAL SOFIA SYSTEM V1.0
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
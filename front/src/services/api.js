import axios from 'axios'

// On définit l'URL de base de ton API Django
const API_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL : API_URL,
    headers : {
        'Content-Type': 'application/json',
    }
}) ;

export const getRegions = () => api.get('regions/');
export const getDistricts = () => api.get('districts/');
export const getDistrictDetail = (id) => api.get(`districts/${id}/`);
export const getEtablissements = (cat) => api.get(`etablissements/?categorie=${cat}`);

export default api;
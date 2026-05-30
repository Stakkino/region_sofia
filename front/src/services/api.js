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
// Maka ny antsipirian'ny commune iray (Infrastructures, Commercial, Culture, Fokontany)
export const getCommuneDetail = (id) => api.get(`communes/${id}/`);

// Maka ny lisitry ny commune rehetra sy ny isan'ny blocs ao aminy ho an'ny pejy TerritoirePresentation
export const getTerritoirePresentation = () => api.get('territoire-presentation/');

export default api;
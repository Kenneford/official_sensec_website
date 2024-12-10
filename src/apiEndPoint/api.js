import config from "../../config";
const API_BASE_URL = import.meta.env.VITE_API_URL;
export const API_ENDPOINT = `${config?.apiUrl}/api/sensec_db/v1`;
export const SENSEC_API_ENDPOINT = `${API_BASE_URL}/api/sensec_db/v1`;

import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
  (config) => {                                    // Función que se ejecuta ANTES de cada petición
    const token = localStorage.getItem('accessToken');  // Obtiene token guardado
    if (token) {                                   // Si hay token
      config.headers.Authorization = `Bearer ${token}`;  // Lo agrega al header
    }
    return config;                                 // Continúa con la petición
  },
  (error) => {                                     // Si hay error en la petición
    return Promise.reject(error);                  // Rechaza la promesa
  }
);

api.interceptors.response.use(
  (response) => response,                          // Si respuesta es exitosa, la pasa tal como está
  async (error) => {                                 // Si hay error en la respuesta
    const originalRequest = error.config;         // Guarda la petición original
    
    // Línea 27: Si es error 401 (no autorizado) Y no se ha reintentado antes
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      originalRequest._retry = true;               // Marca que ya se reintentó
      try {
        // Línea 30: Obtiene refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          // Líneas 32-34: Llama endpoint para renovar token
          const response = await axios.post(`${API_URL}/authentication/refresh-token`, {
            refreshToken
          });
          
          // Línea 35: Extrae nuevo token de acceso
          const { accessToken } = response.data;
          
          // Línea 36: Guarda nuevo token
          localStorage.setItem('accessToken', accessToken);
          
          // Líneas 37-39: Agrega nuevo token a petición original y la reintenta
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Líneas 41-45: Si renovación falla, limpia todo y redirige a login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    // Línea 47: Si no es error 401, rechaza el error normalmente
    return Promise.reject(error);
  }
);

export default api;
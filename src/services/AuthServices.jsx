import api from "./api";

export const loginService = async (credentials) => {
  try {
    const response = await api.post("/authentication/login", credentials);

    return response.data.data;
  } catch (error) {
    console.log("error en login", error);
    const errorMessage = error.response?.data?.error || error.message || "Error en el login";
    throw new Error(errorMessage);
  }
};

export const registerService = async (userData) => {
  try {
    const response = await api.post("/authentication/register", userData);
    return response.data.data;
  } catch (error) {
    console.log("error en register", error);
    const errorMessage = error.response?.data?.error || error.message || "Error en el registro";
    throw new Error(errorMessage);
  }
};

export const refreshTokenService = async (refreshToken) => {
  try {
    const response = await api.post("/authentication/refresh-token", { refreshToken });
    return response.data.data;
  } catch (error) {
    console.log("error en refresh token", error);
    const errorMessage = error.response?.data?.error || error.message || "Error en refresh token";
    throw new Error(errorMessage);
  }
};

export const logoutService = async () => {
  try {
    const response = await api.post("/authentication/logout");
    return response;
  } catch (error) {
    console.log("error en logout", error);
    throw error;
  } 
};
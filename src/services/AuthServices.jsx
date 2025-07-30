import api from "./api";

export const loginService = async (credentials) => {
  try {
    const response = await api.post("/authentication/login", credentials);
    return response.data;
  } catch (error) {
    console.log("error en login", error);

    throw error;
  }
};



export const registerService = async (userData) => {
  try {
    const response = await api.post("/authentication/register", userData);
    return response.data;
  } catch (error) {
    console.log("error en register", error);
    throw error;
  }

};

export const refreshTokenService = async ({refreshToken}) => {
  try {
    const response = await api.post("/authentication/refresh-token", {refreshToken});
    return response.data;
  } catch (error) {
    console.log("error en refresh token", error);
    throw error;
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
}
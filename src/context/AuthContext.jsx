import React, { createContext, useContext, useReducer, useEffect } from "react";
import { loginService, registerService, refreshTokenService } from "../services/AuthServices";

//Define el estado inicial cuando la app arranca
const initialState = {
  user: null, // No hay usuario logueado al inicio
  token: null, // No hay token de acceso
  refreshToken: null, // No hay token de renovación
  isAuthenticated: false, // Usuario NO está autenticado
  isLoading: true, // La app está cargando (verificando si hay sesión guardada)
  error: null,
};

//Define todas las acciones posibles que puede hacer el usuario
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START", // Empezó a intentar login
  LOGIN_SUCCESS: "LOGIN_SUCCESS", // Login exitoso
  LOGIN_FAILURE: "LOGIN_FAILURE", // Login falló
  REGISTER_START: "REGISTER_START", // Empezó a registrarse
  REGISTER_SUCCESS: "REGISTER_SUCCESS", // Registro exitoso
  REGISTER_FAILURE: "REGISTER_FAILURE", // Registro falló
  LOGOUT: "LOGOUT", // Usuario cerró sesión
  REFRESH_TOKEN: "REFRESH_TOKEN", // Se renovó el token
  CLEAR_ERROR: "CLEAR_ERROR", // Se limpiaron los errores
  SET_LOADING: "SET_LOADING", // Se cambió el estado de carga
};

// Define función que maneja cambios de estado
const authReducer = (state, action) => {
  //Evalúa qué tipo de acción se ejecutó
  switch (action.type) {
    //Si empezó login o registro
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      //Actualiza estado a "cargando" y sin errores
      return {
        ...state, // Mantiene todo lo anterior
        isLoading: true, // Está cargando
        error: null, // Limpia errores previos
      };

    //Si login o registro fueron exitosos
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      //Actualiza el estado con los datos del usuario
      return {
        ...state, // Mantiene estado anterior
        user: action.payload.user, // Guarda datos del usuario
        token: action.payload.accessToken, // Guarda token de acceso
        refreshToken: action.payload.refreshToken, // Guarda token de renovación
        isAuthenticated: true, // Marca como autenticado
        isLoading: false, // Ya no está cargando
        error: null, // Sin errores
      };

    //Si login o registro fueron fallidos
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      //  Limpia todo y guarda el error
      return {
        ...state, // Mantiene estado anterior
        user: null, // No hay usuario
        token: null, // No hay token
        refreshToken: null, // No hay refresh token
        isAuthenticated: false, // No está autenticado
        isLoading: false, // Ya no carga
        error: action.payload, // Guarda el mensaje de error
      };

    //Si se cerro la sesion
    case AUTH_ACTIONS.LOGOUT:
      //  Vuelve al estado inicial pero sin cargar
      return {
        ...initialState, // Todo como al inicio
        isLoading: false, // Pero sin estado de carga
      };

    //Si se renovó el token
    case AUTH_ACTIONS.REFRESH_TOKEN:
      // Solo actualiza el token de acceso
      return {
        ...state, // Mantiene todo
        token: action.payload.accessToken, // Solo cambia el token
      };

    //Si se limpiaron los errores
    case AUTH_ACTIONS.CLEAR_ERROR:
      //  Limpia el error
      return {
        ...state, // Mantiene todo
        error: null, // Limpia el error
      };
    //Si se quiere cambiar estado de carga
    case AUTH_ACTIONS.SET_LOADING:
      //  Solo cambia isLoading
      return {
        ...state, // Mantiene todo
        isLoading: action.payload, // Cambia estado de carga
      };

    default:
      return state;
  }
};

//Crea el contexto (como una "caja" para compartir datos)
const AuthContext = createContext();

//Crea hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext); // Obtiene los datos del contexto
  if (!context) {
    // Si no encuentra el contexto
    throw new Error("useAuth debe ser usado dentro de un AuthProvider"); // Error
  }
  return context; // Devuelve los datos
};

//Define el componente que proveerá los datos a toda la app
export const AuthProvider = ({ children }) => {
  // Usa useReducer para manejar el estado complejo
  const [state, dispatch] = useReducer(authReducer, initialState);

  //  Función para verificar si usuario tiene rol específico
  const hasRole = (role) => {
    return state.user?.role === role; // Compara el rol del usuario con el rol buscado
  };

  //Función para verificar si tiene alguno de varios roles
  const hasAnyRole = (roles) => {
    return roles.includes(state.user?.role); // Ve si el rol está en la lista
  };

  //  Función para verificar si es administrador
  const isAdmin = () => {
    return state.user?.role === "admin"; // Compara si es admin
  };
  //  Función para verificar si es cliente
  const isCustomer = () => {
    return state.user?.role === "customer" || state.user?.role === "cliente";
  };

  // Define función de login
  const login = async (email, password) => {
    try {
      // Dispatch indica que empezó el login
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });

      //  Llama a la API para hacer login
      const response = await loginService(email, password);

      //  Guarda tokens en localStorage del navegador
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      //  Dispatch indica que login fue exitoso
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response,
      });

      // Devuelve resultado exitoso
      return { success: true, data: response };
    } catch (error) {
      // Si hay error, extrae el mensaje
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al iniciar sesión";

      //  Dispatch indica que login falló
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: errorMessage,
      });

      // Devuelve resultado con error
      return { success: false, error: errorMessage };
    }
  };

  // Define función de registro
  const register = async (userData) => {
    try {
      //  Indica que empezó el registro
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });

      // ✅ CORREGIDO: Ahora usa registerService importado correctamente
      const response = await registerService(userData);

      //  Guarda datos en localStorage
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.user));

      //  Indica registro exitoso
      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: response,
      });

      // Devuelve éxito
      return { success: true, data: response };
    } catch (error) {
      //  Extrae mensaje de error
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al registrarse";

      // Indica registro fallido
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: errorMessage,
      });

      // Devuelve error
      return { success: false, error: errorMessage };
    }
  };

  // Define función de logout
  const logout = () => {
    //  Elimina todo del localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    //Actualiza estado a deslogueado
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  //  Define función para renovar token
  const refreshToken = async () => {
    try {
      //  Obtiene refresh token guardado
      const refreshTokenStored = localStorage.getItem("refreshToken");

      //  Si no hay refresh token, error
      if (!refreshTokenStored) {
        throw new Error("No refresh token found");
      }

      // ✅ CORREGIDO: Ahora usa refreshTokenService importado correctamente
      const response = await refreshTokenService(refreshTokenStored);

      //  Guarda nuevo token de acceso
      localStorage.setItem("accessToken", response.accessToken);

      //  Actualiza estado con nuevo token
      dispatch({
        type: AUTH_ACTIONS.REFRESH_TOKEN,
        payload: response,
      });

      //  Devuelve nuevo token
      return response.accessToken;
    } catch (error) {
      //  Si falla, cierra sesión completamente
      logout();

      //  Re-lanza el error
      throw error;
    }
  };

  // Función para limpiar errores
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Hook que se ejecuta cuando componente se monta
  useEffect(() => {
    //  Función interna para inicializar autenticación
    const initAuth = () => {
      try {
        //  Obtiene datos guardados del localStorage
        const token = localStorage.getItem("accessToken");
        const refreshTokenStored = localStorage.getItem("refreshToken");
        const userStored = localStorage.getItem("user");

        // Si hay todos los datos guardados
        if (token && refreshTokenStored && userStored) {
          //  Convierte texto a objeto JavaScript
          const user = JSON.parse(userStored);

          //  Restaura la sesión automáticamente
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: {
              user,
              accessToken: token,
              refreshToken: refreshTokenStored,
            },
          });
        } else {
          //  Si no hay datos, termina la carga
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } catch (error) {
        //  Si hay error, lo muestra en consola
        console.error("Error initializing auth:", error);

        // Limpia todo por seguridad
        logout();
      }
    };

    //  Ejecuta la inicialización
    initAuth();
  }, []); // Array vacío = solo se ejecuta una vez al montar

  //  Crea objeto con todos los valores y funciones
  const contextValue = {
    // Estado actual
    ...state,

    // Funciones de autenticación
    login,
    register,
    logout,
    refreshToken,
    clearError,


    // Funciones de autorización
    hasRole,
    hasAnyRole,
    isAdmin,
    isCustomer,
  };

  //  Retorna el Provider que envuelve la app
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
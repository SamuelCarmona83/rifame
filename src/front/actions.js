const API_URL = import.meta.env.VITE_BACKEND_URL;

// ACCIONES DE AUTENTICACIÓN

export const login = async (dispatch, email, contrasena) => {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contrasena }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.msg || "Error al iniciar sesión" };
    }

    // Despachar acción para actualizar el store
    dispatch({
      type: "login",
      payload: {
        user: data.user,
        token: data.access_token,
      },
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
};

export const logout = (dispatch) => {
  dispatch({ type: "logout" });
};

export const register = async (dispatch, userData) => {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Error al registrarse",
      };
    }

    // Si el backend devuelve token, guardarlo
    if (data.access_token) {
      dispatch({
        type: "login",
        payload: {
          user: data.user,
          token: data.access_token,
        },
      });
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error en registro:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
};

// ACCIONES DE RIFAS

export const getRifaUserVender = async (dispatch, userId, rifaId, token) => {
  try {
    const response = await fetch(`${API_URL}/api/rifa/${userId}/${rifaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: "set_rifa_details",
        payload: data,
      });

      return { success: true, data };
    }

    if (response.status === 401) {
      dispatch({ type: "logout" });
      return { success: false, message: "Sesión expirada", expired: true };
    }

    return { success: false, message: "Error al obtener detalles de la rifa" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error de conexión" };
  }
};

export const getRifas = async (dispatch, userId, token) => {
  try {
    const response = await fetch(`${API_URL}/api/rifa/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: "set_rifas",
        payload: data,
      });

      return { success: true, data };
    }

    // Manejar token expirado
    if (response.status === 401) {
      dispatch({ type: "logout" });
      return { success: false, message: "Sesión expirada", expired: true };
    }

    return { success: false, message: "Error al obtener rifas" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error de conexión" };
  }
};

export const createRifa = async (dispatch, rifaData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/rifa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rifaData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: "add_rifa",
        payload: data,
      });

      return { success: true, data };
    }

    // Manejar token expirado
    if (response.status === 401) {
      dispatch({ type: "logout" });
      return { success: false, message: "Sesión expirada", expired: true };
    }

    return { success: false, message: data.msg || "Error al crear rifa" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error de conexión" };
  }
};

export const deleteRifa = async (dispatch, rifaId, token) => {
  try {
    const response = await fetch(`${API_URL}/api/rifa/${rifaId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      dispatch({
        type: "delete_rifa",
        payload: rifaId,
      });

      return { success: true };
    }

    if (response.status === 401) {
      dispatch({ type: "logout" });
      return { success: false, message: "Sesión expirada", expired: true };
    }

    return { success: false, message: "Error al eliminar rifa" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error de conexión" };
  }
};

// ACCIONES DE COMPRAS/PAGOS

export const getCompras = async (dispatch, userId, token) => {
  try {
    const response = await fetch(`${API_URL}/api/compras/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: "set_compras",
        payload: data,
      });

      return { success: true, data };
    }

    if (response.status === 401) {
      dispatch({ type: "logout" });
      return { success: false, message: "Sesión expirada", expired: true };
    }

    return { success: false, message: "Error al obtener compras" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error de conexión" };
  }
};

export const verificarCompra = async (
  dispatch,
  compraId,
  verificado,
  token,
) => {
  try {
    const response = await fetch(
      `${API_URL}/api/compras/${compraId}/verificar`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ verificado }),
      },
    );

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: "update_compra",
        payload: data,
      });

      return { success: true, data };
    }

    if (response.status === 401) {
      dispatch({ type: "logout" });
      return { success: false, message: "Sesión expirada", expired: true };
    }

    return { success: false, message: "Error al verificar compra" };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error de conexión" };
  }
};

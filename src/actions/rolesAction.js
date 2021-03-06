import {
  MOSTRAR_ROLES,
  MOSTRAR_ROL,
  AGREGAR_ROL,
  EDITAR_ROL,
  BORRAR_ROL,
} from "./types";
import axios from "axios";

//CSS
import Swal from "sweetalert2";

export const mostrarRoles = () => async (dispatch) => {
  const roles = await axios
    .get(`${process.env.REACT_APP_BACKEND_SERVER}/Rol/rols`, {
      headers: { "access-token": localStorage.getItem("access-token") },
    })
    .then((res) => {
      dispatch({
        type: MOSTRAR_ROLES,
        payload: res.data,
      });

      if (res.status === 200) {
        return;
      } else {
        Swal.fire({
          title: "Error!",
          text: "Se ha producido un error al intentar mostrar categorías",
          type: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Error!",
            text: `${err.response.data}`,
            type: "error",
            confirmButtonText: "Aceptar",
          });
          return;
        }
        if (err.response.status === 401) {
          Swal.fire({
            title: "Error!",
            text: `No posee los permisos necesarios`,
            type: "error",
            confirmButtonText: "Aceptar",
          });
          // localStorage.removeItem("access-token");
          setTimeout(function () {
            return window.location.replace("/");
          }, 3000);
        }
      }
    });
};

export const mostrarRol = (id) => async (dispatch) => {
  const rol = await axios.get(
    `${process.env.REACT_APP_BACKEND_SERVER}/Rol/rol?id=${id}`,
    {
      headers: { "access-token": localStorage.getItem("access-token") },
    }
  );

  dispatch({
    type: MOSTRAR_ROL,
    payload: rol.data,
  });
};

//Se elimino dispatch para sincronizar con el server
export const editarRol = (rol) => async (dispatch) => {
  const { id, nombre, descripcion, permisos } = rol;

  const data = {
    Rol: {
      id: id,
      Name: nombre,
      Description: descripcion,
    },
    Authorizations: permisos,
  };

  // console.log(data);

  await axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/Rol/UpdateRol`, data, {
      headers: { "access-token": localStorage.getItem("access-token") },
    })
    .then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Correcto!",
          text: "Se ha editado un rol",
          type: "success",
          confirmButtonText: "Confirmar",
        });
        setTimeout(function () {
          window.history.back();
        }, 3500);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Se ha producido un error al intentar editar el rol",
          type: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "Error!",
        text: "El Servidor no ha respondido la solicitud",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    });

  dispatch({
    type: EDITAR_ROL,
    payload: rol,
  });
};

export const eliminarRol = (id) => async (dispatch) => {
  await axios
    .post(
      `${process.env.REACT_APP_BACKEND_SERVER}/Rol/DeleteRol`,
      { id: id },
      { headers: { "access-token": localStorage.getItem("access-token") } }
    )
    .then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Correcto!",
          text: "Se ha borrado un rol",
          type: "success",
          confirmButtonText: "Confirmar",
        });
        setTimeout(function () {
          window.location.href = "/rrhh/roles";
        }, 3500);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Se ha producido un error al intentar borrar el rol",
          type: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "Error!",
        text: "El Servidor no ha respondido la solicitud",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return window.location.reload();
    });

  dispatch({
    type: BORRAR_ROL,
    payload: id,
  });
};

export const agregarRol = (rol) => async (dispatch) => {
  const { nombre, descripcion, permisos } = rol;

  const data = {
    Name: nombre,
    Description: descripcion,
    Authorizations: permisos,
  };

  await axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/Rol/CreateRol`, data, {
      headers: { "access-token": localStorage.getItem("access-token") },
    })
    .then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Correcto!",
          text: "Se ha añadido un nuevo rol",
          type: "success",
          confirmButtonText: "Confirmar",
        });
        setTimeout(function () {
          window.location.href = "/rrhh/roles";
        }, 3500);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Se ha producido un error al intentar crear el rol",
          type: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
    })
    .catch((err) => {
      Swal.fire({
        title: "Error!",
        text: "El Servidor no ha respondido la solicitud",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    });

  dispatch({
    type: AGREGAR_ROL,
    payload: rol,
  });
};

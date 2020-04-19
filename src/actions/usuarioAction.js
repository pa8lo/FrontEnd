import {
  LOGIN_USER,
  FETCH_CURRENT_USER,
  MOSTRAR_CURRENT_USER,
} from "../actions/types";
import axios from "axios";

//CSS
import Swal from "sweetalert2";

export const loginUser = (usuario) => async (dispatch) => {
  const { Dni, Password } = usuario;

  const user = {
    Dni: Dni,
    Password: Password,
  };

  const loginRes = await axios
    .post("https://roraso.herokuapp.com/User/login", user)

    .then((res) => {
      if (res.status === 200) {
        localStorage.setItem("access-token", res.data.token);

        Swal.fire({
          title: "Correcto!",
          text: "Se ha validado exitosamente",
          type: "success",
          confirmButtonText: "Confirmar",
        });
        setTimeout(function () {
          window.location.href = "/";
        }, 3500);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Se ha producido un error al intentar iniciar sesion",
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
            text: `Se han ingresado datos erroneos`,
            type: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });

  dispatch({
    type: LOGIN_USER,
    payload: usuario,
  });
};

export const fetchCurrentUser = () => async (dispatch) => {
  const user = await axios.get(
    "https://roraso.herokuapp.com/User/CurrentUser",
    { headers: { "access-token": localStorage.getItem("access-token") } }
  );

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: user.data,
  });
};

export const currentUser = () => async (dispatch) => {
  const userId = await axios
    .get("https://roraso.herokuapp.com/User/CurrentUser", {
      headers: { "access-token": localStorage.getItem("access-token") },
    })
    .then((res) => {
      return res.data.User.Id;
      // console.log(res.data.User.Id)
    })
    .catch((err) => {
      //console.log(err)
    });

  const currentUser = await axios.get(
    `https://roraso.herokuapp.com/User/Authorizations?id=${userId}`,
    { headers: { "access-token": localStorage.getItem("access-token") } }
  );

  dispatch({
    type: MOSTRAR_CURRENT_USER,
    payload: currentUser.data,
  });
};

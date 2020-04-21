import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SortableTbl from "../../react-sort-search-table/src/SortableTbl";

//Redux

import { connect } from "react-redux";
import { mostrarEmpleados } from "../../../actions/empleadosAction";
import { eliminarEmpleado } from "../../../actions/empleadosAction";
import { currentUser } from "../../../actions/usuarioAction";

//CSS
import Swal from "sweetalert2";
import { css } from "@emotion/core";

// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
  maxWidth: "100%",
  minWidth: "100%",
  paddingTop: 3,
};

const buttonStyle = {
  marginLeft: 10,
  width: 80,
};

let col = ["Dni", "Name", "LastName", "Email", "Actions"];
let tHead = ["DNI", "Nombre", "Apellido", "Email", "Acciones"];

class ActionEmpleadoComponent extends React.Component {
  eliminarEmpleado = () => {
    const { id } = this.props.rowData;

    if (id === this.props.currentIdUser || id === 1) {
      Swal.fire({
        title: "Error!",
        text: "No puedes borrar el usuario",
        type: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      Swal.fire({
        title: "¿Estas seguro que desea eliminar?",
        text: "Estas a punto de eliminar un empleado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          this.props.eliminarEmpleado(id);
        }
      });
    }

    //
  };

  resetClave = (usuario) => {
    Swal.fire({
      title: "¿Estas seguro que desea resetear la contraseña?",
      text: "Estas a punto de resetear a defecto la contraseña del usuario",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const data = {
          id: usuario.props.rowData.id,
        };

        var accessToken = localStorage.getItem("access-token");
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_SERVER}/User/ResetPassword`,
            data,
            {
              headers: { "access-token": accessToken },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire(
                {
                  title: "Correcto!",
                  text: "Se ha reseteado la contraseña al DNI del usuario",
                  type: "success",
                  confirmButtonText: "Confirmar",
                },
                setTimeout(function () {
                  window.location.href = "/rrhh/empleados";
                }, 3500)
              );
              return;
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "El servidor no ha respondido",
              type: "error",
              confirmButtonText: "Aceptar",
            });
            return;
          });
      } else {
      }
    });
  };

  render() {
    // console.log(this.props)

    if (this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;

    // console.log(permisos[1])

    return (
      <td style={columnButtonStyle}>
        {permisos.filter((permiso) => permiso.id == 2).length > 0 ? (
          <Link
            style={buttonStyle}
            to={{
              pathname: `/rrhh/empleados/${id}`,
              state: this.props.info,
            }}
            className="btn btn-primary"
          >
            Ver
          </Link>
        ) : (
          <Link style={buttonStyle} disabled to="#" className="btn btn-primary">
            Ver
          </Link>
        )}

        {permisos.filter((permiso) => permiso.id == 3).length > 0 ? (
          <Link
            style={buttonStyle}
            to={{
              pathname: `/rrhh/editar-empleados/${id}`,
              state: this.props.rowData,
            }}
            className="btn btn-warning"
          >
            Editar
          </Link>
        ) : (
          <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
            Editar
          </Link>
        )}

        {permisos.filter((permiso) => permiso.id == 4).length > 0 ? (
          <button
            style={buttonStyle}
            onClick={this.eliminarEmpleado}
            type="button"
            className="btn btn-danger"
          >
            Borrar
          </button>
        ) : (
          <button
            style={buttonStyle}
            disabled
            type="button"
            className="btn btn-danger"
          >
            Borrar
          </button>
        )}

        {permisos.filter((permiso) => permiso.id == 3).length > 0 ? (
          <button
            style={{ marginLeft: 10, width: 120 }}
            onClick={() => this.resetClave(this)}
            type="button"
            className="btn btn-info"
          >
            Resetear Clave
          </button>
        ) : null}
      </td>
    );
  }
}

class ListadoEmpleados extends Component {
  state = {
    loading: true,
    currentIdUser: 0,
  };

  componentWillMount() {
    this.props.mostrarEmpleados();
    this.props.currentUser();
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/User/CurrentUser`, {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            currentIdUser: res.data.User.Id,
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        // console.log(err)
      });
  }

  render() {
    const empleados = this.props.empleados;

    if (empleados.length === 0) {
      return (
        <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          <DotLoader
            css={override}
            size={50} // or 150px
            color={"#4D4D4D"}
            loading={this.state.loading}
          />
        </div>
      );
    } else {
      return (
        <SortableTbl
          tblData={empleados.sort(function (a, b) {
            return b.id - a.id;
          })}
          tHead={tHead}
          currentIdUser={this.state.currentIdUser}
          Permisos={this.props.usuario}
          customTd={[{ custd: ActionEmpleadoComponent, keyItem: "Actions" }]}
          dKey={col}
          search={true}
          defaultCSS={true}
          eliminarEmpleado={this.props.eliminarEmpleado}
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  empleados: state.empleados.empleados,
  usuario: state.usuario.usuario,
});

export default connect(mapStateToProps, {
  mostrarEmpleados,
  eliminarEmpleado,
  currentUser,
})(ListadoEmpleados);

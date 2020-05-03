import React, { Component } from "react";

import { Col } from "react-bootstrap";
import Header from "../header/IndexHeader";

import axios from "axios";

//CSS
import Swal from "sweetalert2";

import { connect } from "react-redux";
import { currentUser } from "../../actions/usuarioAction";

const buttonStyle = {
  marginLeft: 10,
  width: 80,
};

class ConsultarDireccionCliente extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    this.props.currentUser();
  }

  eliminarDireccion = async (id) => {
    Swal.fire({
      title: "¿Estás seguro que desea eliminar?",
      text: "Estas a punto de eliminar una dirección",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_SERVER}/Client/DeleteAddress`,
            { id: id },
            {
              headers: { "access-token": localStorage.getItem("access-token") },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Correcto!",
                text: "Se ha borrado una dirección",
                type: "success",
                confirmButtonText: "Confirmar",
              });
              setTimeout(function () {
                window.location.href = "/clientes";
              }, 3500);
            } else {
              Swal.fire({
                title: "Error!",
                text:
                  "Se ha producido un error al intentar borrar la dirección",
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
      }
    });
  };

  goBack() {
    window.history.back();
  }

  render() {
    if (this.props.usuario.length === 0) return null;

    const permisos = this.props.usuario.Authorizations;

    return (
      <React.Fragment>
        <Header titulo="Consulta de Direcciones" />

        {this.props.location.state.Adress.length > 0 ? (
          this.props.location.state.Adress.map((address) => (
            <div key={address.id} style={{ marginTop: "50px" }}>
              <Col xs={12} md={6}>
                <div align="center" className="form-group">
                  <label>Dirección</label>
                  <h3>
                    {address.Adress == null || address.Adress == ""
                      ? "Sin Dirección"
                      : address.Adress}
                  </h3>
                </div>
              </Col>
              <Col align="center" xs={12} md={6}>
                <div className="form-group">
                  <label>Departamento</label>
                  <h3>
                    {address.Department == null
                      ? "Sin Dpto"
                      : address.Department}
                  </h3>
                </div>
              </Col>
              <Col align="center" xs={12} md={6}>
                <div className="form-group">
                  <label>Piso</label>
                  <h3>{address.Floor == null ? "Sin Piso" : address.Floor}</h3>
                </div>
              </Col>
              <Col align="center" xs={12} md={6}>
                <div className="form-group">
                  <label>Código Postal</label>
                  <h3>{address.Cp == null ? "Sin CP" : address.Cp}</h3>
                </div>
              </Col>
              <Col
                align="center"
                xs={12}
                md={12}
                style={{ marginTop: "20px", marginBottom: "40px" }}
              >
                <button
                  className={buttonStyle}
                  style={{ color: "white", backgroundColor: "#4D4D4D" }}
                  onClick={() => this.goBack()}
                  className="btn"
                >
                  Volver
                </button>

                {permisos.filter((permiso) => permiso.id == 7).length > 0 ? (
                  <button
                    style={{ marginLeft: 10, width: 140 }}
                    name="idEliminarAsistencia"
                    onClick={() => this.eliminarDireccion(address.id)}
                    value={address.id}
                    type="button"
                    className="btn btn-danger"
                  >
                    Borrar Dirección
                  </button>
                ) : (
                  <button
                    style={{ marginLeft: 10, width: 140 }}
                    disabled
                    type="button"
                    className="btn btn-danger"
                  >
                    Borrar Dirección
                  </button>
                )}
              </Col>
            </div>
          ))
        ) : (
          <div align="center" className="form-group">
            <h2 style={{ marginTop: "20px" }}>No hay datos</h2>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});

export default connect(mapStateToProps, {
  currentUser,
})(ConsultarDireccionCliente);

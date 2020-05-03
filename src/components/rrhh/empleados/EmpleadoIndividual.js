import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Row, Col, Panel } from "react-bootstrap";
import { Container } from "reactstrap";

//Animacion CSS
import Swal from "sweetalert2";

//Componentes
import Header from "../../header/IndexHeader";

//Redux
import { connect } from "react-redux";
import {
  eliminarEmpleado,
  mostrarEmpleado,
  agregarDireccion,
} from "../../../actions/empleadosAction";
import { currentUser } from "../../../actions/usuarioAction";

//CSS
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const buttonStyle = {
  marginLeft: 10,
  width: 80,
};

class MyVerticallyCenteredModal extends Component {
  constructor(...args) {
    super(...args);
  }

  direccionRef = React.createRef();
  departamentoRef = React.createRef();
  pisoRef = React.createRef();
  cpRef = React.createRef();

  crearDireccion = (e) => {
    e.preventDefault();

    const userid = parseInt(this.props.userid);
    let departamento_elegido;
    let piso_elegido;

    if (this.departamentoRef.current.value == "") {
      departamento_elegido = "";
    } else {
      departamento_elegido = this.departamentoRef.current.value;
    }

    if (this.pisoRef.current.value == "") {
      piso_elegido = "";
    } else {
      piso_elegido = this.pisoRef.current.value;
    }

    const data = {
      Address: {
        Adress: this.direccionRef.current.value,
        Department: departamento_elegido,
        Floor: piso_elegido,
        Cp: this.cpRef.current.value,
        LatLong: "1111",
        User: userid,
      },
    };

    // console.log(data);

    axios
      .post(`${process.env.REACT_APP_BACKEND_SERVER}/User/AddAddress`, data, {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Correcto!",
            text: "Se ha agregado una dirección",
            type: "success",
            confirmButtonText: "Aceptar",
          });
          setTimeout(function () {
            window.location.reload();
          }, 3500);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Se ha producido un error al intentar agregar una dirección",
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
  };

  render() {
    console.log(this.props);

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered="true"
        style={{ marginTop: "100px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ingresar Datos de Dirección
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={this.crearDireccion} className="col-8">
          <Modal.Body>
            <Row className="show-grid">
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    ref={this.direccionRef}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label>Piso</label>
                  <input
                    ref={this.pisoRef}
                    type="text"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label>Departamento</label>
                  <input
                    ref={this.departamentoRef}
                    type="text"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div className="form-group">
                  <label>Código Postal</label>
                  <input
                    ref={this.cpRef}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={12} md={1}>
              <Button type="submit">Cargar</Button>
            </Col>
            <Col xs={12} md={11}>
              <Button onClick={this.props.onHide}>Cerrar</Button>
            </Col>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}

class EmpleadoIndividual extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      empleado: [],
      modalShow: false,
      roles: [],
      rol_encontrado_1: [],
    };
  }

  eliminarEmpleado = () => {
    Swal.fire({
      title: "¿Estás seguro que desea eliminar?",
      text: "Estas a punto de eliminar un empleado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.props.eliminarEmpleado(this.props.match.params.empleadoId);
      }
    });
  };

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
            `${process.env.REACT_APP_BACKEND_SERVER}/User/DeleteAddress`,
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
                window.location.reload();
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

  componentWillMount() {
    var accessToken = localStorage.getItem("access-token");

    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/Rol/rols`, {
        headers: { "access-token": accessToken },
      })
      .then((res) => {
        if (res.data.length === 0) {
          return null;
        } else {
          this.setState({
            roles: res.data,
          });
          // const rolEmpleado = this.state.roles;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.props.mostrarEmpleado(this.props.match.params.empleadoId);
    this.props.currentUser();
    // console.log(this.props.empleado); Me da vacio porque la respuesta de la api carga dsp que el didmount
  }

  mostrarEmpleado = () => {
    if (this.props.empleado == undefined) return null;

    if (this.state.roles.length === 0) return null;

    const permisos = this.props.usuario.Authorizations;

    // console.log(this.props);

    let rol_encontrado = [];

    this.state.roles.map(
      (rol) => (
        (rol_encontrado = this.state.roles.filter(
          (id_rol) => id_rol.id === this.props.empleado.user.Rols
        )),
        (this.state.rol_encontrado_1 = this.state.roles.filter(
          (id_rol) => id_rol.id === this.props.empleado.user.Rols
        ))
      )
    );

    if (this.props.rol == "undefinded" && rol_encontrado.length === 0)
      return (
        <React.Fragment>
          <Container style={{ marginTop: 10 }}>
            <Panel style={{ color: "black" }}>
              <Panel.Heading>
                <Panel.Title
                  componentClass="h3"
                  style={{ textAlign: "center" }}
                >
                  Datos Personales
                </Panel.Title>
              </Panel.Heading>

              <Panel.Body xs={4}>
                <h2 xs={4}>Nombre: {this.props.empleado.user.Name}</h2>
                <h2 xs={4}>Apellido: {this.props.empleado.user.LastName}</h2>
                <h2>Email: {this.props.empleado.user.Email}</h2>
                <h2>1º Telefono: {this.props.empleado.user.PrimaryPhone}</h2>
                <h2>DNI: {this.props.empleado.user.Dni}</h2>
                <h2>Rol: Sin Rol</h2>
              </Panel.Body>

              <Panel.Heading>
                <Panel.Title
                  componentClass="h3"
                  style={{ textAlign: "center" }}
                >
                  Domicilios
                </Panel.Title>
              </Panel.Heading>

              {this.props.empleado.user.Adress.map((address) => (
                <React.Fragment key={address.id}>
                  <Panel.Body key={address.id}>
                    <h2>Domicilio: {address.Adress}</h2>
                    <h2>
                      Piso: {address.Floor === "" ? "Sin Piso" : address.Floor}
                    </h2>
                    <h2>
                      Departamento:{" "}
                      {address.Department === ""
                        ? "Sin Departamento"
                        : address.Department}
                    </h2>
                    <h2>Código Postal: {address.Cp}</h2>
                  </Panel.Body>
                  {permisos.filter((permiso) => permiso.id == 3).length > 0 ? (
                    <div className="d-flex justify-content-end">
                      <div className="p-2 text-center">
                        <button
                          style={buttonStyle}
                          onClick={() => this.eliminarDireccion(address.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <div className="p-2 text-center">
                        <button
                          style={buttonStyle}
                          disabled
                          type="button"
                          className="btn btn-danger"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  )}
                  <Panel.Body>
                    <hr></hr>
                  </Panel.Body>
                </React.Fragment>
                // console.log(address)
              ))}
              {/* <Col xs={4}><h2>Rol: {this.props.empleado.user.Rols}</h2></Col> */}
            </Panel>
          </Container>
        </React.Fragment>
      );

    if (rol_encontrado[0] == undefined)
      return (
        <React.Fragment>
          <Container style={{ marginTop: 10 }}>
            <Panel style={{ color: "black" }}>
              <Panel.Heading>
                <Panel.Title
                  componentClass="h3"
                  style={{ textAlign: "center" }}
                >
                  Datos Personales
                </Panel.Title>
              </Panel.Heading>

              <Panel.Body xs={4}>
                <h2 xs={4}>Nombre: {this.props.empleado.user.Name}</h2>
                <h2 xs={4}>Apellido: {this.props.empleado.user.LastName}</h2>
                <h2>Email: {this.props.empleado.user.Email}</h2>
                <h2>1º Telefono: {this.props.empleado.user.PrimaryPhone}</h2>
                <h2>DNI: {this.props.empleado.user.Dni}</h2>
                <h2>Rol: Sin Rol</h2>
              </Panel.Body>

              <Panel.Heading>
                <Panel.Title
                  componentClass="h3"
                  style={{ textAlign: "center" }}
                >
                  Domicilios
                </Panel.Title>
              </Panel.Heading>

              {this.props.empleado.user.Adress.map((address) => (
                <React.Fragment key={address.id}>
                  <Panel.Body key={address.id}>
                    <h2>Domicilio: {address.Adress}</h2>
                    <h2>
                      Piso: {address.Floor === "" ? "Sin Piso" : address.Floor}
                    </h2>
                    <h2>
                      Departamento:{" "}
                      {address.Department === ""
                        ? "Sin Departamento"
                        : address.Department}
                    </h2>
                    <h2>Código Postal: {address.Cp}</h2>
                  </Panel.Body>
                  {permisos.filter((permiso) => permiso.id == 3).length > 0 ? (
                    <div className="d-flex justify-content-end">
                      <div className="p-2 text-center">
                        <button
                          style={buttonStyle}
                          onClick={() => this.eliminarDireccion(address.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-end">
                      <div className="p-2 text-center">
                        <button
                          style={buttonStyle}
                          disabled
                          type="button"
                          className="btn btn-danger"
                        >
                          Borrar
                        </button>
                      </div>
                    </div>
                  )}
                  <Panel.Body>
                    <hr></hr>
                  </Panel.Body>
                </React.Fragment>
                // console.log(address)
              ))}
              {/* <Col xs={4}><h2>Rol: {this.props.empleado.user.Rols}</h2></Col> */}
            </Panel>
          </Container>
        </React.Fragment>
      );
    // (
    //     <div style={{marginTop: '40px', marginBottom: '40px'}}>
    //         <DotLoader
    //         css={override}
    //         size={50} // or 150px
    //         color={"#4D4D4D"}
    //         loading={this.state.loading}
    //         />
    //     </div>
    // )

    return (
      <React.Fragment>
        <Container style={{ marginTop: 10 }}>
          <Panel style={{ color: "black" }}>
            <Panel.Heading>
              <Panel.Title componentClass="h3" style={{ textAlign: "center" }}>
                Datos Personales
              </Panel.Title>
            </Panel.Heading>

            <Panel.Body xs={4}>
              <h2 xs={4}>Nombre: {this.props.empleado.user.Name}</h2>
              <h2 xs={4}>Apellido: {this.props.empleado.user.LastName}</h2>
              <h2>Email: {this.props.empleado.user.Email}</h2>
              <h2>1º Telefono: {this.props.empleado.user.PrimaryPhone}</h2>
              <h2>DNI: {this.props.empleado.user.Dni}</h2>
              <h2>Rol: {rol_encontrado[0].Name}</h2>
            </Panel.Body>

            <Panel.Heading>
              <Panel.Title componentClass="h3" style={{ textAlign: "center" }}>
                Domicilios
              </Panel.Title>
            </Panel.Heading>

            {this.props.empleado.user.Adress.map((address) => (
              <React.Fragment key={address.id}>
                <Panel.Body key={address.id}>
                  <h2>Domicilio: {address.Adress}</h2>
                  <h2>
                    Piso: {address.Floor === "" ? "Sin Piso" : address.Floor}
                  </h2>
                  <h2>
                    Departamento:{" "}
                    {address.Department === ""
                      ? "Sin Departamento"
                      : address.Department}
                  </h2>
                  <h2>Código Postal: {address.Cp}</h2>
                </Panel.Body>
                {permisos.filter((permiso) => permiso.id == 3).length > 0 ? (
                  <div className="d-flex justify-content-end">
                    <div className="p-2 text-center">
                      <button
                        style={buttonStyle}
                        onClick={() => this.eliminarDireccion(address.id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-end">
                    <div className="p-2 text-center">
                      <button
                        style={buttonStyle}
                        disabled
                        type="button"
                        className="btn btn-danger"
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                )}
                <Panel.Body>
                  <hr></hr>
                </Panel.Body>
              </React.Fragment>
              // console.log(address)
            ))}
            {/* <Col xs={4}><h2>Rol: {this.props.empleado.user.Rols}</h2></Col> */}
          </Panel>
        </Container>
      </React.Fragment>
    );
  };

  goBack() {
    window.history.back();
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    const permisos = this.props.usuario.Authorizations;

    if (this.props.empleado == undefined)
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

    if (this.props.usuario.length == 0) {
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
      console.log(this.state.rol_encontrado_1);

      return (
        <div>
          <Header titulo="Empleado" />
          {this.mostrarEmpleado()}

          <React.Fragment>
            <div center="true" align="center" className="form-group">
              {/* { permisos.filter(permiso => (permiso.id == 5)) ?  
                  
                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/editar-empleados/${this.props.match.params.empleadoId}`,
                        state : this.props.empleado.user
                        }} className="btn btn-warning">
                            Editar
                    </Link> 

                  :  

                    <Link style={buttonStyle} to="#" disabled className="btn btn-warning">Editar</Link> 
              
                  }


                  { permisos.filter(permiso => (permiso.id == 5)) ?  
                  
                  <button style={buttonStyle} onClick={ this.eliminarEmpleado } type="button" className="btn btn-danger">Borrar</button>

                  :  

                  <button style={buttonStyle} type="button" className="btn btn-danger">Borrar</button> 
              
                  } */}

              {permisos.filter((permiso) => permiso.id == 1).length > 0 ? (
                <Button
                  style={{ marginLeft: 10, width: 150 }}
                  className="btn btn-success"
                  variant="primary"
                  onClick={() => this.setState({ modalShow: true })}
                >
                  Agregar Dirección
                </Button>
              ) : (
                <Button
                  style={{ marginLeft: 10, width: 150 }}
                  to="#"
                  disabled
                  className="btn btn-success"
                >
                  Agregar Dirección
                </Button>
              )}

              {permisos.filter((permiso) => permiso.id == 10).length > 0 &&
              this.state.rol_encontrado_1.length !== 0 ? (
                <Link
                  style={buttonStyle}
                  to={{
                    pathname: `/rrhh/roles/${this.props.empleado.user.Rols}`,
                  }}
                  className="btn btn-info"
                  variant="info"
                >
                  Ver Rol
                </Link>
              ) : (
                <Link
                  style={buttonStyle}
                  to="#"
                  disabled
                  className="btn btn-info"
                >
                  Ver Rol
                </Link>
              )}

              <div
                align="center"
                style={{ marginTop: "50px" }}
                className="form-group"
              >
                <button
                  type="button"
                  className="btn"
                  style={{ color: "white", backgroundColor: "#4D4D4D" }}
                  onClick={() => this.goBack()}
                >
                  Volver
                </button>
              </div>

              <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={modalClose}
                userid={this.props.match.params.empleadoId}
              />
            </div>
          </React.Fragment>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  empleado: state.empleados.empleado,
  usuario: state.usuario.usuario,
});

export default connect(mapStateToProps, {
  eliminarEmpleado,
  mostrarEmpleado,
  currentUser,
})(EmpleadoIndividual);

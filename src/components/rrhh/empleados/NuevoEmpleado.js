import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

//Componentes
import Paper from "@material-ui/core/Paper";
import Header from "../../header/IndexHeader";
import ListadoRolesEmpleados from "./ListaRolEmpleado";

//CSS
import "../../../assets/css/empleados/form-alta-empleados.css";

//Redux
import { connect } from "react-redux";
import { agregarEmpleado } from "../../../actions/empleadosAction";

class NuevoEmpleado extends Component {
  state = {
    roles: [],
    error: false,
    redirectHome: false,
  };

  dniRef = React.createRef();
  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  emailRef = React.createRef();
  primerTelefonoRef = React.createRef();
  segundoTelefonoRef = React.createRef();
  rolRef = React.createRef();
  // direccionRef = React.createRef();
  // departamentoRef = React.createRef();
  // pisoRef = React.createRef();
  // cpRef = React.createRef();

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

  ToHome() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  }

  setRedirectToHome = () => {
    this.setState({
      redirectHome: true,
    });
  };

  crearEmpleado = (e) => {
    e.preventDefault();

    const empleado = {
      dni: this.dniRef.current.value,
      nombre: this.nombreRef.current.value,
      apellido: this.apellidoRef.current.value,
      email: this.emailRef.current.value,
      primerTelefono: this.primerTelefonoRef.current.value,
      segundoTelefono: this.segundoTelefonoRef.current.value,
      rol: this.rolRef.current.value,
      // direccion : this.direccionRef.current.value,
      // departamento : this.departamentoRef.current.value,
      // piso : this.pisoRef.current.value,
      // codigoPostal : this.cpRef.current.value
    };

    if (
      Number(empleado.dni) === "NaN" ||
      empleado.dni === "" ||
      empleado.nombre === "" ||
      empleado.apellido === "" ||
      empleado.email === "" ||
      empleado.primerTelefono === ""
    ) {
      // console.log('error');
      this.setState({ error: true });
      Swal.fire({
        title: "Error!",
        text: "Faltan o hay errores en el formulario",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    } else {
      this.setState({ error: false });
      this.props.agregarEmpleado(empleado);
      // this.props.agregarEmpleado(empleado);
    }

    e.currentTarget.reset();

    // console.log(empleado);
  };

  render() {
    return (
      <div>
        <Header titulo="Alta de Empleado" />
        <div className="table-empleados">
          <Paper className="col-md-4">
            <div align="center">
              <form onSubmit={this.crearEmpleado} className="col-8">
                <div className="form-group">
                  <label>DNI *</label>
                  <input
                    ref={this.dniRef}
                    type="number"
                    min="1"
                    step="1"
                    title="Numbers only"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    ref={this.nombreRef}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Apellido *</label>
                  <input
                    ref={this.apellidoRef}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    ref={this.emailRef}
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>1º Teléfono / Celular *</label>
                  <input
                    ref={this.primerTelefonoRef}
                    type="number"
                    min="1"
                    step="1"
                    title="Numbers only"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>2º Teléfono / Celular</label>
                  <input
                    ref={this.segundoTelefonoRef}
                    type="number"
                    min="1"
                    step="1"
                    title="Numbers only"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Rol *</label>
                  <select ref={this.rolRef} className="form-control">
                    <option defaultValue disabled>
                      None
                    </option>

                    {this.state.roles.map((rol) => (
                      <ListadoRolesEmpleados key={rol.id} roles={rol} />
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Aceptar"
                    className="btn btn-primary"
                  />
                  <button
                    style={{ marginLeft: 20, width: 80 }}
                    onClick={this.setRedirectToHome}
                    type="button"
                    className="btn btn-danger"
                  >
                    Cancelar
                  </button>
                  {this.ToHome()}
                </div>
              </form>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  empleados: state.empleados.empleados,
});

export default connect(mapStateToProps, { agregarEmpleado })(NuevoEmpleado);

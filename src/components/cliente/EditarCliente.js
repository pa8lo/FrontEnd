import React, { Component } from "react";
import Swal from "sweetalert2";

//Componentes
import Paper from "@material-ui/core/Paper";
import Header from "../header/IndexHeader";
import { Redirect } from "react-router-dom";

//CSS
import "../../assets/css/empleados/form-alta-empleados.css";

//Redux
import { connect } from "react-redux";
import { editarCliente } from "../../actions/clientesAction";

class EditarCliente extends Component {
  state = {
    date: "",
    redirectHome: false,
  };

  nombreRef = React.createRef();
  apellidoRef = React.createRef();
  telefonoRef = React.createRef();
  emailRef = React.createRef();

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

  editarCliente = (e) => {
    e.preventDefault();

    if (
      this.nombreRef.current.value == undefined ||
      this.telefonoRef.current.value == undefined
    ) {
      Swal.fire({
        title: "Error!",
        text: "Hay datos erroneos o faltan datos en el formulario",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    } else {
      const cliente = {
        name: this.nombreRef.current.value,
        lastname: this.apellidoRef.current.value,
        phone: this.telefonoRef.current.value,
        email: this.emailRef.current.value,
        id: this.props.location.state.id,
      };

      // console.log(cliente)
      this.props.editarCliente(cliente);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header titulo="Editar Cliente" />
        <div className="table-empleados">
          <Paper className="col-md-5">
            <div>
              <form onSubmit={this.editarCliente} className="col-5">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    ref={this.nombreRef}
                    defaultValue={this.props.location.state.Name}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input
                    ref={this.apellidoRef}
                    defaultValue={this.props.location.state.LastName}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    ref={this.emailRef}
                    defaultValue={this.props.location.state.Email}
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    ref={this.telefonoRef}
                    defaultValue={this.props.location.state.Phone}
                    type="number"
                    min="1"
                    step="1"
                    title="Numbers only"
                    className="form-control"
                    disabled
                  />
                </div>
                <div center="true" align="center" className="form-group">
                  <input
                    type="submit"
                    value="Aceptar"
                    className="btn btn-primary"
                    required
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
      </React.Fragment>
    );
  }
}

export default connect(null, { editarCliente })(EditarCliente);

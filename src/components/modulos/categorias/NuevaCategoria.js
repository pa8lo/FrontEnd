import React, { Component } from "react";
import Swal from "sweetalert2";

//Componentes
import Paper from "@material-ui/core/Paper";
import Header from "../../header/IndexHeader";
import { Redirect } from "react-router-dom";

//CSS
import "../../../assets/css/empleados/form-alta-empleados.css";

//Redux
import { connect } from "react-redux";
import { agregarCategoria } from "../../../actions/categoriasAction";

class NuevaCategoria extends Component {
  state = {
    error: false,
    redirectHome: false,
    disabledSend: false,
  };

  nombreRef = React.createRef();
  descripcionRef = React.createRef();

  crearCategoria = (e) => {
    e.preventDefault();
    this.setState({
      disabledSend: true,
    });
    const categoria = {
      Name: this.nombreRef.current.value,
      Description: this.descripcionRef.current.value,
    };

    if (categoria.Name === "" || categoria.Description === "") {
      // console.log('error');
      this.setState({ error: true, disabledSend: false });
      Swal.fire({
        title: "Error!",
        text: "Faltan o hay errores en el formulario",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    } else {
      this.setState({ error: false });
      this.props.agregarCategoria(categoria);
    }

    e.currentTarget.reset();
  };

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

  render() {
    return (
      <div>
        <Header titulo="Alta de Categoría" />
        <div className="table-empleados">
          <Paper className="col-md-4">
            <div align="center">
              <form onSubmit={this.crearCategoria} className="col-8">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    ref={this.nombreRef}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <input
                    ref={this.descripcionRef}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    disabled={this.state.disabledSend}
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
  categorias: state.categorias.categorias,
});

export default connect(mapStateToProps, { agregarCategoria })(NuevaCategoria);

import React, { Component } from "react";

//Componentes
import Paper from "@material-ui/core/Paper";
import Header from "../../header/IndexHeader";
import { Redirect } from "react-router-dom";

//CSS
import "../../../assets/css/empleados/form-alta-empleados.css";
import Swal from "sweetalert2";

//Redux
import { connect } from "react-redux";
import { mostrarEmpleados } from "../../../actions/empleadosAction";
import { asignarDelivery } from "../../../actions/pedidosAction";

class EditarOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery: null,
      redirectHome: false,
    };

    const deliveryRef = React.createRef();
  }

  componentWillMount() {
    this.props.mostrarEmpleados();
  }

  onChangeDelivery(event) {
    event.preventDefault();
    this.setState({
      delivery: event.target.value,
    });
  }

  editOrder(event) {
    event.preventDefault();
    // console.log(this.props.location.state.id);
    if (this.state.delivery === null || this.state.delivery === 0) {
      Swal.fire({
        title: "Error!",
        text: "Se debe seleccionar un delivery",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    // console.log();
    this.props.asignarDelivery([
      this.props.location.state.id,
      this.state.delivery,
    ]);
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

  render() {
    const empleados = this.props.empleados;

    var empleadosTag = empleados.map((empleado, key) => (
      <option value={empleado.id} key={key}>
        {empleado.Name + " " + empleado.LastName}
      </option>
    ));

    return (
      <div>
        <Header titulo="Editar Asignacion Pedido" />
        <div className="table-empleados">
          <Paper className="col-md-4">
            <div align="center">
              <div className="form-group">
                <label>Pedido</label>
                <input
                  type="text"
                  defaultValue={this.props.location.state.Order}
                  className="form-control"
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Delivery</label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeDelivery(event)}
                  required
                  ref={this.deliveryRef}
                >
                  <option value="0"></option>
                  {empleadosTag}
                </select>
              </div>
              <div center="true" align="center" className="form-group">
                <input
                  type="button"
                  value="Aceptar"
                  className="btn btn-primary"
                  onClick={(event) => this.editOrder(event)}
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
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  line: state.pedidos.line,
  empleados: state.empleados.empleados,
});

export default connect(mapStateToProps, {
  asignarDelivery,
  mostrarEmpleados,
})(EditarOrder);

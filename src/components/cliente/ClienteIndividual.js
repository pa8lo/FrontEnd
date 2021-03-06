import React, { Component } from "react";
import Swal from "sweetalert2";

//Componentes
import Paper from "@material-ui/core/Paper";
import Header from "../header/IndexHeader";

//CSS
import "../../assets/css/empleados/form-alta-empleados.css";

class ClienteIndividual extends Component {
  state = {
    date: "",
  };

  componentDidMount() {
    //console.log(this.props);
  }

  goBack() {
    window.history.back();
  }

  render() {
    // console.log(this.props)

    return (
      <React.Fragment>
        <Header titulo="Ver Cliente" />
        <div className="table-empleados">
          <Paper className="col-md-5">
            <div>
              <form className="col-5">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    disabled
                    defaultValue={this.props.location.state.Name}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input
                    disabled
                    defaultValue={this.props.location.state.LastName}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    disabled
                    defaultValue={this.props.location.state.Email}
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"
                    type="email"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    disabled
                    defaultValue={this.props.location.state.Phone}
                    type="number"
                    min="1"
                    step="1"
                    title="Numbers only"
                    className="form-control"
                    required
                  />
                </div>
              </form>
            </div>
            <div
              align="center"
              style={{ marginTop: "20px" }}
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
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default ClienteIndividual;

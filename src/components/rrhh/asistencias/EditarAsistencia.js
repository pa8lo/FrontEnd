import React, { Component } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';
import { FormGroup, InputGroup, FormControl } from "react-bootstrap";
import { Redirect } from "react-router-dom";

//Componentes
import Paper from "@material-ui/core/Paper";
import Header from "../../header/IndexHeader";
import ListadoEmpleadosEdicion from "./ListadoEmpleadosEdicion";

//Redux
import { connect } from "react-redux";
import { editarAsistencia } from "../../../actions/asistenciasAction";

class AsistenciaIndividual extends Component {
  state = {
    idEmpleado: this.props.location.idUser,
    nombreEmpleado: this.props.location.userName,
    empleados: [],
    timeIn: "",
    timeOut: "",
    timeInForm: "",
    timeOutForm: "",
    redirectHome: false,
    TimeInToSend: "",
    TimeOutToSend: "",
  };

  handleChangetimeIn = (e) => {
    console.log(e.target.value);

    this.setState({
      timeInForm: e.target.value,
    });
  };

  handleChangetimeOut = (e) => {
    this.setState({
      timeOutForm: e.target.value,
    });
  };

  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER}/User/Users`, {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        if (res.data.length === 0) {
          return null;
        } else {
          this.setState({
            empleados: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // this.props.location.state.InTime
  }

  componentDidMount() {
    console.log(this.props.location.state);

    this.setState((state) => ({
      TimeInToSend: this.props.location.state.InTime,
      TimeOutToSend: this.props.location.state.OutTime,
    }));

    this.setState({
      idEmpleado: this.props.location.idUser,
      nombreEmpleado: this.props.location.userName,
      timeIn: this.props.location.state.InTime,
    });

    this.state.timeIn = this.props.location.state.InTime.split("T");
    this.state.timeOut = this.props.location.state.OutTime.split("T");

    //The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".

    // 20/03/2020 00:38:00:00

    var timeIn1 =
      this.state.timeIn[0] + "T" + this.state.timeIn[1].split(".")[0];
    var timeOut1 =
      this.state.timeOut[0] + "T" + this.state.timeOut[1].split(".")[0];

    this.setState({
      timeInForm: timeIn1,
      timeOutForm: timeOut1,
    });
  }

  actualizarAsistencia = (e) => {
    e.preventDefault();

    //"fecha invalida se espera DD/MM/YYYY HH:MM:SS:MS"

    //Time In

    let timeIn1 = this.state.timeInForm.split("T");

    let timeIn4 =
      timeIn1[0].split("-")[2] +
      "/" +
      timeIn1[0].split("-")[1] +
      "/" +
      timeIn1[0].split("-")[0];

    let timeIn2;

    if (timeIn1[1].split(":").length === 2) {
      timeIn2 = timeIn1[1] + ":00";
    } else {
      timeIn2 = timeIn1[1];
    }

    let timeIn3 = timeIn4 + " " + timeIn2;

    //Time Out

    let timeOut1 = this.state.timeOutForm.split("T");

    let timeOut4 =
      timeOut1[0].split("-")[2] +
      "/" +
      timeOut1[0].split("-")[1] +
      "/" +
      timeOut1[0].split("-")[0];

    let timeOut2;

    if (timeOut1[1].split(":").length === 2) {
      timeOut2 = timeOut1[1] + ":00";
    } else {
      timeOut2 = timeOut1[1];
    }

    let timeOut3 = timeOut4 + " " + timeOut2;

    const asistencias = {
      idAsistencia: this.props.location.state.id,
      timeIn: timeIn3,
      timeOut: timeOut3,
    };

    // console.log(asistencias);

    this.props.editarAsistencia(asistencias);
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
        <Header titulo="Editar Asistencia" />
        <div className="table-empleados">
          <Paper className="col-md-8">
            <div>
              <form onSubmit={this.actualizarAsistencia} className="col-8">
                <div className="form-group">
                  <label>Empleado</label>
                  <select
                    ref={this.empleadosRef}
                    disabled
                    defaultValue={this.state.idEmpleado}
                    className="form-control"
                    required
                  >
                    <option defaultValue={this.state.idEmpleado}>
                      {this.state.nombreEmpleado}
                    </option>

                    {this.state.empleados.map((empleado) => (
                      <ListadoEmpleadosEdicion
                        key={empleado.id}
                        empleados={empleado}
                      />
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Horarios</label>
                  <FormGroup
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <InputGroup>
                      <InputGroup.Addon>Fecha y Hora Entrada</InputGroup.Addon>
                      <FormControl
                        onChange={this.handleChangetimeIn}
                        name="timeInForm"
                        style={{ width: 200 }}
                        type="datetime-local"
                        max="9999-12-12T00:00:00.00"
                        defaultValue={this.state.timeInForm}
                        required
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroup.Addon>Fecha y Hora Salida</InputGroup.Addon>
                      <FormControl
                        onChange={this.handleChangetimeOut}
                        name="timeOutForm"
                        style={{ width: 200 }}
                        type="datetime-local"
                        max="9999-12-12T00:00:00.00"
                        defaultValue={this.state.timeOutForm}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </div>
                <div align="center" className="form-group">
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
  asistencias: state.asistencias.asistencias,
});

export default connect(mapStateToProps, { editarAsistencia })(
  AsistenciaIndividual
);

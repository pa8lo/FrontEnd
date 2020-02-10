import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
import ListadoEmpleadosEdicion from './ListadoEmpleadosEdicion';

//Redux
import { connect } from 'react-redux';
import { editarAsistencia } from '../../../actions/asistenciasAction'

class AsistenciaIndividual extends Component {
  
  state = {
    idEmpleado : this.props.location.idUser,
    nombreEmpleado : this.props.location.userName,
    empleados : [],
    timeIn : '',
    timeOut : '',
    timeInForm : '',
    redirectHome: false,
  }

  handleChangetimeIn = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  handleChangetimeOut = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  componentWillMount(){

    console.log(this.props)

    

    axios.get('https://roraso.herokuapp.com/User/Users',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(res.data.length === 0){
                return null;
            }else{
                this.setState({
                    empleados : res.data
                })
            }
        })
        .catch(err => {
            console.log(err);
        })


      // this.props.location.state.InTime
    }

    componentDidMount(){
      this.setState({
        idEmpleado : this.props.location.idUser,
        nombreEmpleado : this.props.location.userName,
        timeIn : this.props.location.state.InTime
      })
      

      this.state.timeIn = this.props.location.state.InTime.split("T");

      //The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".

      // console.log(this.state)

      var timeIn1 = this.state.timeIn[0] + "T" + this.state.timeIn[1].split('.')[0]

      // console.log(timeIn1)

      // var timeIn2 = timeIn1[1].split(':');

      // var timeIn3 = timeIn1[0] + "-" + this.state.timeIn[1] + "-" + this.state.timeIn[0] + "T" + timeIn2[0] + ':' + timeIn2[1];

      this.setState({
        timeInForm : timeIn1,
      })
    }

    actualizarAsistencia = (e) => {
       
      e.preventDefault();

      //"fecha invalida se espera DD/MM/YYYY HH:MM:SS:MS"

      let timeIn1 = this.state.timeIn.split('T')[0];

      let timeIn3 = timeIn1.split('-')

      let timeIn4 = timeIn3[2] + "/" + timeIn3[1] + "/" + timeIn3[0]

      let timeIn2 = this.state.timeIn.split('T')[1].split('Z')[0].split('.')[0]

      let timeIn5 = timeIn2 + ":00"

      // console.log(timeIn1 + " " + timeIn2)
      this.setState.timeIn = timeIn4 + " " + timeIn5

      this.setState.timeOut = this.state.timeOut.split("-");
      
      var timeOut2 = this.state.timeOut.split("T");

      var timeOut3 = timeOut2[0].split('-')

      var timeOut4 = timeOut3[2] + '/' + timeOut3[1] + '/' + timeOut3[0]
     
      const timeOut5 = timeOut4 + " " + timeOut2[1] + ":00:00";

      // console.log(this.setState.timeIn);
      // console.log(timeOut5);

      const asistencias = {
        idAsistencia : this.props.location.state.id,
        timeIn : this.setState.timeIn,
        timeOut : timeOut5
      }

      // console.log(asistencias);

      this.props.editarAsistencia(asistencias)

    }

    ToHome(){
      if (this.state.redirectHome) {
        return <Redirect to='/' />
      }
    }

    setRedirectToHome = () => {
      this.setState({
        redirectHome: true
      })
    }

  render() {
        return (
            
        <div>
            <Header titulo = 'Alta de Asistencia'/>
            <div className="table-empleados">
                <Paper className="col-md-8">
                    <div>
                    <form onSubmit={this.actualizarAsistencia} className="col-8">
                        <div className="form-group">
                            <label>Empleado</label>
                            <select ref={this.empleadosRef} defaultValue={this.state.idEmpleado} className="form-control" required>
                                <option defaultValue={this.state.idEmpleado}>{this.state.nombreEmpleado}</option>
                                                                
                                {this.state.empleados.map(empleado => (
                                    <ListadoEmpleadosEdicion
                                        key = {empleado.id}
                                        empleados = {empleado}
                                    />
                                ))}
                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Horarios</label>
                            <FormGroup style={{display: 'flex', justifyContent: 'space-between'}}>
                                <InputGroup>
                                <InputGroup.Addon>Fecha y Hora Entrada</InputGroup.Addon>
                                <FormControl onChange={this.handleChangetimeIn} name="timeIn" style={{width: 200}} type="datetime-local" defaultValue={this.state.timeInForm} required/>
                                </InputGroup>
                                <InputGroup>
                                <InputGroup.Addon>Fecha y Hora Salida</InputGroup.Addon>
                                <FormControl onChange={this.handleChangetimeOut} name="timeOut" style={{width: 200}} type="datetime-local" required/>
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div align="center" className="form-group">
                            <input type="submit" value="Enviar" className="btn btn-primary"/>
                            <button style={{marginLeft: 20, width: 80}} onClick={this.setRedirectToHome} type="button" className="btn btn-danger">Cancelar</button>
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

const mapStateToProps = state => ({
  asistencias : state.asistencias.asistencias
});

export default connect(mapStateToProps, {editarAsistencia})(AsistenciaIndividual);
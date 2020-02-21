import React, { Component } from 'react';
import axios from 'axios'
import {Navigation} from 'react-router';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../../header/IndexHeader';
import ListadoRolesEmpleados from './ListaRolEmpleado';

//CSS
import Swal from 'sweetalert2'
import '../../../assets/css/empleados/form-alta-empleados.css';
import { css } from "@emotion/core";

// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

//Redux
import { connect } from 'react-redux';
import { editarEmpleado } from '../../../actions/empleadosAction'

import { Redirect } from 'react-router-dom';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EditarEmpleado extends Component {

    state = {
        rol : '',
        roles : [],
        error : false,
        redirectHome: false,
    }


    componentDidMount(){

        const rol = parseInt(this.props.location.state.Rols);
    }

//     dniRef = React.createRef();
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    emailRef = React.createRef();
    primerTelefonoRef = React.createRef();
    segundoTelefonoRef = React.createRef();
    rolRef = React.createRef();

    componentWillMount(){

        var accessToken =  localStorage.getItem('access-token');
        
        axios.get('https://roraso.herokuapp.com/Rol/rols', {headers: {'access-token': accessToken}})
            .then(res => {
                if(res.data.length === 0){
                    return null;
                }else{
                    this.setState({
                        roles : res.data
                    })
                    // const rolEmpleado = this.state.roles;
                }
            })
            .catch(err => {
                console.log(err);
            })
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

    crearEmpleado = (e) => {

        e.preventDefault();

        const empleado = {
            id : this.props.location.state.id,
            dni : this.props.location.state.Dni,
            nombre : this.nombreRef.current.value,
            apellido : this.apellidoRef.current.value,
            email : this.emailRef.current.value,
            primerTelefono : this.primerTelefonoRef.current.value,
            segundoTelefono : this.segundoTelefonoRef.current.value,
            rol : this.rolRef.current.value,
        }

        if(Number(empleado.dni) === 'NaN' || empleado.dni === '' || empleado.nombre === '' || empleado.apellido === '' 
        || empleado.primerTelefono === '' ){
            // console.log('error');
            this.setState({error : true});
            Swal.fire({
                title: 'Error!',
                text: 'Faltan o hay errores en el formulario',
                type: 'error',
                confirmButtonText: 'Aceptar'
            })
            return;
        }else{
            this.setState({error : false});
            this.props.editarEmpleado(empleado)
        }
    }

    render() {

        let rol_encontrado = [];

        this.state.roles.map(rol => (
            rol_encontrado = this.state.roles.filter(id_rol => (id_rol.id === this.props.location.state.Rols))
        ))

        
        if(this.props.rol == "undefinded" && rol_encontrado.length === 0) return(
            <div style={{marginTop: '40px', marginBottom: '40px'}}>
                <DotLoader
                css={override}
                size={50} // or 150px
                color={"#4D4D4D"}
                loading={this.state.loading}
                />
            </div>
        );

        if(rol_encontrado[0] == undefined) return (
            <div style={{marginTop: '40px', marginBottom: '40px'}}>
                <DotLoader
                css={override}
                size={50} // or 150px
                color={"#4D4D4D"}
                loading={this.state.loading}
                />
            </div>
        )

        return (
            <div>
                <Header titulo = 'Editar Empleado'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form onSubmit={this.crearEmpleado} className="col-8">
                                <div className="form-group">
                                    <label>DNI</label>
                                    <input
                                    //  ref={this.dniRef}
                                    disabled type="text" defaultValue={this.props.location.state.Dni} className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input ref={this.nombreRef} type="text" defaultValue={this.props.location.state.Name} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Apellido</label>
                                    <input ref={this.apellidoRef} type="text" defaultValue={this.props.location.state.LastName} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref={this.emailRef} type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" defaultValue={this.props.location.state.Email} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>1º Telefono / Celular</label>
                                    <input ref={this.primerTelefonoRef} type="text" defaultValue={this.props.location.state.PrimaryPhone} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>2º Telefono / Celular</label>
                                    <input ref={this.segundoTelefonoRef} type="text" defaultValue={this.props.location.state.SecondaryPhone} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <select ref={this.rolRef} className="form-control">
                                        <option disabled defaultValue={this.props.location.state.Rols}>Actual: {rol_encontrado[0].Name}</option>
                                        
                                        {this.state.roles.map(rol => (
                                            <ListadoRolesEmpleados
                                                key = {rol.id}
                                                roles = {rol}
                                            />
                                        ))}

                                        
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Aceptar" className="btn btn-primary"/>
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
    empleado : state.empleados.empleado
})

export default connect(mapStateToProps, {editarEmpleado})(EditarEmpleado);
 
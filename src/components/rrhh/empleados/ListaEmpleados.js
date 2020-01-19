import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SortableTbl from "react-sort-search-table";

//Redux

import { connect } from 'react-redux';
import { mostrarEmpleados } from '../../../actions/empleadosAction';
import { eliminarEmpleado } from '../../../actions/empleadosAction';
import { currentUser } from '../../../actions/usuarioAction';

//CSS
import Swal from 'sweetalert2'
import { css } from "@emotion/core";

// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

let col = ["Dni", "Name", "LastName", "Email", "Actions"];
let tHead = [
    "DNI",
    "Nombre",
    "Apellido",
    "Email",
    "Acciones",
];

class ActionEmpleadoComponent extends React.Component {

    eliminarEmpleado = () =>{
        const {id} = this.props.rowData;

        if(id === this.props.currentIdUser){
            Swal.fire({
                title: 'Error!',
                text: 'No puedes borrar tu usuario actual',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
        }
        else{
            this.props.eliminarEmpleado(id);
        }

        // 
    }

    

  render() {
      
    // console.log(this.props)

    if(this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;

    // console.log(permisos[1])

    return (
        <td style={columnButtonStyle}>
            { permisos.filter(permiso => (permiso.id == 2)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/empleados/${id}`,
                        state : this.props.info
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    :  

                    <Link style={buttonStyle} 
                        disabled to="#" 
                        className="btn btn-primary">
                        Ver
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 3)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/editar-empleados/${id}`,
                        state : this.props.rowData
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    :  

                    <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                        Editar
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 4)).length > 0 ?  
                
                    <button style={buttonStyle} onClick={ this.eliminarEmpleado } type="button" className="btn btn-danger">Borrar</button>

                    :  

                     <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
            }
            
        </td> 
    );
  }
}

class ListadoEmpleados extends Component {

    state = {
        loading: true,
        currentIdUser : 0
    };

    componentWillMount(){
        this.props.mostrarEmpleados();
        this.props.currentUser();
    }

    componentDidMount(){
        axios.get("https://roraso.herokuapp.com/User/CurrentUser",
        { headers: { 'access-token': localStorage.getItem('access-token')}})
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        currentIdUser : res.data.User.Id
                    })
                }else{
                    return null;
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {

        const empleados = this.props.empleados;

        if(empleados.length === 0) {
            return (
                <div style={{marginTop: '40px', marginBottom: '40px'}}>
                    <DotLoader
                    css={override}
                    size={50} // or 150px
                    color={"#4D4D4D"}
                    loading={this.state.loading}
                    />
                </div>
        )}
        else{

            return (
                <SortableTbl tblData={empleados.sort(function(a, b) {return b.id - a.id})}
                    tHead={tHead}
                    currentIdUser={this.state.currentIdUser}
                    Permisos={this.props.usuario}
                    customTd={[
                                {custd: (ActionEmpleadoComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarEmpleado = {this.props.eliminarEmpleado}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    empleados : state.empleados.empleados,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarEmpleados,
    eliminarEmpleado,
    currentUser
})(ListadoEmpleados);
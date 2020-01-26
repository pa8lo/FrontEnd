import React, { Component } from 'react';

import {Col} from 'react-bootstrap';
import Header from '../header/IndexHeader';

//CSS
import { css } from "@emotion/core";

import axios from 'axios';

//CSS
import Swal from 'sweetalert2'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
    maxWidth: "100%",
    minWidth: "100%",
    paddingTop: 3
};

const buttonStyle = {
    marginLeft: 10,
    width: 80
};

class ConsultarDireccionCliente extends Component {

    state = {
        loading: true
    };

    eliminarDireccion = async (id) => {
        

        Swal.fire({
            title: '¿Estas seguro que desea eliminar?',
            text: "Estas a punto de eliminar una direccion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                axios.post("https://roraso.herokuapp.com/Client/DeleteAddress",{'id': id},
                { headers: { 'access-token': localStorage.getItem('access-token')}})
                    .then(res => {
                        if(res.status === 200){
                            Swal.fire({
                                title: 'Correcto!',
                                text: 'Se ha borrado una direccion',
                                type: 'success',
                                confirmButtonText: 'Confirmar'
                            })
                            setTimeout(function(){ 
                                window.location.href = "/clientes";
                            }, 3500);
                        }
                        else{
                            Swal.fire({
                                title: 'Error!',
                                text: 'Se ha producido un error al intentar borrar la direccion',
                                type: 'error',
                                confirmButtonText: 'Reintentar'
                            })
                            return;
                        }
                        
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'El Servidor no ha respondido la solicitud',
                            type: 'error',
                            confirmButtonText: 'Reintentar'
                        })
                        return;
                    })
            }
          })   

            
        
    }

    render() {


        console.log(this.props)

        return(

            <React.Fragment>

            <Header titulo = 'Consulta de Direcciones'/>

            {this.props.location.state.Adress.map(address => (

                <div key={address.id} style={{marginTop: "50px"}}>
                    <Col xs={12} md={6}>
                    <div align="center" className="form-group">
                        <label>Direccion</label>
                        <h3>{address.Adress == null || address.Adress == "" ? "Sin Direccion" : address.Adress}</h3>
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={6}>
                    <div className="form-group">
                        <label>Departamento</label>
                        <h3>{address.Department == null ? "Sin Dpto" : address.Department}</h3>
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={6}>
                    <div className="form-group">
                        <label>Piso</label>
                        <h3>{address.Floor == null ? "Sin Piso" : address.Floor}</h3>
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={6}>
                    <div className="form-group">
                        <label>Codigo Postal</label>
                        <h3>{address.Cp == null ? "Sin CP" : address.Cp}</h3>
                    </div>
                    </Col>
                    <Col align="center" xs={12} md={12} style={{marginTop:'20px',marginBottom:'40px'}}>

                    {/* <Link className={buttonStyle} style={{color:"white", backgroundColor: "#4D4D4D"}} to={{
                        pathname : `/rrhh/asistencias/${address.id}`,
                        state : address,
                        idUser : address.asistenciaid,
                        userName : address
                        }} className="btn">
                        Editar Direccion
                    </Link> */}

                    <button style={{marginLeft: 10, width: 140}} name="idEliminarAsistencia" 
                    onClick={() => this.eliminarDireccion(address.id)} 
                    value={address.id} type="button" className="btn btn-danger">Borrar Direccion</button>
                    </Col>
                </div>
                )
        )}
        
        </React.Fragment>        
        )

    }
}


export default ConsultarDireccionCliente;
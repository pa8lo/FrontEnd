import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2'
import {Modal, Button, Row, Col, Panel } from 'react-bootstrap';
import SortableTbl from "../../react-sort-search-table/src/SortableTbl";

//Redux
import { connect } from 'react-redux';
import { mostrarAsistencias } from '../../../actions/asistenciasAction';
import { eliminarAsistencia } from '../../../actions/asistenciasAction';
import { currentUser } from '../../../actions/usuarioAction';

//CSS
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

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
    width: 130,
};


let col = ["Name", "LastName", "countAss", "Actions"];
let tHead = [
    "Nombre",
    "Apellido",
    "Cant. Asistencias",
    "Acciones",
];

class MyVerticallyCenteredModal extends Component {

    constructor(...args) {
      super(...args);
    }

    eliminarAsistencia = (id) => {
        // console.log(id)

        Swal.fire({
            title: '¿Estas seguro que desea eliminar?',
            text: "Estas a punto de eliminar una asistencia",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                
                axios.post("https://roraso.herokuapp.com/Asisstance/Delete",{'id': id},
                { headers: { 'access-token': localStorage.getItem('access-token')}})
                .then(res => {
                    if(res.status === 200){
                        Swal.fire({
                            title: 'Correcto!',
                            text: 'Se ha borrado una asistencia',
                            type: 'success',
                            confirmButtonText: 'Confirmar'
                        })
                        setTimeout(function(){ 
                            window.location.href = "/rrhh/asistencias";
                        }, 3500);
                    }
                    else{
                        Swal.fire({
                            title: 'Error!',
                            text: 'Se ha producido un error al intentar borrar la asistencia',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        })
                        return;
                    }
                    
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error!',
                        text: 'El Servidor no ha respondido la solicitud',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                    return;
                })
            }
          })

        
    }
  
    render() {
        
    // console.log(this.props)
  
        let verificarDatos = () =>{
            if(this.props.asistencias.length === 0){
                return (<h2 align='center'>No hay datos</h2>)
            }else{

                return(
                    <React.Fragment>
                        {this.props.asistencias.map(asistencia => (

                        console.log(asistencia),
                        <React.Fragment key={asistencia.id}>
                            <Col xs={12} md={6}>
                            <div align="center" className="form-group">
                                <label>Entrada</label>
                                {asistencia.InTime == "0000-00-00 00:00:00" || asistencia.InTime == "undefined" ?

                                <h3></h3>

                                :

                                <h3>{asistencia.InTime.split("T")[0] + " " + asistencia.InTime.split("T")[1].split(".")[0]}</h3>

                                } 
                                
                            </div>
                            </Col>
                            <Col align="center" xs={12} md={6}>
                            <div className="form-group">
                                <label>Salida</label>
                                <h3>{verificarOutTime(asistencia.OutTime)}</h3>
                            </div>
                            </Col>
                            <Col align="center" xs={12} md={12} style={{marginTop:'20px',marginBottom:'40px'}}>
                            <Link className={buttonStyle} style={{color:"white", backgroundColor: "#4D4D4D"}} to={{
                                pathname : `/rrhh/asistencias/${asistencia.id}`,
                                state : asistencia,
                                idUser : this.props.asistenciaid,
                                userName : this.props.asistencianame
                                }} className="btn">
                                Editar Asistencia
                            </Link>
                            <button style={buttonStyle} name="idEliminarAsistencia" onClick={() => this.eliminarAsistencia(asistencia.id)} value={asistencia.id} type="button" className="btn btn-danger">Borrar Asistencia</button>
                            </Col>
                        </React.Fragment>

                        ))}
                    </React.Fragment>
                )
            }
        }

        let verificarOutTime = (asistencia) =>{

            // console.log(asistencia)

            // console.log(this.props)

            if(asistencia === ''){
                return "No hay datos"
            }else{

                // console.log(asistencia)

                if(asistencia.InTime == "0000-00-00 00:00:00" || asistencia.OutTime == "0000-00-00 00:00:00"){
                    return null
                }else{
                    if(asistencia.InTime == "0000-00-00 00:00:00"){
                        return "0000-00-00 00:00:00"
                    }else{
                        // return asistencia.split("T")[0] + " " + asistencia.split("T")[1].split(".")[0]
                    }
                }
            }
            // console.log(asistencia)
        }
  
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered="true"
          style={{marginTop: '100px'}}
        >
          <Modal.Header closeButton>
            <Modal.Title align='center' id="contained-modal-title-vcenter">
              Asistencias Asignadas
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Row className="show-grid">

                {verificarDatos()}
                
              </Row>
          </Modal.Body>
          <Modal.Footer>
          <Col xs={12} md={12}>
            <Button onClick={this.props.onHide}>Cerrar</Button>
          </Col>
          </Modal.Footer>
        </Modal>
      );
    }
  }

class ActionAsistenciaComponent extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            modalShow: false
        }

    }

  eliminarAsistencia = () =>{
        const {id} = this.props.rowData;

        this.props.eliminarAsistencia(id);
    }

  render() {

    let modalClose = () => this.setState({ modalShow: false });

    if(this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;

    return (
        <td style={columnButtonStyle}>
            
            {/* {console.log(this.props.info.Name)} */}
            <MyVerticallyCenteredModal
                show={this.state.modalShow}
                onHide={modalClose}
                asistenciaid={this.props.rowData.id}
                asistencias={this.props.rowData.Assistance}
                asistencianame={this.props.rowData.Name}
            //   borrarasistencia={this.props.eliminarAsistencia()}
            />

            { permisos.filter(permiso => (permiso.id == 29)).length > 0 ? 

                <Button
                    style={buttonStyle}
                    className="btn btn-primary"
                    variant="primary"
                    onClick={() => this.setState({ modalShow: true })}
                    >
                    Ver Asistencias
                </Button>


                :


                <Button
                    style={buttonStyle}
                    className="btn btn-primary"
                    variant="primary">
                    Ver Asistencias
                </Button>

            }

        </td> 
    );
  }
}

class ListaAsistencias extends Component {

    state = {
        loading: true
    };

    componentDidMount(){
        this.props.mostrarAsistencias();
        this.props.currentUser();
    }

    render() {

        // if(this.props.asistencia == null || this.props.asistencia == undefined || this.props.asistencia == []) return null;

        const asistencias = this.props.asistencias;
        // for (var i = 0; i < asistencias.length; i++) {
        //     asistencias[i].countAss = asistencias[i].Assistance.length;
        // }

        if(asistencias.length === 0) {
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
                <SortableTbl tblData={asistencias.sort(function(a, b) {return b.id - a.id})}
                    tHead={tHead}
                    Permisos={this.props.usuario}
                    customTd={[
                                {custd: (ActionAsistenciaComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarAsistencia = {this.props.eliminarAsistencia}
                />
            );

	    }

        
    }
}

const mapStateToProps = state => ({
    asistencias : state.asistencias.asistencias,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarAsistencias,
    eliminarAsistencia,
    currentUser
})(ListaAsistencias);
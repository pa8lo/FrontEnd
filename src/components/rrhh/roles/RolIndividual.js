// Ver https://5c507d49471426000887a6a7--react-bootstrap.netlify.com/utilities/transitions/

import React, { Component } from 'react';

//Componentes
import { CustomInput } from 'reactstrap';
import { Tab, Row, Col, Nav, NavItem, Checkbox } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';

//Componentes
import Header from '../../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { mostrarRol } from '../../../actions/rolesAction'

class RolIndividual extends Component {

    constructor(...args) {
        super(...args);
  
        this.state = {
            rol : [],
            //User
            UserCreate: false,
            UserView: false,
            UserEdit: false,
            UserDelete: false,
            //Cliente
            ClientCreate: false,
            ClientView: false,
            ClientEdit: false,
            ClientDelete: false,
            //Roles
            RolCreate: false,
            RolView: false,
            RolEdit: false,
            RolDelete: false,
            //Pedidos
            PedidoCreate: false,
            PedidoView: false,
            PedidoEdit: false,
            PedidoDelete: false,
            //Productos
            ProductoCreate: false,
            ProductoView: false,
            ProductoEdit: false,
            ProductoDelete: false,
            //Permisos
            PermisosCreate: false,
            PermisosEdit: false,
            PermisosDelete: false,
            //Gastos
            GastoCreate: false,
            GastoView: false,
            GastoEdit: false,
            GastoDelete: false,
            //Turnos & Asistencias
            TACreate: false,
            TAView: false,
            TAEdit: false,
            TADelete: false,
        };
    }

    componentDidMount(){

        this.props.mostrarRol(this.props.match.params.rolId);

    }

    CargarRoles = async () => {
        
        //Usuario
        this.state.UserCreate = false;
        this.state.UserView= false;
        this.state.UserEdit= false;
        this.state.UserDelete= false;
        //Cliente
        this.state.ClientCreate= false;
        this.state.ClientView= false;
        this.state.ClientEdit= false;
        this.state.ClientDelete= false;
        //Roles
        this.state.RolCreate= false;
        this.state.RolView= false;
        this.state.RolEdit= false;
        this.state.RolDelete= false;
        //Pedidos
        this.state.PedidoCreate= false;
        this.state.PedidoView= false;
        this.state.PedidoEdit= false;
        this.state.PedidoDelete= false;
        //Productos
        this.state.ProductoCreate= false;
        this.state.ProductoView= false;
        this.state.ProductoEdit= false;
        this.state.ProductoDelete= false;
        //Permisos
        this.state.PermisosCreate= false;
        this.state.PermisosEdit= false;
        this.state.PermisosDelete= false;
        //Gastos
        this.state.GastoCreate= false;
        this.state.GastoView= false;
        this.state.GastoEdit= false;
        this.state.GastoDelete= false;
        //Turnos & Asistencias
        this.state.TACreate= false;
        this.state.TAView= false;
        this.state.TAEdit= false;
        this.state.TADelete= false;


        {this.props.rol.Authorizations.map(rol => {

            switch(rol.id){
                    //Usuario
                case 1 :
                    this.state.UserCreate = true; break
                case 2 :
                    this.state.UserView = true; break
                case 3 :
                    this.state.UserEdit = true; break
                case 4 :
                    this.state.UserDelete = true; break
                    //Cliente
                case 5 :
                    this.state.ClientCreate = true; break
                case 6 :
                    this.state.ClientView = true; break
                case 7 :
                    this.state.ClientEdit = true; break
                case 8 :
                    this.state.ClientDelete = true; break
                    //Rol
                case 9 :
                    this.state.RolCreate = true; break
                case 10 :
                    this.state.RolView = true; break
                case 11 :
                    this.state.RolEdit = true; break
                case 12 :
                    this.state.RolDelete = true; break
                    //Pedido
                case 20 :
                    this.state.PedidoCreate = true; break
                case 21 :
                    this.state.PedidoView = true; break
                case 22 :
                    this.state.PedidoEdit = true; break
                case 23 :
                    this.state.PedidoDelete = true; break
                    //Producto
                case 16 :
                    this.state.ProductoCreate = true; break
                case 17 :
                    this.state.ProductoView = true; break
                case 18 :
                    this.state.ProductoEdit = true; break
                case 19 :
                    this.state.ProductoDelete = true; break
                    //Permisos
                case 21 :
                    this.state.PermisosCreate = true; break
                case 22 :
                    this.state.PermisosEdit = true; break
                case 23 :
                    this.state.PermisosDelete = true; break
                    //Gasto
                case 24 :
                    this.state.GastoCreate = true; break
                case 25 :
                    this.state.GastoView = true; break
                case 26 :
                    this.state.GastoEdit = true; break
                case 27 :
                    this.state.GastoDelete = true; break
                    //Turnos & Asistencias
                case 28 :
                    this.state.TACreate = true; break
                case 29 :
                    this.state.TAView = true; break
                case 30 :
                    this.state.TAEdit = true; break
                case 31 :
                    this.state.TADelete = true; break
                default :
                    return;
            }

        })}
        
    }

    goBack(){
      window.history.back();
    }

    mostrarRol = () => {

        if(this.props.rol == undefined) return null;

        this.CargarRoles();

        return(
            <div className="table-empleados">
            <Paper className="col-md-8">
                <div>
                <form className="col-8">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input value={this.props.rol.Name} disabled type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Descripcion</label>
                        <input value={this.props.rol.Description} disabled type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Permisos</label>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="clearfix">
                            <Col sm={3}>
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="first">Usuarios</NavItem>
                                <NavItem eventKey="second">Clientes</NavItem>
                                <NavItem eventKey="third">Roles</NavItem>
                                <NavItem eventKey="fourth">Pedidos</NavItem>
                                <NavItem eventKey="fifth">Productos</NavItem>
                                <NavItem eventKey="sixth">Reportes</NavItem>
                                <NavItem eventKey="seven">Gasto</NavItem>
                                <NavItem eventKey="eight">Turnos</NavItem>
                            </Nav>
                            </Col>
                            <Col sm={8}>
                            <Tab.Content  animation style={{marginLeft: 150}}>
                                {/* Usuarios */}
                                <Tab.Pane eventKey="first">
                                    <CustomInput type="checkbox"
                                        checked={this.state.UserCreate}
                                        id='1'
                                        disabled
                                        label="Crear Usuario" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.UserView}
                                        id='2'
                                        disabled
                                        label="Ver Usuario" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.UserEdit}
                                        id='3'
                                        disabled
                                        label="Modificar Usuario" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.UserDelete}
                                        id='4'
                                        disabled
                                        label="Borrar Usuario" />
                                </Tab.Pane>
                                {/* Clientes */}
                                <Tab.Pane eventKey="second">
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientCreate}
                                        id='5'
                                        disabled
                                        label="Crear Cliente" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientView}
                                        id='6'
                                        disabled
                                        label="Ver Cliente" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientEdit}
                                        id='7'
                                        disabled
                                        label="Modificar Cliente" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ClientDelete}
                                        id='8'
                                        disabled
                                        label="Borrar Cliente" />
                                </Tab.Pane>
                                {/* Roles */}
                                <Tab.Pane eventKey="third">
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolCreate}
                                        id='9'
                                        disabled
                                        label="Crear Roles" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolView}
                                        id='10'
                                        disabled
                                        label="Ver Roles" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolEdit}
                                        id='11'
                                        disabled
                                        label="Modificar Roles" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.RolDelete}
                                        id='12'
                                        disabled
                                        label="Borrar Roles" />
                                </Tab.Pane>
                                {/* Pedidos */}
                                <Tab.Pane eventKey="fourth">
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoCreate}
                                        id='20'
                                        disabled
                                        label="Crear Pedidos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoView}
                                        id='21'
                                        disabled
                                        label="Ver Pedidos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoEdit}
                                        id='22'
                                        disabled
                                        label="Modificar Pedidos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.PedidoDelete}
                                        id='23'
                                        disabled
                                        label="Borrar Pedidos" />
                                </Tab.Pane>
                                {/* Productos */}
                                <Tab.Pane eventKey="fifth">
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoCreate}
                                        id='16'
                                        disabled
                                        label="Crear Productos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoView}
                                        id='17'
                                        disabled
                                        label="Ver Productos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoEdit}
                                        id='18'
                                        disabled
                                        label="Modificar Productos" />
                                    <CustomInput type="checkbox"
                                        checked={this.state.ProductoDelete}
                                        id='19'
                                        disabled
                                        label="Borrar Productos" />
                                </Tab.Pane>
                                {/* Permisos */}
                                <Tab.Pane eventKey="sixth">
                                    <CustomInput type="checkbox" 
                                        checked={this.state.PermisosCreate}
                                        id='13'
                                        disabled
                                        label="Ver Reportes" />
                                    {/* <CustomInput type="checkbox" 
                                        checked={this.state.PermisosEdit}
                                        id='14'
                                        disabled
                                        label="Modificar Permisos" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.PermisosDelete}
                                        id='15'
                                        disabled
                                        label="Borrar Permisos" /> */}
                                </Tab.Pane>
                                {/* Gastos */}
                                <Tab.Pane eventKey="seven">
                                    <CustomInput type="checkbox"
                                        checked={this.state.GastoCreate} 
                                        id='24'
                                        disabled
                                        label="Crear Gasto" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.GastoView}
                                        id='25'
                                        disabled
                                        label="Ver Gasto" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.GastoEdit}
                                        id='26'
                                        disabled
                                        label="Modificar Gasto" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.GastoDelete}
                                        id='27'
                                        disabled
                                        label="Borrar Gasto" />
                                </Tab.Pane>
                                {/* Turnos y Asistencias */}
                                <Tab.Pane eventKey="eight">
                                    <CustomInput type="checkbox" 
                                        checked={this.state.TACreate}
                                        id='28'
                                        disabled
                                        label="Crear Turno" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.TAView}
                                        id='29'
                                        disabled
                                        label="Ver Turno" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.TAEdit}
                                        id='30'
                                        disabled
                                        label="Modificar Turno" />
                                    <CustomInput type="checkbox" 
                                        checked={this.state.TADelete}
                                        id='31'
                                        disabled
                                        label="Borrar Turno" />
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                        </Tab.Container>
                    </div>
                </form>
                </div>
                <div align="center" style={{marginTop:"20px"}} className="form-group">
                    <button type="button" className="btn" style={{color:"white", backgroundColor: "#4D4D4D"}} onClick={ () => this.goBack()}>Volver</button>
                </div>
            </Paper>
            </div>
        );
    }

    render() {

        // if(this.props.rol == undefined) return null;
        if(this.props.rol == undefined) return null;

        return (
          
            <div>
                <Header 
                    titulo = 'Rol'
                />
                {this.mostrarRol()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
  rol : state.roles.rol
})

export default  connect(mapStateToProps, {mostrarRol}) (RolIndividual);
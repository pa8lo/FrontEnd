import React, { Component } from 'react';

//Componentes
import { CustomInput } from 'reactstrap';
import { Tab, Row, Col, Nav, NavItem, Checkbox } from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';

//Assets
import Header from '../../header/IndexHeader';

//CSS
import Swal from 'sweetalert2'

//Redux
import { connect } from 'react-redux';
import { agregarRol } from '../../../actions/rolesAction';

//CSS
import '../../../assets/css/empleados/form-alta-empleados.css';

class NuevoRol extends Component {

    state = {
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
        //Home
        redirectHome: false,
    };

    nombreRef = React.createRef();
    descripcionRef = React.createRef();
    
    /****************************** Roles **********************/

    toggleChangeUserCreate = (e) => {
        this.setState(prevState => ({
            UserCreate: !prevState.UserCreate,
        }));
    }

    toggleChangeUserView = (e) => {
        

        /**********
         * 
         * 

         * 
         * 
         * 
         * */

        if(this.state.UserView === true){

            this.setState(prevState => ({
                UserView: !prevState.UserView,
            }));

        }else{

            Swal.fire({
                title: 'Este permiso esta vinculado con los permisos',
                text: "-Ver Roles ¿Desea agregarlos?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.value) {
                    this.setState(prevState => ({
                        UserView : true,
                        RolView: true,
                    }));
                }else{
                    return ;
                }
            })

        }
    }

    toggleChangeUserEdit = () => {
        

        if(this.state.UserEdit === true){

            this.setState(prevState => ({
                UserEdit: !prevState.UserEdit,
            }));

        }else{

            Swal.fire({
                title: 'Este permiso esta vinculado con los permisos',
                text: "-Ver Roles ¿Desea agregarlos?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.value) {
                    this.setState(prevState => ({
                        UserEdit: true,
                        RolView: true,
                    }));
                }else{
                    return ;
                }
            })
        }
    }

    toggleChangeUserDelete = () => {
        this.setState(prevState => ({
            UserDelete: !prevState.UserDelete,
        }));
    }

    /****************************** Clientes **********************/

    toggleChangeClientCreate = (e) => {
        this.setState(prevState => ({
            ClientCreate: !prevState.ClientCreate,
        }));
    }

    toggleChangeClientView = (e) => {
        this.setState(prevState => ({
            ClientView: !prevState.ClientView,
        }));
    }

    toggleChangeClientEdit = () => {
        this.setState(prevState => ({
            ClientEdit: !prevState.ClientEdit,
        }));
    }

    toggleChangeClientDelete = () => {
        this.setState(prevState => ({
            ClientDelete: !prevState.ClientDelete,
        }));
    }

    /****************************** Roles **********************/

    toggleChangeRolCreate = (e) => {
        this.setState(prevState => ({
            RolCreate: !prevState.RolCreate,
        }));
    }

    toggleChangeRolView = (e) => {
        this.setState(prevState => ({
            RolView: !prevState.RolView,
        }));
    }

    toggleChangeRolEdit = () => {
        this.setState(prevState => ({
            RolEdit: !prevState.RolEdit,
        }));
    }

    toggleChangeRolDelete = () => {
        this.setState(prevState => ({
            RolDelete: !prevState.RolDelete,
        }));
    }

    /****************************** Pedidos **********************/

    toggleChangePedidoCreate = (e) => {
        
        if(this.state.PedidoCreate === true){

            this.setState(prevState => ({
                PedidoCreate: !prevState.PedidoCreate,
            }));

        }else{

            Swal.fire({
                title: 'Este permiso esta vinculado con los permisos',
                text: "-Crear Cliente ¿Desea agregarlos?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.value) {
                    this.setState(prevState => ({
                        PedidoCreate: true,
                        ClientCreate: true,
                    }));
                }else{
                    return ;
                }
            })

        }

    }

    toggleChangePedidoView = (e) => {

        /**********
         * 
         * 

         * 
         * 
         * 
         * */

        if(this.state.PedidoView === true){

            this.setState(prevState => ({
                PedidoView: !prevState.PedidoView,
            })); 

        }else{

            Swal.fire({
                title: 'Este permiso esta vinculado con los permisos',
                text: "-Ver Producto, -Ver Cliente, -Ver Usuarios, -Ver Rol ¿Desea agregarlos?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.value) {
                    this.setState(prevState => ({
                        PedidoView: true,
                        ProductoView: true,
                        ClientView: true,
                        UserView: true,
                        RolView: true,
                    }));
                }else{
                    return ;
                }
            })

        }
    }

    toggleChangePedidoEdit = () => {

        if(this.state.PedidoEdit === true){

            this.setState(prevState => ({
                PedidoEdit: !prevState.PedidoEdit,
            })); 

        }else{

        Swal.fire({
            title: 'Este permiso esta vinculado con los permisos',
            text: "-Ver Pedido, -Ver Producto, -Ver Cliente, -Ver Usuarios, -Ver Rol ¿Desea agregarlos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                this.setState(prevState => ({
                    PedidoEdit: true,
                    PedidoView: true,
                    ProductoView: true,
                    ClientView: true,
                    UserView: true,
                    RolView: true,
                }));
            }else{
                return ;
            }
        })

        }
    } 

    toggleChangePedidoDelete = () => {
        this.setState(prevState => ({
            PedidoDelete: !prevState.PedidoDelete,
        }));
    }

    /****************************** Productos **********************/

    toggleChangeProductoCreate = (e) => {
        this.setState(prevState => ({
            ProductoCreate: !prevState.ProductoCreate,
        }));
    }

    toggleChangeProductoView = (e) => {
        this.setState(prevState => ({
            ProductoView: !prevState.ProductoView,
        }));
    }

    toggleChangeProductoEdit = () => {
        this.setState(prevState => ({
            ProductoEdit: !prevState.ProductoEdit,
        }));
    }

    toggleChangeProductoDelete = () => {
        this.setState(prevState => ({
            ProductoDelete: !prevState.ProductoDelete,
        }));
    }

    /****************************** Permisos **********************/

    toggleChangePermisosCreate = (e) => {
        this.setState(prevState => ({
            PermisosCreate: !prevState.PermisosCreate,
        }));
    }

    toggleChangePermisosEdit = () => {
        this.setState(prevState => ({
            PermisosEdit: !prevState.PermisosEdit,
        }));
    }

    toggleChangePermisosDelete = () => {
        this.setState(prevState => ({
            PermisosDelete: !prevState.PermisosDelete,
        }));
    }

    /****************************** Gastos **********************/

    toggleChangeGastoCreate = (e) => {
        this.setState(prevState => ({
            GastoCreate: !prevState.GastoCreate,
        }));
    }

    toggleChangeGastoView = (e) => {
        this.setState(prevState => ({
            GastoView: !prevState.GastoView,
        }));
    }

    toggleChangeGastoEdit = () => {
        this.setState(prevState => ({
            GastoEdit: !prevState.GastoEdit,
        }));
    }

    toggleChangeGastoDelete = () => {
        this.setState(prevState => ({
            GastoDelete: !prevState.GastoDelete,
        }));
    }

    /****************************** Turnos & Asistencias **********************/

    toggleChangeTACreate = (e) => {

        if(this.state.TACreate === true){

            this.setState(prevState => ({
                TACreate: !prevState.TACreate,
            }));

        }else{

            Swal.fire({
                title: 'Este permiso esta vinculado con los permisos',
                text: "-Ver Usuarios ¿Desea agregarlos?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.value) {
                    this.setState(prevState => ({
                        TACreate: true,
                        UserView: true,
                    }));
                }else{
                    return ;
                }
            })

        }
    }

    toggleChangeTAView = (e) => {
        

        if(this.state.TAView === true){

            this.setState(prevState => ({
                TAView: !prevState.TAView,
            }));

        }else{

            Swal.fire({
                title: 'Este permiso esta vinculado con los permisos',
                text: "-Ver Usuarios ¿Desea agregarlos?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.setState(prevState => ({
                        TAView: true,
                        UserView: true,
                    }));
                }else{
                    return ;
                }
            })

        }
    }

    toggleChangeTAEdit = () => {
        this.setState(prevState => ({
            TAEdit: !prevState.TAEdit,
        }));
    }

    toggleChangeTADelete = () => {
        this.setState(prevState => ({
            TADelete: !prevState.TADelete,
        }));
    }

    crearRol = (e) => {
        e.preventDefault();

        const permisos = []; 

        //Usuario

        if(this.state.UserCreate === true){
            permisos.push(1);
        }

        if (this.state.UserView === true){
            permisos.push(2);
        }

        if (this.state.UserEdit === true){
            permisos.push(3);
        }

        if (this.state.UserDelete === true){
            permisos.push(4);
        }

        //Cliente

        if (this.state.ClientCreate === true){
            permisos.push(5);
        }

        if (this.state.ClientEdit === true){
            permisos.push(7);
        }

        if (this.state.ClientView === true){
            permisos.push(6);
        }

        if (this.state.ClientDelete === true){
            permisos.push(8);
        }

        //Roles

        if (this.state.RolCreate === true){
            permisos.push(9);
        }

        if (this.state.RolEdit === true){
            permisos.push(11);
        }

        if (this.state.RolView === true){
            permisos.push(10);
        }

        if (this.state.RolDelete === true){
            permisos.push(12);
        }

        //Pedidos

        if (this.state.PedidoCreate === true){
            permisos.push(20);
        }

        if (this.state.PedidoEdit === true){
            permisos.push(22);
        }

        if (this.state.PedidoView === true){
            permisos.push(21);
        }

        if (this.state.PedidoDelete === true){
            permisos.push(23);
        }

        //Productos

        if (this.state.ProductoCreate === true){
            permisos.push(16);
        }

        if (this.state.ProductoEdit === true){
            permisos.push(18);
        }

        if (this.state.ProductoView === true){
            permisos.push(17);
        }

        if (this.state.ProductoDelete === true){
            permisos.push(19);
        }

        //Permisos

        if (this.state.PermisosCreate === true){
            permisos.push(13);
        }

        if (this.state.PermisosEdit === true){
            permisos.push(14);
        }

        if (this.state.PermisosDelete === true){
            permisos.push(15);
        }

        //Gastos

        if (this.state.GastoCreate === true){
            permisos.push(24);
        }

        if (this.state.GastoEdit === true){
            permisos.push(26);
        }

        if (this.state.GastoView === true){
            permisos.push(25);
        }

        if (this.state.GastoDelete === true){
            permisos.push(27);
        }

        //Turnos & Asistencias

        if (this.state.TACreate === true){
            permisos.push(28);
        }

        if (this.state.TAEdit === true){
            permisos.push(30);
        }

        if (this.state.TAView === true){
            permisos.push(29);
        }

        if (this.state.TADelete === true){
            permisos.push(31);
        }

        // console.log(permisos);

        const rol = {
            nombre : this.nombreRef.current.value,
            descripcion : this.descripcionRef.current.value,
            permisos : permisos
        }

        // console.log(rol);

        this.props.agregarRol(rol);

        // e.currentTarget.reset();
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
            <Header titulo = 'Alta de Rol'/>
            <div className="table-empleados">
                <Paper className="col-md-8">
                    <div>
                    <form onSubmit={this.crearRol} className="col-8">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input ref={this.nombreRef} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Descripcion</label>
                            <input ref={this.descripcionRef} type="text" className="form-control" />
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
                                    <NavItem eventKey="eight">Asistencias</NavItem>
                                </Nav>
                                </Col>
                                <Col sm={8}>
                                <Tab.Content  animation style={{marginLeft: 150}}>
                                    {/* Usuarios */}
                                    <Tab.Pane eventKey="first">
                                        <CustomInput type="checkbox"
                                            id='1'
                                            value='1'
                                            checked={this.state.UserCreate}
                                            onChange={this.toggleChangeUserCreate}
                                            label="Crear Usuario" />
                                        <CustomInput type="checkbox"
                                            id='2'
                                            value='2'
                                            checked={this.state.UserView}
                                            onChange={this.toggleChangeUserView}
                                            label="Ver Usuario" />
                                        <CustomInput type="checkbox" 
                                            id='3'
                                            value='3'
                                            checked={this.state.UserEdit}
                                            onChange={this.toggleChangeUserEdit}
                                            label="Modificar Usuario" />
                                        <CustomInput type="checkbox" 
                                            value='4'
                                            id='4'
                                            checked={this.state.UserDelete}
                                            onChange={this.toggleChangeUserDelete}
                                            label="Borrar Usuario" />
                                    </Tab.Pane>
                                    {/* Clientes */}
                                    <Tab.Pane eventKey="second">
                                        <CustomInput type="checkbox" 
                                            id='5'
                                            value="5" 
                                            checked={this.state.ClientCreate}
                                            onChange={this.toggleChangeClientCreate}
                                            label="Crear Cliente" />
                                        <CustomInput type="checkbox" 
                                            id='6'
                                            value="6" 
                                            checked={this.state.ClientView}
                                            onChange={this.toggleChangeClientView}
                                            label="Ver Cliente" />
                                        <CustomInput type="checkbox" 
                                            id='7'
                                            value="7"
                                            checked={this.state.ClientEdit}
                                            onChange={this.toggleChangeClientEdit}
                                            label="Modificar Cliente" />
                                        <CustomInput type="checkbox" 
                                            id='8'
                                            value="8"
                                            checked={this.state.ClientDelete}
                                            onChange={this.toggleChangeClientDelete}
                                            label="Borrar Cliente" />
                                    </Tab.Pane>
                                    {/* Roles */}
                                    <Tab.Pane eventKey="third">
                                        <CustomInput type="checkbox" 
                                            id='9'
                                            value="9" 
                                            checked={this.state.RolCreate}
                                            onChange={this.toggleChangeRolCreate}
                                            label="Crear Roles / Asignar Dirección a Restaurant" />
                                        <CustomInput type="checkbox" 
                                            id='10'
                                            value="10" 
                                            checked={this.state.RolView}
                                            onChange={this.toggleChangeRolView}
                                            label="Ver Roles" />
                                        <CustomInput type="checkbox" 
                                            id='11'
                                            value="11"
                                            checked={this.state.RolEdit}
                                            onChange={this.toggleChangeRolEdit}
                                            label="Modificar Roles" />
                                        <CustomInput type="checkbox" 
                                            id='12'
                                            value="12" 
                                            checked={this.state.RolDelete}
                                            onChange={this.toggleChangeRolDelete}
                                            label="Borrar Roles" />
                                    </Tab.Pane>
                                    {/* Pedidos */}
                                    <Tab.Pane eventKey="fourth">
                                        <CustomInput type="checkbox" 
                                            id='20'
                                            value="20" 
                                            checked={this.state.PedidoCreate}
                                            onChange={this.toggleChangePedidoCreate}
                                            label="Crear Pedidos / Estado" />
                                        <CustomInput type="checkbox" 
                                            id='21'
                                            value="21" 
                                            checked={this.state.PedidoView}
                                            onChange={this.toggleChangePedidoView}
                                            label="Ver Pedidos / Estado / Mapa" />
                                        <CustomInput type="checkbox" 
                                            id='22'
                                            value="22"
                                            checked={this.state.PedidoEdit}
                                            onChange={this.toggleChangePedidoEdit}
                                            label="Modificar Pedidos / Estado / Mapa" />
                                        <CustomInput type="checkbox" 
                                            id='23'
                                            value="23" 
                                            checked={this.state.PedidoDelete}
                                            onChange={this.toggleChangePedidoDelete}
                                            label="Borrar Pedidos" />
                                    </Tab.Pane>
                                    {/* Productos */}
                                    <Tab.Pane eventKey="fifth">
                                        <CustomInput type="checkbox" 
                                            id='16'
                                            value="16" 
                                            checked={this.state.ProductoCreate}
                                            onChange={this.toggleChangeProductoCreate}
                                            label="Crear Productos" />
                                        <CustomInput type="checkbox" 
                                            id='17'
                                            value="17" 
                                            checked={this.state.ProductoView}
                                            onChange={this.toggleChangeProductoView}
                                            label="Ver Productos" />
                                        <CustomInput type="checkbox" 
                                            id='18'
                                            value="18" 
                                            checked={this.state.ProductoEdit}
                                            onChange={this.toggleChangeProductoEdit}
                                            label="Modificar Productos" />
                                        <CustomInput type="checkbox" 
                                            id='19'
                                            value="19" 
                                            checked={this.state.ProductoDelete}
                                            onChange={this.toggleChangeProductoDelete}
                                            label="Borrar Productos" />
                                    </Tab.Pane>
                                    {/* Permisos */}
                                    <Tab.Pane eventKey="sixth">
                                        <CustomInput type="checkbox" 
                                            id='13'
                                            value="13" 
                                            checked={this.state.PermisosCreate}
                                            onChange={this.toggleChangePermisosCreate}
                                            label="Ver Reportes" />
                                        {/* <CustomInput type="checkbox" 
                                            id='22'
                                            value="14" 
                                            checked={this.state.PermisosEdit}
                                            onChange={this.toggleChangePermisosEdit}
                                            label="Modificar Permisos" />
                                        <CustomInput type="checkbox" 
                                            id='23'
                                            value="15" 
                                            checked={this.state.PermisosDelete}
                                            onChange={this.toggleChangePermisosDelete}
                                            label="Borrar Permisos" /> */}
                                    </Tab.Pane>
                                    {/* Gastos */}
                                    <Tab.Pane eventKey="seven">
                                        <CustomInput type="checkbox" 
                                            id='24'
                                            value="24" 
                                            checked={this.state.GastoCreate}
                                            onChange={this.toggleChangeGastoCreate}
                                            label="Crear Gasto" />
                                        <CustomInput type="checkbox" 
                                            id='25'
                                            value="25" 
                                            checked={this.state.GastoView}
                                            onChange={this.toggleChangeGastoView}
                                            label="Ver Gasto" />
                                        <CustomInput type="checkbox" 
                                            id='26'
                                            value="26" 
                                            checked={this.state.GastoEdit}
                                            onChange={this.toggleChangeGastoEdit}
                                            label="Modificar Gasto" />
                                        <CustomInput type="checkbox" 
                                            id='27'
                                            value="27" 
                                            checked={this.state.GastoDelete}
                                            onChange={this.toggleChangeGastoDelete}
                                            label="Borrar Gasto" />
                                    </Tab.Pane>
                                    {/* Turnos y Asistencias */}
                                    <Tab.Pane eventKey="eight">
                                        <CustomInput type="checkbox" 
                                            id='28'
                                            value="28" 
                                            checked={this.state.TACreate}
                                            onChange={this.toggleChangeTACreate}
                                            label="Crear Asistencia" />
                                        <CustomInput type="checkbox" 
                                            id='29'
                                            value="29" 
                                            checked={this.state.TAView}
                                            onChange={this.toggleChangeTAView}
                                            label="Ver Asistencia" />
                                        <CustomInput type="checkbox" 
                                            id='30'
                                            value="30" 
                                            checked={this.state.TAEdit}
                                            onChange={this.toggleChangeTAEdit}
                                            label="Modificar Asistencia" />
                                        <CustomInput type="checkbox" 
                                            id='31'
                                            value="31" 
                                            checked={this.state.TADelete}
                                            onChange={this.toggleChangeTADelete}
                                            label="Borrar Asistencia" />
                                    </Tab.Pane>
                                </Tab.Content>
                                </Col>
                            </Row>
                            </Tab.Container>
                        </div>
                        <div style={{marginLeft: 370}} className="form-group">
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
    roles : state.roles.roles
});

export default connect(mapStateToProps, {agregarRol})(NuevoRol);
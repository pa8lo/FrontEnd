import React, { Component } from 'react';
import Header from '../header/IndexHeader';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import store from '../../index';
import LoginForm from '../login/SignInForm';

//Redux
import { connect } from 'react-redux';
import { currentUser } from '../../actions/usuarioAction';

import StickyButton from '../bottom/StickyButton';

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    marginTop: 50,
    height: 150,
    width: '40%',
    display: 'inline-block'
};

const tableStyle = {
    marginTop: 20,
    maxWidth: '100%',
    minWidth: '100%'
}


class HomeRecursosHumanos extends Component {
    
    constructor(props) {
      super(props);

    //   const state = store.getState();

      this.state = {
        //   logged : state.auth.logged,
          permisosUsuario : [],
          permisosRoles : [],
          permisoRestaurant : [],
          permisosAsistencias : [],
      }
    }

    componentWillMount(){
        this.props.currentUser();
    }
    
    componentDidMount(){
        console.log(this)
    }
    
    mostrarContenido(){

        if(this.props.usuario == ""){
            return(
                <React.Fragment>

                <Grid>
                    <Row className="show-grid">
                        <Col align="center" xs={12} md={12}>
                        <div style={{display: "inline"}}>
                            <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                                <h3>Empleados</h3>
                            </Link>
                        </div>
                        <div style={{display: "inline" , marginLeft:"50px"}}>
                            <Link style={buttonStyle} disabled to="#" className="btn btn-success">
                                <h3>Roles</h3>
                            </Link>
                        </div>
                        </Col>
                        {/* <Col xs={12} md={12}>
                        <div style={{display: "flex"}}>
                            <Link style={buttonStyle} to="#" disabled className="btn btn-info">
                                <h3>Turnos</h3>
                            </Link>
                        </div>
                        </Col> */}
                        <Col align="center" xs={12} md={12}>
                        <div style={{display: "inline"}}>
                            <Link style={buttonStyle} disabled to="#" className="btn btn-info">
                                <h3>Asistencias</h3>
                            </Link>
                        </div> 
                        <div style={{display: "inline", marginLeft:"50px"}}>
                            <Link style={buttonStyle} disabled to="#" className="btn btn-danger">
                                <h3>Restaurant</h3>
                            </Link>
                        </div>
                        </Col> 
                    </Row>
                </Grid>
                </React.Fragment>
            );
        }else{

            // console.log(this.props.usuario)
            // console.log(this.props.usuario.Authorizations.length)

            let permisosUsuario = [];
            
            permisosUsuario = this.props.usuario.Authorizations.filter(permiso => (permiso.id <= 4));

            this.state.permisosUsuario = permisosUsuario;

            let permisosRoles = [];
            
            permisosRoles = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 9 && permiso.id <= 12));

            this.state.permisosRoles = permisosRoles;

            let permisoRestaurant = [];

            permisoRestaurant = this.props.usuario.Authorizations.filter(permiso => (permiso.id == 9))

            this.state.permisoRestaurant = permisoRestaurant;

            // let permisosTurnos = [];
            
            // permisosTurnos = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 28 && permiso.id <= 31));

            // this.state.permisosTurnos = permisosTurnos;

            let permisosAsistencias = [];
            
            permisosAsistencias = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 28 && permiso.id <= 31));

            this.state.permisosAsistencias = permisosAsistencias;

        }
    
    
        switch (this.props.usuario.Authorizations.length > 0) {
              case null:
              return;
              case true:
              return this.LoggedContent(this.props)
              case false:
              return this.NotLoggedContent()
        }
    
    }

    NotLoggedContent(){
      return(
        <LoginForm/>
      )
    }

    permisoABMUsuario(){
        if(this.state.permisosUsuario.length === 0){
            return(
            <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                <h3>Empleados</h3>
            </Link>
            )
        }else{
            return(
            <Link style={buttonStyle} to={`/rrhh/empleados`} className="btn btn-warning">
                <h3>Empleados</h3>
            </Link>
            )
        }
    }

    permisoABMRoles(){
        if(this.state.permisosRoles.length === 0){
            return(
            <Link style={buttonStyle} disabled to="#" className="btn btn-success">
                <h3>Roles</h3>
            </Link>
            )
        }else{
            return(
            <Link style={buttonStyle} to={`/rrhh/roles`} className="btn btn-success">
                <h3>Roles</h3>
            </Link>
            )
        }
    }

    // permisoABMTurnos(){
    //     if(this.state.permisosTurnos.length === 0){
    //         return(
    //         <Link style={buttonStyle} to="#" disabled className="btn btn-info">
    //             <h3>Turnos</h3>
    //         </Link>
    //         )
    //     }else{
    //         return(
    //         <Link style={buttonStyle} to={`/rrhh/turnos`} className="btn btn-info">
    //             <h3>Turnos</h3>
    //         </Link>
    //         )
    //     }
    // }

    permisoABMAsistencias(){
        if(this.state.permisosAsistencias.length === 0){
            return(
            <Link style={buttonStyle} disabled to="#" className="btn btn-info">
                <h3>Asistencias</h3>
            </Link>
            )
        }else{
            return(
            <Link style={buttonStyle} to={`/rrhh/asistencias`} className="btn btn-info">
                <h3>Asistencias</h3>
            </Link>
            )
        }
    }

    permisoABMRestaurant(){
        console.log(this.state.permisoRestaurant);
        if(this.state.permisoRestaurant.length === 0){
            return(
            <Link style={buttonStyle} disabled to="#" className="btn btn-danger">
                <h3>Restaurant</h3>
            </Link>
            )
        }else{
            return(
            <Link style={buttonStyle} to={`/direccion-restaurant`} className="btn btn-danger">
                <h3>Restaurant</h3>
            </Link>
            )
        }
    }

    LoggedContent(){
        // console.log(this.state)
        return(
            <Grid>
                <Row className="show-grid">
                    <Col align="center" xs={12} md={12}>
                    <div style={{display: "inline"}}>
                        {this.permisoABMUsuario()}
                    </div>
                    <div style={{display: "inline", marginLeft:"50px"}}>
                        {this.permisoABMRoles()}
                    </div>
                    </Col>
                    {/* <Col xs={12} md={12}>
                    <div style={{display: "flex"}}>
                        {this.permisoABMTurnos()}
                    </div>
                    </Col> */}
                    <Col align="center" xs={12} md={12}>
                    <div style={{display: "inline"}}>
                        {this.permisoABMAsistencias()}
                    </div>
                    <div style={{display: "inline", marginLeft:"50px"}}>
                        {this.permisoABMRestaurant()}
                    </div>
                    </Col> 
                </Row>
            </Grid>
        )
    }

    render() {

        if(localStorage.getItem('status') === 'offline'){
            this.props.history.push('/')
        }
        // console.log(this.props);

        return (
            <div>
                <Header 
                    titulo="RECURSOS HUMANOS"
                />
                
                {this.mostrarContenido()}
                <StickyButton/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, { currentUser })(HomeRecursosHumanos);
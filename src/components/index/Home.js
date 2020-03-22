import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LoginForm from '../login/SignInForm';
import Button from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import '../../assets/css/Index/IndexButtons.css';

import pedidos from '../../assets/images/pedidos.jpg';
import combos from '../../assets/images/combos.jpg';
import modulo from '../../assets/images/modulo.jpg';
import rrhh from '../../assets/images/rrhh.png';
import clients from '../../assets/images/clients.png';
import reports from '../../assets/images/reports.jpg';
import gastos from '../../assets/images/gastos.jpg';
import status from '../../assets/images/status.jpg';
import mapa from '../../assets/images/mapa.jpg';

//CSS
import styles from '../../assets/css/Home/Home'
 
// import * as actions from '../../actions';
import Header from '../header/IndexHeader';

//Redux
import { connect } from 'react-redux';
import { currentUser, fetchCurrentUser } from '../../actions/usuarioAction';

//CSS
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Principal extends Component{
  
  constructor(props) {
    super(props);

    this.state = {
      permisosPedidos : [],
      permisosCategoria : [],
      permisosCombos : [],
      permisosRRHH : [],
      permisosGastos : [],
      permisosClientes : [],
      permisosReportes : [],
      loading: true
    }
  }

  componentDidMount(){
    this.props.fetchCurrentUser();
    this.props.currentUser();
  }

    pageContent(){

        const logged = this.props.auth.logged;

        if(localStorage.getItem('status') == "online" && logged == null) {
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

            // console.log(JSON.parse(localStorage.getItem('propiedades')))

            if(localStorage.getItem('propiedades') === null){
                localStorage.setItem('propiedades', JSON.stringify(this.props))
            }else{

            }

        // if(localStorage.getItem('status') === "online"){
            switch (this.props.auth.logged) {
                case null:
                return this.LoggedContent(JSON.parse(localStorage.getItem('propiedades')));
                case true:
                return this.LoggedContent(this.props);
                case false:
                return this.NotLoggedContent()
            }
        // }else{
        //     return(
        //         this.LoggedContentOffline(JSON.parse(localStorage.getItem('propiedades')))
        //     )
        // }
        
        
        }
    }
    

    NotLoggedContent(){
        return(
        <LoginForm/>
        )
    }

    LoggedContent(props){

    // console.log(props)

    const { classes } = props;

    if(this.props.usuario.Authorizations === undefined) return;

        let permisosPedidos = [];
        
        permisosPedidos = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 20 && permiso.id <= 23));

        this.state.permisosPedidos = permisosPedidos;

        let permisosCategoria = [];
        
        permisosCategoria = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 16 && permiso.id <= 19));
        
        this.state.permisosCategoria = permisosCategoria;
        
        let permisosCombos = [];
        
        permisosCombos = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 16 && permiso.id <= 19));
        
        this.state.permisosCombos = permisosCombos;
        
        let permisosRRHH = [];
        
        permisosRRHH = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 1 && permiso.id <= 4 || permiso.id >= 28 && permiso.id <= 31));
        
        this.state.permisosRRHH = permisosRRHH;

        let permisosGastos = [];
        
        permisosGastos = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 24 && permiso.id <= 27));
        
        this.state.permisosGastos = permisosGastos;

        let permisosClientes = [];
        
        permisosClientes = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 5 && permiso.id <= 8));
        
        this.state.permisosClientes = permisosClientes;

        let permisosReportes = [];
        
        permisosReportes = this.props.usuario.Authorizations.filter(permiso => (permiso.id >= 13 && permiso.id <= 15));
        
        this.state.permisosReportes = permisosReportes;

    // console.log(this.state.permisosReportes)

    // console.log(this.props)

        return(

            <div className={classes.root}>

                        {/* Pedidos */}

                        {this.state.permisosPedidos.length > 0 ? 

                            localStorage.getItem('status') === 'offline' ? 

                                <Link key={1} to={'/pedidos'} className={classes.root}>
                                    <Button
                                    focusRipple
                                    key="Pedido"
                                    focusVisibleClassName={classes.focusVisible}
                                    style={{
                                        width: "33.3%",
                                        backgroundColor: "#493EFA",
                                        color: "#493EFA"
                                    }}
                                    >
                                    
                                    <span
                                        className={classes.imageSrc}
                                        style={{
                                        backgroundImage: `url(${pedidos})`,
                                        }}
                                    />

                                    <span className={classes.imageBackdrop} />
                                    <span className={classes.imageButton}>
                                        <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                        >
                                        Pedido
                                        <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                                    </Button>
                                </Link>

                                :

                                <Link key={1} to={'/pedidos'} className={classes.root}>
                                    <Button
                                    focusRipple
                                    key="Pedido"
                                    className={classes.image}
                                    focusVisibleClassName={classes.focusVisible}
                                    style={{
                                        width: "33.3%",
                                    }}
                                    >
                                    
                                    <span
                                        className={classes.imageSrc}
                                        style={{
                                        backgroundImage: `url(${pedidos})`,
                                        }}
                                    />
        
                                    <span className={classes.imageBackdrop} />
                                    <span className={classes.imageButton}>
                                        <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        className={classes.imageTitle}
                                        >
                                        Pedido
                                        <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                                    </Button>
                                </Link>

                            :

                        <Button
                        disabled
                        focusRipple
                        key="Pedido"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${pedidos})`,
                            }}
                        />

                        <span disabled className={classes.imageBackdrop} />
                        <span disabled className={classes.imageButton}>
                            <Typography
                            disabled
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Pedido
                            <span disabled className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }

                        {/* Categorias */}

                        {this.state.permisosCategoria.length > 0  && localStorage.getItem('status') === "online" ? 

                        <Link key={2} to={'/categoria'} className={classes.root}>
                        <Button
                        focusRipple
                        key="Categoria"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${modulo})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Categoria
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>

                        :

                        <Button
                        disabled
                        focusRipple
                        key="Categoria"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${modulo})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Categoria
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        
                        }

                            {/* Combos */}
                        {this.state.permisosCombos.length > 0 && localStorage.getItem('status') === "online" ? 

                        <Link key={3} to={'/combos'} className={classes.root}>
                        <Button
                        focusRipple
                        key="Combos"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${combos})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Combos
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>

                        :

                        <Button
                        disabled
                        focusRipple
                        key="Combos"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                        disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${combos})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Combos
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }

                            {/* RRHH */}

                        {this.state.permisosRRHH.length > 0 && localStorage.getItem('status') === "online" ? 
                        <Link key={4} to={'/rrhh'} className={classes.root}>
                        <Button
                        focusRipple
                        key="RRHH"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${rrhh})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            RRHH
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>

                        :

                        <Button
                        disabled
                        focusRipple
                        key="RRHH"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${rrhh})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            RRHH
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }

                            {/* Reportes */}

                        {this.state.permisosReportes.length > 0 && localStorage.getItem('status') === "online" ? 
                        <Link key={5} to={'/reportes'} className={classes.root}>
                        <Button
                        focusRipple
                        key="Reportes"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${reports})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Reportes
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>
                        
                    
                        :

                        <Button
                        disabled
                        focusRipple
                        key="Reportes"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${reports})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Reportes
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }

                            {/* Gastos */}

                        {this.state.permisosGastos.length > 0 && localStorage.getItem('status') === "online" ? 
                        <Link key={6} to={'/gastos'} className={classes.root}>
                        <Button
                        focusRipple
                        key="Gastos"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${gastos})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Gastos
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>

                        :

                        <Button
                        disabled
                        focusRipple
                        key="Gastos"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${gastos})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Gastos
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }

                        {/* Cliente */}

                        {this.state.permisosClientes.length > 0 && localStorage.getItem('status') === "online" ? 
                        <Link key={7} to={'/clientes'} className={classes.root}>
                        <Button
                        focusRipple
                        key="Clientes"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${clients})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Clientes
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>
                    
                            :

                            <Button
                            disabled
                        focusRipple
                        key="Clientes"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                        disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${clients})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Clientes
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }
                        
                        {/* Estado */}

                        {this.state.permisosPedidos.length > 0 && localStorage.getItem('status') === "online" ? 
                        <Link key={8} to={'/estados'} className={classes.root}>
                        <Button
                        focusRipple
                        key="Estados"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${status})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Estados
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>
                    
                            :

                            <Button
                            disabled
                        focusRipple
                        key="Estados"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                        disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${status})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Estados
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }

                        {/* Mapa */}

                        {this.state.permisosPedidos.length > 0 && localStorage.getItem('status') === "online" ? 
                        <Link key={9} to={'/mapa'} className={classes.root}>
                        <Button
                        focusRipple
                        key="Mapa"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${mapa})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Mapa
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>
                        </Link>
                    
                            :

                        <Button
                        disabled
                        focusRipple
                        key="Mapa"
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: "33.3%",
                        }}
                        >
                        
                        <span
                        disabled
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${mapa})`,
                            }}
                        />

                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            Mapa
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                        </Button>

                        }
                    </div> 
        )
    }

    render() {
        return (
            <div>
                
                <Header 
                titulo="RORASO"
                />

                <div className="App-body">
                
                {this.pageContent()}
                
                </div> 
            </div>
        );
    }
}

Principal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
      auth: state.auth,
      usuario : state.usuario.usuario
  };
}; 

export default withStyles(styles)(connect(mapStateToProps, { fetchCurrentUser, currentUser })(Principal));
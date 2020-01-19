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
import reports from '../../assets/images/reports.jpg';
import gastos from '../../assets/images/gastos.jpg';

//CSS
import styles from '../../assets/css/Home/Home'

// import * as actions from '../../actions';
import Header from '../header/Header.js';

//Redux
import { connect } from 'react-redux';
import { currentUser, fetchCurrentUser } from '../../actions/usuarioAction';

const images = [
  {
    url: pedidos,
    title: 'Pedidos',
    width: '33.3%',
    link: '/pedidos',
    id: 1
  },
  {
    url: modulo,
    title: 'Modulos',
    width: '33.3%',
    link: '/modulo',
    id: 2
  },
  {
    url: combos,
    title: 'Combos',
    width: '33.3%',
    link: '/combos',
    id: 3
  },
  {
    url: rrhh,
    title: 'RRHH',
    width: '33.3%',
    link: '/rrhh',
    id: 4
  },
  {
    url: reports,
    title: 'Reportes',
    width: '33.3%',
    link: '/reportes',
    id: 5
  },
  {
    url: gastos,
    title: 'Gastos',
    width: '33.3%',
    link: '/gastos',
    id: 6
  }
];

class Principal extends Component{
  
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchCurrentUser();
    this.props.currentUser();
  }

 pageContent(){
      switch (this.props.auth.logged) {
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

 LoggedContent(props){
  const { classes } = props;
  return(

    <div className={classes.root}>
    {/* {console.log(images)} */}
            {images.map(image => (

              

                <Link key={image.id} to={image.link} className={classes.root}>
                <Button
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: image.width,
                }}
                >
                
                <span
                    className={classes.imageSrc}
                    style={{
                    backgroundImage: `url(${image.url})`,
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
                    {image.title}
                    <span className={classes.imageMarked} />
                    </Typography>
                </span>
                </Button>
                </Link>
            ))}
            
            </div> 
  )
}

 render() {


  return (
      <div>
        
        <Header 
          titulo="DASHBOARD"
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
import React, { Component } from 'react';
import {Carousel, Image} from 'react-bootstrap';
import StylesCarruselLogin from '../../assets/css/Login/StylesCarruselLogin'

//Images
import Estado from '../../assets/images/Estado.png';
import DeteccionAutomatica from '../../assets/images/DeteccionAutomatica.png';
import PedidosEncolados from '../../assets/images/PedidosEncolados.png';

class CarruselLogin extends Component {
  state = {  }
  render() { 

    const { classes } = this.props;
 
    return (
      <React.Fragment>
    <div style={{height : "200px", width: "100%"}} style={StylesCarruselLogin}>
    <Carousel style={{height : "150%", width: "150%"}}>
      <Carousel.Item>
        <Image src={Estado} rounded />
        <Carousel.Caption>
          <h3>Estado de Conexion</h3>
          <p>Podra verificar su estado de conexion en el menu.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image src={PedidosEncolados} rounded />
        <Carousel.Caption>
          <h3>Solicitudes Encoladas</h3>
          <p>Puedes ver las solicitudes encoladas en manera offline.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image src={DeteccionAutomatica} rounded />
        <Carousel.Caption>
          <h3>Deteccion Automatica</h3>
          <p>Deteccion automatica de perdida y recupero de internet.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  </React.Fragment>
    );
  }
}

export default CarruselLogin;
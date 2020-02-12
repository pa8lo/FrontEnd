import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import CarruselLogin from './CarruselLogin';
import SignInForm from './SignInForm';

import LoginImage from '../../assets/images/LoginImage.jpeg';

class LoginForm extends React.Component {
  

  render() {
    return (
      <div className='background-image' style={{backgroundImage: "url("+LoginImage+")", marginTop: "-300px", height: "890px", width: "100%"}}>
      <Grid  container style={{marginTop:"300px"}}>
        <Row className="show-grid">
          <Col style={{display: "inline-block"}} xs={5} md={5}>
            <div >
            <SignInForm/>
            </div>
          </Col>
          <Col style={{display: "inline-block"}} xs={5} md={5}>
            <CarruselLogin />
          </Col>
        </Row>
      </Grid>
      </div>
    )
  }
}
export default LoginForm;
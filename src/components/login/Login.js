import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import CarruselLogin from "./CarruselLogin";
import SignInForm from "./SignInForm";

import LoginImage from "../../assets/images/LoginImage.jpeg";

class LoginForm extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "fixed",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
        }}
      >
        {/* className="background-image"
        style={{
          backgroundImage: "url(" + LoginImage + ")",
          marginTop: "-300px",
          height: "890px",
          width: "100%",
        }} */}
        <img
          src={LoginImage}
          alt="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            minWidth: "50%",
            minHeight: "50%",
          }}
        />
        <Grid container="true" style={{ marginTop: "400px" }}>
          <Row className="show-grid">
            <Col style={{ display: "inline-block" }} xs={5} md={5}>
              <div>
                <SignInForm />
              </div>
            </Col>
            <Col style={{ display: "inline-block" }} xs={5} md={5}>
              <CarruselLogin />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default LoginForm;

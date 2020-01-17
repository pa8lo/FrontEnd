import React, { Component } from 'react';
import { Container, Button } from 'react-floating-action-button'
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

class StickyButton extends Component {
    render() {
        return (
            <div>
                <Container styles={{ marginRight: -40, marginBottom: -40 }}>

                    <Button
                        styles={{ backgroundColor: "#4D4D4D", marginLeft: "50px" }}
                        rotate={false}
                        href="/problems"
                        to="/problems"
                        onClick={() => this.props.history.push('/')}
                    >
                        {/* <FontAwesomeIcon icon={faHome} color="white" size="lg" /> */}
                    </Button>
                </Container>
            </div>
        );
    }
}

export default withRouter(StickyButton);
import React, { Component } from 'react';
import { Container, Button } from 'react-floating-action-button'
import { withRouter } from "react-router-dom";

//CSS
import HomeIcon from '@material-ui/icons/Home';

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

                    <HomeIcon style={{color:"white"}}/>

                    </Button>
                </Container>
            </div>
        );
    }
}

export default withRouter(StickyButton);
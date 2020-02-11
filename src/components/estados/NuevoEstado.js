import React, { Component } from 'react';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { agregarEstado } from '../../actions/estadosAction';

//CSS
import Swal from 'sweetalert2'
import '../../assets/css/empleados/form-alta-empleados.css';

class NuevoEstado extends Component {

    state = {
        // currentUser : ''
        redirectHome: false,
    }

    descripcionRef = React.createRef();
    keyRef = React.createRef();

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

    agregarEstado = (e) => {
        e.preventDefault();

        const estado = {
        descripcion : this.descripcionRef.current.value
        }

        this.props.agregarEstado(estado);

        e.currentTarget.reset();
    }

    render() {
        return (
            
        <React.Fragment>
            <Header titulo = 'Alta de Estado'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.agregarEstado} className="col-5">
                        <div className="form-group">
                            <label>Descripcion</label>
                            <input ref={this.descripcionRef} placeholder="En Preparacion" type="text" className="form-control" required/>
                        </div>
                        <div center="true" align="center" className="form-group">
                            <input type="submit" value="Aceptar" className="btn btn-primary" required/>
                            <button style={{marginLeft: 20, width: 80}} onClick={this.setRedirectToHome} type="button" className="btn btn-danger">Cancelar</button>
                            {this.ToHome()}
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    estados : state.estados.estados
});

export default connect(mapStateToProps, { agregarEstado })(NuevoEstado);
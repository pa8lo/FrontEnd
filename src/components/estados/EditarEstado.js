import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import { Redirect } from 'react-router-dom';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { editarEstado } from '../../actions/estadosAction';

class EditarEstado extends Component {

  state = {
    // date : ''
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

  editarEstado = (e) => {
    e.preventDefault();

    if(this.descripcionRef.current.value == undefined || this.descripcionRef.current.value == null ||
        this.keyRef.current.value == undefined || this.keyRef.current.value == null){
        Swal.fire({
            title: 'Error!',
            text: 'Hay datos erroneos en el formulario',
            type: 'error',
            confirmButtonText: 'Reintentar'
        })
        return;
    }else{
        const estado = {
        id : this.props.location.state.id,
        descripcion : this.descripcionRef.current.value
        }

        // console.log(estado);
        this.props.editarEstado(estado);
    }
  }
  

    render() {
        return (
            <div>
                <Header titulo = 'Editar Estado'/>
                <div className="table-empleados">
                    <Paper className="col-md-4">
                        <div align="center">
                            <form onSubmit={this.editarEstado} className="col-8">
                                <div className="form-group">
                                    <label>Descripcion</label>
                                    <input ref={this.descripcionRef} type="text" defaultValue={this.props.location.state.Description} className="form-control" required/>
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
            </div>
        );
    }
}

export default connect(null, { editarEstado })(EditarEstado);
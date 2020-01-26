import React, { Component } from 'react';
import Swal from 'sweetalert2'

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { editarCliente } from '../../actions/clientesAction';

class EditarCliente extends Component {

    state = {
        date : ''
    }

    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    telefonoRef = React.createRef();
    emailRef = React.createRef();

    editarCliente = (e) => {
        e.preventDefault();

        if(this.nombreRef.current.value == undefined ||
            this.telefonoRef.current.value == undefined){
            Swal.fire({
                title: 'Error!',
                text: 'Hay datos erroneos o faltan datos en el formulario',
                type: 'error',
                confirmButtonText: 'Reintentar'
            })
            return;
        }else{
            const cliente = {
            name : this.nombreRef.current.value,
            lastname : this.apellidoRef.current.value,
            phone : this.telefonoRef.current.value,
            email : this.emailRef.current.value,
            id: this.props.location.state.id,
            }

            // console.log(cliente)
            this.props.editarCliente(cliente);
        }
    }

    render() {

        return (
            
        <React.Fragment>
            <Header titulo = 'Editar Cliente'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.editarCliente} className="col-5">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input ref={this.nombreRef} defaultValue={this.props.location.state.Name} type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input ref={this.apellidoRef} defaultValue={this.props.location.state.LastName} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input ref={this.emailRef} defaultValue={this.props.location.state.Email} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Telefono</label>
                            <input ref={this.telefonoRef} defaultValue={this.props.location.state.Phone} type="number" min="1" step="1" title="Numbers only" className="form-control" required/>
                        </div>
                        <div center="true" align="center" className="form-group">
                            <input type="submit" value="Enviar" className="btn btn-primary" required/>
                        </div>
                    </form>
                    </div>
                </Paper>
            </div>
        </React.Fragment>
        );
    }

}


export default connect(null, { editarCliente })(EditarCliente);
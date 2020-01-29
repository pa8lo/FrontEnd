import React, { Component } from 'react';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import { Redirect } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import { agregarCliente } from '../../actions/clientesAction';

//CSS
import Swal from 'sweetalert2'
import '../../assets/css/empleados/form-alta-empleados.css';

class AgregarDatosCliente extends Component {

    state = {
        telefono : '',
        redirectHome: false,
    }

    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    telefonoRef = React.createRef();
    emailRef = React.createRef();

    componentDidMount () {

        if(this.props.location.search != ""){
        let a  = (this.props.location.search).split("?=")

            this.setState({
                telefono : parseInt(a[1])
            })

        }
    }

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

    agregarCliente = (e) => {
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
            }

            // console.log(gasto);
            this.props.agregarCliente(cliente);
        }

    }

    render() {
        return (
            
        <React.Fragment>
            <Header titulo = 'Alta de Cliente'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.agregarCliente} className="col-5">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input ref={this.nombreRef} type="text" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input ref={this.apellidoRef} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input ref={this.emailRef} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Telefono</label>
                            <input ref={this.telefonoRef} defaultValue={this.state.telefono} type="number" min="1" step="1" title="Numbers only" className="form-control" required/>
                        </div>
                        <div center="true" align="center" className="form-group">
                            <input type="submit" value="Enviar" className="btn btn-primary" required/>
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
    clientes : state.clientes.clientes
});

export default connect(mapStateToProps, { agregarCliente })(AgregarDatosCliente);
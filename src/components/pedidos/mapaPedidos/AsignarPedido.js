import React, { Component } from 'react';

//Componentes
import Header from '../../header/IndexHeader';
import MapaPedidos from "./mapaPedidos";
import OrderBox from "./orderBox";

//Redux
import { connect } from 'react-redux';
import { mostrarPedidos, asignarDelivery } from '../../../actions/pedidosAction';
import { mostrarEmpleados } from '../../../actions/empleadosAction';

//CSS
import Swal from 'sweetalert2'

class AsignarPedido extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      pedidos: {},
      empleados: {},
    };
    // this.handleLine = this.handleLine.bind(this);
  }

  componentWillMount() {

    this.verifyRestaurant();
    this.props.mostrarPedidos();
    this.props.mostrarEmpleados();

  };

  verifyRestaurant = async () => {
    if(localStorage.getItem('DireccionRestaurant') === ''){
      Swal.fire({
        title: 'Debe indicar la direccion del restaurant',
        text: "¿Desea realizarlo ahora?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
            // this.props.eliminarEstado(this.props.rowData.id);
            alert("joya")
            localStorage.setItem('DireccionRestaurant', '56')
        }
      })
    }
  }
  
  render() {

    const pedidos = this.props.pedidos;
    const empleados = this.props.empleados;

    return (
      <React.Fragment>
        <Header titulo="Asignar Delivery" />
        <div className="table-empleados">
          <MapaPedidos />
        </div>
        <OrderBox pedidos={pedidos} empleados={empleados}/>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  pedidos: state.pedidos.pedidos,
  empleados: state.empleados.empleados,
  line: state.pedidos.line,
});

export default connect(mapStateToProps, {
  mostrarPedidos,
  mostrarEmpleados,
  asignarDelivery,
})(AsignarPedido);
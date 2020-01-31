import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import axios from 'axios'

//Login
import Login from './components/login/Login';

//Home
import Home from './components/index/Home';

//Cambio Clave
import CambioClave from './components/profile/CambioDeClave';

//Home Recursos Humanos
import HomeRecursosHumanos from './components/rrhh/HomeRecursosHumanos';

//Empleados
import Empleados from './components/rrhh/empleados/TablaEmpleados'
import EmpleadoIndividual from './components/rrhh/empleados/EmpleadoIndividual';
import NuevoEmpleado from './components/rrhh/empleados/NuevoEmpleado';
import EditarEmpleado from './components/rrhh/empleados/EditarEmpleado';

//Roles
import Roles from './components/rrhh/roles/TablaRoles';
import NuevoRol from './components/rrhh/roles/NuevoRol';
import RolIndividual from './components/rrhh/roles/RolIndividual';
import EditarRol from './components/rrhh/roles/EditarRol';

//Turnos
import Turnos from './components/rrhh/turnos/TablaTurnos';
import NuevoTurno from './components/rrhh/turnos/NuevoTurno';
import TurnoIndividual from './components/rrhh/turnos/TurnoIndividual';

//Asistencias
import Asistencias from './components/rrhh/asistencias/TablaAsistencias';
import NuevaAsistencia from './components/rrhh/asistencias/NuevaAsistencia';
import EditarAsistencia from './components/rrhh/asistencias/EditarAsistencia';

//Gastos
import Gastos from './components/gastos/TablaGastos';
import NuevoGasto from './components/gastos/NuevoGasto';
import GastoIndividual from './components/gastos/GastoIndividual';
import EditarGasto from './components/gastos/EditarGasto';

//Productos
import Productos from './components/modulos/productos/TablaProductos';
import NuevoProducto from './components/modulos/productos/NuevoProducto';
import ProductoIndividual from './components/modulos/productos/ProductoIndividual';
import EditarProducto from './components/modulos/productos/EditarProducto';

//Categorias
import Categorias from './components/modulos/categorias/TablaCategorias';
import NuevaCategoria from './components/modulos/categorias/NuevaCategoria';
import EditarCategoria from './components/modulos/categorias/EditarCategoria';

//Combos
import Combos from './components/combos/TablaCombo';
import NuevoCombo from './components/combos/NuevoCombo';
import ComboIndividual from './components/combos/ComboIndividual';
import EditarCombo from './components/combos/EditarCombo';

//Pedidos
import Pedidos from './components/pedidos/TablaPedidos';
import NuevoPedido from './components/pedidos/NuevoPedido';
import PedidoIndividual from './components/pedidos/PedidoIndividual';
import EditarEstadoPedido from './components/pedidos/EditarEstadoPedido';

//Reportes
import Reportes from './components/reportes/ListaReportes'

//Estados
import Estados from './components/estados/TablaEstados';
import NuevoEstado from './components/estados/NuevoEstado';
import EstadoIndividual from './components/estados/EstadoIndividual';
import EditarEstado from './components/estados/EditarEstado';

//Cliente
import Clientes from './components/cliente/TablaClientes';
import ClientesIndividual from './components/cliente/ClienteIndividual';
import AgregarDatosCliente from './components/cliente/AgregarDatosCliente';
import AgregarDireccionCliente from './components/cliente/AgregarDireccionCliente';
import ConsultarDireccionCliente from './components/cliente/ConsultarDireccionCliente';

//Mapa con Pedidos
import AsignarPedido from './components/pedidos/mapaPedidos/AsignarPedido'
import EditarOrder from './components/pedidos/mapaPedidos/editarOrder'
import EditarPedido from './components/pedidos/EditarPedido';
import EditarCliente from './components/cliente/EditarCliente';

//Solicitudes Encoladas
import SolicitudesEncoladas from './components/pedidos/SolicitudesEncoladas'

class Routes extends Component {

    render() {

        return (
                <Router>
                    <Switch>

                        <Route path="/login" exact component={Login} />

                        <Route path="/" exact component={Home} />

                        <Route path="/cambio-clave" exact component={CambioClave} />
                        
                        <Route path="/rrhh" exact component={HomeRecursosHumanos} />

                        {/* Cliente */}

                        <Route path="/clientes" exact component={Clientes} />

                        <Route path="/cliente/:clienteId" exact component={ClientesIndividual} />

                        <Route path="/clientes/alta-cliente" exact component={AgregarDatosCliente} />

                        <Route path="/clientes/editar-cliente/:clienteId"  exact component={EditarCliente} />
                        
                        <Route path="/clientes/agregar-direccion-cliente/:clienteId" exact component={AgregarDireccionCliente} />

                        <Route path="/clientes/consultar-direccion-cliente/:clienteId" exact component={ConsultarDireccionCliente} />

                        {/* Empleados */}

                        <Route path="/rrhh/empleados" exact component={Empleados}/>

                        <Route path="/rrhh/empleados/:empleadoId" exact component={EmpleadoIndividual}/>

                        <Route path="/rrhh/alta-empleado"  exact component={NuevoEmpleado}/>

                        <Route exact path="/rrhh/editar-empleados/:empleadoId"  exact component={EditarEmpleado} />

                        {/* Roles */}

                        <Route path="/rrhh/roles" exact component={Roles} />

                        <Route path="/rrhh/roles/:rolId" exact component={RolIndividual} />

                        <Route path="/rrhh/alta-rol" exact component={NuevoRol} />

                        <Route path="/rrhh/editar-roles/:rolId"  exact component={EditarRol} />

                        {/* Turnos */}

                        <Route path="/rrhh/turnos" exact component={Turnos} />

                        <Route path="/rrhh/turnos/:turnoId" exact component={TurnoIndividual} />

                        <Route path="/rrhh/alta-turno" exact component={NuevoTurno} />

                        {/* Asistencias */}

                        <Route path="/rrhh/asistencias" exact component={Asistencias} />

                        <Route path="/rrhh/asistencias/:asistenciaId" exact component={EditarAsistencia} />

                        <Route path="/rrhh/alta-asistencia" exact component={NuevaAsistencia} />

                        {/* Gastos */}

                        <Route path="/gastos" exact component={Gastos} />

                        <Route path="/gastos/alta-gasto" exact component={NuevoGasto} />

                        <Route path="/gastos/:gastoId" exact component={GastoIndividual} />

                        <Route path="/gastos/editar-gasto/:gastoId" exact component={EditarGasto} />

                        {/* Pedidos */}

                        <Route path="/pedidos" exact component={Pedidos} />

                        <Route path="/pedidos/alta-pedido" exact component={NuevoPedido} />

                        <Route path="/pedidos/editar-pedido/:pedidoId" exact component={EditarPedido} />

                        <Route path="/pedidos/estado-pedido/:estadoId" exact component={EditarEstadoPedido} />

                        {/* <Route path="/editar-estado-pedido/:pedidoId" exact component={EditarEstadoPedido} /> */}

                        <Route path="/pedidos/:pedidoId" exact component={PedidoIndividual} />

                        {/* Reportes */}

                        <Route path="/reportes" exact component={Reportes} />

                        {/* <Route path="/pedidos/alta-pedido" exact component={NuevoPedido} /> */}

                        {/* Combo */}

                        <Route path="/combos" exact component={Combos} />
                        
                        <Route path="/combos/alta-combo" exact component={NuevoCombo} />

                        <Route path="/combos/:idCombo" exact component={ComboIndividual} />

                        <Route path="/combos/editar-combo/:idCombo" exact component={EditarCombo} />

                        {/* Categorias */}

                        <Route path="/categoria" exact component={Categorias} />

                        <Route path="/categoria/alta-categoria" exact component={NuevaCategoria} />

                        <Route path="/categoria/editar-categoria/:catId" exact component={EditarCategoria} />

                        {/* Productos */}

                        <Route path="/categoria/:idCat" exact component={Productos} />

                        <Route path="/productos/alta-producto" exact component={NuevoProducto} />
                        
                        <Route path="/productos/:idProd" exact component={ProductoIndividual} />
                        
                        <Route path="/productos/editar-producto/:idProd" exact component={EditarProducto} />
                        
                        {/* Estados */}

                        <Route path="/estados" exact component={Estados} />

                        <Route path="/estados/alta-estado" exact component={NuevoEstado} />

                        <Route path="/estados/:estadoId" exact component={EstadoIndividual} />

                        <Route path="/estados/editar-estado/:estadoId" exact component={EditarEstado} />

                        {/* Mapa de Pedidos */}

                        <Route path="/mapa" exact component={AsignarPedido} />
                        <Route path="/mapa/editar-pedido/:orderId" exact component={EditarOrder} />

                        {/* Solicitudes Encoladas */}

                        <Route path="/solicitudes-encoladas" exact component={SolicitudesEncoladas} />

                    </Switch>
                </Router>
        );
    }
}

export default Routes;
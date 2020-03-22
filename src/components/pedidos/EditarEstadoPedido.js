import React, { Component } from 'react';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import Select from 'react-select';
import { Grid, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';
import Swal from 'sweetalert2'

//Redux
import { connect } from 'react-redux';
import { agregarPedido } from '../../actions/pedidosAction';
import { mostrarProductos } from '../../actions/productosAction';
import { mostrarCombos } from '../../actions/combosAction'
import { mostrarEstados, editarEstadoPedido } from '../../actions/estadosAction';

class EditarEstadoPedido extends Component {
    
    constructor(...args) {
        super(...args);
      
        this.state = {
            selectedComboOption : null,
            optionsComboName : [],
            selectedProductsOption : null,
            optionsProductsName : [],
            modalShow: false,
            arrayProdEnCombos : [],
            redirectHome: false,
            redirectPedidos: false,
            estados_storage : []
        }
        }
      
        estadoRef = React.createRef();
        estadoStorageRef = React.createRef();

        componentDidMount(){

            // console.log(this.props.match.params.estadoId)

            this.obtenerProductosDeCombos();
            this.setState({
                selectedProductsOption : this.state.optionsProductsName,
                selectedComboOption : this.state.optionsComboName
            })
          
        }
      
        componentWillMount(){

            this.state.estados_storage = JSON.parse(localStorage.getItem('estados'));
            // console.log(this.state.estados_storage)

            this.props.mostrarEstados();
            {this.props.location.state.ProductosPorPedido.map(producto => (
                this.state.optionsProductsName.push({value: producto.id,label: producto.Product.Name + " " + producto.Product.Description,count: producto.Count})
            ))}
        
            {this.props.location.state.CombosPorPedido.map(producto => (
                this.state.optionsComboName.push({value: producto.id,label: producto.Offer.Name ,count: producto.Count})
            ))}
      
        }
      
        obtenerProductosDeCombos(){
          {JSON.parse(localStorage.getItem('combos')).map(prodCombo => {
      
            prodCombo.ProductosPorCombo.map(productio => {
      
      
              this.state.arrayProdEnCombos.push({
                  id: prodCombo.id,
                  products : productio.Product.Name + " " + productio.Product.Description
              });
      
            })
      
          })}
        }
      
         mostrarProductosListos = () => {
              if(this.state.selectedProductsOption == null || this.state.selectedProductsOption === null) return null;
              // console.log(this.state.selectedOption);
              // console.log(this.props)
              return (
                  <div className="form-group">
                      <label>Cantidad para cada producto</label>
                      <div center="true" align="center">
      
                      {this.state.selectedProductsOption.map(product => (
                          <div className="form-group" key={product.value}>
                              <Grid style={{marginTop:'20px', width:'800px'}}>
                              <Row style={{ width:'800px'}} className="show-grid">
                                  <Col xs={8} md={3}>
                                      <p>{product.label}</p>
                                  </Col>
                                  <Col xs={4} md={6}>
                                      <input disabled defaultValue={product.count} style={{width: '60px'}} type="number" min="1" step="1" title="Numbers only" className="form-control" required/>
                                  </Col>
                              </Row>
                              </Grid>
                          </div>
                      ))}
      
                      </div>
                  </div>
              )
          }
      
      
          mostrarCombosListos = () => {
              if(this.state.selectedComboOption == null || this.state.selectedComboOption === null) return null;
              return (
                  <div className="form-group">
                      <label>Cantidad para cada Combo</label>
                      <div center="true" align="center">
      
                      {this.state.selectedComboOption.map(product => (
                          <div className="form-group" key={product.value}>
                              <Grid style={{marginTop:'20px', width:'800px'}}>
                              <Row style={{ width:'800px'}} className="show-grid">
                                  <Col xs={8} md={4}>
                                      <p>{product.label}</p>
                                  </Col>
                                  <Col xs={3} md={4}>
                                      <input disabled defaultValue={product.count} style={{width: '60px'}} type="number" min="1" step="1" title="Numbers only" className="form-control" required/>
                                  </Col>
                              </Row>
                              </Grid>
                          </div>
                      ))}
      
                      </div>
                  </div>
              )
          }
      
        mostrarDireccion = () => {
          
          // console.log(this.props.location.state)
      
            return (
              <div>
                <input disabled value={this.props.location.state.Adress} type="text" className="form-control" required/>
              </div>
            );
          
        }

        cambiarEstadoPedido = (e) => {
            e.preventDefault();

            if(localStorage.getItem('status') === "online"){

                const estado_pedido = {
                    id_pedido: this.props.location.state.id,
                    id_state: this.estadoRef.current.value,
                }
                
                // console.log(estado_pedido);
                
                this.props.editarEstadoPedido(estado_pedido);

            }else{ 

                let arrayCambioEstado = JSON.parse(localStorage.getItem('pedidoCambioEstado'));

                arrayCambioEstado.push({
                    estado: this.estadoStorageRef.current.value,
                    id_pedido: this.props.match.params.estadoId
                });

                localStorage.setItem('pedidoCambioEstado', JSON.stringify(arrayCambioEstado));

                Swal.fire({
                    title: 'Atencion!',
                    text: 'La solicitud fue guardada en la solicitudes encoladas se enviara una vez se restablezca la conexion',
                    type: 'warning',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.value) {
                            this.setState({
                                redirectPedidos: true
                            })
                        }
                    })


                // let cambioEstado = JSON.parse(localStorage.getItem('estados'));
                // pedidoCambioEstado
                

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

        ToPedidos(){
          if (this.state.redirectPedidos) {
            return <Redirect to='/pedidos' />
          }
        }
      
        render() {
      
            const { selectedComboOption, selectedProductsOption } = this.state;
            
            return (
                
            <React.Fragment>
                <Header titulo = 'Cambiar Estado Pedido'/>
                <div className="table-empleados">
                    <Paper className="col-md-5">
                        <div>
                        <form onSubmit={this.cambiarEstadoPedido} className="col-5">
                            <div className="form-group">
                                <label>Direccion Cliente</label>
                            <div className="form-group">
                            {this.mostrarDireccion()}
                            </div>
                            </div>
                            <div className="form-group">
                                <label>Combo Seleccionados</label>
                                <Select required
                                    placeholder="Ingrese o Selecciones el Combo"
                                    isDisabled
                                    value={selectedComboOption}
                                    options={this.state.optionsComboName}
                                    isMulti
                                    isSearchable
                                    isDisabled
                                />
                            </div>
                            {this.mostrarCombosListos()}
                            <div className="form-group">
                                <label>Productos Seleccionados</label>
                                <Select required
                                    placeholder="Ingrese o Selecciones los Productos"
                                    isDisabled
                                    value={selectedProductsOption}
                                    options={this.state.optionsProductsName}
                                    isMulti
                                    isSearchable
                                    isDisabled
                                />
                            </div>
                            {this.mostrarProductosListos()}
                            <div className="form-group">
                                <label>Estado</label>
                                { localStorage.getItem('status') === "online" ? 
                                    
                                    <select ref={this.estadoRef} className="form-control">
                                        <option disabled={true}>Actual: {this.props.location.state.State}</option>
                                        {this.props.estados.map(estado => (
                                            <option key={estado.id} value={estado.id}>{estado.Description}</option>
                                        ))}
                                    </select>

                                    :

                                    <select ref={this.estadoStorageRef} className="form-control">
                                        <option disabled={true}>Actual: {this.props.location.state.State}</option>
                                        {this.state.estados_storage.map(estado => (
                                            <option key={estado.id} value={estado.id}>{estado.Description}</option>
                                        ))}
                                    </select>

                                }
                                
                            </div>
                                <div style={{marginTop:"0px"}} align="center" className="form-group">
                                    <input type="submit" value="Aceptar" className="btn btn-primary" required />
                                    <button style={{marginLeft: 20, width: 80}} onClick={this.setRedirectToHome} type="button" className="btn btn-danger">Cancelar</button>
                                    {this.ToHome()}
                                    {this.ToPedidos()}
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
  combos : state.combos.combos,
  productos : state.productos.productos,
  pedidos : state.pedidos.pedidos,
  estados: state.estados.estados,
});

export default connect(mapStateToProps, {mostrarCombos, mostrarProductos, agregarPedido, mostrarEstados, editarEstadoPedido})(EditarEstadoPedido);
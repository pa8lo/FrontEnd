import React, { Component } from 'react';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import Select from 'react-select';
import { Grid, Modal, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';
//Redux
import { connect } from 'react-redux';
import { editarPedido } from '../../actions/pedidosAction';
import { mostrarProductos } from '../../actions/productosAction';
import { mostrarCombos } from '../../actions/combosAction'

const buttonStyle = {
  marginLeft: 10,
  width: 80,
};

class PedidoIndividual extends Component {

    constructor(...args) {
    super(...args);

    this.state = {
        selectedComboOption : null,
        optionsComboName : [],
        selectedProductsOption : null,
        optionsProductsName : [],
        optionsProductsCount : [],
        optionsCombosCount : [],
        modalShow: false,
        telefonoClient : '',
        correctSearchPhone : false,
        direcciones : [],
        direElegida : [],
        totalPrice : '',
        combosToUpdate : [],
        productsToUpdate : [],
        arrayProdEnCombos : [],
        finalAmmount : 0,
        redirectHome: false,
        numero_cliente : "",
        estado_pedido : ""
    }
    }

    searchClient = React.createRef();
    

    componentDidMount(){
  
      
      JSON.parse(localStorage.getItem('pedidos')).map(cliente => {

          if(cliente.Date === this.props.location.state.Date){
            this.state.numero_cliente = cliente.Clients.Phone
          }

      })

      // permisosUsuario = this.props.usuario.Authorizations.filter(permiso => (permiso.id <= 4));

      if(typeof(this.props.location.state.State) === "string"){

        this.state.estado_pedido = this.props.location.state.State

      }else if(typeof(this.props.location.state.State) === "object"){

        this.state.estado_pedido = this.props.location.state.State.Description

      }
          
          {this.props.location.state.ProductosPorPedido.map(producto => (
              console.log(producto),
              this.state.productsToUpdate.push({Product: producto.Product.id, Count: producto.Count})
          ))}

          if(this.state.productsToUpdate === undefined){
              return null;
          }else{
          //Revaluo el indice de los elementos dentro del objeto
          this.state.productsToUpdate = Object.entries(this.state.productsToUpdate).reduce((s, [_, v]) => (s[v.Product] = v, s), {});
        }

        this.obtenerProductosDeCombos();

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

    componentWillMount(){
      
      this.props.mostrarProductos();
      this.props.mostrarCombos();
      this.state.selectedProductsOption = [];
      {this.props.location.state.ProductosPorPedido.map(producto => (
        this.state.selectedProductsOption.push({value: producto.Product.id, price: producto.Product.Amount, label: producto.Product.Name + " " + producto.Product.Description,count: producto.Count})
      ))}
      {this.props.location.state.ProductosPorPedido.map(producto => (
        this.state.optionsProductsCount[producto.Product.id] = {Product: producto.Product.id, Count: producto.Count}
      ))}
      
      this.state.selectedComboOption = [];
      {this.props.location.state.CombosPorPedido.map(producto => (
        this.state.selectedComboOption.push({value: producto.Offer.id, price: producto.Offer.Amount, label: producto.Offer.Name ,count: producto.Count})
      ))}
      {this.props.location.state.CombosPorPedido.map(producto => (
        this.state.optionsCombosCount[producto.Offer.id] = {Offer: producto.Offer.id, Count: producto.Count}
      ))}

    }


    mostrarProductosListos = () => {
        if(this.state.selectedProductsOption == null || this.state.selectedProductsOption === null) return null;
        // console.log(this.state.selectedProductsOption);
        return (
            <div className="form-group">
                <label>Cantidad de cada producto</label>
                <div center="true" align="center">

                {this.state.selectedProductsOption.map(product => (
                    <div className="form-group" key={product.value}>
                        <Grid style={{marginTop:'20px', width:'800px'}}>
                        <Row style={{ width:'800px'}} className="show-grid">
                            <Col xs={8} md={3}>
                                <p>{product.label}</p>
                            </Col>
                            <Col xs={4} md={6}>
                                <input 
                                    disabled
                                    name={product.value}
                                    defaultValue={product.count}
                                    style={{width: '60px'}} 
                                    type="number" min="1" step="1" title="Numbers only" 
                                    className="form-control" required/>
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
      // console.log(this.state.selectedProductsOption);
      return (
          <div className="form-group">
              <label>Cantidad de cada Combo</label>
              <div center="true" align="center">

              {this.state.selectedComboOption.map(product => (
                  <div className="form-group" key={product.value}>
                      <Grid style={{marginTop:'20px', width:'800px'}}>
                      <Row align="center" style={{ width:'800px'}} className="show-grid">
                          <Col xs={3} md={2}>
                              <p>{product.label}</p>
                          </Col>
                          <Col xs={3} md={3}>
                          {(this.state.arrayProdEnCombos.filter(prod => (prod.id === product.value))
                            .map(prod => <span key={prod.products}>- {prod.products}<br></br></span>))}
                          </Col>
                          <Col xs={2} md={2}>
                              <input
                                  disabled
                                  onChange={this.commonChangeCombo}
                                  defaultValue={product.count}
                                  name={product.value}
                                  style={{width: '60px'}} 
                                  type="number" min="1" step="1" title="Numbers only" 
                                  className="form-control" required/>
                          </Col>
                      </Row>
                      </Grid>
                  </div>
              ))}

              </div>
          </div>
      )
  }

  mostrarValorTotal = () => {
    
    let calc_arr = [0];
    let sum = 0;
    // console.log(this.state.selectedProductsOption)

    if (this.state.optionsCombosCount !== null) {

      var myDataCombo = Object.keys(this.state.optionsCombosCount).map(key => {
        return this.state.optionsCombosCount[key];
      })
      
    }
    
    if(this.state.optionsProductsCount !== null){

      var myDataProduct = Object.keys(this.state.optionsProductsCount).map(key => {
        return this.state.optionsProductsCount[key];
      })
    }

      
    if (this.state.selectedComboOption !== null) {

      this.state.selectedComboOption.map(combo => {
          myDataCombo.map(data => {
            if(combo.value == data.Offer){
              calc_arr.push(combo.price * data.Count)
            }
          })
      })
    }

    if(this.state.selectedProductsOption !== null){

      this.state.selectedProductsOption.map(product => {
        myDataProduct.map(data => {
          if(product.value == data.Product){
            calc_arr.push(product.price * data.Count)
          }
        })
      })
    }
    
    if(calc_arr == []){

      calc_arr.push(0)

    }else{

      sum = calc_arr.reduce(function(a, b){
    
      return a + b;

    })
    }

    if(sum !== 0){
      this.state.finalAmmount = sum
    }

    // console.log(this.state.finalAmmount)
    // console.log(calc_arr);

        
  }

    mostrarDireccion = () => {
      return (
        <div>
          <input disabled value={this.props.location.state.Adress} type="text" className="form-control" required />
        </div>
      );
    }

    goBack(){
      window.history.back();
    }

    render() {

        const { selectedComboOption, selectedProductsOption } = this.state;
        let modalClose = () => this.setState({ modalShow: false, direcciones: [] });
        
        return (
            
        <React.Fragment>
            <Header titulo = 'Mostrar Pedido'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.generarPedido} className="col-5">
                    <div className="form-group">
                        <label  style={{ marginTop: '20px' }}>Numero Cliente</label>
                        <input disabled defaultValue={this.state.numero_cliente} type="text" className="form-control" required />
                  
                        <div style={{ marginTop: '20px', marginBottom: '20px' }} className="form-group">
                          <label>Direccion</label>
                          {this.mostrarDireccion()}
                        </div>

                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <select disabled className="form-control">
                                <option>{this.state.estado_pedido}</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Combo</label>
                            <Select required
                                placeholder="Ingrese o Selecciones el Combo"
                                value={selectedComboOption}
                                isDisabled
                                options={this.state.optionsComboName}
                                isMulti
                                isSearchable
                            />
                        </div>
                        {this.mostrarCombosListos()}
                        <div className="form-group">
                            <label>Productos</label>
                            <Select required
                                placeholder="Ingrese o Selecciones los Productos"
                                value={selectedProductsOption}
                                isDisabled
                                options={this.state.optionsProductsName}
                                isMulti
                                isSearchable
                            />
                        </div>
                        {this.mostrarProductosListos()}
                        <hr></hr>
                        <div style={{marginTop: "20px"}} className="form-group">
                          <textarea disabled placeholder="Observaciones" className="form-control"></textarea>
                        </div>
                        <div style={{marginTop: "20px", marginBottom:"-10px"}} align="center" className="form-group">
                        <label>Valor Total: {this.mostrarValorTotal()} {this.state.finalAmmount}</label>
                        </div>
                        <hr style={{width: "300px"}}></hr>
                        <div style={{marginTop: "30px", marginBottom: "40px"}} align="center">
                        <button type="button" className="btn" style={{color:"white", backgroundColor: "#4D4D4D"}} onClick={ () => this.goBack()}>Volver</button>
                        <button type="button" className="btn btn-warning" style={{marginLeft: "10px"}} onClick={() => window.print()}>Imprimir</button>
                        <Link style={buttonStyle} to={{
                            pathname : `/mapa`,
                            // state : this.props.rowData
                            }} className="btn btn-primary">
                            Mapa
                        </Link>
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
    auth: state.auth
});

export default connect(mapStateToProps, {mostrarCombos, mostrarProductos, editarPedido})(PedidoIndividual);
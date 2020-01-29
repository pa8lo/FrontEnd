import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import Select from 'react-select';
import { Grid, Row, Col } from 'react-bootstrap';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';


//Redux
import { connect } from 'react-redux';
import { agregarPedido } from '../../actions/pedidosAction';
import { mostrarProductos } from '../../actions/productosAction';
import { mostrarCombos } from '../../actions/combosAction'

const buttonStyle = {
  marginLeft: 10,
  width: 80
};

class PedidoIndividual extends Component {

  constructor(...args) {
  super(...args);

  this.state = {
      selectedComboOption : null,
      optionsComboName : [],
      selectedProductsOption : null,
      optionsProductsName : [],
      modalShow: false,
      arrayProdEnCombos : []
  }
  }

  componentDidMount(){
    this.obtenerProductosDeCombos();
    this.setState({
      selectedProductsOption : this.state.optionsProductsName,
      selectedComboOption : this.state.optionsComboName
    })
    
  }

  componentWillMount(){

    console.log(this.props)

    // if(this.props.location.state == [] || this.props.location.state == undefined || this.props.location.state == null) return null;

    if(this.props.location.state.ProductosPorPedido !== undefined || this.props.location.state.ProductosPorPedido.length !== 0){

      {this.props.location.state.ProductosPorPedido.map(producto => (
        this.state.optionsProductsName.push({value: producto.id,label: producto.Product.Name + " " + producto.Product.Description,count: producto.Count})
      ))}

    }else{
      return;
    }

    if(this.props.location.state.CombosPorPedido !== undefined || this.props.location.state.CombosPorPedido.length !== 0){

      {this.props.location.state.CombosPorPedido.map(producto => (
        this.state.optionsComboName.push({value: producto.id,label: producto.Offer.Name ,count: producto.Count})
      ))}

    }else{
      return;
    }

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

  goBack(){
    window.history.back();
  }

  render() {

    // console.log(this.props)
    // console.log(this.state.direElegida)

      const { selectedComboOption, selectedProductsOption } = this.state;
      // let modalClose = () => this.setState({ modalShow: false, direcciones: [] });
      
      return (
          
      <React.Fragment>
          <Header titulo = 'Pedido'/>
          <div className="table-empleados">
              <Paper className="col-md-5">
                  <div>
                  <form className="col-5">
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
                          <label>Direccion Cliente</label>

                      <div className="form-group">
                      {this.mostrarDireccion()}
                      </div>

                      </div>
                  </form>
                  </div>

                  <div style={{marginTop: "30px", marginBottom: "40px"}} align="center">


                  <button type="button" className="btn" style={{color:"white", backgroundColor: "#4D4D4D"}} onClick={ () => this.goBack()}>Volver</button>

                  
                  <Link style={buttonStyle} to={{
                      pathname : `/mapa`,
                      // state : this.props.rowData
                      }} className="btn btn-primary">
                      Mapa
                  </Link>
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
  pedidos : state.pedidos.pedidos
});

export default connect(mapStateToProps, {mostrarCombos, mostrarProductos, agregarPedido})(PedidoIndividual);
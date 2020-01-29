import React, { Component } from 'react';

//Componentes
import Paper from '@material-ui/core/Paper';
import Header from '../header/IndexHeader';
import Select from 'react-select';
import { Grid, Row, Col } from 'react-bootstrap';

//CSS
import '../../assets/css/empleados/form-alta-empleados.css';

//Redux
import { connect } from 'react-redux';
import { mostrarProductos } from '../../actions/productosAction';
import { mostrarCombos } from '../../actions/combosAction'

class EnviarPedidoOffline extends Component {

    constructor(...args) {
        super(...args);
    
        this.state = {
          selectedComboOption: null,
          optionsComboName: [],
          selectedProductsOption: null,
          optionsProductsName: [],
          optionsProductsCount: [],
          optionsCombosCount: [],
          modalShow: false,
          telefonoClient: '',
          correctSearchPhone: false,
          direcciones: [],
          direElegida: [],
          totalPrice: '',
        }
      }
    
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    telefonoRef = React.createRef();
    emailRef = React.createRef();
    direccionRef = React.createRef();
    pisoRef = React.createRef();
    deptoRef = React.createRef();
    
    
      handleComboChange = selectedComboOption => {
        this.setState(
          { selectedComboOption },
          () => console.log(`Option selected:`, this.state.selectedComboOption)
        );
      };
    
      handleProductsChange = selectedProductsOption => {
        this.setState(
          { selectedProductsOption },
          () => console.log(`Option selected:`, this.state.selectedProductsOption)
        );
      };
    
      componentWillMount() {
    
        this.props.mostrarProductos();
        this.props.mostrarCombos();
      }
    
      componentDidUpdate() {
        // console.log(this.props)
        this.reorganizarProductos();
        this.reorganizarCombos();
      }
    
      reorganizarProductos = () => {
        // console.log(this.props)
        if (this.state.optionsProductsName.length == this.props.productos.length) return null;
        
          this.props.productos.map(producto => (
            this.state.optionsProductsName.push({ value: producto.id, label: producto.Name + " " + producto.Description, price: parseInt(producto.Amount) })
          ))
        
      }
    
      reorganizarCombos = () => {
        if (this.state.optionsComboName.length == this.props.combos.length) return null;
        {
          this.props.combos.map(combo => (
            this.state.optionsComboName.push({ value: combo.id, label: combo.Name, price: combo.Amount })
          ))
        }
      }
    
      commonChange = (event) => {
    
        this.setState({
          optionsProductsCount: {
            ...this.state.optionsProductsCount,
            [event.target.name]: {
              Product: parseInt(event.target.name),
              Count: parseInt(event.target.value),
            }
          },
        })
      }
    
      commonChangeCombo = (event) => {
        this.setState({
          optionsCombosCount: {
            ...this.state.optionsCombosCount,
            [event.target.name]: {
              Offer: parseInt(event.target.name),
              Count: parseInt(event.target.value)
            }
          }
        })
      }

    componentDidMount () {

        if(this.props.location.search !== ""){
        let a  = (this.props.location.search).split("?=")

            this.setState({
                telefono : parseInt(a[1])
            })

        }
    }

    mostrarProductosListos = () => {
        if (this.state.selectedProductsOption == null || this.state.selectedProductsOption === null) return null;
        // console.log(this.state.selectedProductsOption);
        return (
        <div className="form-group">
            <label>Coloque una cantidad para cada producto</label>
            <div center="true" align="center">

            {this.state.selectedProductsOption.map(product => (
                <div className="form-group" key={product.value}>
                <Grid style={{ marginTop: '20px' }}>
                    <Row className="show-grid">
                    <Col xs={8} md={3}>
                        <p>{product.label}</p>
                    </Col>
                    <Col xs={4} md={2}>
                        <input
                        onChange={this.commonChange}
                        name={product.value}
                        style={{ width: '60px' }}
                        type="number" min="1" step="1" title="Numbers only"
                        className="form-control" required />
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

        if (this.state.selectedComboOption == null || this.state.selectedComboOption === null) return null;
        // console.log(this.state.selectedProductsOption);
        return (
        <div className="form-group">
            <label>Coloque una cantidad para cada producto</label>
            <div center="true" align="center">

            {this.state.selectedComboOption.map(product => (
                <div className="form-group" key={product.value}>
                <Grid style={{ marginTop: '20px' }}>
                    <Row className="show-grid">
                    <Col xs={8} md={3}>
                        <p>{product.label}</p>
                    </Col>
                    <Col xs={4} md={2}>
                        <input
                        onChange={this.commonChangeCombo}
                        name={product.value}
                        style={{ width: '60px' }}
                        type="number" min="1" step="1" title="Numbers only"
                        className="form-control" required />
                    </Col>
                    </Row>
                </Grid>
                </div>
            ))}

            </div>
        </div>
        )
    }

    generarPedido = (e) => {
        e.preventDefault();
    
    
        /*-----------------------Productos---------------------*/
    
        if (this.state.selectedProductsOption !== null) {
          var dictProduct = {};
          for (var i = 0; i < this.state.selectedProductsOption.length; i++) {
            dictProduct[this.state.selectedProductsOption[i]['value']] = this.state.selectedProductsOption[i];
          }
    
          // Comparo el selectedProductsOption con el optionsProductsCount para eliminar los productos deseleccionados
    
          const o = Object.entries(this.state.optionsProductsCount).reduce((s, [k, v]) =>
            k in dictProduct ? (s[k] = v, s) : s, []);
    
          // console.log(o);
    
          let price = [];
    
          for (var i = 0; i < this.state.selectedProductsOption.length; i++) {
            price[this.state.selectedProductsOption[i]['value']] = { "value": this.state.selectedProductsOption[i]['value'], "price": this.state.selectedProductsOption[i]['price'] };
          }
    
          //Elimino los elementos nullos
          var productFiltered = o.filter(el => {
            return el != null;
          });
    
    
          let priceNew = [];
    
          for (var i = 0; i < productFiltered.length; i++) {
            priceNew[this.state.selectedProductsOption[i]['value']] = { "value": productFiltered[i]['Product'], "count": productFiltered[i]['Count'] };
          }
    
          var priceProd = []
    
          {
            price.map(price => {
              priceProd.push(price.price);
            })
          }
    
          var countProd = []
    
          {
            priceNew.map(count => {
              countProd.push(count.count);
            })
          }
    
          var finalProd = (priceProd.reduce(function (r, a, i) { return r + a * countProd[i] }, 0));
    
          this.setState({
            totalPrice: finalProd
          })
    
        } else {
          productFiltered = []
        }
    
        /*-----------------------Combos---------------------*/
    
        if (this.state.selectedComboOption !== null) {
          var dictCombo = {};
          for (var i = 0; i < this.state.selectedComboOption.length; i++) {
            dictCombo[this.state.selectedComboOption[i]['value']] = this.state.selectedComboOption[i];
          }
    
          // Comparo el selectedProductsOption con el optionsProductsCount para eliminar los productos deseleccionados
    
          const p = Object.entries(this.state.optionsCombosCount).reduce((s, [k, v]) =>
            k in dictCombo ? (s[k] = v, s) : s, []);
    
    
          let priceCombo = [];
    
          for (var i = 0; i < this.state.selectedComboOption.length; i++) {
            priceCombo[this.state.selectedComboOption[i]['value']] = { "value": this.state.selectedComboOption[i]['value'], "price": this.state.selectedComboOption[i]['price'] };
          }
    
          //Elimino los elementos nullos
          var comboFiltered = p.filter(el => {
            return el != null;
          });
    
    
          let comboNew = [];
    
          for (var i = 0; i < comboFiltered.length; i++) {
            comboNew[this.state.selectedComboOption[i]['value']] = { "value": comboFiltered[i]['Offer'], "count": comboFiltered[i]['Count'] };
          }
    
          var combitoPrice = []
    
          {
            priceCombo.map(price => {
              combitoPrice.push(price.price);
            })
          }
    
          var countCombo = []
    
          {
            comboNew.map(count => {
              countCombo.push(count.count);
            })
          }
    
          var finalCombo = (combitoPrice.reduce(function (r, a, i) { return r + a * countCombo[i] }, 0));
    
          var finalTotal = this.state.totalPrice + finalCombo
    
        } else {
          comboFiltered = []
        }
    
        const a = new Date();
        const fecha = a.toISOString().split('T')[0]
    
        const pedido = {
          date: fecha,
          user: this.props.auth.user.Id,
          amount: finalTotal,
          product: productFiltered,
          combo: comboFiltered,
          state: 1,
          client: 1,
          address: 1,
        }

        const datos_cliente = {
          nombre : this.nombreRef.current.value,
          apellido : this.apellidoRef.current.value,
          email : this.emailRef.current.value,
          telefono : this.telefonoRef.current.value
        }

        const datos_direccion = {
          direccion : this.direccionRef.current.value,
          piso : this.pisoRef.current.value,
          depto : this.deptoRef.current.value
        }
    
        let arrayPedido = JSON.parse(localStorage.getItem('pedidoCompleto'));

        arrayPedido.push({
            pedido: pedido,
            datos_cliente: datos_cliente,
            datos_direccion: datos_direccion
        });

        localStorage.setItem('pedidoCompleto', JSON.stringify(arrayPedido));

      }

    render() {

        const { selectedComboOption, selectedProductsOption } = this.state;

        return (
            
        <React.Fragment>
            <Header titulo = 'Crear Cliente / Direccion / Pedido Offline'/>
            <div className="table-empleados">
                <Paper className="col-md-5">
                    <div>
                    <form onSubmit={this.generarPedido} className="col-5">
                        <h3 align="center">Datos del Cliente</h3>
                        <hr></hr>
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
                        <h3 align="center">Domicilio del Cliente</h3>
                        <hr></hr>
                        <div className="form-group">
                            <label>Direccion</label>
                            <input ref={this.direccionRef} type="text" className="form-control" placeholder="Solo nombre de la calle y altura" required/>
                        </div>
                        <div className="form-group">
                            <label>Piso</label>
                            <input ref={this.pisoRef} type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Departamento</label>
                            <input ref={this.deptoRef} type="text" className="form-control"/>
                        </div>
                        <h3 align="center">Pedido del Cliente</h3>
                        <hr></hr>
                        <div className="form-group">
                        <label>Seleccione Combo</label>
                        <Select required
                            placeholder="Ingrese o Selecciones el Combo"
                            value={selectedComboOption}
                            onChange={this.handleComboChange}
                            options={this.state.optionsComboName}
                            isMulti
                            isSearchable
                        />
                        </div>
                        {this.mostrarCombosListos()}
                        <div className="form-group">
                        <label>Seleccione Productos</label>
                        <Select style={{width: "50px", height: "50px"}} required
                            placeholder="Ingrese o Selecciones los Productos"
                            value={selectedProductsOption}
                            onChange={this.handleProductsChange}
                            options={this.state.optionsProductsName}
                            isMulti
                            isSearchable
                        />
                        </div>
                        {this.mostrarProductosListos()}
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


/**

 var arr = [];
var len = oFullResponse.results.length;
for (var i = 0; i < len; i++) {
    arr.push({
        key: oFullResponse.results[i].label,
        sortable: true,
        resizeable: true
    });
}

 */

const mapStateToProps = state => ({
  combos: state.combos.combos,
  productos: state.productos.productos,
  auth: state.auth
});

export default connect(mapStateToProps, { mostrarCombos, mostrarProductos })(EnviarPedidoOffline);
import React, { Component } from "react";

//Componentes
import Paper from "@material-ui/core/Paper";
import Header from "../header/IndexHeader";
import Select from "react-select";
import { Grid, Modal, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

//CSS
import "../../assets/css/empleados/form-alta-empleados.css";
import Swal from "sweetalert2";

//Redux
import { connect } from "react-redux";
import { editarPedido } from "../../actions/pedidosAction";
import { mostrarProductos } from "../../actions/productosAction";
import { mostrarCombos } from "../../actions/combosAction";

class MyVerticallyCenteredModal extends Component {
  constructor(...args) {
    super(...args);
  }

  direccionRef = React.createRef();
  departamentoRef = React.createRef();
  pisoRef = React.createRef();
  cpRef = React.createRef();

  render() {
    // console.log(this.props);
    // console.log(this)
    if (this.props.direcciones.length > 0) {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered="true"
          style={{ marginTop: "100px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Se encontraron las siguientes direcciones
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={this.crearDireccion} className="col-8">
            <Modal.Body>
              <div style={{ margin: "50px" }}>
                {this.props.direcciones.map((direccion) => (
                  <React.Fragment key={direccion.id}>
                    <h3>{direccion.Address}</h3>
                    <Button
                      style={{ marginTop: "20px" }}
                      className="btn btn-success"
                      variant="primary"
                      onClick={() =>
                        this.props.dire(
                          direccion.id,
                          direccion.Address,
                          direccion.Client,
                          direccion.LatLong
                        )
                      }
                    >
                      Elegir
                    </Button>
                  </React.Fragment>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Col xs={12} md={11}>
                <Button onClick={this.props.onHide}>Cerrar</Button>
              </Col>
            </Modal.Footer>
          </form>
        </Modal>
      );
    } else {
      if (this.props.redirect && this.props.redirect === true)
        // return <Redirect to='/clientes' />
        console.log(this.props.redirect);
      return null;
    }
  }
}

class NuevoPedido extends Component {
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
      telefonoClient: "",
      correctSearchPhone: false,
      direcciones: [],
      direElegida: [],
      totalPrice: "",
      combosToUpdate: [],
      productsToUpdate: [],
      arrayProdEnCombos: [],
      finalAmmount: 0,
      redirectHome: false,
      numero_cliente: "",
    };
  }

  searchClient = React.createRef();
  obvservacionesRef = React.createRef();

  componentDidMount() {
    JSON.parse(localStorage.getItem("pedidos")).map((cliente) => {
      if (cliente.Date === this.props.location.state.Date) {
        this.state.numero_cliente = cliente.Clients.Phone;
      }
    });

    let pedidoEditar = JSON.parse(localStorage.getItem("pedidos")).filter(
      (order) => order.id === this.props.location.state.id
    );

    if (pedidoEditar[0].Adress == null) {
      pedidoEditar[0].Adress = "-1";
    }

    this.state.direElegida = {
      cliente: { cliente: pedidoEditar[0].Clients.id },
      id: { id: pedidoEditar[0].Adress.id },
    };

    {
      this.props.location.state.ProductosPorPedido.map((producto) =>
        // console.log(producto),
        this.state.productsToUpdate.push({
          Product: producto.Product.id,
          Count: producto.Count,
        })
      );
    }

    console.log(typeof this.state.productsToUpdate);

    if (this.state.productsToUpdate === undefined) {
      return null;
    } else {
      //Revaluo el indice de los elementos dentro del objeto
      this.state.productsToUpdate = Object.entries(
        this.state.productsToUpdate
      ).reduce((s, [_, v]) => ((s[v.Product] = v), s), {});
    }

    this.obtenerProductosDeCombos();
  }

  obtenerProductosDeCombos() {
    {
      JSON.parse(localStorage.getItem("combos")).map((prodCombo) => {
        prodCombo.ProductosPorCombo.map((productio) => {
          this.state.arrayProdEnCombos.push({
            id: prodCombo.id,
            products:
              productio.Product.Name + " " + productio.Product.Description,
          });
        });
      });
    }
  }

  handleComboChange = (selectedComboOption) => {
    this.setState({ selectedComboOption }, () =>
      console.log(`Option selected:`, this.state.selectedComboOption)
    );
  };

  handleProductsChange = (selectedProductsOption) => {
    this.setState({ selectedProductsOption }, () =>
      console.log(`Option selected:`, this.state.selectedProductsOption)
    );
  };

  handleSearchClient = (e) => {
    this.setState({
      telefonoClient: this.searchClient.current.value,
    });
  };

  componentWillMount() {
    this.props.mostrarProductos();
    this.props.mostrarCombos();
    this.state.selectedProductsOption = [];
    {
      this.props.location.state.ProductosPorPedido.map((producto) =>
        this.state.selectedProductsOption.push({
          value: producto.Product.id,
          price: producto.Product.Amount,
          label: producto.Product.Name + " " + producto.Product.Description,
          count: producto.Count,
        })
      );
    }
    {
      this.props.location.state.ProductosPorPedido.map(
        (producto) =>
          (this.state.optionsProductsCount[producto.Product.id] = {
            Product: producto.Product.id,
            Count: producto.Count,
          })
      );
    }

    this.state.selectedComboOption = [];
    {
      this.props.location.state.CombosPorPedido.map((producto) =>
        this.state.selectedComboOption.push({
          value: producto.Offer.id,
          price: producto.Offer.Amount,
          label: producto.Offer.Name,
          count: producto.Count,
        })
      );
    }
    {
      this.props.location.state.CombosPorPedido.map(
        (producto) =>
          (this.state.optionsCombosCount[producto.Offer.id] = {
            Offer: producto.Offer.id,
            Count: producto.Count,
          })
      );
    }
  }

  componentDidUpdate() {
    // console.log(this.props)
    this.reorganizarProductos();
    this.reorganizarCombos();
  }

  reorganizarProductos = () => {
    if (this.state.optionsProductsName.length == this.props.productos.length)
      return null;
    {
      this.props.productos.map((producto) =>
        this.state.optionsProductsName.push({
          value: producto.id,
          label: producto.Name + " " + producto.Description,
          price: parseInt(producto.Amount),
        })
      );
    }
  };

  reorganizarCombos = () => {
    if (this.state.optionsComboName.length == this.props.combos.length)
      return null;
    {
      this.props.combos.map((combo) =>
        this.state.optionsComboName.push({
          value: combo.id,
          label: combo.Name,
          price: combo.Amount,
        })
      );
    }
  };

  commonChange = (event) => {
    // console.log(this.state.optionsProductsName)
    // console.log(event.target.value);

    this.setState({
      optionsProductsCount: {
        ...this.state.optionsProductsCount,
        [event.target.name]: {
          Product: parseInt(event.target.name),
          Count: parseInt(event.target.value),
        },
      },
      //   totalPrice : {

      // }
    });
  };

  commonChangeCombo = (event) => {
    this.setState({
      optionsCombosCount: {
        ...this.state.optionsCombosCount,
        [event.target.name]: {
          Offer: parseInt(event.target.name),
          Count: parseInt(event.target.value),
        },
      },
    });
  };

  ToHome() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  }

  setRedirectToHome = () => {
    this.setState({
      redirectHome: true,
    });
  };

  mostrarProductosListos = () => {
    if (
      this.state.selectedProductsOption == null ||
      this.state.selectedProductsOption === null
    )
      return null;
    // console.log(this.state.selectedProductsOption);
    return (
      <div className="form-group">
        <label>Coloque una cantidad para cada producto</label>
        <div center="true" align="center">
          {this.state.selectedProductsOption.map((product) => (
            <div className="form-group" key={product.value}>
              <Grid style={{ marginTop: "20px", width: "800px" }}>
                <Row style={{ width: "800px" }} className="show-grid">
                  <Col xs={8} md={3}>
                    <p>{product.label}</p>
                  </Col>
                  <Col xs={4} md={6}>
                    <input
                      onChange={this.commonChange}
                      name={product.value}
                      defaultValue={product.count}
                      style={{ width: "60px" }}
                      type="number"
                      min="1"
                      step="1"
                      title="Numbers only"
                      className="form-control"
                      required
                    />
                  </Col>
                </Row>
              </Grid>
            </div>
          ))}
        </div>
      </div>
    );
  };

  mostrarCombosListos = () => {
    if (
      this.state.selectedComboOption == null ||
      this.state.selectedComboOption === null
    )
      return null;
    // console.log(this.state.selectedProductsOption);
    return (
      <div className="form-group">
        <label>Coloque una cantidad para cada Combo</label>
        <div center="true" align="center">
          {this.state.selectedComboOption.map((product) => (
            <div className="form-group" key={product.value}>
              <Grid style={{ marginTop: "20px", width: "800px" }}>
                <Row
                  align="center"
                  style={{ width: "800px" }}
                  className="show-grid"
                >
                  <Col xs={3} md={2}>
                    <p>{product.label}</p>
                  </Col>
                  <Col xs={3} md={3}>
                    {this.state.arrayProdEnCombos
                      .filter((prod) => prod.id === product.value)
                      .map((prod) => (
                        <span key={prod.products}>
                          - {prod.products}
                          <br></br>
                        </span>
                      ))}
                  </Col>
                  <Col xs={2} md={2}>
                    <input
                      onChange={this.commonChangeCombo}
                      defaultValue={product.count}
                      name={product.value}
                      style={{ width: "60px" }}
                      type="number"
                      min="1"
                      step="1"
                      title="Numbers only"
                      className="form-control"
                      required
                    />
                  </Col>
                </Row>
              </Grid>
            </div>
          ))}
        </div>
      </div>
    );
  };

  mostrarValorTotal = () => {
    let calc_arr = [0];
    let sum = 0;
    // console.log(this.state.selectedProductsOption)

    if (this.state.optionsCombosCount !== null) {
      var myDataCombo = Object.keys(this.state.optionsCombosCount).map(
        (key) => {
          return this.state.optionsCombosCount[key];
        }
      );
    }

    if (this.state.optionsProductsCount !== null) {
      var myDataProduct = Object.keys(this.state.optionsProductsCount).map(
        (key) => {
          return this.state.optionsProductsCount[key];
        }
      );
    }

    if (this.state.selectedComboOption !== null) {
      this.state.selectedComboOption.map((combo) => {
        myDataCombo.map((data) => {
          if (combo.value == data.Offer) {
            calc_arr.push(combo.price * data.Count);
          }
        });
      });
    }

    if (this.state.selectedProductsOption !== null) {
      this.state.selectedProductsOption.map((product) => {
        myDataProduct.map((data) => {
          if (product.value == data.Product) {
            calc_arr.push(product.price * data.Count);
          }
        });
      });
    }

    if (calc_arr == []) {
      calc_arr.push(0);
    } else {
      sum = calc_arr.reduce(function (a, b) {
        return a + b;
      });
    }

    if (sum !== 0) {
      this.state.finalAmmount = sum;
    }

    // console.log(this.state.finalAmmount)
    // console.log(calc_arr);
  };

  generarPedido = (e) => {
    e.preventDefault();

    console.log(this.props);

    let idProductos = [];

    if (this.state.direElegida.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Debe elegir una dirección",
        type: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    // var proddd = {};

    /*-----------------------Productos---------------------*/

    if (this.state.selectedProductsOption !== null) {
      var dictProduct = {};
      for (var i = 0; i < this.state.selectedProductsOption.length; i++) {
        dictProduct[
          this.state.selectedProductsOption[i]["value"]
        ] = this.state.selectedProductsOption[i];
      }

      // Comparo el selectedProductsOption con el optionsProductsCount para eliminar los productos deseleccionados

      const o = Object.entries(this.state.optionsProductsCount).reduce(
        (s, [k, v]) => (k in dictProduct ? ((s[k] = v), s) : s),
        []
      );

      let price = [];

      for (var i = 0; i < this.state.selectedProductsOption.length; i++) {
        price[this.state.selectedProductsOption[i]["value"]] = {
          value: this.state.selectedProductsOption[i]["value"],
          price: this.state.selectedProductsOption[i]["price"],
        };
      }

      //Elimino los elementos nullos
      var productFiltered = o.filter((el) => {
        return el != null;
      });
    } else {
      productFiltered = [];
    }

    /*-----------------------Combos---------------------*/

    if (this.state.selectedComboOption !== null) {
      var dictCombo = {};
      for (var i = 0; i < this.state.selectedComboOption.length; i++) {
        dictCombo[
          this.state.selectedComboOption[i]["value"]
        ] = this.state.selectedComboOption[i];
      }

      // Comparo el selectedProductsOption con el optionsProductsCount para eliminar los productos deseleccionados

      const p = Object.entries(this.state.optionsCombosCount).reduce(
        (s, [k, v]) => (k in dictCombo ? ((s[k] = v), s) : s),
        []
      );

      let priceCombo = [];

      for (var i = 0; i < this.state.selectedComboOption.length; i++) {
        priceCombo[this.state.selectedComboOption[i]["value"]] = {
          value: this.state.selectedComboOption[i]["value"],
          price: this.state.selectedComboOption[i]["price"],
        };
      }

      //Elimino los elementos nullos
      var comboFiltered = p.filter((el) => {
        return el != null;
      });
    } else {
      comboFiltered = [];
    }

    if (comboFiltered.length === 0 && productFiltered.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Debe ingresar un Producto o un Combo",
        type: "error",
        confirmButtonText: "Ok",
      });
    } else {
      const a = new Date();
      const fecha = a.toISOString().split("T")[0];

      const pedido = {
        id: this.props.location.state.id,
        date: fecha,
        user: this.props.auth.user.Id,
        amount: this.state.finalAmmount,
        product: productFiltered,
        combo: comboFiltered,
        state: 1,
        client: this.state.direElegida.cliente.cliente,
        address: this.state.direElegida.id.id,
        observacion: this.obvservacionesRef.current.value,
      };

      // console.log(pedido);

      this.props.editarPedido(pedido);
    }
  };

  buscarDireccion = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER}/Client/Client?Phone=${this.state.telefonoClient}`,
        { headers: { "access-token": localStorage.getItem("access-token") } }
      )
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          if (res.data.Cliente && this.state.correctSearchPhone == false) {
            this.setState({
              correctSearchPhone: true,
            });

            console.log("Encontre telefono");

            if (
              res.data.Cliente.id === this.state.clientId &&
              res.data.Client.Adress.length === this.state.direcciones.length
            ) {
              console.log("No repito direccion");

              return;
            } else {
              console.log("Guardo las direcciones");

              {
                res.data.Cliente.Adress.map(
                  (direccion) => (
                    direccion.Department == "null" ||
                    direccion.Department == null
                      ? (direccion.Department = "")
                      : (direccion.Department = direccion.Department),
                    direccion.Floor == "null" || direccion.Floor == null
                      ? (direccion.Floor = "")
                      : (direccion.Floor = direccion.Floor),
                    this.state.direcciones.push({
                      id: direccion.id,
                      LatLong: direccion.LatLong,
                      Client: direccion.Client,
                      Address:
                        direccion.Adress +
                        " " +
                        direccion.Floor +
                        " " +
                        direccion.Department +
                        " " +
                        direccion.Cp,
                    })
                  )
                );
              }

              this.setState({
                modalShow: true,
                correctSearchPhone: false,
              });
            }

            return;
          } else {
            // console.log("No encontre el telefono")

            this.setState({
              correctSearchPhone: false,
            });
            Swal.fire({
              title: "Sin resultados",
              text: "Quieres crear el cliente?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si",
            }).then((result) => {
              if (result.value) {
                this.setState({
                  modalShow: true,
                  direcciones: [],
                  redirect: true,
                });
                window.location.href = "/clientes";
              }
            });

            return;
          }
        } else {
          Swal.fire({
            title: "Error!",
            text: "Hubo un error, intentelo nuevamente mas tarde",
            type: "error",
            confirmButtonText: "Aceptar",
          });
          return;
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Error!",
              text: `${err.response.data}`,
              type: "error",
              confirmButtonText: "Aceptar",
            });
            return;
          }
          if (err.response.status === 401) {
            Swal.fire({
              title: "Error!",
              text: `No posee los permisos necesarios`,
              type: "error",
              confirmButtonText: "Aceptar",
            });
            // localStorage.removeItem("access-token");
            setTimeout(function () {
              return window.location.replace("/login");
            }, 3000);
          }
        }
      });
  };

  handleClick = (id, direccion, cliente, latlong) => {
    if (id && direccion) {
      return this.setState({
        direElegida: {
          id: { id },
          direccion: { direccion },
          cliente: { cliente },
          latlong: { latlong },
        },
      });
    } else {
      return (
        <div
          align="center"
          style={{ marginBottom: "20px" }}
          className="form-group"
        >
          <input
            value={this.state.direElegida.Address}
            type="text"
            className="form-control"
          />
        </div>
      );
    }
  };

  mostrarDireccion = () => {
    return (
      <div>
        <input
          disabled
          value={this.props.location.state.Adress}
          type="text"
          className="form-control"
          required
        />
      </div>
    );
  };

  render() {
    const { selectedComboOption, selectedProductsOption } = this.state;
    let modalClose = () => this.setState({ modalShow: false, direcciones: [] });

    return (
      <React.Fragment>
        <Header titulo="Editar Pedido" />
        <div className="table-empleados">
          <Paper className="col-md-5">
            <div>
              <form onSubmit={this.generarPedido} className="col-5">
                <div className="form-group">
                  <label style={{ marginTop: "20px" }}>Número Cliente</label>
                  <input
                    disabled
                    defaultValue={this.state.numero_cliente}
                    type="text"
                    className="form-control"
                  />
                  <div align="center">
                    <div
                      align="center"
                      style={{ marginBottom: "20px" }}
                      className="form-group"
                    >
                      <label align="center">
                        Coloque un número de teléfono y verifique su existencia
                      </label>
                    </div>
                    <Button
                      disabled
                      className="btn btn-success"
                      variant="primary"
                      onClick={() => this.buscarDireccion()}
                    >
                      Verificar
                    </Button>

                    <MyVerticallyCenteredModal
                      show={this.state.modalShow}
                      onHide={modalClose}
                      direcciones={this.state.direcciones}
                      dire={this.handleClick}
                    />
                    {/* {this.mostrarDatos()} */}
                  </div>

                  <div
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                    className="form-group"
                  >
                    {this.mostrarDireccion()}
                  </div>
                </div>
                <div className="form-group">
                  <label>Seleccione Combo</label>
                  <Select
                    required
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
                  <Select
                    required
                    placeholder="Ingrese o Selecciones los Productos"
                    value={selectedProductsOption}
                    onChange={this.handleProductsChange}
                    options={this.state.optionsProductsName}
                    isMulti
                    isSearchable
                  />
                </div>
                {this.mostrarProductosListos()}
                <hr></hr>
                <div style={{ marginTop: "20px" }} className="form-group">
                  <textarea
                    placeholder="Observaciones"
                    ref={this.obvservacionesRef}
                    defaultValue={this.props.location.state.Observaciones}
                    className="form-control"
                  ></textarea>
                </div>
                <div
                  style={{ marginTop: "20px", marginBottom: "-10px" }}
                  align="center"
                  className="form-group"
                >
                  <label>
                    Valor Total: {this.mostrarValorTotal()}{" "}
                    {this.state.finalAmmount}
                  </label>
                </div>
                <hr style={{ width: "300px" }}></hr>
                <div
                  style={{ marginTop: "0px" }}
                  align="center"
                  className="form-group"
                >
                  <input
                    type="submit"
                    value="Aceptar"
                    className="btn btn-primary"
                    required
                  />
                  <button
                    style={{ marginLeft: 20, width: 80 }}
                    onClick={this.setRedirectToHome}
                    type="button"
                    className="btn btn-danger"
                  >
                    Cancelar
                  </button>
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

const mapStateToProps = (state) => ({
  combos: state.combos.combos,
  productos: state.productos.productos,
  pedidos: state.pedidos.pedidos,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  mostrarCombos,
  mostrarProductos,
  editarPedido,
})(NuevoPedido);

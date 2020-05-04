import React, { Component } from "react";

import { Col, Button, Modal } from "react-bootstrap";
import Header, {
  enviarSolicitudesEncoladasCompletas,
} from "../header/IndexHeader";
import { Redirect } from "react-router-dom";

//CSS
import Swal from "sweetalert2";

class mostrarPedidosOffline extends Component {
  state = {
    loading: true,
    arrayPedidoCompleto: [],
    arrayPedidoSemiCompleto: [],
    arrayPedido: [],
    mostrarDire: false,
    mostrarPedido: false,
    mostrarDireSemi: false,
    mostrarPedidoSemi: false,
    mostrarSoloPedido: false,
    redirectHome: false,
    redirectPedidos: false,
  };

  direccionNuevaRef = React.createRef();
  pisoNuevoRef = React.createRef();
  dptoNuevoRef = React.createRef();
  cpNuevoRef = React.createRef();

  estadoRef = React.createRef();

  componentDidMount() {
    this.state.arrayPedidoCompleto = JSON.parse(
      localStorage.getItem("pedidoCompleto")
    );
    this.state.arrayPedidoSemiCompleto = JSON.parse(
      localStorage.getItem("pedidoSemiCompleto")
    );
    this.state.arrayPedido = JSON.parse(localStorage.getItem("enviarPedido"));
    this.state.arrayEstados = JSON.parse(localStorage.getItem("estados"));
  }

  /**
   *
   * Pedido Completo
   */

  mostrarListaDireccion = (pedido, index) => {
    this.setState({
      mostrarDire: true,
      index_actual: index,
      pedido: pedido,
    });
  };

  mostrarListaPedidos = (pedido, index) => {
    this.setState({
      mostrarPedido: true,
      index_actual: index,
      pedido: pedido,
    });
  };

  /**
   *
   * Pedido Semi Completo
   */

  mostrarListaDireccionSemi = (pedido, index) => {
    this.setState({
      mostrarDireSemi: true,
      index_actual: index,
      pedido: pedido,
    });
  };

  mostrarListaPedidosSemi = (pedido, index) => {
    this.setState({
      mostrarPedidoSemi: true,
      index_actual: index,
      pedido: pedido,
    });
  };

  /**
   *
   * Solo Pedido
   */

  mostrarListaSoloPedidos = (pedido, index) => {
    this.setState({
      mostrarSoloPedido: true,
      index_actual: index,
      pedido: pedido,
    });
  };

  mostrarDirecciones = () => {
    return (
      <div className="static-modal">
        <Modal.Dialog style={{ marginTop: "150px" }}>
          <Modal.Header>
            <Modal.Title>Modificar Dirección</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input
              style={{ width: "250px" }}
              ref={this.direccionNuevaRef}
              defaultValue={this.state.pedido.datos_direccion.Adress}
              type="text"
              className="form-control"
              required
            />
            <label>Piso</label>
            <input
              style={{ width: "250px" }}
              ref={this.pisoNuevoRef}
              defaultValue={this.state.pedido.datos_direccion.Floor}
              type="text"
              className="form-control"
              required
            />
            <label>Dpto</label>
            <input
              style={{ width: "250px" }}
              ref={this.dptoNuevoRef}
              defaultValue={this.state.pedido.datos_direccion.Department}
              type="text"
              className="form-control"
              required
            />
            <label>Código Postal</label>
            <input
              style={{ width: "250px" }}
              ref={this.cpNuevoRef}
              defaultValue={this.state.pedido.datos_direccion.Cp}
              type="text"
              className="form-control"
              required
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() =>
                this.setState({
                  mostrarDire: false,
                })
              }
            >
              Cerrar
            </Button>
            <button
              style={{ marginTop: "10px" }}
              className="btn btn-primary"
              variant="primary"
              // onClick={ () => console.log(this.descripcionRef.current.value)}
              onClick={() =>
                this.modificarDire(
                  this.state.pedido.datos_direccion,
                  this.direccionNuevaRef.current.value,
                  this.pisoNuevoRef.current.value,
                  this.dptoNuevoRef.current.value,
                  this.cpNuevoRef.current.value,
                  this.state.index_actual
                )
              }
            >
              Confirmar
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };

  mostrarPedidos = () => {
    // console.log(this.state.arrayEstados.filter(estado => (this.state.pedido.pedido.State == estado.id))[0].Description)
    return (
      <div className="static-modal">
        <Modal.Dialog style={{ marginTop: "150px" }}>
          <Modal.Header>
            <Modal.Title>Modificar Estado Pedido</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="form-group">
              <label>Estado</label>
              <select
                style={{ width: "200px" }}
                ref={this.estadoRef}
                className="form-control"
              >
                <option value={this.state.pedido.pedido.State}>
                  {
                    this.state.arrayEstados.filter(
                      (estado) => this.state.pedido.pedido.State == estado.id
                    )[0].Description
                  }
                </option>
                {this.state.arrayEstados.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.Description}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() =>
                this.setState({
                  mostrarPedido: false,
                })
              }
            >
              Cerrar
            </Button>
            <button
              style={{ marginTop: "10px" }}
              className="btn btn-primary"
              variant="primary"
              // onClick={ () => console.log(this.descripcionRef.current.value)}
              onClick={() =>
                this.modificarPedido(
                  this.state.pedido.pedido,
                  this.estadoRef.current.value,
                  this.state.index_actual
                )
              }
            >
              Confirmar
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };

  goBack() {
    window.history.back();
  }

  modificarDire = (
    direccion_vieja,
    direccion_nueva,
    piso_nuevo,
    dpto_nuevo,
    cp_nuevo,
    index
  ) => {
    direccion_vieja.Adress = direccion_nueva;
    direccion_vieja.Floor = piso_nuevo;
    direccion_vieja.Department = dpto_nuevo;
    direccion_vieja.Cp = cp_nuevo;

    if (direccion_vieja.Floor == "") {
      delete direccion_vieja.Floor;
    }
    if (direccion_vieja.Department == "") {
      delete direccion_vieja.Department;
    }
    if (direccion_vieja.Cp == "") {
      delete direccion_vieja.Cp;
    }

    // console.log(cp_nuevo)
    // console.log(direccion_vieja.Cp)

    if (cp_nuevo == "") {
      Swal.fire({
        title: "Error!",
        text: "El domicilio debe contener un Código Postal",
        type: "error",
        confirmButtonText: "Aceptar",
      });
    } else if (direccion_nueva == "") {
      Swal.fire({
        title: "Error!",
        text: "El domicilio debe contener una Dirección",
        type: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      let array_pedido_completo = JSON.parse(
        localStorage.getItem("pedidoCompleto")
      );

      //Dice direccion vieja, pero en realidad es la nueva
      array_pedido_completo[index].datos_direccion = direccion_vieja;

      localStorage.setItem(
        "pedidoCompleto",
        JSON.stringify(array_pedido_completo)
      );

      Swal.fire({
        title: "Correcto!",
        text: "Se ha modificado una dirección",
        type: "success",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        this.setState({
          mostrarDire: false,
        });
      });
    }
  };

  modificarPedido = (pedido_viejo, estado_actual, index) => {
    pedido_viejo.State = parseInt(estado_actual);

    let array_pedido_estado_completo = JSON.parse(
      localStorage.getItem("pedidoCompleto")
    );

    //Dice direccion vieja, pero en realidad es la nueva
    array_pedido_estado_completo[index].pedido = pedido_viejo;

    // console.log(array_pedido_estado_completo)

    localStorage.setItem(
      "pedidoCompleto",
      JSON.stringify(array_pedido_estado_completo)
    );

    Swal.fire({
      title: "Correcto!",
      text: "Se ha modificado un pedido",
      type: "success",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      this.setState({
        mostrarPedido: false,
      });
    });
  };

  mostrarDireccionesSemi = () => {
    return (
      <div className="static-modal">
        <Modal.Dialog style={{ marginTop: "150px" }}>
          <Modal.Header>
            <Modal.Title>Modificar Dirección</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <input
              style={{ width: "250px" }}
              ref={this.direccionNuevaRef}
              defaultValue={this.state.pedido.datos_direccion.Adress}
              type="text"
              className="form-control"
              required
            />
            <label>Piso</label>
            <input
              style={{ width: "250px" }}
              ref={this.pisoNuevoRef}
              defaultValue={this.state.pedido.datos_direccion.Floor}
              type="text"
              className="form-control"
              required
            />
            <label>Dpto</label>
            <input
              style={{ width: "250px" }}
              ref={this.dptoNuevoRef}
              defaultValue={this.state.pedido.datos_direccion.Department}
              type="text"
              className="form-control"
              required
            />
            <label>Código Postal</label>
            <input
              style={{ width: "250px" }}
              ref={this.cpNuevoRef}
              defaultValue={this.state.pedido.datos_direccion.Cp}
              type="text"
              className="form-control"
              required
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() =>
                this.setState({
                  mostrarDireSemi: false,
                })
              }
            >
              Cerrar
            </Button>
            <button
              style={{ marginTop: "10px" }}
              className="btn btn-primary"
              variant="primary"
              // onClick={ () => console.log(this.descripcionRef.current.value)}
              onClick={() =>
                this.modificarDireSemi(
                  this.state.pedido.datos_direccion,
                  this.direccionNuevaRef.current.value,
                  this.pisoNuevoRef.current.value,
                  this.dptoNuevoRef.current.value,
                  this.cpNuevoRef.current.value,
                  this.state.index_actual
                )
              }
            >
              Confirmar
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };

  mostrarPedidosSemi = () => {
    // console.log(this.state.arrayEstados.filter(estado => (this.state.pedido.pedido.State == estado.id))[0].Description)
    return (
      <div className="static-modal">
        <Modal.Dialog style={{ marginTop: "150px" }}>
          <Modal.Header>
            <Modal.Title>Modificar Estado Pedido</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="form-group">
              <label>Estado</label>
              <select
                style={{ width: "200px" }}
                ref={this.estadoRef}
                className="form-control"
              >
                <option value={this.state.pedido.pedido.State}>
                  {
                    this.state.arrayEstados.filter(
                      (estado) => this.state.pedido.pedido.State == estado.id
                    )[0].Description
                  }
                </option>
                {this.state.arrayEstados.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.Description}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() =>
                this.setState({
                  mostrarPedidoSemi: false,
                })
              }
            >
              Cerrar
            </Button>
            <button
              style={{ marginTop: "10px" }}
              className="btn btn-primary"
              variant="primary"
              // onClick={ () => console.log(this.descripcionRef.current.value)}
              onClick={() =>
                this.modificarPedidoSemi(
                  this.state.pedido.pedido,
                  this.estadoRef.current.value,
                  this.state.index_actual
                )
              }
            >
              Confirmar
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };

  modificarDireSemi = (
    direccion_vieja,
    direccion_nueva,
    piso_nuevo,
    dpto_nuevo,
    cp_nuevo,
    index
  ) => {
    direccion_vieja.Adress = direccion_nueva;
    direccion_vieja.Floor = piso_nuevo;
    direccion_vieja.Department = dpto_nuevo;
    direccion_vieja.Cp = cp_nuevo;

    if (direccion_vieja.Floor == "") {
      delete direccion_vieja.Floor;
    }
    if (direccion_vieja.Department == "") {
      delete direccion_vieja.Department;
    }
    if (direccion_vieja.Cp == "") {
      delete direccion_vieja.Cp;
    }

    if (cp_nuevo == "") {
      Swal.fire({
        title: "Error!",
        text: "El domicilio debe contener un Código Postal",
        type: "error",
        confirmButtonText: "Aceptar",
      });
    } else if (direccion_nueva == "") {
      Swal.fire({
        title: "Error!",
        text: "El domicilio debe contener una Dirección",
        type: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      let array_pedido_completo = JSON.parse(
        localStorage.getItem("pedidoSemiCompleto")
      );

      // console.log(direccion_vieja)

      //Dice direccion vieja, pero en realidad es la nueva
      array_pedido_completo[index].datos_direccion = direccion_vieja;

      localStorage.setItem(
        "pedidoSemiCompleto",
        JSON.stringify(array_pedido_completo)
      );

      Swal.fire({
        title: "Correcto!",
        text: "Se ha modificado una dirección",
        type: "success",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        this.setState({
          mostrarDireSemi: false,
        });
      });
    }
  };

  modificarPedidoSemi = (pedido_viejo, estado_actual, index) => {
    pedido_viejo.State = parseInt(estado_actual);

    let array_pedido_estado_completo = JSON.parse(
      localStorage.getItem("pedidoSemiCompleto")
    );

    //Dice direccion vieja, pero en realidad es la nueva
    array_pedido_estado_completo[index].pedido = pedido_viejo;

    // console.log(array_pedido_estado_completo)

    localStorage.setItem(
      "pedidoSemiCompleto",
      JSON.stringify(array_pedido_estado_completo)
    );

    Swal.fire({
      title: "Correcto!",
      text: "Se ha modificado un pedido",
      type: "success",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      this.setState({
        mostrarPedidoSemi: false,
      });
    });
  };

  mostrarSoloPedidos = () => {
    // console.log(this.state)
    return (
      <div className="static-modal">
        <Modal.Dialog style={{ marginTop: "150px" }}>
          <Modal.Header>
            <Modal.Title>Modificar Estado Pedido</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="form-group">
              <label>Estado</label>
              <select
                style={{ width: "200px" }}
                ref={this.estadoRef}
                className="form-control"
              >
                <option value={this.state.pedido.state}>
                  {
                    this.state.arrayEstados.filter(
                      (estado) => this.state.pedido.state == estado.id
                    )[0].Description
                  }
                </option>
                {this.state.arrayEstados.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.Description}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{ marginTop: "10px" }}
              onClick={() =>
                this.setState({
                  mostrarSoloPedido: false,
                })
              }
            >
              Cerrar
            </Button>
            <button
              style={{ marginTop: "10px" }}
              className="btn btn-primary"
              variant="primary"
              // onClick={ () => console.log(this.descripcionRef.current.value)}
              onClick={() =>
                this.modificarSoloPedido(
                  this.state.pedido,
                  this.estadoRef.current.value,
                  this.state.index_actual
                )
              }
            >
              Confirmar
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };

  modificarSoloPedido = (pedido_viejo, estado_actual, index) => {
    pedido_viejo.state = parseInt(estado_actual);

    let array_solo_pedido_estado = JSON.parse(
      localStorage.getItem("enviarPedido")
    );

    //Dice direccion vieja, pero en realidad es la nueva
    array_solo_pedido_estado[index] = pedido_viejo;

    // console.log(array_solo_pedido_estado)

    localStorage.setItem(
      "enviarPedido",
      JSON.stringify(array_solo_pedido_estado)
    );

    Swal.fire({
      title: "Correcto!",
      text: "Se ha modificado un pedido",
      type: "success",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      this.setState({
        mostrarSoloPedido: false,
      });
    });
  };

  // pedidoEnviar = () => {

  //     return(
  //     this.enviarSolicitudesEncoladasCompletas()
  //     )
  //     // pedido.datos_direccion.Adress = "Una Nueva Direccion"

  //     // console.log(pedido)

  // }

  ToPedidos() {
    if (this.state.redirectPedidos) {
      return <Redirect to="/pedidos-encolados" />;
    }
  }

  eliminarPedidoStorage = (index) => {
    // alert(index)

    Swal.fire({
      title: "¿Estás seguro que desea eliminar?",
      text: "Estas a punto de eliminar un pedido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        let arrayPedidoCompleto = JSON.parse(
          localStorage.getItem("pedidoCompleto")
        );

        arrayPedidoCompleto.splice(index, 1);

        localStorage.setItem(
          "pedidoCompleto",
          JSON.stringify(arrayPedidoCompleto)
        );

        this.setState({
          redirectPedidos: true,
        });
      }
    });
  };

  eliminarPedidoSemiStorage = (index) => {
    // alert(index)
    Swal.fire({
      title: "¿Estás seguro que desea eliminar?",
      text: "Estas a punto de eliminar un pedido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        let arrayPedidoSemiCompleto = JSON.parse(
          localStorage.getItem("pedidoSemiCompleto")
        );

        arrayPedidoSemiCompleto.splice(index, 1);

        localStorage.setItem(
          "pedidoSemiCompleto",
          JSON.stringify(arrayPedidoSemiCompleto)
        );

        this.setState({
          redirectPedidos: true,
        });
      }
    });
  };

  eliminarSoloPedidoStorage = (index) => {
    // alert(index)

    Swal.fire({
      title: "¿Estás seguro que desea eliminar?",
      text: "Estas a punto de eliminar un pedido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        let arraySoloPedido = JSON.parse(localStorage.getItem("enviarPedido"));

        arraySoloPedido.splice(index, 1);

        localStorage.setItem("enviarPedido", JSON.stringify(arraySoloPedido));

        this.setState({
          redirectPedidos: true,
        });
      }
    });
  };

  eliminarEstadoPedidoStorage = (index) => {
    // alert(index)

    Swal.fire({
      title: "¿Estás seguro que desea eliminar?",
      text: "Estas a punto de eliminar un estado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        let arrayEstadoPedido = JSON.parse(
          localStorage.getItem("pedidoCambioEstado")
        );

        arrayEstadoPedido.splice(index, 1);

        localStorage.setItem(
          "pedidoCambioEstado",
          JSON.stringify(arrayEstadoPedido)
        );

        this.setState({
          redirectPedidos: true,
        });
      }
    });
  };

  ToHome() {
    if (this.state.redirectHome) {
      return <Redirect to="/pedidos" />;
    }
  }

  setRedirectToHome = () => {
    this.setState({
      redirectHome: true,
    });
  };

  render() {
    var direccion_pedido_completo;

    return (
      <React.Fragment>
        <Header titulo="Pedidos Encolados" />

        <div align="center">
          <h2 style={{ marginTop: "50px" }}>Pedidos Encolados</h2>
        </div>

        {JSON.parse(localStorage.getItem("pedidoCompleto")).length > 0 ? (
          JSON.parse(localStorage.getItem("pedidoCompleto")).map(
            (pedido, index) => (
              <div
                key={pedido.datos_cliente.Phone}
                style={{ marginTop: "30px", marginBottom: "50px" }}
              >
                <Col xs={12} md={12}>
                  <div align="center" className="form-group">
                    <label>
                      <h3>Datos Cliente</h3>
                    </label>
                    <h5>
                      <b>Nombre: </b> {pedido.datos_cliente.Name}{" "}
                      <b>Apellido: </b> {pedido.datos_cliente.LastName}{" "}
                      <b>Telefono: </b> {pedido.datos_cliente.Phone}
                    </h5>
                    <h3></h3>
                  </div>
                </Col>
                <Col align="center" xs={12} md={12}>
                  <div className="form-group">
                    <label>
                      <h3>Domicilio</h3>
                    </label>
                    <h5>
                      <b> Dirección: </b> {pedido.datos_direccion.Adress}{" "}
                      <b>Piso: </b> {pedido.datos_direccion.Floor || "Sin piso"}{" "}
                      <b>Dpto: </b>{" "}
                      {pedido.datos_direccion.Department || "Sin Dpto"}{" "}
                      <b>C. Postal: </b> {pedido.datos_direccion.Cp || "Sin CP"}
                    </h5>
                    <button
                      style={{ marginTop: "10px" }}
                      className="btn btn-primary"
                      variant="primary"
                      onClick={() => this.mostrarListaDireccion(pedido, index)}
                    >
                      Modificar Dirección
                    </button>
                    {this.state.mostrarDire == true
                      ? this.mostrarDirecciones()
                      : null}
                    {/* <input style={{width:"250px"}} ref={this.nombreRef} defaultValue={pedido.datos_direccion.Adress} type="text" className="form-control" required/> */}
                  </div>
                </Col>
                <Col align="center" xs={12} md={12}>
                  <div className="form-group">
                    <label>
                      <h3>Pedido</h3>
                    </label>
                    <h5>
                      <b>Fecha: </b> {pedido.pedido.Date} <b>Precio: </b>{" "}
                      {pedido.pedido.Amount || "Sin Monto"}
                      <b> Estado: </b>
                      {JSON.parse(localStorage.getItem("estados")).length > 0
                        ? JSON.parse(localStorage.getItem("estados")).filter(
                            (estado) => pedido.pedido.State == estado.id
                          )[0].Description
                        : " -Estado no reconocido"}
                      <b> Combo: </b>
                      {JSON.parse(localStorage.getItem("combos")).length > 0
                        ? pedido.pedido.CombosPorPedido.map(
                            (combo_a_encontrar) => (
                              console.log(combo_a_encontrar),
                              JSON.parse(localStorage.getItem("combos")).filter(
                                (combo) => combo_a_encontrar.Offer == combo.id
                              ).length > 0
                                ? `  ${combo_a_encontrar.Count} -` +
                                  JSON.parse(
                                    localStorage.getItem("combos")
                                  ).filter(
                                    (combo) =>
                                      combo_a_encontrar.Offer == combo.id
                                  )[0].Name
                                : " -Combo no reconocido"
                            )
                          )
                        : " -Combo no reconocido"}
                      <b> Productos: </b>
                      {JSON.parse(localStorage.getItem("combos")).length > 0
                        ? pedido.pedido.ProductosPorPedido.map(
                            (producto_a_encontrar) =>
                              JSON.parse(
                                localStorage.getItem("productos")
                              ).filter(
                                (producto) =>
                                  producto_a_encontrar.Product == producto.id
                              ).length > 0
                                ? `  ${producto_a_encontrar.Count} -` +
                                  JSON.parse(
                                    localStorage.getItem("productos")
                                  ).filter(
                                    (producto) =>
                                      producto_a_encontrar.Product ==
                                      producto.id
                                  )[0].Description
                                : " -Productos no reconocido"
                          )
                        : " -Productos no reconocido"}
                    </h5>
                    <button
                      style={{ marginTop: "10px" }}
                      className="btn btn-primary"
                      variant="primary"
                      onClick={() => this.mostrarListaPedidos(pedido, index)}
                    >
                      Modificar Estado
                    </button>
                    {this.state.mostrarPedido == true
                      ? this.mostrarPedidos()
                      : null}
                  </div>
                </Col>
                <div align="center">
                  <button
                    onClick={() => this.eliminarPedidoStorage(index)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Borrar
                  </button>
                </div>
                <hr style={{ width: "700px" }}></hr>
              </div>
            )
          )
        ) : (
          <div align="center" className="form-group">
            {/* <h3 style={{marginTop:'20px'}}>No hay datos</h3> */}
          </div>
        )}

        {/* <hr></hr> */}

        {/* <div align="center">
            <h2 style={{marginTop:"50px"}}>Pedidos Con Cliente Existente</h2>
            </div> */}

        {JSON.parse(localStorage.getItem("pedidoSemiCompleto")).length > 0 ? (
          JSON.parse(localStorage.getItem("pedidoSemiCompleto")).map(
            (pedido, index) => (
              // console.log(
              //     JSON.parse(localStorage.getItem('clientes')).filter(cliente => (pedido.datos_direccion.Client == cliente.id))[0]
              // ),

              <div
                key={pedido.datos_direccion.Adress}
                style={{ marginTop: "30px", marginBottom: "50px" }}
              >
                <Col xs={12} md={12}>
                  <div align="center" className="form-group">
                    <label>
                      <h3>Datos Cliente</h3>
                    </label>
                    {JSON.parse(localStorage.getItem("clientes")).filter(
                      (cliente) => pedido.datos_direccion.Client == cliente.id
                    ).length > 0 ? (
                      <h5>
                        <b>Nombre: </b>{" "}
                        {
                          JSON.parse(localStorage.getItem("clientes")).filter(
                            (cliente) =>
                              pedido.datos_direccion.Client == cliente.id
                          )[0].Name
                        }
                        <b> Apellido: </b>{" "}
                        {
                          JSON.parse(localStorage.getItem("clientes")).filter(
                            (cliente) =>
                              pedido.datos_direccion.Client == cliente.id
                          )[0].LastName
                        }
                        <b> Teléfono: </b>{" "}
                        {
                          JSON.parse(localStorage.getItem("clientes")).filter(
                            (cliente) =>
                              pedido.datos_direccion.Client == cliente.id
                          )[0].Phone
                        }
                      </h5>
                    ) : (
                      <h5>
                        <b>Nombre: </b> Sin Datos
                        <b> Apellido: </b> Sin Datos
                        <b> Teléfono: </b> Sin Datos
                      </h5>
                    )}
                  </div>
                </Col>
                <Col align="center" xs={12} md={12}>
                  <div className="form-group">
                    <label>
                      <h3>Domicilio</h3>
                    </label>
                    <h5>
                      <b> Dirección: </b> {pedido.datos_direccion.Adress}{" "}
                      <b>Piso: </b> {pedido.datos_direccion.Floor || "Sin piso"}{" "}
                      <b>Dpto: </b>{" "}
                      {pedido.datos_direccion.Department || "Sin Dpto"}{" "}
                      <b>C. Postal: </b> {pedido.datos_direccion.Cp || "Sin CP"}
                    </h5>
                    <button
                      style={{ marginTop: "10px" }}
                      className="btn btn-primary"
                      variant="primary"
                      onClick={() =>
                        this.mostrarListaDireccionSemi(pedido, index)
                      }
                    >
                      Modificar Dirección
                    </button>
                    {this.state.mostrarDireSemi == true
                      ? this.mostrarDireccionesSemi()
                      : null}
                    {/* <input style={{width:"250px"}} ref={this.nombreRef} defaultValue={pedido.datos_direccion.Adress} type="text" className="form-control" required/> */}
                  </div>
                </Col>
                <Col align="center" xs={12} md={12}>
                  <div className="form-group">
                    <label>
                      <h3>Pedido</h3>
                    </label>
                    <h5>
                      <b>Fecha: </b> {pedido.pedido.Date} <b>Precio: </b>{" "}
                      {pedido.pedido.Amount || "Sin Monto"}
                      <b> Estado: </b>
                      {JSON.parse(localStorage.getItem("estados")).length > 0
                        ? JSON.parse(localStorage.getItem("estados")).filter(
                            (estado) => pedido.pedido.State == estado.id
                          )[0].Description
                        : " -Estado no reconocido"}
                      <b> Combo: </b>
                      {JSON.parse(localStorage.getItem("combos")).length > 0
                        ? pedido.pedido.CombosPorPedido.map(
                            (combo_a_encontrar) =>
                              JSON.parse(localStorage.getItem("combos")).filter(
                                (combo) => combo_a_encontrar.Offer == combo.id
                              ).length > 0
                                ? `  ${combo_a_encontrar.Count} -` +
                                  JSON.parse(
                                    localStorage.getItem("combos")
                                  ).filter(
                                    (combo) =>
                                      combo_a_encontrar.Offer == combo.id
                                  )[0].Name
                                : " -Combo no reconocido"
                          )
                        : " -Combo no reconocido"}
                      <b> Productos: </b>
                      {JSON.parse(localStorage.getItem("combos")).length > 0
                        ? pedido.pedido.ProductosPorPedido.map(
                            (producto_a_encontrar) =>
                              JSON.parse(
                                localStorage.getItem("productos")
                              ).filter(
                                (producto) =>
                                  producto_a_encontrar.Product == producto.id
                              ).length > 0
                                ? `  ${producto_a_encontrar.Count} -` +
                                  JSON.parse(
                                    localStorage.getItem("productos")
                                  ).filter(
                                    (producto) =>
                                      producto_a_encontrar.Product ==
                                      producto.id
                                  )[0].Description
                                : " -Productos no reconocido"
                          )
                        : " -Productos no reconocido"}
                    </h5>

                    <button
                      style={{ marginTop: "10px" }}
                      className="btn btn-primary"
                      variant="primary"
                      onClick={() =>
                        this.mostrarListaPedidosSemi(pedido, index)
                      }
                    >
                      Modificar Estado
                    </button>
                    {this.state.mostrarPedidoSemi == true
                      ? this.mostrarPedidosSemi()
                      : null}
                  </div>
                </Col>
                <div align="center">
                  <button
                    onClick={() => this.eliminarPedidoSemiStorage(index)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Borrar
                  </button>
                </div>
                <hr style={{ width: "700px" }}></hr>
              </div>
            )
          )
        ) : (
          <div align="center" className="form-group">
            {/* <h3 style={{marginTop:'20px'}}>No hay datos</h3> */}
          </div>
        )}

        {/* <hr></hr> */}

        {/* <div align="center">
            <h2 style={{marginTop:"50px"}}>Solo Pedidos</h2>
            </div> */}

        {JSON.parse(localStorage.getItem("enviarPedido")).length > 0 ? (
          JSON.parse(localStorage.getItem("enviarPedido")).map(
            (pedido, index) => (
              // console.log(pedido),

              <div
                key={pedido.amount}
                style={{ marginTop: "30px", marginBottom: "50px" }}
              >
                <Col xs={12} md={12}>
                  <div align="center" className="form-group">
                    <label>
                      <h3>Datos Cliente</h3>
                    </label>
                    {JSON.parse(localStorage.getItem("clientes")).filter(
                      (cliente) => pedido.client == cliente.id
                    ).length > 0 ? (
                      <h5>
                        <b>Nombre: </b>{" "}
                        {
                          JSON.parse(localStorage.getItem("clientes")).filter(
                            (cliente) => pedido.client == cliente.id
                          )[0].Name
                        }
                        <b> Apellido: </b>{" "}
                        {
                          JSON.parse(localStorage.getItem("clientes")).filter(
                            (cliente) => pedido.client == cliente.id
                          )[0].LastName
                        }
                        <b> Teléfono: </b>{" "}
                        {
                          JSON.parse(localStorage.getItem("clientes")).filter(
                            (cliente) => pedido.client == cliente.id
                          )[0].Phone
                        }
                      </h5>
                    ) : (
                      <h5>
                        <b>Nombre: </b> Sin Datos
                        <b> Apellido: </b> Sin Datos
                        <b> Teléfono: </b> Sin Datos
                      </h5>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={12}>
                  <div align="center" className="form-group">
                    <label>
                      <h3>Domicilio</h3>
                    </label>
                    {/* {console.log(JSON.parse(localStorage.getItem('clientes')).filter(cliente => (pedido.client == cliente.id))[0])} */}
                    {JSON.parse(localStorage.getItem("clientes")).filter(
                      (cliente) => pedido.client == cliente.id
                    ).length > 0 ? (
                      <h5>
                        <b> Dirección: </b>{" "}
                        {
                          JSON.parse(localStorage.getItem("clientes"))
                            .filter((cliente) => pedido.client == cliente.id)[0]
                            .Adress.filter(
                              (direccion) => pedido.address == direccion.id
                            )[0].Adress
                        }
                        <b> Piso: </b>{" "}
                        {JSON.parse(localStorage.getItem("clientes"))
                          .filter((cliente) => pedido.client == cliente.id)[0]
                          .Adress.filter(
                            (direccion) => pedido.address == direccion.id
                          )[0].Floor || "Sin piso"}
                        <b> Dpto: </b>{" "}
                        {JSON.parse(localStorage.getItem("clientes"))
                          .filter((cliente) => pedido.client == cliente.id)[0]
                          .Adress.filter(
                            (direccion) => pedido.address == direccion.id
                          )[0].Department || "Sin Dpto"}
                        <b> C. Postal: </b>{" "}
                        {JSON.parse(localStorage.getItem("clientes"))
                          .filter((cliente) => pedido.client == cliente.id)[0]
                          .Adress.filter(
                            (direccion) => pedido.address == direccion.id
                          )[0].Cp || "Sin CP"}
                      </h5>
                    ) : (
                      <h5>
                        <b>Dirección: </b> Sin Datos
                        <b> Piso: </b> Sin Datos
                        <b> Dpto: </b> Sin Datos
                        <b> C. Postal: </b>Sin Datos
                      </h5>
                    )}
                  </div>
                </Col>
                <Col align="center" xs={12} md={12}>
                  <div className="form-group">
                    <label>
                      <h3>Pedido</h3>
                    </label>
                    <h5>
                      <b>Fecha: </b> {pedido.date} <b>Precio: </b>{" "}
                      {pedido.amount || "Sin Monto"}
                      <b> Estado: </b>
                      {JSON.parse(localStorage.getItem("estados")).length > 0
                        ? JSON.parse(localStorage.getItem("estados")).filter(
                            (estado) => pedido.state == estado.id
                          )[0].Description
                        : " -Estado no reconocido"}
                      <b> Combo: </b>
                      {JSON.parse(localStorage.getItem("combos")).length > 0
                        ? pedido.combo.map((combo_a_encontrar) =>
                            JSON.parse(localStorage.getItem("combos")).filter(
                              (combo) => combo_a_encontrar.Offer == combo.id
                            ).length > 0
                              ? `  ${combo_a_encontrar.Count} -` +
                                JSON.parse(
                                  localStorage.getItem("combos")
                                ).filter(
                                  (combo) => combo_a_encontrar.Offer == combo.id
                                )[0].Name
                              : " -Combo no reconocido"
                          )
                        : " -Combo no reconocido"}
                      <b> Productos: </b>
                      {JSON.parse(localStorage.getItem("combos")).length > 0
                        ? pedido.product.map((producto_a_encontrar) =>
                            JSON.parse(
                              localStorage.getItem("productos")
                            ).filter(
                              (producto) =>
                                producto_a_encontrar.Product == producto.id
                            ).length > 0
                              ? `  ${producto_a_encontrar.Count} -` +
                                JSON.parse(
                                  localStorage.getItem("productos")
                                ).filter(
                                  (producto) =>
                                    producto_a_encontrar.Product == producto.id
                                )[0].Description
                              : " -Productos no reconocido"
                          )
                        : " -Productos no reconocido"}
                    </h5>

                    <button
                      style={{ marginTop: "10px" }}
                      className="btn btn-primary"
                      variant="primary"
                      onClick={() =>
                        this.mostrarListaSoloPedidos(pedido, index)
                      }
                    >
                      Modificar Estado
                    </button>
                    {this.state.mostrarSoloPedido == true
                      ? this.mostrarSoloPedidos()
                      : null}
                  </div>
                </Col>
                <div align="center">
                  <button
                    onClick={() => this.eliminarSoloPedidoStorage(index)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Borrar
                  </button>
                </div>
                <hr style={{ width: "700px" }}></hr>
              </div>
            )
          )
        ) : (
          <div align="center" className="form-group">
            {/* <h3 style={{marginTop:'20px'}}>No hay datos</h3> */}
          </div>
        )}

        {/* <hr></hr> */}

        {/* <div align="center">
            <h2 style={{marginTop:"50px"}}>Cambio de Estado de Pedidos</h2>
            </div> */}

        {JSON.parse(localStorage.getItem("pedidoCambioEstado")).length > 0 ? (
          JSON.parse(localStorage.getItem("pedidoCambioEstado")).map(
            (pedido, index) => (
              // console.log(pedido),

              <div
                key={pedido.id_pedido}
                style={{ marginTop: "30px", marginBottom: "50px" }}
              >
                <Col xs={12} md={12}>
                  <div align="center" className="form-group">
                    <label>
                      <h3>Identificador del Pedido</h3>
                    </label>
                    <h5>
                      <b>Pedido Número: </b> {pedido.id_pedido}
                    </h5>
                  </div>
                </Col>
                <Col xs={12} md={12}>
                  <div align="center" className="form-group">
                    <label>
                      <h3>Estado</h3>
                    </label>
                    <h5>
                      <b>Estado Actual: </b>
                      {JSON.parse(localStorage.getItem("estados")).length > 0
                        ? JSON.parse(localStorage.getItem("estados")).filter(
                            (estado) => pedido.estado == estado.id
                          )[0].Description
                        : " -Estado no reconocido"}
                    </h5>
                    {/* {JSON.parse(localStorage.getItem('estados')).filter( estado => (pedido.state == estado.id))[0].Description}  */}
                  </div>
                </Col>
                <div align="center">
                  <button
                    onClick={() => this.eliminarEstadoPedidoStorage(index)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Borrar
                  </button>
                  {/* <button onClick={this.setRedirectToHome} type="button" style={{marginLeft: "20px"}} className="btn btn-primary">Ver Pedido</button> */}
                  {/* <button style={{marginLeft: 20, width: 80}} onClick={this.setRedirectToHome} type="button" className="btn btn-danger">Cancelar</button> */}
                  {this.ToHome()}
                </div>
                <hr style={{ width: "700px" }}></hr>
              </div>
            )
          )
        ) : (
          <div align="center" className="form-group">
            {/* <h3 style={{marginTop:'20px'}}>No hay datos</h3> */}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default mostrarPedidosOffline;

import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import * as actions from "../../actions";

import { currentUser } from "../../actions/usuarioAction";
import { connect } from "react-redux";
//CSS
import Swal from "sweetalert2";

class EnviarPedidosOff extends Component {
  constructor(props, context) {
    super(props, context);
    const { classes } = props;
    this.state = {
      profile: false,
      redirectLogOut: false,
      redirectHome: false,
      redirectChangePassword: false,
      redirectSection: false,
      redirectUrlSection: "",
    };
  }

  componentDidMount() {
    this.props.currentUser();
  }

  enviarSolicitudesEncoladasCompletas = async () => {
    this.setState({ profile: false });

    Swal.fire({
      title: "Se esta procesando las solicitudes",
      text: "Aguarde por favor",
      type: "success",
      showConfirmButton: false,
    });

    let arrayEstadoPedido = JSON.parse(
      localStorage.getItem("pedidoCambioEstado")
    );
    let count_estado_pedido = JSON.parse(
      localStorage.getItem("pedidoCambioEstado")
    );

    for (let i = 0; i < count_estado_pedido.length; i++) {
      let data = {
        State: {
          id: JSON.parse(localStorage.getItem("pedidoCambioEstado"))[0].estado,
        },
        Pedido: {
          id: JSON.parse(localStorage.getItem("pedidoCambioEstado"))[0]
            .id_pedido,
        },
      };

      await axios
        .post(`${process.env.REACT_APP_SERVER}/Pedido/ChangeState`, data, {
          headers: { "access-token": localStorage.getItem("access-token") },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Correcto!",
              text: "Se ha modificado un estado del pedido",
              type: "success",
              confirmButtonText: "Confirmar",
            });

            arrayEstadoPedido.shift();
            localStorage.setItem(
              "pedidoCambioEstado",
              JSON.stringify(arrayEstadoPedido)
            );
          } else {
            Swal.fire({
              title: "Error!",
              text: "Se ha producido un error al intentar modificar un pedido",
              type: "error",
              confirmButtonText: "Aceptar",
            });
            return;
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: "El Servidor no ha respondido al cambio de estado",
            type: "error",
            confirmButtonText: "Aceptar",
          });
          return;
        });
    }

    /**
     *
     * Solo pedidos
     *
     */

    let arrayPedido = JSON.parse(localStorage.getItem("enviarPedido"));
    let count_pedido_individual = JSON.parse(
      localStorage.getItem("enviarPedido")
    );

    for (let i = 0; i < count_pedido_individual.length; i++) {
      let data = {
        Date: arrayPedido[0].date,
        Users: arrayPedido[0].user,
        Amount: arrayPedido[0].amount,
        State: arrayPedido[0].state,
        Clients: arrayPedido[0].client,
        CombosPorPedido: arrayPedido[0].combo,
        ProductosPorPedido: arrayPedido[0].product,
        Adress: arrayPedido[0].address,
        Observaciones: arrayPedido[0].observacion,
      };

      // console.log(data);

      await axios
        .post(`${process.env.REACT_APP_SERVER}/Pedido/Create`, data, {
          headers: { "access-token": localStorage.getItem("access-token") },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Correcto!",
              text: "Se ha creado una nuevo pedido",
              type: "success",
              // confirmButtonText: 'Confirmar'
            });

            arrayPedido.shift();
            localStorage.setItem("enviarPedido", JSON.stringify(arrayPedido));
          } else {
            Swal.fire({
              title: "Error!",
              text: "Se ha producido un error al intentar crear el pedido",
              type: "error",
              confirmButtonText: "Aceptar",
            });
            return;
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            text: "El Servidor no ha respondido al alta de pedido",
            type: "error",
            confirmButtonText: "Aceptar",
          });
          setTimeout(function () {
            window.location.reload();
          }, 3500);
          return;
        });
    }

    /**
     *
     * Pedido SemiCompleto
     *
     */

    this.state = {
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      query: "",
      locationId: "",
      isChecked: false,
      coords: {},
      lat: "",
      lon: "",
    };

    let params = {
      app_id: "N0fRlxF32W9uEEuH5ZSv",
      app_code: "0eDtrgamyvY1fxPeA8m0OQ",
    };

    let data_dire_semi;
    let data_pedido_semi;

    const self = this;

    let arrayPedidoSemiCompleto = JSON.parse(
      localStorage.getItem("pedidoSemiCompleto")
    );
    let count_pedido_semi_completo = JSON.parse(
      localStorage.getItem("pedidoSemiCompleto")
    );

    for (let i = 0; i < count_pedido_semi_completo.length; i++) {
      await axios
        .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
          params: {
            app_id: "N0fRlxF32W9uEEuH5ZSv",
            app_code: "0eDtrgamyvY1fxPeA8m0OQ",
            query: JSON.parse(localStorage.getItem("pedidoSemiCompleto"))[0]
              .datos_direccion.Adress,
            maxresults: 1,
          },
        })
        .then(async function (response) {
          if (response.data.suggestions.length > 0) {
            const id = response.data.suggestions[0].locationId;
            const address = response.data.suggestions[0].address;

            self.setState({
              address: address,
              query: JSON.parse(localStorage.getItem("pedidoSemiCompleto"))[0]
                .datos_direccion.Adress,
              locationId: id,
            });

            if (self.state.locationId.length > 0) {
              params["locationId"] = self.state.locationId;
            } else {
              params["searchtext"] =
                self.state.address.street +
                self.state.address.city +
                self.state.address.state +
                self.state.address.postalCode +
                self.state.address.country;
            }

            await axios
              .get("https://geocoder.api.here.com/6.2/geocode.json", {
                params: params,
              })
              .then(async function (response) {
                const view = response.data.Response.View;
                if (view.length > 0 && view[0].Result.length > 0) {
                  const location = view[0].Result[0].Location;

                  self.state.lat = location.DisplayPosition.Latitude;
                  self.state.lon = location.DisplayPosition.Longitude;
                } else {
                  self.setState({
                    coords: null,
                  });
                }

                if (self.state.lat === null || self.state.lon === null) {
                  return await axios
                    .post(
                      `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                      (data_dire_semi = {
                        Address: {
                          Adress: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Adress,
                          Department: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Department,
                          Floor: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Floor,
                          Cp: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Cp,
                          LatLong: "latlong",
                          Client: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Client,
                        },
                      }),
                      {
                        headers: {
                          "access-token": localStorage.getItem("access-token"),
                        },
                      }
                    )
                    .then(async (res_dire) => {
                      if (res_dire.status === 200) {
                        /**
                         * Pedido
                         */

                        await axios
                          .post(
                            `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                            (data_pedido_semi = {
                              Date: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.Date,
                              Users: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.Users,
                              Amount: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.Amount,
                              State: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.State,
                              Clients: res_dire.data.Client,
                              CombosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.CombosPorPedido,
                              ProductosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.ProductosPorPedido,
                              Adress: res_dire.data.id,
                              Observaciones: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.observacion,
                            }),
                            {
                              headers: {
                                "access-token": localStorage.getItem(
                                  "access-token"
                                ),
                              },
                            }
                          )
                          .then((res) => {
                            if (res.status === 200) {
                              arrayPedidoSemiCompleto.shift();

                              localStorage.setItem(
                                "pedidoSemiCompleto",
                                JSON.stringify(arrayPedidoSemiCompleto)
                              );

                              Swal.fire(
                                "Advertencia!",
                                "Se ha creado una nueva Direccion y Pedido sin Validar",
                                "warning"
                              );
                              // setTimeout(function(){
                              //     window.location.reload();
                              // }, 3500);
                            } else {
                              Swal.fire({
                                title: "Error!",
                                text:
                                  "Se ha producido un error al intentar crear el Pedido",
                                type: "error",
                                confirmButtonText: "Aceptar",
                              });
                              return;
                            }
                          })
                          .catch((err) => {
                            Swal.fire({
                              title: "Error!",
                              text:
                                "El Servidor no ha respondido al alta de Pedido",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          });
                      } else {
                        Swal.fire({
                          title: "Error!",
                          text:
                            "Se ha producido un error al intentar crear la direccion",
                          type: "error",
                          confirmButtonText: "Aceptar",
                        });
                        return;
                      }
                    })
                    .catch((err) => {
                      Swal.fire({
                        title: "Error!",
                        text:
                          "El Servidor no ha respondido al alta de la direccion",
                        type: "error",
                        confirmButtonText: "Aceptar",
                      });
                      return;
                    });
                } else {
                  let coords = self.state.lat + ";" + self.state.lon;

                  return await axios
                    .post(
                      `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                      (data_dire_semi = {
                        Address: {
                          Adress: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Adress,
                          Department: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Department,
                          Floor: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Floor,
                          Cp: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Cp,
                          LatLong: coords,
                          Client: JSON.parse(
                            localStorage.getItem("pedidoSemiCompleto")
                          )[0].datos_direccion.Client,
                          Validado: true,
                        },
                      }),
                      {
                        headers: {
                          "access-token": localStorage.getItem("access-token"),
                        },
                      }
                    )
                    .then(async (res_dire) => {
                      if (res_dire.status === 200) {
                        /**
                         * Pedido
                         */

                        await axios
                          .post(
                            `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                            (data_pedido_semi = {
                              Date: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.Date,
                              Users: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.Users,
                              Amount: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.Amount,
                              State: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.State,
                              Clients: res_dire.data.Client,
                              CombosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.CombosPorPedido,
                              ProductosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.ProductosPorPedido,
                              Adress: res_dire.data.id,
                              Observaciones: JSON.parse(
                                localStorage.getItem("pedidoSemiCompleto")
                              )[0].pedido.observacion,
                            }),
                            {
                              headers: {
                                "access-token": localStorage.getItem(
                                  "access-token"
                                ),
                              },
                            }
                          )
                          .then((res) => {
                            if (res.status === 200) {
                              arrayPedidoSemiCompleto.shift();

                              localStorage.setItem(
                                "pedidoSemiCompleto",
                                JSON.stringify(arrayPedidoSemiCompleto)
                              );

                              Swal.fire(
                                "Correcto!",
                                "Se ha creado una nueva Direccion y Pedido",
                                "success"
                              );
                            } else {
                              Swal.fire({
                                title: "Error!",
                                text:
                                  "Se ha producido un error al intentar crear el Pedido",
                                type: "error",
                                confirmButtonText: "Aceptar",
                              });
                              return;
                            }
                          })
                          .catch((err) => {
                            Swal.fire({
                              title: "Error!",
                              text:
                                "El Servidor no ha respondido al alta de Pedido",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          });
                      } else {
                        Swal.fire({
                          title: "Error!",
                          text:
                            "Se ha producido un error al intentar crear la direccion",
                          type: "error",
                          confirmButtonText: "Aceptar",
                        });
                        return;
                      }
                    })
                    .catch((err) => {
                      console.log(err);

                      Swal.fire({
                        title: "Error!",
                        text:
                          "El Servidor no ha respondido al alta de la direccion",
                        type: "error",
                        confirmButtonText: "Aceptar",
                      });
                      return;
                    });
                }
              })
              .catch(async function (error) {
                await axios
                  .post(
                    `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                    (data_dire_semi = {
                      Address: {
                        Adress: JSON.parse(
                          localStorage.getItem("pedidoSemiCompleto")
                        )[0].datos_direccion.Adress,
                        Department: JSON.parse(
                          localStorage.getItem("pedidoSemiCompleto")
                        )[0].datos_direccion.Department,
                        Floor: JSON.parse(
                          localStorage.getItem("pedidoSemiCompleto")
                        )[0].datos_direccion.Floor,
                        Cp: JSON.parse(
                          localStorage.getItem("pedidoSemiCompleto")
                        )[0].datos_direccion.Cp,
                        LatLong: "latlong",
                        Client: JSON.parse(
                          localStorage.getItem("pedidoSemiCompleto")
                        )[0].datos_direccion.Client,
                      },
                    }),
                    {
                      headers: {
                        "access-token": localStorage.getItem("access-token"),
                      },
                    }
                  )
                  .then(async (res_dire) => {
                    if (res_dire.status === 200) {
                      /**
                       * Pedido
                       */

                      await axios
                        .post(
                          `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                          (data_pedido_semi = {
                            Date: JSON.parse(
                              localStorage.getItem("pedidoSemiCompleto")
                            )[0].pedido.Date,
                            Users: JSON.parse(
                              localStorage.getItem("pedidoSemiCompleto")
                            )[0].pedido.Users,
                            Amount: JSON.parse(
                              localStorage.getItem("pedidoSemiCompleto")
                            )[0].pedido.Amount,
                            State: JSON.parse(
                              localStorage.getItem("pedidoSemiCompleto")
                            )[0].pedido.State,
                            Clients: res_dire.data.Client,
                            CombosPorPedido: JSON.parse(
                              localStorage.getItem("pedidoSemiCompleto")
                            )[0].pedido.CombosPorPedido,
                            ProductosPorPedido: JSON.parse(
                              localStorage.getItem("pedidoSemiCompleto")
                            )[0].pedido.ProductosPorPedido,
                            Adress: res_dire.data.id,
                            Observaciones: JSON.parse(
                              localStorage.getItem("pedidoSemiCompleto")
                            )[0].pedido.observacion,
                          }),
                          {
                            headers: {
                              "access-token": localStorage.getItem(
                                "access-token"
                              ),
                            },
                          }
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            arrayPedidoSemiCompleto.shift();

                            localStorage.setItem(
                              "pedidoSemiCompleto",
                              JSON.stringify(arrayPedidoSemiCompleto)
                            );

                            Swal.fire(
                              "Advertencia!",
                              "Se ha creado una nueva Direccion y Pedido sin Validar",
                              "warning"
                            );
                            setTimeout(function () {
                              window.location.reload();
                            }, 3500);
                          } else {
                            Swal.fire({
                              title: "Error!",
                              text:
                                "Se ha producido un error al intentar crear el Pedido",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          }
                        })
                        .catch((err) => {
                          console.log(err);

                          Swal.fire({
                            title: "Error!",
                            text:
                              "El Servidor no ha respondido al alta de Pedido",
                            type: "error",
                            confirmButtonText: "Aceptar",
                          });
                          return;
                        });
                    } else {
                      Swal.fire({
                        title: "Error!",
                        text:
                          "Se ha producido un error al intentar crear la direccion",
                        type: "error",
                        confirmButtonText: "Aceptar",
                      });
                      return;
                    }
                  })
                  .catch((err) => {
                    console.log(err);

                    Swal.fire({
                      title: "Error!",
                      text:
                        "El Servidor no ha respondido al alta de la direccion",
                      type: "error",
                      confirmButtonText: "Aceptar",
                    });
                    return;
                  });
              });
          } else {
            Swal.fire(
              "Error!",
              "Error de validador, cambie la direccion del pedido",
              "error"
            );
          }
        })
        .catch(async function (error) {
          await axios
            .post(
              `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
              (data_dire_semi = {
                Address: {
                  Adress: JSON.parse(
                    localStorage.getItem("pedidoSemiCompleto")
                  )[0].datos_direccion.Adress,
                  Department: JSON.parse(
                    localStorage.getItem("pedidoSemiCompleto")
                  )[0].datos_direccion.Department,
                  Floor: JSON.parse(
                    localStorage.getItem("pedidoSemiCompleto")
                  )[0].datos_direccion.Floor,
                  Cp: JSON.parse(localStorage.getItem("pedidoSemiCompleto"))[0]
                    .datos_direccion.Cp,
                  LatLong: "latlong",
                  Client: JSON.parse(
                    localStorage.getItem("pedidoSemiCompleto")
                  )[0].datos_direccion.Client,
                },
              }),
              {
                headers: {
                  "access-token": localStorage.getItem("access-token"),
                },
              }
            )
            .then(async (res_dire) => {
              if (res_dire.status === 200) {
                /**
                 * Pedido
                 */

                await axios
                  .post(
                    `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                    (data_pedido_semi = {
                      Date: JSON.parse(
                        localStorage.getItem("pedidoSemiCompleto")
                      )[0].pedido.Date,
                      Users: JSON.parse(
                        localStorage.getItem("pedidoSemiCompleto")
                      )[0].pedido.Users,
                      Amount: JSON.parse(
                        localStorage.getItem("pedidoSemiCompleto")
                      )[0].pedido.Amount,
                      State: JSON.parse(
                        localStorage.getItem("pedidoSemiCompleto")
                      )[0].pedido.State,
                      Clients: res_dire.data.Client,
                      CombosPorPedido: JSON.parse(
                        localStorage.getItem("pedidoSemiCompleto")
                      )[0].pedido.CombosPorPedido,
                      ProductosPorPedido: JSON.parse(
                        localStorage.getItem("pedidoSemiCompleto")
                      )[0].pedido.ProductosPorPedido,
                      Adress: res_dire.data.id,
                      Observaciones: JSON.parse(
                        localStorage.getItem("pedidoSemiCompleto")
                      )[0].pedido.observacion,
                    }),
                    {
                      headers: {
                        "access-token": localStorage.getItem("access-token"),
                      },
                    }
                  )
                  .then((res) => {
                    if (res.status === 200) {
                      arrayPedidoSemiCompleto.shift();

                      localStorage.setItem(
                        "pedidoSemiCompleto",
                        JSON.stringify(arrayPedidoSemiCompleto)
                      );

                      Swal.fire(
                        "Advertencia!",
                        "Se ha creado una nueva Direccion y Pedido sin Validar",
                        "warning"
                      );
                      setTimeout(function () {
                        window.location.reload();
                      }, 3500);
                    } else {
                      Swal.fire({
                        title: "Error!",
                        text:
                          "Se ha producido un error al intentar crear el Pedido",
                        type: "error",
                        confirmButtonText: "Aceptar",
                      });
                      return;
                    }
                  })
                  .catch((err) => {
                    console.log(err);

                    Swal.fire({
                      title: "Error!",
                      text: "El Servidor no ha respondido al alta de Pedido",
                      type: "error",
                      confirmButtonText: "Aceptar",
                    });
                    return;
                  });
              } else {
                Swal.fire({
                  title: "Error!",
                  text:
                    "Se ha producido un error al intentar crear la direccion",
                  type: "error",
                  confirmButtonText: "Aceptar",
                });
                return;
              }
            })
            .catch((err) => {
              console.log(err);

              Swal.fire({
                title: "Error!",
                text: "El Servidor no ha respondido al alta de la direccion",
                type: "error",
                confirmButtonText: "Aceptar",
              });
              return;
            });
        });
    }

    /**
     *
     * Pedido Completo
     *
     *
     */

    let arrayPedidoCompleto = JSON.parse(
      localStorage.getItem("pedidoCompleto")
    );
    let count_pedido_completo = JSON.parse(
      localStorage.getItem("pedidoCompleto")
    );

    let data_dire;
    let data_pedido;

    for (let i = 0; i < count_pedido_completo.length; i++) {
      await axios
        .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
          params: {
            app_id: "N0fRlxF32W9uEEuH5ZSv",
            app_code: "0eDtrgamyvY1fxPeA8m0OQ",
            query: JSON.parse(localStorage.getItem("pedidoCompleto"))[0]
              .datos_direccion.Adress,
            maxresults: 1,
          },
        })
        .then(async function (response) {
          if (response.data.suggestions.length > 0) {
            const id = response.data.suggestions[0].locationId;
            const address = response.data.suggestions[0].address;

            self.setState({
              address: address,
              query: JSON.parse(localStorage.getItem("pedidoCompleto"))[0]
                .datos_direccion.Adress,
              locationId: id,
            });

            if (self.state.locationId.length > 0) {
              params["locationId"] = self.state.locationId;
            } else {
              params["searchtext"] =
                self.state.address.street +
                self.state.address.city +
                self.state.address.state +
                self.state.address.postalCode +
                self.state.address.country;
            }

            await axios
              .get("https://geocoder.api.here.com/6.2/geocode.json", {
                params: params,
              })
              .then(async function (response) {
                const view = response.data.Response.View;
                if (view.length > 0 && view[0].Result.length > 0) {
                  const location = view[0].Result[0].Location;

                  self.state.lat = location.DisplayPosition.Latitude;
                  self.state.lon = location.DisplayPosition.Longitude;
                } else {
                  self.setState({
                    coords: null,
                  });
                }

                let coords;

                if (self.state.lat === null || self.state.lon === null) {
                  coords = "latlong";
                } else {
                  coords = self.state.lat + ";" + self.state.lon;
                }

                await axios
                  .post(
                    `${process.env.REACT_APP_SERVER}/Client/CreateClient`,
                    JSON.parse(localStorage.getItem("pedidoCompleto"))[0]
                      .datos_cliente,
                    {
                      headers: {
                        "access-token": localStorage.getItem("access-token"),
                      },
                    }
                  )
                  .then(async (res_cliente) => {
                    if (res_cliente.status === 200) {
                      /**
                       * Direccion
                       */

                      await axios
                        .post(
                          `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                          (data_dire = {
                            Address: {
                              Adress: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].datos_direccion.Adress,
                              Department: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].datos_direccion.Department,
                              Floor: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].datos_direccion.Floor,
                              Cp: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].datos_direccion.Cp,
                              LatLong: coords,
                              Client: res_cliente.data.UserId,
                              Validado: true,
                            },
                          }),
                          {
                            headers: {
                              "access-token": localStorage.getItem(
                                "access-token"
                              ),
                            },
                          }
                        )
                        .then(async (res_dire) => {
                          if (res_dire.status === 200) {
                            /**
                             * Pedido
                             */

                            await axios
                              .post(
                                `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                                (data_pedido = {
                                  Date: JSON.parse(
                                    localStorage.getItem("pedidoCompleto")
                                  )[0].pedido.Date,
                                  Users: JSON.parse(
                                    localStorage.getItem("pedidoCompleto")
                                  )[0].pedido.Users,
                                  Amount: JSON.parse(
                                    localStorage.getItem("pedidoCompleto")
                                  )[0].pedido.Amount,
                                  State: JSON.parse(
                                    localStorage.getItem("pedidoCompleto")
                                  )[0].pedido.State,
                                  Clients: res_dire.data.Client,
                                  CombosPorPedido: JSON.parse(
                                    localStorage.getItem("pedidoCompleto")
                                  )[0].pedido.CombosPorPedido,
                                  ProductosPorPedido: JSON.parse(
                                    localStorage.getItem("pedidoCompleto")
                                  )[0].pedido.ProductosPorPedido,
                                  Adress: res_dire.data.id,
                                  Observaciones: JSON.parse(
                                    localStorage.getItem("pedidoCompleto")
                                  )[0].pedido.observacion,
                                }),
                                {
                                  headers: {
                                    "access-token": localStorage.getItem(
                                      "access-token"
                                    ),
                                  },
                                }
                              )
                              .then((res) => {
                                if (res.status === 200) {
                                  arrayPedidoCompleto.shift();

                                  localStorage.setItem(
                                    "pedidoCompleto",
                                    JSON.stringify(arrayPedidoCompleto)
                                  );

                                  Swal.fire(
                                    "Correcto!",
                                    "Se ha creado un nuevo Cliente, Direccion y Pedido",
                                    "success"
                                  );
                                  // setTimeout(function(){
                                  //     window.location.reload();
                                  // }, 3500);
                                } else {
                                  Swal.fire({
                                    title: "Error!",
                                    text:
                                      "Se ha producido un error al intentar crear el Pedido",
                                    type: "error",
                                    confirmButtonText: "Aceptar",
                                  });
                                  return;
                                }
                              })
                              .catch((err) => {
                                //Error al intentar crear un pedido

                                Swal.fire({
                                  title: "Error!",
                                  text:
                                    "El Servidor no ha respondido al alta de Pedido",
                                  type: "error",
                                  confirmButtonText: "Aceptar",
                                });
                                return;
                              });
                          } else {
                            //Si el status de la respuesta de la creacion de la direccion es diferente de 200

                            Swal.fire({
                              title: "Error!",
                              text:
                                "Se ha producido un error al intentar crear la direccion",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          }
                        })
                        .catch((err) => {
                          //Error al intentar crear una direccion

                          Swal.fire({
                            title: "Error!",
                            text:
                              "El Servidor no ha respondido correctamente al alta de la direccion sin validar",
                            type: "error",
                            confirmButtonText: "Aceptar",
                          });
                          return;
                        });
                    }
                  })
                  .catch(async (err) => {
                    const response = err.response;

                    // Si el cliente existe, vamos a buscarlo y agarrar el ID, ya que no podemos pasarlo entre las promesas

                    await axios
                      .get(
                        `https://roraso.herokuapp.com/Client/Client?Phone=${
                          response.data.split('"')[3]
                        }`,
                        {
                          headers: {
                            "access-token": localStorage.getItem(
                              "access-token"
                            ),
                          },
                        }
                      )
                      .then(async (res) => {
                        await axios
                          .post(
                            `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                            (data_dire = {
                              Address: {
                                Adress: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].datos_direccion.Adress,
                                Department: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].datos_direccion.Department,
                                Floor: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].datos_direccion.Floor,
                                Cp: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].datos_direccion.Cp,
                                LatLong: coords,
                                Client: res.data.Cliente.id,
                                Validado: true,
                              },
                            }),
                            {
                              headers: {
                                "access-token": localStorage.getItem(
                                  "access-token"
                                ),
                              },
                            }
                          )
                          .then(async (res_dire) => {
                            if (res_dire.status === 200) {
                              /**
                               * Pedido
                               */

                              await axios
                                .post(
                                  `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                                  (data_pedido = {
                                    Date: JSON.parse(
                                      localStorage.getItem("pedidoCompleto")
                                    )[0].pedido.Date,
                                    Users: JSON.parse(
                                      localStorage.getItem("pedidoCompleto")
                                    )[0].pedido.Users,
                                    Amount: JSON.parse(
                                      localStorage.getItem("pedidoCompleto")
                                    )[0].pedido.Amount,
                                    State: JSON.parse(
                                      localStorage.getItem("pedidoCompleto")
                                    )[0].pedido.State,
                                    Clients: res_dire.data.Client,
                                    CombosPorPedido: JSON.parse(
                                      localStorage.getItem("pedidoCompleto")
                                    )[0].pedido.CombosPorPedido,
                                    ProductosPorPedido: JSON.parse(
                                      localStorage.getItem("pedidoCompleto")
                                    )[0].pedido.ProductosPorPedido,
                                    Adress: res_dire.data.id,
                                    Observaciones: JSON.parse(
                                      localStorage.getItem("pedidoCompleto")
                                    )[0].pedido.observacion,
                                  }),
                                  {
                                    headers: {
                                      "access-token": localStorage.getItem(
                                        "access-token"
                                      ),
                                    },
                                  }
                                )
                                .then((res) => {
                                  if (res.status === 200) {
                                    arrayPedidoCompleto.shift();

                                    localStorage.setItem(
                                      "pedidoCompleto",
                                      JSON.stringify(arrayPedidoCompleto)
                                    );

                                    Swal.fire(
                                      "Correcto!",
                                      "Se ha creado un nuevo Cliente, Direccion y Pedido",
                                      "success"
                                    );
                                    // setTimeout(function(){
                                    //     window.location.reload();
                                    // }, 3500);
                                  } else {
                                    Swal.fire({
                                      title: "Error!",
                                      text:
                                        "Se ha producido un error al intentar crear el Pedido",
                                      type: "error",
                                      confirmButtonText: "Aceptar",
                                    });
                                    return;
                                  }
                                })
                                .catch((err) => {
                                  Swal.fire({
                                    title: "Error!",
                                    text:
                                      "El Servidor no ha respondido al alta de Pedido",
                                    type: "error",
                                    confirmButtonText: "Aceptar",
                                  });
                                  return;
                                });
                            } else {
                              Swal.fire({
                                title: "Error!",
                                text:
                                  "Se ha producido un error al intentar crear la direccion",
                                type: "error",
                                confirmButtonText: "Aceptar",
                              });
                              return;
                            }
                          })
                          .catch((err) => {
                            Swal.fire({
                              title: "Error!",
                              text: "Error al momento de crear una direccion",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          });
                      })
                      .catch((err) => {
                        console.log(
                          "Este error da cuando busco el numero de telefono"
                        );
                        console.log(err);
                      });
                  });
              })
              .catch(async function (error) {
                Swal.fire(
                  "Error!",
                  "Error de validador, cambie la direccion del pedido",
                  "error"
                );
              });
          } else {
            //La API no pudo validar la direccion, la vamos a crear sin validar

            await axios
              .post(
                `${process.env.REACT_APP_SERVER}/Client/CreateClient`,
                JSON.parse(localStorage.getItem("pedidoCompleto"))[0]
                  .datos_cliente,
                {
                  headers: {
                    "access-token": localStorage.getItem("access-token"),
                  },
                }
              )
              .then(async (res_cliente) => {
                if (res_cliente.status === 200) {
                  /**
                   * Direccion
                   */

                  await axios
                    .post(
                      `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                      (data_dire = {
                        Address: {
                          Adress: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Adress,
                          Department: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Department,
                          Floor: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Floor,
                          Cp: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Cp,
                          LatLong: "latlong",
                          Client: res_cliente.data.UserId,
                          Validado: true,
                        },
                      }),
                      {
                        headers: {
                          "access-token": localStorage.getItem("access-token"),
                        },
                      }
                    )
                    .then(async (res_dire) => {
                      if (res_dire.status === 200) {
                        /**
                         * Pedido
                         */

                        await axios
                          .post(
                            `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                            (data_pedido = {
                              Date: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.Date,
                              Users: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.Users,
                              Amount: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.Amount,
                              State: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.State,
                              Clients: res_dire.data.Client,
                              CombosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.CombosPorPedido,
                              ProductosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.ProductosPorPedido,
                              Adress: res_dire.data.id,
                              Observaciones: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.observacion,
                            }),
                            {
                              headers: {
                                "access-token": localStorage.getItem(
                                  "access-token"
                                ),
                              },
                            }
                          )
                          .then((res) => {
                            if (res.status === 200) {
                              arrayPedidoCompleto.shift();

                              localStorage.setItem(
                                "pedidoCompleto",
                                JSON.stringify(arrayPedidoCompleto)
                              );

                              Swal.fire(
                                "Correcto!",
                                "Se ha creado un nuevo Cliente, Direccion y Pedido",
                                "success"
                              );
                              // setTimeout(function(){
                              //     window.location.reload();
                              // }, 3500);
                            } else {
                              Swal.fire({
                                title: "Error!",
                                text:
                                  "Se ha producido un error al intentar crear el Pedido",
                                type: "error",
                                confirmButtonText: "Aceptar",
                              });
                              return;
                            }
                          })
                          .catch((err) => {
                            //Error al intentar crear un pedido

                            Swal.fire({
                              title: "Error!",
                              text:
                                "El Servidor no ha respondido al alta de Pedido",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          });
                      } else {
                        //Si el status de la respuesta de la creacion de la direccion es diferente de 200

                        Swal.fire({
                          title: "Error!",
                          text:
                            "Se ha producido un error al intentar crear la direccion",
                          type: "error",
                          confirmButtonText: "Aceptar",
                        });
                        return;
                      }
                    })
                    .catch((err) => {
                      //Error al intentar crear una direccion

                      Swal.fire({
                        title: "Error!",
                        text:
                          "El Servidor no ha respondido correctamente al alta de la direccion sin validar",
                        type: "error",
                        confirmButtonText: "Aceptar",
                      });
                      return;
                    });
                }
              })
              .catch(async (err) => {
                const response = err.response;

                // Si el cliente existe, vamos a buscarlo y agarrar el ID, ya que no podemos pasarlo entre las promesas

                await axios
                  .get(
                    `https://roraso.herokuapp.com/Client/Client?Phone=${
                      response.data.split('"')[3]
                    }`,
                    {
                      headers: {
                        "access-token": localStorage.getItem("access-token"),
                      },
                    }
                  )
                  .then(async (res) => {
                    await axios
                      .post(
                        `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                        (data_dire = {
                          Address: {
                            Adress: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].datos_direccion.Adress,
                            Department: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].datos_direccion.Department,
                            Floor: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].datos_direccion.Floor,
                            Cp: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].datos_direccion.Cp,
                            LatLong: "latlong",
                            Client: res.data.Cliente.id,
                          },
                        }),
                        {
                          headers: {
                            "access-token": localStorage.getItem(
                              "access-token"
                            ),
                          },
                        }
                      )
                      .then(async (res_dire) => {
                        if (res_dire.status === 200) {
                          /**
                           * Pedido
                           */

                          await axios
                            .post(
                              `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                              (data_pedido = {
                                Date: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].pedido.Date,
                                Users: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].pedido.Users,
                                Amount: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].pedido.Amount,
                                State: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].pedido.State,
                                Clients: res_dire.data.Client,
                                CombosPorPedido: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].pedido.CombosPorPedido,
                                ProductosPorPedido: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].pedido.ProductosPorPedido,
                                Adress: res_dire.data.id,
                                Observaciones: JSON.parse(
                                  localStorage.getItem("pedidoCompleto")
                                )[0].pedido.observacion,
                              }),
                              {
                                headers: {
                                  "access-token": localStorage.getItem(
                                    "access-token"
                                  ),
                                },
                              }
                            )
                            .then((res) => {
                              if (res.status === 200) {
                                arrayPedidoCompleto.shift();

                                localStorage.setItem(
                                  "pedidoCompleto",
                                  JSON.stringify(arrayPedidoCompleto)
                                );

                                Swal.fire(
                                  "Atencion!",
                                  "Se ha creado un nuevo Cliente, Direccion y Pedido Sin Validar",
                                  "warning"
                                );
                                // setTimeout(function(){
                                //     window.location.reload();
                                // }, 3500);
                              } else {
                                Swal.fire({
                                  title: "Error!",
                                  text:
                                    "Se ha producido un error al intentar crear el Pedido",
                                  type: "error",
                                  confirmButtonText: "Aceptar",
                                });
                                return;
                              }
                            })
                            .catch((err) => {
                              Swal.fire({
                                title: "Error!",
                                text:
                                  "El Servidor no ha respondido al alta de Pedido",
                                type: "error",
                                confirmButtonText: "Aceptar",
                              });
                              return;
                            });
                        } else {
                          Swal.fire({
                            title: "Error!",
                            text:
                              "Se ha producido un error al intentar crear la direccion",
                            type: "error",
                            confirmButtonText: "Aceptar",
                          });
                          return;
                        }
                      })
                      .catch((err) => {
                        Swal.fire({
                          title: "Error!",
                          text: "Error al momento de crear una direccion",
                          type: "error",
                          confirmButtonText: "Aceptar",
                        });
                        return;
                      });
                  })
                  .catch((err) => {
                    console.log(
                      "Este error da cuando busco el numero de telefono"
                    );
                    console.log(err);
                  });
              });
          }
        })
        .catch(async function (error) {
          // Cuando no localiza la direccion entra en este lugar

          await axios
            .post(
              `${process.env.REACT_APP_SERVER}/Client/CreateClient`,
              JSON.parse(localStorage.getItem("pedidoCompleto"))[0]
                .datos_cliente,
              {
                headers: {
                  "access-token": localStorage.getItem("access-token"),
                },
              }
            )
            .then(async (res_cliente) => {
              if (res_cliente.status === 200) {
                /**
                 * Direccion
                 */

                await axios
                  .post(
                    `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                    (data_dire = {
                      Address: {
                        Adress: JSON.parse(
                          localStorage.getItem("pedidoCompleto")
                        )[0].datos_direccion.Adress,
                        Department: JSON.parse(
                          localStorage.getItem("pedidoCompleto")
                        )[0].datos_direccion.Department,
                        Floor: JSON.parse(
                          localStorage.getItem("pedidoCompleto")
                        )[0].datos_direccion.Floor,
                        Cp: JSON.parse(
                          localStorage.getItem("pedidoCompleto")
                        )[0].datos_direccion.Cp,
                        LatLong: "latlong",
                        Client: res_cliente.data.UserId,
                        Validado: true,
                      },
                    }),
                    {
                      headers: {
                        "access-token": localStorage.getItem("access-token"),
                      },
                    }
                  )
                  .then(async (res_dire) => {
                    if (res_dire.status === 200) {
                      /**
                       * Pedido
                       */

                      await axios
                        .post(
                          `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                          (data_pedido = {
                            Date: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].pedido.Date,
                            Users: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].pedido.Users,
                            Amount: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].pedido.Amount,
                            State: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].pedido.State,
                            Clients: res_dire.data.Client,
                            CombosPorPedido: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].pedido.CombosPorPedido,
                            ProductosPorPedido: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].pedido.ProductosPorPedido,
                            Adress: res_dire.data.id,
                            Observaciones: JSON.parse(
                              localStorage.getItem("pedidoCompleto")
                            )[0].pedido.observacion,
                          }),
                          {
                            headers: {
                              "access-token": localStorage.getItem(
                                "access-token"
                              ),
                            },
                          }
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            arrayPedidoCompleto.shift();

                            localStorage.setItem(
                              "pedidoCompleto",
                              JSON.stringify(arrayPedidoCompleto)
                            );

                            Swal.fire(
                              "Correcto!",
                              "Se ha creado un nuevo Cliente, Direccion y Pedido",
                              "success"
                            );
                            // setTimeout(function(){
                            //     window.location.reload();
                            // }, 3500);
                          } else {
                            Swal.fire({
                              title: "Error!",
                              text:
                                "Se ha producido un error al intentar crear el Pedido",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          }
                        })
                        .catch((err) => {
                          //Error al intentar crear un pedido

                          Swal.fire({
                            title: "Error!",
                            text:
                              "El Servidor no ha respondido al alta de Pedido",
                            type: "error",
                            confirmButtonText: "Aceptar",
                          });
                          return;
                        });
                    } else {
                      //Si el status de la respuesta de la creacion de la direccion es diferente de 200

                      Swal.fire({
                        title: "Error!",
                        text:
                          "Se ha producido un error al intentar crear la direccion",
                        type: "error",
                        confirmButtonText: "Aceptar",
                      });
                      return;
                    }
                  })
                  .catch((err) => {
                    //Error al intentar crear una direccion

                    Swal.fire({
                      title: "Error!",
                      text:
                        "El Servidor no ha respondido correctamente al alta de la direccion sin validar",
                      type: "error",
                      confirmButtonText: "Aceptar",
                    });
                    return;
                  });
              }
            })
            .catch(async (err) => {
              const response = err.response;

              // Si el cliente existe, vamos a buscarlo y agarrar el ID, ya que no podemos pasarlo entre las promesas

              await axios
                .get(
                  `https://roraso.herokuapp.com/Client/Client?Phone=${
                    response.data.split('"')[3]
                  }`,
                  {
                    headers: {
                      "access-token": localStorage.getItem("access-token"),
                    },
                  }
                )
                .then(async (res) => {
                  await axios
                    .post(
                      `${process.env.REACT_APP_SERVER}/Client/AddAddress`,
                      (data_dire = {
                        Address: {
                          Adress: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Adress,
                          Department: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Department,
                          Floor: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Floor,
                          Cp: JSON.parse(
                            localStorage.getItem("pedidoCompleto")
                          )[0].datos_direccion.Cp,
                          LatLong: "latlong",
                          Client: res.data.Cliente.id,
                        },
                      }),
                      {
                        headers: {
                          "access-token": localStorage.getItem("access-token"),
                        },
                      }
                    )
                    .then(async (res_dire) => {
                      if (res_dire.status === 200) {
                        /**
                         * Pedido
                         */

                        await axios
                          .post(
                            `${process.env.REACT_APP_SERVER}/Pedido/Create`,
                            (data_pedido = {
                              Date: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.Date,
                              Users: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.Users,
                              Amount: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.Amount,
                              State: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.State,
                              Clients: res_dire.data.Client,
                              CombosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.CombosPorPedido,
                              ProductosPorPedido: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.ProductosPorPedido,
                              Adress: res_dire.data.id,
                              Observaciones: JSON.parse(
                                localStorage.getItem("pedidoCompleto")
                              )[0].pedido.observacion,
                            }),
                            {
                              headers: {
                                "access-token": localStorage.getItem(
                                  "access-token"
                                ),
                              },
                            }
                          )
                          .then((res) => {
                            if (res.status === 200) {
                              arrayPedidoCompleto.shift();

                              localStorage.setItem(
                                "pedidoCompleto",
                                JSON.stringify(arrayPedidoCompleto)
                              );

                              Swal.fire(
                                "Atencion!",
                                "Se ha creado un nuevo Cliente, Direccion y Pedido Sin Validar",
                                "warning"
                              );
                              // setTimeout(function(){
                              //     window.location.reload();
                              // }, 3500);
                            } else {
                              Swal.fire({
                                title: "Error!",
                                text:
                                  "Se ha producido un error al intentar crear el Pedido",
                                type: "error",
                                confirmButtonText: "Aceptar",
                              });
                              return;
                            }
                          })
                          .catch((err) => {
                            Swal.fire({
                              title: "Error!",
                              text:
                                "El Servidor no ha respondido al alta de Pedido",
                              type: "error",
                              confirmButtonText: "Aceptar",
                            });
                            return;
                          });
                      } else {
                        Swal.fire({
                          title: "Error!",
                          text:
                            "Se ha producido un error al intentar crear la direccion",
                          type: "error",
                          confirmButtonText: "Aceptar",
                        });
                        return;
                      }
                    })
                    .catch((err) => {
                      Swal.fire({
                        title: "Error!",
                        text: "Error al momento de crear una direccion",
                        type: "error",
                        confirmButtonText: "Aceptar",
                      });
                      return;
                    });
                })
                .catch((err) => {
                  console.log(
                    "Este error da cuando busco el numero de telefono"
                  );
                  console.log(err);
                });
            });
        });

      let countDirErr = localStorage.getItem("direccionesErroneas");

      countDirErr++;

      localStorage.setItem("direccionesErroneas", countDirErr);
    }
  };

  render() {
    return (
      <div>
        <Button
          style={{ height: 50, width: 300, fontSize: 13 }}
          color="inherit"
          onClick={this.enviarSolicitudesEncoladasCompletas}
        >
          Enviar Solicitudes Encoladas
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});

export default connect(mapStateToProps, {
  currentUser,
})(EnviarPedidosOff);

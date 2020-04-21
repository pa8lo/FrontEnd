import React, { Component } from "react";
import AddressSuggest from "./AddressSuggest";
import AddressInput from "./AddressInput";
import axios from "axios";

import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";

const APP_ID_HERE = "N0fRlxF32W9uEEuH5ZSv";
const APP_CODE_HERE = "0eDtrgamyvY1fxPeA8m0OQ";

class AddressForm extends Component {
  constructor(props) {
    super(props);

    // console.log(this.props)

    this.state = this.getInitialState();

    // User has entered something in the address bar
    this.onQuery = this.onQuery.bind(this);
    // User has entered something in an address field
    this.onAddressChange = this.onAddressChange.bind(this);
    // User has clicked the check button
    this.onCheck = this.onCheck.bind(this);
    // User has clicked the clear button
    this.onClear = this.onClear.bind(this);
  }

  componentDidMount() {
    // console.log(this.props)
  }

  onQuery(evt) {
    const query = evt.target.value.replace(/^\s+/g, "");

    if (!query.length > 0) {
      this.setState(this.getInitialState());
      return;
    }

    const self = this;
    axios
      .get("https://autocomplete.geocoder.api.here.com/6.2/suggest.json", {
        params: {
          app_id: "N0fRlxF32W9uEEuH5ZSv",
          app_code: "0eDtrgamyvY1fxPeA8m0OQ",
          query: query,
          maxresults: 1,
        },
      })
      .then(function (response) {
        if (response.data.suggestions.length > 0) {
          const id = response.data.suggestions[0].locationId;
          const address = response.data.suggestions[0].address;
          self.setState({
            address: address,
            query: query,
            locationId: id,
          });
        } else {
          const state = self.getInitialState();
          self.setState(state);
        }
      });
  }

  getInitialState() {
    return {
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
      redirectHome: false,
      redirectRRHH: false,
      vali: false,
    };
  }

  onClear(evt) {
    const state = this.getInitialState();
    this.setState(state);
  }

  onAddressChange(evt) {
    const id = evt.target.id;
    const val = evt.target.value;

    let state = this.state;
    state.address[id] = val;
    this.setState(state);
  }

  enviarDatos = async () => {
    if (
      this.state.coords.lat === undefined &&
      this.state.coords.lon === undefined
    ) {
      Swal.fire({
        title: "Error!",
        text: "Debe Validar la Dirección",
        type: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    let latitud_longitud = this.state.coords.lat + ";" + this.state.coords.lon;

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_SERVER}/Local`,
        (this.data = {
          Local: {
            Adress: this.state.address.street,
            LatLong: latitud_longitud,
          },
        }),
        {
          headers: { "access-token": localStorage.getItem("access-token") },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("DireccionRestaurant", latitud_longitud);

          Swal.fire({
            title: "Correcto!",
            text: "Se ha añadido una direccion al restaurant",
            type: "success",
            confirmButtonText: "Confirmar",
          });
          setTimeout(function () {
            window.location.href = "/RRHH/";
          }, 3500);
        } else {
          Swal.fire({
            title: "Error!",
            text: "Se ha producido un error al intentar crear la dirección",
            type: "error",
            confirmButtonText: "Aceptar",
          });
          return;
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "El Servidor no ha respondido la solicitud",
          type: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      });

    return;
  };

  ToHome() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  }

  ToRRHH() {
    if (this.state.redirectRRHH) {
      return <Redirect to="/rrhh" />;
    }
  }

  setRedirectToHome = () => {
    this.setState({
      redirectRRHH: true,
    });
  };

  setRedirectToHome = () => {
    this.setState({
      redirectHome: true,
    });
  };

  onCheck(evt) {
    let params = {
      app_id: APP_ID_HERE,
      app_code: APP_CODE_HERE,
    };

    if (this.state.locationId.length > 0) {
      params["locationId"] = this.state.locationId;
    } else {
      params["searchtext"] =
        this.state.address.street +
        this.state.address.city +
        this.state.address.state +
        this.state.address.postalCode +
        this.state.address.country;
    }

    const self = this;
    axios
      .get("https://geocoder.api.here.com/6.2/geocode.json", { params: params })
      .then(function (response) {
        const view = response.data.Response.View;
        if (view.length > 0 && view[0].Result.length > 0) {
          const location = view[0].Result[0].Location;

          self.setState({
            isChecked: "true",
            locationId: "",
            query: location.Address.Label,
            address: {
              street:
                location.Address.HouseNumber + " " + location.Address.Street,
              city: location.Address.City,
              state: location.Address.State,
              postalCode: location.Address.PostalCode,
              country: location.Address.Country,
            },
            coords: {
              lat: location.DisplayPosition.Latitude,
              lon: location.DisplayPosition.Longitude,
            },
            tipo: {
              piso: 0,
              dpto: "",
            },
          });
        } else {
          self.setState({
            isChecked: true,
            coords: null,
          });
        }
      })
      .catch(function (error) {
        console.log("caught failed query");
        self.setState({
          isChecked: true,
          coords: null,
        });
      });
  }

  alert() {
    if (!this.state.isChecked) {
      return;
    }

    if (this.state.coords === null) {
      this.state.vali = false;
      return (
        <div className="alert alert-warning" role="alert">
          <b>Dirección Invalida.</b> La dirección no fue reconocida
        </div>
      );
    } else {
      this.state.vali = true;
      return (
        <div className="alert alert-success" role="alert">
          <b>Dirección Valida.</b> Coodenadas en {this.state.coords.lat},{" "}
          {this.state.coords.lon}.
        </div>
      );
    }
  }

  getPiso = (piso) => {
    this.setState({
      piso: piso,
    });
  };

  getDepto = (dpto) => {
    this.setState({
      dpto: dpto,
    });
  };

  goBack() {
    window.history.back();
  }

  render() {
    let result = this.alert();
    return (
      <div className="container col-md-12">
        <AddressSuggest query={this.state.query} onChange={this.onQuery} />
        <AddressInput
          street={this.state.address.street}
          city={this.state.address.city}
          state={this.state.address.state}
          postalCode={this.state.address.postalCode}
          country={this.state.address.country}
          piso={this.getPiso}
          depto={this.getDepto}
          onChange={this.onAddressChange}
        />
        <br />
        {result}
        <div center="true" align="center" className="form-group">
          {this.state.vali === false ? (
            <button
              style={{ marginLeft: "10px", width: 80 }}
              className="btn btn-primary"
              disabled
            >
              Aceptar
            </button>
          ) : (
            <button
              type="submit"
              style={{ marginLeft: "10px", width: 80 }}
              className="btn btn-primary"
              onClick={() => this.enviarDatos()}
            >
              Aceptar
            </button>
          )}

          <button
            style={{ marginLeft: 10, width: 80 }}
            onClick={this.setRedirectToHome}
            type="button"
            className="btn btn-danger"
          >
            Cancelar
          </button>
          {this.ToHome()}
          {this.ToRRHH()}
          <button
            type="submit"
            style={{ marginLeft: "10px" }}
            className="btn btn-info"
            onClick={this.onCheck}
          >
            Validar Dirección
          </button>
        </div>
      </div>
    );
  }
}

export default AddressForm;

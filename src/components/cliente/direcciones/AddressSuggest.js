import React, { Component } from "react";
import AddressItemInput from "./AddressItemInput";

class AddressSuggest extends Component {
  render() {
    return (
      <AddressItemInput
        label="Dirección"
        value={this.props.query}
        onChange={this.props.onChange}
        placeholder="Escribe el domicilio completo"
      />
    );
  }
}

export default AddressSuggest;

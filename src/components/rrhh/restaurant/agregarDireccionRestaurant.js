import React, { Component } from 'react';

class agregarDireccionRestaurant extends Component {

    load_direction = (dire) => {

        console.log(dire)

        this.state = {
            'address': {
              'street': '',
              'city': '',
              'state': '',
              'postalCode': '',
              'country': '',
            },
            'query': '',
            'locationId': '',
            'isChecked': false,
            'coords': {},
            'lat': '',
            'lon': ''
          }
  
          let params = {
            'app_id': 'N0fRlxF32W9uEEuH5ZSv',
            'app_code': '0eDtrgamyvY1fxPeA8m0OQ',
          }

          const self = this;

          axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
          {'params': {
            'app_id': 'N0fRlxF32W9uEEuH5ZSv',
            'app_code': '0eDtrgamyvY1fxPeA8m0OQ',
            'query': JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Adress,
            'maxresults': 1,
          }}).then(function (response) {
            if (response.data.suggestions.length > 0) {
                const id = response.data.suggestions[0].locationId;
                const address = response.data.suggestions[0].address;

                self.setState({
                  'address' : address,
                  'query' : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Adress,
                  'locationId': id
                })

                if (self.state.locationId.length > 0) {
                  params['locationId'] = self.state.locationId;
                } else {
                  params['searchtext'] = self.state.address.street
                    + self.state.address.city
                    + self.state.address.state
                    + self.state.address.postalCode
                    + self.state.address.country;
                }

                axios.get('https://geocoder.api.here.com/6.2/geocode.json',
                {'params': params }
                ).then(function (response) {
                  const view = response.data.Response.View
                  if (view.length > 0 && view[0].Result.length > 0) {
                    const location = view[0].Result[0].Location;

                    self.state.lat = location.DisplayPosition.Latitude;
                    self.state.lon = location.DisplayPosition.Longitude;

                    

                  } else {
                    self.setState({
                      'coords' : null,
                    })
                  }
              
                  if (self.state.lat === null || self.state.lon === null) {

                    // Swal.fire({
                    //   title: 'Error! La direccion no pudo ser validada',
                    //   text: 'Comuniquese con el cliente',
                    //   type: 'error',
                    //   confirmButtonText: 'Aceptar'
                    // })

                    return (
                        console.log("Correcto")
                    )
                  }
                })
            }
        })}

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default agregarDireccionRestaurant;
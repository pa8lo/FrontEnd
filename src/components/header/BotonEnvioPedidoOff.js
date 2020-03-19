import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import * as actions from '../../actions';

import { currentUser } from '../../actions/usuarioAction';
import { connect } from 'react-redux';
//CSS
import Swal from 'sweetalert2'

class EnviarPedidosOff extends Component {

    constructor(props, context) {
        super(props, context);
        const { classes } = props;
        this.state = {
          profile:false,
          redirectLogOut: false,
          redirectHome: false,
          redirectChangePassword : false,
          redirectSection : false,
          redirectUrlSection : ''
      }
    }

    componentDidMount(){
      this.props.currentUser();
    }

    enviarSolicitudesEncoladasCompletas = async () => {

        this.setState({ profile: false})

        let arrayEstadoPedido = JSON.parse(localStorage.getItem('pedidoCambioEstado'));

        for (let i = 0; i < JSON.parse(localStorage.getItem('pedidoCambioEstado')).length; i++) {
          
          let data = {
            State : {
              id : JSON.parse(localStorage.getItem('pedidoCambioEstado'))[i].estado
              },
              Pedido : {
                  id : JSON.parse(localStorage.getItem('pedidoCambioEstado'))[i].id_pedido
              }
          }

          await axios.post("https://roraso.herokuapp.com/Pedido/ChangeState",data,
          { headers: { 'access-token': localStorage.getItem('access-token')}})
              .then(res => {
                  if(res.status === 200){
                      Swal.fire({
                          title: 'Correcto!',
                          text: 'Se ha modificado un estado del pedido',
                          type: 'success',
                          confirmButtonText: 'Confirmar'
                      })

                      arrayEstadoPedido.splice(i, 1);
                      localStorage.setItem('pedidoCambioEstado', JSON.stringify(arrayEstadoPedido));
                  }
                  else{
                      Swal.fire({
                          title: 'Error!',
                          text: 'Se ha producido un error al intentar modificar un pedido',
                          type: 'error',
                          confirmButtonText: 'Aceptar'
                      })
                      return;
                  }
                
              })
              .catch(err => {
                  Swal.fire({
                      title: 'Error!',
                      text: 'El Servidor no ha respondido al cambio de estado',
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                  })
                  return;
              })

        }

        /**
         * 
         * Solo pedidos
         * 
         */

        
        
        let arrayPedido = JSON.parse(localStorage.getItem('enviarPedido'));

        if(JSON.parse(localStorage.getItem('enviarPedido').length !== 0)){

          for (let i = 0; i < JSON.parse(localStorage.getItem('enviarPedido')).length; i++) {


          let data = {
            Date : JSON.parse(localStorage.getItem('enviarPedido'))[i].date,
            Users : JSON.parse(localStorage.getItem('enviarPedido'))[i].user,
            Amount : JSON.parse(localStorage.getItem('enviarPedido'))[i].amount,
            State : JSON.parse(localStorage.getItem('enviarPedido'))[i].state,
            Clients : JSON.parse(localStorage.getItem('enviarPedido'))[i].client,
            CombosPorPedido : JSON.parse(localStorage.getItem('enviarPedido'))[i].combo,
            ProductosPorPedido : JSON.parse(localStorage.getItem('enviarPedido'))[i].product,
            Adress : JSON.parse(localStorage.getItem('enviarPedido'))[i].address,
            Observaciones : JSON.parse(localStorage.getItem('enviarPedido'))[i].observacion
          }

          // console.log(data);

          axios.post("https://roraso.herokuapp.com/Pedido/Create",data,
          {headers: { 'access-token': localStorage.getItem('access-token')}})
          .then(res => {
              if(res.status === 200){

                  Swal.fire({
                      title: 'Correcto!',
                      text: 'Se ha creado una nuevo pedido',
                      type: 'success',
                      // confirmButtonText: 'Confirmar'
                  })

                  arrayPedido.splice(i, 1);
                  localStorage.setItem('enviarPedido', JSON.stringify(arrayPedido));

              }
              else{
                  Swal.fire({
                      title: 'Error!',
                      text: 'Se ha producido un error al intentar crear el pedido',
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                  })
                  return;
              }
          }).catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'El Servidor no ha respondido al alta de pedido',
                type: 'error',
                confirmButtonText: 'Aceptar'
            })
            setTimeout(function(){ 
              window.location.reload();
            }, 3500);
            return;
        })

          arrayPedido.splice(i, 1);
          localStorage.setItem('enviarPedido', JSON.stringify(arrayPedido));

        }

      }

      /**
       * 
       * Pedido SemiCompleto
       * 
       */

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

        let data_dire_semi;
        let data_pedido_semi;

        const self = this;

        let arrayPedidoSemiCompleto = JSON.parse(localStorage.getItem('pedidoSemiCompleto'));

        for (let i = 0; i < JSON.parse(localStorage.getItem('pedidoSemiCompleto')).length; i++) {

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

                      axios.post("https://roraso.herokuapp.com/Client/AddAddress",
                            data_dire_semi = {
                              Address : {
                                  Adress : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Adress,
                                  Department : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Department,
                                  Floor : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Floor,
                                  Cp : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Cp,
                                  LatLong : "latlong",
                                  Client : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Client,
                              }
                            },
                            {headers: { 'access-token': localStorage.getItem('access-token')}})
                              .then(res_dire => {

                                  if(res_dire.status === 200){
                      
                                    /**
                                     * Pedido
                                     */
              
                                    axios.post("https://roraso.herokuapp.com/Pedido/Create",
                                    data_pedido_semi = {
                                      Date : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.Date,
                                      Users : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.Users,
                                      Amount : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.Amount,
                                      State : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.State,
                                      Clients : res_dire.data.Client,
                                      CombosPorPedido : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.CombosPorPedido,
                                      ProductosPorPedido : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.ProductosPorPedido,
                                      Adress : res_dire.data.id,
                                      Observaciones : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.observacion
                                    }
                                    ,
                                    {headers: { 'access-token': localStorage.getItem('access-token')}})
                                        .then(res => {
              
                                            if(res.status === 200){

                                              arrayPedidoSemiCompleto.splice(i, 1);

                                              localStorage.setItem('pedidoSemiCompleto', JSON.stringify(arrayPedidoSemiCompleto));

                                                Swal.fire(
                                                  'Correcto!',
                                                  'Se ha creado una nueva Direccion y Pedido sin Validar',
                                                  'warning'
                                                )
                                                setTimeout(function(){ 
                                                    window.location.reload();
                                                }, 3500);
                                            }
                                            else{
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Se ha producido un error al intentar crear el Pedido',
                                                    type: 'error',
                                                    confirmButtonText: 'Aceptar'
                                                })
                                                return;
                                            }
                                        })
                                        .catch(err => {
              
                                          console.log(err)
              
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'El Servidor no ha respondido al alta de Pedido',
                                                type: 'error',
                                                confirmButtonText: 'Aceptar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    })
                                    return;
                                  }
                              })
                              .catch(err => {
              
                                console.log(err)
              
                                  Swal.fire({
                                      title: 'Error!',
                                      text: 'El Servidor no ha respondido al alta de la direccion',
                                      type: 'error',
                                      confirmButtonText: 'Aceptar'
                                  })
                                  return;
                              })

                      
                      
                      // Swal.fire({
                      //   title: 'Error! La direccion no pudo ser validada',
                      //   text: 'Comuniquese con el cliente',
                      //   type: 'error',
                      //   confirmButtonText: 'Aceptar'
                      // })
                    );
                  } else {

                    let coords = self.state.lat + ";" + self.state.lon

                    return (
                      
                        axios.post("https://roraso.herokuapp.com/Client/AddAddress",
                            data_dire_semi = {
                              Address : {
                                  Adress : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Adress,
                                  Department : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Department,
                                  Floor : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Floor,
                                  Cp : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Cp,
                                  LatLong : coords,
                                  Client : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].datos_direccion.Client,
                                  Validado : true
                              }
                            },
                            {headers: { 'access-token': localStorage.getItem('access-token')}})
                              .then(res_dire => {

                                  if(res_dire.status === 200){
                      
                                    /**
                                     * Pedido
                                     */
              
                                    axios.post("https://roraso.herokuapp.com/Pedido/Create",
                                    data_pedido_semi = {
                                      Date : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.Date,
                                      Users : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.Users,
                                      Amount : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.Amount,
                                      State : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.State,
                                      Clients : res_dire.data.Client,
                                      CombosPorPedido : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.CombosPorPedido,
                                      ProductosPorPedido : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.ProductosPorPedido,
                                      Adress : res_dire.data.id,
                                      Observaciones : JSON.parse(localStorage.getItem('pedidoSemiCompleto'))[i].pedido.observacion
                                    }
                                    ,
                                    {headers: { 'access-token': localStorage.getItem('access-token')}})
                                        .then(res => {
              
                                            if(res.status === 200){

                                              arrayPedidoSemiCompleto.splice(i, 1);

                                              localStorage.setItem('pedidoSemiCompleto', JSON.stringify(arrayPedidoSemiCompleto));

                                                Swal.fire(
                                                  'Correcto!',
                                                  'Se ha creado una nueva Direccion y Pedido',
                                                  'success'
                                                )
                                                setTimeout(function(){ 
                                                    window.location.reload();
                                                }, 3500);
                                            }
                                            else{
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Se ha producido un error al intentar crear el Pedido',
                                                    type: 'error',
                                                    confirmButtonText: 'Aceptar'
                                                })
                                                return;
                                            }
                                        })
                                        .catch(err => {
              
                                          console.log(err)
              
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'El Servidor no ha respondido al alta de Pedido',
                                                type: 'error',
                                                confirmButtonText: 'Aceptar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    })
                                    return;
                                  }
                              })
                              .catch(err => {
              
                                console.log(err)
              
                                  Swal.fire({
                                      title: 'Error!',
                                      text: 'El Servidor no ha respondido al alta de la direccion',
                                      type: 'error',
                                      confirmButtonText: 'Aceptar'
                                  })
                                  return;
                              })

                    );
                  }

                })
                .catch(function (error) {
                  Swal.fire({
                    title: 'Error!',
                    text: 'La direccion no pudo ser validada, comuniquese con el cliente',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  })
                  self.setState({
                    'coords': null,
                  });
                });
              } else {
                return null;
              }
          })
          .catch(function (error) {
            Swal.fire({
              title: 'Error!',
              text: 'La direccion no pudo ser validada, comuniquese con el cliente',
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          });
  
        }

        let arrayPedidoCompleto = JSON.parse(localStorage.getItem('pedidoCompleto'));

        let data_dire;
        let data_pedido;

        for (let i = 0; i < JSON.parse(localStorage.getItem('pedidoCompleto')).length; i++) {

        axios.get('https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
          {'params': {
            'app_id': 'N0fRlxF32W9uEEuH5ZSv',
            'app_code': '0eDtrgamyvY1fxPeA8m0OQ',
            'query': JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Adress,
            'maxresults': 1,
          }}).then(function (response) {
              if (response.data.suggestions.length > 0) {
                const id = response.data.suggestions[0].locationId;
                const address = response.data.suggestions[0].address;

                self.setState({
                  'address' : address,
                  'query' : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Adress,
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
                    return (

                      Swal.fire({
                        title: 'Error! La direccion no pudo ser validada',
                        text: 'Comuniquese con el cliente',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                      })

                      /*-----------------------------------------------------------------------*/
                    );
                  } else {

                    let coords = self.state.lat + ";" + self.state.lon

                    return (
                      axios.post("https://roraso.herokuapp.com/Client/CreateClient",
                        JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_cliente,
                        {headers: { 'access-token': localStorage.getItem('access-token')}})
                        .then(res_cliente => {
                            if(res_cliente.status === 200){

                              /**
                               * Direccion
                               */
              
                              axios.post("https://roraso.herokuapp.com/Client/AddAddress",
                              data_dire = {
                                Address : {
                                    Adress : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Adress,
                                    Department : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Department,
                                    Floor : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Floor,
                                    Cp : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Cp,
                                    LatLong : coords,
                                    Client : res_cliente.data.UserId,
                                    Validado : true
                                }
                              },
                              {headers: { 'access-token': localStorage.getItem('access-token')}})
                              .then(res_dire => {

                                  if(res_dire.status === 200){
                      
                                    /**
                                     * Pedido
                                     */
              
                                    axios.post("https://roraso.herokuapp.com/Pedido/Create",
                                    data_pedido = {
                                      Date : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Date,
                                      Users : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Users,
                                      Amount : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Amount,
                                      State : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.State,
                                      Clients : res_dire.data.Client,
                                      CombosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.CombosPorPedido,
                                      ProductosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.ProductosPorPedido,
                                      Adress : res_dire.data.id,
                                      Observaciones : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.observacion
                                    }
                                    ,
                                    {headers: { 'access-token': localStorage.getItem('access-token')}})
                                        .then(res => {
              
              
                                          console.log(res)
              
                                            if(res.status === 200){

                                              arrayPedidoCompleto.splice(i, 1);

                                              localStorage.setItem('pedidoCompleto', JSON.stringify(arrayPedidoCompleto));

                                                Swal.fire(
                                                  'Correcto!',
                                                  'Se ha creado un nuevo Cliente, Direccion y Pedido',
                                                  'success'
                                                )
                                                setTimeout(function(){ 
                                                    window.location.reload();
                                                }, 3500);
                                            }
                                            else{
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Se ha producido un error al intentar crear el Pedido',
                                                    type: 'error',
                                                    confirmButtonText: 'Aceptar'
                                                })
                                                return;
                                            }
                                        })
                                        .catch(err => {
              
                                          console.log(err)
              
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'El Servidor no ha respondido al alta de Pedido',
                                                type: 'error',
                                                confirmButtonText: 'Aceptar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    })
                                    return;
                                  }
                              })
                              .catch(err => {
              
                                console.log(err)
              
                                  Swal.fire({
                                      title: 'Error!',
                                      text: 'El Servidor no ha respondido al alta de la direccion',
                                      type: 'error',
                                      confirmButtonText: 'Aceptar'
                                  })
                                  return;
                              })
              
                            }else if(res_cliente.status === 400){
                              Swal.fire({
                                title: 'Error!',
                                text: 'Se ha producido un error al intentar crear el cliente',
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                              })
                              return;
                            }
                            else{
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Se ha producido un error al intentar crear el cliente',
                                    type: 'error',
                                    confirmButtonText: 'Aceptar'
                                })
                                return;
                            }
                        }).catch(err => {
              
                          const response = err.response
                          // console.log(response.data.split("\"")[3])

                          axios.get(`https://roraso.herokuapp.com/Client/Client?Phone=${response.data.split("\"")[3]}`,
                            { headers: { 'access-token': localStorage.getItem('access-token') } })
                            .then(res => {
                              
                              axios.post("https://roraso.herokuapp.com/Client/AddAddress",
                              data_dire = {
                                Address : {
                                    Adress : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Adress,
                                    Department : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Department,
                                    Floor : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Floor,
                                    Cp : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Cp,
                                    LatLong : coords,
                                    Client : res.data.Cliente.id,
                                    Validado : true
                                }
                              },
                              {headers: { 'access-token': localStorage.getItem('access-token')}})
                              .then(res_dire => {

                                  if(res_dire.status === 200){
                      
                                    /**
                                     * Pedido
                                     */
              
                                    axios.post("https://roraso.herokuapp.com/Pedido/Create",
                                    data_pedido = {
                                      Date : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Date,
                                      Users : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Users,
                                      Amount : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Amount,
                                      State : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.State,
                                      Clients : res_dire.data.Client,
                                      CombosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.CombosPorPedido,
                                      ProductosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.ProductosPorPedido,
                                      Adress : res_dire.data.id,
                                      Observaciones : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.observacion
                                    }
                                    ,
                                    {headers: { 'access-token': localStorage.getItem('access-token')}})
                                        .then(res => {
              
              
                                          console.log(res)
              
                                            if(res.status === 200){

                                              arrayPedidoCompleto.splice(i, 1);

                                              localStorage.setItem('pedidoCompleto', JSON.stringify(arrayPedidoCompleto));

                                                Swal.fire(
                                                  'Correcto!',
                                                  'Se ha creado un nuevo Cliente, Direccion y Pedido',
                                                  'success'
                                                )
                                                setTimeout(function(){ 
                                                    window.location.reload();
                                                }, 3500);
                                            }
                                            else{
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Se ha producido un error al intentar crear el Pedido',
                                                    type: 'error',
                                                    confirmButtonText: 'Aceptar'
                                                })
                                                return;
                                            }
                                        })
                                        .catch(err => {
              
                                          console.log(err)
              
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'El Servidor no ha respondido al alta de Pedido',
                                                type: 'error',
                                                confirmButtonText: 'Aceptar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    })
                                    return;
                                  }
                              })
                              .catch(err => {
              
                                console.log(err)
              
                                  Swal.fire({
                                      title: 'Error!',
                                      text: 'El Servidor no ha respondido al alta de la direccion',
                                      type: 'error',
                                      confirmButtonText: 'Aceptar'
                                  })
                                  return;
                              })

                            })
                            .catch(err => {

                              Swal.fire({
                                title: 'Error!',
                                text: 'El Servidor no ha respondido al alta del cliente',
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                            })
                            return;

                            })
                          
                      })
                    );
                  }

                })
                .catch(function (error) {
                  Swal.fire({
                    title: 'Error!',
                    text: 'La direccion no pudo ser validada, comuniquese con el cliente',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  })
                  self.setState({
                    'coords': null,
                  });
                });
              } else {
                // Swal.fire({
                //   title: 'Error!',
                //   text: 'La direccion no pudo ser validada, comuniquese con el cliente',
                //   type: 'error',
                //   confirmButtonText: 'Aceptar'
                // })

                axios.post("https://roraso.herokuapp.com/Client/CreateClient",
                        JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_cliente,
                        {headers: { 'access-token': localStorage.getItem('access-token')}})
                        .then(res_cliente => {
                            if(res_cliente.status === 200){

                              /**
                               * Direccion
                               */
              
                              axios.post("https://roraso.herokuapp.com/Client/AddAddress",
                              data_dire = {
                                Address : {
                                    Adress : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Adress,
                                    Department : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Department,
                                    Floor : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Floor,
                                    Cp : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Cp,
                                    LatLong : "latlong",
                                    Client : res_cliente.data.UserId,
                                }
                              },
                              {headers: { 'access-token': localStorage.getItem('access-token')}})
                              .then(res_dire => {

                                  if(res_dire.status === 200){
                      
                                    /**
                                     * Pedido
                                     */
              
                                    axios.post("https://roraso.herokuapp.com/Pedido/Create",
                                    data_pedido = {
                                      Date : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Date,
                                      Users : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Users,
                                      Amount : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Amount,
                                      State : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.State,
                                      Clients : res_dire.data.Client,
                                      CombosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.CombosPorPedido,
                                      ProductosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.ProductosPorPedido,
                                      Adress : res_dire.data.id,
                                      Observaciones : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.observacion
                                    }
                                    ,
                                    {headers: { 'access-token': localStorage.getItem('access-token')}})
                                        .then(res => {
              
              
                                          console.log(res)
              
                                            if(res.status === 200){

                                              arrayPedidoCompleto.splice(i, 1);

                                              localStorage.setItem('pedidoCompleto', JSON.stringify(arrayPedidoCompleto));

                                                Swal.fire(
                                                  'Correcto!',
                                                  'Se ha creado un nuevo Cliente, Direccion y Pedido sin Validar',
                                                  'warning'
                                                )
                                                setTimeout(function(){ 
                                                    window.location.reload();
                                                }, 3500);
                                            }
                                            else{
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Se ha producido un error al intentar crear el Pedido',
                                                    type: 'error',
                                                    confirmButtonText: 'Aceptar'
                                                })
                                                return;
                                            }
                                        })
                                        .catch(err => {
              
                                          console.log(err)
              
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'El Servidor no ha respondido al alta de Pedido',
                                                type: 'error',
                                                confirmButtonText: 'Aceptar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    })
                                    return;
                                  }
                              })
                              .catch(err => {
              
                                console.log(err)
              
                                  Swal.fire({
                                      title: 'Error!',
                                      text: 'El Servidor no ha respondido al alta de la direccion',
                                      type: 'error',
                                      confirmButtonText: 'Aceptar'
                                  })
                                  return;
                              })
              
                            }else if(res_cliente.status === 400){
                              Swal.fire({
                                title: 'Error!',
                                text: 'Se ha producido un error al intentar crear el cliente',
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                              })
                              return;
                            }
                            else{
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Se ha producido un error al intentar crear el cliente',
                                    type: 'error',
                                    confirmButtonText: 'Aceptar'
                                })
                                return;
                            }
                        }).catch(err => {
              
                          const response = err.response
                          // console.log(response.data.split("\"")[3])

                          axios.get(`https://roraso.herokuapp.com/Client/Client?Phone=${response.data.split("\"")[3]}`,
                            { headers: { 'access-token': localStorage.getItem('access-token') } })
                            .then(res => {
                              
                              axios.post("https://roraso.herokuapp.com/Client/AddAddress",
                              data_dire = {
                                Address : {
                                    Adress : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Adress,
                                    Department : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Department,
                                    Floor : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Floor,
                                    Cp : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].datos_direccion.Cp,
                                    LatLong : "latlong",
                                    Client : res.data.Cliente.id
                                }
                              },
                              {headers: { 'access-token': localStorage.getItem('access-token')}})
                              .then(res_dire => {

                                  if(res_dire.status === 200){
                      
                                    /**
                                     * Pedido
                                     */
              
                                    axios.post("https://roraso.herokuapp.com/Pedido/Create",
                                    data_pedido = {
                                      Date : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Date,
                                      Users : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Users,
                                      Amount : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.Amount,
                                      State : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.State,
                                      Clients : res_dire.data.Client,
                                      CombosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.CombosPorPedido,
                                      ProductosPorPedido : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.ProductosPorPedido,
                                      Adress : res_dire.data.id,
                                      Observaciones : JSON.parse(localStorage.getItem('pedidoCompleto'))[i].pedido.observacion
                                    }
                                    ,
                                    {headers: { 'access-token': localStorage.getItem('access-token')}})
                                        .then(res => {
              
              
                                          console.log(res)
              
                                            if(res.status === 200){

                                              arrayPedidoCompleto.splice(i, 1);

                                              localStorage.setItem('pedidoCompleto', JSON.stringify(arrayPedidoCompleto));

                                                Swal.fire(
                                                  'Correcto!',
                                                  'Se ha creado un nuevo Cliente, Direccion y Pedido',
                                                  'success'
                                                )
                                                setTimeout(function(){ 
                                                    window.location.reload();
                                                }, 3500);
                                            }
                                            else{
                                                Swal.fire({
                                                    title: 'Error!',
                                                    text: 'Se ha producido un error al intentar crear el Pedido',
                                                    type: 'error',
                                                    confirmButtonText: 'Aceptar'
                                                })
                                                return;
                                            }
                                        })
                                        .catch(err => {
              
                                          console.log(err)
              
                                            Swal.fire({
                                                title: 'Error!',
                                                text: 'El Servidor no ha respondido al alta de Pedido',
                                                type: 'error',
                                                confirmButtonText: 'Aceptar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    })
                                    return;
                                  }
                              })
                              .catch(err => {
              
                                console.log(err)
              
                                  Swal.fire({
                                      title: 'Error!',
                                      text: 'El Servidor no ha respondido al alta de la direccion',
                                      type: 'error',
                                      confirmButtonText: 'Aceptar'
                                  })
                                  return;
                              })

                            })
                            .catch(err => {

                              Swal.fire({
                                title: 'Error!',
                                text: 'El Servidor no ha respondido al alta del cliente',
                                type: 'error',
                                confirmButtonText: 'Aceptar'
                            })
                            return;

                            })
                          
                      })
              }
          })
          .catch(function (error) {
            Swal.fire({
              title: 'Error!',
              text: 'Error de localizacion de domicilio, intentelo nuevamente',
              type: 'error',
              confirmButtonText: 'Aceptar'
            })
          });

          let countDirErr = localStorage.getItem('direccionesErroneas')

          countDirErr++

          localStorage.setItem('direccionesErroneas', countDirErr)
        }
  
        Swal.fire({
          title: 'Se esta procesando las solicitudes',
          text: 'Aguarde por favor',
          type: 'success',
          showConfirmButton: false
        })

      } 
      

    render() {
        return (
            <div>
                <Button style={{height: 50, width: 300, fontSize: 13}} color="inherit"  onClick={this.enviarSolicitudesEncoladasCompletas}>Enviar Solicitudes Encoladas</Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  usuario : state.usuario.usuario
});


export default connect(mapStateToProps, {
  currentUser
})(EnviarPedidosOff);;
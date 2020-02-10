import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import roraso from '../../assets/images/roraso.png';
import Drawer from '@material-ui/core/Drawer';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import BreadcumbMenu from './Breadcumb'

//CSS
import styles from '../../assets/css/Index/IndexMain.jsx';
import Swal from 'sweetalert2'

class Header extends React.Component {
    constructor(props, context) {
      super(props, context);
      const { classes } = props;
      this.ProfileOpen = this.ProfileOpen.bind(this)
      this.ProfileClose = this.ProfileClose.bind(this)
      this.state = {
        profile:false,
        redirectLogOut: false,
        redirectHome: false,
        redirectChangePassword : false,
        redirectSection : false,
        redirectUrlSection : ''
      }
    }
    
    

  slide() {
    window.setInterval(function () {
      // console.log("Intervalo de 3 Seg")
      axios.get('https://roraso.herokuapp.com/User/CurrentUser',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
          .then(res => {
              if(localStorage.getItem('status') === 'offline'){
                localStorage.setItem('status', 'online');
                Swal.fire({
                    title: 'Se volvio a tener conexion',
                    text: 'Entrando en modo Online',
                    type: 'success',
                })
                return window.location.href = "/";
              }
          })
          .catch(err => {
              if(localStorage.getItem('status') === 'online'){
                localStorage.setItem('status', 'offline');
                Swal.fire({
                    title: 'No se detecto conexion',
                    text: 'Entrando en modo Offline',
                    type: 'error',
                    confirmButtonText: 'Reintentar'
                })
                return;
              }
          })

    }, 7000);
  }
    
  componentWillMount(){
    this.slide();

    if(localStorage.getItem('enviarPedido') === null){
      localStorage.setItem('enviarPedido', JSON.stringify([]))
    }else{

    }

    if(localStorage.getItem('pedidoCompleto') === null){
      localStorage.setItem('pedidoCompleto', JSON.stringify([]))
    }else{

    }

    if(localStorage.getItem('pedidoSemiCompleto') === null){
      localStorage.setItem('pedidoSemiCompleto', JSON.stringify([]))
    }else{

    }

    if(localStorage.getItem('DireccionRestaurant') === null){
      localStorage.setItem('DireccionRestaurant', '')
    }else{

    }

    if(localStorage.getItem('direccionesErroneas') === null){
      localStorage.setItem('direccionesErroneas', 0)
    }else{

    }
    
    axios.get('https://roraso.herokuapp.com/User/CurrentUser',
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
            if(localStorage.getItem('status') === 'offline'){
              localStorage.setItem('status', 'online');
              Swal.fire({
                  title: 'Se volvio a tener conexion',
                  text: 'Entrando en modo Online',
                  type: 'success',
              })
              return;
            }
        })
        .catch(err => {
            if(localStorage.getItem('status') === 'online'){
              localStorage.setItem('status', 'offline');
              Swal.fire({
                  title: 'No se detecto conexion',
                  text: 'Entrando en modo Offline',
                  type: 'error',
                  confirmButtonText: 'Reintentar'
              })
              return;
            }
        })
    // console.log(this.props);
    if(localStorage.getItem('status') === 'online'){
      this.savePedidos();
      this.saveUsuario();
      this.saveCategories();
      this.saveProducts();
      this.saveClients();
      this.saveStates();
      this.saveCombos();
    }else{
      return;
    }
  }

  returnPreviusPage(){
    window.history.go(-1)
    return false;
  }

    saveCategories = async () => {

      let categories = [];

      await axios.get('https://roraso.herokuapp.com/Category/Categories',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(cat => {
            categories.push(cat)
          })

          localStorage.setItem('categorias', JSON.stringify(categories))

        }).catch(err => {
          console.log(err);
        })

    }

    saveUsuario = async () => {

      if(this.props.auth.user == undefined) return null;

      localStorage.setItem('usuario', JSON.stringify(this.props.auth.user.Id))
    }

    saveProducts = async () => {

      let products = [];

      await axios.get('https://roraso.herokuapp.com/Product/Products',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(prod => {
            products.push(prod)
          })

          localStorage.setItem('productos', JSON.stringify(products))

        }).catch(err => {
          console.log(err);
        })

    }

    saveCombos = async () => {

      let combos = [];

      await axios.get('https://roraso.herokuapp.com/Offerts/Offerts',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(combo => {
            combos.push(combo)
          })

          localStorage.setItem('combos', JSON.stringify(combos))

        }).catch(err => {
          console.log(err);
        })

      // return 
    }

    savePedidos = async () => {

      let pedidos = [];

      if(localStorage.getItem('pedidos')){

      const serializedPedido = localStorage.getItem('pedidos');
      var deserializedPedido = JSON.parse(serializedPedido);

      }else{

        localStorage.setItem('pedidos','[]');

      }

      await axios.get('https://roraso.herokuapp.com/Pedido/Pedidos',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(pedido => {
            pedidos.push(pedido)
          })

          localStorage.setItem('pedidos', JSON.stringify(pedidos))

          if(JSON.parse(localStorage.getItem('pedidoSemiCompleto')).length > 0 || JSON.parse(localStorage.getItem('pedidoCompleto')).length > 0 || JSON.parse(localStorage.getItem('enviarPedido')).length > 0){

            if(localStorage.getItem('status') === 'offline'){
              
              Swal.fire({
                title: 'Solicitudes Encoladas',
                text: "Quedan pendientes solicitudes a confirmar, ¿Desea enviarlas ahora?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Enviarlas ahora!'
              }).then((result) => {
                if (result.value) {
                  this.enviarSolicitudesEncoladasCompletas();
                }else{
                  return;
                }
              })

            }else{
              return;
            }

          }else{
            return;
          }


      }).catch(err => {
        console.log(err);
      })

    }


    saveClients = async () => {

      let clients = [];

      await axios.get('https://roraso.herokuapp.com/Client/Clients',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(cli => {
            clients.push(cli)
          })

          localStorage.setItem('clientes', JSON.stringify(clients))

        }).catch(err => {
          // console.log(err);
        })

      // return 
    }

    saveStates = async () => {

      let states = [];

      await axios.get('https://roraso.herokuapp.com/Estado/Estados',
      { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {
          res.data.map(sta => {
            states.push(sta)
          })

          localStorage.setItem('estados', JSON.stringify(states))

        }).catch(err => {
          console.log(err);
        })

      // return 
    }
      
      ProfileClose(){
        this.setState({ profile: false})
      }
      
      ProfileOpen(){
        this.setState({ profile : true})
      }
      
      setRedirectToHome = () => {
        this.setState({
          redirectHome: true
        })
      }
      
      ToHome(){
        if (this.state.redirectHome) {
          return <Redirect to='/' />
        }
      }

      /**
       * 
       * Agregar pedidos offline, todos los campos
       */

      enviarSolicitudesEncoladasCompletas = async () => {

        let arrayPedido = JSON.parse(localStorage.getItem('enviarPedido'));

        for (let i = 0; i < JSON.parse(localStorage.getItem('enviarPedido')).length; i++) {


        let data = {
          Date : JSON.parse(localStorage.getItem('enviarPedido'))[i].date,
          Users : JSON.parse(localStorage.getItem('enviarPedido'))[i].user,
          Amount : JSON.parse(localStorage.getItem('enviarPedido'))[i].amount,
          State : JSON.parse(localStorage.getItem('enviarPedido'))[i].state,
          Clients : JSON.parse(localStorage.getItem('enviarPedido'))[i].client,
          CombosPorPedido : JSON.parse(localStorage.getItem('enviarPedido'))[i].combo,
          ProductosPorPedido : JSON.parse(localStorage.getItem('enviarPedido'))[i].product,
          Adress : JSON.parse(localStorage.getItem('enviarPedido'))[i].address
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
                    confirmButtonText: 'Reintentar'
                })
                return;
            }
        })

      }

      // localStorage.setItem('enviarPedido', JSON.stringify([]))

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
                    //   confirmButtonText: 'Reintentar'
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
                                      Adress : res_dire.data.id
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
                                                    confirmButtonText: 'Reintentar'
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
                                                confirmButtonText: 'Reintentar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Reintentar'
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
                                      confirmButtonText: 'Reintentar'
                                  })
                                  return;
                              })

                      
                      
                      // Swal.fire({
                      //   title: 'Error! La direccion no pudo ser validada',
                      //   text: 'Comuniquese con el cliente',
                      //   type: 'error',
                      //   confirmButtonText: 'Reintentar'
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
                                      Adress : res_dire.data.id
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
                                                    confirmButtonText: 'Reintentar'
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
                                                confirmButtonText: 'Reintentar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Reintentar'
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
                                      confirmButtonText: 'Reintentar'
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
                    confirmButtonText: 'Reintentar'
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
              confirmButtonText: 'Reintentar'
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
                        confirmButtonText: 'Reintentar'
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
                                      Adress : res_dire.data.id
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
                                                    confirmButtonText: 'Reintentar'
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
                                                confirmButtonText: 'Reintentar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Reintentar'
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
                                      confirmButtonText: 'Reintentar'
                                  })
                                  return;
                              })
              
                            }else if(res_cliente.status === 400){
                              Swal.fire({
                                title: 'Error!',
                                text: 'Se ha producido un error al intentar crear el cliente',
                                type: 'error',
                                confirmButtonText: 'Reintentar'
                              })
                              return;
                            }
                            else{
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Se ha producido un error al intentar crear el cliente',
                                    type: 'error',
                                    confirmButtonText: 'Reintentar'
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
                                      Adress : res_dire.data.id
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
                                                    confirmButtonText: 'Reintentar'
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
                                                confirmButtonText: 'Reintentar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Reintentar'
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
                                      confirmButtonText: 'Reintentar'
                                  })
                                  return;
                              })

                            })
                            .catch(err => {

                              Swal.fire({
                                title: 'Error!',
                                text: 'El Servidor no ha respondido al alta del cliente',
                                type: 'error',
                                confirmButtonText: 'Reintentar'
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
                    confirmButtonText: 'Reintentar'
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
                //   confirmButtonText: 'Reintentar'
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
                                      Adress : res_dire.data.id
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
                                                    confirmButtonText: 'Reintentar'
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
                                                confirmButtonText: 'Reintentar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Reintentar'
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
                                      confirmButtonText: 'Reintentar'
                                  })
                                  return;
                              })
              
                            }else if(res_cliente.status === 400){
                              Swal.fire({
                                title: 'Error!',
                                text: 'Se ha producido un error al intentar crear el cliente',
                                type: 'error',
                                confirmButtonText: 'Reintentar'
                              })
                              return;
                            }
                            else{
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Se ha producido un error al intentar crear el cliente',
                                    type: 'error',
                                    confirmButtonText: 'Reintentar'
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
                                      Adress : res_dire.data.id
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
                                                    confirmButtonText: 'Reintentar'
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
                                                confirmButtonText: 'Reintentar'
                                            })
                                            return;
                                        })
              
                                  }else{
              
                                    Swal.fire({
                                        title: 'Error!',
                                        text: 'Se ha producido un error al intentar crear la direccion',
                                        type: 'error',
                                        confirmButtonText: 'Reintentar'
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
                                      confirmButtonText: 'Reintentar'
                                  })
                                  return;
                              })

                            })
                            .catch(err => {

                              Swal.fire({
                                title: 'Error!',
                                text: 'El Servidor no ha respondido al alta del cliente',
                                type: 'error',
                                confirmButtonText: 'Reintentar'
                            })
                            return;

                            })
                          
                      })
              }
          })
          .catch(function (error) {
            Swal.fire({
              title: 'Error!',
              text: 'La direccion no pudo ser validada, comuniquese con el cliente',
              type: 'error',
              confirmButtonText: 'Reintentar'
            })
          });

          let countDirErr = localStorage.getItem('direccionesErroneas')

          countDirErr++

          localStorage.setItem('direccionesErroneas', countDirErr)
        }
  
        Swal.fire(
          'Se esta procesando las solicitudes',
          'Aguarde por favor',
          'success'
        )

      }

    
    setRedirectChangePassword = () => {
      this.setState({
        redirectChangePassword: true
      })
    }
    
    ToChangePassword(){
      if (this.state.redirectChangePassword) {
        return <Redirect to='/cambio-clave' />
      }
    }
    
    setRedirectLogOut = () => {
      this.setState({
        redirectLogOut: true
      })
    }
    
    SignOut(){
      // console.log(this.props)
      if (this.state.redirectLogOut) {
        localStorage.removeItem("access-token");
        // localStorage.removeItem("categorias");
        localStorage.removeItem("enviarPedido");
        localStorage.removeItem("pedidoCompleto");
        localStorage.removeItem("pedidoSemiCompleto");
        localStorage.removeItem("usuario");
        // localStorage.removeItem("pedidos");
        // localStorage.removeItem("productos");
        return <Redirect to='/login' />
      }
    }
    
    statusConnection = (classes) => {
      if(localStorage.getItem('status') === 'online'){
        return <Button className={classes.buttonSizes} color="inherit" style={{ background: "linear-gradient(to left, #16DB73 0%, #85ECB6 100%)", color: '#f9f9f9' }}>En Linea</Button>
      }else{
        return <Button className={classes.buttonSizes} color="inherit" style={{ background: "linear-gradient(to left, #F193AD 0%, #EE225A 100%)", color: '#f9f9f9' }}>Fuera de Linea</Button>
      }
    }

    buttonLogged(classes){
      switch (this.props.auth.logged) {
        case null:
          return;
          case true:
            return <Button className={classes.buttonSizes} onClick= {this.setRedirectLogOut} color="inherit">Cerrar Sesión</Button>
            case false:
              return <Button className={classes.buttonSizes} color="inherit">Iniciar Sesión</Button>
            }
          };
          
          profileMenu(props){
            const { classes } = props;
            // console.log(this.props.auth.user.Name);
            return(
              <Drawer align='center' anchor="right" open={this.state.profile} onClose={this.ProfileClose} id="panel">
                  <img src={roraso} className={classes.profileAvatar}  />
                  <p color="inherit" style={{textAlign: "center", marginTop: '40px', marginBottom: '5px'}} className={classes.welcomeText}>Hola { this.props.auth.user === undefined ? " " : this.props.auth.user.Name }</p>
                  <p color="inherit" style={{textAlign: "center", marginTop: '20px', marginBottom: '20px'}} className={classes.welcomeText}>Panel de Configuracion</p>
                      <Button className={classes.buttonSizes} color="inherit"  onClick= {this.setRedirectToHome}>Inicio</Button>
                  {this.props.auth.logged &&   <Button className={classes.buttonSizes} color="inherit"  onClick= {this.setRedirectChangePassword}>Cambiar Contraseña</Button>}
                  {this.props.auth.logged &&   <Button className={classes.buttonSizes} color="inherit"  onClick= {this.enviarSolicitudesEncoladasCompletas}>Enviar Solicitudes Encoladas</Button>}
                  {this.buttonLogged(classes)}
                  {this.statusConnection(classes)}
                  <Button  color="inherit" onClick= {this.ProfileClose} className={classes.bottomClose} >Cerrar</Button>
                  {this.SignOut()}
                  {this.ToChangePassword()}
                  {this.ToHome()}
              </Drawer>
        )
      }
      
      ImageAvatars(props) {
        const { classes } = props;
        return (
          <Button color="inherit" onClick= {this.ProfileOpen} >
            <MenuIcon />
          </Button>
        );
      }
      
      content(props){

        const { classes } = props;
        return(
          <div className={classes.root}>
          <AppBar position="sticky" className={classes.menu}>
            <Toolbar>

              <BreadcumbMenu/>

              <Typography variant="h4" style={{textAlign: "center"}} color="inherit" className={classes.grow}>
              {this.props.titulo}
              </Typography>
              {this.ImageAvatars(this.props)}
            </Toolbar>
            {this.profileMenu(this.props)}
          </AppBar>

        </div>
        )
      }
      
      
      render() {
        
        return (
          <div>
        {this.content(this.props)}
    </div>
  );
}

}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
  }; 

export default withStyles(styles)(connect(mapStateToProps,actions)(Header));
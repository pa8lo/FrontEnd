import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import * as actions from "../../actions";
import roraso from "../../assets/images/roraso.png";
import Drawer from "@material-ui/core/Drawer";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import BreadcumbMenu from "./Breadcumb";
import BotonEnvioPedidoOff from "./BotonEnvioPedidoOff";

//CSS
import styles from "../../assets/css/Index/IndexMain.jsx";
import Swal from "sweetalert2";

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    const { classes } = props;
    this.ProfileOpen = this.ProfileOpen.bind(this);
    this.ProfileClose = this.ProfileClose.bind(this);
    this.state = {
      profile: false,
      redirectLogOut: false,
      redirectHome: false,
      redirectChangePassword: false,
      redirectSection: false,
      redirectUrlSection: "",
    };
  }

  slide(props) {
    // let properties = props
    window.setInterval(function () {
      // console.log("Intervalo de 7 Seg")
      axios
        .get("https://roraso.herokuapp.com/User/CurrentUser", {
          headers: { "access-token": localStorage.getItem("access-token") },
        })
        .then((res) => {
          if (localStorage.getItem("status") === "offline") {
            localStorage.setItem("status", "online");
            Swal.fire({
              title: "Se volvio a tener conexion",
              text: "Entrando en modo Online",
              type: "success",
            });
            props.history.push("/");
          }
        })
        .catch((err) => {
          // debugger;
          if (err.response.status === 403) {
            alert(err.response.data);
            localStorage.removeItem("access-token");
            window.location.replace("/login");
          } else {
            return;
          }

          if (localStorage.getItem("status") === "online") {
            localStorage.setItem("status", "offline");
            Swal.fire({
              title: "No se detecto conexion",
              text: "Entrando en modo Offline",
              type: "error",
              confirmButtonText: "Aceptar",
            });
            props.history.push("/");
          }
        });
    }, 7000);
  }

  componentWillMount() {
    this.slide(this.props);

    // this.props.currentUser();

    if (localStorage.getItem("enviarPedido") === null) {
      localStorage.setItem("enviarPedido", JSON.stringify([]));
    } else {
    }

    if (localStorage.getItem("pedidoCompleto") === null) {
      localStorage.setItem("pedidoCompleto", JSON.stringify([]));
    } else {
    }

    if (localStorage.getItem("pedidoSemiCompleto") === null) {
      localStorage.setItem("pedidoSemiCompleto", JSON.stringify([]));
    } else {
    }

    if (localStorage.getItem("pedidoCambioEstado") === null) {
      localStorage.setItem("pedidoCambioEstado", JSON.stringify([]));
    } else {
    }

    if (localStorage.getItem("DireccionRestaurant") === null) {
      localStorage.setItem("DireccionRestaurant", "");
    } else {
    }

    if (localStorage.getItem("direccionesErroneas") === null) {
      localStorage.setItem("direccionesErroneas", 0);
    } else {
    }

    if (localStorage.getItem("pedidos") === null) {
      this.savePedidos();
      this.saveUsuario();
      this.saveCategories();
      this.saveProducts();
      this.saveClients();
      this.saveStates();
      this.saveCombos();
    } else {
    }

    axios
      .get("https://roraso.herokuapp.com/User/CurrentUser", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        if (localStorage.getItem("status") === "offline") {
          localStorage.setItem("status", "online");
          Swal.fire({
            title: "Se volvio a tener conexion",
            text: "Entrando en modo Online",
            type: "success",
          });
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          alert(err.response.data);
          localStorage.removeItem("access-token");

          window.location.replace("/login");
        } else {
          return;
        }
        if (localStorage.getItem("status") === "online") {
          localStorage.setItem("status", "offline");
          Swal.fire({
            title: "No se detecto conexion",
            text: "Entrando en modo Offline",
            type: "error",
            confirmButtonText: "Aceptar",
          });
          this.props.history.push("/");
        }
      });
    // console.log(this.props);
    if (localStorage.getItem("status") === "online") {
      this.savePedidos();
      this.saveUsuario();
      this.saveCategories();
      this.saveProducts();
      this.saveClients();
      this.saveStates();
      this.saveCombos();
      this.setLocationMap();
    } else {
      return;
    }
  }

  setLocationMap = async () => {
    let direccion_local;

    await axios
      .get("https://roraso.herokuapp.com/Local", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        if (res.status === 200) {
          direccion_local = res.data[0].LatLong;
        } else {
          throw new Error("Se han enviado datos erroneos");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // localStorage.getItem("DireccionRestaurant") === "" &&

    if (
      direccion_local === "" ||
      direccion_local === null ||
      direccion_local === undefined
    ) {
      await axios
        .put(
          "https://roraso.herokuapp.com/Local",
          (this.data = {
            Local: {
              Adress: "default address",
              LatLong: "0;0",
            },
          }),
          {
            headers: { "access-token": localStorage.getItem("access-token") },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("DireccionRestaurant", "0;0");
          } else {
            localStorage.setItem("DireccionRestaurant", "0;0");
          }
        })
        .catch((err) => {
          localStorage.setItem("DireccionRestaurant", "0;0");
        });
    } else {
      localStorage.setItem("DireccionRestaurant", direccion_local);
    }
  };

  returnPreviusPage() {
    window.history.go(-1);
    return false;
  }

  saveCategories = async () => {
    let categories = [];

    await axios
      .get("https://roraso.herokuapp.com/Category/Categories", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        res.data.map((cat) => {
          categories.push(cat);
        });

        localStorage.setItem("categorias", JSON.stringify(categories));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveUsuario = async () => {
    if (this.props.auth.user == undefined) return null;

    localStorage.setItem("usuario", JSON.stringify(this.props.auth.user.Id));
  };

  saveProducts = async () => {
    let products = [];

    await axios
      .get("https://roraso.herokuapp.com/Product/Products", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        res.data.map((prod) => {
          products.push(prod);
        });

        localStorage.setItem("productos", JSON.stringify(products));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveCombos = async () => {
    let combos = [];

    await axios
      .get("https://roraso.herokuapp.com/Offerts/Offerts", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        res.data.map((combo) => {
          combos.push(combo);
        });

        localStorage.setItem("combos", JSON.stringify(combos));
      })
      .catch((err) => {
        console.log(err);
      });

    // return
  };

  savePedidos = async () => {
    let pedidos = [];

    if (localStorage.getItem("pedidos")) {
      const serializedPedido = localStorage.getItem("pedidos");
      var deserializedPedido = JSON.parse(serializedPedido);
    } else {
      localStorage.setItem("pedidos", "[]");
    }

    await axios
      .get("https://roraso.herokuapp.com/Pedido/Pedidos", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        res.data.map((pedido) => {
          pedidos.push(pedido);
        });

        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        if (
          JSON.parse(localStorage.getItem("pedidoSemiCompleto")).length > 0 ||
          JSON.parse(localStorage.getItem("pedidoCompleto")).length > 0 ||
          JSON.parse(localStorage.getItem("enviarPedido")).length > 0 ||
          JSON.parse(localStorage.getItem("pedidoCambioEstado")).length > 0
        ) {
          if (localStorage.getItem("status") === "offline") {
            Swal.fire({
              title: "Solicitudes Encoladas",
              text:
                "Quedan pendientes solicitudes a confirmar, ¿Desea enviarlas ahora?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Enviarlas ahora!",
            }).then((result) => {
              if (result.value) {
                this.enviarSolicitudesEncoladasCompletas();
              } else {
                return;
              }
            });
          } else {
            return;
          }
        } else {
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  saveClients = async () => {
    let clients = [];

    await axios
      .get("https://roraso.herokuapp.com/Client/Clients", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        res.data.map((cli) => {
          clients.push(cli);
        });

        localStorage.setItem("clientes", JSON.stringify(clients));
      })
      .catch((err) => {
        // console.log(err);
      });

    // return
  };

  saveStates = async () => {
    let states = [];

    await axios
      .get("https://roraso.herokuapp.com/Estado/Estados", {
        headers: { "access-token": localStorage.getItem("access-token") },
      })
      .then((res) => {
        res.data.map((sta) => {
          states.push(sta);
        });

        localStorage.setItem("estados", JSON.stringify(states));
      })
      .catch((err) => {
        console.log(err);
      });

    // return
  };

  ProfileClose() {
    this.setState({ profile: false });
  }

  ProfileOpen() {
    this.setState({ profile: true });
  }

  setRedirectToHome = () => {
    this.setState({
      redirectHome: true,
    });
  };

  ToHome() {
    if (this.state.redirectHome) {
      return <Redirect to="/" />;
    }
  }

  /**
   *
   * Agregar pedidos offline, todos los campos
   */

  setRedirectChangePassword = () => {
    this.setState({
      redirectChangePassword: true,
    });
  };

  ToChangePassword() {
    if (this.state.redirectChangePassword) {
      return <Redirect to="/cambio-clave" />;
    }
  }

  setRedirectLogOut = () => {
    this.setState({ profile: false });
    Swal.fire({
      title: "¿Estas seguro que desea cerrar sesion?",
      text: "Estas a punto de cerrar la sesion actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.setState({
          redirectLogOut: true,
        });
        window.location.reload();
      }
    });
  };

  SignOut() {
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
      return <Redirect to="/login" />;
    }
  }

  statusConnection = (classes) => {
    if (localStorage.getItem("status") === "online") {
      return (
        <Button
          className={classes.buttonSizes}
          color="inherit"
          style={{
            background: "linear-gradient(to left, #16DB73 0%, #85ECB6 100%)",
            color: "#f9f9f9",
          }}
        >
          En Linea
        </Button>
      );
    } else {
      return (
        <Button
          className={classes.buttonSizes}
          color="inherit"
          style={{
            background: "linear-gradient(to left, #F193AD 0%, #EE225A 100%)",
            color: "#f9f9f9",
          }}
        >
          Fuera de Linea
        </Button>
      );
    }
  };

  buttonLogged(classes) {
    switch (this.props.auth.logged) {
      case null:
        return;
      case true:
        return (
          <Button
            className={classes.buttonSizes}
            onClick={this.setRedirectLogOut}
            color="inherit"
          >
            Cerrar Sesión
          </Button>
        );
      case false:
        return (
          <Button className={classes.buttonSizes} color="inherit">
            Iniciar Sesión
          </Button>
        );
    }
  }

  profileMenu(props) {
    if (
      this.props.usuario.Authorizations == undefined ||
      this.props.usuario.Authorizations == "undefined"
    )
      return;

    const { classes } = props;
    // console.log(this.props.auth.user.Name);
    return (
      <Drawer
        align="center"
        anchor="right"
        open={this.state.profile}
        onClose={this.ProfileClose}
        id="panel"
      >
        <img src={roraso} className={classes.profileAvatar} />
        <p
          color="inherit"
          style={{
            textAlign: "center",
            marginTop: "40px",
            marginBottom: "5px",
          }}
          className={classes.welcomeText}
        >
          Hola{" "}
          {this.props.auth.user === undefined ? " " : this.props.auth.user.Name}
        </p>
        <p
          color="inherit"
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          className={classes.welcomeText}
        >
          Panel de Configuracion
        </p>
        <Button
          className={classes.buttonSizes}
          color="inherit"
          onClick={this.setRedirectToHome}
        >
          Inicio
        </Button>
        {localStorage.getItem("status") === "online" && (
          <Button
            className={classes.buttonSizes}
            color="inherit"
            onClick={this.setRedirectChangePassword}
          >
            Cambiar Contraseña
          </Button>
        )}
        {localStorage.getItem("status") === "online" &&
          this.props.usuario.Authorizations.filter(
            (permiso) => permiso.id == 20
          ).length > 0 && <BotonEnvioPedidoOff />}
        {this.buttonLogged(classes)}
        {this.statusConnection(classes)}
        <Button
          color="inherit"
          onClick={this.ProfileClose}
          className={classes.bottomClose}
        >
          Cerrar
        </Button>
        {this.SignOut()}
        {this.ToChangePassword()}
        {this.ToHome()}
      </Drawer>
    );
  }

  ImageAvatars(props) {
    const { classes } = props;
    return (
      <Button color="inherit" onClick={this.ProfileOpen}>
        <MenuIcon />
      </Button>
    );
  }

  content(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <AppBar position="sticky" className={classes.menu}>
          <Toolbar>
            <BreadcumbMenu />

            <Typography
              variant="h4"
              style={{ textAlign: "center" }}
              color="inherit"
              className={classes.grow}
            >
              {this.props.titulo}
            </Typography>
            {this.ImageAvatars(this.props)}
          </Toolbar>
          {this.profileMenu(this.props)}
        </AppBar>
      </div>
    );
  }

  render() {
    // const { match, location, history } = this.props;

    // console.log(this.props.history)

    return <div>{this.content(this.props)}</div>;
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    usuario: state.usuario.usuario,
  };
}

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, actions)(Header))
);

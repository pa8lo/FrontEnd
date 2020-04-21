import React, { Component } from "react";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { mostrarEstados } from "../../actions/estadosAction";
import { eliminarEstado } from "../../actions/estadosAction";
import { currentUser } from "../../actions/usuarioAction";

import SortableTbl from "../react-sort-search-table/src/SortableTbl";

//CSS
import { css } from "@emotion/core";
import Swal from "sweetalert2";

// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
  maxWidth: "100%",
  minWidth: "100%",
  paddingTop: 3,
};

const buttonStyle = {
  marginLeft: 10,
  width: 80,
};

let col = ["Description", "Actions"];
let tHead = ["Descripción", "Acciones"];

class ActionEstadoComponent extends Component {
  eliminarEstado = () => {
    Swal.fire({
      title: "¿Estas seguro que desea eliminar?",
      text: "Estas a punto de eliminar un estado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.props.eliminarEstado(this.props.rowData.id);
      }
    });
  };

  render() {
    if (this.props.Permisos.length === 0)
      return (
        <div style={{ marginTop: "40px", marginBottom: "40px" }}>
          <DotLoader
            css={override}
            size={50} // or 150px
            color={"#4D4D4D"}
            loading={this.state.loading}
          />
        </div>
      );

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;

    console.log(this.props);

    return (
      <td style={columnButtonStyle}>
        {permisos.filter((permiso) => permiso.id == 21).length > 0 ? (
          <Link
            style={buttonStyle}
            to={{
              pathname: `/estados/${id}`,
              state: this.props.rowData,
            }}
            className="btn btn-primary"
          >
            Ver
          </Link>
        ) : (
          <Link style={buttonStyle} disabled to="#" className="btn btn-primary">
            Ver
          </Link>
        )}

        {console.log(this.props.tblData[0].id)}
        {permisos.filter((permiso) => permiso.id == 22).length > 0 &&
        id !== 5 &&
        id !== 4 &&
        id !== 3 &&
        id !== 2 &&
        id !== 1 ? (
          <Link
            style={buttonStyle}
            to={{
              pathname: `/estados/editar-estado/${id}`,
              state: this.props.rowData,
            }}
            className="btn btn-warning"
          >
            Editar
          </Link>
        ) : (
          <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
            Editar
          </Link>
        )}

        {permisos.filter((permiso) => permiso.id == 23).length > 0 &&
        id !== 5 &&
        id !== 4 &&
        id !== 3 &&
        id !== 2 &&
        id !== 1 ? (
          <button
            style={buttonStyle}
            onClick={this.eliminarEstado}
            type="button"
            className="btn btn-danger"
          >
            Borrar
          </button>
        ) : (
          <button
            style={buttonStyle}
            disabled
            type="button"
            className="btn btn-danger"
          >
            Borrar
          </button>
        )}
      </td>
    );
  }
}

class ListaEstados extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.mostrarEstados();
    this.props.currentUser();
  }

  render() {
    const estados = this.props.estados;
    const loaded = this.props.loaded || false;
    if (estados.length === 0) {
      if (estados.length === 0 && !loaded) {
        return (
          <div style={{ marginTop: "40px", marginBottom: "40px" }}>
            <DotLoader
              css={override}
              size={50} // or 150px
              color={"#4D4D4D"}
              loading={this.state.loading}
            />
          </div>
        );
      } else {
        return (
          <div>
            <h2
              align="center"
              style={{ marginTop: "40px", marginBottom: "40px" }}
            >
              No hay datos
            </h2>
          </div>
        );
      }
    } else {
      return (
        <SortableTbl
          tblData={estados.sort(function (a, b) {
            return b.id - a.id;
          })}
          tHead={tHead}
          Permisos={this.props.usuario}
          customTd={[{ custd: ActionEstadoComponent, keyItem: "Actions" }]}
          dKey={col}
          search={true}
          defaultCSS={true}
          eliminarEstado={this.props.eliminarEstado}
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  estados: state.estados.estados,
  loaded: state.categorias.loaded,
  usuario: state.usuario.usuario,
});

export default connect(mapStateToProps, {
  mostrarEstados,
  eliminarEstado,
  currentUser,
})(ListaEstados);

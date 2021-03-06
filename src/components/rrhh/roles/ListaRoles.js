import React, { Component } from "react";
import { Link } from "react-router-dom";

import SortableTbl from "../../react-sort-search-table/src/SortableTbl";

//Redux
import { connect } from "react-redux";
import { mostrarRoles } from "../../../actions/rolesAction";
import { eliminarRol } from "../../../actions/rolesAction";
import { currentUser } from "../../../actions/usuarioAction";

//CSS
import Swal from "sweetalert2";
import { css } from "@emotion/core";
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

let col = ["Name", "Description", "Actions"];
let tHead = ["Nombre", "Detalle", "Acciones"];

class ActionRolComponent extends React.Component {
  eliminarRol = () => {
    const { id } = this.props.rowData;

    Swal.fire({
      title: "¿Estás seguro que desea eliminar?",
      text: "Estas a punto de eliminar un rol",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title:
            "El rol de estar vinculado a un usuario se eliminara y se colocaran permisos particulares a este. Esto va a poder ser modificado asignando otro rol",
          text:
            "Esta a punto de borrar el rol y utilizar permisos individuales",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.value) {
            this.props.eliminarRol(id);
          }
        });
      }
    });
  };

  render() {
    if (this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;

    return (
      <td style={columnButtonStyle}>
        {permisos.filter((permiso) => permiso.id == 10).length > 0 ? (
          <Link
            style={buttonStyle}
            to={{
              pathname: `/rrhh/roles/${id}`,
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

        {permisos.filter((permiso) => permiso.id == 11).length > 0 ? (
          <Link
            style={buttonStyle}
            to={{
              pathname: `/rrhh/editar-roles/${id}`,
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

        {permisos.filter((permiso) => permiso.id == 12).length > 0 ? (
          <button
            style={buttonStyle}
            onClick={this.eliminarRol}
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

class ListaRoles extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.mostrarRoles();
    this.props.currentUser();
  }

  render() {
    const roles = this.props.roles;

    if (roles.length === 0) {
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
        <SortableTbl
          tblData={roles.sort(function (a, b) {
            return b.id - a.id;
          })}
          tHead={tHead}
          Permisos={this.props.usuario}
          customTd={[{ custd: ActionRolComponent, keyItem: "Actions" }]}
          dKey={col}
          search={true}
          defaultCSS={true}
          eliminarRol={this.props.eliminarRol}
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  roles: state.roles.roles,
  usuario: state.usuario.usuario,
});

export default connect(mapStateToProps, {
  mostrarRoles,
  eliminarRol,
  currentUser,
})(ListaRoles);

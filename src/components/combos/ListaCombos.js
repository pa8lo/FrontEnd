import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { mostrarCombos } from '../../actions/combosAction';

import SortableTbl from "../react-sort-search-table/src/SortableTbl";
import { Link } from "react-router-dom";

import { eliminarCombo } from "../../actions/combosAction";
import { currentUser } from '../../actions/usuarioAction';

//CSS
import { css } from "@emotion/core";
import Swal from 'sweetalert2'

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
  paddingTop: 3
};

const buttonStyle = {
  marginLeft: 10,
  width: 80
};


let col = ["Name", "Description", "Amount", "Actions"];
let tHead = [
  "Nombre Combo",
  "Descripcion",
  "Precio",
  "Acciones",
];

class ActionComboComponent extends React.Component {

  eliminarCombo = () => {
    const { id } = this.props.rowData;

    Swal.fire({
      title: '¿Estas seguro que desea eliminar?',
      text: "Estas a punto de eliminar un combo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
          this.props.eliminarCombo(id);
      }
    })

    
  };

  render() {
    if(this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations
    
    const { id } = this.props.rowData;
    
    return (
      <td style={columnButtonStyle}>

            { permisos.filter(permiso => (permiso.id == 17)).length > 0 ?  
                
                    <Link
                      style={buttonStyle}
                      to={{
                        pathname: `/combos/${id}`,
                        state: this.props.rowData
                      }}
                      className="btn btn-primary"
                    >
                      Ver
                    </Link>

                    :  

                    <Link style={buttonStyle} 
                        disabled to="#" 
                        className="btn btn-primary">
                        Ver
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 18)).length > 0 ?  
                
                  <Link
                    style={buttonStyle}
                    to={{
                      pathname: `/combos/editar-combo/${id}`,
                      state: this.props.rowData
                    }}
                    className="btn btn-warning"
                  >
                    Editar
                  </Link>

                    :  

                    <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                        Editar
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 19)).length > 0 ?  
                
                    <button
                      style={buttonStyle}
                      onClick={this.eliminarCombo}
                      type="button"
                      className="btn btn-danger"
                    >
                      Borrar
                    </button>

                    :  

                    <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
            }

        
      </td>
    );
  }
}

class ListaCombos extends Component {

  state = {
    loading: true
  };

  componentDidMount() {
    this.props.mostrarCombos();
  }


  render() {
    const combos = this.props.combos;
    const loaded = this.props.loaded;

    if (combos.length === 0) {
      if (combos.length === 0 && !loaded) {
        return (
          <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <DotLoader
              css={override}
              size={50} // or 150px
              color={"#4D4D4D"}
              loading={this.state.loading}
            />
          </div>
        )
      }
      else {
        return (
          <div>
            <h2 align="center" style={{ marginTop: '40px', marginBottom: '40px' }}>
              No hay datos
                    </h2>
          </div>
        )
      }
    }
    else {

      return (
        <SortableTbl tblData={combos.sort(function(a, b) {return b.id - a.id})}
          tHead={tHead}
          Permisos={this.props.usuario}
          customTd={[
            { custd: (ActionComboComponent), keyItem: "Actions" },
          ]}
          dKey={col}
          search={true}
          defaultCSS={true}
          eliminarCombo={this.props.eliminarCombo}
        />
      );

    }

  }
}

const mapStateToProps = state => ({
  combos: state.combos.combos,
  loaded: state.combos.loaded,
  usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
  mostrarCombos,
  eliminarCombo,
  currentUser
})(ListaCombos);
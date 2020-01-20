import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Turno from './Turno'

import SortableTbl from "react-sort-search-table";

//Redux
import { connect } from 'react-redux';
import { mostrarTurnos } from '../../../actions/turnosAction';
import { eliminarTurno } from '../../../actions/turnosAction';
import { currentUser } from '../../../actions/usuarioAction';

//CSS
import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const columnButtonStyle = {
    maxWidth: '100%',
    minWidth: '100%',
    paddingTop: 3,
};

const buttonStyle = {
    marginLeft: 10,
    width: 80,
};

let col = ["Name", "InTime", "OutTime", "Actions"];
let tHead = [
    "Turno",
    "Hora de Entrada",
    "Hora de Salida",
    "Acciones",
];

class ActionTurnoComponent extends React.Component {

  eliminarTurno = () =>{
        const {id} = this.props.rowData;

        this.props.eliminarTurno(id);
    }

  render() {

    if(this.props.Permisos.length === 0) return null;

    const permisos = this.props.Permisos.Authorizations;

    const { id } = this.props.rowData;

    return (
        <td style={columnButtonStyle}>


            { permisos.filter(permiso => (permiso.id == 29)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/empleados`,
                        state : this.props.rowData
                        }} className="btn btn-primary">
                        Ver
                    </Link>

                    :  

                    <Link style={buttonStyle} 
                        disabled to="#" 
                        className="btn btn-primary">
                        Ver
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 30)).length > 0 ?  
                
                    <Link style={buttonStyle} to={{
                        pathname : `/rrhh/editar-empleados`,
                        state : this.props.rowData
                        }} className="btn btn-warning">
                        Editar
                    </Link>

                    :  

                    <Link style={buttonStyle} disabled to="#" className="btn btn-warning">
                        Editar
                    </Link>
            }

            { permisos.filter(permiso => (permiso.id == 31)).length > 0 ?  
                
                    <button style={buttonStyle} onClick={ this.eliminarTurno } type="button" className="btn btn-danger">Borrar</button>

                    :  

                    <button style={buttonStyle} disabled type="button" className="btn btn-danger">Borrar</button>
            }
           
        </td> 
    );
  }
}

class ListaTurnos extends Component {

    state = {
        loading: true
    };

    componentDidMount() {
        this.props.mostrarTurnos();
        //// this.props.currentUser();
    }

    render() {
        
        const turnos = this.props.turnos;
        const loaded = this.props.loaded || false;

        // console.log(turnos.length)
        // console.log(loaded)

        if (turnos.length === 0) {
            if (turnos.length === 0 && !loaded) {
                return (
                    <div style={{marginTop: '40px', marginBottom: '40px'}}>
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
        }else{
            
            for (var i = 0; i < turnos.length; i++) {
                turnos[i].InTime = turnos[i].InHour + ":" + turnos[i].InMinute;
                turnos[i].OutTime = turnos[i].OutHour + ":" + turnos[i].OutMinute;
            }
            return (
                <SortableTbl tblData={turnos.sort(function(a, b) {return b.id - a.id})}
                    tHead={tHead}
                    Permisos={this.props.usuario}
                    customTd={[
                                {custd: (ActionTurnoComponent), keyItem: "Actions"},
                                ]}
                    dKey={col}
                    search={true}
                    defaultCSS={true}
                    eliminarTurno = {this.props.eliminarTurno}
                />
            )
            
        }
    }
}

const mapStateToProps = state => ({
    turnos : state.turnos.turnos,
    loaded: state.gastos.loaded,
    usuario : state.usuario.usuario
});

export default connect(mapStateToProps, {
    mostrarTurnos,
    eliminarTurno,
    currentUser
})(ListaTurnos);
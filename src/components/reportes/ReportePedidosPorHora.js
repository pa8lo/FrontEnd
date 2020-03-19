import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Table, Row, Col } from 'react-bootstrap';

import axios from 'axios';

// const data = {
//   labels: ['January', 'February', 'March'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       backgroundColor: 'rgba(255,99,132,0.2)',
//       borderColor: 'rgba(255,99,132,1)',
//       borderWidth: 1,
//       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//       hoverBorderColor: 'rgba(255,99,132,1)',
//       data: [65,80,90]
//     }
//   ]
// }; 

class ReportePedidosPorHora extends Component {

  state = {
      reporte_gastos : [],
      gastos_total : [],
      fecha_gasto : [],
      monto_gasto : [],
      datos_gasto : [],
      data_chart : {},
      hayValor : false
  }

  handleEvent = (event, picker) => {
    const gastos = axios.get(`https://roraso.herokuapp.com/Reports/Pedidos`,
    { headers: { 'access-token': localStorage.getItem('access-token')}})
        .then(res => {

          console.log(res.data)

            if(res.status === 200){
                this.setState({
                    reporte_pedidos_hr : res.data,
                    pedidos_hr_total : res.data,
                    fecha_pedidos_hr : [],
                    monto_pedidos_hr : []
                })

                if(this.state.reporte_pedidos_hr.length > 0){

                  this.state.reporte_pedidos_hr.map(pedido => {

                    this.state.fecha_pedidos_hr.push(pedido.day)
                    this.state.monto_pedidos_hr.push(pedido.amount)
                })

                this.state.data_chart = {
                  labels: this.state.fecha_pedidos_hr,
                  datasets: [
                    {
                      label: 'Monto Pedido Por Hora',
                      backgroundColor: 'rgba(255,99,132,0.2)',
                      borderColor: 'rgba(255,99,132,1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                      hoverBorderColor: 'rgba(255,99,132,1)',
                      data: this.state.monto_pedidos_hr
                    }
                  ]
                };

                this.setState({
                  hayValor : true
                })
              }
              
            }else{
                console.log("error")
            }
        }).catch(err => {
            console.log(err)
        })
  }

  mostrarInfo = () => {
    
    if(this.state.hayValor === false){
			return(
			<React.Fragment>
				<h3 style={{textAlign: 'center'}}>No hay valores para mostrar</h3>
			</React.Fragment>
			)
		}else{

      let count = 1

			return(
        <div style={{height : 500, width : "100%", display: "inline-block"}}>
        <React.Fragment>
          <Bar style={{height : 150, width : 150}}
          data={this.state.data_chart}
          width={150}
          height={150}
          options={{
            maintainAspectRatio: false
          }}
          />
        </React.Fragment>
        <React.Fragment>
          <h3 style={{textAlign:"center"}}>Datos Especificos</h3>
          {/* <Table responsive>
          <thead>
            <tr style={{textAlign:"center"}}>
              <th style={{textAlign:"center"}}>#</th>
              <th style={{textAlign:"center"}}>Dato del Gasto</th>
              <th style={{textAlign:"center"}}>Fecha del Gasto</th>
              <th style={{textAlign:"center"}}>Monto del Gasto</th>
            </tr>
          </thead>
          <tbody>
              {this.state.gastos_total.map(datos_tabla => (

                // console.log(datos_tabla),
                <tr key={datos_tabla.datos[0].id}>
                  <td>{count++}</td>
                  <td>{datos_tabla.datos[0].Details}</td>
                  <td>{datos_tabla.datos[0].Date}</td>
                  <td>{datos_tabla.datos[0].Amount}</td>
                </tr>

                
              ))}
          </tbody>
          </Table> */}
        </React.Fragment>
        </div>
			)
		}
  }

  render() {

    return (
      <div>

        <DateRangePicker onApply={this.handleEvent}>
          <div align="center" style={{textAlign: "center"}}>
          <Row align="center" style={{ width:'800px'}} className="show-grid">
            <Col xs={1} md={4}>
            <button className="btn btn-primary" style={{width:"195px"}}>Consultar Pedidos</button>
            </Col>
            <Col style={{textAlign: "center"}} align="center" xs={11} md={7}>
            {/* <span align="center" centered={true} style={{textAlign: "center"}}>Debe ingresar un rango de fechas para visualizar el Reporte Gastos</span> */}
            </Col>
          </Row>
          </div>
        </DateRangePicker>

        <h3 style={{textAlign: 'center'}}>Pedidos Por Hora</h3>
        {this.mostrarInfo()}
      </div>
    );
  }
}

export default ReportePedidosPorHora;

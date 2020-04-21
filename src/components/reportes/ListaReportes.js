import React, { Component } from "react";
import axios from "axios";

import ReporteGanancias from "./ReporteGanancias";
import ReporteGastos from "./ReporteGastos";
import ReportePedidosPorHora from "./ReportePedidosPorHora";

import Header from "../header/IndexHeader";

import DateRangePicker from "react-bootstrap-daterangepicker";
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";

class ListaReportes extends Component {
  state = {};

  handleEvent = (event, picker) => {
    // console.log(picker.startDate.format('YYYY-MM-DD'));
    // console.log(picker.endDate.format('YYYY-MM-DD'));
    const gastos = axios
      .get(
        `${process.env.REACT_APP_BACKEND_SERVER}/Reports/Gasto?min=2019-01-01&max=2020-02-04`,
        { headers: { "access-token": localStorage.getItem("access-token") } }
      )
      .then((res) => {
        console.log(res.status);

        if (res.status === 200) {
          console.log(res.data);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // https://roraso.herokuapp.com/Reports/Ganancias?min=2019-01-01&max=2020-02-04
    // console.log(gastos)
  };
  render() {
    return (
      <div>
        <Header titulo="Reportes" />

        {/* <DateRangePicker onApply={this.handleEvent}>
                        <button>Fechas</button>
                    </DateRangePicker> */}
        {/* <h2 style={{textAlign: 'center'}}>Gastos por Producto</h2>
                    
                    {/* <hr /> */}
        {/* <DynamicDoughnutExample /> */}
        {/* <DoughnutExample /> */}

        <div style={{ marginTop: "30px" }}>
          <ReporteGastos />
        </div>
        <hr />
        <div>
          <ReportePedidosPorHora />
        </div>
        <hr />
        <div>
          <ReporteGanancias />
        </div>
        {/* <HorizontalBarExample /> */}
        <hr />
      </div>
    );
  }
}

export default ListaReportes;

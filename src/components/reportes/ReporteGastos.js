import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Table, Row, Col } from "react-bootstrap";

import axios from "axios";

class ReporteGastos extends Component {
  state = {
    reporte_gastos: [],
    gastos_total: [],
    fecha_gasto: [],
    monto_gasto: [],
    datos_gasto: [],
    data_chart: {},
    hayValor: false,
  };

  handleEvent = (event, picker) => {
    this.setState({
      data_chart: {},
      gastos_total: [],
    });

    const gastos = axios
      .get(
        `${
          process.env.REACT_APP_BACKEND_SERVER
        }/Reports/Gasto?min=${picker.startDate.format(
          "YYYY-MM-DD"
        )}&max=${picker.endDate.format("YYYY-MM-DD")}`,
        { headers: { "access-token": localStorage.getItem("access-token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            this.setState({
              reporte_gastos: res.data,
              gastos_total: res.data,
              fecha_gasto: [],
              monto_gasto: [],
              datos_gasto: [],
            });

            if (this.state.reporte_gastos.length > 0) {
              this.state.reporte_gastos.map((gasto) => {
                this.state.fecha_gasto.push(gasto.day);
                this.state.monto_gasto.push(gasto.amount);
                this.state.datos_gasto.push(gasto.datos);
              });

              this.state.data_chart = {
                labels: this.state.fecha_gasto,
                datasets: [
                  {
                    label: "Monto de Gastado",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    borderColor: "rgba(255,99,132,1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                    hoverBorderColor: "rgba(255,99,132,1)",
                    data: this.state.monto_gasto,
                  },
                ],
              };

              this.setState({
                hayValor: true,
              });
            }
          } else {
            this.setState({
              hayValor: false,
            });
          }
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  mostrarInfo = () => {
    if (this.state.hayValor === false) {
      return (
        <React.Fragment>
          <h3 style={{ textAlign: "center" }}>
            {this.state.loading ? "Cargando..." : "No hay valores para mostrar"}
          </h3>
        </React.Fragment>
      );
    } else {
      let count = 1;

      return (
        <div style={{ height: 500, width: "100%", display: "inline-block" }}>
          <React.Fragment>
            <Bar
              style={{ height: 150, width: 150 }}
              data={this.state.data_chart}
              width={150}
              height={150}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </React.Fragment>
          <React.Fragment>
            <h3 style={{ textAlign: "center" }}>Datos Especificos</h3>
            <Table responsive>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th style={{ textAlign: "center" }}>#</th>
                  <th style={{ textAlign: "center" }}>Dato del Gasto</th>
                  <th style={{ textAlign: "center" }}>Fecha del Gasto</th>
                  <th style={{ textAlign: "center" }}>Monto del Gasto</th>
                </tr>
              </thead>
              <tbody>
                {this.state.gastos_total.map((datos_tabla) =>
                  datos_tabla.datos.map((gastos_dato) => {
                    return (
                      <tr key={gastos_dato.id}>
                        <td>{count++}</td>
                        <td>{gastos_dato.Details}</td>
                        <td>{gastos_dato.Date}</td>
                        <td>{gastos_dato.Amount}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </React.Fragment>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <DateRangePicker onApply={this.handleEvent}>
          <div align="center" style={{ textAlign: "center" }}>
            <Row
              align="center"
              style={{ width: "800px" }}
              className="show-grid"
            >
              <Col xs={1} md={4}>
                <button className="btn btn-primary">
                  Ingrese una rango de fechas
                </button>
              </Col>
              <Col
                style={{ textAlign: "center" }}
                align="center"
                xs={11}
                md={7}
              >
                {/* <span align="center" centered={true} style={{textAlign: "center"}}>Debe ingresar un rango de fechas para visualizar el Reporte Gastos</span> */}
              </Col>
            </Row>
          </div>
        </DateRangePicker>

        <h3 style={{ textAlign: "center" }}>Gastos</h3>
        {this.mostrarInfo()}
      </div>
    );
  }
}

export default ReporteGastos;

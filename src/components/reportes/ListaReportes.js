import React, {Component} from 'react';

import DoughnutExample from './doughnut';
import DynamicDoughnutExample from './dynamic-doughnut';
import PieExample from './pie';
import LineExample from './line';
import BarExample from './bar';
import HorizontalBarExample from './horizontalBar';
import Header from '../header/IndexHeader';

import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

class ListaReportes extends Component {
    state = {  }

    handleEvent(event, picker) {
        console.log(picker.startDate.format('YYYY-MM-DD'));
        console.log(picker.endDate.format('YYYY-MM-DD'));
    }
        render() {
            return (
                <div>
                    <Header 
                        titulo = 'Reportes'
                    />
                    
                    <DateRangePicker onEvent={this.handleEvent}>
                        <button>Click Me To Open Picker!</button>
                    </DateRangePicker>
                    {/* <h2 style={{textAlign: 'center'}}>Gastos por Producto</h2>
                    {/* <DoughnutExample /> */}
                    {/* <hr /> */}
                    {/* <DynamicDoughnutExample /> */}
                    {/* <hr /> */}
                    {/* <PieExample />
                    <hr />
                    <LineExample />
                    <hr />
                    <BarExample />
                    <hr />
                    <HorizontalBarExample />
                    <hr />  */}
                </div>
            );
        }
}
 
export default ListaReportes;
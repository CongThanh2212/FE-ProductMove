import Chart from 'chart.js/auto';
import React, { Fragment } from "react";
import {URL} from "../../../../url"

class OldStatistical extends React.Component {

    // Thống kê theo tháng
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var divChart = document.getElementById("chartCircle");
                    if (data.name.length === 0) {
                        if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                        return;
                    }
                    var ctx = document.createElement("canvas");
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: data.name,
                            datasets: [{
                                label: 'Tỉ lệ',
                                data: data.amount,
                                hoverOffset: 4
                            }]
                        }
                    });
                    ctx.style.display = 'inline';
                    divChart.appendChild(ctx);
                }
            }
        }
        xmlHttp.open('GET', URL + '/producer/statistical-old-by-agent?producerId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI thống kê sản phẩm cũ của producer
    render() {

        return (
            <Fragment>
                <div className="createAccount">
                    <h1>Thống kê sản phẩm cũ</h1>
                </div>
                <div className="tableProductLine-select">
                    <label htmlFor='statisticalType'>Thống kê theo:  </label>
                    <select id="statisticalType" onChange={this.changeStatisticalType}>
                        <option value="agent">Đại lý</option>
                    </select>
                </div>
                <div id='chartCircle'>
                </div>
            </Fragment>
        )
    }
}

export default OldStatistical
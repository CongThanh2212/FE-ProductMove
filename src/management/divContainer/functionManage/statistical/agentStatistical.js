import Chart from 'chart.js/auto';
import React, { Fragment } from "react";
import {URL} from "../../../../url"

class AgentStatistical extends React.Component {

    constructor(props) {
        super(props);
        this.changeStatisticalType = this.changeStatisticalType.bind(this);
        this.old = this.old.bind(this);
    }

    // Thay đổi kiểu thống kê
    changeStatisticalType(event) {
        var type = event.target.value;
        switch (type) {
            case 'sold': this.componentDidMount(); break;
            default: this.old(); break;
        }
    }

    // Thống kê sản phẩm cũ không bán được
    old() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var divChart = document.getElementById("chart");
                    // Nếu server trả về data rỗng thì xóa vùng chưa biểu đồ
                    if (data.name.length === 0 || data.amount.length === 0) {
                        if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                        return;
                    }
                    var ctx = document.createElement("canvas");
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: data.name,
                            datasets: [{
                                label: 'Số lượng',
                                data: data.amount,
                                borderWidth: 1
                            }]
                        },
                        options: {
                        scales: {
                            y: {
                            beginAtZero: true
                            }
                        }
                        }
                    });
                    ctx.style.display = 'inline';
                    if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                    divChart.appendChild(ctx);
                }
            }
        }
        xmlHttp.open('GET', URL + '/management/statistical-agent-old?id=' + this.props.id, false);
        xmlHttp.send(null); 
    }

    // Thống kê sản phẩm bán ra
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var divChart = document.getElementById("chart");
                    // Nếu server trả về data rỗng thì xóa vùng chưa biểu đồ
                    if (data.name.length === 0 || data.amount.length === 0) {
                        if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                        return;
                    }
                    var ctx = document.createElement("canvas");
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: data.name,
                            datasets: [{
                                label: 'Số lượng',
                                data: data.amount,
                                borderWidth: 1
                            }]
                        },
                        options: {
                        scales: {
                            y: {
                            beginAtZero: true
                            }
                        }
                        }
                    });
                    ctx.style.display = 'inline';
                    if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                    divChart.appendChild(ctx);
                }
            }
        }
        xmlHttp.open('GET', URL + '/management/statistical-agent-sold?id=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI thống kê sản phẩm theo đại lý
    render() {

        return (
            <Fragment>
                <div className="createAccount">
                    <h1>Thống kê theo đại lý phân phối</h1>
                </div>
                <div className="tableProductLine-select">
                    <label htmlFor='statisticalType'>Thống kê theo:  </label>
                    <select id="statisticalType" onChange={this.changeStatisticalType}>
                        <option value="sold">Số lượng bán ra</option>
                        <option value="old">Số lượng cũ</option>
                    </select>
                </div>
                <div id='chart'>
                </div>
            </Fragment>
        )
    }
}

export default AgentStatistical
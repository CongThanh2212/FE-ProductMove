import Chart from 'chart.js/auto';
import React, { Fragment } from "react";
import {URL} from "../../../../url"

class SoldStatistical extends React.Component {

    constructor(props) {
        super(props);
        this.changeStatisticalType = this.changeStatisticalType.bind(this);
        this.year = this.year.bind(this);
        this.quarter = this.quarter.bind(this);
    }

    // Thay đổi kiểu thống kê
    changeStatisticalType(event) {
        var type = event.target.value;
        switch(type) {
            case "month": {
                this.componentDidMount();
                break;
            }
            case "year": {
                this.year();
                break;
            }
            default: {
                this.quarter();
            }
        }
    }

    // Thống kê theo năm
    year() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).list;
                    var divChart = document.getElementById("chart");
                    // Nếu server trả về data rỗng thì xóa vùng chưa biểu đồ
                    if (data.length === 0) {
                        if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                        return;
                    }
                    // 2 mảng lưu trữ năm và số lượng sản phẩm từng năm mà server trả về
                    var years = [], amount = [];
                    for (var i = 0; i < data.length; i++) {
                        years[i] = data[i].year;
                        amount[i] = data[i].amount;
                    }
                    var ctx = document.createElement("canvas");
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: years,
                            datasets: [{
                                label: 'Số lượng',
                                data: amount,
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
        xmlHttp.open('GET', URL + '/auth/list_year_backagent?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // Thống kê theo quý
    quarter() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).list;
                    var divChart = document.getElementById("chart");
                    // 2 mảng lưu trữ quý/năm và số lượng sản phẩm từng quý/năm mà server trả về
                    var arrQuarter = [];
                    var arrAmount = [];
                    // Nếu server trả về data rỗng thì xóa vùng chưa biểu đồ
                    if (data.length === 0) {
                        if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                        return;
                    }
                    else {
                        for (var i = 0; i < data.length; i++) {
                            arrQuarter[i] = data[i].quarter + '/' + data[i].year;
                            arrAmount[i] = data[i].amount;
                        }
                    }
                    var ctx = document.createElement("canvas");
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: arrQuarter,
                            datasets: [{
                                label: 'Số lượng',
                                data: arrAmount,
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
        xmlHttp.open('GET', URL + '/auth/list_quarter_backagent?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // Thống kê theo tháng
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).list;
                    var divChart = document.getElementById("chart");
                    // 2 mảng lưu trữ tháng/năm và số lượng sản phẩm từng tháng/năm mà server trả về
                    var arrMonth = [];
                    var arrAmount = [];
                    // Nếu server trả về data rỗng thì xóa vùng chưa biểu đồ
                    if (data.length === 0) {
                        if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                        return;
                    }
                    else {
                        for (var i = 0; i < data.length; i++) {
                            arrMonth[i] = data[i].month + '/' + data[i].year;
                            arrAmount[i] = data[i].amount;
                        }
                    }
                    var ctx = document.createElement("canvas");
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: arrMonth,
                            datasets: [{
                                label: 'Số lượng',
                                data: arrAmount,
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
        xmlHttp.open('GET', URL + '/auth/list_month_backagent?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI thống kê sản phẩm bán ra của producer
    render() {

        return (
            <Fragment>
                <div className="createAccount">
                    <h1>Thống kê sản phẩm đã bán</h1>
                </div>
                <div className="tableProductLine-select">
                    <label htmlFor='statisticalType'>Thống kê theo:  </label>
                    <select id="statisticalType" onChange={this.changeStatisticalType}>
                        <option value="month">Tháng</option>
                        <option value="quarter">Quý</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                <div id='chart'>
                </div>
            </Fragment>
        )
    }
}

export default SoldStatistical
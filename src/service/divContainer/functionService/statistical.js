import Chart from 'chart.js/auto';
import React, { Fragment } from "react";
import {URL} from "../../../url"

class Statistical extends React.Component {

    constructor(props) {
        super(props);
        this.changeShow = this.changeShow.bind(this);
        this.serviceAndYear = this.serviceAndYear.bind(this);
        this.fixedAndMonth = this.fixedAndMonth.bind(this);
        this.fixedAndYear = this.fixedAndYear.bind(this);
        this.failAndMonth = this.failAndMonth.bind(this);
        this.failAndYear = this.failAndYear.bind(this);
    }

    // Thay đổi kiểu thống kê
    changeShow() {
        const type = document.getElementById('statisticalType').value; // Lấy ra select thống kê theo kiểu
        const time = document.getElementById('statisticalTime').value; // Lấy ra select thống kê theo thời gian
        switch(type) {
            case 'service': {
                switch(time) {
                    case 'month': this.componentDidMount(); break;
                    default: this.serviceAndYear();
                }
                break;
            }
            case 'fixed': {
                switch(time) {
                    case 'month': this.fixedAndMonth(); break;
                    default: this.fixedAndYear();
                }
                break;
            }
            default: {
                switch(time) {
                    case 'month': this.failAndMonth(); break;
                    default: this.failAndYear();
                }
            }
        }
    }

    // Thống kê theo các sản phẩm cần bảo hành theo năm
    serviceAndYear() {
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
        xmlHttp.open('GET', URL + '/service/statistical-need-fix-by-year?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // Thống kê sản phẩm bảo hành thành công theo tháng
    fixedAndMonth() {
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
        xmlHttp.open('GET', URL + '/service/statistical-fixed-by-month?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // Thống kê sản phẩm bảo hành thành công theo năm
    fixedAndYear() {
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
        xmlHttp.open('GET', URL + '/service/statistical-fixed-by-year?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // Thống kê sản phẩm bảo hành thất bại theo tháng
    failAndMonth() {
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
        xmlHttp.open('GET', URL + '/service/statistical-fail-by-month?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // Thống kê sản phẩm bảo hành thất bại theo năm
    failAndYear() {
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
        xmlHttp.open('GET', URL + '/service/statistical-fail-by-year?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // Thống kê theo cần bảo hành và theo tháng
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
        xmlHttp.open('GET', URL + '/service/statistical-need-fix-by-month?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }
    
    // UI thống kê sản phẩm của service
    render() {

        return (
            <Fragment>
                <div className="createAccount">
                    <h1>Thống kê sản phẩm</h1>
                </div>
                <div className="tableProductLine-select">
                    <label>Thống kê theo:  </label>
                    <select id="statisticalType" onChange={this.changeShow}>
                        <option value="service">Cần bảo hành</option>
                        <option value="fixed">Bảo hành xong</option>
                        <option value="fail">Lỗi</option>
                    </select>
                    <select id="statisticalTime" onChange={this.changeShow}>
                        <option value="month">Tháng</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                <div id='chart'>
                </div>
            </Fragment>
        )
    }
}

export default Statistical
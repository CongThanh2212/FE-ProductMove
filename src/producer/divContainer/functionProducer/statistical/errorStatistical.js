import Chart from 'chart.js/auto';
import React, { Fragment } from "react";
import {URL} from "../../../../url"

class ErrorStatistical extends React.Component {

    constructor(props) {
        super(props);
        this.changeStatisticalType = this.changeStatisticalType.bind(this);
        this.productLine = this.productLine.bind(this);
    }

    // Thay đổi kiểu thống kê
    changeStatisticalType(event) {
        var type = event.target.value;
        if (type === 'agent') this.componentDidMount();
        else this.productLine();
    }

    // Thống kê sản phẩm lỗi theo dòng sản phẩm
    productLine() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var divChart = document.getElementById("chartCircle");
                    // Nếu server trả về data rỗng thì xóa vùng chưa biểu đồ
                    if (data.productLine.length === 0) {
                        if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                        return;
                    }
                    var ctx = document.createElement("canvas");
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: data.productLine,
                            datasets: [{
                                label: 'Tỉ lệ',
                                data: data.amount,
                                hoverOffset: 4
                            }]
                        }
                    });
                    ctx.style.display = 'inline';
                    if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                    divChart.appendChild(ctx);
                }
            }
        }
        xmlHttp.open('GET', URL + '/factory/list_productline_fail?id_user=' + this.props.id, false);
        xmlHttp.send(null); 
    }

    // Thống kê sản phẩm lỗi theo đại lý
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
                    if (divChart.firstChild) divChart.removeChild(divChart.firstChild);
                    divChart.appendChild(ctx);
                }
            }
        }
        xmlHttp.open('GET', URL + '/factory/list_agent_fail?id_user=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI thống kê sản phẩm lỗi của producer
    render() {

        return (
            <Fragment>
                <div className="createAccount">
                    <h1>Tỉ lệ lỗi</h1>
                </div>
                <div className="tableProductLine-select">
                    <label htmlFor='statisticalType'>Thống kê theo:  </label>
                    <select id="statisticalType" onChange={this.changeStatisticalType}>
                        <option value="agent">Đại lý</option>
                        <option value="productLine">Dòng sản phẩm</option>
                    </select>
                </div>
                <div id='chartCircle'>
                </div>
            </Fragment>
        )
    }
}

export default ErrorStatistical
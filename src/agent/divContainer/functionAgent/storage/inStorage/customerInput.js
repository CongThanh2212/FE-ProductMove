import React, { Fragment } from "react";
import {URL} from "../../../../../url"

class CustomerInput extends React.Component {

    constructor(props) {
        super(props);
        this.customerInput = this.customerInput.bind(this);
        this.delete = this.delete.bind(this);
        this.back = this.back.bind(this);
    }

    // Quay lại trang phía trước
    back() {
        this.props.changeTypeProfile('Sản phẩm mới');
    }


    // Gửi thông tin của khách hàng mua sản phẩm
    customerInput(event) {
        event.preventDefault();
        var error = document.getElementsByClassName('errProfile')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        // products[0] là th
        var products = document.querySelectorAll("tr");
        if (products.length === 1) error.innerHTML = 'Bạn đã bỏ chọn hết sản phẩm';
        else {
            var arrInput = document.querySelectorAll('input');
            var arrProduct = [];
            var index = 0;
            for (var i = 1; i < products.length; i++) {
                const amountSell = products[i].firstChild.value;
                if (!amountSell) {
                    error.innerHTML = 'Chưa nhập số lượng bán';
                    return;
                }
                const importBatchId = products[i].firstChild.nextSibling.innerHTML;
                const batchId = products[i].firstChild.nextSibling.nextSibling.innerHTML;
                const name = products[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
                const capacity = products[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
                const wm = products[i].lastChild.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
                const amountNow = products[i].lastChild.previousSibling.previousSibling.previousSibling.innerHTML;
                const batch = products[i].lastChild.previousSibling.previousSibling.innerHTML;
                const producerId = products[i].lastChild.previousSibling.innerHTML;
                if (amountSell > amountNow) {
                    error.innerHTML = 'Số lượng bán vượt quá số lượng trong kho';
                    return;
                }

                arrProduct[index] = {
                    importBatchId: importBatchId,
                    batchId: batchId,
                    productLine: name,
                    capacity: capacity,
                    batchNumber: batch,
                    WM: wm,
                    producerId: producerId,
                    amountNow: amountNow,
                    amountSell: amountSell
                }
                index++;
            }
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        alert("Sản phẩm đã được chuyển vào mục đã bán");
                        var tbody = document.querySelector('tbody');
                        for (var j = products.length - 1; j > 0; j--) {
                            tbody.removeChild(products[j]);
                        }
                    }
                }
            }
            xmlHttp.open('POST', URL + '/agent/sell-product', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'agentId=' + this.props.id
                + '&customerName=' + arrInput[0].value
                + '&customerAddress=' + arrInput[1].value
                + '&customerPhone=' + arrInput[2].value
                + '&sellDate=' + document.getElementById('date')
                + '&arrProduct=' + JSON.stringify(arrProduct)
            )
        }
    }

    // Bỏ đi sản phẩm trong bảng mua hàng
    delete(event) {
        var tr = event.parentNode;
        tr.parentNode.removeChild(tr);
    }

    // Hiển thị các sản phẩm đã chọn để bán cho khách hàng trong trang trước là storage
    componentDidMount() {
        var root = this;
        var tbody = document.querySelector("tbody");
        var arr = this.props.arrProduct;
        for (var i = 0; i < arr.length; i++) {
            var tr = document.createElement("tr");
            var tdNumberOfSell = document.createElement('td');
            var numberOfSell = document.createElement('input');
            tdNumberOfSell.appendChild(numberOfSell);
            tr.appendChild(tdNumberOfSell);

            for (var j = 0; j < arr[i].length; j++) {
                var td = document.createElement("td");
                var html = document.createTextNode(arr[i][j]);
                td.appendChild(html);
                tr.appendChild(td);
            }
            var tdDelete = document.createElement("td");
            tdDelete.innerHTML = 'Bỏ';
            tr.appendChild(tdDelete);
            tbody.appendChild(tr);

            tdDelete.style.cursor = 'pointer';
            tdDelete.onclick = function() {
                root.delete(this);
            }
        }
    }

    // UI nhập thông tin khách hàng của agent
    render() {

        return (
            <Fragment>
                <table className="tableProductLine">
                    <thead>
                        <tr>
                            <th>Số lượng bán</th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Số tháng BH</th>
                            <th>Số lượng</th>
                            <th>Lô</th>
                            <th hidden>producerId</th>
                            <th>Bỏ chọn</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div>
                    <form className="createAccount" onSubmit={this.customerInput}>
                        <h1>Nhập thông tin khách hàng</h1>
                        <input type='text' placeholder='Họ và tên' required></input>
                        <input type='text' placeholder='Địa chỉ' required></input>
                        <input type='phone' placeholder='Số điện thoại' required></input>
                        <span className='errProfile'></span>
                        <input type='submit' value='Xong'></input>
                    </form>
                </div>
                <input type='date' id="date"></input>
                <i className='fas fa-arrow-circle-left' onClick={this.back}></i>
            </Fragment>
        )
    }
}

export default CustomerInput
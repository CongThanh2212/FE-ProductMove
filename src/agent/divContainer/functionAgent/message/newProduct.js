import React, { Fragment } from "react";
import {URL} from "../../../../url"

class NewProduct extends React.Component {

    constructor(props) {
        super(props);
        this.receiveProduct = this.receiveProduct.bind(this);
        this.show = this.show.bind(this);
    }

    //Xử lý event đại lý click xác nhận là đã nhận đc sản phẩm mới từ cơ sở sản xuất
    receiveProduct(event) {
        const importBatchId = event.parentNode.firstChild.innerHTML;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert("Nhận thành công!\nSản phẩm đã được chuyển vào trong kho");
                    var tbody = document.querySelector('tbody');
                    tbody.removeChild(event.parentNode);
                }
            }
        }
        xmlHttp.open('POST', URL + '/agent/receive-new-product', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'agentId=' + this.props.id
            + '&date=' + document.getElementById('date').value
            + '&importBatchId=' + importBatchId
        )
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const productId = event.parentNode.firstChild.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Sản phẩm mới về');
        this.props.changeTypeProfile('Xem');
    }

    // Load lần đầu
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement('tr');
                        var importBatchId = document.createElement('td');
                        importBatchId.className = 'columnId';
                        var batchId = document.createElement('td');
                        batchId.className = 'columnId';
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var amount = document.createElement('td');
                        var description = document.createElement('td');
                        var receive = document.createElement('td');

                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        amount.innerHTML = data[i].amountStart;
                        description.innerHTML = 'Xem';
                        receive.innerHTML = 'Nhận';

                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(amount);
                        tr.appendChild(description);
                        tr.appendChild(receive);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }

                        receive.style.cursor = 'pointer';
                        receive.onclick = function() {
                            root.receiveProduct(this);
                        }
                    }
                }
            }
        }
        xmlHttp.open('GET', URL + '/agent/message-new-arrival?agentId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI của agent gồm all sản phẩm được các CSSX gửi đến agent mà agent chưa nhận
    render() {
        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Sản phẩm mới về</caption>
                    <thead>
                        <tr>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Số lượng</th>
                            <th>Chi tiết</th>
                            <th>Nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <input type='date' id='date'></input>
            </Fragment>
        )
    }
}

export default NewProduct
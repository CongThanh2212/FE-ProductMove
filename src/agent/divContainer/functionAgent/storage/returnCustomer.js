import React, { Fragment } from "react";
import {URL} from "../../../../url"

class ReturnCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.returnCustomer = this.returnCustomer.bind(this);
        this.show = this.show.bind(this);
    }

    // Trả sản phẩm bảo hành xong về cho khách hàng
    returnCustomer(event) {
        const parent = event.parentNode;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert("Thành công!\nSản phẩm đã được chuyển vào mục đã bán");
                    var tbody = document.querySelector('tbody');
                    tbody.removeChild(parent);
                }
            }
        }
        xmlHttp.open('POST', URL + '/agent/return-customer', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'agentId=' + this.props.id
            + '&productId=' + parent.firstChild.innerHTML
            + '&numberOfService=' + parent.lastChild.previousSibling.previousSibling.previousSibling.innerHTML
            + '&customerId=' + parent.lastChild.previousSibling.previousSibling.innerHTML
            + '&date=' + document.getElementById('date').value
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
        this.props.changeBackType('Trả lại cho khách hàng');
        this.props.changeTypeProfile('Xem');
    }

    // Load lần đầu lấy ra các sản phẩm đã bảo hành xong đang trong kho của agent
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var productId = document.createElement('td');
                        productId.className = 'columnId';
                        var importBatchId = document.createElement('td');
                        importBatchId.className = 'columnId';
                        var batchId = document.createElement('td');
                        batchId.className = 'columnId';
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var numberOfService = document.createElement('td');
                        var cusId = document.createElement('td');
                        cusId.style.hidden = true;
                        var description = document.createElement('td');
                        var returnCus = document.createElement('td');

                        productId.innerHTML = data[i].productId;
                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        numberOfService.innerHTML = data[i].numberOfService;
                        cusId.innerHTML = data[i].customerId;
                        description.innerHTML = 'Xem';
                        returnCus.innerHTML = 'Trả lại';

                        tr.appendChild(productId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(numberOfService);
                        tr.appendChild(cusId);
                        tr.appendChild(description);
                        tr.appendChild(returnCus);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }

                        returnCus.style.cursor = 'pointer';
                        returnCus.onclick = function() {
                            root.returnCustomer(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/agent/list-fixed?agentId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI các sản phẩm đã bảo hành xong mà trong kho của agent để agent có thể trả lại cho khách hàng
    render() {
        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Đã bảo hành xong - Cần trả lại cho khách hàng</caption>
                    <thead>
                        <tr>
                            <th className="columnId">productId</th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Số lần bảo hành</th>
                            <th hidden>customerId</th>
                            <th>Chi tiết</th>
                            <th>Trả lại khách</th>
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

export default ReturnCustomer
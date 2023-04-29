import React, { Fragment } from "react";
import {URL} from "../../../url"

class MessageFromAgent extends React.Component {

    constructor(props) {
        super(props);
        this.receiveProduct = this.receiveProduct.bind(this);
        this.show = this.show.bind(this);
    }

    /*
        Xử lý event producer click xác nhận là đã nhận đc sản phẩm lỗi từ service
    */
    receiveProduct(event) {
        const parent = event.parentNode;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert('Nhận sản phẩm thành công!\nSản phẩm đã được chuyển vào trong kho');
                    var tbody = document.querySelector('tbody');
                    tbody.removeChild(parent);
                }
            }
        }
        xmlHttp.open('POST', URL + '/service/receive-service', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'serviceId=' + this.props.id
            + '&productId=' + parent.firstChild.innerHTML
            + '&numberOfService=' + parent.lastChild.previousSibling.previousSibling.innerHTML
        );
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const id = event.parentNode.firstChild;
        this.props.changeBatchId(id.nextSibling.nextSibling.innerHTML);
        this.props.changeImportId(id.nextSibling.innerHTML);
        this.props.changeProductId(id.innerHTML);
        this.props.changeOldId('');
        this.props.changeBackType('Thông báo bảo hành');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra danh sách sản phẩm agent gửi đến để bảo hành mà service chưa nhận
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
                        var description = document.createElement('td');
                        var receive = document.createElement('td');

                        productId.innerHTML = data[i].productId;
                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        numberOfService.innerHTML = data[i].numberOfService;
                        description.innerHTML = 'Xem';
                        receive.innerHTML = 'Nhận';

                        tr.appendChild(productId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(numberOfService);
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
        xmlHttp.open('GET', URL + '/service/message-service?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI thông báo các sản phẩm đc agent gửi đến để bảo hành mà service chưa nhận
    render() {
        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Thông báo sản phẩm lỗi</caption>
                    <thead>
                        <tr>
                            <th className="columnId">productId</th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Số lần BH</th>
                            <th>Chi tiết</th>
                            <th>Nhận</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default MessageFromAgent
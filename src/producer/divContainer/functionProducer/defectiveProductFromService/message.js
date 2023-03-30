import React, { Fragment } from "react";
import {URL} from "../../../../url"

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.receiveProduct = this.receiveProduct.bind(this);
        this.show = this.show.bind(this);
    }

    // Nhận sản phẩm cũ/ lỗi
    receiveProduct(event) {
        var status = event.previousSibling.previousSibling.innerHTML;
        var link = 'receive-old';
        if (status === 'Lỗi') link = 'receive-fail';
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert("Nhận thành công!\nSản phẩm đã được chuyển vào mục đã tiếp nhận");
                }
            }
        }
        xmlHttp.open('POST', URL + '/producer/' + link, false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (status === 'Lỗi') {
            xmlHttp.send(
                'producerId=' + this.props.id
                + '&productId=' + event.parentNode.firstChild.innerHTML
                + '&date=' + document.getElementById('date').value
            );
        } else {
            xmlHttp.send(
                'producerId=' + this.props.id
                + '&oldBatchId=' + event.parentNode.firstChild.innerHTML
                + '&date=' + document.getElementById('date').value
            );
        }
        var tr = event.parentNode;
        tr.parentNode.removeChild(tr);
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const status = event.previousSibling.innerHTML;
        const id = event.parentNode.firstChild;
        this.props.changeBatchId(id.nextSibling.nextSibling.innerHTML);
        this.props.changeImportId(id.nextSibling.innerHTML);
        if (status === 'Lỗi') {
            this.props.changeProductId('');
            this.props.changeOldId(id.innerHTML);
        } else {
            this.props.changeProductId(id.innerHTML);
            this.props.changeOldId('');
        }
        this.props.changeBackType('Thông báo');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra các sản phẩm lỗi/ cũ do agent, service gửi đến producer mà producer chưa nhận
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
                        var oldOrPrBatchId = document.createElement('td');
                        oldOrPrBatchId.className = 'columnId';
                        var importBatchId = document.createElement('td');
                        importBatchId.className = 'columnId';
                        var batchId = document.createElement('td');
                        batchId.className = 'columnId';
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var amount = document.createElement('td');
                        var status = document.createElement('td');
                        var description = document.createElement('td');
                        var receive = document.createElement('td');

                        if (data[i].oldBatchId) oldOrPrBatchId.innerHTML = data[i].oldBatchId;
                        else oldOrPrBatchId.innerHTML = data[i].productId;

                        if (data[i].importBatchId) importBatchId.innerHTML = data[i].importBatchId;
                        else importBatchId.innerHTML = '';

                        if (data[i].batchId) batchId.innerHTML = data[i].batchId;
                        else batchId.innerHTML = '';
                        
                        if (data[i].productLine) name.innerHTML = data[i].productLine;
                        else name.innerHTML = '';
                        
                        if (data[i].capacity) capacity.innerHTML = data[i].capacity;
                        else capacity.innerHTML = '';

                        if (data[i].amount) amount.innerHTML = data[i].amount;
                        else amount.innerHTML = '';
                        
                        if (data[i].status === 'send_fail' || data[i].status === 'received_fail') status.innerHTML = 'Lỗi';
                        else status.innerHTML = 'Cũ';
                        description.innerHTML = 'Xem';
                        receive.innerHTML = 'Nhận';

                        tr.appendChild(oldOrPrBatchId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(amount);
                        tr.appendChild(status);
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
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/producer/message-old-and-fail?producerId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI thông báo sản phẩm lỗi/cũ được gửi đến producer
    render() {
        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Thông báo sản phẩm lỗi - cũ</caption>
                    <thead>
                        <tr>
                            <th className="columnId">old/producId</th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                            <th>Chi tiết</th>
                            <th>Nhận sản phẩm</th>
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

export default Message
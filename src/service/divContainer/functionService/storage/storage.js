import React, {Fragment} from "react";
import {URL} from "../../../../url"

class Storage extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.returnAgent = this.returnAgent.bind(this);
        this.sendToProducer = this.sendToProducer.bind(this);
        this.changeBackgorund = this.changeBackgorund.bind(this);
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
        this.props.changeBackType('Trong kho');
        this.props.changeTypeProfile('Xem');
    }

    /*
        Xử lý event khi trung tâm bảo hành click vào chuyển đi
    */
    sendToProducer(event) {
        const prId = event.parentNode.firstChild.nextSibling.innerHTML;
        const producerId = event.parentNode.lastChild.innerHTML;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert("Chuyển hàng thành công!\nSản phẩm đã được chuyển vào mục không thể sửa\nBạn hãy chờ cơ sở sản xuất xác nhận");
                }
            }
        }
        xmlHttp.open('POST', URL + '/service/send-fail', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'serviceId=' +  this.props.id
            + '&producerId=' + producerId
            + '&productId=' + prId
            + '&date=' + document.getElementById('date').value
        )
    }

    /*
        Xử lý event khi trung tâm bảo hành click vào trả về
    */
    returnAgent(event) {
        const prId = event.parentNode.firstChild.nextSibling.innerHTML;
        const agentId = event.parentNode.lastChild.previousSibling.innerHTML;
        const numberOfService = event.parentNode.lastChild.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert("Trả hàng thành công!\nSản phẩm đã được chuyển vào mục sửa chữa xong\nBạn hãy chờ đại lý xác nhận");
                }
            }
        }
        xmlHttp.open('POST', URL + '/service/send-fixed', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'serviceId=' + this.props.id
            + '&agentId=' + agentId
            + '&productId=' + prId
            + '&date=' + document.getElementById('date').value
            + '&numberOfService=' + numberOfService
        )
    }

    // Xử lý event khi 1 row đc checked thì chuyển màu vàng ngược lại chuyển về màu ban đầu
    changeBackgorund(event) {
        var input = event
        var td = event.parentNode
        if (input.checked) td.parentNode.style.background = "yellow";
        else if (Number(td.nextSibling.innerHTML) % 2 === 1) td.parentNode.style.background = "rgba(0,0,21,.05)";
        else td.parentNode.style.background = "white";
    }

    // Lấy ra danh sách sản phẩm đang được sửa chữa
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
                        var checkbox = document.createElement('td');
                        var input = document.createElement('input');
                        input.type = 'checkbox';
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
                        var fail = document.createElement('td');
                        var fixed = document.createElement('td');
                        var agentId = document.createElement('td');
                        agentId.style.hidden = true;
                        var producerId = document.createElement('td');
                        producerId.style.hidden = true;

                        productId.innerHTML = data[i].productId;
                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        numberOfService.innerHTML = data[i].numberOfService;
                        fail.innerHTML = 'Trả về CSSX';
                        fixed.innerHTML = 'Gửi về ĐL';
                        description.innerHTML = 'Xem';
                        agentId.innerHTML = data[i].agentId;
                        producerId.innerHTML = data[i].producerId;

                        checkbox.appendChild(input);
                        tr.appendChild(checkbox);
                        tr.appendChild(productId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(numberOfService);
                        tr.appendChild(fail);
                        tr.appendChild(fixed);
                        tr.appendChild(description);
                        tr.appendChild(agentId);
                        tr.appendChild(producerId);
                        tbody.appendChild(tr);

                        input.onchange = function() {
                            root.changeBackgorund(this);
                        }

                        fail.style.cursor = 'pointer';
                        fail.onclick = function() {
                            root.sendToProducer(this);
                        }

                        fixed.style.cursor = 'pointer';
                        fixed.onclick = function() {
                            root.returnAgent(this);
                        }

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                }
            }
        }
        xmlHttp.open('GET', URL + '/service/list-fixing?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI danh sách sản phẩm đang được sửa chữa của service
    render() {
        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Sản phẩm đang được sửa chữa</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="columnId">productId</th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Lần BH</th>
                            <th>Lỗi</th>
                            <th>BH xong</th>
                            <th>Chi tiết</th>
                            <th hidden>agentId</th>
                            <th hidden>producerId</th>
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

export default Storage
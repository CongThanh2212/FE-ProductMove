import React from "react";
import {URL} from "../../../../url"

class Received extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
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
        this.props.changeProductId('');
        this.props.changeOldId(id.innerHTML);
        this.props.changeBackType('Đã tiếp nhận');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra danh sách sản phẩm lỗi, cũ mà producer đã nhận từ agent, service
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
                        var oldBatchId = document.createElement('td');
                        oldBatchId.className = 'columnId';
                        var importBatchId = document.createElement('td');
                        importBatchId.className = 'columnId';
                        var batchId = document.createElement('td');
                        batchId.className = 'columnId';
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var amount = document.createElement('td');
                        var status = document.createElement('td');
                        var description = document.createElement('td');

                        if (data[i].oldBatchId) oldBatchId.innerHTML = data[i].oldBatchId;
                        else oldBatchId.innerHTML = '';

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

                        tr.appendChild(oldBatchId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(amount);
                        tr.appendChild(status);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer'
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/producer/list-old-and-fail?producerId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI danh sách sản phẩm lỗi/cũ mà producer đã tiếp nhận
    render() {
        return(
            <table className='tableProductLine'>
                <caption>Sản phẩm lỗi - cũ đã nhận</caption>
                <thead>
                    <tr>
                        <th className="columnId">oldBatchId</th>
                        <th className="columnId">importBatchId</th>
                        <th className="columnId">batchId</th>
                        <th>Tên</th>
                        <th>Dung lượng</th>
                        <th>Số lượng</th>
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default Received
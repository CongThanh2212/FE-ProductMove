import React from "react";
import {URL} from "../../../../url"

class ExportForAgent extends React.Component {

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
        this.props.changeBatchId(id.nextSibling.innerHTML);
        this.props.changeImportId(id.innerHTML);
        this.props.changeProductId('');
        this.props.changeOldId('');
        this.props.changeBackType('Xuất đi');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra danh sách sản phẩm đã xuất đi của producer
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
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var batchId = document.createElement('td');
                        batchId.className = 'columnId';
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var amount = document.createElement('td');
                        var status = document.createElement('td');
                        var description = document.createElement('td');

                        if (data[i].importBatchId) id.innerHTML = data[i].importBatchId;
                        else id.innerHTML = '';

                        if (data[i].batchId) batchId.innerHTML = data[i].batchId;
                        else batchId.innerHTML = '';
                        
                        if (data[i].productLine) name.innerHTML = data[i].productLine;
                        else name.innerHTML = '';

                        if (data[i].capacity) capacity.innerHTML = data[i].capacity;
                        else capacity.innerHTML = '';

                        if (data[i].amountStart) amount.innerHTML = data[i].amountStart;
                        else amount.innerHTML = '';

                        if (data[i].status) status.innerHTML = data[i].status;
                        else status.innerHTML = '';
                        
                        description.innerHTML = 'Xem';

                        tr.appendChild(id);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(amount);
                        tr.appendChild(status);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                }
            }
        }
        xmlHttp.open('GET', URL + '/producer/list-export?producerId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI danh sách sản phẩm xuất đi của producer
    render() {
        return(
            <table className='tableProductLine'>
                <caption>Danh sách sản phẩm xuất đi</caption>
                <thead>
                    <tr>
                        <th className="columnId">importBatchId</th>
                        <th className="columnhId">batchId</th>
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

export default ExportForAgent
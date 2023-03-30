import React, {Fragment} from "react";
import {URL} from "../../../../url"

class Repairing extends React.Component {

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
        this.props.changeProductId(id.innerHTML);
        this.props.changeOldId('');
        this.props.changeBackType('Đem đi bảo hành');
        this.props.changeTypeProfile('Xem');
    }

    // Load lần đầu lấy ra các sản phẩm đang đc đưa đi bảo hành của 1 agent
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
                        var description = document.createElement('td');

                        productId.innerHTML = data[i].productId;
                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        description.innerHTML = 'Xem';

                        tr.appendChild(productId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/agent/list-service?agentId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI các sản phẩm đang đưa đi bảo hành của 1 agent
    render() {

        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Sản phẩm đang được đưa đi bảo hành</caption>
                    <thead>
                        <tr>
                            <th className="columnId">productId</th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default Repairing
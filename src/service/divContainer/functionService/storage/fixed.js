import React from "react";
import {URL} from "../../../../url"

class Fixed extends React.Component {

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
        const productId = event.parentNode.firstChild.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Sửa chữa xong');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra danh sách sản phẩm bảo hành thành công
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

                        productId.innerHTML = data[i].productId;
                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        numberOfService.innerHTML = data[i].numberOfService;
                        description.innerHTML = 'Xem';

                        tr.appendChild(productId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(numberOfService);
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
        xmlHttp.open('GET', URL + '/service/list-fixed?serviceId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI danh sách sản phẩm bảo hành thành công của service
    render() {
        return(
            <table className='tableProductLine'>
                <caption>Sản phẩm bảo hành thành công</caption>
                <thead>
                    <tr>
                        <th className="columnId">productId</th>
                        <th className="columnId">importBatchId</th>
                        <th className="columnId">batchId</th>
                        <th>Tên</th>
                        <th>Dung lượng</th>
                        <th>Lần BH</th>
                        <th>Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default Fixed
import React from "react";
import {URL} from "../../../url"

class ProductLine extends React.Component {

    // Load lần đầu lấy ra all dòng sản phẩm
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var wm = document.createElement('td');
                        
                        name.innerHTML = data[i].name;
                        capacity.innerHTML = data[i].capacities;
                        wm.innerHTML = data[i].WM + ' tháng';

                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(wm);
                        tbody.appendChild(tr);
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/management/list-product-line?id=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI dòng sản phẩm của ban quản lý
    render() {
        return (
            <table className='tableProductLine'>
                <caption>Các dòng sản phẩm của công ty</caption>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Các loại dung lượng</th>
                        <th>Thời gian bảo hành</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        )
    }
}

export default ProductLine
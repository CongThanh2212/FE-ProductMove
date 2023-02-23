import React, { Fragment } from "react";
import {URL} from "../../../url";

class Statistical extends React.Component {

    constructor(props) {
        super(props);
        this.changeShow = this.changeShow.bind(this);
    }

    // Thay đổi kiểu thống kê
    changeShow() {
        this.componentDidMount();
    }

    // Lấy ra value của select để gửi request thống kê theo kiểu đó
    componentDidMount() {
        var table = document.querySelector('table');
        var oldTbody = document.querySelector('tbody');
        table.removeChild(oldTbody);
        const type = document.querySelector('select').value;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText).listProduct;
                    var tbody = document.createElement('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var name = document.createElement('td');
                        var status = document.createElement('td');
                        var where = document.createElement('td');
                        var amount = document.createElement('td');

                        if (data[i]._id) id.innerHTML = data[i]._id;
                        else id.innerHTML = '';
                        
                        if (data[i].name) name.innerHTML = data[i].name;
                        else name.innerHTML = '';
                        
                        if (data[i].status) status.innerHTML = data[i].status;
                        else status.innerHTML = '';
                        
                        if (data[i].where) where.innerHTML = data[i].where;
                        else where.innerHTML = '';

                        if (data[i].amount) amount.innerHTML = data[i].amount;
                        else amount.innerHTML = '';

                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(status);
                        tr.appendChild(where);
                        tr.appendChild(amount);
                        tbody.appendChild(tr);
                    }
                    table.appendChild(tbody);
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/manager/list_all_product?id_user=' + this.props.id + '&namespace=' + type, false);
        xmlHttp.send(null);
    }

    /*
      UI theo dõi sản phẩm (tương ứng với mục theo dõi trong thanh menu)  
    */
    render() {

        return (
            <Fragment>
                <div className="createAccount">
                    <h1>Thống kê sản phẩm</h1>
                </div>
                <div className="tableProductLine-select">
                    <label htmlFor='statisticalType'>Thống kê theo:  </label>
                    <select id="statisticalType" onChange={this.changeShow}>
                        <option value="sv">Trung tâm bảo hành</option>
                        <option value="pu">Cơ sở sản xuất</option>
                        <option value="ag">Đại lý phân phối</option>
                    </select>
                </div>
                <table className='tableProductLine'>
                    <thead>
                        <tr>
                            <th className="columnId">Id</th>
                            <th>Tên</th>
                            <th>Trạng thái</th>
                            <th>Vị trí</th>
                            <th>Số lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

export default Statistical
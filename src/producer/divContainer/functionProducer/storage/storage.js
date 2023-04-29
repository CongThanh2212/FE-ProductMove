import React, { Fragment } from "react"
import '../../../../general/css/storage.css'
import {URL} from "../../../../url"

class Storage extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.exportProduct = this.exportProduct.bind(this);
        this.changeBackgorund = this.changeBackgorund.bind(this);
        this.searchAgent = this.searchAgent.bind(this);
    }

    // Lấy keyword mà user nhập vào và gửi request tìm kiếm các agent phù hợp
    searchAgent(event) {
        if (event.keyCode === 13) {
            var keyWord = event.target.value;
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const data = JSON.parse(this.responseText);
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] === null) continue;
                            const agentName = data[i].name;
                            var option = document.createElement('option');
                            option.value = agentName;
                            
                            var datalist = document.querySelector('datalist');
                            datalist.appendChild(option);
                        }
                    }
                }
            }
            xmlHttp.open('POST', URL + '/producer/search-agent', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'producerId=' + this.props.id
                + '&keyWord=' + keyWord
            )
        }
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const batchId = event.parentNode.firstChild.nextSibling.innerHTML;
        this.props.changeBatchId(batchId);
        this.props.changeImportId('');
        this.props.changeProductId('');
        this.props.changeOldId('');
        this.props.changeBackType('Trong kho');
        this.props.changeTypeProfile('Xem');
    }

    /*
        Xử lý event khi producer click vào xuất hàng
    */
    exportProduct(event) {
        event.preventDefault();
        const agentName = document.getElementById('agentName').value;
        var error = document.getElementsByClassName('errRepair2')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        if (!agentName) {
            error.innerHTML = 'Bạn chưa chọn đại lý'
            return;
        }
        // Mảng tr có phần tử đầu tiên là th
        var tr = document.querySelectorAll("tr");
        var countChecked = 0; // Đếm số lượng sản phẩm checked
        var arrBatch = [];
        for (var i = 1; i < tr.length; i++) {
            if (tr[i].firstChild.firstChild.checked) {
                const amountExport = tr[i].firstChild.firstChild.nextSibling.value;
                if (!amountExport) {
                    error.innerHTML = 'Chưa nhập số lượng xuất';
                    return;
                }

                const batchId = tr[i].firstChild.nextSibling.innerHTML;
                const name = tr[i].firstChild.nextSibling.nextSibling.innerHTML;
                const batch = tr[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
                const capacity = tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
                const amountInStorage = tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
                const color = tr[i].lastChild.previousSibling.previousSibling.innerHTML;
                const wm = tr[i].lastChild.previousSibling.innerHTML;

                if (amountExport > amountInStorage) {
                    error.innerHTML = 'Số lượng xuất vượt quá số lượng trong kho';
                    return;
                }
                
                arrBatch[countChecked] = {
                    batchId: batchId,
                    batchNumber: batch,
                    amountExport: amountExport,
                    productLine: name,
                    capacity: capacity,
                    color: color,
                    WM: wm,
                    amountInStorage: amountInStorage
                }
                countChecked++;
            }
        }
        if (countChecked === 0) error.innerHTML = 'Bạn chưa chọn sản phẩm nào';
        else if (error.innerHTML === '') {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        alert("Xuất hàng thành công!\nSản phẩm đã được chuyển vào mục xuất đi\nBạn hãy chờ đại lý xác nhận");
                    } else error.innerHTML = 'Không tìm thấy đại lý'
                }
            }
            xmlHttp.open('POST', URL + '/producer/export-for-agent', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'producerId=' + this.props.id
                + '&agentName=' + agentName
                + '&arrBatch=' + JSON.stringify(arrBatch)
            )

            // Load lại list product in storage
            this.componentDidMount();
        }
    }

    // Xử lý event khi 1 row đc checked thì chuyển màu vàng ngược lại chuyển về màu ban đầu
    changeBackgorund(event) {
        var input = event;
        var td = event.parentNode;
        var numberExport;
        if (input.checked) {
            td.parentNode.style.background = "yellow";

            numberExport = document.createElement('input');
            numberExport.className = 'inputNumberOf'
            numberExport.placeholder = 'Số lượng xuất';
            td.appendChild(numberExport);
        }
        else {
            if (Number(td.nextSibling.innerHTML) % 2 === 1) td.parentNode.style.background = "rgba(0,0,21,.05)";
            else td.parentNode.style.background = "white";

            numberExport = input.nextSibling;
            td.removeChild(numberExport);
        }
    }

    // Lấy ra các sản phẩm mới trong kho của producer
    componentDidMount() {
        var tr = document.querySelectorAll("tr");
        var tbody = document.querySelector('tbody');
        for (var k = 1; k < tr.length; k++) tbody.removeChild(tr[k]);

        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var checkbox = document.createElement('td');
                        var input = document.createElement('input');
                        input.type = 'checkbox';
                        var id = document.createElement('td');
                        id.className = 'columnId';
                        var name = document.createElement('td');
                        var batch = document.createElement('td');
                        var capacity = document.createElement('td');
                        var amount = document.createElement('td');
                        var color = document.createElement('td');
                        var wm = document.createElement('td');
                        var description = document.createElement('td');

                        checkbox.appendChild(input);
                        if (data[i].batchId) id.innerHTML = data[i].batchId;
                        else id.innerHTML = '';
                        
                        if (data[i].productLine) name.innerHTML = data[i].productLine;
                        else name.innerHTML = '';
                        
                        if (data[i].batchNumber) batch.innerHTML = data[i].batchNumber;
                        else batch.innerHTML = '';

                        if (data[i].capacity) capacity.innerHTML = data[i].capacity;
                        else capacity.innerHTML = '';

                        if (data[i].amountNow) amount.innerHTML = data[i].amountNow;
                        else amount.innerHTML = '';
                        
                        if (data[i].color) color.innerHTML = data[i].color;
                        else color.innerHTML = '';

                        if (data[i].WM) wm.innerHTML = data[i].WM;
                        else wm.innerHTML = '';
                        
                        description.innerHTML = 'Xem';

                        tr.appendChild(checkbox);
                        tr.appendChild(id);
                        tr.appendChild(name);
                        tr.appendChild(batch);
                        tr.appendChild(capacity);
                        tr.appendChild(amount);
                        tr.appendChild(color);
                        tr.appendChild(wm);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        input.onchange = function() {
                            root.changeBackgorund(this);
                        }

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/producer/list-new-product?producerId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI danh sách sản phẩm mới trong kho của producer
    render() {

        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Danh sách sản phẩm mới trong kho</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Lô</th>
                            <th>Dung lượng</th>
                            <th>Số lượng</th>
                            <th>Màu</th>
                            <th>Bảo hành</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div className="divRepair">
                    <form className="repair">
                    </form>
                    <div className="repair">
                        <label htmlFor="select">Xuất cho đại lý: </label>
                        <input id="agentName" list="searchAgent" placeholder="Tìm kiếm đại lý" onKeyUp={this.searchAgent}></input>
                        <datalist id="searchAgent">
                        </datalist>
                        <form onSubmit={this.exportProduct}>
                            <span className='errRepair2'></span>
                            <input type='submit' value='Xuất' id="special"></input>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Storage
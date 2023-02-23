import React, {Fragment} from "react";
import {URL} from "../../../../../url"

class Storage extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.customerInput = this.customerInput.bind(this);
        this.returnProducer = this.returnProducer.bind(this);
        this.changeBackgorund = this.changeBackgorund.bind(this);
    }
    
    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const productId = event.parentNode.firstChild.nextSibling.innerHTML;
        this.props.changeProductId(productId);
        this.props.changeBackType('Sản phẩm mới');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra các sản phẩm đã được checked và gửi về producer
    returnProducer(event) {
        event.preventDefault();
        var error1 = document.getElementsByClassName('errRepair1')[0]; // span hiển thị lỗi
        var error2 = document.getElementsByClassName('errRepair2')[0]; // span hiển thị lỗi
        error1.innerHTML = '';
        error2.innerHTML = '';
        // Mảng tr có phần tử đầu tiên là th => Lấy ra all sản phẩm đc checked
        var tr = document.querySelectorAll("tr");
        var countChecked = 0;
        var arrProduct = [];
        for (var i = 1; i < tr.length; i++) {
            if (tr[i].firstChild.firstChild.checked) {
                const importBatchId = tr[i].firstChild.nextSibling.innerHTML;
                const batchId = tr[i].firstChild.nextSibling.nextSibling.innerHTML;
                const name = tr[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
                const capacity = tr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
                const amount = tr[i].lastChild.previousSibling.previousSibling.previousSibling.innerHTML;
                const batch = tr[i].lastChild.previousSibling.previousSibling.innerHTML;
                const producerId = tr[i].lastChild.previousSibling.innerHTML;

                arrProduct[countChecked] = {
                    importBatchId: importBatchId,
                    batchId: batchId,
                    productLine: name,
                    capacity: capacity,
                    amount: amount,
                    batchNumber: batch,
                    producerId: producerId
                }

                countChecked++;
            }
        }
        if (countChecked === 0) error1.innerHTML = 'Bạn chưa chọn sản phẩm nào';
        else {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const data = JSON.parse(this.responseText);
                        if (!data.access) {
                            error1.innerHTML = data.mess;
                            return;
                        }
                        alert("Thành công!\nSản phẩm đã chuyển vào mục trả lại cơ sở sản xuất");
                        var tbody = document.querySelector('tbody');
                        for (var j = tr.length - 1; j > 0; j--) {
                            if (tr[j].firstChild.firstChild.checked) {
                                tbody.removeChild(tr[j]);
                            }
                        }
                    }
                }
            }
            xmlHttp.open('POST', URL + '/agent/return-old', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'agentId=' + this.props.id
                + '&date=' + document.getElementById('date').value
                + '&arrProduct=' + JSON.stringify(arrProduct)
            )
        }
    }

    // Chuyển sang trang nhập thông tin khách hàng
    customerInput(event) {
        event.preventDefault();
        var error1 = document.getElementsByClassName('errRepair1')[0]; // span hiển thị lỗi
        var error2 = document.getElementsByClassName('errRepair2')[0]; // span hiển thị lỗi
        error1.innerHTML = '';
        error2.innerHTML = '';
        // Mảng tr có phần tử đầu tiên là th
        var tr = document.querySelectorAll("tr");
        var countChecked = 0; // Đếm số lượng sản phẩm checked
        var products = [];
        for (var i = 1; i < tr.length; i++) {
            if (tr[i].firstChild.firstChild.checked) {
                var productAttributes = [];
                for(var j = 1; j < tr[i].childNodes.length - 1; j++) {
                    productAttributes[j - 1] = tr[i].childNodes[j].innerHTML;
                }
                products[countChecked] = productAttributes;
                countChecked++;
            }
        }
        if (countChecked === 0) error2.innerHTML = 'Bạn chưa chọn sản phẩm nào';
        else {
            // Cập nhật các sản phẩm đã checked để bán cho khách hàng và chuyển sang trang customerInput
            this.props.changeProducts(products);
            this.props.changeTypeProfile("Nhập thông tin khách hàng");
        }
    }

    // Xử lý event khi 1 row đc checked thì chuyển màu vàng ngược lại chuyển về màu ban đầu
    changeBackgorund(event) {
        var input = event;
        var td = event.parentNode;
        if (input.checked) td.parentNode.style.background = "yellow";
        else if (Number(td.nextSibling.innerHTML) % 2 === 1) td.parentNode.style.background = "rgba(0,0,21,.05)";
        else td.parentNode.style.background = "white";
    }

    // Load lần đầu list sản phẩm trong kho của agent
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
                        var checkbox = document.createElement('td');
                        var input = document.createElement('input');
                        input.type = 'checkbox';
                        var importBatchId = document.createElement('td');
                        importBatchId.className = 'columnId';
                        var batchId = document.createElement('td');
                        batchId.className = 'columnId';
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var wm = document.createElement('td');
                        var amount = document.createElement('td');
                        var batch = document.createElement('td');
                        batch.style.hidden = true;
                        var producerId = document.createElement('td');
                        producerId.style.hidden = true;
                        var description = document.createElement('td');

                        checkbox.appendChild(input);
                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        wm.innerHTML = data[i].WM;
                        amount.innerHTML = data[i].amountNow;
                        batch.innerHTML = data[i].batchNumber;
                        producerId.innerHTML = data[i].producerId;
                        description.innerHTML = 'Xem';

                        tr.appendChild(checkbox);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(wm);
                        tr.appendChild(amount);
                        tr.appendChild(batch);
                        tr.appendChild(producerId);
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
        xmlHttp.open('GET', URL + '/agent/list-new-arrival?agentId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI sản phẩm trong kho của agent
    render() {
        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Sản phẩm mới</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Số tháng bảo hành</th>
                            <th>Số lượng</th>
                            <th>Lô</th>
                            <th hidden>producerId</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div className="divRepair">
                    <form className="repair" onSubmit={this.returnProducer}>
                        <label htmlFor="select">Trả lại cơ sở sản xuất: </label>
                        <span className='errRepair1'></span>
                        <input type='submit' value='Trả lại'></input>
                        <input type='date' id="date"></input>
                    </form>
                    <form className="repair" onSubmit={this.customerInput}>
                        <label htmlFor="select">Nhập thông tin khách hàng mua: </label>
                        <span className='errRepair2'></span>
                        <input type='submit' value='Tiếp theo'></input>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default Storage
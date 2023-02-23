import React, { Fragment } from "react";
import {URL} from "../../../../url"

class ImportProductBatch extends React.Component {

    constructor(props) {
        super(props);
        // Save type product
        this.state = {
            listProduct: []
        }
        this.importStorage = this.importStorage.bind(this);
        this.update = this.update.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    /*
        Thêm lô mà producer vừa nhập vào bảng để nhập các lô vào kho
    */
    update(event) {
        event.preventDefault();
        var error = document.getElementsByClassName('errProfile')[1];
        error.innerHTML = '';
        
        var batch = document.getElementById("batch");
        var name = document.getElementById("name");
        var color = document.getElementById("color");
        var amount = document.getElementById("amount");
        var dom = document.getElementById("dom");
        var tos = document.getElementById("tos");
        var capacity = document.getElementById("capacity");
        var date = document.getElementById("bio");

        if (!batch.value || !name.value || !color.value || !amount.value || !dom.value || !tos.value || !capacity.value || !date.value) {
            error.innerHTML = 'Bạn chưa nhập đầy đủ thông tin';
            return;
        }

        var tr = document.createElement("tr");
        var tdBatch = document.createElement("td");
        var tdName = document.createElement("td");
        var tdColor = document.createElement("td");
        var tdAmount = document.createElement("td");
        var tdDom = document.createElement("td");
        var tdTos = document.createElement("td");
        var tdCapacity = document.createElement("td");
        var tdDate = document.createElement("td");
        var tdDelete = document.createElement("td");

        tdBatch.innerHTML = batch.value;
        tdName.innerHTML = name.value;
        tdCapacity.innerHTML = capacity.value;
        tdTos.innerHTML = tos.value;
        tdColor.innerHTML = color.value;
        tdAmount.innerHTML = amount.value;
        tdDom.innerHTML = dom.value;
        tdDate.innerHTML = date.value;
        tdDelete.innerHTML = "Bỏ";

        tr.appendChild(tdBatch);
        tr.appendChild(tdName);
        tr.appendChild(tdCapacity);
        tr.appendChild(tdTos);
        tr.appendChild(tdColor);
        tr.appendChild(tdAmount);
        tr.appendChild(tdDom);
        tr.appendChild(tdDate);
        tr.appendChild(tdDelete);

        document.querySelector(".tableProductLine > tbody").appendChild(tr);

        var root = this;
        tdDelete.style.cursor = 'pointer'
        tdDelete.onclick = function() {
            root.delete(this);
        }
    }

    /*
        Gửi request gồm data về các lô lên database để update vào database kho của cơ sở sản xuất
    */
   importStorage(event) {
        event.preventDefault();
        var error1 = document.getElementsByClassName('errProfile')[0];
        var error2 = document.getElementsByClassName('errProfile')[1];
        error1.innerHTML = '';
        error2.innerHTML = '';
        // element 0 là th
        const arrTr = document.querySelectorAll('tr');

        var arrBatch = [];
        for (var i = 1; i < arrTr.length; i++) {
            const batch = arrTr[i].firstChild.innerHTML;
            const name = arrTr[i].firstChild.nextSibling.innerHTML;
            const capacity = arrTr[i].firstChild.nextSibling.nextSibling.innerHTML;
            const tos = arrTr[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML;
            const color = arrTr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
            const amount = arrTr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
            const dom = arrTr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
            const date = arrTr[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
        
            arrBatch[i - 1] = {
                batchNumber: batch,
                amount: amount,
                productLine: name,
                capacity: capacity,
                color: color,
                DOM: dom,
                WM: tos,
                date: date 
            }
        }
        if (arrTr.length === 1) error1.innerHTML = 'Chưa có sản phẩm nào';
        else {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        alert('Nhập sản phẩm vào kho thành công!')
                    }
                }
            }
            xmlHttp.open('POST', URL + '/producer/import-batch', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'producerId=' + this.props.id
                + '&arrBatch=' + JSON.stringify(arrBatch)
            )
        ;}
   }

   // Xóa sản phẩm khỏi bảng
   delete(tdDelete) {
        var trDelete = tdDelete.parentNode;
        var tbody = document.querySelector('tbody');
        tbody.removeChild(trDelete);
   }

   changeName(event) {
        var name = event.target.value;
        var capacity = document.getElementById('capacity');
        var tos = document.getElementById('tos');

        var arrOptionCapacity = document.querySelectorAll('#capacity>option')
        for (var l = arrOptionCapacity.length - 1; l >= 0; l--) capacity.removeChild(arrOptionCapacity[l]);

        for (var i = 0; i < this.state.listProduct.length; i++) {
            if (name === this.state.listProduct[i].name) {
                for (var j = 0; j < this.state.listProduct[i].capacity.length; j++) {
                    var option = document.createElement('option');
                    option.value = this.state.listProduct[i].capacity[j];
                    option.innerHTML = this.state.listProduct[i].capacity[j];

                    capacity.appendChild(option);
                }

                tos.value = this.state.listProduct[i].WM;
            }
        }
   }

   // Load các type product
   componentDidMount() {
        const root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var name = document.getElementById('name');
                    for (var i = 0; i < data.length; i++) {
                        var option = document.createElement('option');
                        option.value = data[i].name;
                        option.innerHTML = data[i].name;
                        name.appendChild(option);

                        root.setState({
                            listProduct: data
                        })
                    }

                    // Load lần đầu -> add list capacity và wm của product line đầu tiên
                    var capacity = document.getElementById('capacity');
                    for (var j = 0; j < data[0].capacity.length; j++) {
                        var optionCapacity = document.createElement('option');
                        optionCapacity.value = data[0].capacity[j];
                        optionCapacity.innerHTML = data[0].capacity[j];
    
                        capacity.appendChild(optionCapacity);
                    }
                    var tos = document.getElementById('tos');
                    tos.value = data[0].WM;
                }
            }
        }
        xmlHttp.open('GET', URL + '/producer/list-product-type?producerId=' + this.props.id, false);
        xmlHttp.send(null)
   }

    // UI nhập lô sản phẩm vào kho của producer
    render() {

        return(
            <Fragment>
                <table className="tableProductLine">
                    <thead>
                        <tr>
                            <th>Lô</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Bảo hành</th>
                            <th>Màu sắc</th>
                            <th>Số lượng</th>
                            <th>NSX</th>
                            <th>Date</th>
                            <th>Bỏ chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div>
                    <form className="profile" onSubmit={this.importStorage}>
                            <span className='errProfile'></span>
                            <input type='submit' value='Nhập kho'></input>
                    </form>
                    <form className="profile" onSubmit={this.update}>
                        <h1>Nhập lô sản phẩm vào kho</h1>

                        <label htmlFor='batch'>Số lô</label>
                        <input type='text' id='batch'></input>
                        <br></br>

                        <label htmlFor='name'>Tên:  </label>
                        <select id="name" onChange={this.changeName}>
                        </select>
                        <br></br>

                        <label htmlFor='capacity'>Dung lượng lưu trữ:  </label>
                        <select id="capacity">
                        </select>
                        <br></br>

                        <label htmlFor='tos'>Số tháng bảo hành</label>
                        <input type='number' id='tos' readOnly></input>

                        <label htmlFor='color'>Màu sắc</label>
                        <input type='text' id='color'></input>
                        <br></br>
                        
                        <label htmlFor='amount'>Số lượng</label>
                        <input type='text' id='amount'></input>

                        <label htmlFor='dom'>NSX</label>
                        <input type='date' id='dom'></input>

                        <label htmlFor='bio'>Date</label>
                        <input type='date' id='bio'></input>

                        <span className='errProfile'></span>
                        <input type='submit' value='Thêm'></input>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default ImportProductBatch
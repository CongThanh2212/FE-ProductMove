import React from "react";
import {URL} from "../../../url"

class CreateProductLine extends React.Component {

    constructor(props) {
        super(props);
        this.addCapacity = this.addCapacity.bind(this);
        this.delCapacity = this.delCapacity.bind(this);
    }

    // Lấy ra các thông tin user nhập thực hiện kiểm tra và gửi request tạo product line
    create(event) {
        event.preventDefault();
        const arrInput = document.querySelectorAll('input');
        const productLine = arrInput[0].value;
        const wm = arrInput[1].value;
        var capacities = '';

        for (var i = 2; i < arrInput.length - 1; i++) {
            if (capacities === '') capacities += arrInput[i].value;
            else capacities = capacities + ',' + arrInput[i].value;
        }
        
        var error = document.getElementsByClassName('errProfile')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        // Kiểm tra inputs user
        if (!productLine || !wm || !capacities) {
            error.innerHTML = 'Bạn chưa nhập đầy đủ thông tin';
            return;
        }

        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert("Thêm dòng sản phẩm thành công");
                } else {
                    const data = JSON.parse(this.responseText);
                    error.innerHTML = data.errorMessage;
                }
            }
        }
        xmlHttp.open('POST', URL + '/management/create-product-line', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id=' + this.props.id
            + 'name=' + productLine
            + '&WM=' + wm
            + '&arrCapacity=' + capacities
        )
    }

    addCapacity() {
        const obj = document.querySelector('form');
        const addIcon = document.getElementsByClassName('fas fa-plus-circle')[0];

        var newCapacity = document.createElement('input');
        newCapacity.placeholder = 'Dung lượng';
        obj.insertBefore(newCapacity, addIcon);
    }

    delCapacity() {
        const arrInput = document.querySelectorAll('input');
        if (arrInput.length === 4) return;

        const obj = document.querySelector('form');
        obj.removeChild(arrInput[arrInput.length - 2]);
    }

    // UI tạo thêm product line
    render() {
        return (
            <form className="createAccount" onSubmit={this.create}>
                <h1>Thêm dòng sản phẩm</h1>
                <input type='text' placeholder='Tên dòng sản phẩm'></input>
                <input type='text' placeholder='Số tháng bảo hành'></input>
                <input type='text' placeholder='Dung lượng'></input>
                <i class="fas fa-plus-circle" onClick={this.addCapacity}></i>
                <i class="fas fa-minus-circle" onClick={this.delCapacity}></i>
                <span className='errProfile'></span>
                <input type='submit' value='Tạo'></input>
            </form>
        )
    }
}

export default CreateProductLine
import React from "react";
import {URL} from "../../url"

class InforAccount extends React.Component {

    constructor(props) {
        super(props);
        /* 
            các state này lưu trữ thông tin tê, địa chỉ, sđt, thông tin thêm mà server gửi về
            => so sánh với thông tin user nhập vào để kiểm tra có thay đổi hay không
        */
        this.state = {
            constName: '',
            constAddress: '',
            constPhone: ''
        }
        this.update = this.update.bind(this);
        this.edit = this.edit.bind(this);
    }

    /*
        Xử lý event user onclick vào icon edit => Chuyển value readOnly của input tương ứng thành false để user
        có thể thay đổi thông tin
    */
    edit(event) {
        var inputEdit = event.target.previousSibling;
        inputEdit.readOnly = false;
    }

    // Lấy ra các thông tin user nhập vào cần thay đổi thực hiện kiểm tra và gửi request lên server
    update(event) {
        event.preventDefault();
        var root = this;
        var error = document.getElementsByClassName('errProfile')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        if (!name || !address || !phone) {
            error.innerHTML = 'Bạn chưa nhập hết các thông tin cần chỉnh sửa';
            return;
        }

        // So sánh với các state nếu không có thay đổi gì thì hiện thông báo. Ngược lại có thay đổi thì gửi request lên server
        if (name === this.state.constName && address === this.state.constAddress && phone === this.state.constPhone) {
            error.innerHTML = 'Bạn chưa thay đổi thông tin nào';
            return;
        }

        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    error.innerHTML = '';
                    alert('Thay đổi thông tin thành công');
                    // Thành công thì cập nhật giá trị các state
                    root.setState({
                        constName: name,
                        constAddress: address,
                        constPhone: phone
                    })
                }
            }
        }
        xmlHttp.open('POST', URL + '/general/edit-account-profile', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id=' + this.props.id
            + '&name=' + name
            + '&address=' + address
            + '&phone=' + phone
        )
    }

    // Lấy ra thông tin chi tiết của account đang đăng nhập
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText)[0];
                    if (data === null) return;
                    var name = '', address = '', phone = '';
                    if (data.name) {
                        name = data.name;
                        document.getElementById('name').value = name;
                    }
                    document.getElementById('username').value = data.userName;
                    document.getElementById('type').value = data.type;
                    if (data.email) document.getElementById('email').value = data.email;
                    else document.getElementById('email').value = '';
                    if (data.address) {
                        address = data.address;
                        document.getElementById('address').value = address;
                    }
                    if (data.phone) {
                        phone = data.phone;
                        document.getElementById('phone').value = phone;
                    }
                    root.setState({
                        constName: name,
                        constAddress: address,
                        constPhone: phone
                    })
                }
            }
        }
        xmlHttp.open('GET', URL + '/general/account-profile?id=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI thông tin chi tiết account đang đăng nhập
    render() {

        return(
            <form className="profile" method="" action="" onReset={this.componentDidMount} onSubmit={this.update}>
                <h1>Thông tin tài khoản</h1>
                
                <label htmlFor='name'>Tên</label>
                <input type='text' id='name' name='name' readOnly></input><i className="fas fa-edit" onClick={this.edit}></i>
                <br></br>
                
                <label htmlFor='username'>Tên tài khoản</label>
                <input type='text' id='username' name='username' readOnly></input>
                <br></br>
                
                <label htmlFor='type'>Loại tài khoản</label>
                <input type='text' id='type' name='type' readOnly></input>
                <br></br>

                <label htmlFor='id'>Id</label>
                <input type='text' id='id' value={this.props.id} name='id' readOnly></input>
                <br></br>

                <label htmlFor='email'>Email</label>
                <input type='text' id='email' name='email' readOnly></input>
                <br></br>

                <label htmlFor='address'>Địa chỉ</label>
                <input type='text' id='address' name='address' readOnly></input><i className="fas fa-edit" onClick={this.edit}></i>
                <br></br>

                <label htmlFor='phone'>Số điện thoại</label>
                <input type='phone' id='phone' name='phone' readOnly></input><i className="fas fa-edit" onClick={this.edit}></i>
                <br></br>

                <span className='errProfile'></span>
                <input type='submit' value='Thay đổi thông tin'></input>
            </form>
        )
    }
}

export default InforAccount
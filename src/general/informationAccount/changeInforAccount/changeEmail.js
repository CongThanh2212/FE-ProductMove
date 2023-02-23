import React, { Fragment } from "react";
import {URL} from "../../../url"

class ChangeEmail extends React.Component {

    constructor(props) {
        super(props);
        this.require = this.require.bind(this);
        this.enterOtp = this.enterOtp.bind(this);
        this.newEmail = this.newEmail.bind(this);
        this.done = this.done.bind(this);
        this.verificationEmail = this.verificationEmail.bind(this);
    }

    // Kiểm tra định dạng email
    verificationEmail(email) {
        var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)) return true;
        else return false;
    }

    // Khi user onclick gửi gửi mã thì thực hiện request gửi mã otp để thay đổi email lên server
    require(event) {
        event.preventDefault();
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert('Mã OTP đã được gửi đến email của bạn');
                    // Thành công thì ẩn UI hiện tại và hiển thị UI bước tiếp theo
                    var formChild1 = document.querySelector('main').firstChild;
                    formChild1.style.display = 'none';
                    formChild1.nextSibling.style.display = 'block';
                } else alert(this.status); 
            }
        }
        xmlHttp.open('POST', URL + '/auth/req_change_email', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_user=' + this.props.id
        )
    }

    // Lấy OTP user nhập vào kiểm tra và gửi lên server
    enterOtp(event) {
        event.preventDefault();
        var otp = document.getElementById('otp').value;
        var error = document.getElementsByClassName('errProfile')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        if (!otp) {
            error.innerHTML = 'Bạn chưa nhập mã OTP';
            return;
        }
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    // Thành công thì ẩn UI hiện tại và hiển thị UI bước tiếp theo
                    var formChild2 = document.querySelector('main').firstChild.nextSibling;
                    formChild2.style.display = 'none';
                    formChild2.nextSibling.style.display = 'block';
                } else error.innerHTML = 'Mã OTP không chính xác' // Không thành công thì hiển thị lỗi
            }
        }
        xmlHttp.open('POST', URL + '/auth/regit_email', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_user=' + this.props.id
            + '&otp=' + otp
        )
    }

    // Lấy email user nhập vào kiểm tra và gửi lên server
    newEmail(event) {
        event.preventDefault();
        var newEmail = document.getElementById('newEmail').value;
        var error = document.getElementsByClassName('errProfile')[1]; // span hiển thị lỗi
        error.innerHTML = '';
        if (!newEmail) {
            error.innerHTML = 'Bạn chưa nhập email';
            return;
        } else {
            if (!this.verificationEmail(newEmail)) {
                error.innerHTML = 'Email không đúng định dạng';
                return;
            }
        }
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert('Mã OTP đã được gửi đến email của bạn');
                    // Thành công thì ẩn UI hiện tại và hiển thị UI bước tiếp theo
                    var formChild3 = document.querySelector('main').firstChild.nextSibling.nextSibling;
                    formChild3.style.display = 'none';
                    formChild3.nextSibling.style.display = 'block';
                } else {
                    // Không thành công thì hiển thị lỗi
                    const data = JSON.parse(this.responseText);
                    error.innerHTML = data.errorMessage;
                }
            }
        }
        xmlHttp.open('POST', URL + '/auth/confirm_email', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_user=' + this.props.id
            + '&email=' + newEmail
        )
    }

    // Lấy OTP user nhập vào kiểm tra và gửi lên server
    done(event) {
        event.preventDefault();
        var otp = document.getElementById('otp2').value;
        var error = document.getElementsByClassName('errProfile')[2];
        error.innerHTML = '';
        if (!otp) {
            error.innerHTML = 'Bạn chưa nhập mã OTP';
            return;
        }
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    alert('Thay đổi email thành công')
                    // Thành công thì ẩn UI hiện tại và quay lại hiển thị UI bước đầu tiên
                    var main = document.querySelector('main');
                    main.lastChild.style.display = 'none';
                    main.firstChild.style.display = 'block';
                } else error.innerHTML = 'Mã OTP không chính xác' // Không thành công thì hiển thị lỗi
            }
        }
        xmlHttp.open('POST', URL + '/auth/regit_email', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_user=' + this.props.id
            + '&otp=' + otp
        )
    }

    /*
        UI thay đổi email tài khoản gồm 4 form:
            - form thứ nhất: để user nhấp vào gửi mã OTP thay đổi email
            - form thứ 2: để user nhập mã OTP xác nhận thay đổi email
            - form thứ 3: để user nhập email mới
            - form thứ 4: để user nhập mã OTP xác nhận email mới
    */
    render() {
        return(
           <Fragment>
                <form className="profile" onSubmit={this.require}>
                    <h1>Thay đổi email</h1>
                    <input type='submit' value='Gửi mã OTP'></input>
                </form>
                <form className="profile" onSubmit={this.enterOtp}>
                    <h1>Thay đổi email</h1>
    
                    <label htmlFor='otp'>Nhập mã OTP</label>
                    <input type='text' id='otp'></input>
                    <br></br>
                    <span className='errProfile'></span>
                    <input type='submit' value='Nhập'></input>
                </form>
                <form className="profile" onSubmit={this.newEmail}>
                    <h1>Thay đổi email</h1>

                    <label htmlFor='newEmail'>Nhập email mới</label>
                    <input type='text' id='newEmail'></input>
                    <br></br>
                    <span className='errProfile'></span>
                    <input type='submit' value='Nhập'></input>
                </form>
                <form className="profile" onSubmit={this.done}>
                    <h1>Thay đổi email</h1>
    
                    <label htmlFor='otp2'>Nhập mã OTP</label>
                    <input type='text' id='otp2'></input>
                    <br></br>
                    <span className='errProfile'></span>
                    <input type='submit' value='Nhập'></input>
                </form>
           </Fragment>
        )
    }
}

export default ChangeEmail
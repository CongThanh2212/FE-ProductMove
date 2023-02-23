import React, { Fragment } from "react";
import { Navigate } from 'react-router-dom';
import {URL} from "../url"

class ConfirmEmail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            confirm: false // Xác định xem account đã confirm thành công email hay chưa
        }
        this.enterEmail = this.enterEmail.bind(this);
        this.enterOtp = this.enterOtp.bind(this);
        this.login = this.login.bind(this);
        this.verificationEmail = this.verificationEmail.bind(this);
    }

    // Kiểm tra định dạng email
    verificationEmail(email) {
        var mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)) return true;
        else return false;
    }

    // Thay đổi kiểu hiển thị sang đăng nhập
    login(event) {
        this.props.changeInterfaceType(event.target.innerHTML);
    }

    // Lấy email user nhập vào kiểm tra email và gửi requesr lên server
    enterEmail(event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var error = document.getElementsByClassName('errLogin')[0]; // span hiển hị lỗi
        error.innerHTML = '';
        if (!email) {
            error.innerHTML = 'Bạn chưa nhập email';
            return;
        } else {
            if (!this.verificationEmail(email)) {
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
                    var formChild1 = document.getElementById('root').firstChild;
                    formChild1.style.display = 'none';
                    formChild1.nextSibling.style.display = 'block';
                } else {
                    const data = JSON.parse(this.responseText);
                    error.innerHTML = data.errorMessage;
                }
            }
        }
        xmlHttp.open('POST', URL + '/auth/confirm_email', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_user=' + this.props.id
            + '&email=' + email
        )
    }

    // Lấy OTP user nhập vào kiểm tra và gửi lên server
    enterOtp(event) {
        event.preventDefault();
        var otp = document.getElementById('otp').value;
        var error = document.getElementsByClassName('errLogin')[1]; // span hiển thị lỗi
        error.innerHTML = '';
        if (!otp) {
            error.innerHTML = 'Bạn chưa nhập mã OTP';
            return;
        }
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    // Thành công thì thay đổi giá trị biến state là confirm sang true
                    root.setState({
                        confirm: true
                    })
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

    render() {

        // confirm là true thì auto đăng nhập cho user
        if (this.state.confirm) return <Navigate to={this.props.accountType}/>;

        /*
            UI xác minh email lần đầu tiên đăng nhập tài khoản do ban quản lý cấp, gồm 2 form
                - form đầu tiên: nhập email
                - form thứ 2: nhập OTP đc gửi về email
        */
        return (
            <Fragment>
                <form className='login' onSubmit={this.enterEmail}>
                    <div>
                        <h1>Xác minh email</h1>
                        <input type='text' id='email' placeholder='Nhập email'></input>
                        <span className='errLogin'></span>
                        <input type='submit' value='Tiếp theo'></input>
                        <a href='#!' onClick={this.login}>Đăng nhập</a>
                    </div>
                </form>
                <form className='login' onSubmit={this.enterOtp}>
                    <div>
                        <h1>Xác minh email</h1>
                        <input type='text' id='otp' placeholder='Nhập mã OTP'></input>
                        <span className='errLogin'></span>
                        <input type='submit' value='Nhập'></input>
                        <a href='#!' onClick={this.login}>Đăng nhập</a>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default ConfirmEmail
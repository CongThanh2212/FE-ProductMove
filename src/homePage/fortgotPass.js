import React, { Fragment } from "react";
import {URL} from "../url"

class ForgotPass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 'none' // Lưu trữ id mà server gửi về
        }
        this.enterEmail = this.enterEmail.bind(this);
        this.enterOtp = this.enterOtp.bind(this);
        this.enterPassword = this.enterPassword.bind(this);
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
    login() {
        this.props.changeInterfaceType('Đăng nhập');
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
                    // Không thành công thì hiển thị lỗi
                    const data = JSON.parse(this.responseText);
                    error.innerHTML = data.errorMessage;
                }
            }
        }
        xmlHttp.open('POST', URL + '/auth/forget_password', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'email=' + email
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
                    /*
                        Thành công => Lưu lại id server trả về để thực hiện bước tiếp theo
                        và ẩn UI hiện tại, hiển thị UI bước tiếp theo
                    */
                    root.setState({
                        id: JSON.parse(this.responseText).id_user
                    })
                    var formChild2 = document.getElementById('root').firstChild.nextSibling;
                    formChild2.style.display = 'none';
                    formChild2.nextSibling.style.display = 'block';
                } else error.innerHTML = 'Mã OTP không chính xác'
            }
        }
        xmlHttp.open('GET', URL + '/auth/check_passwordrc?otp=' + otp, false);
        xmlHttp.send(null)
    }

    // Nhập password mới
    enterPassword(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const repassword = document.getElementById('repassword').value;
        var error = document.getElementsByClassName('errLogin')[2]; // span hiển thị lỗi
        error.innerHTML = '';
        if (!password || !repassword) {
            error.innerHTML = 'Bạn chưa nhập đầy đủ thông tin';
            return;
        } else if (password !== repassword) {
            error.innerHTML = 'Mật khẩu nhập lại chưa chính xác';
            return;
        }
        const xmlHttp = new XMLHttpRequest();
        var root = this;
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    // Thành công thì chuyển user sang UI đăng nhập
                    alert("Thành công!\nBạn hãy đăng nhập vào tài khoản của mình")
                    root.login();
                }
            }
        }
        xmlHttp.open('POST', URL + '/auth/change_password', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'id_user=' + this.state.id
            + '&password=' + password
            + '&repassword=' + repassword
        )
    }

    render() {

        /*
            UI xác minh email lần đầu tiên đăng nhập tài khoản do ban quản lý cấp, gồm 3 form
                - form đầu tiên: nhập email
                - form thứ 2: nhập OTP đc gửi về email
                - form thứ 3: nhập password mới
        */
        return (
            <Fragment>
                <form className='login' onSubmit={this.enterEmail}>
                    <div>
                        <h1>Tìm mật khẩu</h1>
                        <input type='text' id='email' placeholder='Nhập email để tìm lại mật khẩu'></input>
                        <span className='errLogin'></span>
                        <input type='submit' value='Tiếp theo'></input>
                        <a href='#!' onClick={this.login}>Đăng nhập</a>
                    </div>
                </form>
                <form className='login' onSubmit={this.enterOtp}>
                    <div>
                        <h1>Tìm mật khẩu</h1>
                        <input type='text' id='otp' placeholder='Nhập mã OTP'></input>
                        <span className='errLogin'></span>
                        <input type='submit' value='Tiếp theo'></input>
                        <a href='#!' onClick={this.login}>Đăng nhập</a>
                    </div>
                </form>
                <form className='login' onSubmit={this.enterPassword}>
                    <div>
                        <h1>Tìm mật khẩu</h1>
                        <input type='password' name='password' id='password' placeholder='Nhập mật khẩu mới'></input>
                        <input type='password' id='repassword' placeholder='Nhập lại'></input>
                        <span className='errLogin'></span>
                        <input type='submit' value='Nhập'></input>
                        <a href='#!' onClick={this.login}>Đăng nhập</a>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default ForgotPass
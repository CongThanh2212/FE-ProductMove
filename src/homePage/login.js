import React from 'react';
import '../general/css/login.css';
import { Navigate } from 'react-router-dom';
import {URL} from "../url"

class Login extends React.Component {

    constructor(props) {
        super(props);
        /*
            access: xác định đăng nhập thành công hay chưa
        */
        this.state = {
            access: false
        }
        this.login = this.login.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
    }

    forgotPassword(event) {
        this.props.changeInterfaceType(event.target.innerHTML);
    }

    /*
      Kiểm tra đăng nhập, thành công thì thay đổi giá trị của state.access thành true
    */
    login(event) {
        event.preventDefault();
        var root = this;
        var arrInput = document.getElementsByTagName('input');
        var userName = arrInput[0].value;
        var password = arrInput[1].value;
        var error = document.getElementsByClassName('errLogin')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        if (!userName || !password) {
            error.innerHTML = 'Bạn chưa nhập đầy đủ thông tin';
            return;
        }
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                const data = JSON.parse(this.responseText);
                if (this.status === 200) {
                    if (!data.access) {
                        error.innerHTML = 'Thông tin không chính xác';
                        return;
                    }
                    const id = data.accountId;
                    root.props.changeId(id); // Lưu lại id của account mà server trả về
                    var type; // Kiểu tài khoản mà user trả về => chọn đường dẫn phù hợp
                    switch(data.type) {
                        case "mg": {
                            type = '/management';
                            break;
                        }
                        case "pr": {
                            type = '/producer';
                            break;
                        }
                        case "sv": {
                            type = '/service';
                            break;
                        }
                        default: {
                            type = '/agent';
                        }
                    }
                    root.props.changeAccountType(type); // Thay đổi UI phù hợp với kiểu tài khoản
                    const cfEmail = data.cfEmail; // Xác định xem account đã có email hay chưa
                    // Account chưa có email thì chuyển sang UI xác minh email
                    // if (cfEmail === 0) {
                    //     root.props.changeInterfaceType("Xác minh email");
                    //     return;
                    // }
                    // Đăng nhập thành công, account đã có email thì chuyển user vào UI làm việc
                    root.setState({
                        access: true
                    })
                }
            }
        }
        xmlHttp.open('GET', URL + '/general/login?username=' + userName + '&password=' + password, false);
        xmlHttp.send(null);
    }

    render() {

        // access là true thì user đăng nhập thành công => chuyển user vào UI làm việc
        if (this.state.access) return <Navigate to={this.props.accountType}/>;

        // UI đăng nhập
        return (
            <form className='login' onSubmit={this.login}>
                <div>
                    <h1>Đăng nhập</h1>
                    <input type='text' name='userName' placeholder='Tài khoản'></input>
                    <input type='password' name='password' placeholder='Mật khẩu'></input>
                    <span className='errLogin'></span>
                    <input type='submit' value='Đăng nhập'></input>
                    <a href='#!' onClick={this.forgotPassword}>Quên mật khẩu</a>
                </div>
            </form>
        );
    }
}

export default Login
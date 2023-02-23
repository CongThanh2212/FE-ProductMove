import React from 'react';
import Login from './login';
import ForgotPass from './fortgotPass';
import '../general/css/login.css';
import ConfirmEmail from './confirmEmail';

class Home extends React.Component {

    constructor(props) {
        super(props);
        /*
            interfaceType: xác định UI hiển thị
            accountType: xác định loại tài khoản đăng nhập để hiện thị UI phù hợp
        */
        this.state = {
            interfaceType: "Đăng nhập",
            accountType: 'none'
        }
        this.changeInterfaceType = this.changeInterfaceType.bind(this);
        this.changeAccountType = this.changeAccountType.bind(this);
    }

    changeInterfaceType(event) {
        this.setState({
            interfaceType: event
        })
    }

    changeAccountType(event) {
        this.setState({
            accountType: event
        })
    }

    render() {
        // Dựa vào interfaceType để hiện UI phù hợp
        switch(this.state.interfaceType) {
            case "Quên mật khẩu": return <ForgotPass changeInterfaceType={this.changeInterfaceType}/>
            case "Xác minh email": return <ConfirmEmail changeInterfaceType={this.changeInterfaceType} id={this.props.id}
                accountType={this.state.accountType}/>
            default: return <Login changeInterfaceType={this.changeInterfaceType} changeId={this.props.changeId}
                changeAccountType={this.changeAccountType} accountType={this.state.accountType}/>
        }
    }
}

export default Home
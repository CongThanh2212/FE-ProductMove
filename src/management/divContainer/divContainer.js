import React from "react";
import ProductLine from "./functionManage/productLine"
import CreateAccount from "./functionManage/account/createAccount"
import ManageAccount from "./functionManage/account/manageAccount/manageAccount"
import CreateProductLine from "./functionManage/createProductLine"
import Statistical from "./functionManage/statistical";
import Profile from "./functionManage/account/manageAccount/profile"
import InforAccount from "../../general/informationAccount/inforAccount"
import ChangeEmail from "../../general/informationAccount/changeInforAccount/changeEmail"
import ChangePassword from "../../general/informationAccount/changeInforAccount/changePassword"
import Details from "../../general/historyDetails/details"
import PreliminaryInfor from "../../general/informationAccount/preliminaryInfor"
import CustomerInfor from "../../general/informationAccount/customerInfor"

class DivContainer extends React.Component {

    /*
      UI của ban quản lý:
        - typeFunction: xác định component sẽ hiển thị
        - changeType: thay đổi typeFunction
        - id: id của account
    */
    render() {
        return(
            <div className="container">
                <header></header>
                <main>
                    <FunctionManage typeFunction={this.props.typeFunc} changeType={this.props.changeTypeFunc} id={this.props.id}/>
                </main>
                <footer></footer>
            </div>
        )
    }
}

/*
    Lựa chọn component sẽ hiện thị thông qua tham số mà component khác truyền vào cho nó        
*/
class FunctionManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: 'none', // lưu trữ id sản phẩm được hiển thị
            userName: 'none', // lưu trữ username/name tài khoản khác để xem
            backType: 'none' // lưu trữ trang quay lại
        }
        this.changeProductId = this.changeProductId.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.changeBackType = this.changeBackType.bind(this);
    }

    changeBackType(type) {
        this.setState({
            backType: type
        })
    }

    changeProductId(id) {
        this.setState({
            productId: id
        })
    }

    changeUserName(name) {
        this.setState({
            userName: name
        })
    }

    render() {
        var type = this.props.typeFunction; // Kiểu hiển thị

        // Hiển thị component tương ứng với type mà DivContainer truyền vào
        switch(type) {
            case "Dòng sản phẩm": return <ProductLine id={this.props.id}/>
            case "Cấp tài khoản": return <CreateAccount id={this.props.id}/>
            case "Quản lý": return <ManageAccount changeTypeProfile={this.props.changeType} id={this.props.id}
                changeUserName={this.changeUserName}/>
            case "Thêm dòng sản phẩm": return <CreateProductLine id={this.props.id}/>
            case "Thống kê": return <Statistical id={this.props.id}/>
            case "Xem": return <Details changeTypeProfile={this.props.changeType} 
                productId={this.state.productId} changeUserName={this.changeUserName} backType={this.state.backType}/>
            case "Vị trí kho": return <PreliminaryInfor userName={this.state.userName} changeTypeProfile={this.props.changeType}/>
            case "Khách hàng": return <CustomerInfor productId={this.state.productId} changeTypeProfile={this.props.changeType}/>
            case "Chi tiết": return <Profile userName={this.state.userName} changeTypeProfile={this.props.changeType}
                id={this.props.id}/>
            case "Thay đổi email": return <ChangeEmail id={this.props.id}/>
            case "Thay đổi mật khẩu": return <ChangePassword id={this.props.id}/>
            default: return <InforAccount id={this.props.id}/>
        }
    }
}

export default DivContainer
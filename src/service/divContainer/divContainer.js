import React from "react"
import Storage from './functionService/storage/storage'
import Fixed from './functionService/storage/fixed'
import Failed from './functionService/storage/failed'
import MessageFromAgent from './functionService/messageFromAgent'
import InforAccount from '../../general/informationAccount/inforAccount'
import Details from "../../general/historyDetails/details"
import PreliminaryInfor from "../../general/informationAccount/preliminaryInfor"
import CustomerInfor from "../../general/informationAccount/customerInfor"
import Statistical from "./functionService/statistical"
import ChangeEmail from "../../general/informationAccount/changeInforAccount/changeEmail"
import ChangePassword from "../../general/informationAccount/changeInforAccount/changePassword"

class DivContainer extends React.Component {

    /*
      UI của service:
        - typeFunction: xác định component sẽ hiển thị
        - changeType: thay đổi typeFunction
        - id: id của account
    */
    render() {
        return(
            <div className="container">
                <header></header>
                <main>
                    <FunctionService typeFunction={this.props.typeFunc} changeType={this.props.changeTypeFunc} id={this.props.id}/>
                </main>
            </div>
        )
    }
}

/*
    Lựa chọn component sẽ hiện thị thông qua tham số mà component khác truyền vào cho nó        
*/
class FunctionService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            batchId: '', // lưu trữ id sản phẩm được hiển thị
            importId: '', // lưu trữ id sản phẩm được hiển thị
            productId: '', // lưu trữ id sản phẩm được hiển thị
            oldId: '', // lưu trữ id sản phẩm được hiển thị
            userName: 'none', // lưu trữ username tài khoản khác để xem
            backType: 'none' // lưu trữ trang quay lại
        }
        this.changeProductId = this.changeProductId.bind(this);
        this.changeUserName = this.changeUserName.bind(this);
        this.changeBackType = this.changeBackType.bind(this);
        this.changeBatchId = this.changeBatchId.bind(this);
        this.changeImportId = this.changeImportId.bind(this);
        this.changeOldId = this.changeOldId.bind(this);
    }

    changeBackType(type) {
        this.setState({
            backType: type
        })
    }

    changeBatchId(id) {
        this.setState({
            batchId: id
        })
    }

    changeImportId(id) {
        this.setState({
            importId: id
        })
    }

    changeProductId(id) {
        this.setState({
            productId: id
        })
    }

    changeOldId(id) {
        this.setState({
            oldId: id
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
            case "Trong kho": return <Storage changeTypeProfile={this.props.changeType} id={this.props.id}
                changeBatchId={this.changeBatchId} changeImportId={this.changeImportId} changeProductId={this.changeProductId} 
                changeOldId={this.changeOldId} changeBackType={this.changeBackType}/>
            case "Sửa chữa xong": return <Fixed changeTypeProfile={this.props.changeType} id={this.props.id}
                changeBatchId={this.changeBatchId} changeImportId={this.changeImportId} changeProductId={this.changeProductId} 
                changeOldId={this.changeOldId} changeBackType={this.changeBackType}/>
            case "Không thể sửa": return <Failed changeTypeProfile={this.props.changeType} id={this.props.id}
                changeBatchId={this.changeBatchId} changeImportId={this.changeImportId} changeProductId={this.changeProductId} 
                changeOldId={this.changeOldId} changeBackType={this.changeBackType}/>
            case "Thông báo bảo hành": return <MessageFromAgent changeTypeProfile={this.props.changeType} id={this.props.id} 
                changeBatchId={this.changeBatchId} changeImportId={this.changeImportId} changeProductId={this.changeProductId} 
                changeOldId={this.changeOldId} changeBackType={this.changeBackType}/>
            case "Xem": return <Details changeTypeProfile={this.props.changeType} id={this.props.id}
                changeUserName={this.changeUserName} backType={this.state.backType} batchId={this.state.batchId} 
                importId={this.state.importId} productId={this.state.productId} oldId={this.state.oldId}/>
            case "Vị trí kho": return <PreliminaryInfor id={this.props.id} userName={this.state.userName} changeTypeProfile={this.props.changeType}/>
            case "Khách hàng": return <CustomerInfor id={this.props.id} userName={this.state.userName} changeTypeProfile={this.props.changeType}/>
            case "Thống kê": return <Statistical id={this.props.id}/>
            case "Thay đổi email": return <ChangeEmail id={this.props.id}/>
            case "Thay đổi mật khẩu": return <ChangePassword id={this.props.id}/>
            default: return <InforAccount id={this.props.id}/>
        }
    }
}


export default DivContainer
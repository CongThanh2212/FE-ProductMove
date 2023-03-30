import React from "react"
import Storage from './functionAgent/storage/inStorage/storage'
import Sold from './functionAgent/storage/sold'
import Repairing from './functionAgent/storage/repairing'
import Recall from './functionAgent/storage/recall'
import NewProduct from './functionAgent/message/newProduct'
import Fixed from "./functionAgent/message/fixed"
import InforAccount from '../../general/informationAccount/inforAccount'
import Details from "../../general/historyDetails/details"
import PreliminaryInfor from "../../general/informationAccount/preliminaryInfor"
import CustomerInfor from "../../general/informationAccount/customerInfor"
import CustomerInput from "./functionAgent/storage/inStorage/customerInput"
import Fail from "./functionAgent/message/fail"
import ReturnCustomer from "./functionAgent/storage/returnCustomer"
import ReturnProducer from "./functionAgent/storage/returnProducer"
import SoldStatistical from "./functionAgent/statistical/soldStatistical"
import StatusStatistical from "./functionAgent/statistical/statusStatistical"
import ChangeEmail from "../../general/informationAccount/changeInforAccount/changeEmail"
import ChangePassword from "../../general/informationAccount/changeInforAccount/changePassword"

class DivContainer extends React.Component {


    /*
      UI của đại lý:
        - typeFunction: xác định component sẽ hiển thị
        - changeType: thay đổi typeFunction
        - arrProduct: lưu trữ các sản phẩm đc checked để bán cho khách hàng
        - changeProducts: thay đổi arProduct
        - id: id của account
    */
    render() {
        return(
            <div className="container">
                <header></header>
                <main>
                    <FunctionAgent typeFunction={this.props.typeFunc} arrProduct={this.props.arrProduct}
                    changeType={this.props.changeTypeFunc} changeProducts={this.props.changeProducts} id={this.props.id}/>
                </main>
            </div>
        )
    }
}
    
/*
    Lựa chọn component sẽ hiện thị thông qua tham số mà component khác truyền vào cho nó        
*/
class FunctionAgent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            batchId: '', // lưu trữ id sản phẩm được hiển thị
            importId: '', // lưu trữ id sản phẩm được hiển thị
            productId: '', // lưu trữ id sản phẩm được hiển thị
            oldId: '', // lưu trữ id sản phẩm được hiển thị
            userName: '', // lưu trữ username tài khoản khác/ customerId để xem
            backType: '' // lưu trữ trang quay lại
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
            case "Sản phẩm mới": return <Storage changeTypeProfile={this.props.changeType} id={this.props.id}
                changeProducts={this.props.changeProducts} changeBackType={this.changeBackType} changeBatchId={this.changeBatchId} 
                changeImportId={this.changeImportId} changeProductId={this.changeProductId} changeOldId={this.changeOldId}/>
            case "Đã bán": return <Sold changeTypeProfile={this.props.changeType} id={this.props.id} changeBackType={this.changeBackType}
                changeBatchId={this.changeBatchId} changeImportId={this.changeImportId} changeProductId={this.changeProductId} 
                changeOldId={this.changeOldId}/>
            case "Trả lại cho khách hàng": return <ReturnCustomer changeTypeProfile={this.props.changeType}
                id={this.props.id} changeBackType={this.changeBackType} changeBatchId={this.changeBatchId} 
                changeImportId={this.changeImportId} changeProductId={this.changeProductId} changeOldId={this.changeOldId}/>
            case "Trả lại cơ sở sản xuất": return <ReturnProducer changeTypeProfile={this.props.changeType}
                id={this.props.id} changeBackType={this.changeBackType} changeBatchId={this.changeBatchId} 
                changeImportId={this.changeImportId} changeProductId={this.changeProductId} changeOldId={this.changeOldId}/>
            case "Đem đi bảo hành": return <Repairing changeTypeProfile={this.props.changeType}
                id={this.props.id} changeBackType={this.changeBackType} changeBatchId={this.changeBatchId}
                changeImportId={this.changeImportId} changeProductId={this.changeProductId} changeOldId={this.changeOldId}/>
            case "Triệu hồi": return <Recall changeTypeProfile={this.props.changeType} id={this.props.id} changeBackType={this.changeBackType}
                changeBatchId={this.changeBatchId} changeImportId={this.changeImportId} changeProductId={this.changeProductId} 
                changeOldId={this.changeOldId}/>
            case "Sản phẩm mới về": return <NewProduct changeTypeProfile={this.props.changeType} id={this.props.id}
                changeBackType={this.changeBackType} changeBatchId={this.changeBatchId} 
                changeImportId={this.changeImportId} changeProductId={this.changeProductId} changeOldId={this.changeOldId}/>
            case "Sản phẩm bảo hành": return <Fixed changeTypeProfile={this.props.changeType} id={this.props.id}
                changeBackType={this.changeBackType} changeBatchId={this.changeBatchId}
                changeImportId={this.changeImportId} changeProductId={this.changeProductId} changeOldId={this.changeOldId}/>
            case "Xem": return <Details changeTypeProfile={this.props.changeType} id={this.props.id}
                changeUserName={this.changeUserName} backType={this.state.backType} batchId={this.state.batchId} 
                importId={this.state.importId} productId={this.state.productId} oldId={this.state.oldId}/>
            case "Sản phẩm lỗi": return <Fail changeTypeProfile={this.props.changeType} id={this.props.id}
                changeBackType={this.changeBackType} changeBatchId={this.changeBatchId} 
                changeImportId={this.changeImportId} changeProductId={this.changeProductId} changeOldId={this.changeOldId}/>
            case "Vị trí kho": return <PreliminaryInfor id={this.props.id} userName={this.state.userName} changeTypeProfile={this.props.changeType}/>
            case "Khách hàng": return <CustomerInfor id={this.props.id} userName={this.state.userName} changeTypeProfile={this.props.changeType}/>
            case "Nhập thông tin khách hàng": return <CustomerInput id={this.props.id} arrProduct={this.props.arrProduct}
                changeTypeProfile={this.props.changeType}/>
            case "Nhập về": return <StatusStatistical id={this.props.id}/>
            case "Bán ra": return <SoldStatistical id={this.props.id}/>
            case "Thay đổi email": return <ChangeEmail id={this.props.id}/>
            case "Thay đổi mật khẩu": return <ChangePassword id={this.props.id}/>
            default: return <InforAccount id={this.props.id}/>
        }
    }
}

export default DivContainer
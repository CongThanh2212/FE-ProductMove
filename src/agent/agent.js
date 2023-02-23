import React, { Fragment } from "react"
import DivContainer from "./divContainer/divContainer"
import MenuAgent from "./menuAgent/menuAgent"

class Agent extends React.Component {
    constructor(props) {
        super(props);
        /*
            typeFunction: để xác định UI sẽ hiển thị component nào
            arrProduct: lưu trữ danh sách sản phẩm đc checked để bán cho khách hàng
        */
        this.state = {
            typeFunction: "Sản phẩm mới về",
            arrProduct: []
        }
        this.changeTypeFunction = this.changeTypeFunction.bind(this);
        this.productsSellForCustomer = this.productsSellForCustomer.bind(this);
    }

    changeTypeFunction(type) {
        this.setState({
            typeFunction: type
        })
    }

    productsSellForCustomer(arr) {
        this.setState({
            arrProduct: arr
        })
    }

    /*
      Trang UI của đại lý gồm:
        + 1 div container chứa all information của trang
        + 1 menu chung cho ban quản lý
    */
    render() {
        return(
            <Fragment>
                <DivContainer typeFunc={this.state.typeFunction} arrProduct={this.state.arrProduct}
                changeTypeFunc={this.changeTypeFunction} changeProducts={this.productsSellForCustomer} id={this.props.id}/>
                <MenuAgent changeTypeFunc={this.changeTypeFunction}/>
            </Fragment>
        )
    }
}

export default Agent
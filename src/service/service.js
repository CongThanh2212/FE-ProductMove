import React, { Fragment } from "react"
import MenuService from "./menuService/menuService"
import DivContainer from "./divContainer/divContainer";

class Service extends React.Component {
    constructor(props) {
        super(props);
        // typeFunction: để xác định UI sẽ hiển thị component nào
        this.state = {
            typeFunction: "Trong kho"
        }
        this.changeTypeFunction = this.changeTypeFunction.bind(this);
    }

    changeTypeFunction(type) {
        this.setState({
            typeFunction: type
        })
    }

    /*
      Trang UI của service gồm:
        + 1 div container chứa all information của trang
        + 1 menu chung cho ban quản lý
    */
    render() {
        return(
            <Fragment>
                <DivContainer typeFunc={this.state.typeFunction} changeTypeFunc={this.changeTypeFunction} id={this.props.id}/>
                <MenuService changeTypeFunc={this.changeTypeFunction}/>
            </Fragment>
        )
    }
}

export default Service
import React, { Fragment } from 'react'
import MenuManage from './menuManage/menuManage'
import DivContainer from './divContainer/divContainer'
import '../general/css/manage.css'
import '../general/css/menu.css'
import '../general/css/general.css'

class Management extends React.Component {
    
    constructor(props) {
        super(props);
        // typeFunction: để xác định UI sẽ hiển thị component nào
        this.state = {
            typeFunction: "Dòng sản phẩm"
        }
        this.changeTypeFunction = this.changeTypeFunction.bind(this);
    }

    changeTypeFunction(type) {
        this.setState({
            typeFunction: type
        })
    }

    /*
      Trang UI của ban quản lý gồm:
        + 1 div container chứa all information của trang
        + 1 menu chung cho ban quản lý
    */
    render() {
        return(
            <Fragment>
                <DivContainer typeFunc={this.state.typeFunction} changeTypeFunc={this.changeTypeFunction} id={this.props.id}/>
                <MenuManage changeTypeFunc={this.changeTypeFunction}/>
            </Fragment>
        )
    }
}

export default Management
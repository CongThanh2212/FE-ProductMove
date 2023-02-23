import React, { Fragment } from "react";
import {URL} from "../../url"

class CustomerInfor extends React.Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
    }

    // Quay lại trang trước là xem chi tiết sản phẩm (Details)
    back() {
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra thông tin của khách hàng thông qua id sản phẩm
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    if (data === null) return;
                    var arrInput = document.querySelectorAll('input');

                    if (data.name) arrInput[0].value = data.name;
                    else arrInput[0].value = '';

                    if (data.address) arrInput[1].value = data.address;
                    else arrInput[1].value = '';
                    
                    if (data.phone) arrInput[2].value = data.phone;
                    else arrInput[2].value = '';
                }
            }
        }
        xmlHttp.open('GET', URL + '/auth/infor_customer?id_product=' + this.props.productId, false);
        xmlHttp.send(null);
    }

    // UI thông tin khách hàng mua sản phẩm
    render() {
        return(
            <Fragment>
                <form className="profile">
                    <h1>Thông tin khách hàng</h1>

                    <label htmlFor='name'>Họ tên</label>
                    <input type='text' id='name' readOnly></input>
                    <br></br>

                    <label htmlFor='address'>Địa chỉ</label>
                    <input type='text' id='address' readOnly></input>
                    <br></br>

                    <label htmlFor='phone'>Số điện thoại</label>
                    <input type='phone' id='phone' readOnly></input>
                    <br></br>
                </form>
                <i className='fas fa-arrow-circle-left' onClick={this.back}></i>
            </Fragment>
        )
    }
}

export default CustomerInfor
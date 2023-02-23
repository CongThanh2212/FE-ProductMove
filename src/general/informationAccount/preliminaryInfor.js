import React, { Fragment } from "react";
import {URL} from "../../url"

class PreliminaryInfor extends React.Component {

    constructor(props) {
        super(props);
        this.back = this.back.bind(this);
    }

    // Quay lại trang trước là xem chi tiết sản phẩm (Details)
    back() {
        this.props.changeTypeProfile('Xem');
    }

    /*
        Lấy ra thông tin của tài khoản khác thông qua name/username của tài khoản đó
            - name: các tài khoản agent, service, producer sử dụng name để lấy thông tin vì khi đó thì account cần
                lấy thông tin đã có name rồi
            - username: chỉ ban quản lý đc sử dụng username của tài khoản khác để xem vì chỉ có ban quản lý ms biết đc
                username của tài khoản khác (còn nhứng người khác k có) và có thể account đó ms cấp nên chưa có name
                => k thể lấy thông qua name
    */
    componentDidMount() {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    if (data === null) return;
                    var arrInput = document.querySelectorAll('input');
                    var textarea = document.querySelector('textarea');

                    if (!data.name) arrInput[0].value = '';
                    else arrInput[0].value = data.name;

                    if (!data.address) arrInput[1].value = '';
                    else arrInput[1].value = data.address;

                    if (!data.phone) arrInput[2].value = '';
                    else arrInput[2].value = data.phone;

                    if (!data.bio) textarea.value = '';
                    else textarea.value = data.bio;
                }
            }
        }
        xmlHttp.open('POST', URL + '/auth/get_profile_by_name', false);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send(
            'name=' + this.props.userName
        );
    }

    // UI thông tin sơ bộ của 1 account => use để các account xem thông tin của nhau
    render() {
        return(
            <Fragment>
                <form className="profile">
                    <h1>Thông tin tài khoản</h1>

                    <label htmlFor='name'>Tên</label>
                    <input type='text' id='name' readOnly></input>
                    <br></br>

                    <label htmlFor='address'>Địa chỉ</label>
                    <input type='text' id='address' readOnly></input>
                    <br></br>

                    <label htmlFor='phone'>Số điện thoại</label>
                    <input type='phone' id='phone' readOnly></input>
                    <br></br>

                    <label htmlFor='description'>Thông tin thêm</label>
                    <textarea id="description" readOnly></textarea>
                    <br></br>
                </form>
                <i className='fas fa-arrow-circle-left' onClick={this.back}></i>
            </Fragment>
        )
    }
}

export default PreliminaryInfor
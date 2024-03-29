import React from "react";
import { Navigate } from "react-router-dom";

class MenuManage extends React.Component {

    constructor(props) {
        super(props);
        // Xác định xem user đang hoạt động hay đăng xuất
        this.state = {
            logOut: false
        }
        this.show = this.show.bind(this);
        this.showChange = this.showChange.bind(this);
        this.hover = this.hover.bind(this);
        this.unHover = this.unHover.bind(this);
        this.changeViewMenu = this.changeViewMenu.bind(this);
    }

    // Ẩn/ hiện thanh menu
    show(event) {
        var ul = event.target.nextSibling;
        if (ul.style.display === "block") ul.style.display = "none";
        else ul.style.display = "block";
    }

    // Thay đổi kiểu hiện thị. Trường hợp kiểu hiện thị là đăng xuất thì chuyển logOut thành true để đăng xuất
    showChange(event) {
        if (event.target.innerHTML === "Đăng xuất") {
            this.setState({
                logOut: true
            })
        }
        else this.props.changeTypeFunc(event.target.innerHTML)
    }

    // Hover vào mục nào trong menu thì mục đó chuyển thành chữ màu đen
    hover(event) {
        event.target.style.color = "black";
    }

    // Không hover vào mục trong menu nữa thì mục đó chuyển thành chữ màu ban đầu
    unHover(event) {
        event.target.style.color = "grey";
    }

    /*
        Xử lý event user onclick vào icon bật/tắt của thanh menu: chuyển tên lớp của icon đó để có css phù hợp với
        trường hợp bật/tắt
    */
    changeViewMenu(event) {
        var ulMenu = document.querySelector(".divMenu > ul");
        if (ulMenu.style.display === "block" || ulMenu.style.display === "") {
            ulMenu.style.display = "none";
            event.target.className = "fas fa-angle-double-right";
            event.target.previousSibling.previousSibling.style.display = "none";
        } else {
            ulMenu.style.display = "block";
            event.target.className = "fas fa-angle-double-left";
            event.target.previousSibling.previousSibling.style.display = "block";
        }
    }

    render() {

        // Kiểm tra user đang hoạt động hay đăng xuất, if đăng xuất thì chuyển về UI login
        if (this.state.logOut) return <Navigate to='/' />

        // Menu của UI ban quản lý
        return (
            <div className="divMenu">
                <h1>BigCorp</h1>
                <ul id="menu">
                    <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Dòng sản phẩm</li>
                    <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Thêm dòng sản phẩm</li>
                    <li>
                        <a href="#!" onClick={this.show} onMouseOver={this.hover} onMouseOut={this.unHover}>Quản lý tài khoản</a>
                        <ul>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Cấp tài khoản</li>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Quản lý</li>
                        </ul>
                    </li>
                    <li>
                        <a href="#!" onClick={this.show} onMouseOver={this.hover} onMouseOut={this.unHover}>Thống kê</a>
                        <ul>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>CSSX</li>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Đại lý</li>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>TTBH</li>
                        </ul>
                    </li>
                    <li>
                        <a href="#!" onClick={this.show} onMouseOver={this.hover} onMouseOut={this.unHover}>Tài khoản</a>
                        <ul>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Thông tin tài khoản</li>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Thay đổi email</li>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Thay đổi mật khẩu</li>
                            <li onClick={this.showChange} onMouseOver={this.hover} onMouseOut={this.unHover}>Đăng xuất</li>
                        </ul>
                    </li>
                    <h1><br></br></h1>
                </ul>
                <i className='fas fa-angle-double-left' onClick={this.changeViewMenu}></i>
            </div>
        );
    }
}

export default MenuManage
import React, { Fragment } from "react";
import {URL} from "../../url"

class Details extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.back = this.back.bind(this);
    }

    // Quay lại trang trước
    back() {
        this.props.changeTypeProfile(this.props.backType);
    }

    /*
        - changeUserName: thay đổi name tài khoản khác để hiển thị
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        // Lấy value mục status để xác định xem là khách hàng hay là kho => Gửi request tương ứng
        var status = event.parentNode.firstChild.innerHTML;
        switch (status) {
            case 'Bán cho KH': case 'Trả lại KH': {
                this.props.changeUserName(event.parentNode.lastChild.previousSibling.innerHTML);
                this.props.changeTypeProfile("Khách hàng");
                break;
            }
            default: {
                var userName = event.previousSibling.previousSibling.innerHTML;
                this.props.changeUserName(userName);
                this.props.changeTypeProfile("Vị trí kho");
            }
        }
    }

    // Lấy ra thông tin chi tiết + lịch sử của sản phẩm
    componentDidMount() {
        var root = this;
        var link = '';
        if (this.props.importId !== '') link = link + '&import=' + this.props.importId;
        if (this.props.productId !== '') link = link +  '&pr=' + this.props.productId;
        if (this.props.oldId !== '') link = link +  '&old=' + this.props.oldId;
        // Thông tin chi tiết sản phẩm
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    // info
                    const info = JSON.parse(this.responseText).info[0];
                    var arrInput = document.querySelectorAll('input');

                    arrInput[0].value = info.productLine;
                    arrInput[1].value = info.capacity;
                    arrInput[2].value = info.color;
                    arrInput[3].value = info.DOM.split("T")[0];
                    arrInput[4].value = info.WM + ' tháng';
                    arrInput[5].value = info.batchNumber;

                    if (info.batchId) arrInput[6].value = info.batchId;
                    else arrInput[6].value = '';

                    if (info.importId) arrInput[7].value = info.importId;
                    else arrInput[7].value = '';

                    if (info.productId) arrInput[8].value = info.productId;
                    else arrInput[8].value = '';

                    if (info.oldId) arrInput[9].value = info.oldId;
                    else arrInput[9].value = '';

                    // history
                    const his = JSON.parse(this.responseText).history;
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < his.length; i++) {
                        var tr = document.createElement('tr');
                        var status = document.createElement('td');
                        var time = document.createElement('td');
                        var name = document.createElement('td');
                        var locationId = document.createElement('td');
                        locationId.style.display = 'none';
                        var show = document.createElement('td');

                        status.innerHTML = his[i].status;

                        // edit date
                        const currentDate = new Date (his[i].date.split("T")[0]);
                        currentDate.setDate(currentDate.getDate() + 1);
                        const tomorrowDate = currentDate.toISOString();
                        time.innerHTML = tomorrowDate.split("T")[0];

                        name.innerHTML = his[i].name;
                        locationId.innerHTML = his[i].locationId;
                        show.innerHTML = 'Xem';

                        tr.appendChild(status);
                        tr.appendChild(time);
                        tr.appendChild(name);
                        tr.appendChild(locationId);
                        tr.appendChild(show);
                        tbody.appendChild(tr);

                        show.style.cursor = 'pointer';
                        show.onclick = function() {
                            root.show(this);
                        }
                    }
                }
            }
        }
        xmlHttp.open('GET', URL + '/general/product-details?id=' + this.props.id + '&batch=' + this.props.batchId + link, false);
        xmlHttp.send(null);
    }

    /*
        UI thống tin chi tiết + lịch sử vòng đời của sản phẩm gồm 2 form:
            - form thứ nhất: thông tin chi tiết sản phẩm
            - form thứ hai: lịch sử vòng đời sản phẩm
    */
    render() {
        return(
            <Fragment>
                <form className="profile">
                    <h1>Thông tin sản phẩm</h1>
                    
                    <label htmlFor='name'>Tên</label>
                    <input type='text' id='name' readOnly></input>
                    <br></br>

                    <label htmlFor='capacity'>Dung lượng</label>
                    <input type='text' id='capacity' readOnly></input>
                    <br></br>

                    <label htmlFor='color'>Màu sắc</label>
                    <input type='text' id='color' readOnly></input>
                    <br></br>

                    <label htmlFor='dom'>NSX</label>
                    <input type='text' id='dom' readOnly></input>
                    <br></br>

                    <label htmlFor='tos'>Bảo hành</label>
                    <input type='text' id='tos' readOnly></input>
                    <br></br>

                    <label htmlFor='batch'>Lô</label>
                    <input type='text' id='batch' readOnly></input>
                    <br></br>

                    <label htmlFor='batchId'>Batch id</label>
                    <input type='text' id='batchId' readOnly></input>
                    <br></br>

                    <label htmlFor='importId'>Import id</label>
                    <input type='text' id='importId' readOnly></input>
                    <br></br>
                    
                    <label htmlFor='productId'>Product id</label>
                    <input type='text' id='productId' readOnly></input>
                    <br></br>

                    <label htmlFor='oldId'>Old id</label>
                    <input type='text' id='oldId' readOnly></input>
                    <br></br>

                    <label>Lịch sử</label>
                    <table className='tableProductLine'>
                        <thead>
                            <tr>
                                <th>Trạng thái</th>
                                <th>Thời gian</th>
                                <th>Vị trí</th>
                                <th hidden>LocationId</th>
                                <th>Chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </form>
                <i className='fas fa-arrow-circle-left' onClick={this.back}></i>
            </Fragment>
        )
    }
}

export default Details
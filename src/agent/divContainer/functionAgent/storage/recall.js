import React, {Fragment} from "react";
import {URL} from "../../../../url"

class Recall extends React.Component {

    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.received = this.received.bind(this);
        this.changeBackgorund = this.changeBackgorund.bind(this);
        this.searchService = this.searchService.bind(this);
    }

    // Lấy ra keyword và gửi request lên server tìm kiếm các TTBH
    searchService(event) {
        if (event.keyCode === 13) {
            var keyWord = event.target.value;
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const data = JSON.parse(this.responseText);
                        for (var i = 0; i < data.length; i++) {
                            if (data[i] === null) continue;
                            const serviceName = data[i].name;
                            var option = document.createElement('option');
                            option.value = serviceName;
                            
                            var datalist = document.querySelector('datalist');
                            datalist.appendChild(option);
                        }
                    }
                }
            }
            xmlHttp.open('POST', URL + '/agent/search-service', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'agentId=' + this.props.id
                + '&keyWord=' + keyWord
            )
        }
    }

    /*
        - changeProductId: thay đổi id sản phẩm hiển thị
        - changeBackType: thay đổi component để có thể quay lại trang phía trước
        - changeTypeProfile: Chuyển sang xem chi tiết sản phẩm (Details)
    */
    show(event) {
        const id = event.parentNode.firstChild.nextSibling;
        this.props.changeBatchId(id.nextSibling.nextSibling.innerHTML);
        this.props.changeImportId(id.nextSibling.innerHTML);
        this.props.changeProductId(id.innerHTML);
        this.props.changeOldId('');
        this.props.changeBackType('Triệu hồi');
        this.props.changeTypeProfile('Xem');
    }

    // Lấy ra các sản phẩm đc checked và gửi request để chuyển đi bảo hành
    received(event) {
        event.preventDefault();
        var error = document.getElementsByClassName('errRepair2')[0]; // span hiển thị lỗi
        error.innerHTML = '';
        const serviceName = document.getElementById('servicename').value;
        if (!serviceName) {
            error.innerHTML = 'Bạn chưa chọn TTBH'
            return;
        }
        // Mảng tr có phần tử đầu tiên là th => list sản phẩm đưa đi bảo hành
        var tr = document.querySelectorAll("tr");
        var countChecked = 0; // Đếm số lượng sản phẩm đc checked
        var arrProduct = [];
        for (var i = 1; i < tr.length; i++) {
            if (tr[i].firstChild.firstChild.checked) {
                const productId = tr[i].firstChild.nextSibling.innerHTML;
                const numberOfService = tr[i].lastChild.previousSibling.innerHTML;

                arrProduct[countChecked] = {
                    productId: productId,
                    numberOfService: numberOfService
                }

                countChecked++;
            }
        }
        if (countChecked === 0) error.innerHTML = 'Bạn chưa chọn sản phẩm nào';
        else if (error.innerHTML === '') {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        const data = JSON.parse(this.responseText);
                        if (!data.access) {
                            error.innerHTML = data.mess;
                            return;
                        }
                        alert("Thành công!\nSản phẩm đã được chuyển vào mục đem đi bảo hành\nBạn hãy chờ trung tâm bảo hành xác nhận");
                        var tbody = document.querySelector('tbody');
                        for (var j = tr.length - 1; j > 0; j--) {
                            if (tr[j].firstChild.firstChild.checked) {
                                tbody.removeChild(tr[j]);
                            }
                        }
                    }
                }
            }
            xmlHttp.open('POST', URL + '/agent/recall-to-service', false);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(
                'agentId=' + this.props.id
                + '&serviceName=' + serviceName
                + '&arrProduct=' + JSON.stringify(arrProduct)
            )
        }
    }

    // Xử lý event khi 1 row đc checked thì chuyển màu vàng ngược lại chuyển về màu ban đầu
    changeBackgorund(event) {
        var input = event;
        var td = event.parentNode;
        if (input.checked) td.parentNode.style.background = "yellow";
        else if (Number(td.nextSibling.innerHTML) % 2 === 1) td.parentNode.style.background = "rgba(0,0,21,.05)";
        else td.parentNode.style.background = "white";
    }

    // Load lần đầu lấy ra list sản phẩm đang đc triệu hồi của 1 đại lý
    componentDidMount() {
        var root = this;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    var tbody = document.querySelector('tbody');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i] === null) continue;
                        var tr = document.createElement('tr');
                        var checkbox = document.createElement('td');
                        var input = document.createElement('input');
                        input.type = 'checkbox';
                        var productId = document.createElement('td');
                        productId.className = 'columnId';
                        var importBatchId = document.createElement('td');
                        importBatchId.className = 'columnId';
                        var batchId = document.createElement('td');
                        batchId.className = 'columnId';
                        var name = document.createElement('td');
                        var capacity = document.createElement('td');
                        var numberOfService = document.createElement('td');
                        var description = document.createElement('td');

                        checkbox.appendChild(input);
                        productId.innerHTML = data[i].productId;
                        importBatchId.innerHTML = data[i].importBatchId;
                        batchId.innerHTML = data[i].batchId;
                        name.innerHTML = data[i].productLine;
                        capacity.innerHTML = data[i].capacity;
                        numberOfService.innerHTML = data[i].numberOfService;
                        description.innerHTML = 'Xem';

                        tr.appendChild(checkbox);
                        tr.appendChild(productId);
                        tr.appendChild(importBatchId);
                        tr.appendChild(batchId);
                        tr.appendChild(name);
                        tr.appendChild(capacity);
                        tr.appendChild(numberOfService);
                        tr.appendChild(description);
                        tbody.appendChild(tr);

                        input.onchange = function() {
                            root.changeBackgorund(this);
                        }

                        description.style.cursor = 'pointer';
                        description.onclick = function() {
                            root.show(this);
                        }
                    }
                } else alert("ERROR!\n" + this.status);
            }
        }
        xmlHttp.open('GET', URL + '/agent/list-recall?agentId=' + this.props.id, false);
        xmlHttp.send(null);
    }

    // UI các sản phẩm đang được triệu hồi của 1 agent
    render() {

        return(
            <Fragment>
                <table className='tableProductLine'>
                    <caption>Sản phẩm đang được triệu hồi</caption>
                    <thead>
                        <tr>
                            <th></th>
                            <th className="columnId">productId</th>
                            <th className="columnId">importBatchId</th>
                            <th className="columnId">batchId</th>
                            <th>Tên</th>
                            <th>Dung lượng</th>
                            <th>Số lần bảo hành</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <div className="divRepair">
                    <form className="repair">
                    </form>
                    <div className="repair">
                        <label htmlFor="select">Đã nhận từ khách hàng - Đưa đi bảo hành: </label>
                        <input id="servicename" list="searchService" placeholder="Tìm kiếm TTBH" onKeyUp={this.searchService}></input>
                        <datalist id="searchService">
                        </datalist>
                        <form onSubmit={this.received}>
                            <span className='errRepair2'></span>
                            <input type='submit' value='Bảo hành' id="special"></input>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Recall
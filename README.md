# Front-end ProductMove Project
<p align="center">
  <img width="500" src="https://bigcorpsk.com/wp-content/uploads/2022/08/v1-wp-header-blk.png" alt="">
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start
```

## Description

### ProductionMove
ProductionMove là phần mềm được BigCorp sử dụng để theo dõi vòng đời các sản phẩm của họ. Các cơ sở sản xuất, đại lý phân phối, trung tâm bảo hành đều sử dụng ProductionMove để cộng tác trong việc phân phối và theo dõi vòng đời của sản phẩm.
Vai trò của các bên tham gia như sau:

+ Ban điều hành BigCorp
  * Quản lý danh mục dòng sản phẩm.
  * Cấp tài khoản và quản lý danh mục các cơ sở sản xuất, đại lý phân phối và trung tâm bảo hành.
  * Theo dõi và xem thống kê sản phẩm trên toàn quốc, theo trạng thái và theo cơ sở sản xuất, đại lý phân phối và trung tâm bảo hành.

+ Cơ sở sản xuất
  * Nhập các lô sản phẩm mới vừa sản xuất vào kho.
  * Xuất sản phẩm cho đại lý.
  * Nhận các sản phẩm lỗi về từ các trung tâm bảo hành.
  * Thống kê và báo cáo số liệu sản phẩm theo từng loại (trạng thái), theo tháng, quý, năm.
  * Thống kê và phân tích số lượng sản phẩm bán ra hàng tháng, quý, năm.
  * Thống kê tỉ lệ sản phẩm bị lỗi theo dòng sản phẩm, cơ sở sản xuất, đại lý phân phối.

+ Đại lý phân phối
  * Nhập sản phẩm mới về từ cơ sở sản xuất. Sản phẩm nhập về được lưu tại kho (riêng, nội bộ) của đại lý.
  * Bán sản phẩm cho khách hàng
  * Nhận lại sản phẩm cần bảo hành và chuyển đến trung tâm bảo hành.
  * Nhận lại sản phẩm từ trung tâm bảo hành để trả cho khách hàng.
  * Nếu sản phẩm bảo hành lỗi không thể sửa chữa thì trung tâm bảo hành báo cho đại lý rồi đại lý chuyển sản phẩm về cơ sở sản xuất, đại lý cũng có nhiệm vụ báo cho khách hàng và bàn giao sản phẩm mới thay thế cho khách hàng.
  * Trường hợp cần triệu hồi, sản phẩm triệu hồi được xử lý như sản phẩm bảo hành. Điểm khác so với bảo hành là đại lý phải chủ động rà soát những sản phẩm cần triệu hồi và thông báo cho khách hàng.
  * Thống kê và báo cáo số liệu sản phẩm theo từng loại (trạng thái liên), theo tháng, quý, năm.
  * Thống kê và phân tích số lượng sản phẩm bán ra hàng tháng, quý, năm.

+ Trung tâm bảo hành
  * Nhận các sản phẩm bảo hành hoặc triệu hồi từ đại lý.
  * Trả sản phẩm đã sửa chữa xong cho đại lý.
  * Chuyển sản phẩm bảo hành lỗi không thể sửa chữa về cơ sở sản xuất.
  * Thống kê và báo cáo số liệu sản phẩm theo từng loại (trạng thái), theo tháng, quý, năm.

## Author
Võ Công Thành - [thanhvc.uet@gmail.com](mailto:thanhvc.uet@gmail.com)

## Link back-end
https://github.com/CongThanh2212/BE-ProductMove

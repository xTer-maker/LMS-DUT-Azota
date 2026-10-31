# ⚡ Solver Core

> **Tiện ích mở rộng tự động hóa & hỗ trợ giải bài tập thông minh trên LMS DUT & Azota bằng AI (Gemini / OpenAI).**

[![Version](https://img.shields.io/badge/version-3.2.0-blue.svg?style=flat-square)](https://github.com/)
[![Platform](https://img.shields.io/badge/platform-LMS%20DUT%20%7C%20Azota-orange.svg?style=flat-square)](https://github.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://github.com/)

**Solver Core** là tiện ích mở rộng (Browser Extension) thế hệ mới giúp tự động phân tích, xử lý và chọn đáp án bài tập trên nền tảng **LMS DUT** và **Azota**. Dự án tích hợp các API mô hình ngôn ngữ lớn tiên tiến (Google Gemini, OpenAI) nhằm tối ưu hóa độ chính xác và hiệu suất làm bài.

---

## 🆕 Thông tin bản cập nhật v3.2.0

Phiên bản **v3.2.0** mang đến những cải tiến vượt trội về cơ chế xử lý DOM, độ an toàn và khả năng tự động hóa thông minh:

### 🎯 1. Cơ chế làm bài thông minh & Thuật toán Double-Check
* **Xử lý sự kiện chính xác:** Tool quét câu hỏi, gửi request tới AI. Khi nhận index đáp án, hệ thống kích hoạt đồng thời `input.click()` và `dispatchEvent` tương ứng để đảm bảo trình duyệt ghi nhận lựa chọn.
* **Tự động hoãn câu (Delay):** Sau khi chọn đáp án, tool tự động hoãn thời gian (tùy chỉnh qua thanh trượt, mặc định 15s) trước khi sang câu kế tiếp.
* **Vòng lặp Double-Check an toàn tuyệt đối:** Sau khi hoàn thành lượt quét trên trang, tool kích hoạt cơ chế tái kiểm tra DOM toàn bộ câu hỏi. Nếu phát hiện bất kỳ câu nào chưa có trạng thái `input:checked`, hệ thống sẽ **ngay lập tức hủy lệnh Next trang**, ngăn chặn triệt để tình trạng bỏ sót câu hỏi.

### 🛡️ 2. Xử lý lỗi mạng & Hạn chế API
* Khi xảy ra sự cố kết nối hoặc AI trả về lỗi, cờ `allSuccess` tự động chuyển sang `false` ➔ **Hệ thống chủ động hủy lệnh Next** để người dùng xử lý kịp thời.

### 🔄 3. Chế độ xem lại bài (Review Mode)
* **Tự động sửa lỗi:** Tool tự động dò tìm các câu trả lời sai và click lại đáp án đúng với tốc độ 1.5 giây/câu.
* **Giao diện sạch:** Hoạt động hoàn toàn ngầm, **không hiển thị thông báo đè lên web**.
* **Khóa điều hướng:** **Tuyệt đối không tự động bấm Next** ở chế độ xem lại bài để tránh làm rối luồng theo dõi của người dùng.

---

## 💡 Tính năng nổi bật

* 🤖 **Tích hợp AI đa dạng:** Hỗ trợ kết nối mượt mà API từ Google Gemini và OpenAI.
* ⚡ **Tự động chọn đáp án:** Nhận diện ngữ cảnh và chọn đáp án chuẩn xác trên LMS DUT & Azota.
* 🔒 **Double-Check Protection:** Cơ chế kiểm tra 2 lớp đảm bảo 100% câu hỏi trên trang đã được tô đáp án trước khi chuyển trang.
* ⚙️ **Tùy chỉnh thời gian (Delay):** Chủ động điều chỉnh khoảng hoãn thời gian giữa các câu hỏi để phù hợp với quy định từng nền tảng.
* 📊 **Kiểm tra kết nối trực tiếp:** Cho phép Test API Key ngay trên giao diện tiện ích trước khi làm bài.

---

## 🚀 Hướng dẫn cài đặt nhanh (3 bước)

### 🔴 Bước 1: Tải tiện ích về máy
1. Truy cập mục **[Releases](../../releases)** ở cột bên phải giao diện GitHub.
2. Tải file **`solver-core-v3.2.0.zip`** bản mới nhất về máy tính.
3. Giải nén file `.zip` vừa tải ra một thư mục (ví dụ: `solver-core`).

---

### 🔴 Bước 2: Cài đặt vào trình duyệt (Chrome / Microsoft Edge)
1. Mở trình duyệt và dán đường dẫn tương ứng vào thanh địa chỉ:
   * **Chrome:** `chrome://extensions/`
   * **Edge:** `edge://extensions/`
2. Bật công tắc **Chế độ nhà phát triển (Developer Mode)** ở góc trên bên phải màn hình.
3. Nhấn nút **Tải tiện ích đã giải nén (Load unpacked)** ở góc trái.
4. Trỏ tới và chọn thư mục `solver-core` đã giải nén ở Bước 1.

---

## ⚙️ Cấu hình & Thiết lập API Key

### 1. Cách lấy Gemini API Key (Miễn phí):
1. Truy cập **[Google AI Studio](https://aistudio.google.com/)** và đăng nhập tài khoản Google.
2. Vào mục **Dashboard** ➔ chọn **API keys** ➔ nhấn **Create API Key**.
   > ⚠️ **Lưu ý:** Giữ API Key bảo mật, tuyệt đối không chia sẻ cho người khác.
3. **Sao chép (Copy)** đoạn mã Key vừa tạo.

### 2. Dán Key vào tiện ích Solver Core:
1. Nhấp vào biểu tượng tiện ích **Solver Core** trên thanh công cụ trình duyệt.
2. Điền thông tin cấu hình:
   * **Provider (Nhà cung cấp):** Chọn `Google Gemini`
   * **API Key:** Dán đoạn Key vừa sao chép vào
   * **Model recommended:** `gemini-3.1-flash-lite` *(hoặc `gemini-3.6-flash` để tối ưu hạn mức RPM/Token)*
   * **Delay time:** Chỉnh thời gian hoãn chuyển câu hỏi mong muốn (mặc định 15s)
3. Bấm **TEST KẾT NỐI** ➔ Khi hệ thống báo kết nối thành công, nhấn **LƯU CẤU HÌNH**.

---

## ⚠️ Lưu ý quan trọng & Khắc phục sự cố

* **Khuyến nghị Model:** Ưu tiên sử dụng mô hình `gemini-3.1-flash-lite` hoặc `gemini-3.6-flash` để nhận hạn mức truy cập miễn phí (RPM / Token) cao nhất.
* **Xử lý khi tool dừng chạy / Lỗi kết nối:**
  1. Nguyên nhân thường do API Key bị chạm giới hạn lượt truy cập trong ngày (Rate Limit) hoặc gián đoạn mạng. Khi đó, hệ thống sẽ tự hủy lệnh Next trang để bảo vệ bài làm.
  2. Mở bảng điều khiển tiện ích, thử đổi tên **Model** sang `gemini-3.6-flash` hoặc tạo API Key mới từ Google AI Studio để thay thế.
  3. Kiểm tra lại kết nối mạng và đảm bảo đoạn API Key không bị dính khoảng trắng thừa.

---

## 📜 Bản quyền & Điều khoản sử dụng

* **Ý tưởng & Phát triển bởi:** **Hung Nguyen** (Vibe coding).
* **Mục đích sử dụng:** Dự án được phát triển nhằm mục đích hỗ trợ học tập, nghiên cứu công nghệ và thử nghiệm tự động hóa Web.
* **Quy định về việc Trích dẫn & Sử dụng lại:**
  * Toàn bộ ý tưởng, cấu trúc mã nguồn và thuật toán xử lý thuộc bản quyền của tác giả **Hung Nguyen**.
  * Nếu bạn muốn tham khảo, phát triển lại (fork), hoặc lấy ý tưởng từ dự án này, **bắt buộc phải ghi rõ nguồn tên tác giả (Hung Nguyen)** và đính kèm liên kết trỏ về dự án gốc này.

**Chúc các bạn thực hiện thành công và đạt kết quả cao!** 🚀

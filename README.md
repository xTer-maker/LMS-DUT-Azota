# ⚡ Solver Core V3

> **Tiện ích mở rộng tự động hóa & hỗ trợ giải bài tập thông minh trên LMS DUT & Azota bằng AI (Gemini / OpenAI).**

Solver Core V3 là tiện ích mở rộng (Browser Extension) giúp tự động phân tích và chọn đáp án bài tập trên nền tảng **LMS DUT** và **Azota**. Dự án tích hợp các API mô hình ngôn ngữ lớn tiên tiến (Gemini, OpenAI) giúp tối ưu hóa thời gian và hiệu suất làm bài.

---

## 💡 Tính năng nổi bật

* 🤖 **Tích hợp AI linh hoạt:** Hỗ trợ kết nối mượt mà API từ Google Gemini và OpenAI.
* ⚡ **Tự động pick đáp án:** Tự động nhận diện câu hỏi và chọn đáp án chính xác trên giao diện bài tập.
* ⚙️ **Tùy chỉnh thời gian (Delay):** Chủ động điều chỉnh thời gian chuyển câu hỏi để phù hợp với quy định từng nền tảng.
* 📊 **Kiểm tra kết nối trực tiếp:** Cho phép kiểm tra (Test) API Key ngay trên giao diện tiện ích trước khi làm bài.

---

## 🚀 Hướng dẫn cài đặt nhanh (3 bước)

### 🔴 Bước 1: Tải tiện ích về máy
1. Truy cập mục **[Releases](../../releases)** ở cột bên phải giao diện GitHub này.
2. Tải file **`solver-core-v3.zip`** bản mới nhất về máy tính.
3. Giải nén file `.zip` vừa tải ra một thư mục (ví dụ: `solver-core`).

---

### 🔴 Bước 2: Cài đặt vào trình duyệt (Chrome / Microsoft Edge)
1. Mở trình duyệt và sao chép đường dẫn sau dán vào thanh địa chỉ:
   * **Chrome:** `chrome://extensions/`
   * **Edge:** `edge://extensions/`
2. Bật công tắc **Chế độ nhà phát triển (Developer Mode)** ở góc trên bên phải màn hình.
3. Nhấn nút **Tải tiện ích đã giải nén (Load unpacked)** ở góc trái.
4. Trỏ tới và chọn thư mục `solver-core` vừa giải nén ở Bước 1.

---

## ⚙️ Cấu hình & Thiết lập API Key

### 1. Cách lấy Gemini API Key (Miễn phí):
1. Truy cập **[Google AI Studio](https://aistudio.google.com/)** và đăng nhập tài khoản Google.
2. Vào mục **Dashboard** ➔ chọn **API keys** ➔ nhấn **Create API Key**.
   > ⚠️ **Lưu ý:** Giữ API Key bảo mật, tuyệt đối không chia sẻ cho người khác.
3. **Sao chép (Copy)** đoạn mã Key vừa tạo.

### 2. Dán Key vào tiện ích Solver Core V3:
1. Nhấp vào biểu tượng tiện ích **Solver Core V3** trên thanh công cụ trình duyệt.
2. Điền thông tin cấu hình:
   * **Provider (Nhà cung cấp):** Chọn `Google Gemini`
   * **API Key:** Dán đoạn Key vừa sao chép ở trên vào
   * **Model recommended:** `gemini-3.1-flash-lite` *(hoặc `gemini-3.6-flash` để tối ưu hạn mức RPM/Token)*
   * **Delay time:** Chỉnh thời gian hoãn chuyển câu hỏi mong muốn
3. Bấm **TEST KẾT NỐI** ➔ Khi hệ thống báo kết nối thành công, nhấn **LƯU CẤU HÌNH**.

---

## ⚠️ Lưu ý quan trọng & Khắc phục sự cố

* **Khuyến nghị Model:** Ưu tiên sử dụng mô hình `gemini-3.1-flash-lite` hoặc `gemini-3.6-flash` để nhận hạn mức truy cập miễn phí (RPM / Token) cao nhất.
* **Xử lý khi tool dừng chạy / Không pick đáp án:**
  1. Nguyên nhân thường do API Key bị chạm giới hạn lượt truy cập miễn phí trong ngày (Rate Limit).
  2. Mở bảng điều khiển tiện ích, thử đổi tên **Model** sang `gemini-3.6-flash` hoặc tạo một API Key mới từ Google AI Studio dán thay thế.
  3. Kiểm tra kết nối mạng và đảm bảo đoạn API Key dán vào không bị dính khoảng trắng thừa.

---

## 🤝 Đóng góp & Bản quyền

Dự án được phát triển nhằm mục đích hỗ trợ học tập và nghiên cứu công nghệ (Vibe coding). 

**Chúc các bạn thực hiện thành công và đạt kết quả cao!** 🚀

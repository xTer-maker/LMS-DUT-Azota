# ⚡ Solver Core V3

> **Tự động hóa & hỗ trợ giải bài tập thông minh trên LMS DUT & Azota bằng AI (Gemini / OpenAI).**

Solver Core V3 là tiện ích mở rộng (Browser Extension) giúp tự động phân tích và chọn đáp án bài tập trên nền tảng **LMS DUT** và **Azota**. Dự án tích hợp các API ngôn ngữ lớn tiên tiến (Gemini, OpenAI) giúp tối ưu thời gian làm bài hiệu quả.

---

## 💡 Tính năng nổi bật

* 🤖 **Tích hợp AI linh hoạt:** Hỗ trợ API từ Google Gemini và OpenAI.
* ⚡ **Tự động pick đáp án:** Nhận diện và chọn đáp án chính xác trên giao diện bài tập.
* ⚙️ **Tùy chỉnh thời gian (Delay):** Chủ động điều chỉnh thời gian chuyển câu hỏi để phù hợp với từng nền tảng.
* 📊 **Kiểm tra kết nối trực tiếp:** Cho phép test API Key ngay trong giao diện tiện ích trước khi sử dụng.

---

## 🛠️ Hướng dẫn cài đặt

### 1. Tải source code
* Tải dự án về máy tính và giải nén thành thư mục có tên `solver-core`.

### 2. Cài đặt vào trình duyệt (Chrome / Microsoft Edge)
1. Mở trình duyệt và truy cập trang quản lý tiện ích:
   * **Chrome:** `chrome://extensions/`
   * **Edge:** `edge://extensions/`
2. Bật chế độ nhà phát triển (**Developer Mode**) ở góc trên bên phải.
3. Chọn **Load unpacked** (Tải tiện ích đã giải nén).
4. Tìm và chọn thư mục `solver-core` vừa lưu.

---

## ⚙️ Cấu hình & Sử dụng API

### Hướng dẫn lấy & thiết lập Gemini API:
1. Truy cập **[Google AI Studio](https://aistudio.google.com/)** và đăng nhập tài khoản Google.
2. Vào mục **Dashboard** trên Menu chính ➔ chọn **API keys** ➔ nhấn **Create API Key**.
   > ⚠️ **Lưu ý:** Giữ API Key bảo mật, không chia sẻ cho người khác.
3. Mở tiện ích **Solver Core V2** trên trình duyệt và cấu hình:
   * **Provider:** Chọn `Google Gemini`
   * **API Key:** Dán Key vừa khởi tạo
   * **Model recommended:** `gemini-3.1-flash-lite` *(hoặc `gemini-3.6-flash` để tối ưu RPM/Token)*
   * **Delay time:** Chỉnh khoảng thời gian chuyển câu hỏi mong muốn
4. Bấm **TEST KẾT NỐI** ➔ Khi hệ thống báo thành công, nhấn **Lưu cấu hình**.

---

## ⚠️ Lưu ý quan trọng & Khắc phục sự cố

* **Khuyến nghị Model:** Nên ưu tiên dùng mô hình `gemini-3.6-flash` hoặc `gemini-3.1-flash-lite` để có hạn mức truy cập (RPM Token) cao hơn.
* **Xử lý khi tool dừng hoạt động:**
  1. Kiểm tra lại hạn mức truy cập tại **Google AI Studio** xem có bị vượt quá Rate Limit hay không.
  2. Nếu chạm giới hạn, hãy thử thay đổi tên model khác trong phần cấu hình tiện ích (nhập đúng định dạng tên model).
  3. Đảm bảo API Key vẫn đang ở trạng thái hoạt động (Active).

---

## 🤝 Đóng góp & Bản quyền

Dự án được phát triển nhằm mục đích hỗ trợ học tập và nghiên cứu công nghệ (Vibe coding). 

**Chúc các bạn thực hiện thành công!** 🚀

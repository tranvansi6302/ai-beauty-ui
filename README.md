# Facial Makeup and Eyebrow Replacement Project

Tổng hợp lại các bước
Trang điểm khuôn mặt: landmarks.py, makeup.py, main.py
Nhận dạng khuôn mặt: face_recognition.py
Xóa chân mày cũ: remove_eyebrows.py
Thay thế chân mày: main.py
Tùy chỉnh chân mày: customize_eyebrows.py
Thư mục utils
image_utils.py: Chứa các hàm liên quan đến xử lý ảnh.
face_utils.py: Chứa các hàm liên quan đến nhận dạng khuôn mặt.
eyebrow_utils.py: Chứa các hàm liên quan đến xử lý và dán chân mày.

## Project Structure

project/
│
├── app.py
├── requirements.txt
├── README.md
│
├── data/
│ ├── input_images/
│ ├── output_images/
│ ├── mask_without_eyebrows.jpg
│ ├── left_eyebrow_sample.png
│ └── right_eyebrow_sample.png
│
├── src/
│ ├── **init**.py
│ ├── makeup.py
│ ├── face_recognition.py
│ ├── remove_eyebrows.py
├── face_authentication.py
│ ├── customize_eyebrows.py
│ └── utils/
│ ├── **init**.py
│ ├── image_utils.py
│ ├── face_utils.py
│ └── eyebrow_utils.py

# Flask Makeup Application

## Giới thiệu

Dự án này là một ứng dụng web Flask cung cấp các API endpoint để áp dụng các điều chỉnh hình ảnh khác nhau, bao gồm trang điểm, nhận diện khuôn mặt, xóa chân mày và tùy chỉnh chân mày. Nó cho phép người dùng điều chỉnh các tham số một cách linh hoạt và áp dụng các điều chỉnh này lên hình ảnh đầu vào.

# Tính Năng

1. Áp dụng trang điểm lên hình ảnh.
2. Xóa chân mày khỏi hình ảnh.
3. Tùy chỉnh chân mày với các điều chỉnh cụ thể.
4. Nhận diện và đánh dấu các điểm đặc trưng trên khuôn mặt.
5. Duy trì và cập nhật trạng thái của các tham số điều chỉnh.

## Yêu cầu cài đặt

- Python 3.9
- Một số thư viện bổ sung có thể cài đặt qua `requirements.txt`
  Cài đặt các thư viện cần thiết:
  `pip install -r requirements.txt`

# Sử Dụng

# Khởi động server Flask:

`python app.py`

# API Endpoints

## 1. /camera_selfie

- URL: http://localhost:5000/camera_selfie

- Phương thức: POST

- Mô tả: Chụp ảnh selfie và phát hiện hình dạng khuôn mặt.

- Đầu vào: Không có

- Đầu ra:

* output_camera_selfie_b64string: Chuỗi base64 của ảnh selfie.

* face_shape: Hình dạng khuôn mặt được phát hiện.

## 2. /adjust

- URL: http://localhost:5000/adjust

- Phương thức: POST

- Mô tả: Điều chỉnh các tham số và áp dụng tùy chỉnh chân mày, trang điểm.

- Đầu vào:
  {
  "input_image_path": "path/to/input/image",
  "output_image_path": "data/output_images/portrait_new_eyebrows",
  "patch_path": "path/to/patch",
  "features": ["lips", "skin", "blush"],
  "show_landmarks": false,
  "color_lips": [174, 86, 84],
  "color_skin": 0.75,
  "color_blush": [174, 86, 84],
  "eyebrow_left_path": "path/to/left/eyebrow",
  "eyebrow_right_path": "path/to/right/eyebrow",
  "remove_eyebrows": false,
  "apply_makeup": false,
  "resize_scale_left": 1.0,
  "resize_scale_right": 1.0,
  "anchor": "center",
  "definition": "SHARPEN",
  "resize_horizontal": 0,
  "resize_vertical": 0,
  "resize_position_up": 0,
  "resize_position_left": 0,
  "resize_position_right": 0,
  "rotate_left": 0,
  "rotate_right": 0
  }

- Đầu ra:

* message: Thông báo thành công.

* output_image_path: Chuỗi base64 của ảnh đầu ra.

* face_shape: Hình dạng khuôn mặt được phát hiện.

# API Endpoints

Adjust Endpoint
URL: http://localhost:5000/adjust

# Method: POST

# Description: Áp dụng các điều chỉnh khác nhau lên hình ảnh đầu vào.

# Parameters:

1. input_image_path (str): Đường dẫn đến hình ảnh đầu vào dạng base64

2. output_image_path (str): Đường dẫn để lưu hình ảnh đầu ra dạng base64

3. patch_path (str): Đường dẫn đến hình ảnh patch dùng để xóa chân mày dạng base64

4. eyebrow_left_path (str): Đường dẫn đến hình ảnh chân mày trái dạng base64

5. eyebrow_right_path (str): Đường dẫn đến hình ảnh chân mày phải. Hiện tại chỉ nên để null

6. features (list): Danh sách các đặc điểm để áp dụng trang điểm (mặc định: ['lips', 'skin', 'blush']).

7. color_skin (float): Hệ số để điều chỉnh màu da (mặc định: 0.75). Range: [0, 10]

8. show_landmarks (bool): Có hiển thị các điểm đặc trưng trên khuôn mặt không (mặc định: False). Giá trị: True hoặc False

9. remove_eyebrows (bool): Có xóa chân mày không (mặc định: false). Giá trị: True hoặc False

10. apply_makeup (bool): Có áp dụng trang điểm không (mặc định: false). Giá trị: True hoặc False

11. color_lips (list): Màu sắc cho môi (mặc định: [174, 86, 84]). Dạng: [R, G, B]

12. color_blush (list): Màu sắc cho má hồng (mặc định: [174, 86, 84]). Dạng: [R, G, B]

13. color_eyebrow (float): Màu sắc cho chân mày (mặc định: 1). Giá trị [-4, 4] bước nhảy là 0.5 Trong đó: -4 là màu xanh dương, 0 là màu đen, 1 là màu hiện tại 4 là màu đỏ

# Các tham số điều chỉnh:

1. definition (int): Định nghĩa mức độ rõ nét. Giá trị: "SHARPEN" hoặc "SMOOTH". Mặc định: SHARPEN

2. resize_horizontal (int): Kích thước ngang. Range: [-300, +300]. Mặc định: 50

3. resize_vertical (int): Kích thước dọc. Range: [0, +300]. Mặc định: 90

4. resize_position_up (int): Vị trí di chuyển lên. Range: [-300, +300]. Mặc định: -40

5. resize_position_left (int): Vị trí di chuyển sang trái. Range: [-300, +300]. Mặc định: -35

6. resize_position_right (int): Vị trí di chuyển sang phải. Range: [-300, +300]. Mặc định: -35

7. rotate_left (int): Góc xoay sang trái. Range: [-360, +360]. Mặc định: 0

8. rotate_right (int): Góc xoay sang phải. Range: [-360, +360]. Mặc định: 0

# Ví dụ 1: Điều chỉnh resize_horizontal (int): Kích thước ngang.

{
"input_image_path": "",
"patch_path": "",
"eyebrow_left_path": "",
"eyebrow_right_path": "",
"output_image_path": "data/output_images/portrait_new_eyebrows",
"apply_makeup": false,
"color_skin": 0.9, // nếu apply_makeup = true thì điều chỉnh cường độ sáng
"remove_eyebrows": false,
"features": [
"lips",
"skin",
"blush"
],
"show_landmarks": false
"definition": 0
"resize_horizontal": 130
}

# Ví dụ 2: Điều chỉnh resize_vertical (int): Kích thước dọc: nếu trước đó nếu đã điều chỉnh ở Ví dụ 1 thì qua Ví dụ 2 vẫn giữ "resize_horizontal": 130. Bởi vì có tính năng duy trì và cập nhật trạng thái của các tham số điều chỉnh

{
"input_image_path": "",
"patch_path": "",
"eyebrow_left_path": "",
"eyebrow_right_path": "",
"output_image_path": "data/output_images/portrait_new_eyebrows",
"apply_makeup": false,
"color_skin": 0.9, // nếu apply_makeup = true thì điều chỉnh cường độ sáng
"remove_eyebrows": false,
"features": [
"lips",
"skin",
"blush"
],
"show_landmarks": false
"definition": 0
"resize_vertical": 200
}

# Good luck

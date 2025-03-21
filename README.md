# Beauty AI - Ứng dụng Thay đổi Lông mày và Makeup AI

## Tổng quan dự án

Beauty AI là ứng dụng cho phép người dùng thử nghiệm các kiểu lông mày khác nhau và trang điểm ảo thông qua công nghệ AI nhận diện khuôn mặt. Ứng dụng cung cấp các tính năng:

1. Chụp ảnh selfie hoặc tải ảnh lên
2. Phân tích hình dạng khuôn mặt
3. Loại bỏ lông mày hiện tại
4. Áp dụng kiểu lông mày mới với nhiều tùy chỉnh
5. Áp dụng trang điểm (son môi, phấn má, làm mịn da)
6. Đưa ra gợi ý phù hợp với hình dạng khuôn mặt

## API Endpoints

Backend cung cấp các API endpoints sau:

### 1. Camera Selfie
- **URL**: `/camera_selfie`
- **Method**: POST/GET
- **Mục đích**: Chụp ảnh selfie bằng camera
- **Phản hồi**: 
  ```json
  {
    "message": "Selfie successfully",
    "output_camera_selfie_b64string": "base64_encoded_image_data"
  }
  ```

### 2. Apply Adjustments
- **URL**: `/apply-adjustments`
- **Method**: POST
- **Mục đích**: Process uploaded image to apply makeup and eyebrow adjustments
- **Request Body**:
  ```json
  **Ví dụ**:
  {
    "input_image": "base64_image_data",
    "eyebrow_left_path": 1,
    "apply_makeup": true,
    "remove_eyebrows": true,
    "definition": "SHARPEN",
    "color_eyebrow": 0,
    "show_landmarks": false,
    "adjust_params": {
      "left": {
        "width_scale": 1,
        "height_scale": 1,
        "horizontal_offset": 0,
        "vertical_offset": 0,
        "rotation_angle": 0
      },
      "right": {
        "width_scale": 1,
        "height_scale": 1,
        "horizontal_offset": 0, 
        "vertical_offset": 0,
        "rotation_angle": 0
      }
    }
  }
  ```
- **Response body**:
  ```json
  {
    "message": "Parameter adjusted successfully",
    "input_final_b64_string" : "canva_resize_base64",
    "output_final_b64_string": "output_final_b64_string", 
    "face_shape": "oval",
    "face_shape_description": "Description of the face shape",
    "eyebrow_recommendation": "Recommendation for eyebrow style",
    "product_recommendation": "Product recommendations",
    "trend_recommendation": "Trending eyebrow styles"
  }
  ```

### Chi tiết tham số Request Body:

#### Tham số chính:
- `input_image`: Ảnh đầu vào ở định dạng base64 string
- `eyebrow_left_path`: Ảnh lông mày trái: 1 là mặc định, 2 là người dùng lựa chọn chân mày khác mặc định

#### Tham số trang điểm:
| Tham số | Mô tả | Giá trị mặc định | Bước nhảy | Phạm vi |
|---------|-------|-----------------|-----------|---------|
| `apply_makeup` | Bật/tắt tính năng trang điểm | `false` | N/A | `true`/`false` |

#### Tham số lông mày:
| Tham số | Mô tả | Giá trị mặc định | Bước nhảy | Phạm vi |
|---------|-------|-----------------|-----------|---------|
| `remove_eyebrows` | Bật/tắt tính năng xóa lông mày hiện có | `false` | N/A | `true`/`false` |
| `definition` | Chế độ làm sắc nét | `"SHARPEN"` | N/A | `"SHARPEN"` hoặc `"SMOOTH"` |
| `color_eyebrow` | Điều chỉnh màu lông mày | `0` | N/A | `0` hoặc `1` . `Trong đó (0 là màu đen, 1 là màu nâu)`|

#### Tham số nâng cao thay đổi vị trí và kích thước:
| Tham số | Mô tả | Giá trị mặc định | Bước nhảy | Phạm vi |
|---------|-------|-----------------|-----------|---------|
| `show_landmarks` | Hiển thị các điểm mốc và tỷ lệ vàng trên khuôn mặt | `false` | N/A | `true`/`false` |
| `adjust_params.left/right.width_scale` | Tỷ lệ chiều rộng | `1.2` | `0.1` | `0.5` đến `2.0` |
| `adjust_params.left/right.height_scale` | Tỷ lệ chiều cao | `1.2` | `0.1` | `0.5` đến `2.0` |
| `adjust_params.left/right.horizontal_offset` | Độ dịch chuyển ngang (pixel) | `0` | `1` | `-50` đến `50` |
| `adjust_params.left/right.vertical_offset` | Độ dịch chuyển dọc (pixel) | `0` | `1` | `-50` đến `50` |
| `adjust_params.left.rotation_angle` | Góc xoay (độ) | `8` | `1` | `-45` đến `45` |
| `adjust_params.right.rotation_angle` | Góc xoay (độ) | `-8` | `1` | `-45` đến `45` |


### Chi tiết phản hồi:

- `message`: Thông báo trạng thái AI system sucess/fail
- `input_final_b64_string` :  Ảnh đầu vào đã resize dưới dạng base64 
- `output_final_b64_string`: Ảnh kết quả dưới dạng base64 
- `face_shape`: Hình dạng khuôn mặt được phát hiện (oval, round, square, heart, diamond, oblong, triangle)
- `face_shape_description`: Mô tả chi tiết về hình dạng khuôn mặt
- `eyebrow_recommendation`: Gợi ý kiểu chân mày phù hợp với khuôn mặt
- `product_recommendation`: Gợi ý sản phẩm phù hợp với khuôn mặt
- `trend_recommendation`: Xu hướng lông mày đang thịnh hành phù hợp với khuôn mặt
- `eyebrow_1`: Ảnh chân mày dưới dạng base64 
- `eyebrow_2`: Ảnh chân mày dưới dạng base64 

## Note thêm: Hướng dẫn các tham số điều chỉnh lông mày

### Điều chỉnh màu lông mày (`color_eyebrow`)
- `-4.0`: Tông màu xanh dương
- `-2.0`: Tông màu đen xanh
- `0.0`: Màu đen hoàn toàn
- `1.0`: Màu gốc của lông mày (không điều chỉnh)
- `2.0`: Tăng độ bão hòa màu
- `4.0`: Tông màu đỏ

### Điều chỉnh góc xoay (`rotation_angle`)
- Góc dương: Xoay ngược chiều kim đồng hồ
- Góc âm: Xoay theo chiều kim đồng hồ


## Khởi chạy ứng dụng

### Sử dụng Docker
```bash
# Xây dựng image
docker build -t beauty-ai-app .

# Chạy container
docker run -p 5000:5000 beauty-ai-app
```

### Sử dụng Docker Compose
```bash
# Xây dựng và chạy
docker compose build
docker compose up -d
```

### Chạy trực tiếp
```bash
# Cài đặt dependencies
pip install -r requirements.txt

# Chạy ứng dụng
python app.py
```

// Định nghĩa kiểu SliderConfig cho các tham số điều chỉnh
export type SliderConfig = {
     name: string;
     label: string;
     min: number;
     max: number;
     step?: number;
     description: string;
};

// Định nghĩa kiểu dữ liệu AdjustmentData
export interface AdjustmentData {
     input_image?: string;
     eyebrow_left_path?: string;
     eyebrow_right_path?: string;
     output_image_path?: string;
     apply_makeup: boolean;
     features: string[] | object;
     show_landmarks: boolean;
     remove_eyebrows: boolean;
     definition: string | number;
     color_skin?: number;
     color_eyebrow?: number;
     adjust_params?: {
          left: {
               width_scale: number;
               height_scale: number;
               horizontal_offset: number;
               vertical_offset: number;
               rotation_angle: number;
          };
          right: {
               width_scale: number;
               height_scale: number;
               horizontal_offset: number;
               vertical_offset: number;
               rotation_angle: number;
          };
     };
}

// Các lựa chọn cho makeup (Môi, Da, Má)
export const MAKEUP_OPTIONS = ['Da', 'Môi', 'Má'];

// Định nghĩa bản đồ makeup với các từ khóa
export const MAKEUP_MAP = {
     Da: 'skin',
     Môi: 'lips',
     Má: 'blush'
} as const;

// Định nghĩa enum cho màu chân mày
export enum EyebrowColor {
     BLUE = 2,    // Màu xanh dương
     BROWN = -1.5,    // Màu nâu
     BLACK = 0,    // Màu đen (mặc định)     
     CURRENT = 1,  // Màu hiện tại (màu gốc)
}

// Các màu cơ bản
export const COMMON_EYEBROW_COLORS = [
     {
          value: EyebrowColor.BLUE,
          label: 'Xanh dương',
          description: 'Màu xanh dương thời trang',
          colorClass: 'bg-[#0047AB]'
     },
     {
          value: EyebrowColor.BLACK,
          label: 'Màu đen',
          description: 'Màu đen tự nhiên',
          colorClass: 'bg-black'
     },
     {
          value: EyebrowColor.BROWN,
          label: 'Màu nâu',
          description: 'Màu nâu tự nhiên',
          colorClass: 'bg-[#8B4513]'
     }
];

// Cập nhật SLIDER_CONFIGS với các tham số cho chân mày trái và phải
export const SLIDER_CONFIGS: SliderConfig[] = [
     // Các tham số điều chỉnh cho chân mày trái
     {
          name: 'eyebrow_left_width_scale',
          label: 'Phóng to/thu nhỏ chiều rộng',
          min: 0,
          max: 10,
          description:
               'Điều chỉnh tỷ lệ rộng chân mày trái. Giá trị trong khoảng (0, 10] với bước nhảy là 0.1.',
     },
     {
          name: 'eyebrow_left_height_scale',
          label: 'Phóng to/thu nhỏ chiều cao',
          min: 0,
          max: 10,
          description:
               'Điều chỉnh tỷ lệ cao chân mày trái. Giá trị trong khoảng (0, 10] với bước nhảy là 0.1.',
     },
     {
          name: 'eyebrow_left_horizontal_offset',
          label: 'Kéo sang trái/phải',
          min: -300,
          step: 5,
          max: 300,
          description:
               'Điều chỉnh độ lệch ngang của chân mày trái. Giá trị trong khoảng [-300, +300].',
     },
     {
          name: 'eyebrow_left_vertical_offset',
          label: 'Kéo lên/xuống',
          min: -300,
          step: 5,
          max: 300,
          description:
               'Điều chỉnh độ lệch dọc của chân mày trái. Giá trị trong khoảng [-300, +300].',
     },
     {
          name: 'eyebrow_left_rotation_angle',
          label: 'Xoay 360',
          min: -360,
          step: 5,
          max: 360,
          description:
               'Điều chỉnh góc quay của chân mày trái. Giá trị trong khoảng [-360, +360].',
     },

     // Các tham số điều chỉnh cho chân mày phải
     {
          name: 'eyebrow_right_width_scale',
          label: 'Phóng to/thu nhỏ chiều rộng',
          min: 0,
          max: 10,
          description:
               'Điều chỉnh tỷ lệ rộng chân mày phải. Giá trị trong khoảng (0, 10] với bước nhảy là 0.1.',
     },
     {
          name: 'eyebrow_right_height_scale',
          label: 'Phóng to/thu nhỏ chiều cao',
          min: 0,
          max: 10,
          description:
               'Điều chỉnh tỷ lệ cao chân mày phải. Giá trị trong khoảng (0, 10] với bước nhảy là 0.1.',
     },
     {
          name: 'eyebrow_right_horizontal_offset',
          label: 'Kéo sang trái/phải',
          min: -300,
          step: 5,
          max: 300,
          description:
               'Điều chỉnh độ lệch ngang của chân mày phải. Giá trị trong khoảng [-300, +300].',
     },
     {
          name: 'eyebrow_right_vertical_offset',
          label: 'Kéo lên/xuống',
          min: -300,
          step: 5,
          max: 300,
          description:
               'Điều chỉnh độ lệch dọc của chân mày phải. Giá trị trong khoảng [-300, +300].',
     },
     {
          name: 'eyebrow_right_rotation_angle',
          label: 'Xoay 360',
          min: -360,
          step: 5,
          max: 360,
          description:
               'Điều chỉnh góc quay của chân mày phải. Giá trị trong khoảng [-360, +360].',
     },

     // Thêm slider cho màu chân mày
     {
          name: 'color_eyebrow',
          label: 'Màu sắc chân mày',
          min: -4,
          max: 4,
          step: 0.5,
          description: 'Điều chỉnh màu sắc chân mày. -4 (xanh) → 0 (đen) → 4 (đỏ). Giá trị 1 giữ màu hiện tại.',
     },
];

// Tham số cho chân mày trái
export interface LeftEyebrowParams {
     width_scale: number;
     height_scale: number;
     horizontal_offset: number;
     vertical_offset: number;
     rotation_angle: number;
}

// Tham số cho chân mày phải
export interface RightEyebrowParams {
     width_scale: number;
     height_scale: number;
     horizontal_offset: number;
     vertical_offset: number;
     rotation_angle: number;
}

// Tham số cho vị trí và kích thước
export interface PositionParams {
     resize_horizontal: number;
     resize_vertical: number;
     resize_position_up: number;
     resize_position_left: number;
     resize_position_right: number;
     rotate_left: number;
     rotate_right: number;
}

// Tham số cho màu sắc
export interface ColorParams {
     color_skin: number;
     color_eyebrow: number;
}

// Cập nhật lại interface ControlsProps
export interface ControlsProps {
     showLandmarks: boolean;
     removeEyebrows: boolean;
     selectedMakeup: string[];
     controls: {
          definition: 'SHARPEN' | 'SMOOTH';
          leftEyebrow: LeftEyebrowParams;
          rightEyebrow: RightEyebrowParams;
          position: PositionParams;
          color: ColorParams;
     };
     // Các props khác nếu cần
     isMobileControlsOpen: boolean;
     onMobileControlsOpen: () => void;
     onMobileControlsClose: () => void;
}

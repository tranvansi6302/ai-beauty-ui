export type SliderConfig = {
     name: string;
     label: string;
     min: number;
     max: number;
     description: string;
};
export interface AdjustmentData {
     input_image?: string;

     eyebrow_left_path?: string;

     output_image_path?: string;
     apply_makeup: boolean;
     features: string[] | object;
     show_landmarks: boolean;
     remove_eyebrows: boolean;
     anchor?: string;
     definition: string | number;
     resize_horizontal: number;
     resize_vertical: number;
     resize_position_up: number;
     resize_position_left: number;
     resize_position_right: number;
     rotate_left: number;
     rotate_right: number;
     resize_scale_left?: number;
     resize_scale_right?: number;
     color_skin?: number;
     color_lips?: number[];
     color_blush?: number[];
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


export const MAKEUP_OPTIONS = ['Môi', 'Da', 'Má'];

export const MAKEUP_MAP = {
     Môi: 'lips',
     Da: 'skin',
     Má: 'blush',
} as const;

export const SLIDER_CONFIGS: SliderConfig[] = [
     {
          name: 'resize_horizontal',
          label: 'Kích thước ngang',
          min: -300,
          max: 300,
          description:
               'Điều chỉnh độ rộng của chân mày. Giá trị dương làm rộng ra, giá trị âm làm thu hẹp lại.',
     },
     {
          name: 'resize_vertical',
          label: 'Kích thước dọc',
          min: 0,
          max: 300,
          description:
               'Điều chỉnh độ dày của chân mày. Giá trị càng cao thì chân mày càng dày.',
     },
     {
          name: 'resize_position_up',
          label: 'Vị trí lên/xuống',
          min: -300,
          max: 300,
          description:
               'Di chuyển vị trí chân mày lên trên hoặc xuống dưới. Giá trị dương di chuyển lên, âm di chuyển xuống.',
     },
     {
          name: 'resize_position_left',
          label: 'Vị trí sang trái',
          min: -300,
          max: 300,
          description:
               'Di chuyển đầu chân mày sang trái. Giá trị dương di chuyển ra ngoài, âm di chuyển vào trong.',
     },
     {
          name: 'resize_position_right',
          label: 'Vị trí sang phải',
          min: -300,
          max: 300,
          description:
               'Di chuyển đuôi chân mày sang phải. Giá trị dương di chuyển ra ngoài, âm di chuyển vào trong.',
     },
     {
          name: 'rotate_left',
          label: 'Xoay trái',
          min: -300,
          max: 300,
          description:
               'Xoay đầu chân mày. Giá trị dương xoay lên trên, âm xoay xuống dưới.',
     },
     {
          name: 'rotate_right',
          label: 'Xoay phải',
          min: -360,
          max: 360,
          description:
               'Xoay đuôi chân mày. Giá trị dương xoay lên trên, âm xoay xuống dưới.',
     },
];

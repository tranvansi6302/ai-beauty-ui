import { Palette } from 'lucide-react';
import { memo } from 'react';

const POPULAR_COLORS = {
     lips: [
          { name: 'Đỏ tươi', rgb: { r: 227, g: 24, b: 55 } }, // #E31837 - Đỏ tươi chuẩn
          { name: 'Hồng đào', rgb: { r: 255, g: 127, b: 127 } }, // #FF7F7F - Hồng đào nhẹ nhàng
          { name: 'Cam đào', rgb: { r: 255, g: 111, b: 97 } }, // #FF6F61 - Cam đào trendy
          { name: 'Đỏ rượu', rgb: { r: 128, g: 0, b: 32 } }, // #800020 - Đỏ rượu vang
          { name: 'Hồng nude', rgb: { r: 215, g: 121, b: 105 } }, // #D77969 - Hồng nude tự nhiên
          { name: 'Đỏ cam', rgb: { r: 255, g: 69, b: 0 } }, // #FF4500 - Đỏ cam nổi bật
          { name: 'Hồng pastel', rgb: { r: 255, g: 182, b: 193 } }, // #FFB6C1 - Hồng pastel nhẹ nhàng
          { name: 'Đỏ đất', rgb: { r: 165, g: 42, b: 42 } }, // #A52A2A - Đỏ đất trầm
          { name: 'Xanh biển', rgb: { r: 0, g: 0, b: 255 } }, // #0000FF - Xanh biển đậm
          { name: 'Xanh lá', rgb: { r: 0, g: 255, b: 0 } }, // #00FF00 - Xanh lá cây
          { name: 'Xanh ngọc', rgb: { r: 0, g: 255, b: 255 } }, // #00FFFF - Xanh ngọc sáng
          { name: 'Xanh dương', rgb: { r: 30, g: 144, b: 255 } }, // #1E90FF - Xanh dương đẹp
     ],
     blush: [
          { name: 'Hồng baby', rgb: { r: 255, g: 182, b: 193 } }, // #FFB6C1 - Hồng baby phổ biến
          { name: 'Hồng coral', rgb: { r: 255, g: 127, b: 127 } }, // #FF7F7F - Hồng san hô
          { name: 'Đào', rgb: { r: 255, g: 218, b: 185 } }, // #FFDAB9 - Màu đào tự nhiên
          { name: 'Hồng tự nhiên', rgb: { r: 255, g: 192, b: 203 } }, // #FFC0CB - Hồng tự nhiên
          { name: 'Cam đào', rgb: { r: 255, g: 160, b: 122 } }, // #FFA07A - Cam đào nhẹ
          { name: 'Hồng đất', rgb: { r: 222, g: 165, b: 164 } }, // #DEA5A4 - Hồng đất trầm
          { name: 'Hồng nude', rgb: { r: 210, g: 180, b: 140 } }, // #D2B48C - Hồng nude tự nhiên
          { name: 'Cam san hô', rgb: { r: 255, g: 127, b: 80 } }, // #FF7F50 - Cam san hô tươi
          { name: 'Xanh mint', rgb: { r: 189, g: 252, b: 201 } }, // #BDFCC9 - Xanh bạc hà nhẹ
          { name: 'Xanh pastel', rgb: { r: 174, g: 198, b: 207 } }, // #AEC6CF - Xanh pastel
          { name: 'Xanh biển nhạt', rgb: { r: 173, g: 216, b: 230 } }, // #ADD8E6 - Xanh biển nhạt
          { name: 'Xanh ngọc nhạt', rgb: { r: 175, g: 238, b: 238 } }, // #AFEEEE - Xanh ngọc nhạt
     ],
};

interface ColorPickerProps {
     label: string;
     type: 'lips' | 'blush';
     onChange: (r: number, g: number, b: number) => void;
     currentColor: {
          r: number;
          g: number;
          b: number;
     };
     activeColor: {
          type: 'lips' | 'blush' | null;
          color: {
               r: number;
               g: number;
               b: number;
          } | null;
     };
     onColorSelect: (
          type: 'lips' | 'blush',
          color: { r: number; g: number; b: number }
     ) => void;
}

export const ColorPicker = memo(
     ({
          label,
          type,
          onChange,

          activeColor,
          onColorSelect,
     }: ColorPickerProps) => {
          return (
               <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                         <Palette className="h-3.5 w-3.5" />
                         <span className="text-sm font-medium">{label}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                         {POPULAR_COLORS[type].map((color, index) => {
                              const isColorActive =
                                   activeColor?.type === type &&
                                   activeColor?.color?.r === color.rgb.r &&
                                   activeColor?.color?.g === color.rgb.g &&
                                   activeColor?.color?.b === color.rgb.b;

                              return (
                                   <button
                                        key={index}
                                        onClick={() => {
                                             onColorSelect(type, color.rgb);
                                             onChange(
                                                  color.rgb.r,
                                                  color.rgb.g,
                                                  color.rgb.b
                                             );
                                        }}
                                        className="group relative"
                                   >
                                        <div
                                             className={`h-12 w-full rounded-lg border-2 transition-all hover:scale-105 hover:shadow-md ${
                                                  isColorActive
                                                       ? 'border-pink-500 ring-2 ring-pink-500/20'
                                                       : 'border-white shadow-sm'
                                             }`}
                                             style={{
                                                  backgroundColor: `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`,
                                             }}
                                        />
                                        <div
                                             className={`mt-1 text-center text-xs ${
                                                  isColorActive
                                                       ? 'text-pink-500'
                                                       : 'text-gray-600'
                                             }`}
                                        >
                                             {color.name}
                                        </div>
                                   </button>
                              );
                         })}
                    </div>
               </div>
          );
     }
);

ColorPicker.displayName = 'ColorPicker';

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MakeupToggle } from '@/components/MakeupToggle';
import { SliderControl } from '@/components/SliderControl';
import { Switch } from '@headlessui/react';
import {
     Menu,
     Palette,
     RefreshCcw,
     X
} from 'lucide-react';
import Image from 'next/image';
import { EyebrowSection } from './components/EyebrowSection';
import { eyebrowData } from './data';
import { COMMON_EYEBROW_COLORS, EyebrowColor, MAKEUP_OPTIONS, SLIDER_CONFIGS } from './types';

interface ControlsProps {
     showLandmarks: boolean;
     removeEyebrows: boolean;
     selectedMakeup: string[];
     controls: {
          definition: 'SHARPEN' | 'SMOOTH';
          color_skin: number;

          color_eyebrow: number;
          eyebrow_left_width_scale: number;
          eyebrow_right_width_scale: number;
          eyebrow_left_height_scale: number;
          eyebrow_right_height_scale: number;
          eyebrow_left_horizontal_offset: number;
          eyebrow_right_horizontal_offset: number;
          eyebrow_left_vertical_offset: number;
          eyebrow_right_vertical_offset: number;
          eyebrow_left_rotation_angle: number;
          eyebrow_right_rotation_angle: number;
          [key: string]: number | string;
     };

     onLandmarksChange: (value: boolean) => void;
     onEyebrowsChange: (value: boolean) => void;
     onMakeupToggle: (option: string) => void;
     onControlChange: (name: string, value: any) => void;
     onDragStart: () => void;
     onDragEnd: () => void;
     isMobileControlsOpen: boolean;
     onMobileControlsClose: () => void;
     onMobileControlsOpen: () => void;
     selectedEyebrow: string;
     onEyebrowChange: (path: string) => void;
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
     onReset: () => void;
     onResetLeftEyebrow: () => void;
     onResetRightEyebrow: () => void;
}

export const Controls = ({
     showLandmarks,
     removeEyebrows,
     selectedMakeup,
     controls,
     onLandmarksChange,
     onEyebrowsChange,
     onMakeupToggle,
     onControlChange,

     isMobileControlsOpen,
     onMobileControlsClose,
     onMobileControlsOpen,
     selectedEyebrow,
     onEyebrowChange,

     onResetLeftEyebrow,
     onResetRightEyebrow,
}: ControlsProps) => {
     return (
          <>
               {/* Nút menu trên mobile */}
               <button
                    onClick={() => onMobileControlsOpen()}
                    className="fixed right-4 top-4 z-50 rounded-full bg-white p-2 shadow-lg md:hidden"
               >
                    <Menu className="h-6 w-6 text-gray-700" />
               </button>

               {/* Panel điều chỉnh */}
               <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:relative md:inset-auto md:w-auto md:max-w-none md:transform-none md:shadow-none ${isMobileControlsOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                    }`}>
                    {/* Nút đóng trên mobile */}
                    <button
                         onClick={onMobileControlsClose}
                         className="absolute right-4 top-4 md:hidden"
                    >
                         <X className="h-6 w-6 text-gray-500" />
                    </button>

                    {/* Nội dung controls */}
                    <div className="h-full overflow-y-auto">
                         <div className="space-y-6 p-4">
                              {/* Section 1: Công cụ chính */}
                              <div className="w-full rounded-lg bg-gray-50/50 p-2.5">
                                   <div className="flex justify-between gap-5">
                                        <div className="flex flex-col items-start space-y-2">
                                             <div className="flex items-center gap-2 text-gray-700">

                                                  <label className="font-bold text-gray-700">
                                                       Xóa chân mày
                                                  </label>
                                             </div>
                                             <Switch
                                                  checked={removeEyebrows}
                                                  onChange={onEyebrowsChange}
                                                  className={`${removeEyebrows
                                                       ? 'bg-pink-500'
                                                       : 'bg-gray-200'
                                                       } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none md:h-6 md:w-11`}
                                             >
                                                  <span
                                                       className={`${removeEyebrows
                                                            ? 'translate-x-5 md:translate-x-6'
                                                            : 'translate-x-1'
                                                            } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform md:h-4 md:w-4`}
                                                  />
                                             </Switch>
                                        </div>

                                        <div className="flex flex-col items-start space-y-2">
                                             <div className="flex items-center gap-2 text-gray-700">

                                                  <label className="font-bold text-gray-700">
                                                       Hiện điểm đánh dấu
                                                  </label>
                                             </div>
                                             <Switch
                                                  checked={showLandmarks}
                                                  onChange={onLandmarksChange}
                                                  className={`${showLandmarks
                                                       ? 'bg-pink-500'
                                                       : 'bg-gray-200'
                                                       } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none md:h-6 md:w-11`}
                                             >
                                                  <span
                                                       className={`${showLandmarks
                                                            ? 'translate-x-5 md:translate-x-6'
                                                            : 'translate-x-1'
                                                            } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform md:h-4 md:w-4`}
                                                  />
                                             </Switch>
                                        </div>
                                   </div>
                              </div>

                              {/* Section 2: Trang điểm */}
                              <div className="w-full rounded-lg bg-gray-50/50 p-2.5 transition-all hover:bg-gray-100/50">
                                   <MakeupToggle
                                        options={MAKEUP_OPTIONS}
                                        selected={selectedMakeup}
                                        onToggle={onMakeupToggle}
                                   />
                                   {selectedMakeup.length > 0 && (
                                        <div className="mt-4 space-y-4">
                                             {selectedMakeup.includes('Da') && (
                                                  <div className="space-y-2">
                                                       <div className="flex items-center gap-2 text-gray-700">
                                                            <Palette className="h-3.5 w-3.5" />
                                                            <label className="text-sm font-medium">Màu da</label>
                                                       </div>
                                                       <SliderControl
                                                            label="Màu da"
                                                            value={controls.color_skin}
                                                            min={0}
                                                            max={1}
                                                            step={0.01}
                                                            onChange={(value) => onControlChange('color_skin', value)}
                                                       />
                                                  </div>
                                             )}
                                        </div>
                                   )}
                              </div>

                              {/* Section 3: Điều chỉnh chân mày */}
                              <div className="space-y-4">
                                   {/* Chọn kiểu chân mày */}
                                   <div className="rounded-lg bg-gray-50 p-4">
                                        <h3 className="mb-4 font-bold text-gray-700">Kiểu chân mày</h3>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 ">
                                             {eyebrowData.map((eyebrow) => (
                                                  <div key={eyebrow.path} className="flex flex-col items-center gap-2">
                                                       <button
                                                            onClick={() => onEyebrowChange(eyebrow.path)}
                                                            className={`relative aspect-[3/1] w-full overflow-hidden rounded-lg border transition-all ${selectedEyebrow === eyebrow.path
                                                                 ? 'border-pink-500 bg-pink-50'
                                                                 : 'border-gray-200 hover:border-gray-300'
                                                                 }`}
                                                       >
                                                            <Image
                                                                 src={eyebrow.image}
                                                                 alt={eyebrow.name}
                                                                 fill
                                                                 className="object-cover"
                                                            />
                                                       </button>
                                                       <span className="text-sm text-gray-600">{eyebrow.name}</span>
                                                  </div>
                                             ))}
                                        </div>
                                   </div>

                                   {/* Độ nét */}
                                   <div className="rounded-lg bg-gray-50 p-4">
                                        <div className="mb-4 flex items-center gap-2">

                                             <h3 className="font-bold text-gray-700">Độ nét chân mày</h3>
                                        </div>
                                        <div className="flex gap-2">
                                             <button
                                                  onClick={() => onControlChange('definition', 'SHARPEN')}
                                                  className={`rounded-lg px-4 py-2 text-sm transition-all ${controls.definition === 'SHARPEN'
                                                       ? 'bg-pink-500 text-white'
                                                       : 'bg-white text-gray-700 hover:bg-gray-50'
                                                       }`}
                                             >
                                                  Sắc nét
                                             </button>
                                             <button
                                                  onClick={() => onControlChange('definition', 'SMOOTH')}
                                                  className={`rounded-lg px-4 py-2 text-sm transition-all ${controls.definition === 'SMOOTH'
                                                       ? 'bg-pink-500 text-white'
                                                       : 'bg-white text-gray-700 hover:bg-gray-50'
                                                       }`}
                                             >
                                                  Mềm mại
                                             </button>
                                        </div>
                                   </div>
                                   {/* Phần chọn màu chân mày */}
                                   <div className="rounded-lg bg-gray-50 p-4">
                                        <h3 className="mb-4 font-bold text-gray-700">Màu sắc chân mày</h3>
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                             {/* Nút màu gốc */}
                                             <button
                                                  onClick={() => onControlChange('color_eyebrow', EyebrowColor.CURRENT)}
                                                  className="group relative flex flex-col items-center justify-center"
                                                  title="Giữ nguyên màu chân mày gốc"
                                             >
                                                  <div
                                                       className={`flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white ${controls.color_eyebrow === EyebrowColor.CURRENT
                                                            ? 'ring-2 ring-pink-500 ring-offset-2'
                                                            : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                                                            } transition-all`}
                                                  >
                                                       <RefreshCcw className="h-5 w-5 sm:h-4 sm:w-4 text-gray-600" />
                                                  </div>
                                                  <span className="mt-1 text-xs text-gray-600">
                                                       Màu gốc
                                                  </span>
                                             </button>

                                             {/* Các màu khác */}
                                             {COMMON_EYEBROW_COLORS.map((color) => (
                                                  <button
                                                       key={color.value}
                                                       onClick={() => onControlChange('color_eyebrow', color.value)}
                                                       className="group relative flex flex-col items-center justify-center"
                                                       title={color.description}
                                                  >
                                                       <div
                                                            className={`h-10 w-10 sm:h-8 sm:w-8 rounded-full ${color.colorClass} ${controls.color_eyebrow === color.value
                                                                 ? 'ring-2 ring-pink-500 ring-offset-2'
                                                                 : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                                                                 } transition-all`}
                                                       />
                                                       <span className="mt-1 text-xs text-gray-600">
                                                            {color.label}
                                                       </span>
                                                  </button>
                                             ))}
                                        </div>
                                   </div>
                                   {/* Điều chỉnh chi tiết */}
                                   <div className="space-y-4">
                                        <EyebrowSection
                                             title="Chân mày trái"
                                             sliders={SLIDER_CONFIGS.filter(slider => slider.name.includes('left')).map(slider => ({
                                                  ...slider,
                                                  value: Number(controls[slider.name as keyof typeof controls]) || 0
                                             }))}
                                             onControlChange={onControlChange}
                                             onReset={onResetLeftEyebrow}
                                        />
                                        <EyebrowSection
                                             title="Chân mày phải"
                                             sliders={SLIDER_CONFIGS.filter(slider => slider.name.includes('right')).map(slider => ({
                                                  ...slider,
                                                  value: Number(controls[slider.name as keyof typeof controls]) || 0
                                             }))}
                                             onControlChange={onControlChange}
                                             onReset={onResetRightEyebrow}
                                        />
                                   </div>


                              </div>
                         </div>
                    </div>
               </div>

               {/* Overlay khi mở menu trên mobile */}
               {isMobileControlsOpen && (
                    <div
                         className="fixed inset-0 z-40 bg-black bg-opacity-25 md:hidden"
                         onClick={onMobileControlsClose}
                    />
               )}
          </>
     );
};

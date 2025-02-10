/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { MakeupToggle } from '@/components/MakeupToggle';
import { SliderControl } from '@/components/SliderControl';
import { Switch } from '@headlessui/react';
import {
     Footprints,
     Map,
     Palette,
     RefreshCcw,
     Settings,
     X,
} from 'lucide-react';
import Image from 'next/image';
import { ColorPicker } from './ColorPicker';
import { eyebrowData } from './data';
import { MAKEUP_OPTIONS, SLIDER_CONFIGS } from './types';

interface ControlsProps {
     showLandmarks: boolean;
     removeEyebrows: boolean;
     selectedMakeup: string[];
     controls: {
          definition: 'SHARPEN' | 'SMOOTH';
          resize_horizontal: number;
          resize_vertical: number;
          resize_position_up: number;
          resize_position_left: number;
          resize_position_right: number;
          rotate_left: number;
          rotate_right: number;
          color_skin: number;
          color_lips_r: number;
          color_lips_g: number;
          color_lips_b: number;
          color_blush_r: number;
          color_blush_g: number;
          color_blush_b: number;
     };
     onLandmarksChange: (value: boolean) => void;
     onEyebrowsChange: (value: boolean) => void;
     onMakeupToggle: (option: string) => void;
     onControlChange: (name: string, value: any) => void;
     onDragStart: () => void;
     onDragEnd: () => void;
     isMobileControlsOpen: boolean;
     onMobileControlsClose: () => void;
     onColorPickerDragStart: () => void;
     onColorPickerDragEnd: () => void;
     selectedEyebrow: string;
     onEyebrowChange: (path: string) => void;
}

// Thêm constant cho default values
const DEFAULT_CONTROLS = {
     definition: 'SHARPEN' as 'SHARPEN' | 'SMOOTH',
     resize_horizontal: 120,
     resize_vertical: 200,
     resize_position_up: -100,
     resize_position_left: -35,
     resize_position_right: -60,
     rotate_left: 10,
     rotate_right: -10,
};

export const Controls = ({
     showLandmarks,
     removeEyebrows,
     selectedMakeup,
     controls,
     onLandmarksChange,
     onEyebrowsChange,
     onMakeupToggle,
     onControlChange,
     onDragStart,
     onDragEnd,
     isMobileControlsOpen,
     onMobileControlsClose,
     selectedEyebrow,
     onEyebrowChange,
     onColorPickerDragStart,
     onColorPickerDragEnd,
}: ControlsProps) => {
     return (
          <div
               className={`${
                    isMobileControlsOpen
                         ? 'fixed bottom-0 right-0 top-0 translate-x-0'
                         : 'translate-x-full'
               } z-[60] h-full w-full max-w-[95%] overflow-y-auto bg-white shadow-[-4px_0_16px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out md:static md:relative md:z-20 md:w-full md:max-w-none md:transform-none md:overflow-y-auto md:rounded-2xl md:shadow-none`}
          >
               <div className="h-full space-y-3 px-4 pb-32 pt-20 md:p-3">
                    <button
                         onClick={onMobileControlsClose}
                         className="absolute right-3 top-3 rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
                    >
                         <X className="h-5 w-5" />
                    </button>

                    <div className="space-y-6">
                         <div className="flex flex-col gap-3">
                              <div className="w-full rounded-lg bg-gray-50/50 p-2.5 transition-all hover:bg-gray-100/50">
                                   <div className="flex justify-between gap-5">
                                        <div className="flex flex-col items-start space-y-2">
                                             <div className="flex items-center gap-2 text-gray-700">
                                                  <Footprints className="h-3.5 w-3.5" />
                                                  <label className="text-sm font-medium">
                                                       Xóa chân mày
                                                  </label>
                                             </div>
                                             <Switch
                                                  checked={removeEyebrows}
                                                  onChange={onEyebrowsChange}
                                                  className={`${
                                                       removeEyebrows
                                                            ? 'bg-pink-500'
                                                            : 'bg-gray-200'
                                                  } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none md:h-6 md:w-11`}
                                             >
                                                  <span
                                                       className={`${
                                                            removeEyebrows
                                                                 ? 'translate-x-5 md:translate-x-6'
                                                                 : 'translate-x-1'
                                                       } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform md:h-4 md:w-4`}
                                                  />
                                             </Switch>
                                        </div>

                                        <div className="flex flex-col items-start space-y-2">
                                             <div className="flex items-center gap-2 text-gray-700">
                                                  <Map className="h-3.5 w-3.5" />
                                                  <label className="text-sm font-medium">
                                                       Hiện điểm đánh dấu
                                                  </label>
                                             </div>
                                             <Switch
                                                  checked={showLandmarks}
                                                  onChange={onLandmarksChange}
                                                  className={`${
                                                       showLandmarks
                                                            ? 'bg-pink-500'
                                                            : 'bg-gray-200'
                                                  } relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none md:h-6 md:w-11`}
                                             >
                                                  <span
                                                       className={`${
                                                            showLandmarks
                                                                 ? 'translate-x-5 md:translate-x-6'
                                                                 : 'translate-x-1'
                                                       } inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform md:h-4 md:w-4`}
                                                  />
                                             </Switch>
                                        </div>
                                   </div>
                              </div>

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
                                                            <label className="text-sm font-medium">
                                                                 Màu da
                                                            </label>
                                                       </div>
                                                       <input
                                                            type="range"
                                                            min={0}
                                                            max={10}
                                                            step={0.1}
                                                            value={
                                                                 controls.color_skin
                                                            }
                                                            onChange={(e) =>
                                                                 onControlChange(
                                                                      'color_skin',
                                                                      Number(
                                                                           e
                                                                                .target
                                                                                .value
                                                                      )
                                                                 )
                                                            }
                                                            className={`h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 transition-all hover:accent-pink-600 ${
                                                                 isDragging
                                                                      ? 'accent-pink-500 ring-2 ring-pink-500/20'
                                                                      : 'accent-pink-500'
                                                            }`}
                                                       />
                                                       <div className="text-right text-xs text-gray-500">
                                                            {controls.color_skin.toFixed(
                                                                 1
                                                            )}
                                                       </div>
                                                  </div>
                                             )}

                                             {selectedMakeup.includes(
                                                  'Môi'
                                             ) && (
                                                  <ColorPicker
                                                       label="Màu môi"
                                                       type="lips"
                                                       onChange={(r, g, b) => {
                                                            onControlChange(
                                                                 'color_lips_r',
                                                                 r
                                                            );
                                                            onControlChange(
                                                                 'color_lips_g',
                                                                 g
                                                            );
                                                            onControlChange(
                                                                 'color_lips_b',
                                                                 b
                                                            );
                                                       }}
                                                  />
                                             )}

                                             {selectedMakeup.includes('Má') && (
                                                  <ColorPicker
                                                       label="Màu má hồng"
                                                       type="blush"
                                                       onChange={(r, g, b) => {
                                                            onControlChange(
                                                                 'color_blush_r',
                                                                 r
                                                            );
                                                            onControlChange(
                                                                 'color_blush_g',
                                                                 g
                                                            );
                                                            onControlChange(
                                                                 'color_blush_b',
                                                                 b
                                                            );
                                                       }}
                                                  />
                                             )}
                                        </div>
                                   )}
                              </div>

                              {removeEyebrows && (
                                   <div className="w-full rounded-lg bg-gray-50/50 p-3">
                                        <div className="mb-3 flex items-center">
                                             <Settings className="h-3.5 w-3.5 text-gray-700" />
                                             <span className="ml-2 text-sm font-medium text-gray-700">
                                                  Kiểu chân mày
                                             </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
                                             {eyebrowData.map(
                                                  (eyebrow, index) => (
                                                       <div
                                                            key={index}
                                                            className="flex flex-col items-center gap-2"
                                                       >
                                                            <button
                                                                 onClick={() =>
                                                                      onEyebrowChange(
                                                                           eyebrow.path
                                                                      )
                                                                 }
                                                                 className={`relative aspect-[3/1] w-full overflow-hidden rounded-lg border transition-all ${
                                                                      selectedEyebrow ===
                                                                      eyebrow.path
                                                                           ? 'border-pink-500 bg-pink-50 shadow-sm'
                                                                           : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                                                 }`}
                                                            >
                                                                 <div className="absolute inset-0 p-2">
                                                                      <div className="relative h-full w-full">
                                                                           <Image
                                                                                src={
                                                                                     eyebrow.image
                                                                                }
                                                                                alt={
                                                                                     eyebrow.name
                                                                                }
                                                                                fill
                                                                                className="rounded-md object-cover"
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            </button>

                                                            <span
                                                                 className={`text-center text-xs font-medium ${
                                                                      selectedEyebrow ===
                                                                      eyebrow.path
                                                                           ? 'text-pink-500'
                                                                           : 'text-gray-600'
                                                                 }`}
                                                            >
                                                                 {eyebrow.name}
                                                            </span>
                                                       </div>
                                                  )
                                             )}
                                        </div>
                                   </div>
                              )}
                         </div>

                         {removeEyebrows && (
                              <>
                                   <div className="w-full rounded-lg bg-gray-50/50 p-2.5">
                                        <div className="mb-3 flex items-center gap-2 text-gray-700">
                                             <Settings className="h-3.5 w-3.5" />
                                             <p className="text-sm font-medium">
                                                  Độ nét chân mày
                                             </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                             <button
                                                  onClick={() => {
                                                       console.log(
                                                            'Before click SHARPEN:',
                                                            controls.definition
                                                       );
                                                       onControlChange(
                                                            'definition',
                                                            'SHARPEN'
                                                       );
                                                  }}
                                                  className={`rounded-lg px-3 py-1.5 text-[14px] transition-all ${
                                                       controls.definition ===
                                                       'SHARPEN'
                                                            ? 'border border-pink-500 bg-pink-500 text-white'
                                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                                                  }`}
                                             >
                                                  Sắc nét
                                             </button>
                                             <button
                                                  onClick={() => {
                                                       console.log(
                                                            'Before click SMOOTH:',
                                                            controls.definition
                                                       );
                                                       onControlChange(
                                                            'definition',
                                                            'SMOOTH'
                                                       );
                                                  }}
                                                  className={`rounded-lg px-3 py-1.5 text-[14px] transition-all ${
                                                       controls.definition ===
                                                       'SMOOTH'
                                                            ? 'border border-pink-500 bg-pink-500 text-white'
                                                            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                                                  }`}
                                             >
                                                  Mềm mại
                                             </button>
                                        </div>

                                        <div className="mt-10 flex items-center justify-between">
                                             <div className="flex items-center gap-2 text-gray-700">
                                                  <Settings className="h-3.5 w-3.5" />
                                                  <p className="text-sm font-medium">
                                                       Điều chỉnh chân mày
                                                  </p>
                                             </div>
                                             <button
                                                  onClick={() => {
                                                       Object.entries(
                                                            DEFAULT_CONTROLS
                                                       ).forEach(
                                                            ([key, value]) => {
                                                                 onControlChange(
                                                                      key,
                                                                      value
                                                                 );
                                                            }
                                                       );
                                                  }}
                                                  className="flex items-center gap-1.5 text-[14px] font-medium text-pink-500 transition-colors hover:text-pink-600"
                                             >
                                                  <RefreshCcw className="h-3.5 w-3.5" />
                                                  Khôi phục
                                             </button>
                                        </div>
                                   </div>

                                   {/* Các slider controls */}
                                   {SLIDER_CONFIGS.map((config) => (
                                        <SliderControl
                                             key={config.name}
                                             label={config.label}
                                             value={Number(
                                                  controls[
                                                       config.name as keyof typeof controls
                                                  ]
                                             )}
                                             min={config.min}
                                             max={config.max}
                                             onDragStart={onDragStart}
                                             onDragEnd={onDragEnd}
                                             description={config.description}
                                             onChange={(value) =>
                                                  onControlChange(
                                                       config.name,
                                                       value
                                                  )
                                             }
                                             className="w-full rounded-lg bg-gray-50/50 p-3 text-sm"
                                        />
                                   ))}
                              </>
                         )}
                    </div>
               </div>
          </div>
     );
};

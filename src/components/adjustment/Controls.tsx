'use client';
import { Switch } from '@headlessui/react';
import { Settings, Map, Footprints, X, RefreshCcw } from 'lucide-react';
import { MakeupToggle } from '@/components/MakeupToggle';
import { SliderControl } from '@/components/SliderControl';
import { MAKEUP_OPTIONS, SLIDER_CONFIGS } from './types';

interface ControlsProps {
     showLandmarks: boolean;
     removeEyebrows: boolean;
     selectedMakeup: string[];
     controls: Record<string, number>;
     onLandmarksChange: (value: boolean) => void;
     onEyebrowsChange: (value: boolean) => void;
     onMakeupToggle: (option: string) => void;
     onControlChange: (name: string, value: number) => void;
     onDragStart: () => void;
     onDragEnd: () => void;
     isMobileControlsOpen: boolean;
     onMobileControlsClose: () => void;
}

// Thêm constant cho default values
const DEFAULT_CONTROLS = {
     definition: 0,
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
}: ControlsProps) => {
     return (
          <div
               className={`${
                    isMobileControlsOpen
                         ? 'fixed bottom-0 right-0 top-0 translate-x-0'
                         : 'translate-x-full'
               } z-[60] h-full w-full max-w-[95%] overflow-y-auto bg-white shadow-[-4px_0_16px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out md:static md:relative md:z-20 md:w-full md:max-w-none md:transform-none md:overflow-y-auto md:rounded-2xl md:shadow-none`}
          >
               <div className="h-full space-y-3 px-4 pb-32 pt-14 md:p-3">
                    <button
                         onClick={onMobileControlsClose}
                         className="absolute right-3 top-3 rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
                    >
                         <X className="h-5 w-5" />
                    </button>

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
                              <div>
                                   <MakeupToggle
                                        options={MAKEUP_OPTIONS}
                                        selected={selectedMakeup}
                                        onToggle={onMakeupToggle}
                                   />
                              </div>
                         </div>

                         <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-gray-50/50 p-2.5 text-gray-700">
                              <div className="flex items-center gap-2">
                                   <Settings className="h-3.5 w-3.5" />
                                   <p className="text-sm font-medium">
                                        Điều chỉnh chân mày
                                   </p>
                              </div>

                              <button
                                   onClick={() => {
                                        Object.entries(
                                             DEFAULT_CONTROLS
                                        ).forEach(([key, value]) => {
                                             onControlChange(key, value);
                                        });
                                   }}
                                   className="flex items-center gap-2 text-[14px] font-medium text-pink-500 transition-colors hover:text-pink-600"
                              >
                                   <RefreshCcw className="h-3.5 w-3.5" />
                                   Khôi phục
                              </button>
                         </div>

                         {SLIDER_CONFIGS.map((config) => (
                              <SliderControl
                                   key={config.name}
                                   label={config.label}
                                   value={controls[config.name]}
                                   min={config.min}
                                   max={config.max}
                                   onDragStart={onDragStart}
                                   onDragEnd={onDragEnd}
                                   description={config.description}
                                   onChange={(value) =>
                                        onControlChange(config.name, value)
                                   }
                                   className="w-full rounded-lg bg-gray-50/50 p-3 text-sm"
                              />
                         ))}
                    </div>
               </div>
          </div>
     );
};

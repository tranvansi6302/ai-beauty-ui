'use client';

import { Info, Settings } from 'lucide-react';
import { Popover } from '@headlessui/react';
import CustomNumberInput from './CustomNumberInput';

interface SliderControlProps {
     label: string;
     value: number;
     min: number;
     max: number;
     step?: number;
     onChange: (value: number) => void;
     onDragStart?: () => void;
     onDragEnd?: () => void;
     description?: string;
     className?: string;
}

export const SliderControl = ({
     label,
     value,
     min,
     max,
     step = 0.1,
     onChange,
     onDragStart,
     onDragEnd,
     description,
     className,
}: SliderControlProps) => {
     console.log(label, value, min, max, step, description);
     return (
          <div className={`space-y-3 ${className}`}>
               <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                         <label className="text-sm font-medium text-gray-700">
                              {label}
                         </label>
                         {description && (
                              <Popover className="relative">
                                   <Popover.Button className="text-gray-400 hover:text-gray-500 focus:outline-none">
                                        <Info
                                             size={14}
                                             className="mt-1 text-gray-500 hover:text-pink-500"
                                        />
                                   </Popover.Button>

                                   <Popover.Panel className="absolute bottom-full left-0 z-10 mb-1">
                                        <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative max-h-[400px] w-[280px] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                                             <div className="mb-3 flex items-center gap-2">
                                                  <div className="rounded-lg bg-pink-50 p-1.5">
                                                       <Settings
                                                            size={14}
                                                            className="text-pink-500"
                                                       />
                                                  </div>
                                                  <h3 className="font-medium text-gray-900">
                                                       {label}
                                                  </h3>
                                             </div>

                                             <div className="mb-4">
                                                  <h4 className="mb-2 text-xs font-medium text-gray-500">
                                                       CHỨC NĂNG
                                                  </h4>
                                                  <p className="text-sm leading-relaxed text-gray-600">
                                                       {description}
                                                  </p>
                                             </div>

                                             <div>
                                                  <h4 className="mb-2 text-xs font-medium text-gray-500">
                                                       GIỚI HẠN GIÁ TRỊ
                                                  </h4>
                                                  <div className="grid grid-cols-2 gap-3">
                                                       <div className="rounded-lg bg-gray-50 px-3 py-2.5">
                                                            <div className="mb-0.5 text-xs text-gray-500">
                                                                 Tối thiểu
                                                            </div>
                                                            <div className="font-medium text-gray-900">
                                                                 {min}
                                                            </div>
                                                       </div>
                                                       <div className="rounded-lg bg-gray-50 px-3 py-2.5">
                                                            <div className="mb-0.5 text-xs text-gray-500">
                                                                 Tối đa
                                                            </div>
                                                            <div className="font-medium text-gray-900">
                                                                 {max}
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </Popover.Panel>
                              </Popover>
                         )}
                    </div>
                    {/* Hidden mobile */}
                    <div className="hidden md:block">
                         <CustomNumberInput
                              value={value}
                              onChange={onChange}
                              min={min}
                              max={max}
                              step={step}
                              className="scale-100"
                         />
                    </div>
               </div>
               <div className="flex items-center gap-2">
                    <input
                         type="range"
                         min={min}
                         max={max}
                         step={step}
                         value={value}
                         onChange={(e) => onChange(Number(e.target.value))}
                         onMouseDown={onDragStart}
                         onMouseUp={onDragEnd}
                         onTouchStart={onDragStart}
                         onTouchEnd={onDragEnd}
                         className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-pink-500 transition-all hover:accent-pink-600"
                    />
               </div>
          </div>
     );
};

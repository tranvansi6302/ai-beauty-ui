'use client';
import { useCallback, useRef } from 'react';

interface EyebrowColorSliderProps {
     value: number;
     onChange: (value: number) => void;
}

export const EyebrowColorSlider = ({
     value,
     onChange,
}: EyebrowColorSliderProps) => {
     const sliderRef = useRef<HTMLDivElement>(null);

     const getPercentage = useCallback((value: number) => {
          return ((value + 4) / 8) * 100; // Chuyển từ -4->4 sang 0->100%
     }, []);

     const handleClick = useCallback(
          (event: React.MouseEvent<HTMLDivElement>) => {
               if (!sliderRef.current) return;

               const rect = sliderRef.current.getBoundingClientRect();
               const x = event.clientX - rect.left;
               const percentage = (x / rect.width) * 100;
               const newValue = (percentage / 100) * 8 - 4; // Chuyển từ 0->100% sang -4->4

               // Giới hạn giá trị từ -4 đến 4, làm tròn đến 0.5
               const clampedValue = Math.max(-4, Math.min(4, newValue));
               const roundedValue = Math.round(clampedValue * 2) / 2;

               onChange(roundedValue);
          },
          [onChange]
     );

     return (
          <div className="w-full">
               <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                         Màu chân mày
                    </label>
                    <div className="text-xs text-gray-500">
                         {value === 1
                              ? 'Màu hiện tại'
                              : value < 0
                                ? 'Thiên xanh'
                                : value === 0
                                  ? 'Đen'
                                  : 'Thiên đỏ'}
                    </div>
               </div>
               <div
                    className="relative h-5"
                    ref={sliderRef}
                    onClick={handleClick}
               >
                    {/* Track với gradient: xanh -> đen -> đỏ */}
                    <div
                         className="absolute inset-x-0 top-1.5 h-2 rounded-full"
                         style={{
                              background:
                                   'linear-gradient(to right, #0000FF, #000000 50%, #FF0000)',
                         }}
                    />

                    {/* Thumb */}
                    <div
                         className="absolute top-0 h-5 w-5 cursor-pointer rounded-full border-2 border-white bg-pink-500 shadow-lg transition-all"
                         style={{
                              left: `calc(${getPercentage(value)}% - 10px)`,
                         }}
                    />
               </div>
          </div>
     );
};

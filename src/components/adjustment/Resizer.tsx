'use client';

import { useCallback, useEffect, useState } from 'react';

interface ResizerProps {
     onResize: (newWidth: number) => void;
}

export const Resizer = ({ onResize }: ResizerProps) => {
     const [isResizing, setIsResizing] = useState(false);

     const handleMouseDown = (e: React.MouseEvent) => {
          e.preventDefault();
          setIsResizing(true);
     };

     const handleMouseMove = useCallback(
          (e: MouseEvent) => {
               if (!isResizing) return;

               const container = document.getElementById(
                    'adjustment-container'
               );
               if (!container) return;

               const containerRect = container.getBoundingClientRect();
               const newWidth =
                    ((e.clientX - containerRect.left) / containerRect.width) *
                    100;

               // Giới hạn resize trong khoảng 30% - 70%
               const clampedWidth = Math.max(30, Math.min(70, newWidth));
               onResize(clampedWidth);
          },
          [isResizing, onResize]
     );

     const handleMouseUp = () => {
          setIsResizing(false);
     };

     useEffect(() => {
          if (isResizing) {
               document.addEventListener('mousemove', handleMouseMove);
               document.addEventListener('mouseup', handleMouseUp);
          }

          return () => {
               document.removeEventListener('mousemove', handleMouseMove);
               document.removeEventListener('mouseup', handleMouseUp);
          };
     }, [isResizing, handleMouseMove]);

     return (
          <div
               className="group h-full cursor-col-resize select-none px-5"
               onMouseDown={handleMouseDown}
          >
               <div className="flex h-full items-center justify-center">
                    {/* Đường gạch chính */}
                    <div className="relative h-full w-[2px] bg-gray-200 group-hover:bg-gray-300">
                         {/* Đường gạch phụ bên trái */}
                         <div className="absolute -left-[3px] h-full w-[1px] bg-gray-200 group-hover:bg-gray-300" />
                         {/* Đường gạch phụ bên phải */}
                         <div className="absolute -right-[3px] h-full w-[1px] bg-gray-200 group-hover:bg-gray-300" />
                    </div>

                    {/* Handle icon */}
                    <div className="absolute">
                         <div className="flex h-10 w-5 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                              <div className="flex gap-[2px]">
                                   <div className="h-4 w-[2px] rounded-full bg-gray-400" />
                                   <div className="h-4 w-[2px] rounded-full bg-gray-400" />
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

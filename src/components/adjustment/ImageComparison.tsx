'use client';
import Image from 'next/image';
import { useCallback, useState } from 'react';

interface ImageComparisonProps {
     originalImage: string | null;
     outputImage: string | null;
     scale: number;
     position: { x: number; y: number };
     isGrabbing: boolean;
     isDraggingImage: boolean;
     isComparing: boolean;
     comparePosition: number;
     onCompareMove: (position: number) => void;
     onMouseDown: (e: React.MouseEvent) => void;
     onMouseMove: (e: React.MouseEvent) => void;
     onMouseUp: () => void;
     onMouseLeave: () => void;
     isLoading?: boolean;
}

export const ImageComparison = ({
     originalImage,
     outputImage,
     scale,
     position,

     isComparing,
     comparePosition,
     onCompareMove,
     onMouseDown,
     onMouseMove,
     onMouseUp,
     onMouseLeave,
     isLoading,
}: ImageComparisonProps) => {
     const [isDraggingCompare, setIsDraggingCompare] = useState(false);

     const handleCompareMouseDown = useCallback((e: React.MouseEvent) => {
          e.stopPropagation();
          setIsDraggingCompare(true);
     }, []);

     const handleCompareMouseMove = useCallback(
          (e: React.MouseEvent) => {
               if (isDraggingCompare) {
                    const bounds = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - bounds.left;
                    const newPosition = Math.max(
                         0,
                         Math.min(100, (x / bounds.width) * 100)
                    );
                    onCompareMove(newPosition);
               }
          },
          [isDraggingCompare, onCompareMove]
     );

     const handleMouseUp = useCallback(() => {
          setIsDraggingCompare(false);
          onMouseUp();
     }, [onMouseUp]);

     const handleMouseLeave = useCallback(() => {
          setIsDraggingCompare(false);
          onMouseLeave();
     }, [onMouseLeave]);

     return (
          <div
               className="relative aspect-square w-full overflow-hidden md:rounded-2xl"
               style={{ background: 'white' }}
               onMouseDown={onMouseDown}
               onMouseMove={(e) => {
                    onMouseMove(e);
                    handleCompareMouseMove(e);
               }}
               onMouseUp={handleMouseUp}
               onMouseLeave={handleMouseLeave}
          >
               {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                         <div className="flex flex-col items-center gap-3">
                              {/* Simple spinning circle with gradient */}
                              <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-500/30 border-t-pink-500" />

                              {/* Simple text */}
                              <p className="text-sm font-medium text-white/90">
                                   Loading...
                              </p>
                         </div>
                    </div>
               )}

               <div className="relative h-full w-full">
                    <div className="relative h-full w-full">
                         <Image
                              src={originalImage || ''}
                              alt="Original"
                              fill
                              priority
                              className="origin-center object-cover will-change-transform"
                              style={{
                                   transform: `scale(${scale})`,
                                   clipPath: isComparing
                                        ? `inset(0 ${100 - comparePosition}% 0 0)`
                                        : undefined,
                              }}
                              unoptimized
                              draggable={false}
                         />
                    </div>

                    {outputImage && (
                         <div className="absolute inset-0">
                              <Image
                                   src={outputImage}
                                   alt="Processed"
                                   fill
                                   priority
                                   className="object-cover will-change-transform"
                                   style={{
                                        transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                                        clipPath: isComparing
                                             ? `inset(0 0 0 ${comparePosition}%)`
                                             : undefined,
                                   }}
                                   unoptimized
                                   draggable={false}
                              />
                         </div>
                    )}
               </div>

               {isComparing && (
                    <div
                         className="absolute top-0 h-full select-none"
                         style={{
                              left: `${comparePosition}%`,
                              transform: 'translateX(-50%)',
                              cursor: 'ew-resize',
                              zIndex: 10,
                         }}
                         onMouseDown={handleCompareMouseDown}
                    >
                         <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 transform bg-white/80" />
                         <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90">
                              <div className="flex gap-[2px]">
                                   <div className="h-3 w-[1px] rounded-full bg-gray-400/80" />
                                   <div className="h-3 w-[1px] rounded-full bg-gray-400/80" />
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
};

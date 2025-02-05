"use client";
import { useCallback, useState } from "react";
import Image from 'next/image';

interface ImageComparisonProps {
  originalImage: string;
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

  const handleCompareMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingCompare) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const newPosition = Math.max(0, Math.min(100, (x / bounds.width) * 100));
      onCompareMove(newPosition);
    }
  }, [isDraggingCompare, onCompareMove]);

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
      className="w-full aspect-square relative rounded-2xl overflow-hidden"
      style={{ background: "white" }}
      onMouseDown={onMouseDown}
      onMouseMove={(e) => {
        onMouseMove(e);
        handleCompareMouseMove(e);
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      <div className="relative w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src={originalImage || ''}
            alt="Original"
            fill
            priority
            className="object-cover will-change-transform origin-center"
            style={{
              transform: `scale(${scale})`,
              clipPath: isComparing ? `inset(0 ${100 - comparePosition}% 0 0)` : undefined,
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
                clipPath: isComparing ? `inset(0 0 0 ${comparePosition}%)` : undefined,
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
            transform: "translateX(-50%)",
            cursor: "ew-resize",
            zIndex: 10,
          }}
          onMouseDown={handleCompareMouseDown}
        >
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/80 transform -translate-x-1/2" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
            <div className="flex gap-[2px]">
              <div className="w-[1px] h-3 bg-gray-400/80 rounded-full" />
              <div className="w-[1px] h-3 bg-gray-400/80 rounded-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 
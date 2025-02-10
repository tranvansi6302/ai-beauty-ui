'use client';
import {
     Download,
     Hand,
     RotateCcw,
     SquareSplitHorizontal,
     ZoomIn,
     ZoomOut,
} from 'lucide-react';

interface ToolBarProps {
     isComparing: boolean;
     isGrabbing: boolean;
     onCompareToggle: () => void;
     onZoomIn: () => void;
     onZoomOut: () => void;
     onGrabToggle: () => void;
     onReset: () => void;
     onDownload: () => void;
     onMobileControlsToggle: () => void;
}

export const ToolBar = ({
     isComparing,
     isGrabbing,
     onCompareToggle,
     onZoomIn,
     onZoomOut,
     onGrabToggle,
     onReset,
     onDownload,
}: ToolBarProps) => {
     const tools = [
          {
               icon: <SquareSplitHorizontal className="h-4 w-4" />,
               tooltip: 'So sánh ảnh',
               onClick: onCompareToggle,
               active: isComparing,
          },
          {
               icon: <ZoomIn className="h-4 w-4" />,
               tooltip: 'Phóng to',
               onClick: onZoomIn,
          },
          {
               icon: <ZoomOut className="h-4 w-4" />,
               tooltip: 'Thu nhỏ',
               onClick: onZoomOut,
          },
          {
               icon: <Hand className="h-4 w-4" />,
               tooltip: 'Di chuyển',
               onClick: onGrabToggle,
               active: isGrabbing,
          },
          {
               icon: <RotateCcw className="h-4 w-4" />,
               tooltip: 'Đặt lại',
               onClick: onReset,
          },
          {
               icon: <Download className="h-4 w-4" />,
               tooltip: 'Tải xuống',
               onClick: onDownload,
          },
     ];

     return (
          <div className="flex w-8 flex-col gap-2.5 md:w-10">
               {tools.map((tool, index) => (
                    <div key={index} className="group relative">
                         <button
                              onClick={tool.onClick}
                              className={`flex w-full items-center justify-center rounded-lg border border-white/20 p-1.5 backdrop-blur-sm transition-all md:border-gray-200 md:p-2 ${
                                   tool.active
                                        ? 'bg-pink-500 text-white hover:bg-pink-600 md:bg-pink-500'
                                        : 'bg-white/20 text-white hover:bg-white/30 md:bg-white md:text-gray-700 md:hover:bg-gray-50'
                              }`}
                         >
                              {tool.icon}
                         </button>
                         <div className="absolute left-full top-1/2 z-20 ml-2 hidden -translate-y-1/2 group-hover:block">
                              <div className="whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white">
                                   {tool.tooltip}
                              </div>
                         </div>
                    </div>
               ))}
          </div>
     );
};

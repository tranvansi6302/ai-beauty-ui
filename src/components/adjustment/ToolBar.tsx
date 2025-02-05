"use client";
import {
  SquareSplitHorizontal,
  ZoomIn,
  ZoomOut,
  Hand,
  RotateCcw,
  Download,
} from "lucide-react";

interface ToolBarProps {
  isComparing: boolean;
  isGrabbing: boolean;
  onCompareToggle: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onGrabToggle: () => void;
  onReset: () => void;
  onDownload: () => void;
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
      icon: <SquareSplitHorizontal className="w-4 h-4" />,
      tooltip: "So sánh ảnh",
      onClick: onCompareToggle,
      active: isComparing,
    },
    {
      icon: <ZoomIn className="w-4 h-4" />,
      tooltip: "Phóng to",
      onClick: onZoomIn,
    },
    {
      icon: <ZoomOut className="w-4 h-4" />,
      tooltip: "Thu nhỏ",
      onClick: onZoomOut,
    },
    {
      icon: <Hand className="w-4 h-4" />,
      tooltip: "Di chuyển",
      onClick: onGrabToggle,
      active: isGrabbing,
    },
    {
      icon: <RotateCcw className="w-4 h-4" />,
      tooltip: "Đặt lại",
      onClick: onReset,
    },
    {
      icon: <Download className="w-4 h-4" />,
      tooltip: "Tải xuống",
      onClick: onDownload,
    },
  ];

  return (
    <div className="flex flex-col gap-2.5 w-8 md:w-10">
      {tools.map((tool, index) => (
        <div key={index} className="relative group">
          <button
            onClick={tool.onClick}
            className={`p-1.5 md:p-2 rounded-lg border border-gray-200 transition-all w-full flex items-center justify-center ${
              tool.active
                ? "bg-pink-500 hover:bg-pink-600 text-white"
                : "bg-white hover:bg-gray-50 text-gray-700"
            }`}
          >
            {tool.icon}
          </button>
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block z-20">
            <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {tool.tooltip}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 
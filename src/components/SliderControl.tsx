import { Info, Settings } from "lucide-react";
import { Popover } from "@headlessui/react";
import CustomNumberInput from "./CustomNumberInput";

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
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
  onChange,
  onDragStart,
  onDragEnd,
  description,
  className
}: SliderControlProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          {description && (
            <Popover className="relative">
              <Popover.Button className="text-gray-400 hover:text-gray-500 focus:outline-none">
                <Info size={14} className="text-gray-500 mt-1 hover:text-pink-500"/>
              </Popover.Button>

              <Popover.Panel className="absolute z-10 bottom-full left-0 mb-1">
                <div className="relative bg-white border border-gray-200 p-4 rounded-xl shadow-lg w-[280px] max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-pink-50 rounded-lg">
                      <Settings size={14} className="text-pink-500" />
                    </div>
                    <h3 className="font-medium text-gray-900">{label}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-500 mb-2">CHỨC NĂNG</h4>
                    <p className="text-sm leading-relaxed text-gray-600">{description}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">GIỚI HẠN GIÁ TRỊ</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 px-3 py-2.5 rounded-lg">
                        <div className="text-xs text-gray-500 mb-0.5">Tối thiểu</div>
                        <div className="font-medium text-gray-900">{min}</div>
                      </div>
                      <div className="bg-gray-50 px-3 py-2.5 rounded-lg">
                        <div className="text-xs text-gray-500 mb-0.5">Tối đa</div>
                        <div className="font-medium text-gray-900">{max}</div>
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
          className="scale-100"
        />
       </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onMouseDown={onDragStart}
        onMouseUp={onDragEnd}
        onTouchStart={onDragStart}
        onTouchEnd={onDragEnd}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500 hover:accent-pink-600 transition-all"
      />
    </div>
  );
};

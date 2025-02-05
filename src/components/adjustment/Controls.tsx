"use client";
import { Switch } from "@headlessui/react";
import { Settings, Map, Footprints, X } from "lucide-react";
import { MakeupToggle } from "@/components/MakeupToggle";
import { SliderControl } from "@/components/SliderControl";
import { MAKEUP_OPTIONS, SLIDER_CONFIGS } from "./types";

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
      className={`fixed right-0 top-0 bottom-0 md:static md:w-auto md:h-auto
      ${isMobileControlsOpen ? "translate-x-0" : "translate-x-full"}
      md:transform-none 
      h-full w-full max-w-[95%] z-[60] md:z-auto 
      transition-transform duration-300 ease-in-out
      p-4 md:p-6 space-y-6 md:space-y-8 
      bg-white overflow-y-auto md:overflow-visible md:rounded-2xl
      shadow-[-4px_0_16px_rgba(0,0,0,0.1)] md:shadow-none`}
    >
      <button
        onClick={onMobileControlsClose}
        className="absolute top-0 right-0 p-4 md:hidden hover:bg-gray-100 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-4" style={{marginTop:'0'}}>
        <div className="bg-gray-50/50 p-3 md:p-4 rounded-xl hover:bg-gray-100/50 transition-all">
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center gap-2 text-gray-700 mb-1 md:mb-2">
              <Footprints className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <label className="text-sm font-medium">Xóa chân mày</label>
            </div>
            <Switch
              checked={removeEyebrows}
              onChange={onEyebrowsChange}
              
              className={`${
                removeEyebrows ? "bg-pink-500" : "bg-gray-200"
              } relative inline-flex h-5 md:h-6 w-9 md:w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  removeEyebrows
                    ? "translate-x-5 md:translate-x-6"
                    : "translate-x-1"
                } inline-block h-3.5 md:h-4 w-3.5 md:w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>

        <div className="bg-gray-50/50 p-3 md:p-4 rounded-xl hover:bg-gray-100/50 transition-all">
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center gap-2 text-gray-700 mb-1 md:mb-2">
              <Map className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <label className="text-sm font-medium">Hiện điểm đánh dấu</label>
            </div>
            <Switch
              checked={showLandmarks}
              onChange={onLandmarksChange}
              className={`${
                showLandmarks ? "bg-pink-500" : "bg-gray-200"
              } relative inline-flex h-5 md:h-6 w-9 md:w-11 items-center rounded-full transition-colors focus:outline-none`}
            >
              <span
                className={`${
                  showLandmarks
                    ? "translate-x-5 md:translate-x-6"
                    : "translate-x-1"
                } inline-block h-3.5 md:h-4 w-3.5 md:w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>

        <div className="bg-gray-50/50 p-3 md:p-4 rounded-xl hover:bg-gray-100/50 transition-all">
          <div>
            <MakeupToggle
              options={MAKEUP_OPTIONS}
              selected={selectedMakeup}
              onToggle={onMakeupToggle}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-700">
        <Settings className="w-4 md:w-5 h-4 md:h-5" />
        <p className="text-sm font-medium">Điều chỉnh chân mày</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
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
            onChange={(value) => onControlChange(config.name, value)}
          />
        ))}
      </div>
    </div>
  );
}; 
import { Palette } from "lucide-react";

type MakeupToggleProps = {
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
};

export function MakeupToggle({
  options,
  selected,
  onToggle,
}: MakeupToggleProps) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gray-700">
        <Palette className="w-4 h-4" />
        <label className="text-sm font-medium">Trang điểm</label>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`px-3 py-1.5 rounded-lg text-[14px] transition-all
              ${
                selected.includes(option)
                  ? "bg-pink-500 text-white hover:bg-pink-500 border border-pink-500"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

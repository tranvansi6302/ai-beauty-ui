import { ScanFace } from 'lucide-react';

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
                    <ScanFace className="h-4 w-4" />
                    <label className="text-sm font-medium">Trang điểm</label>
               </div>
               <div className="mt-4 flex flex-wrap gap-2">
                    {options.map((option) => (
                         <button
                              key={option}
                              onClick={() => onToggle(option)}
                              className={`rounded-lg px-3 py-1.5 text-[14px] transition-all ${
                                   selected.includes(option)
                                        ? 'border border-pink-500 bg-pink-500 text-white hover:bg-pink-500'
                                        : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                              }`}
                         >
                              {option}
                         </button>
                    ))}
               </div>
          </div>
     );
}

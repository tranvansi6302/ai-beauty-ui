import { SliderControl } from '@/components/SliderControl';
import { RefreshCcw } from 'lucide-react';

interface EyebrowSectionProps {
    title: string;
    sliders: Array<{
        name: string;
        label: string;
        value: number;
        min: number;
        max: number;
        step?: number;
        description?: string;
    }>;
    onControlChange: (name: string, value: number) => void;
    onReset: () => void;
}

export const EyebrowSection = ({ title, sliders, onControlChange, onReset }: EyebrowSectionProps) => {
    return (
        <div className="rounded-lg bg-gray-50 p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-700">{title}</h3>
                <button
                    onClick={onReset}
                    className="flex items-center gap-1.5 text-pink-500 hover:text-pink-600"
                    title="Đặt lại về mặc định"
                >
                    <RefreshCcw className="h-4 w-4" />
                    <span className="text-sm">Đặt lại</span>
                </button>
            </div>
            <div className="space-y-4">
                {sliders.map((slider) => (
                    <SliderControl
                        key={slider.name}
                        {...slider}
                        onChange={(value) => onControlChange(slider.name, value)}
                        className="w-full"
                    />
                ))}
            </div>
        </div>
    );
}; 
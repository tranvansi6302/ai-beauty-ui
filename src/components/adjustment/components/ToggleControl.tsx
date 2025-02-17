import { Switch } from '@headlessui/react';

interface ToggleControlProps {
    icon: React.ReactNode;
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}

export const ToggleControl = ({ icon, label, checked, onChange }: ToggleControlProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {icon}
                <span className="text-sm font-medium">{label}</span>
            </div>
            <Switch checked={checked} onChange={onChange} />
        </div>
    );
}; 
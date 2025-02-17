'use client'
import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

type CustomNumberInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

const CustomNumberInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 0.1,
  className
}: CustomNumberInputProps) => {
  const [internalValue, setInternalValue] = useState<string>(value.toString());

  useEffect(() => {
    setInternalValue(Number(value).toFixed(1));
  }, [value]);

  const isAtMin = Number(internalValue) <= min;
  const isAtMax = Number(internalValue) >= max;

  const handleIncrement = () => {
    if (!isAtMax) {
      const newValue = Math.min(Number((Number(internalValue) + step).toFixed(1)), max);
      setInternalValue(newValue.toString());
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    if (!isAtMin) {
      const newValue = Math.max(Number((Number(internalValue) - step).toFixed(1)), min);
      setInternalValue(newValue.toString());
      onChange(newValue);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || /^\d*\.?\d*$/.test(newValue)) {
      setInternalValue(newValue);
    }
  };

  const handleBlur = () => {
    if (internalValue === '') {
      setInternalValue(value.toFixed(1));
      return;
    }

    const numValue = Number(internalValue);
    if (isNaN(numValue)) {
      setInternalValue(value.toFixed(1));
      return;
    }

    const boundedValue = Math.min(Math.max(numValue, min), max);
    const formattedValue = Number(boundedValue.toFixed(1));
    setInternalValue(formattedValue.toString());
    onChange(formattedValue);
  };

  return (
    <div className={`inline-flex items-center rounded-md border border-gray-200 bg-white shadow-sm ${className || ''}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={isAtMin}
        className={`h-6 w-6 flex items-center justify-center rounded-l-md border-r transition ${isAtMin
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-pink-500 hover:bg-gray-50"
          }`}
      >
        <Minus size={14} />
      </button>
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-12 text-[12px] text-gray-500 text-center font-medium outline-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={isAtMax}
        className={`h-6 w-6 flex items-center justify-center rounded-r-md border-l transition ${isAtMax
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-pink-500 hover:bg-gray-50"
          }`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default CustomNumberInput;

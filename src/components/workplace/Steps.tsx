"use client";

interface StepsProps {
  currentStep: number;
}

export const Steps = ({ currentStep }: StepsProps) => (
  <div className="flex items-center">
    <div className="flex items-center">
      <div className="relative">
        <div
          className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-white text-sm ${
            currentStep >= 1 ? "bg-[#ff4081]" : "bg-gray-200"
          }`}
        >
          1
        </div>
        <div
          className={`absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs sm:text-sm ${
            currentStep >= 1 ? "text-[#ff4081]" : "text-gray-500"
          }`}
        >
          Upload Ảnh
        </div>
      </div>
      <div
        className={`w-16 sm:w-32 h-[2px] mx-2 ${
          currentStep >= 2 ? "bg-[#ff4081]" : "bg-gray-200"
        }`}
      ></div>
    </div>
    <div className="flex items-center">
      <div className="relative">
        <div
          className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-white text-sm ${
            currentStep >= 2 ? "bg-[#ff4081]" : "bg-gray-200"
          }`}
        >
          2
        </div>
        <div
          className={`text-[13px] absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs sm:text-sm ${
            currentStep >= 2 ? "text-[#ff4081]" : "text-gray-500"
          }`}
        >
          Kiểm Tra
        </div>
      </div>
      <div
        className={`w-16 sm:w-32 h-[2px] mx-2 ${
          currentStep >= 3 ? "bg-[#ff4081]" : "bg-gray-200"
        }`}
      ></div>
    </div>
    <div className="flex items-center">
      <div className="relative">
        <div
          className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center text-white text-sm ${
            currentStep >= 3 ? "bg-[#ff4081]" : "bg-gray-200"
          }`}
        >
          3
        </div>
        <div
          className={`text-[13px] whitespace-nowrap absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 text-xs sm:text-sm ${
            currentStep >= 3 ? "text-[#ff4081]" : "text-gray-500"
          }`}
        >
          Làm đẹp
        </div>
      </div>
    </div>
  </div>
); 
"use client";
import { Upload, X, Check, Wand } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface ImageUploadProps {
  selectedImage: string | null;
  currentStep: number;
  onImageSelect: (image: string | null) => void;
  onNextStep: () => void;
  setCurrentStep: (step: 1 | 2 | 3) => void;
  setError: (error: string | null) => void;
}

export const ImageUpload = ({
  selectedImage,
  currentStep,
  onImageSelect,
  onNextStep,
  setCurrentStep,
  setError,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Kích thước file không được vượt quá 10MB");
        return;
      }

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Chỉ chấp nhận file JPG hoặc PNG");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
    if (e.target) {
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Kích thước file không được vượt quá 10MB");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Chỉ chấp nhận file JPG hoặc PNG");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full">
      {selectedImage ? (
        <div className="relative w-full h-full">
          <Image
            src={selectedImage}
            alt="Preview"
            width={450}
            height={450}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => {
              onImageSelect(null);
              setCurrentStep(1);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  fileInputRef.current?.click();
                }}
                className="text-[13px] flex-1 py-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Tải ảnh khác
              </button>
              <button
                onClick={onNextStep}
                className="text-[13px] whitespace-nowrap flex-1 py-2 bg-[#ff4081] rounded-full text-white hover:bg-[#ff4081]/90 transition-colors flex items-center justify-center"
              >
                {currentStep === 1 ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Kiểm tra
                  </>
                ) : (
                  <>
                    <Wand className="w-4 h-4 mr-2" />
                    Làm đẹp
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="h-full flex flex-col items-center justify-center cursor-pointer hover:border-[#ff4081] transition-all group"
          >
            <div className="w-24 h-24 mb-4 bg-pink-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-[#ff4081]" />
            </div>
            <p className="text-gray-700 font-medium text-center mb-2">
              Kéo thả ảnh vào đây
            </p>
            <p className="text-gray-500 text-sm">hoặc click để chọn file</p>
            <p className="text-gray-400 text-xs mt-2">
              Hỗ trợ: JPG, PNG (Max 10MB)
            </p>
          </div>
        </>
      )}
    </div>
  );
}; 
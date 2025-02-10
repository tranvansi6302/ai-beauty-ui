"use client";
import {
  Camera,
  Check,
  Image as ImageIcon,
  Info,
  Upload,
  Wand,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CameraCapture } from "./CameraCapture";
import { ImageUpload } from "./ImageUpload";
import { InfoCards } from "./InfoCards";
import { Steps } from "./Steps";

export const WorkplaceClient = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upload" | "capture" | "gallery">("upload");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);

  const handleNextStep = () => {
    if (selectedImage && currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedImage) {
      localStorage.setItem("selectedImage", selectedImage);
      router.push("/adjustment");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="mt-4 lg:mt-0 flex items-center mb-6 text-[14px] px-4 lg:px-0">
        <Link href="/" className="text-gray-500 hover:text-gray-700 flex items-center gap-2 mt-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay về trang chủ
        </Link>
       
      </div>

      <div className="rounded-xl border border-gray-200">
        {/* Introduction */}
        <div className="bg-white pt-4 rounded-tl-2xl rounded-tr-2xl px-4">
          <div className="mb-6 px-4 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-50 rounded-full flex items-center justify-center">
                <Wand className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff4081]" />
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Trải Nghiệm AI Làm Đẹp
              </h2>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xl">
              Tải lên hình ảnh của bạn để bắt đầu trải nghiệm công nghệ AI làm đẹp thông minh
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-4 px-4 sm:mb-10 border-b border-gray-200 overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 items-start md-gap-4 min-w-max">
              <button
                onClick={() => {
                  setActiveTab("upload");
                  setSelectedImage(null);
                  setCurrentStep(1);
                }}
                className={`flex items-center pb-3 relative ${
                  activeTab === "upload"
                    ? "text-[#ff4081]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Upload className="w-4 h-4 mr-2" />
                <span className="font-medium text-sm">Upload Ảnh</span>
                {activeTab === "upload" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4081]"></div>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab("capture");
                  setSelectedImage(null);
                  setCurrentStep(1);
                }}
                className={`flex items-center pb-3 relative ${
                  activeTab === "capture"
                    ? "text-[#ff4081]"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Camera className="w-4 h-4 mr-2" />
                <span className="font-medium text-sm">Chụp Ảnh</span>
                {activeTab === "capture" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4081]"></div>
                )}
              </button>

              <div className="flex items-center pb-3 text-gray-300 cursor-not-allowed">
                <ImageIcon className="w-4 h-4 mr-2" />
                <span className="font-medium text-sm">Thư viện ảnh</span>
                <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-pink-50 text-[#ff4081] rounded">
                  Sắp ra mắt
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid mt-6 sm:mt-10 grid-cols-1 lg:grid-cols-[450px,1fr] gap-4 sm:gap-8 px-4 pb-8">
          {/* Left Side - Upload/Camera Area */}
          <div className="w-full h-[450px] lg:w-[450px] lg:order-1">
            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-dashed border-gray-200">
              {activeTab === "upload" ? (
                <ImageUpload
                  selectedImage={selectedImage}
                  currentStep={currentStep}
                  onImageSelect={setSelectedImage}
                  onNextStep={handleNextStep}
                  setCurrentStep={setCurrentStep}
                  setError={setError}
                />
              ) : (
                <CameraCapture
                  selectedImage={selectedImage}
                  currentStep={currentStep}
                  onImageSelect={setSelectedImage}
                  onNextStep={handleNextStep}
                  setCurrentStep={setCurrentStep}
                  setError={setError}
                />
              )}
            </div>
          </div>

          {/* Right Side Content */}
          <div className="w-full lg:order-2 mt-6 sm:mt-10 lg:mt-0">
            {/* Steps */}
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-center">
                <Steps currentStep={currentStep} />
              </div>
            </div>

            {/* Requirements Box */}
            <div className="p-4 sm:p-5 rounded-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center">
                  <Camera className="w-4 h-4 text-[#ff4081]" />
                </div>
                <h3 className="font-medium text-gray-900 ml-3">Yêu cầu ảnh</h3>
              </div>

              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="w-5 h-5 bg-pink-50 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check className="w-3 h-3 text-[#ff4081]" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Góc chụp chuẩn</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Ảnh chụp thẳng khuôn mặt, không nghiêng hoặc quay đi
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="w-5 h-5 bg-pink-50 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check className="w-3 h-3 text-[#ff4081]" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Ánh sáng phù hợp</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Chụp trong điều kiện ánh sáng tốt, không bị ngược sáng
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="w-5 h-5 bg-pink-50 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check className="w-3 h-3 text-[#ff4081]" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Khuôn mặt rõ ràng</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Không đeo kính, khẩu trang hoặc phụ kiện che mặt
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="w-5 h-5 bg-pink-50 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <Check className="w-3 h-3 text-[#ff4081]" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">Khoảng cách phù hợp</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Chụp ở khoảng cách vừa phải, khuôn mặt chiếm 70-80% khung hình
                    </p>
                  </div>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-pink-100">
                <div className="flex items-start text-xs">
                  <Info className="w-4 h-4 text-[#ff4081] mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-500">
                    Tuân thủ các yêu cầu trên sẽ giúp hệ thống phân tích chính xác tình trạng da của bạn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 mx-4 lg:mx-0 bg-red-50 text-red-600 p-3 sm:p-4 rounded-lg flex items-center text-sm">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          {error}
        </div>
      )}

      {/* Info Cards */}
      <div className="px-4 lg:px-0">
        <InfoCards />
      </div>
    </div>
  );
}; 
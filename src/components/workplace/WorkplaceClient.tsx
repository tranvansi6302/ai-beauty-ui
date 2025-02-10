'use client';
import {
     Camera,
     Check,
     Image as ImageIcon,
     Info,
     Upload,
     Wand,
     ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CameraCapture } from './CameraCapture';
import { ImageUpload } from './ImageUpload';
import { InfoCards } from './InfoCards';
import { Steps } from './Steps';

export const WorkplaceClient = () => {
     const router = useRouter();
     const [activeTab, setActiveTab] = useState<
          'upload' | 'capture' | 'gallery'
     >('upload');
     const [selectedImage, setSelectedImage] = useState<string | null>(null);
     const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
     const [error, setError] = useState<string | null>(null);

     const handleNextStep = () => {
          if (selectedImage && currentStep === 1) {
               setCurrentStep(2);
          } else if (currentStep === 2 && selectedImage) {
               localStorage.setItem('selectedImage', selectedImage);
               router.push('/adjustment');
          }
     };

     return (
          <div className="mx-auto max-w-[1400px]">
               {/* Breadcrumb */}
               <div className="mb-6 mt-4 flex items-center px-4 text-[14px] lg:mt-0 lg:px-0">
                    <Link
                         href="/"
                         className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-700"
                    >
                         <ArrowLeft className="mr-2 h-4 w-4" />
                         Quay về trang chủ
                    </Link>
               </div>

               <div className="rounded-xl border border-gray-200">
                    {/* Introduction */}
                    <div className="rounded-tl-2xl rounded-tr-2xl bg-white px-4 pt-4">
                         <div className="mb-6 px-4 sm:mb-8">
                              <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 sm:h-10 sm:w-10">
                                        <Wand className="h-4 w-4 text-[#ff4081] sm:h-5 sm:w-5" />
                                   </div>
                                   <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                                        Trải Nghiệm AI Làm Đẹp
                                   </h2>
                              </div>
                              <p className="max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
                                   Tải lên hình ảnh của bạn để bắt đầu trải
                                   nghiệm công nghệ AI làm đẹp thông minh
                              </p>
                         </div>

                         {/* Tabs */}
                         <div className="scrollbar-hide mb-4 overflow-x-auto border-b border-gray-200 px-4 sm:mb-10">
                              <div className="md-gap-4 flex min-w-max items-start gap-8">
                                   <button
                                        onClick={() => {
                                             setActiveTab('upload');
                                             setSelectedImage(null);
                                             setCurrentStep(1);
                                        }}
                                        className={`relative flex items-center pb-3 ${
                                             activeTab === 'upload'
                                                  ? 'text-[#ff4081]'
                                                  : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                   >
                                        <Upload className="mr-2 h-4 w-4" />
                                        <span className="text-sm font-medium">
                                             Upload Ảnh
                                        </span>
                                        {activeTab === 'upload' && (
                                             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4081]"></div>
                                        )}
                                   </button>

                                   <button
                                        onClick={() => {
                                             setActiveTab('capture');
                                             setSelectedImage(null);
                                             setCurrentStep(1);
                                        }}
                                        className={`relative flex items-center pb-3 ${
                                             activeTab === 'capture'
                                                  ? 'text-[#ff4081]'
                                                  : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                   >
                                        <Camera className="mr-2 h-4 w-4" />
                                        <span className="text-sm font-medium">
                                             Chụp Ảnh
                                        </span>
                                        {activeTab === 'capture' && (
                                             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff4081]"></div>
                                        )}
                                   </button>

                                   <div className="flex cursor-not-allowed items-center pb-3 text-gray-300">
                                        <ImageIcon className="mr-2 h-4 w-4" />
                                        <span className="text-sm font-medium">
                                             Thư viện ảnh
                                        </span>
                                        <span className="ml-2 rounded bg-pink-50 px-1.5 py-0.5 text-[10px] text-[#ff4081]">
                                             Sắp ra mắt
                                        </span>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="mt-6 grid grid-cols-1 gap-4 px-4 pb-8 sm:mt-10 sm:gap-8 lg:grid-cols-[600px,1fr]">
                         {/* Left Side - Upload/Camera Area */}
                         <div className="h-[450px] w-full lg:order-1 lg:h-[600px] lg:w-[600px]">
                              <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-dashed border-gray-200">
                                   {activeTab === 'upload' ? (
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
                         <div className="mt-6 w-full sm:mt-10 lg:order-2 lg:mt-0">
                              {/* Steps */}
                              <div className="mb-4 sm:mb-6">
                                   <div className="flex justify-center">
                                        <Steps currentStep={currentStep} />
                                   </div>
                              </div>

                              {/* Requirements Box */}
                              <div className="rounded-lg border border-gray-100 p-4 sm:p-5">
                                   <div className="mb-4 flex items-center">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50">
                                             <Camera className="h-4 w-4 text-[#ff4081]" />
                                        </div>
                                        <h3 className="ml-3 font-medium text-gray-900">
                                             Yêu cầu ảnh
                                        </h3>
                                   </div>

                                   <ul className="space-y-5">
                                        <li className="flex items-start">
                                             <div className="mr-3 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-50">
                                                  <Check className="h-3 w-3 text-[#ff4081]" />
                                             </div>
                                             <div>
                                                  <p className="text-sm font-medium text-gray-900">
                                                       Góc chụp chuẩn
                                                  </p>
                                                  <p className="mt-0.5 text-xs text-gray-500">
                                                       Ảnh chụp thẳng khuôn mặt,
                                                       không nghiêng hoặc quay
                                                       đi
                                                  </p>
                                             </div>
                                        </li>

                                        <li className="flex items-start">
                                             <div className="mr-3 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-50">
                                                  <Check className="h-3 w-3 text-[#ff4081]" />
                                             </div>
                                             <div>
                                                  <p className="text-sm font-medium text-gray-900">
                                                       Ánh sáng phù hợp
                                                  </p>
                                                  <p className="mt-0.5 text-xs text-gray-500">
                                                       Chụp trong điều kiện ánh
                                                       sáng tốt, không bị ngược
                                                       sáng
                                                  </p>
                                             </div>
                                        </li>

                                        <li className="flex items-start">
                                             <div className="mr-3 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-50">
                                                  <Check className="h-3 w-3 text-[#ff4081]" />
                                             </div>
                                             <div>
                                                  <p className="text-sm font-medium text-gray-900">
                                                       Khuôn mặt rõ ràng
                                                  </p>
                                                  <p className="mt-0.5 text-xs text-gray-500">
                                                       Không đeo kính, khẩu
                                                       trang hoặc phụ kiện che
                                                       mặt
                                                  </p>
                                             </div>
                                        </li>

                                        <li className="flex items-start">
                                             <div className="mr-3 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pink-50">
                                                  <Check className="h-3 w-3 text-[#ff4081]" />
                                             </div>
                                             <div>
                                                  <p className="text-sm font-medium text-gray-900">
                                                       Khoảng cách phù hợp
                                                  </p>
                                                  <p className="mt-0.5 text-xs text-gray-500">
                                                       Chụp ở khoảng cách vừa
                                                       phải, khuôn mặt chiếm
                                                       70-80% khung hình
                                                  </p>
                                             </div>
                                        </li>
                                   </ul>

                                   <div className="mt-4 border-t border-pink-100 pt-3">
                                        <div className="flex items-start text-xs">
                                             <Info className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-[#ff4081]" />
                                             <p className="text-gray-500">
                                                  Tuân thủ các yêu cầu trên sẽ
                                                  giúp hệ thống phân tích chính
                                                  xác tình trạng da của bạn
                                             </p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Error message */}
               {error && (
                    <div className="mx-4 mt-4 flex items-center rounded-lg bg-red-50 p-3 text-sm text-red-600 sm:p-4 lg:mx-0">
                         <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
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

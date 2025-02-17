/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { debounce } from 'lodash';
import { ArrowLeft, Camera, Upload } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CameraCapture } from '../workplace/CameraCapture';
import { ImageUpload } from '../workplace/ImageUpload';
import { eyebrow_left_path_1 } from './base64_eyebrow_left_1';
import { Controls } from './Controls';
import { eyebrowData } from './data';
import { ImageComparison } from './ImageComparison';
import { Resizer } from './Resizer';
import { ToolBar } from './ToolBar';
import { AdjustmentData, MAKEUP_MAP } from './types';

export const AdjustmentClient = () => {

     const [image, setImage] = useState<string | null>(null);
     const [cleanedImage, setCleanedImage] = useState<string>('');
     const [selectedMakeup, setSelectedMakeup] = useState<string[]>([]);

     // Định nghĩa controls state với kiểu dữ liệu đầy đủ
     type ControlsType = {
          definition: 'SHARPEN' | 'SMOOTH'; // Định nghĩa chỉnh sửa
          color_skin: number; // Màu sắc da

          color_eyebrow: number; // Màu sắc chân mày
          eyebrow_left_width_scale: number; // Tỷ lệ rộng chân mày trái
          eyebrow_right_width_scale: number; // Tỷ lệ rộng chân mày phải
          eyebrow_left_height_scale: number; // Tỷ lệ cao chân mày trái
          eyebrow_right_height_scale: number; // Tỷ lệ cao chân mày phải
          eyebrow_left_horizontal_offset: number; // Độ lệch ngang chân mày trái
          eyebrow_right_horizontal_offset: number; // Độ lệch ngang chân mày phải
          eyebrow_left_vertical_offset: number; // Độ lệch dọc chân mày trái
          eyebrow_right_vertical_offset: number; // Độ lệch dọc chân mày phải
          eyebrow_left_rotation_angle: number; // Góc quay chân mày trái
          eyebrow_right_rotation_angle: number; // Góc quay chân mày phải
          [key: string]: number | string; // Dễ dàng mở rộng cho các tham số khác
     };


     const [controls, setControls] = useState<ControlsType>({
          // Các giá trị mặc định cho chân mày
          definition: 'SHARPEN',


          // Các giá trị mặc định cho trang điểm
          color_skin: 0.75,
          color_eyebrow: 0,

          // Các giá trị mặc định cho điều chỉnh chi tiết chân mày
          eyebrow_left_width_scale: 1.0,
          eyebrow_right_width_scale: 1.0,
          eyebrow_left_height_scale: 1.0,
          eyebrow_right_height_scale: 1.0,
          eyebrow_left_horizontal_offset: 0,
          eyebrow_right_horizontal_offset: 0,
          eyebrow_left_vertical_offset: 0,
          eyebrow_right_vertical_offset: 0,
          eyebrow_left_rotation_angle: 8,
          eyebrow_right_rotation_angle: -8,
     });

     const [removeEyebrows, setRemoveEyebrows] = useState(true);
     const [showLandmarks, setShowLandmarks] = useState(false);
     const [coefficient] = useState(0.75);
     const [isDragging, setIsDragging] = useState(false);
     const [scale, setScale] = useState(1);
     const [position, setPosition] = useState({ x: 0, y: 0 });
     const [isDraggingImage, setIsDraggingImage] = useState(false);
     const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
     const [isGrabbing, setIsGrabbing] = useState(false);
     const [outputImage, setOutputImage] = useState<string | null>(null);
     const [isLoading, setIsLoading] = useState(false);
     const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
     const [isComparing, setIsComparing] = useState(false);
     const [comparePosition, setComparePosition] = useState(50);
     const [leftWidth, setLeftWidth] = useState(50);
     const imageRef = useRef<HTMLDivElement>(null);


     const previousRequest = useRef<AbortController | null>(null);
     const [isPickingColor] = useState(false);

     const [selectedEyebrow, setSelectedEyebrow] = useState(
          eyebrowData[0].path
     );

     // Thêm state để lưu giá trị tạm thời khi đang kéo
     const [tempControls, setTempControls] = useState<ControlsType | null>(
          null
     );

     // Thêm state để theo dõi màu đang được chọn
     const [activeColor, setActiveColor] = useState<{
          type: 'lips' | 'blush' | null;
          color: {
               r: number;
               g: number;
               b: number;
          } | null;
     }>({
          type: null,
          color: null,
     });

     // Thêm states mới
     const [activeTab, setActiveTab] = useState<'upload' | 'capture' | 'gallery'>('upload');
     const [error, setError] = useState<string | null>(null);

     // Thêm ref cho Controls container
     const controlsRef = useRef<HTMLDivElement>(null);

     const callAdjustmentAPI = useCallback(
          debounce(async (data: AdjustmentData) => {
               if (!cleanedImage) return;

               if (previousRequest.current) {
                    previousRequest.current.abort();
               }

               const controller = new AbortController();
               previousRequest.current = controller;

               try {
                    setIsLoading(true);
                    const response = await fetch(
                         'https://external.365sharing.org/ai-beauty/apply-adjustments',
                         {
                              method: 'POST',
                              headers: {
                                   'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                   input_image: cleanedImage,
                                   eyebrow_left_path: data.eyebrow_left_path,
                                   output_image_path: 'data/output_images/portrait_new_eyebrows',
                                   apply_makeup: data.apply_makeup,
                                   features: data.features,
                                   show_landmarks: data.show_landmarks,
                                   remove_eyebrows: data.remove_eyebrows,
                                   anchor: 'center',
                                   definition: data.definition,
                                   color_skin: controls.color_skin,
                                   color_eyebrow: controls.color_eyebrow,
                                   adjust_params: {
                                        left: {
                                             width_scale: Number(controls.eyebrow_left_width_scale) || 1.0,
                                             height_scale: Number(controls.eyebrow_left_height_scale) || 1.0,
                                             horizontal_offset: Number(controls.eyebrow_left_horizontal_offset) || 0,
                                             vertical_offset: Number(controls.eyebrow_left_vertical_offset) || 0,
                                             rotation_angle: Number(controls.eyebrow_left_rotation_angle) || 8
                                        },
                                        right: {
                                             width_scale: Number(controls.eyebrow_right_width_scale) || 1.0,
                                             height_scale: Number(controls.eyebrow_right_height_scale) || 1.0,
                                             horizontal_offset: Number(controls.eyebrow_right_horizontal_offset) || 0,
                                             vertical_offset: Number(controls.eyebrow_right_vertical_offset) || 0,
                                             rotation_angle: Number(controls.eyebrow_right_rotation_angle) || -8
                                        }
                                   }
                              }),
                              signal: controller.signal,
                         }
                    );

                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    if (result.output_image_path) {
                         setOutputImage(`data:image/jpeg;base64,${result.output_image_path}`);
                    }
               } catch (error: unknown) {
                    if (error instanceof Error && error.name !== 'AbortError') {
                         console.error('API Error:', error);
                    }
               } finally {
                    if (previousRequest.current === controller) {
                         setIsLoading(false);
                    }
               }
          }, 300),
          [cleanedImage, controls, selectedEyebrow]
     );

     useEffect(() => {
          if (!image) return;

          const cleaned = image.replace(/^data:image\/[a-z]+;base64,/, '');
          setCleanedImage(cleaned);

          const initialData: AdjustmentData = {
               input_image: cleaned,
               output_image_path: 'data/output_images/portrait_new_eyebrows',
               features: [], // Mảng rỗng vì chưa chọn trang điểm nào
               show_landmarks: false,
               color_skin: 0.75,
               eyebrow_left_path: eyebrow_left_path_1,
               remove_eyebrows: false,
               apply_makeup: false,
               definition: 'SHARPEN',
               adjust_params: {
                    left: {
                         width_scale: 1.0,
                         height_scale: 1.0,
                         horizontal_offset: 0,
                         vertical_offset: 0,
                         rotation_angle: 8,
                    },
                    right: {
                         width_scale: 1.0,
                         height_scale: 1.0,
                         horizontal_offset: 0,
                         vertical_offset: 0,
                         rotation_angle: -8,
                    },
               },
          };

          callAdjustmentAPI(initialData);
     }, [callAdjustmentAPI]);

     useEffect(() => {
          if (!isDragging && !isPickingColor && cleanedImage) {
               const features = [];
               if (selectedMakeup.includes('Môi')) features.push('lips');
               if (selectedMakeup.includes('Da')) features.push('skin');
               if (selectedMakeup.includes('Má')) features.push('blush');

               const adjustmentData: AdjustmentData = {
                    input_image: cleanedImage,
                    eyebrow_left_path: selectedEyebrow,
                    output_image_path:
                         'data/output_images/portrait_new_eyebrows',
                    apply_makeup: selectedMakeup.length > 0,
                    features: features,
                    show_landmarks: showLandmarks,
                    remove_eyebrows: removeEyebrows,

                    definition: controls.definition || 'SHARPEN',





                    color_skin: controls.color_skin || 0.75,

               };

               callAdjustmentAPI(adjustmentData);
          }

          return () => {
               callAdjustmentAPI.cancel();
          };
     }, [
          selectedMakeup,
          showLandmarks,
          removeEyebrows,
          controls,
          isDragging,
          isPickingColor,
          coefficient,
          cleanedImage,
          callAdjustmentAPI,
          selectedEyebrow,

     ]);

     const handleZoomIn = useCallback(() => {
          setScale((prev) => {
               const newScale = Math.min(prev + 0.25, 3);
               return newScale;
          });
     }, []);

     const handleZoomOut = useCallback(() => {
          setScale((prev) => {
               const newScale = Math.max(prev - 0.25, 1);
               return newScale;
          });
     }, []);



     const handleReset = useCallback(() => {
          setControls({
               definition: 'SHARPEN',
               resize_horizontal: 50,
               resize_vertical: 90,
               resize_position_up: -40,
               resize_position_left: -35,
               resize_position_right: -35,
               rotate_left: 10,
               rotate_right: -10,
               resize_scale_left: 1.0,
               resize_scale_right: 1.0,
               color_skin: 0.75,
               color_eyebrow: 0,

               eyebrow_left_width_scale: 1.0,
               eyebrow_left_height_scale: 1.0,
               eyebrow_left_horizontal_offset: 0,
               eyebrow_left_vertical_offset: 0,
               eyebrow_left_rotation_angle: 8,


               eyebrow_right_width_scale: 1.0,
               eyebrow_right_height_scale: 1.0,
               eyebrow_right_horizontal_offset: 0,
               eyebrow_right_vertical_offset: 0,
               eyebrow_right_rotation_angle: -8,
          });
     }, []);

     const handleMouseDown = useCallback(
          (e: React.MouseEvent) => {
               if (scale > 1 && isGrabbing) {
                    setIsDraggingImage(true);
                    setDragStart({
                         x: e.clientX - position.x,
                         y: e.clientY - position.y,
                    });
               }
          },
          [scale, isGrabbing, position.x, position.y]
     );

     const handleMouseMove = useCallback(
          (e: React.MouseEvent) => {
               if (isDraggingImage) {
                    const maxOffset = (scale - 1) * 200;
                    const newX = e.clientX - dragStart.x;
                    const newY = e.clientY - dragStart.y;

                    setPosition({
                         x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
                         y: Math.max(-maxOffset, Math.min(maxOffset, newY)),
                    });
               }
          },
          [isDraggingImage, scale, dragStart.x, dragStart.y]
     );

     const handleMouseUp = useCallback(() => {
          setIsDraggingImage(false);
     }, []);

     const handleDownload = useCallback(async () => {
          try {
               if (!outputImage) return;

               const link = document.createElement('a');
               link.href = outputImage;
               link.download = 'adjusted-image.jpg';
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
          } catch (error) {
               console.error('Download error:', error);
          }
     }, [outputImage]);

     const handleCompareMove = useCallback((newPosition: number) => {
          setComparePosition(newPosition);
     }, []);

     const onMakeupToggle = useCallback((option: string) => {
          setSelectedMakeup((prev) =>
               prev.includes(option)
                    ? prev.filter((item) => item !== option)
                    : [...prev, option]
          );
     }, []);

     const onControlChange = (name: string, value: any) => {
          // Cập nhật UI ngay lập tức
          setControls((prev) => ({
               ...prev,
               [name]: value,
          }));

          // Nếu đang kéo (isDragging = true), chỉ cập nhật UI không gọi API
          if (isDragging) {
               setTempControls((prev) => ({
                    ...(prev || controls),
                    [name]: value,
               }));
               return;
          }

          // Nếu không phải đang kéo, gọi API bình thường
          handleAdjustment(
               getAdjustmentData({
                    ...controls,
                    [name]: value,
               })
          );
     };

     const onDragEnd = () => {
          setIsDragging(false);

          // Khi buông chuột, nếu có giá trị tạm thời thì gọi API với giá trị đó
          if (tempControls) {
               handleAdjustment(getAdjustmentData(tempControls));
               setTempControls(null);
          }
     };

     const handleResize = useCallback((newLeftWidth: number) => {
          setLeftWidth(newLeftWidth);

          // Cập nhật height của Controls container
          if (imageRef.current && controlsRef.current) {
               const imageContainer = imageRef.current.querySelector('.relative.aspect-square.w-full');
               if (imageContainer) {
                    const imageHeight = imageContainer.getBoundingClientRect().height;
                    const paddingTop = 16; // p-4 = 16px
                    const totalHeight = imageHeight + paddingTop * 2;
                    controlsRef.current.style.height = `${totalHeight}px`;
               }
          }
     }, []);

     const handleEyebrowChange = useCallback(
          (path: string) => {
               setSelectedEyebrow(path);

               if (cleanedImage) {
                    const adjustmentData: AdjustmentData = {
                         input_image: cleanedImage,

                         eyebrow_left_path: path,

                         output_image_path:
                              'data/output_images/portrait_new_eyebrows',
                         apply_makeup: selectedMakeup.length > 0,
                         features: selectedMakeup.map(
                              (option) =>
                                   MAKEUP_MAP[option as keyof typeof MAKEUP_MAP]
                         ),
                         show_landmarks: showLandmarks,
                         remove_eyebrows: removeEyebrows,

                         definition: controls.definition || 'SHARPEN',

                         color_skin: controls.color_skin || 0.75,



                         adjust_params: {
                              left: {
                                   width_scale: controls.eyebrow_left_width_scale,
                                   height_scale: controls.eyebrow_left_height_scale,
                                   horizontal_offset: controls.eyebrow_left_horizontal_offset,
                                   vertical_offset: controls.eyebrow_left_vertical_offset,
                                   rotation_angle: controls.eyebrow_left_rotation_angle,
                              },
                              right: {
                                   width_scale: controls.eyebrow_right_width_scale,
                                   height_scale: controls.eyebrow_right_height_scale,
                                   horizontal_offset: controls.eyebrow_right_horizontal_offset,
                                   vertical_offset: controls.eyebrow_right_vertical_offset,
                                   rotation_angle: controls.eyebrow_right_rotation_angle,
                              },
                         },

                    };

                    callAdjustmentAPI(adjustmentData);
               }
          },
          [
               cleanedImage,
               controls,
               selectedMakeup,
               showLandmarks,
               removeEyebrows,
               callAdjustmentAPI,
          ]
     );

     // Sửa lại phần useEffect theo dõi height
     useEffect(() => {
          const updateControlsHeight = () => {
               if (imageRef.current && controlsRef.current) {
                    // Tính toán tổng chiều cao bao gồm cả padding
                    const imageContainer = imageRef.current.querySelector('.relative.aspect-square.w-full');
                    if (imageContainer) {
                         const imageHeight = imageContainer.getBoundingClientRect().height;
                         const paddingTop = 16; // p-4 = 16px
                         const totalHeight = imageHeight + paddingTop * 2;
                         controlsRef.current.style.height = `${totalHeight}px`;
                    }
               }
          };

          // Cập nhật ngay lập tức
          updateControlsHeight();

          // Theo dõi resize
          const observer = new ResizeObserver(updateControlsHeight);
          if (imageRef.current) {
               observer.observe(imageRef.current);
          }

          // Cleanup
          return () => {
               observer.disconnect();
          };
     }, [leftWidth]);

     // if (!image) return null;

     const toolbarProps = {
          isComparing,
          isGrabbing,
          onCompareToggle: () => setIsComparing(!isComparing),
          onZoomIn: handleZoomIn,
          onZoomOut: handleZoomOut,
          onGrabToggle: () => setIsGrabbing(!isGrabbing),

          onDownload: handleDownload,
          onMobileControlsToggle: () =>
               setIsMobileControlsOpen(!isMobileControlsOpen),
     };

     const imageComparisonProps = {
          originalImage: image,
          outputImage,
          scale,
          position,
          isGrabbing,
          isDraggingImage,
          isComparing,
          comparePosition,
          onCompareMove: handleCompareMove,
          onMouseDown: handleMouseDown,
          onMouseMove: handleMouseMove,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseUp,
          isLoading,
     };

     // Cập nhật hàm xử lý khi chọn ảnh
     const handleImageSelect = (newImage: string | null) => {
          setImage(newImage);
          if (newImage) {
               const cleaned = newImage.replace(/^data:image\/[a-z]+;base64,/, '');
               setCleanedImage(cleaned);

               // Gọi API ngay khi có ảnh mới
               const initialData: AdjustmentData = {
                    input_image: cleaned,
                    output_image_path: 'data/output_images/portrait_new_eyebrows',
                    features: [],
                    show_landmarks: false,
                    color_skin: 0.75,
                    eyebrow_left_path: eyebrow_left_path_1,
                    remove_eyebrows: false,
                    apply_makeup: false,
                    definition: 'SHARPEN',
                    adjust_params: {
                         left: {
                              width_scale: 1.0,
                              height_scale: 1.0,
                              horizontal_offset: 0,
                              vertical_offset: 0,
                              rotation_angle: 8,
                         },
                         right: {
                              width_scale: 1.0,
                              height_scale: 1.0,
                              horizontal_offset: 0,
                              vertical_offset: 0,
                              rotation_angle: -8,
                         },
                    },
               };
               callAdjustmentAPI(initialData);
          }
     };

     // Thêm 2 hàm reset mới
     const handleResetLeftEyebrow = () => {
          setControls(prev => ({
               ...prev,
               eyebrow_left_width_scale: 1.0,
               eyebrow_left_height_scale: 1.0,
               eyebrow_left_horizontal_offset: 0,
               eyebrow_left_vertical_offset: 0,
               eyebrow_left_rotation_angle: 8,
          }));
     };


     const handleResetRightEyebrow = () => {
          setControls(prev => ({
               ...prev,
               eyebrow_right_width_scale: 1.0,
               eyebrow_right_height_scale: 1.0,
               eyebrow_right_horizontal_offset: 0,
               eyebrow_right_vertical_offset: 0,
               eyebrow_right_rotation_angle: -8,
          }));
     };

     return (
          <div className="mx-auto max-w-[1400px] px-4 md:px-0">
               <div className="mb-6 mt-4 flex items-center px-4 text-[14px] lg:mt-0 lg:px-0">
                    <Link
                         href="/"
                         className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-700"
                    >
                         <ArrowLeft className="mr-2 h-4 w-4" />
                         Quay về trang chủ
                    </Link>
               </div>

               {/* Main Layout */}
               <div id="adjustment-container" className="flex flex-row items-stretch">
                    {/* Left Side - Image Area - Thêm scroll cho toàn bộ phần bên trái */}
                    <div
                         style={{ width: `${leftWidth}%` }}
                         className="w-full transition-all duration-300 ease-in-out"
                    >
                         <div className="flex items-start gap-4 p-4 md:p-0">
                              <div className="flex-shrink-0"> {/* Bỏ sticky vì không còn scroll */}
                                   <ToolBar {...toolbarProps} />
                                   {/* Nút upload ảnh mới */}
                                   <button
                                        onClick={() => {
                                             setImage(null);
                                             setOutputImage(null);
                                             setActiveTab('upload');
                                        }}
                                        className="mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                                        title="Upload ảnh mới"
                                   >
                                        <Upload className="h-5 w-5 text-white" />
                                   </button>
                              </div>

                              <div className="w-full" ref={imageRef}>
                                   {!image ? (
                                        <div className="border rounded-2xl overflow-hidden">
                                             {/* Upload/Camera Tabs */}
                                             <div className="border-b p-4">
                                                  <div className="flex gap-4">
                                                       <button
                                                            onClick={() => setActiveTab('upload')}
                                                            className={`pb-2 flex items-center gap-2 ${activeTab === 'upload'
                                                                 ? 'border-b-2 border-pink-500 text-pink-500'
                                                                 : 'text-gray-500'
                                                                 }`}
                                                       >
                                                            <Upload className="w-4 h-4" />
                                                            <span>Upload Ảnh</span>
                                                       </button>
                                                       <button
                                                            onClick={() => setActiveTab('capture')}
                                                            className={`pb-2 flex items-center gap-2 ${activeTab === 'capture'
                                                                 ? 'border-b-2 border-pink-500 text-pink-500'
                                                                 : 'text-gray-500'
                                                                 }`}
                                                       >
                                                            <Camera className="w-4 h-4" />
                                                            <span>Chụp Ảnh</span>
                                                       </button>
                                                  </div>
                                             </div>

                                             {/* Upload/Camera Area */}
                                             <div className="flex flex-col">
                                                  <div className="flex-1">
                                                       {activeTab === 'upload' ? (
                                                            <div className="relative w-full h-[500px]">
                                                                 <ImageUpload
                                                                      selectedImage={image}
                                                                      currentStep={1}
                                                                      onImageSelect={handleImageSelect}
                                                                      onNextStep={() => { }}
                                                                      setCurrentStep={() => { }}
                                                                      setError={setError}
                                                                 />
                                                            </div>
                                                       ) : (
                                                            <div className="relative w-full h-[500px]">
                                                                 <CameraCapture
                                                                      selectedImage={image}
                                                                      currentStep={1}
                                                                      onImageSelect={handleImageSelect}
                                                                      onNextStep={() => { }}
                                                                      setCurrentStep={() => { }}
                                                                      setError={setError}
                                                                 />
                                                                 {/* Nút lật camera */}
                                                                 <button
                                                                      onClick={() => {
                                                                           // Lật camera bằng cách thay đổi facingMode
                                                                           const videoTrack = document.querySelector('video')?.srcObject as MediaStream;
                                                                           if (videoTrack) {
                                                                                videoTrack.getTracks().forEach(track => track.stop());
                                                                                // Restart camera với facingMode ngược lại
                                                                                navigator.mediaDevices.getUserMedia({
                                                                                     video: {
                                                                                          facingMode: videoTrack.getVideoTracks()[0].getSettings().facingMode === 'user'
                                                                                               ? 'environment'
                                                                                               : 'user'
                                                                                     }
                                                                                }
                                                                                ).then(stream => {
                                                                                     const video = document.querySelector('video');
                                                                                     if (video) {
                                                                                          video.srcObject = stream;
                                                                                          video.play();
                                                                                     }
                                                                                });
                                                                           }
                                                                      }}
                                                                      className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                                                                 >
                                                                      <Camera className="h-5 w-5 text-white" />
                                                                 </button>
                                                            </div>
                                                       )}
                                                  </div>
                                             </div>
                                        </div>
                                   ) : (
                                        <div className="relative w-full overflow-hidden rounded-2xl">
                                             <div className="relative aspect-square w-full">
                                                  <ImageComparison {...imageComparisonProps} />
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>

                    {/* Resizer */}
                    <div className="hidden md:block">
                         <Resizer onResize={handleResize} />
                    </div>

                    {/* Right Side - Controls */}
                    <div
                         style={{ width: `${100 - leftWidth}%` }}
                         className="hidden w-full transition-all duration-300 ease-in-out md:block"
                    >
                         <div
                              ref={controlsRef}
                              className="overflow-y-auto scrollbar-hide"
                              style={{
                                   height: imageRef.current ? `${imageRef.current.offsetHeight}px` : 'auto',
                                   maxHeight: imageRef.current ? `${imageRef.current.offsetHeight}px` : 'auto'
                              }}
                         >
                              {!image ? (
                                   // Hiển thị yêu cầu ảnh khi đang ở chế độ upload/camera
                                   <div className="p-4 rounded-2xl">
                                        <h3 className="text-sm font-medium text-gray-900 mb-3">Yêu cầu về ảnh:</h3>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                             <li className="flex items-start gap-2">
                                                  <div className="w-1 h-1 rounded-full bg-pink-500 mt-2"></div>
                                                  <span>Kéo thả ảnh vào đây hoặc click để chọn file</span>
                                             </li>
                                             <li className="flex items-start gap-2">
                                                  <div className="w-1 h-1 rounded-full bg-pink-500 mt-2"></div>
                                                  <span>Ảnh chụp thẳng khuôn mặt, không nghiêng hoặc quay đi</span>
                                             </li>
                                             <li className="flex items-start gap-2">
                                                  <div className="w-1 h-1 rounded-full bg-pink-500 mt-2"></div>
                                                  <span>Chụp trong điều kiện ánh sáng tốt, không bị ngược sáng</span>
                                             </li>
                                             <li className="flex items-start gap-2">
                                                  <div className="w-1 h-1 rounded-full bg-pink-500 mt-2"></div>
                                                  <span>Không đeo kính, khẩu trang hoặc phụ kiện che mặt</span>
                                             </li>
                                             <li className="flex items-start gap-2">
                                                  <div className="w-1 h-1 rounded-full bg-pink-500 mt-2"></div>
                                                  <span>Khuôn mặt chiếm 70-80% khung hình</span>
                                             </li>
                                             <li className="flex items-start gap-2">
                                                  <div className="w-1 h-1 rounded-full bg-pink-500 mt-2"></div>
                                                  <span>Hỗ trợ: JPG, PNG (Max 10MB)</span>
                                             </li>
                                        </ul>
                                   </div>
                              ) : (
                                   // Hiển thị Controls khi đã có ảnh
                                   <Controls
                                        showLandmarks={showLandmarks}
                                        removeEyebrows={removeEyebrows}
                                        selectedMakeup={selectedMakeup}
                                        controls={controls}
                                        onLandmarksChange={setShowLandmarks}
                                        onEyebrowsChange={setRemoveEyebrows}
                                        onMakeupToggle={onMakeupToggle}
                                        onControlChange={onControlChange}
                                        onDragStart={() => setIsDragging(true)}
                                        onDragEnd={onDragEnd}
                                        isMobileControlsOpen={isMobileControlsOpen}
                                        onMobileControlsClose={() => setIsMobileControlsOpen(false)}
                                        onMobileControlsOpen={() => setIsMobileControlsOpen(true)}
                                        selectedEyebrow={selectedEyebrow}
                                        onEyebrowChange={handleEyebrowChange}
                                        onReset={handleReset}
                                        activeColor={activeColor}
                                        onColorSelect={(type, color) => setActiveColor({ type, color })}
                                        onResetLeftEyebrow={handleResetLeftEyebrow}
                                        onResetRightEyebrow={handleResetRightEyebrow}
                                   />
                              )}
                         </div>
                    </div>
               </div>

               {/* Error message */}
               {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                         <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-red-500"></span>
                         {error}
                    </div>
               )}
          </div>
     );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAdjustmentData(_tempControls: {
     definition: 'SHARPEN' | 'SMOOTH';
     color_skin: number;

     color_eyebrow: number;
     eyebrow_left_width_scale: number;
     eyebrow_left_height_scale: number;
     eyebrow_left_horizontal_offset: number;
     eyebrow_left_vertical_offset: number;
     eyebrow_left_rotation_angle: number;
     eyebrow_right_width_scale: number;
     eyebrow_right_height_scale: number;
     eyebrow_right_horizontal_offset: number;
     eyebrow_right_vertical_offset: number;
     eyebrow_right_rotation_angle: number;


}): any {
     throw new Error('Function not implemented.');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleAdjustment(arg0: any) {
     throw new Error('Function not implemented.');
}

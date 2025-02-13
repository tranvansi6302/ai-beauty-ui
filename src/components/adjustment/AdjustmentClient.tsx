/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { debounce } from 'lodash';
import { ArrowLeft, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { eyebrow_left_path_1 } from './base64_eyebrow_left_1';
import { Controls } from './Controls';
import { ImageComparison } from './ImageComparison';
import { Resizer } from './Resizer';
import { ToolBar } from './ToolBar';
import { AdjustmentData, MAKEUP_MAP } from './types';
import { eyebrowData } from './data';

export const AdjustmentClient = () => {
     const router = useRouter();
     const [image, setImage] = useState<string | null>(null);
     const [cleanedImage, setCleanedImage] = useState<string>('');
     const [selectedMakeup, setSelectedMakeup] = useState<string[]>([]);

     // Định nghĩa controls state với kiểu dữ liệu đầy đủ
     type ControlsType = {
          definition: 'SHARPEN' | 'SMOOTH';
          resize_horizontal: number;
          resize_vertical: number;
          resize_position_up: number;
          resize_position_left: number;
          resize_position_right: number;
          rotate_left: number;
          rotate_right: number;
          resize_scale_left: number;
          resize_scale_right: number;
          color_skin: number;
          color_lips_r: number;
          color_lips_g: number;
          color_lips_b: number;
          color_blush_r: number;
          color_blush_g: number;
          color_blush_b: number;
          color_eyebrow: number;
     };

     const [controls, setControls] = useState<ControlsType>({
          // Các giá trị mặc định cho chân mày
          definition: 'SHARPEN',
          resize_horizontal: 50,
          resize_vertical: 90,
          resize_position_up: -40,
          resize_position_left: -35,
          resize_position_right: -35,
          rotate_left: 0,
          rotate_right: 0,
          resize_scale_left: 1.0,
          resize_scale_right: 1.0,

          // Các giá trị mặc định cho trang điểm
          color_skin: 0.75,
          color_lips_r: 174,
          color_lips_g: 86,
          color_lips_b: 84,
          color_blush_r: 174,
          color_blush_g: 86,
          color_blush_b: 84,
          color_eyebrow: 1,
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
     const [imageHeight, setImageHeight] = useState<number>(0);

     const previousRequest = useRef<AbortController | null>(null);
     const [isPickingColor, setIsPickingColor] = useState(false);

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
                         'https://external.365sharing.org/ai-beauty/adjust',
                         {
                              method: 'POST',
                              headers: {
                                   'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                   input_image_path: cleanedImage,
                                   patch_path: '',
                                   eyebrow_left_path: data.eyebrow_left_path,
                                   eyebrow_right_path: data.eyebrow_right_path,
                                   output_image_path:
                                        'data/output_images/portrait_new_eyebrows',
                                   apply_makeup: data.apply_makeup,
                                   features: data.features,
                                   show_landmarks: data.show_landmarks,
                                   remove_eyebrows: data.remove_eyebrows,
                                   anchor: 'center',
                                   definition: data.definition,
                                   resize_horizontal: data.resize_horizontal,
                                   resize_vertical: data.resize_vertical,
                                   resize_position_up: data.resize_position_up,
                                   resize_position_left:
                                        data.resize_position_left,
                                   resize_position_right:
                                        data.resize_position_right,
                                   rotate_left: data.rotate_left,
                                   rotate_right: data.rotate_right,
                                   resize_scale_left:
                                        controls.resize_scale_left,
                                   resize_scale_right:
                                        controls.resize_scale_right,
                                   color_skin: controls.color_skin,
                                   color_lips: [
                                        controls.color_lips_r,
                                        controls.color_lips_g,
                                        controls.color_lips_b,
                                   ],
                                   color_blush: [
                                        controls.color_blush_r,
                                        controls.color_blush_g,
                                        controls.color_blush_b,
                                   ],
                                   color_eyebrow: controls.color_eyebrow,
                              }),
                              signal: controller.signal,
                         }
                    );

                    if (!response.ok) {
                         throw new Error('Network response was not ok');
                    }

                    const result = await response.json();
                    if (result.output_image_path) {
                         setOutputImage(
                              `data:image/jpeg;base64,${result.output_image_path}`
                         );
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
          const initialImage = localStorage.getItem('selectedImage');
          if (!initialImage) {
               router.push('/workplace');
               return;
          }

          setImage(initialImage);
          const cleaned = initialImage.replace(
               /^data:image\/[a-z]+;base64,/,
               ''
          );
          setCleanedImage(cleaned);

          const initialData: AdjustmentData = {
               input_image_path: cleaned,
               output_image_path: 'data/output_images/portrait_new_eyebrows',
               patch_path: '',
               features: [], // Mảng rỗng vì chưa chọn trang điểm nào
               show_landmarks: false,
               color_lips: [174, 86, 84], // Giá trị mặc định cho màu môi
               color_skin: 0.75, // Giá trị mặc định cho màu da
               color_blush: [174, 86, 84], // Giá trị mặc định cho má hồng
               eyebrow_left_path: eyebrow_left_path_1,
               eyebrow_right_path: '',
               remove_eyebrows: false,
               apply_makeup: false,
               resize_scale_left: 1.0,
               resize_scale_right: 1.0,
               anchor: 'center',
               definition: 'SHARPEN',
               resize_horizontal: 50,
               resize_vertical: 90,
               resize_position_up: -40,
               resize_position_left: -35,
               resize_position_right: -35,
               rotate_left: 0,
               rotate_right: 0,
          };

          callAdjustmentAPI(initialData);
     }, [router, showLandmarks, removeEyebrows, callAdjustmentAPI]);

     useEffect(() => {
          if (!isDragging && !isPickingColor && cleanedImage) {
               const features = [];
               if (selectedMakeup.includes('Môi')) features.push('lips');
               if (selectedMakeup.includes('Da')) features.push('skin');
               if (selectedMakeup.includes('Má')) features.push('blush');

               const adjustmentData: AdjustmentData = {
                    input_image_path: cleanedImage,
                    patch_path: '',
                    eyebrow_left_path: selectedEyebrow,
                    eyebrow_right_path: '',
                    output_image_path:
                         'data/output_images/portrait_new_eyebrows',
                    apply_makeup: selectedMakeup.length > 0,
                    features: features,
                    show_landmarks: showLandmarks,
                    remove_eyebrows: removeEyebrows,
                    anchor: 'center',
                    definition: controls.definition || 'SHARPEN',
                    resize_horizontal: controls.resize_horizontal || 0,
                    resize_vertical: controls.resize_vertical || 0,
                    resize_position_up: controls.resize_position_up || 0,
                    resize_position_left: controls.resize_position_left || 0,
                    resize_position_right: controls.resize_position_right || 0,
                    rotate_left: controls.rotate_left || 0,
                    rotate_right: controls.rotate_right || 0,
                    resize_scale_left: controls.resize_scale_left || 1.0,
                    resize_scale_right: controls.resize_scale_right || 1.0,
                    color_skin: controls.color_skin || 0.75,
                    color_lips: [
                         controls.color_lips_r || 174,
                         controls.color_lips_g || 86,
                         controls.color_lips_b || 84,
                    ],
                    color_blush: [
                         controls.color_blush_r || 174,
                         controls.color_blush_g || 86,
                         controls.color_blush_b || 84,
                    ],
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
               resize_position_right: -60,
               rotate_left: 0,
               rotate_right: 0,
               resize_scale_left: 1.0,
               resize_scale_right: 1.0,
               color_skin: 0.75,
               color_lips_r: 174,
               color_lips_g: 86,
               color_lips_b: 84,
               color_blush_r: 174,
               color_blush_g: 86,
               color_blush_b: 84,
               color_eyebrow: 1,
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

     const handleResize = useCallback((newWidth: number) => {
          setLeftWidth(newWidth);
     }, []);

     const handleEyebrowChange = useCallback(
          (path: string) => {
               setSelectedEyebrow(path);

               if (cleanedImage) {
                    const adjustmentData: AdjustmentData = {
                         input_image_path: cleanedImage,
                         patch_path: '',
                         eyebrow_left_path: path,
                         eyebrow_right_path: '',
                         output_image_path:
                              'data/output_images/portrait_new_eyebrows',
                         apply_makeup: selectedMakeup.length > 0,
                         features: selectedMakeup.map(
                              (option) =>
                                   MAKEUP_MAP[option as keyof typeof MAKEUP_MAP]
                         ),
                         show_landmarks: showLandmarks,
                         remove_eyebrows: removeEyebrows,
                         anchor: 'center',
                         definition: controls.definition || 'SHARPEN',
                         resize_horizontal: controls.resize_horizontal || 0,
                         resize_vertical: controls.resize_vertical || 0,
                         resize_position_up: controls.resize_position_up || 0,
                         resize_position_left:
                              controls.resize_position_left || 0,
                         resize_position_right:
                              controls.resize_position_right || 0,
                         rotate_left: controls.rotate_left || 0,
                         rotate_right: controls.rotate_right || 0,
                         resize_scale_left: controls.resize_scale_left || 1.0,
                         resize_scale_right: controls.resize_scale_right || 1.0,
                         color_skin: controls.color_skin || 0.75,
                         color_lips: [
                              controls.color_lips_r || 174,
                              controls.color_lips_g || 86,
                              controls.color_lips_b || 84,
                         ],
                         color_blush: [
                              controls.color_blush_r || 174,
                              controls.color_blush_g || 86,
                              controls.color_blush_b || 84,
                         ],
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

     // Theo dõi height của image
     useEffect(() => {
          const updateHeight = () => {
               if (imageRef.current) {
                    const newHeight = imageRef.current.offsetHeight;
                    setImageHeight(newHeight);
               }
          };

          // Thêm một chút delay để đảm bảo DOM đã được cập nhật
          const timeoutId = setTimeout(updateHeight, 100);

          // Theo dõi sự thay đổi của resize và image
          const observer = new ResizeObserver(updateHeight);
          if (imageRef.current) {
               observer.observe(imageRef.current);
          }

          window.addEventListener('resize', updateHeight);

          return () => {
               clearTimeout(timeoutId);
               observer.disconnect();
               window.removeEventListener('resize', updateHeight);
          };
     }, [image, leftWidth]); // Thêm dependencies

     // if (!image) return null;

     const toolbarProps = {
          isComparing,
          isGrabbing,
          onCompareToggle: () => setIsComparing(!isComparing),
          onZoomIn: handleZoomIn,
          onZoomOut: handleZoomOut,
          onGrabToggle: () => setIsGrabbing(!isGrabbing),
          onReset: handleReset,
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
               {/* Mobile Layout */}
               <div className="md:hidden">
                    <div className="fixed inset-x-0 top-0">
                         <div className="flex items-start">
                              {/* Toolbar bên trái */}
                              <div className="fixed left-4 top-4 z-50">
                                   <div className="opacity-60 transition-opacity hover:opacity-100">
                                        <ToolBar {...toolbarProps} />
                                   </div>
                              </div>

                              {/* Icon cài đặt bên phải */}
                              <div className="fixed right-4 top-4 z-50">
                                   <div className="opacity-60 transition-opacity hover:opacity-100">
                                        <button
                                             onClick={() =>
                                                  setIsMobileControlsOpen(
                                                       !isMobileControlsOpen
                                                  )
                                             }
                                             className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm"
                                        >
                                             <Settings2 className="h-5 w-5 text-white" />
                                        </button>
                                   </div>
                              </div>

                              {/* Full width image container */}
                              <div className="h-screen w-screen">
                                   {image ? (
                                        <div className="relative h-full w-full">
                                             <ImageComparison
                                                  {...imageComparisonProps}
                                             />
                                        </div>
                                   ) : (
                                        <div className="relative h-full w-full bg-gray-300">
                                             <svg
                                                  className="h-10 w-10 text-gray-200 dark:text-gray-600"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="currentColor"
                                                  viewBox="0 0 20 18"
                                             >
                                                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                             </svg>
                                        </div>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>

               {/* Desktop Layout - giữ nguyên như cũ */}
               <div className="hidden md:block">
                    <div
                         id="adjustment-container"
                         className="flex flex-row items-stretch"
                    >
                         <div
                              style={{ width: `${leftWidth}%` }}
                              className="w-full transition-all duration-300 ease-in-out"
                         >
                              <div className="flex items-start gap-4">
                                   <div className="flex-shrink-0">
                                        <ToolBar {...toolbarProps} />
                                   </div>

                                   <div className="w-full" ref={imageRef}>
                                        {image ? (
                                             <div className="relative w-full overflow-hidden rounded-2xl">
                                                  <div className="relative aspect-square w-full">
                                                       <ImageComparison
                                                            {...imageComparisonProps}
                                                       />
                                                  </div>
                                             </div>
                                        ) : (
                                             <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-300">
                                                  <svg
                                                       className="h-10 w-10 text-gray-200 dark:text-gray-600"
                                                       aria-hidden="true"
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       fill="currentColor"
                                                       viewBox="0 0 20 18"
                                                  >
                                                       <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                                  </svg>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         </div>

                         <div className="hidden md:block">
                              <Resizer onResize={handleResize} />
                         </div>

                         <div
                              style={{ width: `${100 - leftWidth}%` }}
                              className="hidden w-full transition-all duration-300 ease-in-out md:block"
                         >
                              <div
                                   className="overflow-y-auto"
                                   style={{
                                        maxHeight: imageHeight
                                             ? `${imageHeight}px`
                                             : 'auto',
                                   }}
                              >
                                   <Controls
                                        showLandmarks={showLandmarks}
                                        removeEyebrows={removeEyebrows}
                                        selectedMakeup={selectedMakeup}
                                        controls={{
                                             definition: controls.definition,
                                             resize_horizontal:
                                                  controls.resize_horizontal,
                                             resize_vertical:
                                                  controls.resize_vertical,
                                             resize_position_up:
                                                  controls.resize_position_up,
                                             resize_position_left:
                                                  controls.resize_position_left,
                                             resize_position_right:
                                                  controls.resize_position_right,
                                             rotate_left: controls.rotate_left,
                                             rotate_right:
                                                  controls.rotate_right,
                                             color_lips_r:
                                                  controls.color_lips_r,
                                             color_lips_g:
                                                  controls.color_lips_g,
                                             color_lips_b:
                                                  controls.color_lips_b,
                                             color_blush_r:
                                                  controls.color_blush_r,
                                             color_blush_g:
                                                  controls.color_blush_g,
                                             color_blush_b:
                                                  controls.color_blush_b,
                                             color_skin: controls.color_skin,
                                             color_eyebrow:
                                                  controls.color_eyebrow,
                                        }}
                                        onLandmarksChange={setShowLandmarks}
                                        onEyebrowsChange={setRemoveEyebrows}
                                        onMakeupToggle={onMakeupToggle}
                                        onControlChange={onControlChange}
                                        onDragStart={() => setIsDragging(true)}
                                        onDragEnd={onDragEnd}
                                        isMobileControlsOpen={false}
                                        onMobileControlsClose={() => {}}
                                        onColorPickerDragStart={() =>
                                             setIsPickingColor(true)
                                        }
                                        onColorPickerDragEnd={() =>
                                             setIsPickingColor(false)
                                        }
                                        selectedEyebrow={selectedEyebrow}
                                        onEyebrowChange={handleEyebrowChange}
                                        activeColor={activeColor}
                                        onReset={handleReset}
                                        onColorSelect={(
                                             type: 'lips' | 'blush',
                                             color: {
                                                  r: number;
                                                  g: number;
                                                  b: number;
                                             }
                                        ) =>
                                             setActiveColor({
                                                  type,
                                                  color,
                                             })
                                        }
                                   />
                              </div>
                         </div>
                    </div>
               </div>

               {/* Mobile Controls Overlay */}
               <div className="pointer-events-none fixed inset-0 z-50 md:hidden">
                    <div
                         className={`pointer-events-auto absolute bottom-0 right-0 top-0 w-[95%] max-w-[500px] transform transition-transform duration-300 ease-in-out ${
                              isMobileControlsOpen
                                   ? 'translate-x-0'
                                   : 'translate-x-full'
                         }`}
                    >
                         <Controls
                              showLandmarks={showLandmarks}
                              removeEyebrows={removeEyebrows}
                              selectedMakeup={selectedMakeup}
                              onReset={handleReset}
                              controls={{
                                   definition: controls.definition,
                                   resize_horizontal:
                                        controls.resize_horizontal,
                                   resize_vertical: controls.resize_vertical,
                                   resize_position_up:
                                        controls.resize_position_up,
                                   resize_position_left:
                                        controls.resize_position_left,
                                   resize_position_right:
                                        controls.resize_position_right,
                                   rotate_left: controls.rotate_left,
                                   rotate_right: controls.rotate_right,
                                   color_lips_r: controls.color_lips_r,
                                   color_lips_g: controls.color_lips_g,
                                   color_lips_b: controls.color_lips_b,
                                   color_blush_r: controls.color_blush_r,
                                   color_blush_g: controls.color_blush_g,
                                   color_blush_b: controls.color_blush_b,
                                   color_skin: controls.color_skin,
                                   color_eyebrow: controls.color_eyebrow,
                              }}
                              onLandmarksChange={setShowLandmarks}
                              onEyebrowsChange={setRemoveEyebrows}
                              onMakeupToggle={onMakeupToggle}
                              onControlChange={onControlChange}
                              onDragStart={() => setIsDragging(true)}
                              onDragEnd={onDragEnd}
                              isMobileControlsOpen={isMobileControlsOpen}
                              onMobileControlsClose={() =>
                                   setIsMobileControlsOpen(false)
                              }
                              onColorPickerDragStart={() =>
                                   setIsPickingColor(true)
                              }
                              onColorPickerDragEnd={() =>
                                   setIsPickingColor(false)
                              }
                              selectedEyebrow={selectedEyebrow}
                              onEyebrowChange={handleEyebrowChange}
                              activeColor={activeColor}
                              onColorSelect={(
                                   type: 'lips' | 'blush',
                                   color: { r: number; g: number; b: number }
                              ) =>
                                   setActiveColor({
                                        type,
                                        color,
                                   })
                              }
                         />
                    </div>
               </div>
          </div>
     );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAdjustmentData(_tempControls: {
     definition: 'SHARPEN' | 'SMOOTH';
     resize_horizontal: number;
     resize_vertical: number;
     resize_position_up: number;
     resize_position_left: number;
     resize_position_right: number;
     rotate_left: number;
     rotate_right: number;
     resize_scale_left: number;
     resize_scale_right: number;
     color_skin: number;
     color_lips_r: number;
     color_lips_g: number;
     color_lips_b: number;
     color_blush_r: number;
     color_blush_g: number;
     color_blush_b: number;
     color_eyebrow: number;
}): any {
     throw new Error('Function not implemented.');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleAdjustment(arg0: any) {
     throw new Error('Function not implemented.');
}

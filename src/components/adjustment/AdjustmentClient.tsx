"use client";
import { debounce } from "lodash";
import { ArrowLeft, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controls } from "./Controls";
import { ImageComparison } from "./ImageComparison";
import { ToolBar } from "./ToolBar";
import { AdjustmentData, MAKEUP_MAP, SLIDER_CONFIGS } from "./types";
import Link from "next/link";

export const AdjustmentClient = () => {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [cleanedImage, setCleanedImage] = useState<string>("");
  const [selectedMakeup, setSelectedMakeup] = useState<string[]>([]);
  const [controls, setControls] = useState(
    Object.fromEntries(SLIDER_CONFIGS.map(({ name }) => [name, 0]))
  );
  const [removeEyebrows, setRemoveEyebrows] = useState(false);
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

  const callAdjustmentAPI = useCallback(async (data: AdjustmentData) => {
    if (!cleanedImage) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://external.365sharing.org/ai-beauty/adjust",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_image_path: cleanedImage,
            patch_path: "",
            eyebrow_left_path: "",
            eyebrow_right_path: "",
            output_image_path: "data/output_images/portrait_new_eyebrows",
            apply_makeup: data.apply_makeup,
            coefficient: data.coefficient,
            remove_eyebrows: data.remove_eyebrows,
            features: data.features,
            show_landmarks: data.show_landmarks,
            definition: data.definition,
            resize_horizontal: data.resize_horizontal,
            resize_vertical: data.resize_vertical,
            resize_position_up: data.resize_position_up,
            resize_position_left: data.resize_position_left,
            resize_position_right: data.resize_position_right,
            rotate_left: data.rotate_left,
            rotate_right: data.rotate_right,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.output_image_path) {
        setOutputImage(`data:image/jpeg;base64,${result.output_image_path}`);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [cleanedImage]);

  useEffect(() => {
    const initialImage = localStorage.getItem("selectedImage");
    if (!initialImage) {
      router.push("/workplace");
      return;
    }

    setImage(initialImage);
    const cleaned = initialImage.replace(/^data:image\/[a-z]+;base64,/, "");
    setCleanedImage(cleaned);

    const initialData: AdjustmentData = {
      features: {},
      coefficient,
      show_landmarks: showLandmarks,
      remove_eyebrows: removeEyebrows,
      definition: 0,
      resize_horizontal: 0,
      resize_vertical: 0,
      resize_position_up: 0,
      resize_position_left: 0,
      resize_position_right: 0,
      rotate_left: 0,
      rotate_right: 0,
      apply_makeup: false,
    };
    
    callAdjustmentAPI(initialData);
  }, [router, coefficient, showLandmarks, removeEyebrows, callAdjustmentAPI]);

  useEffect(() => {
    if (!isDragging && cleanedImage) {
      const adjustmentData: AdjustmentData = {
        features: selectedMakeup
          .map((option) => MAKEUP_MAP[option as keyof typeof MAKEUP_MAP])
          .reduce((acc, feature) => ({ ...acc, [feature]: coefficient }), {} as { [key: string]: number }),
        coefficient,
        show_landmarks: showLandmarks,
        remove_eyebrows: removeEyebrows,
        apply_makeup: selectedMakeup.length > 0,
        definition: controls.definition || 0,
        resize_horizontal: controls.resize_horizontal || 0,
        resize_vertical: controls.resize_vertical || 0,
        resize_position_up: controls.resize_position_up || 0,
        resize_position_left: controls.resize_position_left || 0,
        resize_position_right: controls.resize_position_right || 0,
        rotate_left: controls.rotate_left || 0,
        rotate_right: controls.rotate_right || 0,
      };

      const debouncedCall = debounce(() => {
        callAdjustmentAPI(adjustmentData);
      }, 300);

      debouncedCall();

      return () => {
        debouncedCall.cancel();
      };
    }
  }, [
    selectedMakeup,
    showLandmarks,
    removeEyebrows,
    controls,
    isDragging,
    coefficient,
    cleanedImage,
    callAdjustmentAPI,
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
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1 && isGrabbing) {
      setIsDraggingImage(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  }, [scale, isGrabbing, position.x, position.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDraggingImage) {
      const maxOffset = (scale - 1) * 200;
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      setPosition({
        x: Math.max(-maxOffset, Math.min(maxOffset, newX)),
        y: Math.max(-maxOffset, Math.min(maxOffset, newY)),
      });
    }
  }, [isDraggingImage, scale, dragStart.x, dragStart.y]);

  const handleMouseUp = useCallback(() => {
    setIsDraggingImage(false);
  }, []);

  const handleDownload = useCallback(async () => {
    try {
      if (!outputImage) return;

      const link = document.createElement("a");
      link.href = outputImage;
      link.download = "adjusted-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
    }
  }, [outputImage]);

  const handleCompareMove = useCallback((newPosition: number) => {
    setComparePosition(newPosition);
  }, []);

  // if (!image) return null;

  return (
    <div className="max-w-[1300px] mx-auto px-4 py-8 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[500px,1fr] gap-6">
        <div className="w-full">
          <div className=" mb-4 md:mb-0 flex items-center justify-between mt-2">
            <button
              onClick={() => router.push("/workplace")}
              className="md:hidden flex items-center gap-2 py-2 text-gray-700 hover:text-gray-900 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Quay lại</span>
            </button>
            <div className="flex items-center mb-6 text-[14px] md:block hidden">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Trang chủ
        </Link>
        <span className="mx-2 text-gray-400">›</span>
        <Link  href="/workplace" className="text-gray-500 hover:text-gray-700">Không gian của tôi</Link>
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-gray-900">Điều chỉnh</span>
      </div>

            <button
              onClick={() => setIsMobileControlsOpen(true)}
              className="md:hidden flex items-center gap-2 py-2 text-gray-700 hover:text-gray-900 transition-all"
            >
              <WandSparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Điều chỉnh</span>
            </button>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <ToolBar
                isComparing={isComparing}
                isGrabbing={isGrabbing}
                onCompareToggle={() => setIsComparing(!isComparing)}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onGrabToggle={() => setIsGrabbing(!isGrabbing)}
                onReset={handleReset}
                onDownload={handleDownload}
              />
            </div>

            <div className="flex-1 md:w-[450px] md:flex-none">
              {image ? ( <ImageComparison
                originalImage={image}
                outputImage={outputImage}
                scale={scale}
                position={position}
                isGrabbing={isGrabbing}
                isDraggingImage={isDraggingImage}
                isComparing={isComparing}
                comparePosition={comparePosition}
                onCompareMove={handleCompareMove}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                isLoading={isLoading}
              />) : (
              
                <div className="h-full w-full flex items-center justify-center md:h-[450px] bg-gray-300 aspect-square relative rounded-2xl overflow-hidden">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              

              )}
            </div>
          </div>
        </div>

        <Controls
          showLandmarks={showLandmarks}
          removeEyebrows={removeEyebrows}
          selectedMakeup={selectedMakeup}
          controls={controls}
          onLandmarksChange={setShowLandmarks}
          onEyebrowsChange={setRemoveEyebrows}
          onMakeupToggle={(option) =>
            setSelectedMakeup((prev) =>
              prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
            )
          }
          onControlChange={(name, value) =>
            setControls((prev) => ({ ...prev, [name]: value }))
          }
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          isMobileControlsOpen={isMobileControlsOpen}
          onMobileControlsClose={() => setIsMobileControlsOpen(false)}
        />
      </div>
    </div>
  );
}; 
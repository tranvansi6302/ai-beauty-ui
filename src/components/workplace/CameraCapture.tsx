"use client";
import { Camera, X, Check, Wand } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";

interface CameraCaptureProps {
  selectedImage: string | null;
  currentStep: number;
  onImageSelect: (image: string | null) => void;
  onNextStep: () => void;
  setCurrentStep: (step: 1 | 2 | 3) => void;
  setError: (error: string | null) => void;
}

export const CameraCapture = ({
  selectedImage,
  currentStep,
  onImageSelect,
  onNextStep,
  setCurrentStep,
  setError,
}: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCapture = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setError(null);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError(
        "Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera của trình duyệt."
      );
    }
  };

  const stopCapture = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg", 0.8);
        onImageSelect(imageData);
      }
      stopCapture();
    }
  };

  useEffect(() => {
    startCapture();
    return () => {
      stopCapture();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden">
      {selectedImage ? (
        <div className="absolute inset-0">
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
              startCapture();
            }}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onImageSelect(null);
                  setCurrentStep(1);
                  startCapture();
                }}
                className="text-[13px] flex-1 py-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                <Camera className="w-4 h-4 mr-2" />
                Chụp lại
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
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <button
              onClick={captureImage}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-all"
            >
              <div className="w-12 h-12 bg-[#ff4081] rounded-full flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}; 
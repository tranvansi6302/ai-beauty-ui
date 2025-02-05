import {
  ArrowRight,
  Camera,
  Check,
  LineChart,
  Mail,
  MessageCircle,
  Scan,
  Wand,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Spacer for fixed header */}
      {/* Spacer for fixed header */}
      <div className="h-[60px]"></div>

      {/* Main Banner - Full width */}
      <div className="">
        <main className="relative">
          <div className="grid-bg absolute inset-0"></div>
          <div className="max-w-[1300px] mx-auto px-4 py-8 md:py-20 text-center relative">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-8 tracking-tight relative z-10 bg-gradient-text">
              Công Nghệ Làm Đẹp Thông Minh AI
            </h1>

            <p className="text-sm sm:text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 md:mb-8 relative z-10 ">
              Khám phá sức mạnh của trí tuệ nhân tạo trong việc chăm sóc sắc
              đẹp. Phân tích làn da chuyên sâu, tư vấn cá nhân hóa và theo dõi
              tiến trình một cách khoa học.
              <br />
              <span className=" block font-semibold mt-4">
                Hành trình làm đẹp hoàn hảo của bạn bắt đầu từ đây
              </span>
              .
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 relative z-10">
              <Link
                href="/workplace"
                className="ai-button text-white w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base"
              >
                Bắt Đầu Ngay
              </Link>
              <button className="bg-white text-gray-800 w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base border border-gray-200 hover:bg-gray-50">
                Tìm hiểu thêm
              </button>
            </div>

            <div className="flex justify-center items-center text-gray-600 relative z-10 text-sm md:text-base">
              <span className="ml-2">
                ❤️ Trợ lý làm đẹp AI được chị em yêu thích, giúp bạn tự tin tỏa
                sáng mỗi ngày!
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Content sections with 1300px max-width */}
      <div className="max-w-[1300px] mx-auto px-4">
        {/* AI Features Section */}
        <section className="py-12 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-72 h-72  blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72  blur-3xl"></div>
          </div>

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 px-4">
              Trải Nghiệm Làm Đẹp Thông Minh
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-12 px-4">
              Khám phá công nghệ AI tiên tiến trong chăm sóc sắc đẹp
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4">
              <Link
                href="/adjustment"
                className="feature-card   backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col h-full"
              >
                <div>
                  <div className="icon-wrapper w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-4">
                    <Scan className="w-6 h-6 text-[#ff4081]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Phân Tích Da Thông Minh
                  </h3>
                  <p className="text-gray-600 mb-4 text-[14px]">
                    Công nghệ AI phân tích chi tiết làn da, nhận diện các vấn đề
                    và đề xuất phương pháp điều trị phù hợp.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <p className="animated-border group text-[14px] md:px-4 py-2 rounded-lg inline-flex items-center text-[#ff4081] font-medium hover:text-white transition-colors">
                    Thử Phân Tích
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>

              <Link
                href="/workplace"
                className="feature-card backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col h-full"
              >
                <div>
                  <div className="icon-wrapper w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
                    <Wand className="w-6 h-6 text-[#8247e5]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Thử Nghiệm Ảo</h3>
                  <p className="text-gray-600 mb-4 text-[14px]">
                    Dễ dàng thử nghiệm các sản phẩm và phương pháp làm đẹp trước
                    khi quyết định.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <p className="animated-border text-[14px] group md:px-4 py-2 rounded-lg inline-flex items-center text-[#8247e5] font-medium hover:text-white transition-colors">
                    Thử Trang Điểm
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>

              <Link
                href="/adjustment"
                className="feature-card backdrop-blur-sm p-6 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col h-full"
              >
                <div>
                  <div className="icon-wrapper w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-4">
                    <LineChart className="w-6 h-6 text-[#ff4081]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    Theo Dõi Tiến Trình
                  </h3>
                  <p className="text-gray-600 mb-4 text-[14px]">
                    Giám sát sự cải thiện của làn da theo thời gian với công
                    nghệ AI tiên tiến.
                  </p>
                </div>
                <div className="mt-auto pt-4">
                  <p className="animated-border text-[14px] group md:px-4 py-2 rounded-lg inline-flex items-center text-[#ff4081] font-medium hover:text-white transition-colors">
                    Theo Dõi Tiến Trình
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative">
          <div className="flex justify-center mb-8 md:mb-16">
            <svg
              fill="none"
              height="110"
              viewBox="0 0 800 110"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
              role="separator"
            >
              <path
                d="M0 30H800"
                opacity="0.12"
                stroke="url(#paint0_linear_52_11950)"
                strokeDasharray="2 2"
              />
              <path
                d="M0 78H800"
                opacity="0.12"
                stroke="url(#paint1_linear_52_11950)"
                strokeDasharray="2 2"
              />
              <path
                d="M76 106L76 4"
                opacity="0.12"
                stroke="url(#paint2_linear_52_11950)"
                strokeDasharray="2 2"
              />
              <path
                d="M88 30C88 27.6266 87.2962 25.3065 85.9776 23.3332C84.6591 21.3598 82.7849 19.8217 80.5922 18.9134C78.3995 18.0052 75.9867 17.7676 73.6589 18.2306C71.3311 18.6936 69.1929 19.8365 67.5147 21.5147C65.8365 23.1929 64.6936 25.3311 64.2306 27.6589C63.7676 29.9867 64.0052 32.3995 64.9134 34.5922C65.8217 36.7849 67.3598 38.6591 69.3332 39.9776C71.3065 41.2962 73.6266 42 76 42"
                opacity="0.12"
                stroke="url(#paint3_angular_52_11950)"
                strokeDasharray="2 2"
              />
              <path
                d="M400 106L400 4"
                opacity="0.12"
                stroke="url(#paint4_linear_52_11950)"
                strokeDasharray="2 2"
              />
              <path
                d="M724 110L724 -3.27826e-07"
                opacity="0.12"
                stroke="url(#paint5_linear_52_11950)"
                strokeDasharray="2 2"
              />
              <path
                d="M712 78C712 80.3734 712.704 82.6935 714.022 84.6668C715.341 86.6402 717.215 88.1783 719.408 89.0866C721.601 89.9948 724.013 90.2324 726.341 89.7694C728.669 89.3064 730.807 88.1635 732.485 86.4853C734.164 84.8071 735.306 82.6689 735.769 80.3411C736.232 78.0133 735.995 75.6005 735.087 73.4078C734.178 71.2151 732.64 69.3409 730.667 68.0224C728.693 66.7038 726.373 66 724 66"
                opacity="0.12"
                stroke="url(#paint6_angular_52_11950)"
                strokeDasharray="2 2"
              />
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_52_11950"
                  x1="0"
                  x2="800"
                  y1="30"
                  y2="30"
                >
                  <stop stopOpacity="0" />
                  <stop offset="0.0328358" />
                  <stop offset="0.692529" />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint1_linear_52_11950"
                  x1="0"
                  x2="800"
                  y1="78"
                  y2="78"
                >
                  <stop stopOpacity="0" />
                  <stop offset="0.115" />
                  <stop offset="0.893678" />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint2_linear_52_11950"
                  x1="76"
                  x2="76"
                  y1="106"
                  y2="3.99999"
                >
                  <stop stopOpacity="0" />
                  <stop offset="0.333333" />
                  <stop offset="0.666667" />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <radialGradient
                  cx="0"
                  cy="0"
                  gradientTransform="translate(76 30) rotate(90) scale(12)"
                  gradientUnits="userSpaceOnUse"
                  id="paint3_angular_52_11950"
                  r="1"
                >
                  <stop />
                  <stop offset="0.5" stopOpacity="0.34" />
                  <stop offset="1" />
                </radialGradient>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint4_linear_52_11950"
                  x1="400"
                  x2="400"
                  y1="106"
                  y2="3.99999"
                >
                  <stop stopOpacity="0" />
                  <stop offset="0.333333" />
                  <stop offset="0.666667" />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint5_linear_52_11950"
                  x1="724"
                  x2="724"
                  y1="110"
                  y2="-6.55651e-06"
                >
                  <stop stopOpacity="0" />
                  <stop offset="0.333333" />
                  <stop offset="0.666667" />
                  <stop offset="1" stopOpacity="0" />
                </linearGradient>
                <radialGradient
                  cx="0"
                  cy="0"
                  gradientTransform="translate(724 78) rotate(-90) scale(12)"
                  gradientUnits="userSpaceOnUse"
                  id="paint6_angular_52_11950"
                  r="1"
                >
                  <stop />
                  <stop offset="0.5" stopOpacity="0.34" />
                  <stop offset="1" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 px-4">
              Hành Trình Làm Đẹp Cùng AI
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-16 px-4">
              Bốn bước đơn giản để bắt đầu trải nghiệm
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 px-4">
              <div className="step-card group">
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-7 h-7 text-[#ff4081]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Chụp Ảnh</h3>
                  <p className="text-gray-600 text-sm">
                    Tải lên ảnh selfie để phân tích
                  </p>
                </div>
              </div>

              <div className="step-card group">
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Scan className="w-7 h-7 text-[#8247e5]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Phân Tích AI</h3>
                  <p className="text-gray-600 text-sm">
                    Nhận phân tích da chi tiết
                  </p>
                </div>
              </div>

              <div className="step-card group">
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-14 h-14 bg-pink-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Wand className="w-7 h-7 text-[#ff4081]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Nhận Kế Hoạch</h3>
                  <p className="text-gray-600 text-sm">
                    Nhận đề xuất làm đẹp phù hợp
                  </p>
                </div>
              </div>

              <div className="step-card group">
                <div className="p-4 sm:p-6 text-center">
                  <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <LineChart className="w-7 h-7 text-[#8247e5]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Theo Dõi Kết Quả
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Giám sát tiến trình của bạn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="max-w-[1300px] mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">
              Gói Dịch Vụ
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
              Lựa chọn gói phù hợp với nhu cầu của bạn
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Free Plan */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:border-[#ff4081] transition-colors flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Miễn Phí</h3>
                  <div className="mt-2 text-3xl font-bold">
                    0đ<span className="text-base text-gray-500">/tháng</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow text-[14px]">
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>1 lần tư vấn AI mỗi tháng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Truy cập tính năng giới hạn</span>
                  </li>
                </ul>
                <button className="w-full text-[14px] py-3 rounded-lg border-2 border-[#ff4081] text-[#ff4081] hover:bg-[#ff4081] hover:text-white transition-colors mt-auto">
                  Dùng Thử Miễn Phí
                </button>
              </div>

              {/* Basic Plan */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border-2 border-[#ff4081] shadow-lg relative flex flex-col">
                <div className="absolute top-0 right-0 bg-[#ff4081] text-white text-sm px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Phổ Biến
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Cơ Bản</h3>
                  <div className="mt-2 text-3xl font-bold">
                    199K
                    <span className="text-base text-gray-500">/tháng</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow text-[14px]">
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Tất cả tính năng của gói Miễn phí</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Phân tích da nâng cao</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>5 lần tư vấn AI mỗi tháng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Theo dõi tiến trình cơ bản</span>
                  </li>
                </ul>
                <button className="w-full text-[14px] py-3 rounded-lg bg-[#ff4081] text-white hover:bg-[#ff4081]/90 transition-colors mt-auto">
                  Dùng Thử 7 Ngày
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 hover:border-[#ff4081] transition-colors flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold">Cao Cấp</h3>
                  <div className="mt-2 text-3xl font-bold">
                    399K
                    <span className="text-base text-gray-500">/tháng</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow text-[14px]">
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Tất cả tính năng của gói Cơ bản</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Không giới hạn tư vấn AI</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Hỗ trợ ưu tiên 24/7</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-[#ff4081] mr-3 flex-shrink-0" />
                    <span>Theo dõi tiến trình nâng cao</span>
                  </li>
                </ul>
                <button className="w-full text-[14px] py-3 rounded-lg border-2 border-[#ff4081] text-[#ff4081] hover:bg-[#ff4081] hover:text-white transition-colors mt-auto">
                  Nâng Cấp Premium
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section - Full width */}
      <div className="bg-white">
        <section className="py-12 md:py-20">
          <div className="max-w-[1300px] mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">
              Giải Đáp Thắc Mắc
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto mb-8 md:mb-12">
              Những câu hỏi thường gặp về nền tảng làm đẹp AI của chúng tôi
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">
                    AI phân tích da hoạt động như thế nào?
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    Công nghệ AI của chúng tôi sử dụng computer vision tiên tiến
                    để phân tích tình trạng da, nhận diện các vấn đề và đề xuất
                    phương pháp điều trị dựa trên hàng triệu dữ liệu.
                  </p>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">
                    Dữ liệu của tôi có an toàn không?
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    Có, chúng tôi sử dụng mã hóa cấp doanh nghiệp và tuân thủ
                    nghiêm ngặt các quy định về bảo mật. Dữ liệu của bạn không
                    bao giờ được chia sẻ khi chưa có sự đồng ý.
                  </p>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">
                    Tôi có thể hủy đăng ký không?
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    Có, bạn có thể hủy đăng ký bất cứ lúc nào. Không có hợp đồng
                    dài hạn, không có phí ẩn.
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">
                    Thiết bị nào được hỗ trợ?
                  </h3>
                  <p className="text-gray-600 text-[14px] ">
                    Nền tảng của chúng tôi hoạt động trên mọi điện thoại thông
                    minh, máy tính bảng hoặc máy tính có camera. Không cần thiết
                    bị đặc biệt.
                  </p>
                </div>
                <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">
                    Nên phân tích bao lâu một lần?
                  </h3>
                  <p className="text-gray-600 text-[14px]">
                    Chúng tôi khuyến nghị phân tích hàng tuần để theo dõi tiến
                    trình hiệu quả. AI sẽ giúp bạn điều chỉnh quy trình dựa trên
                    kết quả.
                  </p>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-3">
                    Bạn còn thắc mắc?
                  </h3>
                  <p className="text-gray-600 mb-4 text-[14px]  ">
                    Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7
                  </p>
                  <div className="flex space-x-4">
                    <button className="text-[13px] whitespace-nowrap flex-1 py-2 md:px-4 rounded-lg md:text-[14px] bg-white border border-gray-200 text-gray-600 hover:border-[#ff4081] hover:text-[#ff4081] transition-colors flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Trò Chuyện Ngay
                    </button>
                    <button className="text-[13px] whitespace-nowrap flex-1 py-2 md:px-4 rounded-lg md:text-[14px] bg-white border border-gray-200 text-gray-600 hover:border-[#ff4081] hover:text-[#ff4081] transition-colors flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Gửi Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

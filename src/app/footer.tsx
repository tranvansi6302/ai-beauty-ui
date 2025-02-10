"use client";
import { Bot, Facebook, Instagram, Twitter } from "lucide-react";
export default function footer() {
  return (
    <footer className="bg-white text-gray-600 pt-12 md:pt-20 pb-8 md:pb-10 border-t border-gray-200">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex items-center mb-6">
              <Bot className="w-8 h-8 text-[#ff4081]" />
              <span className="ml-2 text-xl font-semibold text-pink-500">
                AI Beauty
              </span>
            </div>
            <p className="text-gray-500 text-[14px]">
              Định hình tương lai làm đẹp với trí tuệ nhân tạo
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Dịch Vụ</h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Phân Tích Da
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Thử Nghiệm Ảo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Kế Hoạch Điều Trị
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Theo Dõi Tiến Trình
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Công Ty</h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Tuyển Dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ff4081] transition-colors">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 font-semibold mb-4">
              Kết Nối Với Chúng Tôi
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#ff4081] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#ff4081] transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#ff4081] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-[14px]">
              © 2024 AI Beauty. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-[#ff4081] text-[14px]"
              >
                Chính Sách Bảo Mật
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#ff4081] text-[14px]"
              >
                Điều Khoản Sử Dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

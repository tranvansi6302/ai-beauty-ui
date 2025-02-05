"use client";
import { Bot, Menu, Moon, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add new useEffect to handle body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white
  ${
    isScrolled
      ? "bg-white/20 backdrop-blur-[6px] border-b border-gray-100/20 shadow-sm"
      : "border-b border-gray-100"
  }`}
    >
      <nav className="max-w-[1300px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex">
            <Bot className="w-6 h-6 text-pink-500" />
            <span className="ml-2 font-semibold text-xl text-pink-500">
              AI Beauty
            </span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-[#ff4081] flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Dịch Vụ AI
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#ff4081]">
              Tư Vấn Trực Tuyến
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#ff4081]">
              Bí Quyết Làm Đẹp
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-1.5">
            <input
              type="text"
              placeholder="Tìm kiếm phương pháp..."
              className="bg-transparent outline-none text-sm w-64"
            />
            <div className="flex items-center ml-2 px-1.5 py-0.5 rounded bg-white border border-gray-200">
              <span className="text-xs text-gray-500">Ctrl K</span>
            </div>
          </div>
          {/* Mobile Search Icon */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </button>
          {/* Dark Mode Button - Show on both mobile and desktop */}
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Moon className="w-5 h-5" />
          </button>
          {/* Desktop Login Button */}
          <button className="hidden md:block ai-button text-white px-4 md:px-6 py-2 rounded-lg text-sm font-medium">
            Đăng Nhập
          </button>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Slide from right */}
      <div
        className={`md:hidden fixed inset-0 z-[100] ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        {/* Menu Content */}
        <div
          className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "white", overflowY: "auto" }}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center">
                <Bot className="w-6 h-6 text-pink-500" />
                <span className="ml-2 font-semibold text-lg text-pink-500">
                  AI Beauty
                </span>
              </div>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-[#ff4081] p-3 rounded-lg hover:bg-pink-50/50 transition-all"
              >
                <Sparkles className="w-4 h-4 mr-3" />
                Dịch Vụ AI
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-[#ff4081] p-3 rounded-lg hover:bg-pink-50/50 transition-all"
              >
                Tư Vấn Trực Tuyến
              </a>
              <a
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-[#ff4081] p-3 rounded-lg hover:bg-pink-50/50 transition-all"
              >
                Bí Quyết Làm Đẹp
              </a>
              {/* Mobile Login Button */}
              <button className="ai-button text-white px-4 py-2 rounded-lg text-sm font-medium mt-4">
                Đăng Nhập
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      <div
        className={`fixed inset-0 z-50 ${
          isSearchOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isSearchOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsSearchOpen(false)}
        />
        {/* Search Content */}
        <div
          className={`absolute top-0 left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-out ${
            isSearchOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-[1300px] mx-auto p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Tìm kiếm phương pháp..."
                  className="bg-transparent outline-none text-sm w-full"
                  autoFocus
                />
              </div>
              <button
                className="ml-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="py-2">
              <h3 className="text-sm font-medium text-gray-500 mb-3">
                Tìm Kiếm Phổ Biến
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <a
                  href="#"
                  className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-pink-50 mr-3">
                    <Sparkles className="w-5 h-5 text-[#ff4081]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-[#ff4081] transition-colors">
                      Phân Tích Da AI
                    </h4>
                    <p className="text-sm text-gray-500">
                      Nhận phân tích cá nhân hóa
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

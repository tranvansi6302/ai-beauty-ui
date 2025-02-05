import {
  History,
  LineChart,
  Calendar,
  Target,
  Wand,
  CheckCircle,
  Clock,
  Bell,
  MessageCircle,
  UserCircle,
  FileText,
  Settings,
} from "lucide-react";

export const InfoCards = () => {
  return (
    <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
      <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <History className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Kết Quả Phân Tích</h3>
            <p className="text-sm text-gray-500">Cập nhật 2 giờ trước</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <LineChart className="w-4 h-4 mr-2" />
            <span>Chỉ số da hiện tại</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Lịch sử phân tích</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Target className="w-4 h-4 mr-2" />
            <span>So sánh tiến triển</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Wand className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Đề Xuất Chăm Sóc</h3>
            <p className="text-sm text-gray-500">3 đề xuất mới</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>Sản phẩm phù hợp</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>Quy trình chăm sóc</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Bell className="w-4 h-4 mr-2" />
            <span>Nhắc nhở thời gian</span>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow group">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Tư Vấn & Hỗ Trợ</h3>
            <p className="text-sm text-gray-500">Chuyên gia trực tuyến</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <UserCircle className="w-4 h-4 mr-2" />
            <span>Chat với chuyên gia</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            <span>Báo cáo chi tiết</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Settings className="w-4 h-4 mr-2" />
            <span>Câu hỏi thường gặp</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 
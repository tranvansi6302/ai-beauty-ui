import Image from 'next/image';
import {
     MessageSquare,
     Heart,
     ChevronUp,
     ChevronDown,
     User,
     Share2,
     Bookmark,
     Clock,
     Eye,
     Tag,
     MoreVertical,
     Plus,
     Check,
} from 'lucide-react';

interface PostDetailProps {
     user: {
          name: string;
          avatar: string;
          role: string;
          specialization: string;
          experience: string;
          verified: boolean;
     };
     community: {
          name: string;
          isJoined: boolean;
          memberCount: number;
          description: string;
          rules: string[];
     };
     post: {
          title: string;
          description: string;
          content: string;
          thumbnail: string;
          tags: string[];
          votes: number;
          comments: number;
          reactions: number;
          views: number;
          createdAt: string;
          category: string;
          references?: string[];
     };
}

export default function PostDetail() {
     const postDetail: PostDetailProps = {
          user: {
               name: 'Bác sĩ Nguyễn Văn A',
               avatar: '',
               role: 'Bác sĩ Chuyên khoa',
               specialization: 'Chuyên khoa Nội tổng quát',
               experience: '15 năm kinh nghiệm',
               verified: true,
          },
          community: {
               name: 'Cộng đồng Y khoa',
               isJoined: false,
               memberCount: 12345,
               description: 'Cộng đồng chia sẻ kiến thức y khoa và sức khỏe',
               rules: [
                    'Chia sẻ thông tin chính xác',
                    'Tôn trọng quyền riêng tư',
                    'Không quảng cáo, spam',
               ],
          },
          post: {
               title: '[Thảo luận] Tiêu đề bài viết về sức khỏe',
               description: 'Mô tả tóm tắt về nội dung bài viết...',
               content: 'Nội dung chi tiết của bài viết...',
               thumbnail: '/images/health-post.jpg',
               tags: ['Tag 1', 'Tag 2', 'Tag 3'],
               votes: 10,
               comments: 5,
               reactions: 8,
               views: 234,
               createdAt: '1 giờ trước',
               category: 'Chuyên mục',
               references: ['Nguồn tham khảo 1', 'Nguồn tham khảo 2'],
          },
     };

     return (
          <div className="min-h-screen bg-gray-100 p-4">
               <div className="mx-auto max-w-4xl">
                    {/* Main Content */}
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                         {/* Header */}
                         <div className="mb-6 flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                   <div className="relative h-12 w-12">
                                        {postDetail.user.avatar ? (
                                             <Image
                                                  src={postDetail.user.avatar}
                                                  alt={postDetail.user.name}
                                                  fill
                                                  className="rounded-full object-cover"
                                             />
                                        ) : (
                                             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2dca36]/20 to-[#2dca36]/30">
                                                  <User className="h-6 w-6 text-[#2dca36]" />
                                             </div>
                                        )}
                                        {postDetail.user.verified && (
                                             <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-[#2dca36]">
                                                  <Check className="h-4 w-4 text-white" />
                                             </div>
                                        )}
                                   </div>
                                   <div>
                                        <div className="flex items-center gap-2">
                                             <h3 className="font-semibold text-gray-900">
                                                  {postDetail.user.name}
                                             </h3>
                                             <span className="rounded-full bg-[#2dca36]/10 px-2 py-0.5 text-xs font-medium text-[#2dca36]">
                                                  {postDetail.user.role}
                                             </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                             <p>
                                                  {
                                                       postDetail.user
                                                            .specialization
                                                  }
                                             </p>
                                             <p>{postDetail.user.experience}</p>
                                        </div>
                                   </div>
                              </div>
                              <div className="flex items-center gap-3">
                                   <button className="rounded-full p-2 hover:bg-gray-100">
                                        <Share2
                                             size={20}
                                             className="text-gray-500"
                                        />
                                   </button>
                                   <button className="rounded-full p-2 hover:bg-gray-100">
                                        <MoreVertical
                                             size={20}
                                             className="text-gray-500"
                                        />
                                   </button>
                              </div>
                         </div>

                         {/* Thumbnail */}
                         {postDetail.post.thumbnail && (
                              <div className="relative mb-6 h-[400px] w-full overflow-hidden rounded-lg">
                                   <Image
                                        src={postDetail.post.thumbnail}
                                        alt="Post thumbnail"
                                        fill
                                        className="object-cover"
                                   />
                              </div>
                         )}

                         {/* Title & Meta */}
                         <div className="mb-6">
                              <h1 className="mb-4 text-2xl font-bold text-gray-900">
                                   {postDetail.post.title}
                              </h1>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                   <span className="flex items-center gap-1">
                                        <Clock size={16} />
                                        {postDetail.post.createdAt}
                                   </span>
                                   <span className="flex items-center gap-1">
                                        <Eye size={16} />
                                        {postDetail.post.views} lượt xem
                                   </span>
                                   <span className="flex items-center gap-1">
                                        <MessageSquare size={16} />
                                        {postDetail.post.comments} bình luận
                                   </span>
                              </div>
                         </div>

                         {/* Tags */}
                         <div className="mb-6 flex flex-wrap gap-2">
                              {postDetail.post.tags.map((tag, idx) => (
                                   <span
                                        key={idx}
                                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-200"
                                   >
                                        <Tag
                                             size={14}
                                             className="text-gray-400"
                                        />
                                        {tag}
                                   </span>
                              ))}
                         </div>

                         {/* Content */}
                         <div className="prose prose-lg max-w-none">
                              <p className="mb-4 text-gray-600">
                                   {postDetail.post.description}
                              </p>
                              <div className="text-gray-800">
                                   {postDetail.post.content}
                              </div>
                         </div>

                         {/* References */}
                         {postDetail.post.references && (
                              <div className="mt-8 rounded-lg bg-gray-50 p-4">
                                   <h3 className="mb-2 font-semibold text-gray-900">
                                        Tài liệu tham khảo
                                   </h3>
                                   <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                                        {postDetail.post.references.map(
                                             (ref, idx) => (
                                                  <li key={idx}>{ref}</li>
                                             )
                                        )}
                                   </ul>
                              </div>
                         )}

                         {/* Interactions */}
                         <div className="mt-8 flex items-center gap-6 border-t pt-6 text-gray-500">
                              {/* ... existing interactions code ... */}
                         </div>
                    </div>

                    {/* Sidebar - Community Info */}
                    <div className="mt-4 rounded-lg bg-white p-6 shadow-lg">
                         <div className="mb-4 flex items-center justify-between">
                              <h2 className="text-lg font-semibold text-gray-900">
                                   {postDetail.community.name}
                              </h2>
                              <button className="flex items-center gap-1.5 rounded-full bg-[#2dca36] px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-[#2dca36]/90">
                                   <Plus size={16} />
                                   <span>Tham gia</span>
                              </button>
                         </div>
                         <p className="mb-4 text-gray-600">
                              {postDetail.community.description}
                         </p>
                         <div className="space-y-2 text-sm text-gray-500">
                              <p>
                                   {postDetail.community.memberCount.toLocaleString()}{' '}
                                   thành viên
                              </p>
                         </div>

                         <div className="mt-6">
                              <h3 className="mb-3 font-medium text-gray-900">
                                   Nội quy cộng đồng
                              </h3>
                              <ul className="space-y-2 text-sm text-gray-600">
                                   {postDetail.community.rules.map(
                                        (rule, idx) => (
                                             <li
                                                  key={idx}
                                                  className="flex items-start gap-2"
                                             >
                                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                  {rule}
                                             </li>
                                        )
                                   )}
                              </ul>
                         </div>
                    </div>
               </div>
          </div>
     );
}

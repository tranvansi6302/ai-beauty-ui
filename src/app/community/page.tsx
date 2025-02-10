import Image from 'next/image';
import {
     MessageSquare,
     Heart,
     ChevronUp,
     ChevronDown,
     User,
     Share2,
     Bookmark,
     Eye,
     Tag,
     MoreVertical,
     Plus,
     Check,
} from 'lucide-react';

interface CommunityPostProps {
     user: {
          name: string;
          avatar: string;
          role: string;
     };
     community: {
          name: string;
          isJoined: boolean;
          memberCount: number;
     };
     post: {
          title: string;
          description: string;
          tags: string[];
          votes: number;
          comments: number;
          reactions: number;
          createdAt: string;
          category: string;
     };
     isExpanded?: boolean;
}

const CommunityPost = ({
     user,
     community,
     post,
     isExpanded = false,
}: CommunityPostProps) => {
     return (
          <div className="mb-4 max-w-[720px] rounded-lg bg-white p-6 shadow-lg">
               {/* Header */}
               <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="relative h-10 w-10">
                              {user.avatar ? (
                                   <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        className="rounded-full object-cover"
                                   />
                              ) : (
                                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2dca36]/20 to-[#2dca36]/30">
                                        <User className="h-5 w-5 text-[#2dca36]" />
                                   </div>
                              )}
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-[#2dca36]" />
                         </div>
                         <div>
                              <div className="flex items-center gap-2">
                                   <p className="font-medium text-gray-900">
                                        {user.name}
                                   </p>
                                   <span className="rounded-full bg-[#2dca36]/10 px-2 py-0.5 text-xs font-medium text-[#2dca36]">
                                        {user.role}
                                   </span>
                              </div>
                              <p className="text-sm text-gray-500">
                                   {post.createdAt}
                              </p>
                         </div>
                    </div>
                    <button className="rounded-full p-1.5 hover:bg-gray-100">
                         <MoreVertical size={20} className="text-gray-500" />
                    </button>
               </div>

               {/* Community Info */}
               <div className="mb-4 rounded-lg bg-gray-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                         <div>
                              <p className="font-medium text-gray-900">
                                   <span className="text-[#c41c8b] hover:underline">
                                        {community.name}
                                   </span>
                                   <span className="ml-2 text-sm font-normal text-gray-500">
                                        • {post.category}
                                   </span>
                              </p>
                              <p className="text-sm text-gray-500">
                                   {community.memberCount.toLocaleString()}{' '}
                                   members
                              </p>
                         </div>
                         <button
                              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                                   community.isJoined
                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        : 'bg-[#2dca36] text-white hover:bg-[#2dca36]/90'
                              }`}
                         >
                              {community.isJoined ? (
                                   <>
                                        <Check size={16} />
                                        <span>Joined</span>
                                   </>
                              ) : (
                                   <>
                                        <Plus size={16} />
                                        <span>Join</span>
                                   </>
                              )}
                         </button>
                    </div>
               </div>

               {/* Content */}
               <div className="mb-6">
                    <h2 className="mb-3 text-lg font-semibold text-gray-900 hover:text-[#c41c8b]">
                         {post.title}
                    </h2>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                         <div className="mb-3 flex flex-wrap gap-2">
                              {post.tags.map((tag, idx) => (
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
                    )}

                    <div className={isExpanded ? '' : 'relative'}>
                         <p
                              className={`text-gray-700 ${
                                   isExpanded ? '' : 'line-clamp-2'
                              }`}
                         >
                              {post.description}
                         </p>
                         {!isExpanded && (
                              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white to-transparent" />
                         )}
                    </div>
               </div>

               {/* Interactions */}
               <div className="flex items-center gap-6 border-t pt-4 text-gray-500">
                    <div className="flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1">
                         <button className="transition-colors hover:text-[#2dca36]">
                              <ChevronUp size={20} />
                         </button>
                         <span className="min-w-[20px] text-center font-medium">
                              {post.votes}
                         </span>
                         <button className="transition-colors hover:text-[#ed1b26]">
                              <ChevronDown size={20} />
                         </button>
                    </div>

                    <button className="flex items-center gap-2 transition-colors hover:text-[#c41c8b]">
                         <MessageSquare size={18} />
                         <span>{post.comments} Replies</span>
                    </button>

                    <button className="group flex items-center gap-2 transition-colors hover:text-[#ed1b26]">
                         <Heart
                              size={18}
                              className="group-hover:fill-[#ed1b26]"
                         />
                         <span>{post.reactions} Helpful</span>
                    </button>

                    <button className="ml-auto hover:text-[#2dca36]">
                         <Bookmark size={18} />
                    </button>
               </div>
          </div>
     );
};

const PostSkeleton = () => {
     return (
          <div className="mb-4 max-w-[720px] animate-pulse rounded-lg bg-white p-6 shadow-lg">
               {/* Header Skeleton */}
               <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="relative h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-200" />
                              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-gray-200" />
                         </div>
                         <div>
                              <div className="flex items-center gap-2">
                                   <div className="h-4 w-32 rounded bg-gray-200" />
                                   <div className="h-4 w-20 rounded-full bg-gray-200" />
                              </div>
                              <div className="mt-1 h-3 w-24 rounded bg-gray-200" />
                         </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
               </div>

               {/* Community Info Skeleton */}
               <div className="mb-4 rounded-lg bg-gray-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                         <div>
                              <div className="flex items-center gap-2">
                                   <div className="h-4 w-40 rounded bg-gray-200" />
                                   <div className="h-4 w-20 rounded bg-gray-200" />
                              </div>
                              <div className="mt-1 h-3 w-28 rounded bg-gray-200" />
                         </div>
                         <div className="h-8 w-24 rounded-full bg-gray-200" />
                    </div>
               </div>

               {/* Content Skeleton */}
               <div className="mb-6">
                    <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />

                    {/* Tags Skeleton */}
                    <div className="mb-3 flex gap-2">
                         <div className="h-6 w-20 rounded-full bg-gray-200" />
                         <div className="h-6 w-24 rounded-full bg-gray-200" />
                         <div className="h-6 w-16 rounded-full bg-gray-200" />
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-2">
                         <div className="h-4 w-full rounded bg-gray-200" />
                         <div className="h-4 w-5/6 rounded bg-gray-200" />
                    </div>
               </div>

               {/* Interactions Skeleton */}
               <div className="flex items-center gap-6 border-t pt-4">
                    <div className="h-8 w-24 rounded-full bg-gray-200" />
                    <div className="h-8 w-28 rounded-full bg-gray-200" />
                    <div className="h-8 w-28 rounded-full bg-gray-200" />
                    <div className="ml-auto h-8 w-8 rounded-full bg-gray-200" />
               </div>
          </div>
     );
};

export default function Page() {
     const healthPosts = [
          {
               user: {
                    name: 'Bác sĩ Nguyễn Văn A',
                    avatar: '',
                    role: 'Bác sĩ Chuyên khoa',
               },
               community: {
                    name: 'Cộng đồng Y khoa',
                    isJoined: false,
                    memberCount: 12345,
               },
               post: {
                    title: '[Thảo luận] Tiêu đề bài viết về sức khỏe',
                    description:
                         'Nội dung mô tả ngắn gọn về chủ đề sức khỏe...',
                    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
                    votes: 10,
                    comments: 5,
                    reactions: 8,
                    createdAt: '1 giờ trước',
                    category: 'Chuyên mục',
               },
          },
     ];

     return (
          <div className="min-h-screen bg-gray-100 p-4">
               <div className="mx-auto max-w-3xl">
                    <h1 className="mb-6 text-2xl font-bold text-gray-900">
                         Cộng đồng Hỏi đáp Sức khỏe
                    </h1>
                    <div className="space-y-4">
                         {/* Bài viết đầy đủ */}
                         <CommunityPost {...healthPosts[0]} isExpanded={true} />
                         {/* Bài phác thảo */}
                         <PostSkeleton />
                    </div>
               </div>
          </div>
     );
}

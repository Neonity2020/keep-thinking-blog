'use client';

interface BlogContentProps {
  content: string;
  className?: string;
}

export function BlogContent({ content, className = '' }: BlogContentProps) {
  return (
    <div 
      className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert ${className}
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8
        [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6
        [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 [&_h3]:mt-4
        [&_p]:mb-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:mb-4 [&_ul]:pl-5
        [&_ol]:list-decimal [&_ol]:mb-4 [&_ol]:pl-5
        [&_li]:mb-1
        [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic
        [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-lg
        [&_code]:text-red-500 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:rounded
        [&_img]:rounded-lg [&_img]:mx-auto
        [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:hover:underline
      `}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 
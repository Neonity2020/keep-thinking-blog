'use client';

import { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface BlogContentProps {
  content: string;
  className?: string;
}

export function BlogContent({ content, className = '' }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 使用 requestAnimationFrame 确保在 DOM 完全渲染后应用高亮
    const applyHighlight = () => {
      if (contentRef.current) {
        // 获取所有代码块
        const codeBlocks = contentRef.current.querySelectorAll('pre code');
        
        // 对每个代码块应用高亮
        codeBlocks.forEach((block) => {
          // 如果已经应用过高亮，则跳过
          if (block.classList.contains('hljs')) return;
          
          // 应用高亮
          hljs.highlightElement(block as HTMLElement);
        });
      }
    };

    // 使用 requestAnimationFrame 确保在下一帧渲染时应用高亮
    requestAnimationFrame(applyHighlight);
    
    // 为了处理动态加载的内容，添加一个 MutationObserver
    const observer = new MutationObserver((mutations) => {
      let shouldReapply = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldReapply = true;
        }
      });
      
      if (shouldReapply) {
        requestAnimationFrame(applyHighlight);
      }
    });
    
    if (contentRef.current) {
      observer.observe(contentRef.current, { childList: true, subtree: true });
    }
    
    return () => {
      observer.disconnect();
    };
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none dark:prose-invert ${className}
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-8
        [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6
        [&_h3]:text-xl [&_h3]:font-medium [&_h3]:mb-2 [&_h3]:mt-4
        [&_p]:mb-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:mb-4 [&_ul]:pl-5
        [&_ol]:list-decimal [&_ol]:mb-4 [&_ol]:pl-5
        [&_li]:mb-1
        [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic
        [&_pre]:bg-[#1e1e1e] [&_pre]:text-[#d4d4d4] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
        [&_code:not(pre code)]:text-[#d32f2f] [&_code:not(pre code)]:bg-[#f5f5f5] [&_code:not(pre code)]:px-1 [&_code:not(pre code)]:rounded
        [&_pre_code]:text-[#d4d4d4] [&_pre_code]:bg-transparent [&_pre_code]:p-0
        [&_.hljs-keyword]:text-[#569cd6]
        [&_.hljs-string]:text-[#ce9178]
        [&_.hljs-comment]:text-[#6a9955]
        [&_.hljs-function]:text-[#dcdcaa]
        [&_.hljs-number]:text-[#b5cea8]
        [&_.hljs-operator]:text-[#d4d4d4]
        [&_.hljs-class]:text-[#4ec9b0]
        [&_.hljs-title]:text-[#dcdcaa]
        [&_.hljs-params]:text-[#9cdcfe]
        [&_.hljs-variable]:text-[#9cdcfe]
        [&_.hljs-property]:text-[#9cdcfe]
        [&_.hljs-type]:text-[#4ec9b0]
        [&_.hljs-built_in]:text-[#4ec9b0]
        [&_.hljs-literal]:text-[#569cd6]
        [&_.hljs-regexp]:text-[#d16969]
        [&_.hljs-symbol]:text-[#ce9178]
        [&_.hljs-tag]:text-[#569cd6]
        [&_.hljs-attr]:text-[#9cdcfe]
        [&_.hljs-selector-tag]:text-[#569cd6]
        [&_.hljs-selector-id]:text-[#9cdcfe]
        [&_.hljs-selector-class]:text-[#4ec9b0]
        [&_.hljs-selector-pseudo]:text-[#d7ba7d]
        [&_.hljs-template-tag]:text-[#569cd6]
        [&_.hljs-template-variable]:text-[#9cdcfe]
        [&_.hljs-deletion]:text-[#f14c4c]
        [&_.hljs-addition]:text-[#6a9955]
        [&_img]:rounded-lg [&_img]:mx-auto
        [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:hover:underline
      `}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { cn } from '@/lib/utils';
import '@/styles/editor.css';
import { useEffect, useState } from 'react';

const lowlight = createLowlight();

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function Editor({ content, onChange, className }: EditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: '开始写作...',
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  if (!isMounted) {
    return <div className={cn('min-h-[200px]', className)} />;
  }

  return (
    <div className={cn('relative', className)}>
      <EditorContent editor={editor} />
    </div>
  );
} 
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { cn } from '@/lib/utils';

const lowlight = createLowlight();

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
}

export function Editor({ content, onChange, className }: EditorProps) {
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
  });

  return (
    <div className={cn('prose prose-sm max-w-none', className)}>
      <EditorContent editor={editor} />
    </div>
  );
} 
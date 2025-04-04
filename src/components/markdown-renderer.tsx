import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        div: ({ ...props }) => <div className="prose prose-stone dark:prose-invert max-w-none" {...props} />,
        h1: ({ ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ ...props }) => <h2 className="text-3xl font-bold mt-6 mb-3" {...props} />,
        h3: ({ ...props }) => <h3 className="text-2xl font-bold mt-5 mb-2" {...props} />,
        h4: ({ ...props }) => <h4 className="text-xl font-bold mt-4 mb-2" {...props} />,
        h5: ({ ...props }) => <h5 className="text-lg font-bold mt-3 mb-1" {...props} />,
        h6: ({ ...props }) => <h6 className="text-base font-bold mt-2 mb-1" {...props} />,
        table: ({ ...props }) => (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 my-4" {...props} />
          </div>
        ),
        thead: ({ ...props }) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
        th: ({ ...props }) => (
          <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold" {...props} />
        ),
        td: ({ ...props }) => (
          <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props} />
        ),
        tr: ({ ...props }) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50" {...props} />
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  );
} 
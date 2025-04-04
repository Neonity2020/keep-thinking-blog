import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getBlogPost } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogPost(params.id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
              博客
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">{blog.title}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <span className="font-medium">{blog.author.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{blog.date}</span>
              <span>·</span>
              <span>{blog.readTime}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <MarkdownRenderer content={blog.content} />
        </div>
      </div>
    </div>
  );
} 
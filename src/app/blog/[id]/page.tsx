import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { use } from "react";

export const metadata: Metadata = {
  title: "博客详情",
};

export async function generateStaticParams() {
  const blogs = await getAllBlogPosts();
  return blogs.map((blog) => ({
    id: blog.id,
  }));
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const blogId = use(Promise.resolve(params.id));
  const blog = use(getBlogPost(blogId));

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold">{blog.title}</CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span>{blog.author.name}</span>
                <span>·</span>
                <span>{blog.date}</span>
                <span>·</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <MarkdownRenderer content={blog.content} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts } from "@/lib/blog";
import Link from "next/link";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "博客 | Keep Thinking",
  description: "探索我们的博客文章，获取最新见解和知识分享。",
  keywords: ["博客", "文章", "知识分享", "技术", "思考"],
  authors: [{ name: "Keep Thinking Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function BlogPage() {
  const blogs = await getAllBlogPosts();

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            博客文章
          </h1>
          <p className="text-lg text-muted-foreground">
            探索我们的博客文章，获取最新见解和知识分享。
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id.replace(/\.md$/, '')}`}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>
                    {blog.date} · {blog.readTime}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-muted" />
                      <span className="text-sm font-medium">{blog.author.name}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 
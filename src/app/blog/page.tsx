"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  status: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setBlogs(data || []);
        setError(null);
      } catch (error) {
        console.error('获取博客列表失败:', error);
        setError('获取博客列表失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">博客文章</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  发布于 {new Date(blog.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">
                  {blog.content}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          暂无博客文章
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BlogContent } from '@/components/blog-content';

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  status: string;
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', resolvedParams.id)
          .single();

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error('博客不存在');
        }

        setBlog(data);
        setError(null);
      } catch (error) {
        console.error('获取博客详情失败:', error);
        setError('获取博客详情失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [resolvedParams.id]);

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
        <div className="text-center mt-4">
          <Button onClick={() => router.push('/blog')}>返回博客列表</Button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">博客不存在</div>
        <div className="text-center mt-4">
          <Button onClick={() => router.push('/blog')}>返回博客列表</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <Button variant="outline" onClick={() => router.push('/blog')}>
            返回列表
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              发布于 {new Date(blog.created_at).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BlogContent content={blog.content} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

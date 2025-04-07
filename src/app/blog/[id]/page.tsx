"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BlogContent } from '@/components/blog-content';
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  status: string;
}

// 添加数据缓存
const blogCache = new Map<string, { data: Blog; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // 检查缓存
        const cachedBlog = blogCache.get(resolvedParams.id);
        if (cachedBlog && Date.now() - cachedBlog.timestamp < CACHE_DURATION) {
          setBlog(cachedBlog.data);
          setLoading(false);
          return;
        }

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

        // 更新缓存
        blogCache.set(resolvedParams.id, { data, timestamp: Date.now() });
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
      <div className="container mx-auto px-4 py-6 sm:py-10">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-6" />
          <Card className="shadow-sm">
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            </CardContent>
          </Card>
        </div>
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
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words">{blog.title}</h1>
          <Badge variant={blog.status === 'published' ? 'default' : 'outline'}>
            {blog.status === 'published' ? '已发布' : '草稿'}
          </Badge>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="space-y-2">
            <CardTitle className="text-base sm:text-lg md:text-xl">
              发布于 {new Date(blog.created_at).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BlogContent content={blog.content} className="text-sm sm:text-base" />
          </CardContent>
        </Card>
        
        <div className="mt-6 sm:bottom-24 sm:flex sm:justify-end sm:mb-6">
          <Button 
            onClick={() => router.push('/blog')}
            className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300 bg-background text-foreground border hover:bg-accent hover:text-accent-foreground px-4 py-2 text-sm sm:text-base rounded-full"
          >
            返回博客列表
          </Button>
        </div>
      </div>
    </div>
  );
}

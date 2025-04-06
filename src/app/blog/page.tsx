"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_id: string;
  status: string;
}

const ITEMS_PER_PAGE = 9;

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const from = (page - 1) * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE - 1;

        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('created_at', { ascending: false })
          .range(from, to);

        if (error) {
          throw error;
        }

        if (page === 1) {
          setBlogs(data || []);
        } else {
          setBlogs(prev => [...prev, ...(data || [])]);
        }

        setHasMore((data?.length || 0) === ITEMS_PER_PAGE);
        setError(null);
      } catch (error) {
        console.error('获取博客列表失败:', error);
        setError('获取博客列表失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">博客文章</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {loading && page === 1 ? (
          // 首次加载时显示 skeleton
          Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : (
          blogs.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg sm:text-xl line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    发布于 {new Date(blog.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="prose prose-sm max-w-none line-clamp-3 text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ 
                      __html: blog.content.replace(/<[^>]*>/g, '').slice(0, 200) + '...' 
                    }}
                  />
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {loading && page > 1 && (
        <div className="text-center mt-6 sm:mt-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-gray-900"></div>
        </div>
      )}

      {!loading && hasMore && (
        <div className="text-center mt-6 sm:mt-8">
          <Button onClick={loadMore} variant="outline" className="px-4 sm:px-6">
            加载更多
          </Button>
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-6 sm:mt-8 py-8 bg-gray-50 rounded-lg">
          暂无博客文章
        </div>
      )}
    </div>
  );
}

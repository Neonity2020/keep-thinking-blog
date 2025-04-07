"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/components/providers/user-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase';
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Blog {
  id: string;
  title: string;
  status: string;
  created_at: string;
  author_id: string;
}

// 骨架屏组件
const DashboardSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
          <Skeleton className="h-9 w-full sm:w-24" />
          <Skeleton className="h-9 w-full sm:w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 pt-2">
              <div className="flex gap-2 w-full sm:w-auto">
                <Skeleton className="h-9 w-full sm:w-16" />
                <Skeleton className="h-9 w-full sm:w-16" />
              </div>
              <Skeleton className="h-9 w-full sm:w-16" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const { user, loading, signOut } = useUser();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [publishingBlogs, setPublishingBlogs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) {
        console.log('用户未登录，跳过获取博客列表');
        return;
      }

      setIsLoading(true);
      try {
        console.log('开始获取博客列表...');
        
        // 直接获取博客列表
        const { data, error } = await supabase
          .from('blogs')
          .select(`
            id,
            title,
            status,
            created_at,
            author_id
          `)
          .eq('author_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('获取博客列表失败:', error);
          setError(`获取博客列表失败: ${error.message || '未知错误'}`);
          return;
        }

        if (!data) {
          console.log('未获取到博客数据');
          setError('未获取到博客数据');
          return;
        }

        console.log('成功获取博客列表:', data.length);
        setBlogs(data);
        setStats({
          total: data.length,
          published: data.filter(blog => blog.status === 'published').length,
          draft: data.filter(blog => blog.status === 'draft').length
        });
        setError(null);
      } catch (error) {
        console.error('获取博客列表异常:', error);
        if (error instanceof Error) {
          setError(`获取博客列表异常: ${error.message}`);
        } else {
          setError('获取博客列表时发生未知错误');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('删除博客失败:', error);
        return;
      }

      setBlogs(blogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('删除博客异常:', error);
    }
  };

  const handlePublish = async (id: string) => {
    setPublishingBlogs(prev => ({ ...prev, [id]: true }));
    
    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          status: 'published',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('发布博客失败:', error);
        return;
      }

      // 更新本地状态
      setBlogs(blogs.map(blog => 
        blog.id === id ? { ...blog, status: 'published' } : blog
      ));
      
      // 更新统计信息
      setStats(prev => ({
        ...prev,
        published: prev.published + 1,
        draft: prev.draft - 1
      }));
    } catch (error) {
      console.error('发布博客异常:', error);
    } finally {
      setPublishingBlogs(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading || isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">仪表盘</h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
          <Link href="/blog/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4">新建博客</Button>
          </Link>
          <Button onClick={handleSignOut} className="w-full sm:w-auto text-xs sm:text-sm px-3 sm:px-4">退出登录</Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded relative mb-4 text-sm" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">总博客数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">已发布</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.published}</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">草稿</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold">{stats.draft}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">暂无博客内容</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <Card key={blog.id} className="hover:shadow-md transition-shadow flex flex-col h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg sm:text-xl line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  <Badge variant={blog.status === 'published' ? 'default' : 'outline'}>
                    {blog.status === 'published' ? '已发布' : '草稿'}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-xs sm:text-sm text-gray-500">创建时间: {new Date(blog.created_at).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 pt-2 mt-auto">
                <div className="flex gap-2 w-full sm:w-auto">
                  <Link href={`/blog/${blog.id}`} className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4">查看</Button>
                  </Link>
                  <Link href={`/blog/${blog.id}/edit`} className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4">编辑</Button>
                  </Link>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  {blog.status !== 'published' && (
                    <Button 
                      variant="outline" 
                      onClick={() => handlePublish(blog.id)}
                      disabled={publishingBlogs[blog.id]}
                      className="w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                    >
                      {publishingBlogs[blog.id] ? '发布中...' : '发布'}
                    </Button>
                  )}
                  <Button 
                    variant="destructive" 
                    onClick={() => handleDelete(blog.id)}
                    className="w-full sm:w-auto text-xs sm:text-sm px-2 sm:px-4"
                  >
                    删除
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 
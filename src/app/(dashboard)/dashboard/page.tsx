"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useUser } from "@/components/providers/user-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase';

interface Blog {
  id: string;
  title: string;
  status: string;
  created_at: string;
  views: number;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useUser();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    totalViews: 0
  });

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

      try {
        console.log('开始获取博客列表...');
        console.log('当前用户ID:', user.id);
        
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('author_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('获取博客列表失败:', error);
          console.error('错误详情:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          });
          return;
        }

        if (!data) {
          console.log('未获取到博客数据');
          return;
        }

        console.log('成功获取博客列表:', data.length);
        setBlogs(data);
        setStats({
          total: data.length,
          published: data.filter(blog => blog.status === 'published').length,
          draft: data.filter(blog => blog.status === 'draft').length,
          totalViews: data.reduce((sum, blog) => sum + (blog.views || 0), 0)
        });
      } catch (error) {
        console.error('获取博客列表异常:', error);
        if (error instanceof Error) {
          console.error('错误详情:', {
            message: error.message,
            stack: error.stack
          });
        }
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
    if (!user) return;

    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)
      .eq('author_id', user.id);

    if (error) {
      console.error('Error deleting blog:', error);
      return;
    }

    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-muted rounded"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
            <p className="text-muted-foreground">
              管理您的博客文章和账户设置
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Button variant="outline" onClick={handleSignOut}>
              退出
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总博客数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已发布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.published}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">草稿</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draft}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总浏览量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">我的博客</h2>
          <Button asChild>
            <Link href="/blog/new">创建博客</Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  发布于 {new Date(blog.created_at).toLocaleDateString('zh-CN')} · {blog.views || 0} 次浏览
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {blog.status === "published" ? "已发布" : "草稿"}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/blog/${blog.id}`}>查看</Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/blog/${blog.id}/edit`}>编辑</Link>
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(blog.id)}>
                    删除
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
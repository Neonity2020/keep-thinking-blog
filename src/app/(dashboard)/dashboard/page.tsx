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
  author_id: string;
}

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
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        
        // 首先测试数据库连接
        const { error: testError } = await supabase
          .from('blogs')
          .select('count')
          .limit(1);

        if (testError) {
          console.error('数据库连接测试失败:', testError);
          console.error('错误详情:', {
            message: testError.message,
            code: testError.code,
            details: testError.details,
            hint: testError.hint
          });
          setError(`数据库连接失败: ${testError.message}`);
          return;
        }

        console.log('数据库连接测试成功');

        // 获取博客列表
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
          console.error('错误详情:', {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint
          });
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
          console.error('错误详情:', {
            message: error.message,
            stack: error.stack
          });
          setError(`获取博客列表异常: ${error.message}`);
        } else {
          setError('获取博客列表时发生未知错误');
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

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">仪表盘</h1>
        <div className="flex gap-4">
          <Link href="/blog/new">
            <Button>新建博客</Button>
          </Link>
          <Button onClick={handleSignOut}>退出登录</Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>总博客数</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>已发布</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.published}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>草稿</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.draft}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>
                状态: {blog.status === 'published' ? '已发布' : '草稿'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>创建时间: {new Date(blog.created_at).toLocaleDateString()}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Link href={`/blog/${blog.id}`}>
                  <Button variant="outline">查看</Button>
                </Link>
                <Link href={`/blog/${blog.id}/edit`}>
                  <Button variant="outline">编辑</Button>
                </Link>
              </div>
              <Button variant="destructive" onClick={() => handleDelete(blog.id)}>
                删除
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 
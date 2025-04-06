'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PageParams {
  id: string;
}

export default function EditBlogPage({ params }: { params: Promise<PageParams> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const blogId = resolvedParams.id;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [readTime, setReadTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('请先登录');
        }

        const { data: blog, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', blogId)
          .single();

        if (error) throw error;
        if (!blog) throw new Error('博客不存在');
        if (blog.author_id !== user.id) throw new Error('无权编辑此博客');

        setTitle(blog.title);
        setContent(blog.content);
        setTags(blog.tags?.join(', ') || '');
        setReadTime(blog.read_time?.toString() || '5');
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取博客失败');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('请先登录');
      }

      console.log('开始更新博客:', blogId);
      console.log('更新内容:', {
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
        read_time: parseInt(readTime) || 5,
        updated_at: new Date().toISOString()
      });

      const { error } = await supabase
        .from('blogs')
        .update({
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()),
          read_time: parseInt(readTime) || 5,
          updated_at: new Date().toISOString()
        })
        .eq('id', blogId);

      if (error) {
        console.error('更新博客失败:', error);
        console.error('错误详情:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      console.log('博客更新成功，跳转到详情页面');
      router.push(`/blog/${blogId}`);
    } catch (err) {
      console.error('更新博客异常:', err);
      setError(err instanceof Error ? err.message : '更新博客失败');
    }
  };

  if (loading) {
    return <div className="container mx-auto py-10">加载中...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-red-500">{error}</div>
        <Button onClick={() => router.push('/blog')} className="mt-4">
          返回博客列表
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>编辑博客</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">标题</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">内容</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[300px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">标签（用逗号分隔）</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="例如：技术,编程,Next.js"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">预计阅读时间（分钟）</Label>
              <Input
                id="readTime"
                type="number"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                min="1"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex gap-4">
              <Button type="submit">保存更改</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/blog/${blogId}`)}
              >
                取消
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
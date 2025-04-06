import { createClient } from '@supabase/supabase-js';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    // 检查环境变量
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('缺少 Supabase 环境变量');
      console.error('URL:', supabaseUrl ? '已设置' : '未设置');
      console.error('Key:', supabaseKey ? '已设置' : '未设置');
      throw new Error('缺少必要的 Supabase 环境变量');
    }

    console.log('开始获取博客:', id);
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key:', supabaseKey.slice(0, 10) + '...');

    // 创建 Supabase 客户端
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      db: {
        schema: 'public'
      }
    });

    // 首先测试连接
    const { error: testError } = await supabase.auth.getSession();
    if (testError) {
      console.error('Supabase 连接测试失败:', testError);
      throw new Error(`Supabase 连接失败: ${testError.message}`);
    }

    // 获取博客内容
    console.log('正在查询博客表...');
    const { data: blog, error: blogError } = await supabase
      .from('blogs')
      .select('id, title, content, created_at, read_time, tags, author_id')
      .eq('id', id)
      .single();

    if (blogError) {
      console.error('获取博客失败:', blogError);
      console.error('错误详情:', {
        message: blogError.message,
        code: blogError.code,
        details: blogError.details,
        hint: blogError.hint
      });
      
      // 检查是否是表不存在的错误
      if (blogError.message?.includes('relation "blogs" does not exist')) {
        throw new Error('博客表不存在，请检查数据库结构');
      }
      
      throw new Error(`获取博客失败: ${blogError.message}`);
    }

    if (!blog) {
      console.log('博客不存在:', id);
      return null;
    }

    console.log('博客内容获取成功:', {
      id: blog.id,
      title: blog.title,
      author_id: blog.author_id
    });

    // 获取作者信息
    console.log('正在查询作者信息...');
    const { data: author, error: authorError } = await supabase
      .from('profiles')
      .select('id, name, avatar')
      .eq('id', blog.author_id)
      .single();

    if (authorError) {
      console.error('获取作者信息失败:', authorError);
      console.error('错误详情:', {
        message: authorError.message,
        code: authorError.code,
        details: authorError.details,
        hint: authorError.hint
      });
    }

    console.log('作者信息:', author || '未找到作者信息');

    const result = {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      date: new Date(blog.created_at).toLocaleDateString('zh-CN'),
      readTime: `${blog.read_time || 5} 分钟阅读`,
      tags: blog.tags || [],
      author: {
        id: author?.id || blog.author_id || 'unknown',
        name: author?.name || '匿名作者',
        avatar: author?.avatar || '/default-avatar.png'
      }
    };

    console.log('最终返回的博客数据:', {
      id: result.id,
      title: result.title,
      author: result.author
    });
    return result;
  } catch (error) {
    console.error('获取博客异常:', error);
    if (error instanceof Error) {
      console.error('错误详情:', {
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function getAllBlogPosts() {
  try {
    // 检查环境变量
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('缺少 Supabase 环境变量');
      return [];
    }

    // 创建 Supabase 客户端
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false
      }
    });

    // 获取博客列表
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('获取博客列表失败:', error);
      return [];
    }

    if (!data) {
      console.log('未找到博客文章');
      return [];
    }

    // 转换数据格式
    return data.map(blog => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      date: new Date(blog.created_at).toLocaleDateString('zh-CN'),
      readTime: `${blog.read_time || 5} 分钟阅读`,
      tags: blog.tags || [],
      author: {
        id: blog.author_id,
        name: '匿名作者',
        avatar: '/default-avatar.png'
      }
    }));
  } catch (error) {
    console.error('获取博客列表异常:', error);
    return [];
  }
} 
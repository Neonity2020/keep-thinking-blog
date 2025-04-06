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
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return null;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: false
        }
      }
    );

    console.log('Fetching blog post:', id);

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('id, title, content, created_at, read_time, tags, author_id')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return null;
    }

    if (!blog) {
      console.log('Blog not found');
      return null;
    }

    console.log('Blog found:', blog);

    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      date: new Date(blog.created_at).toLocaleDateString('zh-CN'),
      readTime: `${blog.read_time} 分钟阅读`,
      tags: blog.tags || [],
      author: {
        id: blog.author_id || 'unknown',
        name: '匿名作者',
        avatar: '/default-avatar.png'
      }
    };
  } catch (error) {
    console.error('Error in getBlogPost:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    return null;
  }
}

export async function getAllBlogPosts() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return [];
    }

    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: false
        }
      }
    );

    console.log('Fetching blogs from Supabase...');

    // 首先尝试只获取博客基本信息
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return [];
    }

    if (!blogs) {
      console.log('No blogs found');
      return [];
    }

    console.log('Successfully fetched blogs:', blogs.length);

    // 然后获取作者信息
    const authorIds = blogs.map(blog => blog.author_id);
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .in('id', authorIds);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        date: new Date(blog.created_at).toLocaleDateString('zh-CN'),
        readTime: `${blog.read_time} 分钟阅读`,
        tags: blog.tags || [],
        author: {
          id: 'unknown',
          name: '匿名作者',
          avatar: '/default-avatar.png'
        }
      }));
    }

    const profilesMap = new Map(profiles?.map(profile => [profile.id, profile]) || []);

    return blogs.map(blog => {
      const author = profilesMap.get(blog.author_id);
      return {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        date: new Date(blog.created_at).toLocaleDateString('zh-CN'),
        readTime: `${blog.read_time} 分钟阅读`,
        tags: blog.tags || [],
        author: {
          id: author?.id || 'unknown',
          name: author?.name || '匿名作者',
          avatar: author?.avatar || '/default-avatar.png'
        }
      };
    });
  } catch (error) {
    console.error('Error in getAllBlogPosts:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    return [];
  }
} 
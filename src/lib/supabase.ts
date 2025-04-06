import { createClient } from '@supabase/supabase-js';

// 确保环境变量存在
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

console.log('初始化 Supabase 客户端...');
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

// 创建Supabase客户端
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'keep-thinking-blog'
      }
    }
  }
);

// 测试连接
supabase.from('blogs').select('count').then(({ error }) => {
  if (error) {
    console.error('Supabase 连接测试失败:', error);
  } else {
    console.log('Supabase 连接测试成功');
  }
}); 
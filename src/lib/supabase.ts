import { createClient } from '@supabase/supabase-js';

// 确保环境变量存在
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('NEXT_PUBLIC_SUPABASE_URL 环境变量未设置');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY 环境变量未设置');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 创建Supabase客户端
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: true // 启用调试模式
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'keep-thinking'
    }
  }
});

// 测试Supabase连接
export async function testSupabaseConnection() {
  try {
    console.log('测试Supabase连接...');
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key 长度:', supabaseAnonKey.length);
    
    const { error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.error('Supabase连接测试失败:', error);
      return false;
    }
    
    console.log('Supabase连接测试成功');
    return true;
  } catch (err) {
    console.error('Supabase连接测试异常:', err);
    return false;
  }
} 
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 测试Supabase连接
    const { error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase连接测试失败:', error.message);
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL,
          keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
        }
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase连接测试成功',
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
      }
    });
  } catch (err) {
    console.error('Supabase连接测试异常:', err);
    return NextResponse.json({ 
      success: false, 
      error: err instanceof Error ? err.message : '未知错误',
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
      }
    }, { status: 500 });
  }
} 
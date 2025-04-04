import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // 交换代码以获取会话
    await supabase.auth.exchangeCodeForSession(code);
  }

  // 重定向到仪表盘
  return NextResponse.redirect(new URL('/dashboard', request.url));
} 
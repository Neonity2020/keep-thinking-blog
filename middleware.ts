import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // 刷新会话（如果存在）
  const { data: { session } } = await supabase.auth.getSession();
  
  // 获取当前路径
  const path = req.nextUrl.pathname;
  
  // 保护仪表盘路径
  if (path.startsWith('/dashboard')) {
    if (!session) {
      // 如果用户未登录，重定向到登录页面
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  // 如果用户已登录，访问登录或注册页面时重定向到仪表盘
  if (session && (path === '/login' || path === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  return res;
}

// 配置中间件匹配的路径
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
  ],
}; 
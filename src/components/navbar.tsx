"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/components/providers/user-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function Navbar() {
  const { user, signOut } = useUser();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // 获取用户首字母作为头像回退
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      toast.success("已成功退出登录");
      router.push("/");
    } catch (error) {
      console.error("退出登录失败:", error);
      toast.error("退出登录失败，请重试");
    } finally {
      setIsSigningOut(false);
    }
  };

  // 获取显示名称
  const getDisplayName = () => {
    // 优先使用 Supabase 中的 name 字段
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    // 其次使用 full_name
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    // 最后使用邮箱用户名部分
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "未登录用户";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Keep Thinking</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
              博客
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              关于
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={user?.user_metadata?.avatar_url || `/avatars/0${Math.floor(Math.random() * 3) + 1}.svg`} 
                    alt={getDisplayName()} 
                  />
                  <AvatarFallback>{getInitials(getDisplayName())}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "请登录"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)}>
                      控制台
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" onClick={() => setIsDropdownOpen(false)}>
                      设置
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => {
                      handleSignOut();
                      setIsDropdownOpen(false);
                    }}
                    disabled={isSigningOut}
                    className="text-red-600 dark:text-red-400"
                  >
                    {isSigningOut ? "退出中..." : "退出登录"}
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" onClick={() => setIsDropdownOpen(false)}>
                      登录
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" onClick={() => setIsDropdownOpen(false)}>
                      注册
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
} 
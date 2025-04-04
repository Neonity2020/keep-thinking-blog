"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase, testSupabaseConnection } from "@/lib/supabase";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>("检查连接中...");

  // 测试Supabase连接
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await testSupabaseConnection();
        setConnectionStatus(isConnected ? "连接正常" : "连接失败");
      } catch (err) {
        console.error("连接测试异常:", err);
        setConnectionStatus("连接测试异常");
      }
    };

    checkConnection();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      setLoading(false);
      return;
    }

    try {
      console.log("尝试注册:", email);
      
      // 检查Supabase URL和密钥
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("Supabase Key 长度:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
      
      // 使用 Supabase 的 signUp 方法
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      console.log("注册响应:", { data, error });
      
      // 检查是否有错误
      if (error) {
        console.error("注册错误:", error);
        // 检查是否是邮箱已存在的错误
        if (error.message.includes("already registered") || 
            error.message.includes("already exists") || 
            error.message.includes("User already registered")) {
          setError("注册邮箱已使用，请更换邮箱");
        } else {
          setError(error.message);
        }
        setLoading(false);
        return;
      }
      
      // 检查用户是否已存在但未确认
      if (data?.user && !data?.user?.email_confirmed_at) {
        console.log("用户已存在但未确认邮箱");
        setError("该邮箱已注册但未确认，请检查您的邮箱以确认账户，或使用其他邮箱注册");
        setLoading(false);
        return;
      }
      
      // 注册成功
      console.log("注册成功:", data);
      toast.success("注册成功！请检查您的邮箱以验证您的账户。");
      router.push("/login");
    } catch (err) {
      console.error("注册异常:", err);
      setError("注册失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">注册</CardTitle>
          <CardDescription>
            创建一个新账户
          </CardDescription>
          <div className="text-xs text-muted-foreground">
            连接状态: {connectionStatus}
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                邮箱
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                密码
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                确认密码
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "注册中..." : "注册"}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              已有账户?{" "}
              <Link href="/login" className="text-primary hover:underline">
                登录
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  或者
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: 'github',
                      options: {
                        redirectTo: `${window.location.origin}/auth/callback`,
                      },
                    });
                    if (error) {
                      console.error("GitHub登录错误:", error);
                      toast.error("GitHub登录失败");
                    }
                  } catch (err) {
                    console.error("GitHub登录异常:", err);
                    toast.error("GitHub登录失败");
                  }
                }}
              >
                GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  try {
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: 'google',
                      options: {
                        redirectTo: `${window.location.origin}/auth/callback`,
                      },
                    });
                    if (error) {
                      console.error("Google登录错误:", error);
                      toast.error("Google登录失败");
                    }
                  } catch (err) {
                    console.error("Google登录异常:", err);
                    toast.error("Google登录失败");
                  }
                }}
              >
                Google
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

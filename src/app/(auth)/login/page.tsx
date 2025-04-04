"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase, testSupabaseConnection } from "@/lib/supabase";
import { toast } from "sonner";

export default function LoginPage() {
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

    try {
      console.log("尝试登录:", email);
      
      // 检查Supabase URL和密钥
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("Supabase Key 长度:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("登录错误:", error);
        setError(error.message);
      } else {
        console.log("登录成功:", data);
        toast.success("登录成功！");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("登录异常:", err);
      setError("登录失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">登录</CardTitle>
          <CardDescription>
            输入您的邮箱和密码登录您的账户
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
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登录中..." : "登录"}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              还没有账户?{" "}
              <Link href="/register" className="text-primary hover:underline">
                注册
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
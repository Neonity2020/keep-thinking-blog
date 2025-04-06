"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>("检查连接中...");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 测试Supabase连接
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('profiles').select('count').limit(1);
        setConnectionStatus(error ? "连接失败" : "连接正常");
      } catch (err) {
        console.error("连接测试异常:", err);
        setConnectionStatus("连接测试异常");
      }
    };

    checkConnection();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 表单验证
      if (!formData.email || !formData.password) {
        setError("请填写所有必填字段");
        return;
      }

      if (!formData.email.includes('@')) {
        setError("请输入有效的邮箱地址");
        return;
      }

      if (formData.password.length < 6) {
        setError("密码长度至少为6个字符");
        return;
      }

      console.log("尝试登录:", formData.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("登录错误:", error);
        if (error.message.includes("Invalid login credentials")) {
          setError("邮箱或密码错误");
        } else if (error.message.includes("Email not confirmed")) {
          setError("邮箱未验证，请先验证您的邮箱");
        } else {
          setError(error.message);
        }
        return;
      }

      if (data?.user) {
        console.log("登录成功:", data.user);
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
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
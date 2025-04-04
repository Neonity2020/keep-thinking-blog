"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("认证错误:", error.message);
        router.push("/login");
        return;
      }
      
      if (session) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">正在处理认证...</h1>
        <p className="text-muted-foreground">请稍候，我们正在验证您的身份。</p>
      </div>
    </div>
  );
} 
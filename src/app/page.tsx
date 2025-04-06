"use client";

import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { TypewriterEffect } from "@/components/typewriter-effect";

// 模拟博客数据
const blogs = [
  {
    id: "1",
    title: "使用Next.js和MongoDB构建现代博客应用",
    description: "本文将介绍如何使用Next.js和MongoDB构建一个现代化的博客应用，包括用户认证、内容管理和响应式设计。",
    author: {
      name: "张三",
      avatar: "/avatars/01.png",
    },
    date: "2023-04-01",
    readTime: "5分钟",
    tags: ["Next.js", "MongoDB", "React"],
  },
  {
    id: "2",
    title: "Lexical编辑器：构建富文本编辑器的现代解决方案",
    description: "Lexical是Facebook开发的一个可扩展的文本编辑器框架，本文将介绍如何使用Lexical构建一个功能强大的博客编辑器。",
    author: {
      name: "李四",
      avatar: "/avatars/02.png",
    },
    date: "2023-04-02",
    readTime: "8分钟",
    tags: ["Lexical", "编辑器", "React"],
  },
  {
    id: "3",
    title: "使用shadcn/ui构建美观的用户界面",
    description: "shadcn/ui是一个基于Tailwind CSS的组件库，本文将介绍如何使用shadcn/ui构建美观且一致的用户界面。",
    author: {
      name: "王五",
      avatar: "/avatars/03.png",
    },
    date: "2023-04-03",
    readTime: "6分钟",
    tags: ["UI", "Tailwind CSS", "组件库"],
  },
];

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/blog");
      }
    };

    checkAuthStatus();
  }, [router]);

  return (
    <div className="container mx-auto py-10">
      <section className="flex flex-col items-center justify-center text-center py-12 sm:py-16 md:py-20 space-y-4 sm:space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          欢迎来到 Keep Thinking
        </h1>
        <TypewriterEffect 
          text="一个现代化的多人博客平台，支持暗色/亮色模式，响应式设计，以及代码高亮。"
          className="max-w-[800px] text-muted-foreground text-base sm:text-lg md:text-xl px-4 min-h-[1.5em] whitespace-normal"
          delay={800}
          speed={30}
          loopInterval={5000}
        />
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/blog">浏览博客</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/login">登录</Link>
          </Button>
        </div>
      </section>

      <section className="py-8 sm:py-10 px-4 sm:px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">最新博客</h2>
          <Button asChild variant="ghost" className="w-full sm:w-auto">
            <Link href="/blog">查看全部</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </section>
    </div>
  );
}

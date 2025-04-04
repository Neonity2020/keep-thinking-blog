"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
          <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tight">出错了</h1>
            <h2 className="mt-4 text-2xl font-semibold">发生了一些问题</h2>
            <p className="mt-2 text-muted-foreground">
              抱歉，应用程序出现了一些问题。我们的技术团队已经收到通知，正在努力修复。
            </p>
            <div className="mt-8 flex gap-4">
              <Button onClick={() => reset()}>重试</Button>
              <Button variant="outline" asChild>
                <Link href="/">返回首页</Link>
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 
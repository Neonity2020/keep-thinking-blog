import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">关于我们</h1>
          <p className="text-muted-foreground">
            了解更多关于Keep Thinking博客平台的信息
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>我们的使命</CardTitle>
              <CardDescription>
                为创作者提供一个分享知识和经验的平台
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Keep Thinking致力于为创作者提供一个现代化、易用的博客平台，让他们能够轻松地分享知识、经验和见解。我们相信，知识的分享和传播能够促进个人和社会的进步。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>我们的愿景</CardTitle>
              <CardDescription>
                成为最受欢迎的多人博客平台
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                我们希望通过持续的技术创新和用户体验优化，成为最受欢迎的多人博客平台，为创作者和读者提供最佳的内容创作和阅读体验。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">我们的团队</h2>
          <p className="text-muted-foreground">
            认识一下我们的核心团队成员
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>张三</CardTitle>
              <CardDescription>创始人 & 首席执行官</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                拥有10年的Web开发经验，热衷于创建用户友好的应用程序。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>李四</CardTitle>
              <CardDescription>技术总监</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                专注于前端技术和用户体验设计，致力于打造高性能的Web应用。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>王五</CardTitle>
              <CardDescription>产品经理</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                负责产品规划和用户需求分析，确保产品满足用户的实际需求。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight">加入我们</h2>
          <p className="max-w-[600px] text-muted-foreground">
            我们正在寻找热爱技术和创新的伙伴加入我们的团队。如果你对加入我们感兴趣，请点击下面的按钮了解更多信息。
          </p>
          <Button asChild>
            <Link href="/contact">联系我们</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 
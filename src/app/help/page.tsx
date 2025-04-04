import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">帮助中心</h1>
          <p className="text-muted-foreground">
            查找常见问题的答案，了解如何使用我们的平台
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="搜索帮助文章..." />
            <Button type="submit">搜索</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>开始使用</CardTitle>
              <CardDescription>
                了解如何开始使用Keep Thinking博客平台
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/help/getting-started" className="text-sm text-muted-foreground hover:underline">
                如何创建账户
              </Link>
              <Link href="/help/profile" className="text-sm text-muted-foreground hover:underline">
                如何设置个人资料
              </Link>
              <Link href="/help/navigation" className="text-sm text-muted-foreground hover:underline">
                平台导航指南
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>博客管理</CardTitle>
              <CardDescription>
                学习如何创建和管理您的博客文章
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/help/writing" className="text-sm text-muted-foreground hover:underline">
                如何写博客文章
              </Link>
              <Link href="/help/formatting" className="text-sm text-muted-foreground hover:underline">
                文章格式指南
              </Link>
              <Link href="/help/media" className="text-sm text-muted-foreground hover:underline">
                如何添加媒体内容
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>账户设置</CardTitle>
              <CardDescription>
                管理您的账户设置和偏好
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/help/security" className="text-sm text-muted-foreground hover:underline">
                账户安全设置
              </Link>
              <Link href="/help/notifications" className="text-sm text-muted-foreground hover:underline">
                通知设置
              </Link>
              <Link href="/help/privacy" className="text-sm text-muted-foreground hover:underline">
                隐私设置
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>互动功能</CardTitle>
              <CardDescription>
                了解如何与其他用户互动
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/help/comments" className="text-sm text-muted-foreground hover:underline">
                评论系统指南
              </Link>
              <Link href="/help/following" className="text-sm text-muted-foreground hover:underline">
                关注其他作者
              </Link>
              <Link href="/help/sharing" className="text-sm text-muted-foreground hover:underline">
                分享文章
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>高级功能</CardTitle>
              <CardDescription>
                探索平台的高级功能
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/help/analytics" className="text-sm text-muted-foreground hover:underline">
                数据分析
              </Link>
              <Link href="/help/seo" className="text-sm text-muted-foreground hover:underline">
                SEO优化
              </Link>
              <Link href="/help/api" className="text-sm text-muted-foreground hover:underline">
                API使用指南
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>故障排除</CardTitle>
              <CardDescription>
                解决常见问题和错误
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href="/help/errors" className="text-sm text-muted-foreground hover:underline">
                常见错误解决
              </Link>
              <Link href="/help/performance" className="text-sm text-muted-foreground hover:underline">
                性能优化
              </Link>
              <Link href="/help/support" className="text-sm text-muted-foreground hover:underline">
                联系技术支持
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">常见问题</h2>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>如何开始写博客？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  注册账户后，点击&quot;写文章&quot;按钮即可开始创作。您可以使用我们的富文本编辑器来编写和格式化您的文章。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>如何修改已发布的文章？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  在您的仪表板中找到要修改的文章，点击&quot;编辑&quot;按钮即可进行修改。修改完成后，点击&quot;更新&quot;按钮保存更改。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>如何删除我的账户？</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  您可以在账户设置中找到&quot;删除账户&quot;选项。请注意，删除账户是永久性的，所有数据将被删除且无法恢复。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">需要更多帮助？</h2>
          <p className="text-muted-foreground">
            如果您没有找到需要的答案，请通过以下方式联系我们：
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/contact">联系我们</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">查看所有常见问题</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
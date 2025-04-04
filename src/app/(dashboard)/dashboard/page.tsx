import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// 模拟博客数据
const blogs = [
  {
    id: "1",
    title: "使用Next.js和MongoDB构建现代博客应用",
    status: "已发布",
    date: "2023-04-01",
    views: 1200,
  },
  {
    id: "2",
    title: "Lexical编辑器：构建富文本编辑器的现代解决方案",
    status: "草稿",
    date: "2023-04-02",
    views: 0,
  },
  {
    id: "3",
    title: "使用shadcn/ui构建美观的用户界面",
    status: "已发布",
    date: "2023-04-03",
    views: 800,
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">仪表盘</h1>
          <p className="text-muted-foreground">
            管理您的博客文章和账户设置
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总博客数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已发布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">草稿</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总浏览量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,000</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">我的博客</h2>
          <Button asChild>
            <Link href="/blog/new">创建博客</Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  发布于 {blog.date} · {blog.views} 次浏览
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      blog.status === "已发布"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/blog/${blog.id}`}>查看</Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/blog/${blog.id}/edit`}>编辑</Link>
                  </Button>
                  <Button variant="destructive">删除</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
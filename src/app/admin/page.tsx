import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// 模拟用户数据
const users = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "超级管理员",
    status: "活跃",
    joinDate: "2023-01-01",
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    role: "内容管理员",
    status: "活跃",
    joinDate: "2023-02-01",
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@example.com",
    role: "注册用户",
    status: "活跃",
    joinDate: "2023-03-01",
  },
  {
    id: "4",
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "注册用户",
    status: "禁用",
    joinDate: "2023-04-01",
  },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">管理员控制台</h1>
          <p className="text-muted-foreground">
            管理用户、内容和系统设置
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总博客数</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总浏览量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,000</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">用户管理</h2>
          <Button asChild>
            <Link href="/admin/invite">邀请用户</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-96">
              <Input
                type="search"
                placeholder="搜索用户..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">导出</Button>
              <Button variant="outline">导入</Button>
            </div>
          </div>

          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>
                    {user.email} · 加入于 {user.joinDate}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.status === "活跃"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {user.status}
                    </span>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                      {user.role}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/admin/users/${user.id}`}>查看</Link>
                  </Button>
                  <Button variant="outline">编辑</Button>
                  {user.status === "活跃" ? (
                    <Button variant="destructive">禁用</Button>
                  ) : (
                    <Button variant="default">启用</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">联系我们</h1>
          <p className="text-muted-foreground">
            如果您有任何问题、建议或合作意向，请随时与我们联系
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
              <CardDescription>
                您可以通过以下方式联系我们
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">邮箱</h3>
                <p className="text-muted-foreground">contact@keepthinking.com</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">电话</h3>
                <p className="text-muted-foreground">+86 123 4567 8900</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">地址</h3>
                <p className="text-muted-foreground">
                  北京市海淀区中关村大街1号
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">工作时间</h3>
                <p className="text-muted-foreground">
                  周一至周五: 9:00 - 18:00
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>发送消息</CardTitle>
              <CardDescription>
                填写下面的表单，我们会尽快回复您
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  姓名
                </label>
                <Input
                  id="name"
                  placeholder="您的姓名"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  邮箱
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  主题
                </label>
                <Input
                  id="subject"
                  placeholder="消息主题"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  消息
                </label>
                <Textarea
                  id="message"
                  placeholder="您的消息..."
                  required
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">发送消息</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">常见问题</h2>
          <p className="text-muted-foreground">
            以下是一些常见问题的解答
          </p>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>如何注册成为博客作者？</CardTitle>
              <CardDescription>
                您可以通过点击网站右上角的"注册"按钮，填写相关信息完成注册。注册后，您需要等待管理员审核通过才能开始发布博客。
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>如何提交博客文章？</CardTitle>
              <CardDescription>
                登录后，点击"创建博客"按钮，使用我们的编辑器编写博客内容，完成后点击"发布"按钮提交。您的博客需要经过管理员审核后才能公开显示。
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>如何修改我的个人信息？</CardTitle>
              <CardDescription>
                登录后，点击右上角的头像，选择"设置"选项，您可以在设置页面修改您的个人信息、密码等。
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
} 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">常见问题</h1>
          <p className="text-muted-foreground">
            查找关于Keep Thinking博客平台的常见问题答案
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="搜索常见问题..." />
            <Button type="submit">搜索</Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>账户相关</CardTitle>
              <CardDescription>
                关于账户注册、登录和管理的问题
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何注册账户？</h3>
                <p className="text-muted-foreground">
                  点击网站右上角的&quot;注册&quot;按钮，填写您的姓名、电子邮件和密码即可完成注册。您也可以使用GitHub或Google账号快速注册。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">忘记密码怎么办？</h3>
                <p className="text-muted-foreground">
                  在登录页面点击&quot;忘记密码&quot;，输入您的注册邮箱，我们将向您发送重置密码的链接。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何修改个人信息？</h3>
                <p className="text-muted-foreground">
                  登录后，点击右上角的头像，选择&quot;个人设置&quot;，在这里您可以修改个人信息、头像等。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>博客写作</CardTitle>
              <CardDescription>
                关于创建和发布博客文章的问题
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何创建新文章？</h3>
                <p className="text-muted-foreground">
                  登录后，点击&quot;写文章&quot;按钮，使用我们的富文本编辑器编写文章。您可以添加标题、正文、图片等内容。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">支持哪些文章格式？</h3>
                <p className="text-muted-foreground">
                  我们支持Markdown和富文本格式。您可以使用编辑器工具栏来格式化文本，添加链接、图片等。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何添加标签和分类？</h3>
                <p className="text-muted-foreground">
                  在编辑文章时，您可以在右侧边栏添加标签和选择分类。标签帮助读者更容易找到您的文章。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>文章管理</CardTitle>
              <CardDescription>
                关于管理和编辑已发布文章的问题
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何修改已发布的文章？</h3>
                <p className="text-muted-foreground">
                  在您的仪表板中找到要修改的文章，点击&quot;编辑&quot;按钮即可进行修改。修改完成后点击&quot;更新&quot;保存更改。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何删除文章？</h3>
                <p className="text-muted-foreground">
                  在文章编辑页面或仪表板中，点击&quot;删除&quot;按钮即可删除文章。请注意，删除操作不可恢复。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何查看文章数据？</h3>
                <p className="text-muted-foreground">
                  在仪表板中，您可以查看每篇文章的阅读量、评论数等数据。点击文章标题进入详情页面查看更多数据。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>互动功能</CardTitle>
              <CardDescription>
                关于评论、关注和分享功能的问题
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何管理评论？</h3>
                <p className="text-muted-foreground">
                  在文章详情页面，您可以查看和管理所有评论。您可以回复、删除或标记评论为垃圾信息。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何关注其他作者？</h3>
                <p className="text-muted-foreground">
                  访问作者的个人主页，点击&quot;关注&quot;按钮即可关注该作者。您可以在仪表板中查看关注作者的更新。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何分享文章？</h3>
                <p className="text-muted-foreground">
                  在文章页面，您可以使用分享按钮将文章分享到社交媒体，或复制文章链接分享给他人。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>其他问题</CardTitle>
              <CardDescription>
                其他常见问题
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何联系客服？</h3>
                <p className="text-muted-foreground">
                  您可以通过&quot;联系我们&quot;页面提交问题，或发送邮件至support@keepthinking.com。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">平台支持哪些语言？</h3>
                <p className="text-muted-foreground">
                  目前平台支持中文和英文。您可以在设置中切换界面语言。
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">如何举报不当内容？</h3>
                <p className="text-muted-foreground">
                  如果您发现任何不当内容，请点击内容下方的&quot;举报&quot;按钮，或通过&quot;联系我们&quot;页面提交举报。
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">没有找到答案？</h2>
          <p className="text-muted-foreground">
            如果您还有其他问题，请通过以下方式联系我们：
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/contact">联系我们</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help">访问帮助中心</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">加载中</h2>
        <p className="mt-2 text-muted-foreground">
          请稍候，我们正在加载页面内容...
        </p>
      </div>
    </div>
  );
} 
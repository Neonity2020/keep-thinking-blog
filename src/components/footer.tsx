import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Keep Thinking. 保留所有权利。
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
            隐私政策
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
            使用条款
          </Link>
        </div>
      </div>
    </footer>
  );
} 
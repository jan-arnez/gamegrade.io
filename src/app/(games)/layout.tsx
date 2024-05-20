import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type PlatformLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: PlatformLayoutProps) {
  return (
    <>
      <Link href="/platform">
        <Button
          className="absolute left-6 top-6 flex items-center justify-center"
          variant="outline"
          size="icon"
        >
          <ChevronLeft strokeWidth={1.5} />
        </Button>
      </Link>
      <main className="flex h-screen w-full items-center justify-center px-6">
        {children}
      </main>
      <div className="absolute bottom-6 right-6 opacity-30">
        <Logo color="white" />
      </div>
    </>
  );
}

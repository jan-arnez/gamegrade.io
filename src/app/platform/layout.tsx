import { Toaster } from "@/components/ui/toaster";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

type PlatformLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: PlatformLayoutProps) {
  return (
    <div className="h-screen min-h-screen">
      <Navbar />
      <div className="flex h-full w-full pt-20">
        <Sidebar />
        <main className="h-full w-full p-6 lg:ml-[280px]">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}

"use client";
import { cn } from "@/lib/utils";
import { BookOpen, Database, History, Home, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] flex-col justify-between border-r bg-muted px-6 pb-6 pt-[104px] lg:flex">
      <div className="flex w-full flex-col gap-y-3">
        <SidebarLink label="Home" href="/platform" icon={Home} />
        {/* <SidebarLink
          label="Favourite Games"
          href="/platform/favourite-games"
          icon={Star}
        /> */}
        <SidebarLink
          label="Data Source"
          href="/platform/data-source"
          icon={Database}
        />
        <SidebarLink
          label="Generation History"
          href="/platform/generation-history"
          icon={History}
        />
        <SidebarLink
          label="Token Store"
          href="/platform/token-store"
          icon={Store}
        />
        <SidebarLink
          label="Tutorial"
          href="/platform/tutorial"
          icon={BookOpen}
        />
      </div>
    </div>
  );
};

type SidebarLinkProps = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const SidebarLink = ({ href, label, icon: Icon }: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive = (path?: string) => {
    return pathname === path;
  };

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex w-full items-center gap-x-3 rounded-md border border-transparent p-3 transition-colors hover:bg-accent",
          isActive(href) && "bg-primary",
        )}
      >
        <Icon strokeWidth={1.5} />
        <span className="text-regular text-foreground">{label}</span>
      </div>
    </Link>
  );
};
export default Sidebar;

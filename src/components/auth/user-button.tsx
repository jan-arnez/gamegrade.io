import { signOut } from "@/auth";
import { ChevronDown, LogOut } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserButton = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex w-[200px] items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="relative aspect-square h-10 w-10 overflow-hidden rounded-full bg-primary">
              <Image
                src={user.image || ""}
                fill
                alt=""
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs">{String(user.tokens || 0)} tokens</div>
            </div>
          </div>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] bg-background">
        <DropdownMenuLabel>My Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/settings" className="cursor-pointer">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/platform" });
            }}
          >
            <button type="submit" className="flex w-full items-center gap-x-3">
              <LogOut className="h-4 w-4" />
              <div className="font-medium">Sign Out</div>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

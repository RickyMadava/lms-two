"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemOnProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItemOn = ({ icon: Icon, label, href }: SidebarItemOnProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-lime-600 hover:bg-lime-600/10",
        isActive &&
          "text-lime-700 bg-lime-600/20 hover:bg-lime-600/20 hover:text-lime-600"
      )}
    >
      <div className="flex items-center gap-x-2 py-[18px]">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-lime-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-lime-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItemOn;

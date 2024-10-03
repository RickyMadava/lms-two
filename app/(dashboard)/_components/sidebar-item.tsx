"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SidebarItem = ({ icon, label, href }: SidebarItemProps) => {
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
    <Tooltip key={href} delayDuration={300}>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          type="button"
          className={cn(
            "w-12 h-12 flex items-center justify-center hover:text-slate-600 hover:bg-white/20",
            isActive &&
              "text-sky-700 bg-white/20 hover:bg-white/30 hover:text-sky-700 border-2 rounded-xl border-sky-700/30 transition-all duration-200 ease-in-out"
          )}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SidebarItem;

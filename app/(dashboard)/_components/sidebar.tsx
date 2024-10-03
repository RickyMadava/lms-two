"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import SidebarRoutes from "./sidebar-routes";
import Navbar from "./navbar";
import { cn } from "@/lib/utils";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    const top = window.scrollY;
    if (top > 80) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  const guestRoutes = [
    {
      icon: <Layout />,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: <Compass />,
      label: "Browser",
      href: "/search",
    },
  ];

  const teacherRoutes = [
    {
      icon: <List />,
      label: "Courses",
      href: "/teacher/courses",
    },
    {
      icon: <BarChart />,
      label: "Analytics",
      href: "/teacher/analytics",
    },
  ];

  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <TooltipProvider>
      <div className="h-[80px] fixed inset-y-0 w-full z-20">
        <Navbar
          className={cn(
            "transition-all duration-300 ease-in-out",
            isBlurred &&
              "backdrop-blur-sm bg-white/40 lg:ml-20 lg:mr-4 shadow-md"
          )}
        />
      </div>
      <div className="">
        <div className="fixed left-0 top-0 h-full w-16 bg-gray-50/40 flex flex-col items-center py-4 space-y-3 z-30">
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`w-12 h-12 mb-4 transition-all duration-300 ease-in-out ${
                  isOpen && "text-slate-500 bg-lime-600/20"
                }`}
                onClick={toggleSidebar}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{isOpen ? "Fermer le menu" : "Ouvrir le menu"}</p>
            </TooltipContent>
          </Tooltip>
          {routes.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>

        <div
          className={`fixed ml-16 top-[90px] transition-all duration-300 ease-in-out ${
            isOpen ? "w-[280px] opacity-100" : "w-0 opacity-0"
          } overflow-hidden z-10`}
        >
          {isOpen && <SidebarRoutes />}
        </div>
        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? "ml-[360px]" : "ml-20"
          } p-2 bg-white rounded-2xl m-4 mt-4`}
        >
          <main className="mb-32 h-[calc(100vh-250px)]">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}

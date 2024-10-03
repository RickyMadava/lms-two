"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto lg:mr-10">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button
            size="sm"
            variant="ghost"
            className="transition-all duration-300 ease-in-out hover:bg-lime-600/20 hover:font-semibold"
          >
            <LogOut className="h-4 w-4 mr-2 " />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button
            size="sm"
            variant="ghost"
            className="transition-all duration-300 ease-in-out hover:bg-lime-600/20 hover:font-semibold"
          >
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
};

export default NavbarRoutes;

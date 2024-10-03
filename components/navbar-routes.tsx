"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NavbarRoutes = () => {
  return (
    <div className="flex gap-x-2 ml-auto lg:mr-10">
      <Button
        size="sm"
        variant="ghost"
        className="transition-all duration-300 ease-in-out hover:bg-lime-600/20 hover:font-semibold"
      >
        Teacher mode
      </Button>

      <UserButton />
    </div>
  );
};

export default NavbarRoutes;

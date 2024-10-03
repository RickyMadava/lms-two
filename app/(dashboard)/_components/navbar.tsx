import React from "react";
// import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
import Logo from "./logo";
import { cn } from "@/lib/utils";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("p-4 flex items-center ", className)}>
      <Logo className="pl-16 md:pl-24" size={100} />
      {/* <MobileSidebar /> */}
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;

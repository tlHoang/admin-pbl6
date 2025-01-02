'use client';
import React from "react";
import VerticalHeader from "../ui/admin/VerticalHeader";
import Header from "../ui/admin/Header";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  return (
    <div className="flex">
      {!isLoginPage && <Header />}
      {!isLoginPage && <VerticalHeader />}
      <div className={clsx("flex-1", { "ml-64": !isLoginPage })}>
        {children}
      </div>
      {/* <div className="flex-1 ml-64">
        {children}
      </div> */}
    </div>
  );
};

export default UserLayout;
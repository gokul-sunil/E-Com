// LayoutAdmin.tsx
"use client";

import React, { ReactNode } from "react";
import Sidebar from "./SidebarComponent";
import Header from "./HeaderAdmin";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Dashboard",
  subtitle = "Welcome back, Admin.",
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-teal-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 overflow-hidden">
        <Header title={title} subtitle={subtitle} />

        <main className="p-6 overflow-y-auto h-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

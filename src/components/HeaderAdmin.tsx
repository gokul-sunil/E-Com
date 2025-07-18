'use client';

import React from "react";
import { Bell } from "lucide-react";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        {/* Title and subtitle */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>

        {/* Notification and avatar */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-800">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

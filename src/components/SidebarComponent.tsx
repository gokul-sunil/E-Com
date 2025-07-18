"use cliet"
import React, { useState } from "react";
import {
  Home,
  Users,
  Grid3x3,
  Package,
  Archive,
  CreditCard,
  ShoppingCart,
} from "lucide-react";


type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

// Sidebar Component
const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    { name: "Dashboard", icon: Home, active: true },
    { name: "Staff", icon: Users, active: false },
    { name: "Categories", icon: Grid3x3, active: false },
    { name: "Products", icon: Package, active: false },
    { name: "Stocks", icon: Archive, active: false },
    { name: "Orders", icon: ShoppingCart, active: false },
    { name: "Payments", icon: CreditCard, active: false },
  ];

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out relative`}
    >
      {/* Logo */}
      <div
        className={`p-6 border-b border-gray-200 ${isCollapsed ? "px-4" : ""}`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Home className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="transition-opacity duration-200">
              <h1 className="font-bold text-gray-800">JPR Traders</h1>
              <p className="text-sm text-gray-600">Premium quality product</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`p-4 space-y-2 ${isCollapsed ? "px-2" : ""}`}>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.name === activeTab;

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center px-3" : "space-x-3 px-4"
              } py-3 rounded-lg text-left transition-all duration-200 relative group ${
                isActive
                  ? "bg-teal-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title={isCollapsed ? item.name : ""}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium transition-opacity duration-200">
                  {item.name}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <div
        className={`absolute bottom-6 ${
          isCollapsed ? "left-1/2 transform -translate-x-1/2" : "left-6"
        } transition-all duration-300`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 bg-white/50 hover:bg-white/80 p-2 rounded-lg shadow-md transition-all duration-200"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <div
            className={`transform transition-transform duration-200 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </div>
          {!isCollapsed && <span className="font-medium">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

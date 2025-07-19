"use client";

import React, { useState } from "react";
import Layout from "./LayoutAdmin";
import DashboardContent from "./Dashboard";
import ProductsContent from "./ProductContent";
import OrdersContent from "./OrdersContent";
import StaffManagement from "./Staffmanagement";
import CategoryManagement from "./CategoryManagent";

const App = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardContent />;
      case "Staff":
        return <StaffManagement />;
      case "Categories":
        return <CategoryManagement />;
      case "Products":
        return <ProductsContent />;
      case "Orders":
        return <OrdersContent />;
      default:
        return (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {activeTab}
            </h3>
            <p className="text-gray-600">
              This is the {activeTab} page content. Add your components here!
            </p>
          </div>
        );
    }
  };

  const getPageTitle = () => activeTab;

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "Dashboard":
        return "Welcome back, Admin.";
      case "Products":
        return "Manage your inventory and products.";
      case "Orders":
        return "Track and manage customer orders.";
      default:
        return `Manage your ${activeTab.toLowerCase()}.`;
    }
  };

  return (
    <Layout
      title={getPageTitle()}
      subtitle={getPageSubtitle()}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;

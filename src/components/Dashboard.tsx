"use client"
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Grid3x3, 
  Package, 
  Archive, 
  CreditCard, 
  ShoppingCart,
  Bell,
  TrendingUp,
  Eye,
  DollarSign,
  AlertTriangle,
  Settings
} from 'lucide-react';


const DashboardContent = () => {
  const statsCards = [
    {
      title: 'Total Sales (Today)',
      value: '₹47,000.00',
      change: '+12%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-white'
    },
    {
      title: 'New Orders',
      value: '32',
      link: 'View Details',
      icon: ShoppingCart,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Pending EMIs',
      value: '8',
      link: 'View Payments',
      icon: CreditCard,
      color: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      title: 'Low Stock',
      value: '15',
      link: 'Manage Stocks',
      icon: AlertTriangle,
      color: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ];

  const activities = [
    {
      type: 'payment',
      message: 'New payment of ₹2000 received from John Doe.',
      time: '2 minutes ago',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'order',
      message: 'Order #11562 has been delivered.',
      time: '15 minutes ago',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      type: 'stock',
      message: "3 new items added to stock: 'Modern Sofa'.",
      time: '1 hour ago',
      icon: Package,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      type: 'customer',
      message: 'A new customer account was created.',
      time: '3 hours ago',
      icon: Users,
      color: 'bg-pink-100 text-pink-600'
    },
    {
      type: 'alert',
      message: "Stock for 'Oak Dining Table' is low.",
      time: 'Yesterday 3:45 pm',
      icon: AlertTriangle,
      color: 'bg-red-100 text-red-600'
    },
    {
      type: 'payment',
      message: 'New payment of ₹1300 received from Jacob.',
      time: '01-07-2025 6:30 am',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      type: 'stock',
      message: "12 new items added to stock: 'Plastic Chairs'.",
      time: '01-07-2025 6:00 am',
      icon: Package,
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          
          return (
            <div key={index} className={`${card.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.iconColor ? `${card.color} ${card.iconColor}` : 'bg-teal-100 text-teal-600'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {card.change && (
                  <span className="flex items-center text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {card.change}
                  </span>
                )}
              </div>
              
              <h3 className="text-gray-600 text-sm font-medium mb-2">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mb-3">{card.value}</p>
              
              {card.link && (
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                  {card.link}
                  <Eye className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activities</h3>
        
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            
            return (
              <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className={`p-2 rounded-full ${activity.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.message}</p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
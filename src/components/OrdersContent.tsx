"use client"
import React, { useState, ReactNode } from "react";

const OrdersContent = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Orders Management</h3>
      <p className="text-gray-600">This is where your orders content would go...</p>
      
      <div className="mt-6 space-y-4">
        {[1, 2, 3, 4, 5].map((order) => (
          <div key={order} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-800">Order #{11560 + order}</h4>
              <p className="text-sm text-gray-600">Customer: John Doe</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">₹{(Math.random() * 10000 + 1000).toFixed(2)}</p>
              <p className="text-sm text-green-600">Completed</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersContent
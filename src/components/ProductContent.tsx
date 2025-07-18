"use client"


import React, { useState, ReactNode } from "react";


const ProductsContent = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Products Management</h3>
      <p className="text-gray-600">This is where your products content would go...</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800">Product {item}</h4>
            <p className="text-sm text-gray-600 mt-2">Product description...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsContent
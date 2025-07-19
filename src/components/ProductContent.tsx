"use client";

import React, { useState } from "react";
import { Search, Plus, Eye, Edit } from "lucide-react";

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Chairs",
    price: "",
    emiPrice: "",
    status: true,
    description: "",
    image: "🪑",
  });

  const [productData, setProductData] = useState([
    {
      id: "PR-001",
      name: "Elegant Wooden Chair",
      category: "Chairs",
      price: 2500,
      emiPrice: 2900,
      status: "Active",
      image: "🪑",
    },
    {
      id: "PR-002",
      name: "Minimalist Coffee Table",
      category: "Tables",
      price: 2500,
      emiPrice: 2900,
      status: "Inactive",
      image: "🪑",
    },
    {
      id: "PR-003",
      name: "Cozy Fabric Sofa",
      category: "Sofas",
      price: 2500,
      emiPrice: 2900,
      status: "Active",
      image: "🪑",
    },
    {
      id: "PR-004",
      name: "Modern Desk Lamp",
      category: "Lighting",
      price: 2500,
      emiPrice: 2900,
      status: "Active",
      image: "🪑",
    },
    {
      id: "PR-005",
      name: "Vintage Bookshelf",
      category: "Storage",
      price: 2500,
      emiPrice: 2900,
      status: "Active",
      image: "🪑",
    },
  ]);

  const categories = [
    "All",
    "Chairs",
    "Tables",
    "Sofas",
    "Lighting",
    "Storage",
  ];

  const filteredProducts = productData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Chairs: "bg-cyan-100 text-cyan-700",
      Tables: "bg-cyan-100 text-cyan-700",
      Sofas: "bg-cyan-100 text-cyan-700",
      Lighting: "bg-cyan-100 text-cyan-700",
      Storage: "bg-cyan-100 text-cyan-700",
    };

    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getStatusColor = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const toggleCategoryStatus = (productId: string) => {
    setProductData((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === "Active" ? "Inactive" : "Active",
            }
          : product
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6 mb-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-end items-center mb-8">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-80"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Product
            </button>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">
              Filter by category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Product Name
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Product ID
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    EMI Price
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl">
                          {product.image}
                        </div>
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{product.id}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                          product.category
                        )}`}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-semibold">
                      ₹{product.price}
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-semibold">
                      ₹{product.emiPrice}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleCategoryStatus(product.id)}
                          className={`h-6 w-11 flex items-center rounded-full transition-colors ${
                            product.status === "Active"
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        >
                          <span
                            className={`h-4 w-4 rounded-full bg-white transform transition-transform ${
                              product.status === "Active"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                        <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (static for now) */}
          <div className="flex justify-between items-center py-4 px-6 border-t border-gray-200 bg-gray-50/50">
            <div className="text-gray-600">
              Showing {Math.min(6, filteredProducts.length)} to{" "}
              {Math.min(10, filteredProducts.length)} of{" "}
              {filteredProducts.length} results
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 text-gray-700 transition-colors"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl p-6">
            <h2 className="text-xl text-center font-semibold mb-4">
              Add New Product
            </h2>

            {/* Modal content - Responsive */}
            <div className="flex flex-col md:flex-row justify-between gap-6">
              {/* Image Section */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-6xl mb-4">
                  {newProduct.image}
                </div>
                <button className="bg-teal-500 text-white px-6 py-2 rounded-full">
                  Select
                </button>
              </div>

              {/* Form Section */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Product Name */}
                  <div>
                    <label className="text-sm text-gray-600">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-xl"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-sm text-gray-600">Category</label>
                    <select
                      className="w-full px-3 py-2 border rounded-xl"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                    >
                      {categories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-sm text-gray-600">Price</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-xl"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                    />
                  </div>

                  {/* EMI Price */}
                  <div>
                    <label className="text-sm text-gray-600">EMI Price</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border rounded-xl"
                      value={newProduct.emiPrice}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          emiPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm text-gray-600">Status</label>
                  <div
                    onClick={() =>
                      setNewProduct((prev) => ({
                        ...prev,
                        status: !prev.status,
                      }))
                    }
                    className={`w-12 h-6 flex items-center rounded-full px-1 cursor-pointer transition-colors duration-300 ${
                      newProduct.status ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                        newProduct.status ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-sm">
                    {newProduct.status ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="text-sm text-gray-600">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border rounded-xl"
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const newEntry = {
                        id: `PR-${(productData.length + 1)
                          .toString()
                          .padStart(3, "0")}`,
                        ...newProduct,
                        status: newProduct.status ? "Active" : "Inactive",
                        price: Number(newProduct.price),
                        emiPrice: Number(newProduct.emiPrice),
                      };
                      setProductData((prev) => [...prev, newEntry]);
                      setShowAddModal(false);
                      setNewProduct({
                        name: "",
                        category: "Chairs",
                        price: "",
                        emiPrice: "",
                        status: true,
                        description: "",
                        image: "🪑",
                      });
                    }}
                    className="px-6 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

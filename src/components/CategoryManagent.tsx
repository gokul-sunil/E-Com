"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Eye,
  ToggleLeft,
  ToggleRight,
  Sofa,
  UtensilsCrossed,
  Armchair,
  Table,
  Bed,
  ChevronLeft,
  ChevronRight,
  Package
} from "lucide-react";

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [categoryData, setCategoryData] = useState([
    { id: "CAT-001", name: "Sofas", icon: "sofa", productCount: 124, status: "Active" },
    { id: "CAT-002", name: "Dining Tables", icon: "dining", productCount: 35, status: "Inactive" },
    { id: "CAT-003", name: "Chairs", icon: "chair", productCount: 65, status: "Active" },
    { id: "CAT-004", name: "Tables", icon: "table", productCount: 48, status: "Active" },
    { id: "CAT-005", name: "Beds", icon: "bed", productCount: 67, status: "Active" },
    { id: "CAT-006", name: "Wardrobes", icon: "wardrobe", productCount: 23, status: "Inactive" },
    { id: "CAT-007", name: "Desks", icon: "desk", productCount: 41, status: "Active" },
    { id: "CAT-008", name: "Cabinets", icon: "cabinet", productCount: 29, status: "Active" },
  ]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "sofa":
        return <Sofa className="w-5 h-5" />;
      case "dining":
        return <UtensilsCrossed className="w-5 h-5" />;
      case "chair":
        return <Armchair className="w-5 h-5" />;
      case "table":
        return <Table className="w-5 h-5" />;
      case "bed":
        return <Bed className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const toggleCategoryStatus = (categoryId: string) => {
    setCategoryData(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, status: cat.status === "Active" ? "Inactive" : "Active" }
          : cat
      )
    );
  };

  const handleEditCategory = (categoryId: string) => {
    console.log("Edit category:", categoryId);
  };

  const handleViewCategory = (categoryId: string) => {
    console.log("View category:", categoryId);
  };

  const filteredCategories = useMemo(() => {
    return categoryData.filter(
      cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryData, searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);
  const totalResults = filteredCategories.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen  flex flex-col">
   
      

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col mb-20">
        {/* Search + Add */}
        <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search categories"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full bg-white/90 backdrop-blur-sm text-gray-900 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-lg"
            />
          </div>
          <button className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-3 rounded-2xl flex items-center space-x-2 hover:from-teal-500 hover:to-cyan-600 shadow-lg whitespace-nowrap">
            <Plus className="w-5 h-5" />
            <span>Add New Category</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl flex-1 flex flex-col overflow-hidden">
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Icon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">No. of products</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentCategories.length > 0 ? (
                  currentCategories.map(category => (
                    <tr key={category.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-5">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                          {getIcon(category.icon)}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-5 text-gray-600">{category.id}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                          {category.productCount}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            category.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleCategoryStatus(category.id)}
                            className={`h-6 w-11 flex items-center rounded-full transition-colors ${
                              category.status === "Active"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                          >
                            <span
                              className={`h-4 w-4 rounded-full bg-white transform transition-transform ${
                                category.status === "Active" ? "translate-x-6" : "translate-x-1"
                              }`}
                            />
                          </button>
                          <button
                            onClick={() => handleEditCategory(category.id)}
                            className="p-2 hover:bg-blue-50 rounded-full group"
                          >
                            <Edit className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                          </button>
                          <button
                            onClick={() => handleViewCategory(category.id)}
                            className="p-2 hover:bg-green-50 rounded-full group"
                          >
                            <Eye className="w-5 h-5 text-gray-500 group-hover:text-green-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No categories found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalResults > 0 && (
            <div className="border-t border-gray-200 bg-white/80 px-6 py-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, totalResults)} of {totalResults} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm rounded-xl flex items-center space-x-1 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="hidden sm:flex items-center space-x-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm rounded-xl ${
                            currentPage === page
                              ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg"
                              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <div className="sm:hidden text-sm text-gray-600 px-3 py-2 bg-gray-50 rounded-xl">
                    {currentPage} / {totalPages}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm rounded-xl flex items-center space-x-1 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-600"
                    }`}
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;

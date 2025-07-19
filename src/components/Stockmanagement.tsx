import React, { useState, useMemo, useEffect } from 'react';
import {
    Search,
    Grid3X3,
    Users,
    Activity,
    ShoppingBag,
    FileText,
    Package,
    Eye,
    Plus,
    ChevronDown,
} from 'lucide-react';

const StockManagement = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showLowStock, setShowLowStock] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const allProducts = [
        { id: 'PR-001', name: 'Elegant Wooden Chair', category: 'Chairs', price: 2900, stock: 25, status: 'In Stock', image: '🪑' },
        { id: 'PR-002', name: 'Minimalist Coffee Table', category: 'Tables', price: 2900, stock: 8, status: 'Limited Stock', image: '🪑' },
        { id: 'PR-003', name: 'Cozy Fabric Sofa', category: 'Sofas', price: 2900, stock: 0, status: 'Out of Stock', image: '🛋️' },
        { id: 'PR-004', name: 'Modern Desk Lamp', category: 'Lighting', price: 2900, stock: 12, status: 'In Stock', image: '💡' },
        { id: 'PR-005', name: 'Vintage Bookshelf', category: 'Storage', price: 2900, stock: 9, status: 'Limited Stock', image: '📚' },
        { id: 'PR-006', name: 'Executive Office Chair', category: 'Chairs', price: 4500, stock: 15, status: 'In Stock', image: '🪑' },
        { id: 'PR-007', name: 'Glass Dining Table', category: 'Tables', price: 5200, stock: 3, status: 'Limited Stock', image: '🪑' },
        { id: 'PR-008', name: 'LED Floor Lamp', category: 'Lighting', price: 1800, stock: 22, status: 'In Stock', image: '💡' },
        { id: 'PR-009', name: 'Leather Recliner Sofa', category: 'Sofas', price: 7800, stock: 5, status: 'Limited Stock', image: '🛋️' },
        { id: 'PR-010', name: 'Metal Storage Cabinet', category: 'Storage', price: 3200, stock: 0, status: 'Out of Stock', image: '🗄️' },
        { id: 'PR-011', name: 'Pendant Ceiling Light', category: 'Lighting', price: 2100, stock: 18, status: 'In Stock', image: '💡' },
        { id: 'PR-012', name: 'Wooden Dining Chair', category: 'Chairs', price: 1500, stock: 7, status: 'Limited Stock', image: '🪑' },
        { id: 'PR-013', name: 'Marble Side Table', category: 'Tables', price: 3800, stock: 11, status: 'In Stock', image: '🪑' },
        { id: 'PR-014', name: 'Corner Sofa Set', category: 'Sofas', price: 12000, stock: 2, status: 'Limited Stock', image: '🛋️' },
        { id: 'PR-015', name: 'Wall Mounted Shelf', category: 'Storage', price: 800, stock: 35, status: 'In Stock', image: '📚' },
        { id: 'PR-016', name: 'Task Desk Lamp', category: 'Lighting', price: 950, stock: 0, status: 'Out of Stock', image: '💡' },
        { id: 'PR-017', name: 'Bar Height Table', category: 'Tables', price: 4200, stock: 6, status: 'Limited Stock', image: '🪑' },
    ];

    const categories = ['All', ...new Set(allProducts.map(product => product.category))];

    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        if (searchQuery.trim()) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (showLowStock) {
            filtered = filtered.filter(product => product.stock <= 10);
        }

        return filtered;
    }, [searchQuery, selectedCategory, showLowStock]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);
    const totalItems = filteredProducts.length;

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory, showLowStock]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Stock':
                return 'bg-green-100 text-green-800';
            case 'Limited Stock':
                return 'bg-orange-100 text-orange-800';
            case 'Out of Stock':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryColor = (category: string): string => {
        const colors: Record<string, string> = {
            Chairs: 'bg-cyan-100 text-cyan-800',
            Tables: 'bg-blue-100 text-blue-800',
            Sofas: 'bg-purple-100 text-purple-800',
            Lighting: 'bg-yellow-100 text-yellow-800',
            Storage: 'bg-green-100 text-green-800',
        };

        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const goToPage = (page: number) => setCurrentPage(page);
    const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-teal-100 px-4 sm:px-6 lg:px-8">
            <div className="mb-20 py-8">

                {/* Search */}
                <div className="flex justify-end mb-6 flex-wrap gap-4">
                    <div className="relative w-full sm:w-80 max-w-md">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search a product"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-6 py-3 w-full text-black bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6 items-center">
                    <span className="text-gray-600">Filter by category:</span>
                    <div className="relative w-full sm:w-60">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="appearance-none w-full text-black bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>

                    <button
                        onClick={() => setShowLowStock(!showLowStock)}
                        className={`px-4 py-2 rounded-xl transition-colors w-full sm:w-auto ${showLowStock ? 'bg-red-500 text-white' : 'bg-white/70 text-red-500 border border-red-200 hover:bg-red-50'}`}
                    >
                        Show Low Stock Items
                    </button>

                    {(searchQuery || selectedCategory !== 'All' || showLowStock) && (
                        <div className="ml-auto bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm w-full sm:w-auto text-center">
                            {totalItems} result{totalItems !== 1 ? 's' : ''} found
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Product Name</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Product ID</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Category</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Price</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Stock Quantity</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                                    <th className="text-left py-4 px-6 font-medium text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {currentProducts.length > 0 ? (
                                    currentProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700">{product.image}</div>
                                                    <span className="font-medium text-gray-800">{product.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">{product.id}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>{product.category}</span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-800 font-medium">₹{product.price.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-gray-800 font-medium">{product.stock}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product.status)}`}>{product.status}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <button className="w-8 h-8 bg-teal-100 hover:bg-teal-200 rounded-lg flex items-center justify-center text-teal-600 transition-colors"><Plus className="w-4 h-4" /></button>
                                                    <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 transition-colors"><Eye className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-12 px-6 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <Package className="w-12 h-12 text-gray-300" />
                                                <p className="text-lg">No products found</p>
                                                <p className="text-sm">Try adjusting your search or filter criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalItems > 0 && (
                    <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
                        <p className="text-gray-600 w-full sm:w-auto text-center sm:text-left">
                            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center sm:justify-end w-full sm:w-auto">
                            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-white/70 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                            {getPageNumbers().map(pageNum => (
                                <button key={pageNum} onClick={() => goToPage(pageNum)} className={`w-10 h-10 rounded-lg ${pageNum === currentPage ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white' : 'bg-white/70 text-gray-600 hover:bg-gray-50'}`}>{pageNum}</button>
                            ))}
                            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-lg hover:from-teal-500 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StockManagement;

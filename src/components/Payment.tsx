import { useState, useMemo } from 'react';
import { Search, Plus, Eye, FileText, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Payment = () => {
    const [activeView, setActiveView] = useState('active');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Sample payment data - expanded for pagination demo
    const payments = [
        {
            id: 'OR-001',
            customerName: 'Mary Jane',
            orderDate: '2025-08-05',
            dueDate: '2025-08-05',
            totalAmount: 2900,
            dueAmount: 900,
            paymentType: 'EMI',
            status: 'Due',
            emiDetails: '15 Weeks EMI'
        },
        {
            id: 'OR-002',
            customerName: 'John Cena',
            orderDate: '2025-07-04',
            dueDate: '2025-07-04',
            totalAmount: 2900,
            dueAmount: 750,
            paymentType: 'EMI',
            status: 'Overdue',
            emiDetails: '7 Weeks EMI'
        },
        {
            id: 'OR-003',
            customerName: 'Cody Banks',
            orderDate: '2025-08-03',
            dueDate: '2025-08-03',
            totalAmount: 2900,
            dueAmount: 500,
            paymentType: 'EMI',
            status: 'Due',
            emiDetails: '10 Weeks EMI'
        },
        {
            id: 'OR-004',
            customerName: 'Mary Jane',
            orderDate: '2025-08-02',
            dueDate: '2025-08-02',
            totalAmount: 2900,
            dueAmount: 900,
            paymentType: 'EMI',
            status: 'Due',
            emiDetails: '5 Weeks EMI'
        },
        {
            id: 'OR-005',
            customerName: 'Howard Stark',
            orderDate: '2025-07-01',
            dueDate: '2025-07-01',
            totalAmount: 2900,
            dueAmount: 2900,
            paymentType: 'Full Payment',
            status: 'Overdue',
            emiDetails: 'Full Payment'
        },
        {
            id: 'OR-006',
            customerName: 'Peter Parker',
            orderDate: '2025-06-15',
            dueDate: '2025-06-15',
            totalAmount: 1500,
            dueAmount: 300,
            paymentType: 'EMI',
            status: 'Due',
            emiDetails: '8 Weeks EMI'
        },
        {
            id: 'OR-007',
            customerName: 'Tony Stark',
            orderDate: '2025-06-10',
            dueDate: '2025-06-10',
            totalAmount: 5000,
            dueAmount: 5000,
            paymentType: 'Full Payment',
            status: 'Overdue',
            emiDetails: 'Full Payment'
        },
        {
            id: 'OR-008',
            customerName: 'Steve Rogers',
            orderDate: '2025-05-20',
            dueDate: '2025-05-20',
            totalAmount: 3200,
            dueAmount: 800,
            paymentType: 'EMI',
            status: 'Due',
            emiDetails: '12 Weeks EMI'
        },
        {
            id: 'OR-009',
            customerName: 'Bruce Banner',
            orderDate: '2025-05-15',
            dueDate: '2025-05-15',
            totalAmount: 2100,
            dueAmount: 600,
            paymentType: 'EMI',
            status: 'Overdue',
            emiDetails: '6 Weeks EMI'
        },
        {
            id: 'OR-010',
            customerName: 'Natasha Romanoff',
            orderDate: '2025-04-28',
            dueDate: '2025-04-28',
            totalAmount: 1800,
            dueAmount: 450,
            paymentType: 'EMI',
            status: 'Due',
            emiDetails: '9 Weeks EMI'
        },
        {
            id: 'OR-011',
            customerName: 'Thor Odinson',
            orderDate: '2025-04-10',
            dueDate: '2025-04-10',
            totalAmount: 4500,
            dueAmount: 4500,
            paymentType: 'Full Payment',
            status: 'Overdue',
            emiDetails: 'Full Payment'
        },
        {
            id: 'OR-012',
            customerName: 'Clint Barton',
            orderDate: '2025-03-25',
            dueDate: '2025-03-25',
            totalAmount: 2600,
            dueAmount: 520,
            paymentType: 'EMI',
            status: 'Due',
            emiDetails: '11 Weeks EMI'
        }
    ];

    // Filter payments based on search term and active view
    const filteredPayments = useMemo(() => {
        let filtered = payments.filter(payment =>
            payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Apply view filters
        if (activeView === 'overdue') {
            filtered = filtered.filter(payment => payment.status === 'Overdue');
        } else if (activeView === 'upcoming') {
            filtered = filtered.filter(payment => payment.status === 'Due');
        }

        return filtered;
    }, [searchTerm, activeView]);

    // Pagination logic
    const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage);

    // Reset to first page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [activeView, searchTerm]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Due':
                return 'bg-orange-100 text-orange-600';
            case 'Overdue':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    const getPaymentTypeColor = (type: string) => {
        return type === 'Full Payment'
            ? 'bg-green-100 text-green-600'
            : 'bg-orange-100 text-orange-600';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB');
    };

    const formatCurrency = (amount: number) => {
        return `₹${amount}`;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const getVisiblePageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index && item !== currentPage).slice(0, totalPages);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-teal-100 p-3 sm:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search payments"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full sm:w-80 text-black bg-white/70 backdrop-blur-sm rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors whitespace-nowrap">
                            <Plus className="w-4 h-4" />
                            Record Payment
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setActiveView('all')}
                            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeView === 'all'
                                ? 'bg-teal-500 text-white'
                                : 'bg-white/50 text-gray-600 hover:bg-white/70'
                                }`}
                        >
                            All Payments
                        </button>
                        <button
                            onClick={() => setActiveView('overdue')}
                            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeView === 'overdue'
                                ? 'bg-teal-500 text-white'
                                : 'bg-white/50 text-gray-600 hover:bg-white/70'
                                }`}
                        >
                            Overdue Payments
                        </button>
                        <button
                            onClick={() => setActiveView('upcoming')}
                            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeView === 'upcoming'
                                ? 'bg-teal-500 text-white'
                                : 'bg-white/50 text-gray-600 hover:bg-white/70'
                                }`}
                        >
                            Upcoming Payments
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setActiveView('active')}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeView === 'active'
                                ? 'bg-teal-500 text-white'
                                : 'bg-white/50 text-gray-600 hover:bg-white/70'
                                }`}
                        >
                            <Settings className="w-4 h-4" />
                            Active Payments
                        </button>
                        <button
                            onClick={() => setActiveView('history')}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeView === 'history'
                                ? 'bg-teal-500 text-white'
                                : 'bg-white/50 text-gray-600 hover:bg-white/70'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Payment History
                        </button>
                    </div>
                </div>

                {/* Responsive Table View */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">Customer Name</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">Order ID</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                                        {activeView === 'active' ? 'Due Date' : 'Payment Date'}
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">Total Amount</th>
                                    {activeView === 'active' && (
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">Due Amount</th>
                                    )}
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">Payment Type</th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">
                                        {activeView === 'active' ? 'Status' : 'Payment Details'}
                                    </th>
                                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 whitespace-nowrap">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedPayments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                                            {payment.customerName}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                            {payment.id}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                            {formatDate(activeView === 'active' ? payment.dueDate : payment.orderDate)}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                                            {formatCurrency(payment.totalAmount)}
                                        </td>
                                        {activeView === 'active' && (
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                                                {formatCurrency(payment.dueAmount)}
                                            </td>
                                        )}
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getPaymentTypeColor(payment.paymentType)}`}>
                                                {payment.paymentType}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            {activeView === 'active' ? (
                                                <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                                    {payment.status}
                                                </span>
                                            ) : (
                                                <span className="text-xs sm:text-sm text-gray-600">{payment.emiDetails}</span>
                                            )}
                                        </td>
                                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                                                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                        <p className="text-sm text-gray-600 order-2 sm:order-1">
                            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of {filteredPayments.length} results
                        </p>
                        <div className="flex items-center gap-2 order-1 sm:order-2">
                            {/* Previous Button */}
                            <button
                                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 bg-white/70 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <ChevronLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Previous</span>
                            </button>

                            {/* Page Numbers */}
                            <div className="hidden sm:flex items-center gap-1">
                                {totalPages <= 7 ? (
                                    // Show all pages if 7 or fewer
                                    Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${currentPage === page
                                                ? 'bg-teal-500 text-white'
                                                : 'text-gray-600 bg-white/70 hover:bg-white'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))
                                ) : (
                                    // Show truncated pagination for more than 7 pages
                                    <>
                                        <button
                                            onClick={() => handlePageChange(1)}
                                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${currentPage === 1
                                                ? 'bg-teal-500 text-white'
                                                : 'text-gray-600 bg-white/70 hover:bg-white'
                                                }`}
                                        >
                                            1
                                        </button>

                                        {currentPage > 3 && (
                                            <span className="px-2 py-2 text-gray-500">...</span>
                                        )}

                                        {Array.from({ length: 3 }, (_, i) => {
                                            const page = currentPage - 1 + i;
                                            if (page > 1 && page < totalPages) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => handlePageChange(page)}
                                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${currentPage === page
                                                            ? 'bg-teal-500 text-white'
                                                            : 'text-gray-600 bg-white/70 hover:bg-white'
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            }
                                            return null;
                                        })}

                                        {currentPage < totalPages - 2 && (
                                            <span className="px-2 py-2 text-gray-500">...</span>
                                        )}

                                        <button
                                            onClick={() => handlePageChange(totalPages)}
                                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${currentPage === totalPages
                                                ? 'bg-teal-500 text-white'
                                                : 'text-gray-600 bg-white/70 hover:bg-white'
                                                }`}
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Mobile page indicator */}
                            <div className="sm:hidden flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {currentPage} / {totalPages}
                                </span>
                            </div>

                            {/* Next Button */}
                            <button
                                className="flex items-center gap-1 px-3 py-2 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {paginatedPayments.length === 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <FileText className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
                        <p className="text-gray-600">
                            {searchTerm ?
                                `No payments match your search for "${searchTerm}"` :
                                'No payments available for the selected view'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
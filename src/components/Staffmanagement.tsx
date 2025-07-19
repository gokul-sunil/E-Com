import React, { useState, useMemo, useRef } from 'react';
import { Search, Plus, Edit, Eye, ToggleLeft, ToggleRight, Users, Grid3x3, Network, Package, Archive, FileText, Settings, X, Upload, Camera } from 'lucide-react';

const StaffManagement = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const itemsPerPage = 10;

    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        role: '',
        status: true
    });

    const [staffData, setStaffData] = useState([
        {
            id: 'EMP-001',
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-002',
            name: 'Cody Howard',
            email: 'cody.howard@example.com',
            role: 'Staff',
            status: 'Inactive',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-003',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-004',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            role: 'Staff',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-005',
            name: 'Emma Davis',
            email: 'emma.davis@example.com',
            role: 'Admin',
            status: 'Inactive',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-006',
            name: 'John Smith',
            email: 'john.smith@example.com',
            role: 'Staff',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-007',
            name: 'Lisa Brown',
            email: 'lisa.brown@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-008',
            name: 'David Miller',
            email: 'david.miller@example.com',
            role: 'Staff',
            status: 'Inactive',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-009',
            name: 'Anna Wilson',
            email: 'anna.wilson@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-010',
            name: 'Tom Anderson',
            email: 'tom.anderson@example.com',
            role: 'Staff',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-011',
            name: 'Kate Taylor',
            email: 'kate.taylor@example.com',
            role: 'Admin',
            status: 'Inactive',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-012',
            name: 'Chris Lee',
            email: 'chris.lee@example.com',
            role: 'Staff',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-013',
            name: 'Rachel Green',
            email: 'rachel.green@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-014',
            name: 'Mark Williams',
            email: 'mark.williams@example.com',
            role: 'Staff',
            status: 'Inactive',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-015',
            name: 'Nina Clark',
            email: 'nina.clark@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-016',
            name: 'Paul Martinez',
            email: 'paul.martinez@example.com',
            role: 'Staff',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-017',
            name: 'Sophie Turner',
            email: 'sophie.turner@example.com',
            role: 'Admin',
            status: 'Inactive',
            avatar: '/api/placeholder/40/40'
        }
    ]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewEmployee({
            name: '',
            email: '',
            role: '',
            status: true
        });
        setSelectedImage(null);
        setImagePreview(null);
    };

    const handleInputChange = (field: keyof typeof newEmployee, value: string | boolean) => {
        setNewEmployee(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file); // ✅ No more type error
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    setImagePreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };


    const handleSave = () => {
        if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
            alert('Please fill in all required fields');
            return;
        }

        const newId = `EMP-${String(staffData.length + 1).padStart(3, '0')}`;
        const newStaff = {
            id: newId,
            name: newEmployee.name,
            email: newEmployee.email,
            role: newEmployee.role,
            status: newEmployee.status ? 'Active' : 'Inactive',
            avatar: imagePreview || '/api/placeholder/40/40'
        };

        setStaffData(prev => [...prev, newStaff]);
        handleCloseModal();
    };

    const toggleStaffStatus = (staffId: string) => {
        setStaffData(prevData =>
            prevData.map(staff =>
                staff.id === staffId
                    ? { ...staff, status: staff.status === 'Active' ? 'Inactive' : 'Active' }
                    : staff
            )
        );
    };

    const handleEditStaff = (staffId: string) => {
        console.log('Edit staff:', staffId);
    };

    const handleViewProfile = (staffId: string) => {
        console.log('View profile:', staffId);
    };

    // Filter staff based on search and role filter
    const filteredStaff = useMemo(() => {
        return staffData.filter(staff => {
            const matchesFilter = activeFilter === 'All' || staff.role === activeFilter;
            const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                staff.email.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [staffData, activeFilter, searchTerm]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStaff = filteredStaff.slice(startIndex, endIndex);
    const totalResults = filteredStaff.length;

    // Reset to first page when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, searchTerm]);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Generate page numbers for pagination
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
        <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-teal-100 overflow-auto">
            {/* Main Content */}
            <div className="flex-1 flex flex-col p-4 sm:p-6 md:p-8 overflow-auto">
                {/* Search and Add Button */}
                <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search staff"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full bg-white/80 backdrop-blur-sm text-black border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={handleOpenModal}
                        className="bg-gradient-to-r from-teal-400 to-cyan-500 text-black px-5 py-2 rounded-full flex items-center space-x-2 hover:from-teal-500 hover:to-cyan-600 transition-all duration-200 shadow-lg whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="text-sm sm:text-base">Add New Staff</span>
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 items-center mb-4">
                    <span className="text-gray-600 text-sm whitespace-nowrap">Filter by role:</span>
                    {['All', 'Admin', 'Staff'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeFilter === filter
                                ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg'
                                : 'bg-white/80 text-gray-600 hover:bg-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Staff Table - Scrollable */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex-1 flex flex-col overflow-auto mb-25">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-gray-50/80 text-xs sm:text-sm sticky top-0 z-10">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500">Employee Name</th>
                                    <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500">Employee ID</th>
                                    <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500">Role</th>
                                    <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500">Contact</th>
                                    <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500">Status</th>
                                    <th className="px-4 sm:px-6 py-3 text-left font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm">
                                {currentStaff.length > 0 ? (
                                    currentStaff.map((staff) => (
                                        <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium mr-3 flex-shrink-0">
                                                        {staff.name.charAt(0)}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{staff.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-gray-600">{staff.id}</td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${staff.role === 'Admin'
                                                    ? 'bg-orange-100 text-orange-600'
                                                    : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {staff.role}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4 text-gray-600">{staff.email}</td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${staff.status === 'Active'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-red-100 text-red-600'
                                                    }`}>
                                                    {staff.status}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => toggleStaffStatus(staff.id)}
                                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 flex-shrink-0 ${staff.status === 'Active'
                                                            ? 'bg-green-500 hover:bg-green-600'
                                                            : 'bg-gray-300 hover:bg-gray-400'
                                                            }`}>
                                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${staff.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
                                                            }`} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditStaff(staff.id)}
                                                        className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-200 group"
                                                        title="Edit Staff">
                                                        <Edit className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewProfile(staff.id)}
                                                        className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200 group"
                                                        title="View Profile">
                                                        <Eye className="w-5 h-5 text-gray-500 group-hover:text-green-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-4 sm:px-6 py-8 text-center text-gray-500">
                                            No staff members found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalResults > 0 && (
                        <div className="border-t border-gray-200 bg-white/80 px-4 sm:px-6 py-3 mt-auto">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-gray-600">
                                    Showing {startIndex + 1} to {Math.min(endIndex, totalResults)} of {totalResults} results
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white/80 text-gray-600 hover:bg-white'
                                            }`}>
                                        Previous
                                    </button>

                                    <div className="hidden sm:flex items-center space-x-1">
                                        {getPageNumbers().map(page => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageClick(page)}
                                                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${currentPage === page
                                                    ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg'
                                                    : 'bg-white/80 text-gray-600 hover:bg-white'
                                                    }`}>
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="sm:hidden text-sm text-gray-600 px-3 py-2">
                                        {currentPage} / {totalPages}
                                    </div>

                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-600'
                                            }`}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Employee Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-100/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Add Employee</h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Profile Picture Section */}
                            <div className="flex items-start space-x-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                                                <span className="text-white text-xl font-medium">
                                                    {newEmployee.name ? newEmployee.name.charAt(0).toUpperCase() : (
                                                        <Camera className="w-6 h-6 text-white" />
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleUploadClick}
                                        className="mt-3 bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                    >
                                        Upload
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>

                                <div className="flex-1 space-y-4">
                                    {/* Employee Name */}
                                    <div>
                                        <label className="block text-red text-sm font-medium text-gray-700 mb-1">
                                            Employee name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter employee name"
                                            value={newEmployee.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Role Dropdown */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Role
                                        </label>
                                        <select
                                            value={newEmployee.role}
                                            onChange={(e) => handleInputChange('role', e.target.value)}
                                            className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent appearance-none bg-white"
                                        >
                                            <option value="">Select role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Staff">Staff</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    value={newEmployee.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full px-3 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-600">Active</span>
                                    <button
                                        onClick={() => handleInputChange('status', !newEmployee.status)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${newEmployee.status
                                            ? 'bg-cyan-400 hover:bg-cyan-500'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                            }`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${newEmployee.status ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                            <button
                                onClick={handleCloseModal}
                                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManagement;
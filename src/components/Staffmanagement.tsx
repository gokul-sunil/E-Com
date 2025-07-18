import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, ToggleLeft, ToggleRight, Users, Grid3x3, Network, Package, Archive, FileText, Settings } from 'lucide-react';

const StaffManagement = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
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
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-004',
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        },
        {
            id: 'EMP-005',
            name: 'Jane Cooper',
            email: 'jane.cooper@example.com',
            role: 'Admin',
            status: 'Active',
            avatar: '/api/placeholder/40/40'
        }
    ]);

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
        // Handle edit functionality
        console.log('Edit staff:', staffId);
    };

    const handleViewProfile = (staffId: string) => {
        // Handle view profile functionality
        console.log('View profile:', staffId);
    };

    const sidebarItems = [
        { icon: Grid3x3, label: 'Dashboard', active: false },
        { icon: Users, label: 'Staff Management', active: true },
        { icon: Network, label: 'Network', active: false },
        { icon: Package, label: 'Products', active: false },
        { icon: Archive, label: 'Archive', active: false },
        { icon: FileText, label: 'Reports', active: false },
        { icon: Settings, label: 'Settings', active: false }
    ];

    const filteredStaff = staffData.filter(staff => {
        const matchesFilter = activeFilter === 'All' || staff.role === activeFilter;
        const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="flex h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-teal-100">

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center mb-2">
                        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
                    </div>
                    <p className="text-gray-600">Manage all employees and their roles.</p>
                </div>

                {/* Search and Add Button */}
                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search staff"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-80 bg-white/80 backdrop-blur-sm text-black border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                        />
                    </div>
                    <button className="bg-gradient-to-r from-teal-400 to-cyan-500 text-black px-6 py-2 rounded-full flex items-center space-x-2 hover:from-teal-500 hover:to-cyan-600 transition-all duration-200 shadow-lg">
                        <Plus className="w-5 h-5" />
                        <span>Add New Staff</span>
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex space-x-2 mb-6">
                    <span className="text-gray-600 mr-2">Filter by role:</span>
                    {['All', 'Admin', 'Staff'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === filter
                                ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-lg'
                                : 'bg-white/80 text-gray-600 hover:bg-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Staff Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Employee Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Employee ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Contact</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredStaff.map((staff, index) => (
                                    <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors duration-200">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                                                    {staff.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-gray-900">{staff.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{staff.id}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${staff.role === 'Admin'
                                                ? 'bg-orange-100 text-orange-600'
                                                : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {staff.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{staff.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${staff.status === 'Active'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-red-100 text-red-600'
                                                }`}>
                                                {staff.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                {/* Toggle Switch */}
                                                <button
                                                    onClick={() => toggleStaffStatus(staff.id)}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${staff.status === 'Active'
                                                        ? 'bg-green-500 hover:bg-green-600'
                                                        : 'bg-gray-300 hover:bg-gray-400'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${staff.status === 'Active' ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>

                                                {/* Edit Button */}
                                                <button
                                                    onClick={() => handleEditStaff(staff.id)}
                                                    className="p-2 hover:bg-blue-50 rounded-full transition-colors duration-200 group"
                                                    title="Edit Staff"
                                                >
                                                    <Edit className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
                                                </button>

                                                {/* View Profile Button */}
                                                <button
                                                    onClick={() => handleViewProfile(staff.id)}
                                                    className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200 group"
                                                    title="View Profile"
                                                >
                                                    <Eye className="w-5 h-5 text-gray-500 group-hover:text-green-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-600">
                        Showing 1 to 5 of 17 results
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-white/80 text-gray-600 rounded-lg hover:bg-white transition-colors duration-200">
                            Previous
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-white rounded-lg hover:from-teal-500 hover:to-cyan-600 transition-all duration-200">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffManagement;
import React, { useState } from 'react';
import { Search, Plus, Eye, MoreVertical, Calendar, ChevronDown } from 'lucide-react';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatus, setOrderStatus] = useState('All');
  const [paymentStatus, setPaymentStatus] = useState('All');

  const orders = [
    {
      id: 'OR-001',
      productName: 'Elegant Wooden Chair',
      orderDate: '05/01/2025',
      quantity: 6,
      totalPrice: '₹2900',
      customerName: 'Mary Jane',
      paymentStatus: 'Paid in Full',
      status: 'Delivered'
    },
    {
      id: 'OR-002',
      productName: 'Minimalist Coffee Table',
      orderDate: '04/01/2025',
      quantity: 1,
      totalPrice: '₹2900',
      customerName: 'John Cena',
      paymentStatus: 'Pending EMI',
      status: 'Processing'
    },
    {
      id: 'OR-003',
      productName: 'Cozy Fabric Sofa',
      orderDate: '03/01/2025',
      quantity: 2,
      totalPrice: '₹2900',
      customerName: 'Cody Banks',
      paymentStatus: 'Paid in EMI',
      status: 'Delivered'
    },
    {
      id: 'OR-004',
      productName: 'Modern Desk Lamp',
      orderDate: '02/01/2025',
      quantity: 12,
      totalPrice: '₹2900',
      customerName: 'Mary Jane',
      paymentStatus: 'Pending EMI',
      status: 'Delivered'
    },
    {
      id: 'OR-005',
      productName: 'Vintage Bookshelf',
      orderDate: '01/01/2025',
      quantity: 1,
      totalPrice: '₹2900',
      customerName: 'Howard Stark',
      paymentStatus: 'Paid in Full',
      status: 'Cancelled'
    }
  ];

  const getPaymentStatusColor = (status:string) => {
    switch (status) {
      case 'Paid in Full':
        return 'bg-green-100 text-green-800';
      case 'Paid in EMI':
        return 'bg-green-100 text-green-800';
      case 'Pending EMI':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status:string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-orange-100 text-orange-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesOrderStatus = orderStatus === 'All' || order.status === orderStatus;
    const matchesPaymentStatus = paymentStatus === 'All' || order.paymentStatus === paymentStatus;
    
    return matchesSearch && matchesOrderStatus && matchesPaymentStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-50 to-teal-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        

        {/* Search and Add Order */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-end">
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders"
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Add New Order
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Order Status:</span>
            <div className="relative">
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option>All</option>
                <option>Delivered</option>
                <option>Processing</option>
                <option>Cancelled</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Payment Status:</span>
            <div className="relative">
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option>All</option>
                <option>Paid in Full</option>
                <option>Paid in EMI</option>
                <option>Pending EMI</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-400" />
            Date Range
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to 5 of 17 results
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 text-sm text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement; 
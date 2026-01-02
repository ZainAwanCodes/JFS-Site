"use client";

import { Eye, Edit, Trash2 } from "lucide-react";

const bookings = [
    { id: "BK-001", customer: "Ali Khan", email: "ali@example.com", route: "LHR -> KHI", date: "2024-03-10", status: "Pending", amount: "25,000" },
    { id: "BK-002", customer: "Sara Ahmed", email: "sara@example.com", route: "ISL -> FSD", date: "2024-03-11", status: "Confirmed", amount: "15,000" },
    { id: "BK-003", customer: "Kamran Akmal", email: "kamran@example.com", route: "MUL -> LHR", date: "2024-03-12", status: "Completed", amount: "12,000" },
    { id: "BK-004", customer: "Zainab Bibi", email: "zainab@example.com", route: "KHI -> LHR", date: "2024-03-13", status: "In Transit", amount: "30,000" },
    { id: "BK-005", customer: "Bilal Sheikh", email: "bilal@example.com", route: "PWR -> ISL", date: "2024-03-14", status: "Pending", amount: "18,000" },
];

export default function BookingTable() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Booking ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Route</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{booking.id}</td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.customer}</p>
                                        <p className="text-gray-400 text-xs">{booking.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{booking.date}</td>
                                <td className="px-6 py-4">{booking.route}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "Completed"
                                                ? "bg-green-100 text-green-700"
                                                : booking.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : booking.status === "In Transit"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-purple-100 text-purple-700"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium">Rs. {booking.amount}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-primary transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-600 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <p className="text-sm text-gray-500">Showing 5 of 128 bookings</p>
                <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">Previous</button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-600 hover:bg-gray-50">Next</button>
                </div>
            </div>
        </div>
    );
}

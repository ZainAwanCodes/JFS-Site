"use client";

import { mockAdminStats } from "@/lib/mockData";
import { DollarSign, Archive, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const stats = [
        {
            label: "Total Bookings",
            value: mockAdminStats.totalBookings,
            icon: Archive,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            change: "+12.5%",
        },
        {
            label: "Active Shipments",
            value: mockAdminStats.activeShipments,
            icon: TrendingUp,
            color: "text-green-400",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            change: "+4.3%",
        },
        {
            label: "Total Revenue",
            value: `Rs. ${mockAdminStats.revenue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-primary-400",
            bg: "bg-primary-500/10",
            border: "border-primary-500/20",
            change: "+8.1%",
        },
        {
            label: "New Customers",
            value: "2",
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            change: "+2.4%",
        },
    ];

    return (
        <div className="bg-dark-900 min-h-screen text-white p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-display font-bold text-white">Dashboard Overview</h1>
                <p className="text-gray-400 mt-1">Welcome back, Admin</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl shadow-lg p-6 border ${stat.border} ${stat.bg} backdrop-blur-sm`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-dark-900/50`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-400 font-medium">{stat.change}</span>
                            <span className="text-gray-500 ml-2">from last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-dark-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-700">
                    <h2 className="text-lg font-bold text-white">Recent Bookings</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-dark-900/50 text-gray-300 font-medium border-b border-gray-700">
                            <tr>
                                <th className="px-6 py-4">Booking ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Route</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {mockAdminStats.recentBookings.map((booking, i) => (
                                <motion.tr
                                    key={booking.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    className="hover:bg-dark-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-white">{booking.id}</td>
                                    <td className="px-6 py-4">{booking.customer}</td>
                                    <td className="px-6 py-4">{booking.route}</td>
                                    <td className="px-6 py-4">Rs. {booking.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === "Completed"
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                    : booking.status === "Pending"
                                                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

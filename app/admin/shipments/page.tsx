"use client";

import { motion } from "framer-motion";
import { Search, Filter, MoreVertical, MapPin, Calendar, Truck } from "lucide-react";
import { mockShipments } from "@/lib/mockData";

export default function AllShipmentsPage() {
    return (
        <div className="p-8 text-white min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">All Shipments</h1>
                    <p className="text-gray-400">Manage and track all ongoing logistics.</p>
                </div>

                <div className="flex space-x-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search ID..."
                            className="pl-10 pr-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg hover:border-primary-500 transition-colors">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {mockShipments.map((shipment, index) => (
                    <motion.div
                        key={shipment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-dark-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500/50 transition-all shadow-lg"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div className="mb-4 md:mb-0">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-bold text-white mr-3">{shipment.id}</h3>
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${shipment.status === "In Transit" ? "bg-blue-500/20 text-blue-400" :
                                            shipment.status === "Delivered" ? "bg-green-500/20 text-green-400" :
                                                "bg-yellow-500/20 text-yellow-400"
                                        }`}>
                                        {shipment.status}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-400 text-sm space-x-6">
                                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {shipment.origin} → {shipment.destination}</span>
                                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {shipment.estimatedDelivery}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-right mr-4 hidden md:block">
                                    <div className="text-sm text-gray-400">Current Location</div>
                                    <div className="font-medium text-white">{shipment.currentLocation}</div>
                                </div>
                                <button className="p-2 hover:bg-dark-700 rounded-full transition-colors">
                                    <MoreVertical className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6 relative h-2 bg-dark-900 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="absolute h-full bg-gradient-to-r from-primary-600 to-primary-400"
                            ></motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

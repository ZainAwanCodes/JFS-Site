"use client";

import { useState } from "react";
import { useAdmin, Shipment } from "@/context/AdminContext";
import { Search, MapPin, Truck, CheckCircle, Package, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackingPage() {
    const { shipments } = useAdmin();
    const [trackingInput, setTrackingInput] = useState("");
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [error, setError] = useState("");

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const found = shipments.find(s => s.trackingNumber.trim().toUpperCase() === trackingInput.trim().toUpperCase());

        if (found) {
            setShipment(found);
        } else {
            setShipment(null);
            setError("Tracking number not found. Please check and try again.");
        }
    };

    const getStatusStep = (status: string) => {
        switch (status) {
            case "Pending": return 1;
            case "Picked Up": return 2;
            case "In Transit": return 3;
            case "Delivered": return 4;
            default: return 0;
        }
    };

    const currentStep = shipment ? getStatusStep(shipment.status) : 0;

    return (
        <div className="min-h-screen pt-24 pb-12 bg-dark-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Search Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-white mb-4">Track Your Shipment</h1>
                    <p className="text-gray-400 mb-8">Enter your tracking ID to see the current status of your delivery.</p>

                    <form onSubmit={handleTrack} className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Enter Tracking ID (e.g. BOL-1234)"
                            value={trackingInput}
                            onChange={(e) => setTrackingInput(e.target.value)}
                            className="w-full bg-dark-800 border-2 border-gray-700 rounded-full py-4 pl-6 pr-14 text-white text-lg focus:border-primary-500 outline-none shadow-lg"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 bg-primary-600 hover:bg-primary-500 text-white p-3 rounded-full transition-colors"
                        >
                            <Search size={24} />
                        </button>
                    </form>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-red-400 flex items-center justify-center"
                        >
                            <AlertCircle size={18} className="mr-2" />
                            {error}
                        </motion.div>
                    )}
                </div>

                {/* Results Section */}
                <AnimatePresence>
                    {shipment && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-dark-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl"
                        >
                            {/* Header */}
                            <div className="bg-dark-700 p-6 flex justify-between items-center border-b border-gray-600">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-1">Tracking #{shipment.trackingNumber}</h2>
                                    <p className="text-gray-400 text-sm">Created on {shipment.date}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-full font-bold ${shipment.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                                        shipment.status === 'In Transit' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-yellow-500/20 text-yellow-500'
                                    }`}>
                                    {shipment.status}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="p-8">
                                <div className="relative">
                                    {/* Line */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 rounded"></div>
                                    <div
                                        className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 rounded transition-all duration-1000"
                                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                                    ></div>

                                    {/* Step Dots */}
                                    <div className="relative flex justify-between">
                                        {['Pending', 'Picked Up', 'In Transit', 'Delivered'].map((step, index) => {
                                            const stepNum = index + 1;
                                            const isActive = stepNum <= currentStep;
                                            const isCurrent = stepNum === currentStep;

                                            return (
                                                <div key={step} className="flex flex-col items-center">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 transition-colors duration-500 ${isActive ? 'bg-primary-500 border-primary-500 text-white' : 'bg-dark-900 border-gray-600 text-gray-500'
                                                        }`}>
                                                        {isActive ? <CheckCircle size={14} /> : <div className="w-2 h-2 rounded-full bg-gray-500" />}
                                                    </div>
                                                    <span className={`mt-2 text-xs md:text-sm font-medium ${isCurrent ? 'text-primary-400' : isActive ? 'text-white' : 'text-gray-500'
                                                        }`}>
                                                        {step}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 border-t border-gray-700 bg-dark-800/50">
                                <div>
                                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4 flex items-center">
                                        <Truck className="mr-2" size={16} /> Shipment Route
                                    </h3>
                                    <div className="space-y-6 relative pl-4 border-l-2 border-dashed border-gray-700 ml-2">
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-dark-800"></div>
                                            <p className="text-white font-bold text-lg">{shipment.origin}</p>
                                            <p className="text-gray-500 text-sm">Origin</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-transparent border-2 border-primary-500 ring-4 ring-dark-800"></div>
                                            <p className="text-white font-bold text-lg">{shipment.destination}</p>
                                            <p className="text-gray-500 text-sm">{shipment.status === 'Delivered' ? 'Delivered' : 'Destination'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4 flex items-center">
                                        <Package className="mr-2" size={16} /> Cargo Info
                                    </h3>
                                    <div className="bg-dark-900 rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Receiver:</span>
                                            <span className="text-white font-medium">{shipment.consigneeName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Content:</span>
                                            <span className="text-white font-medium">{shipment.goodsDescription}</span>
                                        </div>
                                        {shipment.driverId && (
                                            <div className="flex justify-between items-center text-blue-400 text-sm mt-2 pt-2 border-t border-gray-800">
                                                <span>Driver Assigned</span>
                                                <CheckCircle size={14} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}

"use client";

import { MapPin, Truck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TrackingHistory {
    status: string;
    date: string;
    location: string;
}

interface TrackingData {
    id: string;
    status: string;
    origin: string;
    destination: string;
    estimatedDelivery: string;
    history: TrackingHistory[];
}

export default function TrackingResult({ data }: { data: TrackingData }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="bg-dark-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-700/50 max-w-4xl mx-auto mt-8 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-gray-700 relative z-10">
                <div>
                    <h2 className="text-3xl font-display font-bold text-white tracking-wide">
                        Shipment <span className="text-primary-400">#{data.id}</span>
                    </h2>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center mt-3 bg-primary-500/10 w-fit px-4 py-1.5 rounded-full border border-primary-500/20"
                    >
                        <span className="relative flex h-3 w-3 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                        </span>
                        <span className="text-primary-300 font-semibold">{data.status}</span>
                    </motion.div>
                </div>
                <div className="mt-6 md:mt-0 text-left md:text-right bg-dark-900/50 p-4 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Estimated Delivery</p>
                    <p className="font-bold text-xl text-white">{data.estimatedDelivery}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-16 bg-dark-900/50 p-8 rounded-2xl border border-gray-700 relative z-10">
                <div className="text-center w-full md:w-auto mb-8 md:mb-0">
                    <div className="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-500/20">
                        <MapPin className="w-8 h-8 text-primary-500" />
                    </div>
                    <p className="font-bold text-xl text-white">{data.origin}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Origin</p>
                </div>

                <div className="flex-1 w-full md:mx-8 relative h-px bg-gray-700 my-4 md:my-0">
                    <div className="absolute top-1/2 left-0 w-2 h-2 bg-gray-500 rounded-full -mt-1" />
                    <div className="absolute top-1/2 right-0 w-2 h-2 bg-primary-500 rounded-full -mt-1" />
                    <motion.div
                        initial={{ left: "0%" }}
                        animate={{ left: "50%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute top-1/2 -mt-4 -ml-4 bg-dark-800 p-2 rounded-full border border-primary-500/30 z-10"
                    >
                        <Truck className="w-5 h-5 text-primary-400" />
                    </motion.div>
                </div>

                <div className="text-center w-full md:w-auto mt-8 md:mt-0">
                    <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-600">
                        <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-bold text-xl text-white">{data.destination}</p>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Destination</p>
                </div>
            </div>

            <div className="space-y-0 relative z-10">
                {data.history.map((step, index) => (
                    <div key={index} className="relative pl-12 pb-12 last:pb-0 border-l-2 border-gray-700 last:border-0 ml-4">
                        <div className={`absolute left-0 top-0 -translate-x-[11px] w-6 h-6 rounded-full border-4 ${index === data.history.length - 1
                                ? "bg-dark-900 border-primary-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                : "bg-dark-900 border-gray-600"
                            } z-20`}></div>

                        <div className="bg-dark-900/30 p-4 rounded-lg border border-gray-800/50 hover:bg-dark-900/50 transition-colors -mt-2">
                            <h4 className={`font-bold text-lg ${index === data.history.length - 1 ? "text-primary-400" : "text-gray-300"}`}>
                                {step.status}
                            </h4>
                            <p className="text-gray-500 text-sm flex items-center mt-2">
                                <span className="bg-dark-800 px-2 py-1 rounded text-xs border border-gray-700">{step.date}</span>
                                <span className="mx-3 text-gray-600">•</span>
                                <span className="flex items-center text-gray-400">
                                    <MapPin className="w-3 h-3 mr-1" /> {step.location}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function RouteMap({ origin, destination }: { origin: string; destination: string }) {
    const isActive = origin && destination;

    return (
        <div className="relative w-full h-[300px] bg-dark-900 rounded-xl overflow-hidden border border-gray-700 mt-6 shadow-inner group">
            {/* Mock Map Background - Tech Grid */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                    linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}></div>

            {/* Map Accents */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900/50"></div>

            {/* Map Labels/Decorations */}
            <div className="absolute top-4 left-4 bg-dark-800/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700 text-xs font-mono text-primary-400 flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
                LIVE ROUTE VIEW
            </div>

            <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono">
                GPS: ACTIVE | SAT: CONNECTED
            </div>

            {/* Pins and Route */}
            <div className="absolute inset-0 flex items-center justify-center">
                {isActive ? (
                    <div className="relative w-3/4 h-1/2">
                        {/* Route Line */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                            <defs>
                                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M 10 50 Q 150 100 280 50"
                                fill="none"
                                stroke="url(#routeGradient)"
                                strokeWidth="3"
                                strokeDasharray="10 5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Origin Pin */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute left-0 top-1/2 -mt-8 -ml-4 flex flex-col items-center z-10"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gray-500 rounded-full animate-ping opacity-20"></div>
                                <MapPin className="text-white w-8 h-8 fill-gray-700 relative z-10" />
                            </div>
                            <span className="bg-dark-800 text-white text-xs font-bold px-2 py-1 rounded shadow-lg border border-gray-600 mt-1 whitespace-nowrap">{origin}</span>
                        </motion.div>

                        {/* Destination Pin */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute right-0 top-1/2 -mt-8 -mr-4 flex flex-col items-center z-10"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20"></div>
                                <MapPin className="text-primary-400 w-8 h-8 fill-dark-900 relative z-10" />
                            </div>
                            <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg mt-1 whitespace-nowrap">{destination}</span>
                        </motion.div>

                        {/* Moving Truck */}
                        <motion.div
                            className="absolute z-20"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 1.5
                            }}
                            style={{
                                offsetPath: 'path("M 10 50 Q 150 100 280 50")',
                                offsetRotate: 'auto'
                            }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-2 bg-primary-500/30 rounded-full blur-sm"></div>
                                <Navigation className="w-6 h-6 text-white rotate-90 relative z-10 drop-shadow-md" fill="#06b6d4" />
                            </div>
                        </motion.div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-dark-800 flex items-center justify-center border border-dashed border-gray-700">
                            <MapPin className="w-8 h-8 opacity-20" />
                        </div>
                        <p className="text-sm font-light">Enter Origin and Destination to see route</p>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { motion } from "framer-motion";
import { Save, DollarSign, Truck } from "lucide-react";

export default function PricingPage() {
    const { rates, updateRates } = useAdmin();
    const [localRates, setLocalRates] = useState(rates);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        updateRates(localRates);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white mb-8">Pricing Configuration</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Vehicle Base Rates */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-800 p-6 rounded-xl border border-gray-700"
                >
                    <div className="flex items-center mb-6">
                        <Truck className="text-primary-500 mr-2" />
                        <h2 className="text-xl font-bold text-white">Vehicle Base Rates (PKR)</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Mazda</label>
                            <input
                                type="number"
                                value={localRates.mazda}
                                onChange={(e) => setLocalRates({ ...localRates, mazda: Number(e.target.value) })}
                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Hyundai</label>
                            <input
                                type="number"
                                value={localRates.hyundai}
                                onChange={(e) => setLocalRates({ ...localRates, hyundai: Number(e.target.value) })}
                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Shehzore</label>
                            <input
                                type="number"
                                value={localRates.shehzore}
                                onChange={(e) => setLocalRates({ ...localRates, shehzore: Number(e.target.value) })}
                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Special Container</label>
                            <input
                                type="number"
                                value={localRates.container}
                                onChange={(e) => setLocalRates({ ...localRates, container: Number(e.target.value) })}
                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 outline-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Multipliers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-dark-800 p-6 rounded-xl border border-gray-700"
                >
                    <div className="flex items-center mb-6">
                        <DollarSign className="text-primary-500 mr-2" />
                        <h2 className="text-xl font-bold text-white">Multipliers</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Per KM Rate (Multiplier)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={localRates.perKmRate}
                                onChange={(e) => setLocalRates({ ...localRates, perKmRate: Number(e.target.value) })}
                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">Multiplies the base distance cost.</p>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Weight Multiplier (per ton)</label>
                            <input
                                type="number"
                                step="0.01"
                                value={localRates.weightMultiplier}
                                onChange={(e) => setLocalRates({ ...localRates, weightMultiplier: Number(e.target.value) })}
                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">Extra cost percentage per ton over 1 ton (e.g., 0.1 = 10%).</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={handleSave}
                            className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold flex items-center justify-center transition-all"
                        >
                            <Save className="mr-2" />
                            {saved ? "Rates Saved!" : "Save Changes"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

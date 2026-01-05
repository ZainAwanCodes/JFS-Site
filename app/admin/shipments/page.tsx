"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MoreVertical, MapPin, Calendar, Truck, Plus, X, Loader2, Check, Edit2 } from "lucide-react";
import { useAdmin, Shipment } from "@/context/AdminContext";
import { useState } from "react";

export default function AllShipmentsPage() {
    const { shipments, isLoading, updateShipment, addShipment, drivers } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingShipmentId, setEditingShipmentId] = useState<string | null>(null);

    const [newShipment, setNewShipment] = useState({
        id: `SHP-${Math.floor(1000 + Math.random() * 9000)}`,
        origin: "",
        destination: "",
        status: "Pending" as Shipment["status"],
        currentLocation: "Origin Warehouse",
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        consigneeName: "",
        goodsDescription: "",
        date: new Date().toISOString().split('T')[0]
    });

    const filteredShipments = shipments.filter(s =>
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.consigneeName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddShipment = async (e: React.FormEvent) => {
        e.preventDefault();
        await addShipment(newShipment);
        setIsAddModalOpen(false);
        setNewShipment({
            id: `SHP-${Math.floor(1000 + Math.random() * 9000)}`,
            origin: "",
            destination: "",
            status: "Pending",
            currentLocation: "Origin Warehouse",
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            consigneeName: "",
            goodsDescription: "",
            date: new Date().toISOString().split('T')[0]
        });
    };

    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin text-primary-500 w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="p-8 text-white min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Shipment Tracking</h1>
                    <p className="text-gray-400">Manage status, locations, and tracking for all deliveries.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Tracking ID or City..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 w-64"
                        />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all font-bold shadow-lg shadow-primary-500/20"
                    >
                        <Plus className="w-4 h-4 mr-2" /> New Shipment
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredShipments.map((shipment, index) => (
                    <motion.div
                        key={shipment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-dark-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all shadow-xl group"
                    >
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center mb-3">
                                    <h3 className="text-xl font-mono font-bold text-primary-400 mr-4 tracking-wider">{shipment.id}</h3>
                                    <select
                                        value={shipment.status}
                                        onChange={(e) => updateShipment(shipment.id, { status: e.target.value as any })}
                                        className={`px-3 py-1 rounded-full text-xs font-bold bg-dark-900 border border-gray-700 focus:outline-none focus:border-primary-500
                                            ${shipment.status === "Delivered" ? "text-green-400 border-green-500/30" :
                                                shipment.status === "In Transit" ? "text-blue-400 border-blue-500/30" :
                                                    shipment.status === "Picked Up" ? "text-purple-400 border-purple-500/30" :
                                                        "text-yellow-400 border-yellow-500/30"}`}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Picked Up">Picked Up</option>
                                        <option value="In Transit">In Transit</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter mb-1">Route</div>
                                        <div className="flex items-center text-sm font-medium">
                                            <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                                            {shipment.origin} <span className="mx-2 text-gray-600">→</span> {shipment.destination}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter mb-1">Consignee</div>
                                        <div className="text-sm font-medium">{shipment.consigneeName || "N/A"}</div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter mb-1">Est. Delivery</div>
                                        <div className="flex items-center text-sm font-medium">
                                            <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                                            {shipment.estimatedDelivery}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-tighter mb-1">Live Location</div>
                                        {editingShipmentId === shipment.id ? (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    defaultValue={shipment.currentLocation}
                                                    autoFocus
                                                    onBlur={(e) => {
                                                        updateShipment(shipment.id, { currentLocation: e.target.value });
                                                        setEditingShipmentId(null);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            updateShipment(shipment.id, { currentLocation: e.currentTarget.value });
                                                            setEditingShipmentId(null);
                                                        }
                                                    }}
                                                    className="bg-dark-900 border border-primary-500 rounded px-2 py-0.5 text-sm w-full outline-none"
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => setEditingShipmentId(shipment.id)}
                                                className="flex items-center text-sm font-medium cursor-pointer hover:text-primary-400 group/loc"
                                            >
                                                <Truck className="w-4 h-4 mr-2 text-primary-500" />
                                                {shipment.currentLocation}
                                                <Edit2 className="w-3 h-3 ml-2 opacity-0 group-hover/loc:opacity-100 transition-opacity" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Visualization */}
                        <div className="mt-8 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-dark-950 rounded-full overflow-hidden flex">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: shipment.status === "Delivered" ? "100%" :
                                            shipment.status === "In Transit" ? "66%" :
                                                shipment.status === "Picked Up" ? "33%" : "10%"
                                    }}
                                    className={`h-full bg-gradient-to-r ${shipment.status === "Delivered" ? "from-green-600 to-green-400" :
                                        shipment.status === "In Transit" ? "from-blue-600 to-blue-400" :
                                            "from-primary-600 to-primary-400"}`}
                                />
                            </div>
                            <div className="text-[10px] font-bold text-gray-600 uppercase">
                                {shipment.status === "Delivered" ? "100%" :
                                    shipment.status === "In Transit" ? "66%" :
                                        shipment.status === "Picked Up" ? "33%" : "10%"}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredShipments.length === 0 && (
                    <div className="text-center py-20 bg-dark-800/50 rounded-2xl border border-gray-700">
                        <p className="text-gray-400 text-lg">No active shipments found. Start by creating one!</p>
                    </div>
                )}
            </div>

            {/* Create Shipment Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-dark-800 w-full max-w-2xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-dark-900/50">
                                <h2 className="text-2xl font-bold flex items-center">
                                    <Truck className="mr-3 text-primary-500" /> Create New Shipment
                                </h2>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white hover:bg-dark-700 p-2 rounded-full transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleAddShipment} className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tracking ID</label>
                                        <input
                                            type="text"
                                            value={newShipment.id}
                                            onChange={(e) => setNewShipment({ ...newShipment, id: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 font-mono tracking-wider"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                                        <select
                                            value={newShipment.status}
                                            onChange={(e) => setNewShipment({ ...newShipment, status: e.target.value as any })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500 appearance-none"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Picked Up">Picked Up</option>
                                            <option value="In Transit">In Transit</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Origin City</label>
                                        <input
                                            type="text"
                                            required
                                            value={newShipment.origin}
                                            onChange={(e) => setNewShipment({ ...newShipment, origin: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500"
                                            placeholder="e.g. Lahore"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Destination City</label>
                                        <input
                                            type="text"
                                            required
                                            value={newShipment.destination}
                                            onChange={(e) => setNewShipment({ ...newShipment, destination: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500"
                                            placeholder="e.g. Karachi"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Consignee Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={newShipment.consigneeName}
                                            onChange={(e) => setNewShipment({ ...newShipment, consigneeName: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500"
                                            placeholder="Recipient Full Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Estimated Delivery</label>
                                        <input
                                            type="date"
                                            required
                                            value={newShipment.estimatedDelivery}
                                            onChange={(e) => setNewShipment({ ...newShipment, estimatedDelivery: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Goods Description</label>
                                    <textarea
                                        rows={2}
                                        value={newShipment.goodsDescription}
                                        onChange={(e) => setNewShipment({ ...newShipment, goodsDescription: e.target.value })}
                                        className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white focus:border-primary-500"
                                        placeholder="e.g. 50 Cartons of Medical Equipment"
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-10 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-500 transition-all shadow-xl shadow-primary-500/20"
                                    >
                                        Start Tracking
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

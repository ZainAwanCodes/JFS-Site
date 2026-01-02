"use client";

import { useState } from "react";
import { useAdmin, Driver } from "@/context/AdminContext";
import { Plus, Edit, Trash2, Phone, MapPin, Truck, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DriversPage() {
    const { drivers, addDriver, updateDriver, deleteDriver } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

    // Form State
    const [formData, setFormData] = useState<Omit<Driver, "id">>({
        name: "",
        phone: "",
        truckNumber: "",
        truckType: "Mazda",
        city: "",
        status: "Active",
    });

    const filteredDrivers = drivers.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.truckNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (driver?: Driver) => {
        if (driver) {
            setEditingDriver(driver);
            setFormData(driver);
        } else {
            setEditingDriver(null);
            setFormData({
                name: "",
                phone: "",
                truckNumber: "",
                truckType: "Mazda",
                city: "",
                status: "Active",
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDriver) {
            updateDriver(editingDriver.id, formData);
        } else {
            addDriver(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Driver Records</h1>
                    <p className="text-gray-400">Manage your fleet drivers and their details.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={20} />
                    <span>Add New Driver</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by name, truck number, or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-dark-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:border-primary-500 outline-none"
                />
            </div>

            {/* Drivers List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDrivers.map((driver) => (
                    <motion.div
                        key={driver.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        layout
                        className="bg-dark-800 rounded-xl border border-gray-700 p-6 relative group"
                    >
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenModal(driver)} className="p-2 bg-dark-700 hover:bg-dark-600 rounded-lg text-blue-400 transition-colors">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => deleteDriver(driver.id)} className="p-2 bg-dark-700 hover:bg-red-900/50 rounded-lg text-red-400 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white">{driver.name}</h3>
                            <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${driver.status === "Active" ? "bg-green-500/20 text-green-400" :
                                    driver.status === "On Trip" ? "bg-blue-500/20 text-blue-400" :
                                        "bg-red-500/20 text-red-400"
                                }`}>
                                {driver.status}
                            </span>
                        </div>

                        <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-center">
                                <Truck size={16} className="mr-2 text-primary-500" />
                                <span>{driver.truckType} <span className="text-gray-600">|</span> {driver.truckNumber}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone size={16} className="mr-2 text-primary-500" />
                                <span>{driver.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin size={16} className="mr-2 text-primary-500" />
                                <span>{driver.city} Route</span>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredDrivers.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-500">
                        No drivers found matching your search.
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-dark-800 w-full max-w-lg rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-700 bg-dark-900">
                                <h2 className="text-xl font-bold text-white">
                                    {editingDriver ? "Edit Driver" : "Add New Driver"}
                                </h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                            placeholder="Enter name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                            placeholder="0300-..."
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Truck Number</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.truckNumber}
                                            onChange={(e) => setFormData({ ...formData, truckNumber: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                            placeholder="LEC-1234"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Truck Type</label>
                                        <select
                                            value={formData.truckType}
                                            onChange={(e) => setFormData({ ...formData, truckType: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                        >
                                            <option value="Mazda">Mazda</option>
                                            <option value="Hyundai">Hyundai</option>
                                            <option value="Shehzore">Shehzore</option>
                                            <option value="Container">Container</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Route City</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                            placeholder="e.g. Lahore"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                            className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="On Trip">On Trip</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold shadow-lg shadow-primary-500/20 transition-all"
                                    >
                                        {editingDriver ? "Update Driver" : "Add Driver"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

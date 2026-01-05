"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Filter, Eye, CheckCircle, XCircle,
    Trash2, Clock, MapPin, User, Phone, Mail,
    Truck, Package, FileText, ExternalLink, X, Loader2, Plus
} from "lucide-react";
import { useAdmin, Booking } from "@/context/AdminContext";
import { useState } from "react";

export default function BookingsManagementPage() {
    const { bookings, isLoading, updateBookingStatus, deleteBooking, addShipment, importBookings } = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);

    const filteredBookings = bookings.filter(b => {
        const matchesSearch =
            b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || b.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const handleExportCSV = () => {
        const headers = ["ID", "Name", "Email", "Phone", "Pickup Date", "Pickup Time", "Pickup Location", "Delivery Location", "Vehicle", "Status", "Created At"];
        const csvRows = bookings.map(b => [
            b.id,
            b.name,
            b.email,
            b.phone,
            b.pickupDate,
            b.pickupTime,
            `"${b.pickupLocation}"`,
            `"${b.deliveryLocation}"`,
            b.vehicleType,
            b.status,
            b.createdAt
        ].join(","));

        const csvContent = [headers.join(","), ...csvRows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `JFS_Bookings_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsImporting(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.split("\n").filter(line => line.trim().length > 0);
                if (lines.length < 2) return;

                const header = lines[0].split(",").map(h => h.trim().toLowerCase());

                const importedData = lines.slice(1).map(line => {
                    const values: string[] = [];
                    let current = "";
                    let inQuotes = false;
                    for (let i = 0; i < line.length; i++) {
                        if (line[i] === '"') inQuotes = !inQuotes;
                        else if (line[i] === ',' && !inQuotes) {
                            values.push(current.trim());
                            current = "";
                        } else {
                            current += line[i];
                        }
                    }
                    values.push(current.trim());

                    const obj: any = {};
                    header.forEach((h, i) => {
                        const key = h.replace(/\s+/g, '');
                        if (key === 'pickupdate') obj.pickupDate = values[i];
                        else if (key === 'pickuptime') obj.pickupTime = values[i];
                        else if (key === 'pickuplocation') obj.pickupLocation = values[i];
                        else if (key === 'deliverylocation') obj.deliveryLocation = values[i];
                        else if (key === 'vehicle' || key === 'vehicletype') obj.vehicleType = values[i];
                        else if (key === 'goodsdescription') obj.goodsDescription = values[i] || "Imported Package";
                        else if (key === 'name') obj.name = values[i];
                        else if (key === 'email') obj.email = values[i];
                        else if (key === 'phone') obj.phone = values[i];
                    });
                    return obj;
                });

                await importBookings(importedData);
                alert(`Successfully imported ${importedData.length} records!`);
            } catch (err) {
                console.error("Parse error:", err);
                alert("Failed to parse CSV. Please ensure correct format.");
            } finally {
                setIsImporting(false);
                e.target.value = "";
            }
        };
        reader.readAsText(file);
    };

    const handleApproveAndShip = async (booking: Booking) => {
        setIsConverting(true);
        try {
            const shipmentData = {
                id: `SHP-${booking.id.split('-')[1] || Math.floor(1000 + Math.random() * 9000)}`,
                date: new Date().toISOString().split('T')[0],
                origin: booking.pickupLocation,
                destination: booking.deliveryLocation,
                status: "Pending",
                currentLocation: "Processing Warehouse",
                estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                consigneeName: booking.name,
                goodsDescription: booking.goodsDescription,
                history: [
                    { status: "Processing", date: new Date().toLocaleString(), location: booking.pickupLocation }
                ]
            };

            await addShipment(shipmentData);
            await updateBookingStatus(booking.id, "Processed");

            alert(`Booking converted to Shipment: ${shipmentData.id}`);
            setSelectedBooking(null);
        } catch (error) {
            console.error("Failed to convert booking:", error);
        } finally {
            setIsConverting(false);
        }
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
                    <h1 className="text-3xl font-display font-bold">Booking Requests</h1>
                    <p className="text-gray-400">Manage incoming load requests and convert them to live tracking.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="flex gap-2">
                        <button
                            onClick={handleExportCSV}
                            className="flex items-center gap-2 px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg hover:bg-dark-700 transition-all text-sm font-medium"
                        >
                            <FileText size={16} /> Export
                        </button>
                        <label className="flex items-center gap-2 px-4 py-2 bg-primary-600 border border-primary-500 rounded-lg hover:bg-primary-500 transition-all text-sm font-medium cursor-pointer">
                            <Plus size={16} /> {isImporting ? "Importing..." : "Import CSV"}
                            <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" disabled={isImporting} />
                        </label>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search client or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 w-64"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-dark-800 border border-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:border-primary-500"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processed">Processed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid gap-4">
                {filteredBookings.map((booking, index) => (
                    <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-dark-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all flex flex-col md:flex-row items-center gap-6 group"
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 border border-primary-500/20">
                                <Package size={24} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg">{booking.name}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${booking.status === "Processed" ? "bg-green-500/20 text-green-400" :
                                            booking.status === "Cancelled" ? "bg-red-500/20 text-red-400" :
                                                booking.status === "Confirmed" ? "bg-blue-500/20 text-blue-400" :
                                                    "bg-yellow-500/20 text-yellow-400"
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className="text-gray-500 text-xs flex items-center mt-1">
                                    <Clock size={12} className="mr-1" /> Requested on {new Date(booking.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-1 flex-[2]">
                            <div className="flex items-center text-sm text-gray-400">
                                <Truck size={14} className="mr-2 text-primary-500" />
                                <span className="font-medium text-gray-300 mr-2">Vehicle:</span> {booking.vehicleType}
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                                <MapPin size={14} className="mr-2 text-primary-500" />
                                <span className="font-medium text-gray-300 mr-2">Route:</span> {booking.pickupLocation.split(',')[0]} → {booking.deliveryLocation.split(',')[0]}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setSelectedBooking(booking)}
                                className="p-2 hover:bg-dark-700 text-gray-400 hover:text-white rounded-lg transition-colors border border-transparent hover:border-gray-600"
                                title="Quick View"
                            >
                                <Eye size={18} />
                            </button>
                            {booking.status !== "Processed" && booking.status !== "Cancelled" && (
                                <>
                                    <button
                                        onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                                        className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                                        title="Confirm Booking"
                                    >
                                        <CheckCircle size={18} />
                                    </button>
                                    <button
                                        onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                        title="Cancel Booking"
                                    >
                                        <XCircle size={18} />
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => { if (confirm("Permanently delete this booking?")) deleteBooking(booking.id); }}
                                className="p-2 hover:bg-dark-700 text-gray-500 hover:text-red-500 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {filteredBookings.length === 0 && (
                    <div className="text-center py-20 bg-dark-800/50 rounded-2xl border border-gray-700">
                        <p className="text-gray-400 text-lg">No booking requests found.</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {selectedBooking && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-dark-800 w-full max-w-2xl rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-dark-900/50">
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center">
                                        <FileText className="mr-3 text-primary-500" /> Booking Details
                                    </h2>
                                    <p className="text-xs text-gray-500 mt-1">ID: {selectedBooking.id}</p>
                                </div>
                                <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-white p-2 rounded-full transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Customer Information</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center text-sm">
                                                <User size={14} className="mr-3 text-primary-500" />
                                                {selectedBooking.name}
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <Phone size={14} className="mr-3 text-primary-500" />
                                                {selectedBooking.phone}
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <Mail size={14} className="mr-3 text-primary-500" />
                                                {selectedBooking.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Shipment Details</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center text-sm">
                                                <Truck size={14} className="mr-3 text-primary-500" />
                                                {selectedBooking.vehicleType}
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <div className="w-[14px] h-[14px] mr-3 text-primary-500 flex items-center justify-center"><Clock size={14} /></div>
                                                {selectedBooking.pickupDate} at {selectedBooking.pickupTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-dark-900/50 rounded-xl border border-gray-700/50 space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center gap-1 mt-1">
                                            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                                            <div className="w-0.5 h-8 bg-dashed border-l border-gray-700"></div>
                                            <div className="w-3 h-3 rounded-full border-2 border-primary-500"></div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">Pickup</p>
                                                <p className="text-sm font-medium">{selectedBooking.pickupLocation}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold">Delivery</p>
                                                <p className="text-sm font-medium">{selectedBooking.deliveryLocation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Goods Description</h4>
                                    <div className="p-4 bg-dark-700/30 rounded-lg text-sm italic text-gray-300 border border-gray-700">
                                        &quot;{selectedBooking.goodsDescription}&quot;
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-6 border-t border-gray-700">
                                    <div className="flex gap-3">
                                        {selectedBooking.status === "Pending" && (
                                            <button
                                                onClick={() => updateBookingStatus(selectedBooking.id, "Confirmed")}
                                                className="px-4 py-2 border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 rounded-lg text-sm font-bold transition-all"
                                            >
                                                Mark as Confirmed
                                            </button>
                                        )}
                                        {selectedBooking.status !== "Cancelled" && selectedBooking.status !== "Processed" && (
                                            <button
                                                onClick={() => updateBookingStatus(selectedBooking.id, "Cancelled")}
                                                className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-bold transition-all"
                                            >
                                                Cancel Request
                                            </button>
                                        )}
                                    </div>

                                    {selectedBooking.status !== "Processed" && selectedBooking.status !== "Cancelled" && (
                                        <button
                                            onClick={() => handleApproveAndShip(selectedBooking)}
                                            disabled={isConverting}
                                            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all shadow-xl shadow-primary-500/20 flex items-center"
                                        >
                                            {isConverting ? <Loader2 className="animate-spin mr-2 w-4 h-4" /> : <ExternalLink className="mr-2 w-4 h-4" />}
                                            Convert to Shipment
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}


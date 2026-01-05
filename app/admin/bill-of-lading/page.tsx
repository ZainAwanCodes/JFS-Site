"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown, Printer, Truck, Package } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function BillOfLadingPage() {
    const { drivers, addShipment } = useAdmin();
    const [formData, setFormData] = useState({
        trackingNumber: `BOL-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split("T")[0],
        shipperName: "",
        shipperAddress: "",
        shipperPhone: "",
        consigneeName: "",
        consigneeAddress: "",
        consigneePhone: "",
        driverId: "",
        origin: "Lahore",
        destination: "Karachi",
        goodsDescription: "",
        quantity: 1,
        weight: 1000,
        notes: "Handle with care.",
    });

    const generatePDF = () => {
        const doc = new jsPDF();

        // Brand Header
        doc.setFontSize(22);
        doc.setTextColor(6, 182, 212); // Primary Blue
        doc.text("JEEWAY FATEH SONS", 14, 20);
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text("Goods Transport Company Pakistan", 14, 26);
        doc.setFontSize(10);
        doc.text("CEO: Malik Aslam Awan", 14, 32);
        doc.text("Office: Rajbah Road Railway Mall Godam, Faisalabad", 14, 37);
        doc.text("Phone: 03006614521 | 03336614521", 14, 42);

        // Title
        doc.setFillColor(6, 182, 212);
        doc.rect(0, 50, 210, 10, 'F');
        doc.setTextColor(255);
        doc.setFontSize(14);
        doc.setFont("helvetica", 'bold');
        doc.text("BILL OF LADING", 105, 56.5, { align: "center" } as any);

        // Reset
        doc.setTextColor(0);
        doc.setFont("helvetica", 'normal');
        doc.setFontSize(10);

        // Tracking Info
        doc.text(`Tracking #: ${formData.trackingNumber}`, 14, 70);
        doc.text(`Date: ${formData.date}`, 150, 70);

        // Routes
        doc.text(`From: ${formData.origin}`, 14, 78);
        doc.text(`To: ${formData.destination}`, 150, 78);

        // Shipper & Consignee Boxes
        doc.setDrawColor(200);

        // Shipper
        doc.rect(14, 90, 85, 35);
        doc.setFont("helvetica", 'bold');
        doc.text("SHIPPER / SENDER:", 18, 96);
        doc.setFont("helvetica", 'normal');
        doc.text(formData.shipperName, 18, 103);
        doc.text(formData.shipperAddress, 18, 108, { maxWidth: 75 });
        doc.text(`Tel: ${formData.shipperPhone}`, 18, 120);

        // Consignee
        doc.rect(110, 90, 85, 35);
        doc.setFont("helvetica", 'bold');
        doc.text("CONSIGNEE / RECEIVER:", 114, 96);
        doc.setFont("helvetica", 'normal');
        doc.text(formData.consigneeName, 114, 103);
        doc.text(formData.consigneeAddress, 114, 108, { maxWidth: 75 });
        doc.text(`Tel: ${formData.consigneePhone}`, 114, 120);

        // Selected Driver
        const selectedDriver = drivers.find(d => d.id === formData.driverId);
        if (selectedDriver) {
            doc.setFont("helvetica", 'bold');
            doc.text("CARRIER DETAILS:", 14, 135);
            doc.setFont("helvetica", 'normal');
            doc.text(`Driver: ${selectedDriver.name} (${selectedDriver.phone})`, 14, 141);
            doc.text(`Vehicle: ${selectedDriver.truckType} - ${selectedDriver.truckNumber}`, 14, 147);
        }

        // Goods Table
        autoTable(doc, {
            startY: 155,
            head: [['Qty', 'Description of Goods', 'Weight (kg)', 'Notes']],
            body: [
                [formData.quantity, formData.goodsDescription, formData.weight, formData.notes],
            ],
            headStyles: { fillColor: [6, 182, 212], textColor: 255 },
            theme: 'grid'
        });

        const finalY = (doc as any).lastAutoTable.finalY || 160;

        // Terms & Signatures
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text("Received the above described goods in apparent good order and condition.", 14, finalY + 10);
        doc.text("Terms: The carrier shall not be liable for loss or damage due to causes beyond its control.", 14, finalY + 15);

        // Lines
        doc.setDrawColor(0);
        doc.line(14, finalY + 40, 80, finalY + 40); // Shipper Sig
        doc.text("Shipper Signature", 14, finalY + 45);

        doc.line(120, finalY + 40, 186, finalY + 40); // Carrier Sig
        doc.text("Carrier Signature", 120, finalY + 45);

        // Save
        // Save to Database (Context)
        addShipment({
            id: formData.trackingNumber,
            date: formData.date,
            origin: formData.origin,
            destination: formData.destination,
            status: "Pending",
            currentLocation: "Origin Warehouse",
            estimatedDelivery: "TBD",
            driverId: formData.driverId,
            consigneeName: formData.consigneeName,
            goodsDescription: formData.goodsDescription
        });

        // Save PDF
        doc.save(`${formData.trackingNumber}_BillOfLading.pdf`);
        alert("Shipment Created & PDF Downloaded!");
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white mb-8">Generate Bill of Lading</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-dark-800 p-6 rounded-xl border border-gray-700 space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center mb-4">
                        <FileText className="text-primary-500 mr-2" />
                        Shipment Details
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-400 text-sm">Tracking Number</label>
                            <input
                                type="text"
                                value={formData.trackingNumber}
                                onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="text-gray-400 text-sm">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                        <h3 className="text-blue-400 font-bold mb-2">Shipper</h3>
                        <input
                            type="text" placeholder="Shipper Name"
                            value={formData.shipperName}
                            onChange={(e) => setFormData({ ...formData, shipperName: e.target.value })}
                            className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white mb-2"
                        />
                        <input
                            type="text" placeholder="Shipper Address"
                            value={formData.shipperAddress}
                            onChange={(e) => setFormData({ ...formData, shipperAddress: e.target.value })}
                            className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white mb-2"
                        />
                        <input
                            type="text" placeholder="Shipper Phone"
                            value={formData.shipperPhone}
                            onChange={(e) => setFormData({ ...formData, shipperPhone: e.target.value })}
                            className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                        />
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                        <h3 className="text-blue-400 font-bold mb-2">Consignee</h3>
                        <input
                            type="text" placeholder="Consignee Name"
                            value={formData.consigneeName}
                            onChange={(e) => setFormData({ ...formData, consigneeName: e.target.value })}
                            className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white mb-2"
                        />
                        <input
                            type="text" placeholder="Consignee Address"
                            value={formData.consigneeAddress}
                            onChange={(e) => setFormData({ ...formData, consigneeAddress: e.target.value })}
                            className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white mb-2"
                        />
                        <input
                            type="text" placeholder="Consignee Phone"
                            value={formData.consigneePhone}
                            onChange={(e) => setFormData({ ...formData, consigneePhone: e.target.value })}
                            className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                        />
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                        <h3 className="text-blue-400 font-bold mb-2">Carrier & Route</h3>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <input type="text" placeholder="Origin" value={formData.origin} onChange={e => setFormData({ ...formData, origin: e.target.value })} className="bg-dark-900 border border-gray-700 rounded p-2 text-white" />
                            <input type="text" placeholder="Destination" value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} className="bg-dark-900 border border-gray-700 rounded p-2 text-white" />
                        </div>
                        <select
                            value={formData.driverId}
                            onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                            className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                        >
                            <option value="">Select Driver (Optional)</option>
                            {drivers.map(d => (
                                <option key={d.id} value={d.id}>{d.name} ({d.truckNumber})</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Goods & Actions */}
                <div className="space-y-6">
                    <div className="bg-dark-800 p-6 rounded-xl border border-gray-700 space-y-4">
                        <h2 className="text-xl font-bold text-white flex items-center mb-4">
                            <Package className="text-primary-500 mr-2" />
                            Cargo Details
                        </h2>

                        <div>
                            <label className="text-gray-400 text-sm">Description</label>
                            <textarea
                                rows={3}
                                value={formData.goodsDescription}
                                onChange={(e) => setFormData({ ...formData, goodsDescription: e.target.value })}
                                className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                                placeholder="E.g. 50 Boxes of Textiles"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-gray-400 text-sm">Quantity</label>
                                <input
                                    type="number"
                                    value={formData.quantity}
                                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                                    className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Weight (kg)</label>
                                <input
                                    type="number"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                                    className="w-full bg-dark-900 border border-gray-700 rounded p-2 text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={generatePDF}
                        className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold flex items-center justify-center transition-all shadow-lg shadow-primary-500/20"
                    >
                        <FileDown className="mr-2" size={24} />
                        Download PDF
                    </button>

                    <div className="bg-dark-900 border border-gray-800 p-4 rounded-lg text-sm text-gray-500">
                        <p className="flex items-center"><Printer size={14} className="mr-2" /> Note: This will generate a formal PDF document you can print or email to the client.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Needed for Lucide icon usage in this file
function FileText({ className, size }: { className?: string; size?: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
    )
}

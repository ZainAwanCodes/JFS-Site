"use client";


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentForm from "@/components/PaymentForm";
import { ShieldCheck, Truck } from "lucide-react";

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-transparent text-white">
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div>
                        <div className="bg-dark-800/50 rounded-2xl p-8 border border-gray-700">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                <Truck className="w-5 h-5 mr-2 text-primary-500" />
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-700">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Service</span>
                                    <span className="font-medium">Mazda Truck (Full Load)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Route</span>
                                    <span className="font-medium">Lahore <span className="text-gray-600">→</span> Karachi</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Date</span>
                                    <span className="font-medium">Tomorrow, 10:00 AM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Distance</span>
                                    <span className="font-medium">1,250 km</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-lg font-bold">
                                <span>Total Amount</span>
                                <span className="text-primary-400">PKR 45,000</span>
                            </div>

                            <div className="mt-8 bg-blue-500/10 p-4 rounded-lg flex items-start border border-blue-500/20">
                                <ShieldCheck className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-blue-200">
                                    Your shipment includes basic insurance coverage up to PKR 100,000.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div>
                        <PaymentForm amount="PKR 45,000" />
                    </div>
                </div>
            </div>
        </div>
    );
}

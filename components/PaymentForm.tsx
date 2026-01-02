"use client";

import { useState } from "react";
import { CreditCard, Lock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentForm({ amount }: { amount: string }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [name, setName] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
            >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                <p className="text-green-300">Your shipment has been confirmed.</p>
                <p className="text-sm text-gray-400 mt-4">Transaction ID: JFS-{Math.floor(Math.random() * 100000)}</p>
            </motion.div>
        );
    }

    return (
        <div className="bg-dark-800 rounded-2xl p-6 md:p-8 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Payment Details</h3>
                <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-gray-600 rounded"></div>
                    <div className="w-8 h-5 bg-gray-600 rounded"></div>
                </div>
            </div>

            <form onSubmit={handlePay} className="space-y-5">
                <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Card Holder Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-dark-900 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Card Number</label>
                    <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            className="w-full bg-dark-900 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                            placeholder="0000 0000 0000 0000"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Expiry Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                maxLength={5}
                                className="w-full bg-dark-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">CVC</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={cvc}
                                onChange={(e) => setCvc(e.target.value)}
                                maxLength={3}
                                className="w-full bg-dark-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                placeholder="123"
                                required
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary-500/25 transition-all mt-4 flex items-center justify-center"
                >
                    {isProcessing ? (
                        <span className="flex items-center">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                            Processing...
                        </span>
                    ) : (
                        <span>Pay {amount}</span>
                    )}
                </button>

                <p className="text-center text-xs text-gray-500 flex items-center justify-center">
                    <Lock className="w-3 h-3 mr-1" /> Secure encrypted payment
                </p>
            </form>
        </div>
    );
}

function CheckIcon(props: any) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    )
}

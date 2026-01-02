"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WriteReviewPage() {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            router.push("/reviews");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-transparent text-white">
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
                <Link
                    href="/reviews"
                    className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Reviews
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-800 p-8 md:p-10 rounded-3xl border border-gray-700 shadow-2xl"
                >
                    <h1 className="text-3xl font-display font-bold mb-2">Share Your Experience</h1>
                    <p className="text-gray-400 mb-8">Your feedback helps us improve our services.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-3">Rate your experience</label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoveredRating(star)}
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                                ? "text-yellow-500 fill-yellow-500"
                                                : "text-gray-600"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Order ID (Optional)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    placeholder="e.g., JFS-12345"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full px-4 py-3 bg-dark-900 border border-gray-700 rounded-xl text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                placeholder="Tell us about your experience..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || rating === 0}
                            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center transition-all ${isSubmitting || rating === 0
                                ? "bg-gray-700 cursor-not-allowed"
                                : "bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/25"
                                }`}
                        >
                            {isSubmitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    Submit Review <Send className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

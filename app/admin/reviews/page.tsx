"use client";

import { motion } from "framer-motion";
import { Star, Check, X, MessageSquare } from "lucide-react";

const mockReviews = [
    { id: 1, name: "Ahmed Khan", rating: 5, comment: "Outstanding service! Highly recommended.", date: "2 Days ago", status: "Pending" },
    { id: 2, name: "Fatima Ali", rating: 5, comment: "Very professional team.", date: "1 Week ago", status: "Approved" },
    { id: 3, name: "Unknown User", rating: 1, comment: "Late delivery.", date: "2 Weeks ago", status: "Rejected" },
    { id: 4, name: "Zainab Bibi", rating: 4, comment: "Good experience overall.", date: "3 Weeks ago", status: "Approved" },
];

export default function AdminReviewsPage() {
    return (
        <div className="p-8 text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold">Reviews Moderation</h1>
                <p className="text-gray-400">View and approve customer feedback.</p>
            </div>

            <div className="bg-dark-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
                <table className="w-full text-left">
                    <thead className="bg-dark-900 border-b border-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-gray-400 font-medium">User</th>
                            <th className="px-6 py-4 text-gray-400 font-medium">Rating</th>
                            <th className="px-6 py-4 text-gray-400 font-medium">Comment</th>
                            <th className="px-6 py-4 text-gray-400 font-medium">Status</th>
                            <th className="px-6 py-4 text-gray-400 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {mockReviews.map((review, i) => (
                            <motion.tr
                                key={review.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="hover:bg-dark-700/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-bold">{review.name}</div>
                                    <div className="text-xs text-gray-500">{review.date}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-600"}`} />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-300 italic">&quot;{review.comment}&quot;</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${review.status === "Approved" ? "bg-green-500/20 text-green-400" :
                                        review.status === "Rejected" ? "bg-red-500/20 text-red-400" :
                                            "bg-yellow-500/20 text-yellow-400"
                                        }`}>
                                        {review.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button className="p-1.5 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white rounded transition-colors" title="Approve">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors" title="Reject">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

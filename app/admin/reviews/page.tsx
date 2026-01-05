"use client";

import { motion } from "framer-motion";
import { Star, Check, X, Trash2, Loader2 } from "lucide-react";
import { useAdmin, Review } from "@/context/AdminContext";

export default function AdminReviewsPage() {
    const { reviews, updateReviewStatus, deleteReview, isLoading } = useAdmin();

    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin text-primary-500 w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="p-8 text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold">Reviews Moderation</h1>
                <p className="text-gray-400">View and approve customer feedback before it goes live.</p>
            </div>

            <div className="bg-dark-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
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
                            {reviews.map((review, i) => (
                                <motion.tr
                                    key={review.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-dark-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-bold">{review.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                                            {review.location && ` • ${review.location}`}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-gray-600"}`} />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 italic max-w-md">
                                        <p className="truncate" title={review.comment}>&quot;{review.comment}&quot;</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold capitalize ${review.status === "approved" ? "bg-green-500/20 text-green-400" :
                                            review.status === "dismissed" ? "bg-red-500/20 text-red-400" :
                                                "bg-yellow-500/20 text-yellow-400"
                                            }`}>
                                            {review.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2">
                                            {review.status !== "approved" && (
                                                <button
                                                    onClick={() => updateReviewStatus(review.id, "approved")}
                                                    className="p-1.5 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-white rounded transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                            {review.status !== "dismissed" && (
                                                <button
                                                    onClick={() => updateReviewStatus(review.id, "dismissed")}
                                                    className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors"
                                                    title="Reject"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    if (confirm("Delete this review permanently?")) {
                                                        deleteReview(review.id);
                                                    }
                                                }}
                                                className="p-1.5 bg-dark-700 text-gray-400 hover:bg-red-600 hover:text-white rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {reviews.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No reviews found to moderate.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

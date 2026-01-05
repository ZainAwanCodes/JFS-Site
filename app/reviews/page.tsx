"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import { Loader2, Plus } from "lucide-react";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Fetch approved reviews
                const res = await fetch("/api/reviews?status=approved");
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (error) {
                console.error("Failed to fetch reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen bg-transparent text-white">
            <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="mb-6 md:mb-0 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Customer <span className="text-primary-500">Reviews</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-xl">
                            See what our clients are saying about their experience with JFS Transport.
                        </p>
                    </div>

                    <Link
                        href="/reviews/write"
                        className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-primary-500/20"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Write a Review
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reviews.map((review: any, index: number) => (
                                <ReviewCard key={review.id} review={review} index={index} />
                            ))}
                        </div>

                        {reviews.length === 0 && (
                            <div className="text-center py-20 bg-dark-800/50 rounded-2xl border border-gray-700">
                                <p className="text-gray-400 text-lg">No reviews found yet. Be the first to write one!</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

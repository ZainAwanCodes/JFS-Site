"use client";

import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

interface Review {
    id: number;
    name: string;
    rating: number;
    comment: string;
    date: string;
    location: string;
}

export default function ReviewCard({ review, index }: { review: Review; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-800 p-6 rounded-2xl border border-gray-700 hover:border-primary-500/50 transition-all group relative"
        >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-500/10 group-hover:text-primary-500/20 transition-colors" />

            <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center border border-gray-600 mr-3">
                    <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                    <h4 className="font-bold text-white text-lg leading-tight">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location} • {review.date}</p>
                </div>
            </div>

            <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
                            }`}
                    />
                ))}
            </div>

            <p className="text-gray-300 leading-relaxed italic">&quot;{review.comment}&quot;</p>
        </motion.div>
    );
}

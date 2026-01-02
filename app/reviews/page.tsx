"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewCard from "@/components/ReviewCard";

const reviews = [
    {
        id: 1,
        name: "Ahmed Khan",
        rating: 5,
        comment: "Outstanding service! Our goods arrived on time and in perfect condition. Highly recommend JFS Transport.",
        date: "2 Days ago",
        location: "Lahore"
    },
    {
        id: 2,
        name: "Fatima Ali",
        rating: 5,
        comment: "Professional team, affordable rates, and excellent customer support. They made our logistics so much easier.",
        date: "1 Week ago",
        location: "Karachi"
    },
    {
        id: 3,
        name: "Hassan Malik",
        rating: 4,
        comment: "Reliable service. The driver was very cooperative. Will definitely use again for my business shipments.",
        date: "2 Weeks ago",
        location: "Islamabad"
    },
    {
        id: 4,
        name: "Zainab Bibi",
        rating: 5,
        comment: "The best transport company in Faisalabad. Very transparent pricing and real-time updates.",
        date: "3 Weeks ago",
        location: "Faisalabad"
    },
    {
        id: 5,
        name: "Bilal Sheikh",
        rating: 5,
        comment: "Moved my entire office furniture without a scratch. Kudos to the team!",
        date: "1 Month ago",
        location: "Multan"
    }
];

export default function ReviewsPage() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <ReviewCard key={review.id} review={review} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

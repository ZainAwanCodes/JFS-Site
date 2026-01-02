"use client";

import { useState } from "react";

import Link from "next/link";
import NextImage from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    image: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    const [error, setError] = useState(false);
    return (
        <div className="group bg-dark-800 rounded-2xl shadow-lg border border-gray-700 overflow-hidden flex flex-col h-full hover:shadow-primary-500/10 hover:border-primary-500/30 transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                <NextImage
                    src={error ? "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" : post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={() => setError(true)}
                />
                <div className="absolute top-4 left-4 bg-dark-900/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white flex items-center shadow-lg z-20 border border-gray-700">
                    <Calendar className="w-3 h-3 mr-2 text-primary-400" />
                    {post.date}
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow relative">
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                </p>

                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors mt-auto group/btn"
                >
                    <span className="border-b-2 border-primary-500/30 group-hover/btn:border-primary-500 pb-0.5 transition-all">Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}

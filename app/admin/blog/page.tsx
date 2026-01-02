"use client";

import { motion } from "framer-motion";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { mockBlogPosts } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";

export default function AdminBlogPage() {
    return (
        <div className="p-8 text-white min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Blog Management</h1>
                    <p className="text-gray-400">Create, edit, and manage news and articles.</p>
                </div>

                <button className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all font-bold shadow-lg shadow-primary-500/20">
                    <Plus className="w-4 h-4 mr-2" /> New Post
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBlogPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-dark-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all group"
                    >
                        <div className="relative h-48 w-full">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-80"></div>
                            <span className="absolute top-4 right-4 bg-primary-500 text-white text-xs px-2 py-1 rounded font-bold">
                                {post.category}
                            </span>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">{post.title}</h3>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                                <span className="text-xs text-gray-500">{post.date}</span>
                                <div className="flex space-x-2">
                                    <button className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/blog");
                if (res.ok) {
                    const data = await res.json();
                    setPosts(data);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="bg-transparent">
            {/* Header */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="text-center relative z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-wide drop-shadow-xl">
                            Transport <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Insights</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                            Stay ahead of the curve with the latest trends, expert tips, and company updates from the world of logistics.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Blog Grid */}
            <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    </div>
                ) : (
                    <>
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {posts.map((post: any) => (
                                <motion.div key={post.slug} variants={item}>
                                    <BlogCard post={post} />
                                </motion.div>
                            ))}
                        </motion.div>

                        {posts.length === 0 && (
                            <div className="text-center py-20 bg-dark-800/50 rounded-2xl border border-gray-700">
                                <p className="text-gray-400 text-lg">No articles found at the moment. Check back soon!</p>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* Newsletter */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-dark-800 to-dark-900 p-8 md:p-12 rounded-3xl border border-gray-700 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="text-center relative z-10">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">Subscribe to our Newsletter</h2>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get the latest transport tips and company news delivered directly to your inbox so you never miss an update.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 rounded-full bg-dark-950 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            />
                            <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-primary-500/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

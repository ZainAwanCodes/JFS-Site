"use client";

import Link from "next/link";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Users, Share2, Loader2 } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/blog?slug=${params.slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                }
            } catch (error) {
                console.error("Failed to fetch post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dark-900">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900 text-white">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link href="/blog" className="text-primary-400 hover:underline">Return to Blog</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-transparent text-gray-200">
            <article className="pt-32 pb-20 relative">
                {/* Post Header */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 mb-12 text-center relative z-10">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-gray-400 hover:text-primary-400 transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blog
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight drop-shadow-lg">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center space-x-6 text-gray-400 text-sm md:text-base bg-dark-800/50 inline-flex px-8 py-3 rounded-full border border-gray-700 backdrop-blur-sm">
                        <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                            {post.date}
                        </span>
                        <span className="w-px h-4 bg-gray-700"></span>
                        <span className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-primary-500" />
                            {post.author}
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16 relative">
                    <div className="absolute inset-0 bg-primary-500/10 blur-[100px] -z-10 rounded-full"></div>
                    <div className="aspect-w-21 aspect-h-9 rounded-3xl overflow-hidden shadow-2xl relative h-[500px] border border-gray-700">
                        <NextImage
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 md:px-8">
                    <div className="prose prose-lg prose-invert prose-orange mx-auto">
                        <p className="text-xl text-white mb-8 font-light italic border-l-4 border-primary-500 pl-6 py-2 bg-gradient-to-r from-primary-500/10 to-transparent rounded-r-lg">
                            {post.excerpt}
                        </p>

                        <div className="mb-6 text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>

                    {/* Share & Tags */}
                    <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-400 mr-4">Category:</span>
                            <span className="inline-block bg-dark-800 hover:bg-dark-700 transition-colors rounded-full px-4 py-1.5 text-sm text-primary-400 border border-gray-700 mr-2">{post.category}</span>
                        </div>
                        <button className="flex items-center text-gray-400 hover:text-white transition-colors bg-dark-800 hover:bg-primary-600 px-6 py-2 rounded-full border border-gray-700 hover:border-primary-500 group">
                            <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            Share Article
                        </button>
                    </div>
                </div>
            </article>
        </main>
    );
}

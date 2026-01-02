import Link from "next/link";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Users, Share2 } from "lucide-react";
import { mockBlogPosts } from "@/lib/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This is required for static site generation with dynamic routes in Next.js
export async function generateStaticParams() {
    return mockBlogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = mockBlogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-transparent text-gray-200">
            <Navbar />

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

                        <p className="mb-6 text-gray-300 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <h2 className="text-3xl font-display font-bold text-white mt-12 mb-6">Understanding the basics</h2>
                        <p className="mb-6 text-gray-300 leading-relaxed">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <ul className="list-none space-y-4 mb-8 pl-4">
                            {[
                                "Efficient route planning strategies",
                                "Proper packaging techniques for fragile items",
                                "Real-time tracking benefits",
                                "Understanding insurance coverage"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-300">
                                    <span className="w-2 h-2 rounded-full bg-primary-500 mr-4"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p className="mb-6 text-gray-300 leading-relaxed">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>

                    {/* Share & Tags */}
                    <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center">
                            <span className="text-sm font-bold text-gray-400 mr-4">Tags:</span>
                            <span className="inline-block bg-dark-800 hover:bg-dark-700 transition-colors rounded-full px-4 py-1.5 text-sm text-primary-400 border border-gray-700 mr-2 cursor-pointer">Logistics</span>
                            <span className="inline-block bg-dark-800 hover:bg-dark-700 transition-colors rounded-full px-4 py-1.5 text-sm text-primary-400 border border-gray-700 cursor-pointer">Transport</span>
                        </div>
                        <button className="flex items-center text-gray-400 hover:text-white transition-colors bg-dark-800 hover:bg-primary-600 px-6 py-2 rounded-full border border-gray-700 hover:border-primary-500 group">
                            <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            Share Article
                        </button>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}

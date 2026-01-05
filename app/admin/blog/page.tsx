"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Loader2, X, Image as ImageIcon } from "lucide-react";
import { useAdmin, Post } from "@/context/AdminContext";
import { useState } from "react";
import Image from "next/image";

export default function AdminBlogPage() {
    const { posts, addPost, updatePost, deletePost, isLoading } = useAdmin();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "General",
        author: "Admin",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });

    const handleOpenModal = (post?: Post) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                content: post.content,
                category: post.category,
                author: post.author || "Admin",
                image: post.image,
                date: post.date
            });
        } else {
            setEditingPost(null);
            setFormData({
                title: "",
                slug: "",
                excerpt: "",
                content: "",
                category: "General",
                author: "Admin",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
                date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPost) {
            await updatePost(editingPost.id, formData);
        } else {
            await addPost(formData);
        }
        setIsModalOpen(false);
    };

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-0]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    };

    if (isLoading) {
        return (
            <div className="p-8 flex justify-center items-center min-h-[400px]">
                <Loader2 className="animate-spin text-primary-500 w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="p-8 text-white min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Blog Management</h1>
                    <p className="text-gray-400">Create, edit, and manage news and articles.</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all font-bold shadow-lg shadow-primary-500/20"
                >
                    <Plus className="w-4 h-4 mr-2" /> New Post
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
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
                            <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight h-12">{post.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-3 mb-4 h-15">{post.excerpt}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <span className="text-xs text-gray-500">{post.date}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleOpenModal(post)}
                                        className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm("Delete this post?")) deletePost(post.id);
                                        }}
                                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-dark-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-700 shadow-2xl"
                        >
                            <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-dark-800 z-10">
                                <h2 className="text-2xl font-bold">{editingPost ? "Edit Blog Post" : "Create New Post"}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => {
                                                    setFormData({
                                                        ...formData,
                                                        title: e.target.value,
                                                        slug: editingPost ? formData.slug : generateSlug(e.target.value)
                                                    });
                                                }}
                                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                                placeholder="Enter post title"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Slug (URL friendly)</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                                placeholder="post-url-slug"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1">Category</label>
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                                >
                                                    <option>Logistics</option>
                                                    <option>Company News</option>
                                                    <option>Transport</option>
                                                    <option>Supply Chain</option>
                                                    <option>Tips & Tricks</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-1">Author</label>
                                                <input
                                                    type="text"
                                                    value={formData.author}
                                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                                    className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Featured Image URL</label>
                                            <div className="flex space-x-2">
                                                <input
                                                    type="text"
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                    className="flex-1 bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative h-40 w-full rounded-lg overflow-hidden border border-gray-700 bg-dark-900 flex items-center justify-center">
                                            {formData.image ? (
                                                <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                            ) : (
                                                <div className="text-gray-600 flex flex-col items-center">
                                                    <ImageIcon className="w-8 h-8 mb-2" />
                                                    <span>Image Preview</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Excerpt (Short description)</label>
                                    <textarea
                                        rows={2}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500"
                                        placeholder="Brief summary for list view..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Content (Markdown supported)</label>
                                    <textarea
                                        rows={10}
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full bg-dark-900 border border-gray-700 rounded-lg p-3 text-white outline-none focus:border-primary-500 font-mono text-sm"
                                        placeholder="Write your article here..."
                                    />
                                </div>

                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20"
                                    >
                                        {editingPost ? "Update Post" : "Publish Post"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

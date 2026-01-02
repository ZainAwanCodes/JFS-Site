"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Truck, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate login delay
        setTimeout(() => {
            if (email === "admin@jfs.com" && password === "admin123") {
                // Successful login
                localStorage.setItem("isAdmin", "true");
                router.push("/admin");
            } else {
                setError("Invalid credentials. Use admin@jfs.com / admin123");
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-dark-800/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 md:p-10 w-full max-w-md shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/10 mb-4">
                        <Truck className="w-8 h-8 text-primary-500" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-white mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Sign in to manage JFS Transport</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-dark-900 border border-gray-600 rounded-lg text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all font-sans"
                            placeholder="admin@jfs.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-dark-900 border border-gray-600 rounded-lg text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all font-sans"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="text-red-400 text-sm flex items-center bg-red-500/10 p-3 rounded-lg"
                        >
                            <Lock className="w-4 h-4 mr-2" /> {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3.5 rounded-lg font-bold text-white flex items-center justify-center transition-all ${isLoading
                                ? "bg-gray-700 cursor-not-allowed"
                                : "bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40"
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                                Authenticating...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                Sign In <ChevronRight className="w-4 h-4 ml-1" />
                            </span>
                        )}
                    </button>

                    <div className="text-center mt-6">
                        <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
                            ← Back to Website
                        </Link>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}

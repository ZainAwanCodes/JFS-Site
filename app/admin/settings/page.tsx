"use client";

import { motion } from "framer-motion";
import { User, Lock, Bell, Globe, Save } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="p-8 text-white min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold">Settings</h1>
                <p className="text-gray-400">Manage your profile and site preferences.</p>
            </div>

            <div className="max-w-4xl">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-dark-800 rounded-xl p-6 border border-gray-700 mb-6"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                        <User className="w-5 h-5 mr-3 text-primary-500" />
                        Admin Profile
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                            <input type="text" defaultValue="Admin User" className="w-full bg-dark-900 border border-gray-600 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                            <input type="email" defaultValue="admin@jfs.com" className="w-full bg-dark-900 border border-gray-600 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none" />
                        </div>
                    </div>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-dark-800 rounded-xl p-6 border border-gray-700 mb-6"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                        <Lock className="w-5 h-5 mr-3 text-primary-500" />
                        Security
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-gray-600 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">New Password</label>
                            <input type="password" placeholder="••••••••" className="w-full bg-dark-900 border border-gray-600 rounded-lg px-4 py-3 focus:border-primary-500 focus:outline-none" />
                        </div>
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-dark-800 rounded-xl p-6 border border-gray-700 mb-8"
                >
                    <h2 className="text-xl font-bold mb-6 flex items-center">
                        <Bell className="w-5 h-5 mr-3 text-primary-500" />
                        Notifications
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-dark-900 rounded-lg border border-gray-700">
                            <div>
                                <h4 className="font-bold">New Booking Alerts</h4>
                                <p className="text-sm text-gray-400">Receive email when a new booking is placed.</p>
                            </div>
                            <div className="w-12 h-6 bg-primary-500 rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-dark-900 rounded-lg border border-gray-700">
                            <div>
                                <h4 className="font-bold">System Updates</h4>
                                <p className="text-sm text-gray-400">Get notified about system maintenance.</p>
                            </div>
                            <div className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-end">
                    <button className="flex items-center px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg shadow-lg hover:shadow-primary-500/30 transition-all">
                        <Save className="w-5 h-5 mr-2" /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

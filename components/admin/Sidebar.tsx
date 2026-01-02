"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Archive, FileText, Settings, LogOut, Truck, DollarSign, UserCircle } from "lucide-react";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        { icon: Archive, label: "Bookings", href: "/admin/bookings" },
        { icon: Truck, label: "All Shipments", href: "/admin/shipments" },
        { icon: DollarSign, label: "Pricing Config", href: "/admin/pricing" },
        { icon: UserCircle, label: "Drivers", href: "/admin/drivers" },
        { icon: FileText, label: "Bill of Lading", href: "/admin/bill-of-lading" },
        { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
        { icon: FileText, label: "Reviews", href: "/admin/reviews" },
        { icon: Settings, label: "Settings", href: "/admin/settings" },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-900 border-r border-gray-800 text-white z-50 overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Truck className="text-secondary" />
                    <span>JFS Admin</span>
                </h1>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                ? "bg-secondary text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
                <button
                    onClick={() => {
                        localStorage.removeItem("isAdmin");
                        window.location.href = "/admin/login";
                    }}
                    className="flex items-center space-x-3 text-gray-400 hover:text-white w-full px-4 py-3 rounded-lg hover:bg-dark-800 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

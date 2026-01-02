"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Skip check for login page
        if (pathname === "/admin/login") {
            setIsAuthorized(true);
            return;
        }

        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
            router.push("/admin/login");
        } else {
            setIsAuthorized(true);
        }
    }, [router, pathname]);

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (!isAuthorized) {
        return null; // Or a loading spinner
    }

    return (
        <div className="flex min-h-screen bg-dark-900">
            <AdminSidebar />
            <main className="flex-1 ml-64 bg-dark-900">
                {children}
            </main>
        </div>
    );
}


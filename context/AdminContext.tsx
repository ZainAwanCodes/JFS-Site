"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Types ---

export interface PricingRates {
    mazda: number;
    hyundai: number;
    shehzore: number;
    container: number;
    perKmRate: number;
    weightMultiplier: number;
}

export interface Driver {
    id: string;
    name: string;
    phone: string;
    truckNumber: string;
    truckType: string;
    city: string;
    status: "Active" | "Inactive" | "On Trip";
}

export interface Shipment {
    id: string; // Acts as Tracking ID
    date: string;
    origin: string;
    destination: string;
    status: "Pending" | "Picked Up" | "In Transit" | "Delivered";
    currentLocation: string;
    estimatedDelivery: string;
    driverId?: string;
    consigneeName: string;
    goodsDescription: string;
    updatedAt?: string;
    history?: { status: string; date: string; location: string }[];
}

export interface Booking {
    id: string;
    pickupDate: string;
    pickupTime: string;
    pickupLocation: string;
    deliveryLocation: string;
    vehicleType: string;
    goodsDescription: string;
    name: string;
    phone: string;
    email: string;
    status: string;
    createdAt: string;
}

export interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    status: "pending" | "approved" | "dismissed";
    createdAt: string;
    location?: string;
}

export interface Post {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    image: string;
    date: string;
    createdAt: string;
}

interface AdminContextType {
    rates: PricingRates;
    updateRates: (newRates: PricingRates) => Promise<void>;
    drivers: Driver[];
    addDriver: (driver: Omit<Driver, "id">) => Promise<void>;
    updateDriver: (id: string, updates: Partial<Driver>) => Promise<void>;
    deleteDriver: (id: string) => Promise<void>;
    shipments: Shipment[];
    addShipment: (shipment: any) => Promise<void>;
    updateShipment: (id: string, updates: Partial<Shipment>) => Promise<void>;
    bookings: Booking[];
    addBooking: (booking: any) => Promise<void>;
    updateBookingStatus: (id: string, status: string) => Promise<void>;
    deleteBooking: (id: string) => Promise<void>;
    importBookings: (bookingsData: any[]) => Promise<void>;
    reviews: Review[];
    updateReviewStatus: (id: string, status: Review["status"]) => Promise<void>;
    deleteReview: (id: string) => Promise<void>;
    posts: Post[];
    addPost: (post: Omit<Post, "id" | "createdAt">) => Promise<void>;
    updatePost: (id: string, updates: Partial<Post>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    isLoading: boolean;
}

const defaultRates: PricingRates = {
    mazda: 50,
    hyundai: 80,
    shehzore: 30,
    container: 120,
    perKmRate: 1,
    weightMultiplier: 0.1,
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [rates, setRates] = useState<PricingRates>(defaultRates);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial load from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ratesRes, driversRes, shipmentsRes, bookingsRes, reviewsRes, postsRes] = await Promise.all([
                    fetch("/api/pricing"),
                    fetch("/api/drivers"),
                    fetch("/api/shipments"),
                    fetch("/api/bookings"),
                    fetch("/api/reviews"),
                    fetch("/api/blog")
                ]);

                if (ratesRes.ok) setRates(await ratesRes.json());
                if (driversRes.ok) setDrivers(await driversRes.json() || []);
                if (shipmentsRes.ok) setShipments(await shipmentsRes.json() || []);
                if (bookingsRes.ok) setBookings(await bookingsRes.json() || []);
                if (reviewsRes.ok) setReviews(await reviewsRes.json() || []);
                if (postsRes.ok) setPosts(await postsRes.json() || []);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateRates = async (newRates: PricingRates) => {
        try {
            const res = await fetch("/api/pricing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRates),
            });
            if (res.ok) setRates(newRates);
        } catch (error) {
            console.error("Failed to update rates:", error);
        }
    };

    const addDriver = async (driverData: Omit<Driver, "id">) => {
        try {
            const res = await fetch("/api/drivers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(driverData),
            });
            if (res.ok) {
                const newDriver = await res.json();
                setDrivers((prev) => [...prev, newDriver]);
            }
        } catch (error) {
            console.error("Failed to add driver:", error);
        }
    };

    const updateDriver = async (id: string, updates: Partial<Driver>) => {
        try {
            const res = await fetch("/api/drivers", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updates }),
            });
            if (res.ok) {
                setDrivers((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
            }
        } catch (error) {
            console.error("Failed to update driver:", error);
        }
    };

    const deleteDriver = async (id: string) => {
        try {
            const res = await fetch(`/api/drivers?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setDrivers((prev) => prev.filter((d) => d.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete driver:", error);
        }
    };

    const addShipment = async (shipmentData: any) => {
        try {
            const res = await fetch("/api/shipments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(shipmentData),
            });
            if (res.ok) {
                const newShipment = await res.json();
                setShipments((prev) => [newShipment, ...prev]);
            }
        } catch (error) {
            console.error("Failed to add shipment:", error);
        }
    };

    const updateShipment = async (id: string, updates: Partial<Shipment>) => {
        try {
            const res = await fetch("/api/shipments", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updates }),
            });
            if (res.ok) {
                setShipments((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
            }
        } catch (error) {
            console.error("Failed to update shipment:", error);
        }
    };

    const addBooking = async (bookingData: any) => {
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });
            if (res.ok) {
                const newBooking = await res.json();
                setBookings((prev) => [newBooking.booking, ...prev]);
            }
        } catch (error) {
            console.error("Failed to add booking:", error);
        }
    };

    const updateBookingStatus = async (id: string, status: string) => {
        try {
            const res = await fetch("/api/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
            }
        } catch (error) {
            console.error("Failed to update booking status:", error);
        }
    };

    const deleteBooking = async (id: string) => {
        try {
            const res = await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setBookings((prev) => prev.filter((b) => b.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete booking:", error);
        }
    };

    const importBookings = async (bookingsData: any[]) => {
        try {
            // Simplified batch: loop and add
            for (const b of bookingsData) {
                await addBooking(b);
            }
        } catch (error) {
            console.error("Batch import failed:", error);
        }
    };

    const updateReviewStatus = async (id: string, status: Review["status"]) => {
        try {
            const res = await fetch("/api/reviews", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
            }
        } catch (error) {
            console.error("Failed to update review status:", error);
        }
    };

    const deleteReview = async (id: string) => {
        try {
            const res = await fetch(`/api/reviews?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setReviews((prev) => prev.filter((r) => r.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete review:", error);
        }
    };

    const addPost = async (postData: Omit<Post, "id" | "createdAt">) => {
        try {
            const res = await fetch("/api/blog", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });
            if (res.ok) {
                const newPost = await res.json();
                setPosts((prev) => [newPost, ...prev]);
            }
        } catch (error) {
            console.error("Failed to add post:", error);
        }
    };

    const updatePost = async (id: string, updates: Partial<Post>) => {
        try {
            const res = await fetch("/api/blog", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...updates }),
            });
            if (res.ok) {
                setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
            }
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    };

    const deletePost = async (id: string) => {
        try {
            const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setPosts((prev) => prev.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete post:", error);
        }
    };

    return (
        <AdminContext.Provider
            value={{
                rates,
                updateRates,
                drivers,
                addDriver,
                updateDriver,
                deleteDriver,
                shipments,
                addShipment,
                updateShipment,
                bookings,
                addBooking,
                updateBookingStatus,
                deleteBooking,
                importBookings,
                reviews,
                updateReviewStatus,
                deleteReview,
                posts,
                addPost,
                updatePost,
                deletePost,
                isLoading
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}

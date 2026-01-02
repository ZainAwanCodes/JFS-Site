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
    truckType: string; // e.g., "Mazda", "Hyundai"
    city: string; // Route City
    status: "Active" | "Inactive" | "On Trip";
}

export interface Shipment {
    trackingNumber: string; // Acts as ID
    date: string;
    origin: string;
    destination: string;
    status: "Pending" | "Picked Up" | "In Transit" | "Delivered";
    driverId?: string;
    consigneeName: string;
    goodsDescription: string;
}

interface AdminContextType {
    // Pricing
    rates: PricingRates;
    updateRates: (newRates: PricingRates) => void;

    // Drivers
    drivers: Driver[];
    addDriver: (driver: Omit<Driver, "id">) => void;
    updateDriver: (id: string, updates: Partial<Driver>) => void;
    deleteDriver: (id: string) => void;

    // Shipments
    shipments: Shipment[];
    addShipment: (shipment: Shipment) => void;
    updateShipmentStatus: (trackingNumber: string, status: Shipment["status"]) => void;
}

// --- Default Values ---

const defaultRates: PricingRates = {
    mazda: 50,
    hyundai: 80,
    shehzore: 30,
    container: 120,
    perKmRate: 1, // Base multiplier for distance
    weightMultiplier: 0.1, // 10% extra per ton
};

const defaultDrivers: Driver[] = [
    {
        id: "1",
        name: "Ali Khan",
        phone: "0300-1234567",
        truckNumber: "LEC-1234",
        truckType: "Mazda",
        city: "Lahore",
        status: "Active",
    },
    {
        id: "2",
        name: "Muhammad Rizwan",
        phone: "0321-9876543",
        truckNumber: "KHI-5678",
        truckType: "Container",
        city: "Karachi",
        status: "On Trip",
    },
];

// --- Context ---

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    // Initialize state with lazy initialization to access localStorage only on client
    const [rates, setRates] = useState<PricingRates>(defaultRates);
    const [drivers, setDrivers] = useState<Driver[]>(defaultDrivers);
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedRates = localStorage.getItem("jfs_rates");
        const savedDrivers = localStorage.getItem("jfs_drivers");
        const savedShipments = localStorage.getItem("jfs_shipments");

        if (savedRates) {
            try {
                setRates(JSON.parse(savedRates));
            } catch (e) {
                console.error("Failed to parse rates", e);
            }
        }

        if (savedDrivers) {
            try {
                setDrivers(JSON.parse(savedDrivers));
            } catch (e) {
                console.error("Failed to parse drivers", e);
            }
        }

        if (savedShipments) {
            try {
                setShipments(JSON.parse(savedShipments));
            } catch (e) {
                console.error("Failed to parse shipments", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("jfs_rates", JSON.stringify(rates));
        }
    }, [rates, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("jfs_drivers", JSON.stringify(drivers));
        }
    }, [drivers, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("jfs_shipments", JSON.stringify(shipments));
        }
    }, [shipments, isLoaded]);

    // Actions
    const updateRates = (newRates: PricingRates) => {
        setRates(newRates);
    };

    const addDriver = (driverData: Omit<Driver, "id">) => {
        const newDriver: Driver = {
            ...driverData,
            id: Math.random().toString(36).substr(2, 9),
        };
        setDrivers((prev) => [...prev, newDriver]);
    };

    const updateDriver = (id: string, updates: Partial<Driver>) => {
        setDrivers((prev) =>
            prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
        );
    };

    const deleteDriver = (id: string) => {
        setDrivers((prev) => prev.filter((d) => d.id !== id));
    };

    const addShipment = (shipment: Shipment) => {
        setShipments((prev) => {
            // Avoid duplicates
            if (prev.find(s => s.trackingNumber === shipment.trackingNumber)) return prev;
            return [shipment, ...prev];
        });
    };

    const updateShipmentStatus = (trackingNumber: string, status: Shipment["status"]) => {
        setShipments((prev) => prev.map(s => s.trackingNumber === trackingNumber ? { ...s, status } : s));
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
                updateShipmentStatus
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

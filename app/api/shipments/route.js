import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
        const shipment = db.shipments.getById(id);
        if (!shipment) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(shipment);
    }

    return NextResponse.json(db.shipments.getAll());
}

export async function POST(request) {
    const data = await request.json();
    const shipment = db.shipments.add(data);
    return NextResponse.json(shipment);
}

export async function PATCH(request) {
    try {
        const data = await request.json();
        const { id, ...updates } = data;

        // Find existing shipment to check for changes
        const currentShipment = db.shipments.getById(id);
        if (currentShipment) {
            const history = currentShipment.history || [];

            // If status or location changed, add to history
            const statusChanged = updates.status && updates.status !== currentShipment.status;
            const locationChanged = updates.currentLocation && updates.currentLocation !== currentShipment.currentLocation;

            if (statusChanged || locationChanged) {
                const newHistoryEntry = {
                    status: updates.status || currentShipment.status,
                    location: updates.currentLocation || currentShipment.currentLocation,
                    date: new Date().toLocaleString('en-PK', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                };
                updates.history = [...history, newHistoryEntry];
            }
        }

        db.shipments.update(id, updates);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

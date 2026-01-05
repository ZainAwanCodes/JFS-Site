import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json();
        const booking = db.bookings.add(data);
        return NextResponse.json({ success: true, booking });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const bookings = db.bookings.getAll();
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const data = await request.json();
        const { id, status } = data;
        db.bookings.updateStatus(id, status);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        db.bookings.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

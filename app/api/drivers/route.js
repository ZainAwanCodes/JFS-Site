import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const drivers = await db.drivers.getAll();
    return NextResponse.json(drivers);
}

export async function POST(request) {
    const data = await request.json();
    const driver = await db.drivers.add(data);
    return NextResponse.json(driver);
}

export async function PATCH(request) {
    const data = await request.json();
    const { id, ...updates } = data;
    await db.drivers.update(id, updates);
    return NextResponse.json({ success: true });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    await db.drivers.delete(id);
    return NextResponse.json({ success: true });
}

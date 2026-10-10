import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const pricing = await db.pricing.get();
    return NextResponse.json(pricing);
}

export async function POST(request) {
    const data = await request.json();
    await db.pricing.update(data);
    return NextResponse.json({ success: true });
}

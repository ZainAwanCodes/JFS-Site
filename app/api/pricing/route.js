import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(db.pricing.get());
}

export async function POST(request) {
    const data = await request.json();
    db.pricing.update(data);
    return NextResponse.json({ success: true });
}

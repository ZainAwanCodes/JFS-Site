import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json();
        const message = db.messages.add(data);
        return NextResponse.json({ success: true, message });
    } catch (error) {
        return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const messages = db.messages.getAll();
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    try {
        let reviews = db.reviews.getAll();
        if (status) {
            reviews = reviews.filter(r => r.status === status);
        }
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const review = db.reviews.add(data);
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const data = await request.json();
        const { id, status } = data;
        db.reviews.updateStatus(id, status);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        db.reviews.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
}


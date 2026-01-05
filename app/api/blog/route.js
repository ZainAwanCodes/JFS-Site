import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
        try {
            const post = db.posts.getBySlug(slug);
            if (!post) {
                return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }
            return NextResponse.json(post);
        } catch (error) {
            return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
        }
    }

    try {
        const posts = db.posts.getAll();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const post = db.posts.add(data);
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const data = await request.json();
        const { id, ...updates } = data;
        db.posts.update(id, updates);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        db.posts.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}


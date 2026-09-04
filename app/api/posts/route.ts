import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const posts = await prisma.post.findMany({ include: { author: { select: { username: true, avatar: true } }, _count: { select: { comments: true, reactions: true } } }, orderBy: { createdAt: "desc" }, take: 50 });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Silakan login terlebih dahulu." }, { status: 401 });
  const body = await req.json();
  const title = String(body.title ?? "").trim();
  const content = String(body.content ?? "").trim();
  if (!title || !content) return NextResponse.json({ error: "Judul dan isi wajib diisi." }, { status: 400 });
  const post = await prisma.post.create({ data: { title, content, category: String(body.category ?? "Random"), mood: String(body.mood ?? "Santai"), level: Math.min(5, Math.max(1, Number(body.level) || 1)), anonymous: Boolean(body.anonymous), authorId: user.id } });
  return NextResponse.json(post, { status: 201 });
}

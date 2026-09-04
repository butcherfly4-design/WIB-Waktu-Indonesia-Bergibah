import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({ where: { postId: params.id }, include: { author: { select: { username: true, avatar: true } } }, orderBy: { createdAt: "asc" } });
  return NextResponse.json(comments);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Silakan login untuk berkomentar." }, { status: 401 });
  const body = await req.json();
  const content = String(body.content ?? "").trim();
  if (!content) return NextResponse.json({ error: "Komentar tidak boleh kosong." }, { status: 400 });
  const post = await prisma.post.findUnique({ where: { id: params.id }, select: { authorId: true } });
  if (!post) return NextResponse.json({ error: "Gibah tidak ditemukan." }, { status: 404 });
  const comment = await prisma.comment.create({ data: { content, postId: params.id, authorId: user.id } });
  if (post.authorId && post.authorId !== user.id) await prisma.notification.create({ data: { userId: post.authorId, type: "comment", message: `@${user.username} mengomentari gibah kamu.` } });
  return NextResponse.json(comment, { status: 201 });
}

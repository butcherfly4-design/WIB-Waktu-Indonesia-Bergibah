import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/auth";
import { createHash } from "crypto";

const hash = (value: string) => createHash("sha256").update(`${value}:${process.env.PASSWORD_SALT ?? "wib"}`).digest("hex");

export async function POST(req: Request) {
  const body = await req.json();
  const username = String(body.username ?? "").trim().toLowerCase();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  if (!username || !email || password.length < 8) return NextResponse.json({ error: "Username, email, dan password minimal 8 karakter wajib diisi." }, { status: 400 });
  const exists = await prisma.user.findFirst({ where: { OR: [{ username }, { email }] } });
  if (exists) return NextResponse.json({ error: "Username atau email sudah digunakan." }, { status: 409 });
  const user = await prisma.user.create({ data: { username, email, passwordHash: hash(password) } });
  await setSession(user.id);
  return NextResponse.json({ ok: true, user: { id: user.id, username: user.username } });
}

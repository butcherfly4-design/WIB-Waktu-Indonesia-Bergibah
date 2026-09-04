import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setSession } from "@/lib/auth";
import { createHash } from "crypto";

const hash = (value: string) => createHash("sha256").update(`${value}:${process.env.PASSWORD_SALT ?? "wib"}`).digest("hex");

export async function POST(req: Request) {
  const body = await req.json();
  const login = String(body.login ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const user = await prisma.user.findFirst({ where: { OR: [{ email: login }, { username: login }] } });
  if (!user || user.passwordHash !== hash(password)) return NextResponse.json({ error: "Login atau password salah." }, { status: 401 });
  await setSession(user.id);
  return NextResponse.json({ ok: true, user: { id: user.id, username: user.username } });
}

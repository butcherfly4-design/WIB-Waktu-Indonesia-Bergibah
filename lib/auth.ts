import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const id = cookies().get("wib_user")?.value;
  if (!id) return null;
  return prisma.user.findUnique({ where: { id } });
}

export async function setSession(userId: string) {
  cookies().set("wib_user", userId, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
}

export async function clearSession() {
  cookies().delete("wib_user");
}

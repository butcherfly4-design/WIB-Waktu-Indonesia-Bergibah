"use client";

import Link from "next/link";
import { Bell, Search, UserRound, Plus, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";

type Notification = { id: string; type: string; message: string; read: boolean; createdAt: string };

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  async function loadNotifications() {
    const res = await fetch("/api/notifications", { cache: "no-store" });
    if (res.ok) setNotifications(await res.json());
  }

  useEffect(() => { loadNotifications().catch(() => undefined); }, []);

  async function toggleNotifications() {
    const next = !open;
    setOpen(next);
    if (next) await loadNotifications();
  }

  async function markAllRead() {
    await fetch("/api/notifications", { method: "PATCH" });
    setNotifications((items) => items.map((n) => ({ ...n, read: true })));
  }

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4">
        <Link href="/" className="mr-auto flex items-center gap-2 font-black tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-sm shadow-glow">WIB</span><span className="hidden sm:block">Waktu Indonesia Bergibah</span></Link>
        <nav className="hidden items-center gap-1 md:flex"><Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/">Home</Link><Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/trending">Trending</Link><Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/explore">Explore</Link><Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/leaderboard">Leaderboard</Link></nav>
        <button className="hidden rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-white sm:block"><Search size={18}/></button>
        <div className="relative"><button onClick={toggleNotifications} aria-label="Notifikasi" className="relative rounded-xl p-2 text-zinc-400 hover:bg-white/5 hover:text-white"><Bell size={19}/>{unread > 0 && <span className="absolute right-0 top-0 grid min-h-4 min-w-4 place-items-center rounded-full bg-pink-500 px-1 text-[9px] font-bold text-white">{unread > 9 ? "9+" : unread}</span>}</button>{open && <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl"><div className="flex items-center justify-between border-b border-white/5 px-4 py-3"><b>Notifikasi 🔔</b>{unread > 0 && <button onClick={markAllRead} className="text-xs text-purple-300 hover:text-white"><CheckCheck size={16}/></button>}</div><div className="max-h-80 overflow-y-auto">{notifications.length === 0 ? <p className="p-6 text-center text-sm text-zinc-500">Belum ada notifikasi. Aman... terlalu aman. ☕</p> : notifications.map((n) => <div key={n.id} className={`border-b border-white/5 px-4 py-3 text-sm ${n.read ? "text-zinc-400" : "bg-purple-500/10 text-white"}`}><div>{n.message}</div><div className="mt-1 text-[10px] text-zinc-600">{new Date(n.createdAt).toLocaleString("id-ID")}</div></div>)}</div></div>}</div>
        <Link href="#gibah" className="flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-sm font-bold text-black hover:scale-[1.02]"><Plus size={17}/> Gibah</Link><Link href="/profile/aku" className="hidden text-zinc-400 hover:text-white sm:block"><UserRound size={19}/></Link>
      </div>
    </header>
  );
}

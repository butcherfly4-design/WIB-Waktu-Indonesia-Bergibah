 "use client";
import Link from "next/link";
import { Bell, Search, UserRound, Plus } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4">
        <Link href="/" className="mr-auto flex items-center gap-2 font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-sm shadow-glow">WIB</span>
          <span className="hidden sm:block">Waktu Indonesia Bergibah</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/">Home</Link>
          <Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/trending">Trending</Link>
          <Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/explore">Explore</Link>
          <Link className="rounded-xl px-3 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white" href="/leaderboard">Leaderboard</Link>
        </nav>
        <button className="hidden rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-400 hover:text-white sm:block"><Search size={18}/></button>
        <button className="hidden text-zinc-400 hover:text-white sm:block"><Bell size={19}/></button>
        <Link href="#gibah" className="flex items-center gap-1 rounded-xl bg-white px-3 py-2 text-sm font-bold text-black hover:scale-[1.02]"><Plus size={17}/> Gibah</Link>
        <Link href="/profile/aku" className="hidden text-zinc-400 hover:text-white sm:block"><UserRound size={19}/></Link>
      </div>
    </header>
  );
}
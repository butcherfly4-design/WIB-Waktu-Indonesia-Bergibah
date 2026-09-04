 "use client";
import { useState } from "react";

export function CreateGibah() {
  const [sent, setSent] = useState(false);
  return (
    <section id="gibah" className="glass rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-pink-300">+ Tambah Gibah</p><h3 className="mt-1 text-xl font-bold">Ada cerita? Jangan dipendam sendirian.</h3></div>
        <span className="text-2xl">🫢</span>
      </div>
      {sent ? (
        <div className="mt-5 rounded-2xl bg-green-500/10 p-5 text-green-200">🗣️ Spill berhasil! Ceritamu sudah masuk antrean gibah.</div>
      ) : (
        <form className="mt-5 space-y-3" onSubmit={e=>{e.preventDefault();setSent(true)}}>
          <input required placeholder="Judul gibah..." className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-purple-400/50"/>
          <textarea required rows={4} placeholder="Ceritain dari awal. Jangan lompat-lompat, kami kepo." className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-purple-400/50"/>
          <div className="grid gap-3 sm:grid-cols-2">
            <select className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3"><option>👀 Drama</option><option>😂 Random</option><option>🔥 Viral</option><option>🏫 Sekolah</option></select>
            <select className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3"><option>😂 Ngakak</option><option>😭 Sedih</option><option>😱 Kaget</option><option>🤨 Curiga</option></select>
          </div>
          <label className="flex items-center gap-2 text-sm text-zinc-400"><input type="checkbox"/> Posting sebagai anonim 👀</label>
          <button className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-bold hover:opacity-90">Spill Sekarang 🗣️</button>
        </form>
      )}
    </section>
  );
}
"use client";
import { useState } from "react";

export function CreateGibah({ onCreated }: { onCreated?: () => Promise<void> | void }) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: form.get("title"), content: form.get("content"), category: form.get("category"), mood: form.get("mood"), anonymous: form.get("anonymous") === "on" }) });
    const data = await res.json();
    if (!res.ok) return setError(data.error ?? "Gagal mengirim gibah.");
    setSent(true);
    await onCreated?.();
  };
  return <section className="glass rounded-3xl p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-pink-300">+ Tambah Gibah</p><h3 className="mt-1 text-xl font-bold">Ada cerita? Jangan dipendam sendirian.</h3></div><span className="text-2xl">🫢</span></div>{sent ? <div className="mt-5 rounded-2xl bg-green-500/10 p-5 text-green-200">🗣️ Spill berhasil! Gibah kamu sudah tersimpan dan masuk feed.</div> : <form className="mt-5 space-y-3" onSubmit={submit}><input name="title" required maxLength={120} placeholder="Judul gibah..." className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-purple-400/50"/><textarea name="content" required maxLength={5000} rows={4} placeholder="Ceritain dari awal. Tetap santai dan jangan membagikan data pribadi." className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-purple-400/50"/><div className="grid gap-3 sm:grid-cols-2"><select name="category" className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3"><option>Drama</option><option>Percintaan</option><option>Sekolah</option><option>Kerjaan</option><option>Keluarga</option><option>Teman</option><option>Viral</option><option>Rahasia</option><option>Random</option></select><select name="mood" className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3"><option>Ngakak</option><option>Sedih</option><option>Emosi</option><option>Kaget</option><option>Curiga</option><option>Badut</option><option>Santai</option></select></div><label className="flex items-center gap-2 text-sm text-zinc-400"><input name="anonymous" type="checkbox"/> Posting sebagai anonim 👀</label>{error && <p className="text-sm text-red-300">{error}</p>}<button className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-bold hover:opacity-90">Spill Sekarang 🗣️</button></form>}</section>;
}

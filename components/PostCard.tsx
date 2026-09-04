"use client";

import { useEffect, useState } from "react";
import { Bookmark, Eye, Loader2, MessageCircle, MoreHorizontal, Send } from "lucide-react";

const reactions = [["👀","Kepo"],["😂","Ngakak"],["😱","HAH?!"],["🤡","Badut"],["🔥","Panas"],["☕","Santai"]];

type Comment = { id: string; content: string; createdAt: string; author: { username: string; avatar: string | null } };
type Post = { id: string; author: { username: string; avatar: string | null } | null; title: string; content: string; category: string; mood: string; level: number; anonymous: boolean; createdAt: string; _count: { comments: number; reactions: number } };

export function PostCard({ post }: { post: Post }) {
  const [active, setActive] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [openComments, setOpenComments] = useState(false);
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!openComments) return;
    fetch(`/api/posts/${post.id}/comments`)
      .then((r) => r.ok ? r.json() : [])
      .then(setComments)
      .catch(() => setComments([]));
  }, [openComments, post.id]);

  async function sendComment(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim() || sending) return;
    setSending(true); setError("");
    try {
      const res = await fetch(`/api/posts/${post.id}/comments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: comment }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim komentar.");
      setComments((current) => [...current, data]);
      setComment("");
    } catch (err) { setError(err instanceof Error ? err.message : "Gagal mengirim komentar."); }
    finally { setSending(false); }
  }

  const username = post.anonymous ? "Anonim WIB" : `@${post.author?.username ?? "warga"}`;
  const time = new Date(post.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

  return (
    <article className="glass overflow-hidden rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-white/15">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-xl">{post.anonymous ? "🕵️" : (post.author?.avatar || "👤")}</div>
        <div className="flex-1"><div className="font-semibold">{username}</div><div className="text-xs text-zinc-500">{time} · {post.category}</div></div>
        <button className="text-zinc-500 hover:text-white"><MoreHorizontal size={19}/></button>
      </div>
      <h2 className="mt-5 text-xl font-bold">{post.title}</h2><p className="mt-2 leading-7 text-zinc-300 whitespace-pre-wrap">{post.content}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-white/5 px-3 py-1.5">{post.mood}</span><span className="rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-300">🔥 Level {post.level}</span></div>
      <div className="mt-5 flex items-center gap-1 border-t border-white/5 pt-4">
        {reactions.map(([emoji,label])=><button key={label} onClick={() => setActive(label)} title={label} className={`rounded-xl px-2 py-2 text-sm transition hover:scale-110 ${active===label ? "bg-white/10 ring-1 ring-purple-400/50" : "hover:bg-white/5"}`}>{emoji}</button>)}
        <button onClick={() => setOpenComments((v) => !v)} className="ml-auto flex items-center gap-1 rounded-xl px-3 py-2 text-zinc-400 hover:bg-white/5 hover:text-white"><MessageCircle size={17}/>{post._count.comments}</button>
        <span className="flex items-center gap-1 px-2 text-zinc-500"><Eye size={16}/>{post._count.reactions}</span><button className="p-2 text-zinc-500 hover:text-white"><Bookmark size={17}/></button>
      </div>
      {active && <div className="mt-3 rounded-xl bg-purple-500/10 px-3 py-2 text-sm text-purple-200">👀 Reaksi <b>{active}</b> dicatat. Jangan pura-pura gak kepo.</div>}
      {openComments && <section className="mt-4 rounded-2xl border border-white/5 bg-black/20 p-4">
        <div className="mb-3 flex items-center justify-between"><h3 className="font-bold">Komentar 💬</h3><span className="text-xs text-zinc-500">{comments.length} komentar</span></div>
        <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
          {comments.length === 0 ? <p className="py-5 text-center text-sm text-zinc-500">Belum ada yang nimbrung. Jadilah yang pertama 👀</p> : comments.map((item) => <div key={item.id} className="rounded-2xl bg-white/[.03] p-3"><div className="text-xs font-semibold text-purple-300">@{item.author.username}</div><p className="mt-1 text-sm leading-6 text-zinc-300">{item.content}</p><div className="mt-1 text-[10px] text-zinc-600">{new Date(item.createdAt).toLocaleString("id-ID")}</div></div>)}
        </div>
        <form onSubmit={sendComment} className="mt-4 flex gap-2"><input value={comment} onChange={(e) => setComment(e.target.value)} maxLength={500} placeholder="Tulis komentar yang bikin suasana makin panas..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-purple-400/50"/><button disabled={sending || !comment.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-black disabled:opacity-40">{sending ? <Loader2 size={17} className="animate-spin"/> : <Send size={17}/>}</button></form>
        {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
      </section>}
    </article>
  );
}

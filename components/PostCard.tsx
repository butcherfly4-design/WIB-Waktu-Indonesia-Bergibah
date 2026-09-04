 "use client";
import { useState } from "react";
import { Bookmark, Eye, MessageCircle, MoreHorizontal } from "lucide-react";

const reactions = [["👀","Kepo"],["😂","Ngakak"],["😱","HAH?!"],["🤡","Badut"],["🔥","Panas"],["☕","Santai"]];

export function PostCard({ post }: { post: { user:string; avatar:string; time:string; title:string; content:string; category:string; mood:string; level:number; views:string; comments:number; }}) {
  const [active, setActive] = useState<string>("");
  const [count, setCount] = useState(post.comments);
  return (
    <article className="glass overflow-hidden rounded-3xl p-5 transition hover:-translate-y-0.5 hover:border-white/15">
      <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-xl">{post.avatar}</div><div className="flex-1"><div className="font-semibold">{post.user}</div><div className="text-xs text-zinc-500">{post.time} · {post.category}</div></div><button className="text-zinc-500 hover:text-white"><MoreHorizontal size={19}/></button></div>
      <h2 className="mt-5 text-xl font-bold">{post.title}</h2><p className="mt-2 leading-7 text-zinc-300">{post.content}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-white/5 px-3 py-1.5">{post.mood}</span><span className="rounded-full bg-orange-500/10 px-3 py-1.5 text-orange-300">🔥 Level {post.level}</span></div>
      <div className="mt-5 flex items-center gap-2 border-t border-white/5 pt-4">{reactions.map(([emoji,label])=><button key={label} onClick={() => setActive(label)} title={label} className={`rounded-xl px-2 py-2 text-sm transition hover:scale-110 ${active===label ? "bg-white/10 ring-1 ring-purple-400/50" : "hover:bg-white/5"}`}>{emoji}</button>)}<button onClick={()=>setCount(c=>c+1)} className="ml-auto flex items-center gap-1 rounded-xl px-2 py-2 text-zinc-400 hover:bg-white/5 hover:text-white"><MessageCircle size={17}/>{count}</button><span className="flex items-center gap-1 px-2 text-zinc-500"><Eye size={16}/>{post.views}</span><button className="p-2 text-zinc-500 hover:text-white"><Bookmark size={17}/></button></div>
      {active && <div className="mt-3 rounded-xl bg-purple-500/10 px-3 py-2 text-sm text-purple-200">👀 Reaksi <b>{active}</b> dicatat. Jangan pura-pura gak kepo.</div>}
    </article>
  );
}
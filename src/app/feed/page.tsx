"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart, Bookmark, MessageCircle, Share2, Filter, School,
    TrendingUp, AlertTriangle, Users, Award, ChevronDown, X,
    Flame, Eye, RefreshCw, PenLine, Send, GraduationCap
} from "lucide-react";
import { feedPosts, type FeedPost } from "@/lib/feed-data";

const typeConfig = {
    placement: { label: "Placement Update", color: "#10B981", bg: "rgba(16,185,129,0.1)", icon: TrendingUp, emoji: "📊" },
    internship: { label: "Internship Stats", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)", icon: GraduationCap, emoji: "💼" },
    experience: { label: "Student Experience", color: "#3B82F6", bg: "rgba(59,130,246,0.1)", icon: Users, emoji: "🎓" },
    warning: { label: "Reality Check", color: "#F43F5E", bg: "rgba(244,63,94,0.1)", icon: AlertTriangle, emoji: "⚠️" },
    alumni: { label: "Alumni Outcome", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: Award, emoji: "🏆" },
};

const tierColors = {
    T1: { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Tier 1" },
    T2: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Tier 2" },
    T3: { color: "#F43F5E", bg: "rgba(244,63,94,0.1)", label: "Tier 3" },
};

export default function FeedPage() {
    const [posts, setPosts] = useState<FeedPost[]>(feedPosts);
    const [activeFilter, setActiveFilter] = useState<string>("all");
    const [tierFilter, setTierFilter] = useState<string>("all");
    const [expandedComments, setExpandedComments] = useState<number | null>(null);
    const [newPost, setNewPost] = useState(false);
    const [postText, setPostText] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const filtered = useMemo(() => {
        let d = posts;
        if (activeFilter !== "all") d = d.filter(p => p.type === activeFilter);
        if (tierFilter !== "all") d = d.filter(p => p.collegeTier === tierFilter);
        return d;
    }, [posts, activeFilter, tierFilter]);

    const toggleLike = (id: number) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p
        ));
    };

    const toggleSave = (id: number) => {
        setPosts(prev => prev.map(p =>
            p.id === id ? { ...p, isSaved: !p.isSaved, saves: p.isSaved ? p.saves - 1 : p.saves + 1 } : p
        ));
    };

    const formatCount = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3">
                            <School className="w-6 h-6 text-[#8B5CF6]" /> College Feed
                        </h1>
                        <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Real insights from students, alumni & placement cells</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setNewPost(!newPost)}
                        className="btn-primary text-xs"
                    >
                        <PenLine className="w-3.5 h-3.5" /> Share Story
                    </motion.button>
                </div>
            </motion.div>

            {/* New Post Composer */}
            <AnimatePresence>
                {newPost && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-4"
                    >
                        <div className="glass-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#F43F5E] flex items-center justify-center text-xs font-bold text-white">
                                        {anonymous ? "?" : "Y"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{anonymous ? "Anonymous" : "You"}</p>
                                        <p className="text-[10px] text-[rgba(240,238,233,0.4)]">Your College</p>
                                    </div>
                                </div>
                                <button onClick={() => setNewPost(false)} className="w-7 h-7 rounded-xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                                    <X className="w-3.5 h-3.5 text-[rgba(240,238,233,0.5)]" />
                                </button>
                            </div>
                            <textarea
                                className="input-glass min-h-[100px] resize-none text-sm mb-3"
                                placeholder="Share your placement experience, college review, or career insight..."
                                value={postText}
                                onChange={e => setPostText(e.target.value)}
                            />
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <div
                                        onClick={() => setAnonymous(!anonymous)}
                                        className={`w-10 h-5 rounded-full transition-colors relative ${anonymous ? "bg-[#8B5CF6]" : "bg-[rgba(255,255,255,0.1)]"}`}
                                    >
                                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${anonymous ? "translate-x-5" : "translate-x-0.5"}`} />
                                    </div>
                                    <span className="text-xs text-[rgba(240,238,233,0.6)]">Post anonymously</span>
                                </label>
                                <button className="btn-primary text-xs" disabled={!postText.trim()}>
                                    <Send className="w-3.5 h-3.5" /> Post
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filters */}
            <div className="glass-card p-3 mb-4 flex gap-1.5 overflow-x-auto scrollbar-hide">
                {[
                    { id: "all", label: "All", emoji: "🌐" },
                    { id: "placement", label: "Placements", emoji: "📊" },
                    { id: "internship", label: "Internships", emoji: "💼" },
                    { id: "experience", label: "Experiences", emoji: "🎓" },
                    { id: "warning", label: "Reality Checks", emoji: "⚠️" },
                    { id: "alumni", label: "Alumni", emoji: "🏆" },
                ].map(f => (
                    <button key={f.id} onClick={() => setActiveFilter(f.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${activeFilter === f.id
                            ? "bg-[rgba(139,92,246,0.15)] border-[rgba(139,92,246,0.3)] text-[#8B5CF6]"
                            : "border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.5)] hover:text-[rgba(240,238,233,0.8)]"}`}>
                        {f.emoji} {f.label}
                    </button>
                ))}
            </div>

            <div className="flex gap-1.5 mb-5 overflow-x-auto scrollbar-hide">
                {[
                    { id: "all", label: "All Tiers" },
                    { id: "T1", label: "Tier 1 (IITs/NITs/BITS)" },
                    { id: "T2", label: "Tier 2 (VIT/KIIT/Manipal)" },
                    { id: "T3", label: "Tier 3 (Private/State)" },
                ].map(t => (
                    <button key={t.id} onClick={() => setTierFilter(t.id)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-medium whitespace-nowrap transition-all border ${tierFilter === t.id
                            ? "bg-[rgba(6,182,212,0.12)] border-[rgba(6,182,212,0.3)] text-[#06B6D4]"
                            : "border-[rgba(255,255,255,0.05)] text-[rgba(240,238,233,0.4)] hover:text-[rgba(240,238,233,0.7)]"}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Feed */}
            <div className="space-y-3">
                <AnimatePresence>
                    {filtered.map((post, i) => {
                        const cfg = typeConfig[post.type];
                        const tier = tierColors[post.collegeTier];
                        const Icon = cfg.icon;
                        const isCommentsOpen = expandedComments === post.id;

                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.06 }}
                                className="glass-card overflow-hidden group"
                            >
                                {/* Top accent bar */}
                                <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${cfg.color}, transparent)` }} />

                                <div className="p-5">
                                    {/* Post header */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold text-white shrink-0"
                                            style={{ background: `linear-gradient(135deg, ${cfg.color}60, ${cfg.color}30)` }}>
                                            {post.isAnonymous ? "?" : post.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className="text-sm font-semibold">{post.author}</span>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-md border"
                                                    style={{ color: cfg.color, background: cfg.bg, borderColor: `${cfg.color}30` }}>
                                                    {cfg.emoji} {cfg.label}
                                                </span>
                                                <span className="text-[10px] px-1.5 py-0.5 rounded-md border"
                                                    style={{ color: tier.color, background: tier.bg, borderColor: `${tier.color}30` }}>
                                                    {tier.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[11px] text-[rgba(240,238,233,0.5)]">{post.college}</span>
                                                <span className="text-[11px] text-[rgba(240,238,233,0.3)]">·</span>
                                                <span className="text-[11px] text-[rgba(240,238,233,0.4)]">{post.branch}</span>
                                                <span className="text-[11px] text-[rgba(240,238,233,0.3)]">·</span>
                                                <span className="text-[11px] text-[rgba(240,238,233,0.4)]">{post.timeAgo}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Placement stats if available */}
                                    {post.stats && (
                                        <div className="grid grid-cols-4 gap-2 mb-4 p-3 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                            {post.stats.placed && <div className="text-center">
                                                <p className="text-sm font-bold text-[#10B981]">{post.stats.placed}</p>
                                                <p className="text-[9px] text-[rgba(240,238,233,0.4)]">Placed</p>
                                            </div>}
                                            {post.stats.avgPackage && <div className="text-center">
                                                <p className="text-sm font-bold text-[#8B5CF6]">{post.stats.avgPackage}</p>
                                                <p className="text-[9px] text-[rgba(240,238,233,0.4)]">Avg Pkg</p>
                                            </div>}
                                            {post.stats.highestPackage && <div className="text-center">
                                                <p className="text-sm font-bold text-[#F59E0B]">{post.stats.highestPackage}</p>
                                                <p className="text-[9px] text-[rgba(240,238,233,0.4)]">Highest</p>
                                            </div>}
                                            {post.stats.companies && <div className="text-center">
                                                <p className="text-sm font-bold text-[#06B6D4]">{post.stats.companies}</p>
                                                <p className="text-[9px] text-[rgba(240,238,233,0.4)]">Companies</p>
                                            </div>}
                                        </div>
                                    )}

                                    {/* Content */}
                                    <p className="text-sm text-[rgba(240,238,233,0.85)] leading-relaxed mb-4">{post.content}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {post.tags.map((tag, j) => (
                                            <span key={j} className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.04)] text-[rgba(240,238,233,0.5)] border border-[rgba(255,255,255,0.06)]">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`flex items-center gap-1.5 text-xs transition-all ${post.isLiked ? "text-[#F43F5E]" : "text-[rgba(240,238,233,0.4)] hover:text-[#F43F5E]"}`}
                                        >
                                            <motion.div whileTap={{ scale: 1.3 }}>
                                                <Heart className={`w-4 h-4 ${post.isLiked ? "fill-[#F43F5E]" : ""}`} />
                                            </motion.div>
                                            {formatCount(post.likes)}
                                        </button>

                                        <button
                                            onClick={() => setExpandedComments(isCommentsOpen ? null : post.id)}
                                            className="flex items-center gap-1.5 text-xs text-[rgba(240,238,233,0.4)] hover:text-[#06B6D4] transition-colors"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            {formatCount(post.comments)}
                                        </button>

                                        <button
                                            onClick={() => toggleSave(post.id)}
                                            className={`flex items-center gap-1.5 text-xs transition-all ${post.isSaved ? "text-[#F59E0B]" : "text-[rgba(240,238,233,0.4)] hover:text-[#F59E0B]"}`}
                                        >
                                            <motion.div whileTap={{ scale: 1.2 }}>
                                                <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-[#F59E0B]" : ""}`} />
                                            </motion.div>
                                            {formatCount(post.saves)}
                                        </button>

                                        <button className="ml-auto flex items-center gap-1.5 text-xs text-[rgba(240,238,233,0.4)] hover:text-[rgba(240,238,233,0.7)] transition-colors">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Comments section */}
                                    <AnimatePresence>
                                        {isCommentsOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-4 mt-4 border-t border-[rgba(255,255,255,0.05)] space-y-3">
                                                    {/* Sample comments */}
                                                    {["Great insights! This really helped me understand the placement scene.", "Thanks for the honest review, exactly what I needed to hear."].map((c, j) => (
                                                        <div key={j} className="flex gap-2">
                                                            <div className="w-7 h-7 rounded-xl bg-[rgba(139,92,246,0.15)] flex items-center justify-center text-[10px] font-bold text-[#8B5CF6] shrink-0">
                                                                {String.fromCharCode(65 + j)}
                                                            </div>
                                                            <div className="flex-1 p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                                                <p className="text-xs text-[rgba(240,238,233,0.7)]">{c}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="flex gap-2">
                                                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#F43F5E] flex items-center justify-center text-[10px] font-bold text-white shrink-0">Y</div>
                                                        <input className="input-glass flex-1 text-xs py-2" placeholder="Add a comment..." />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 rounded-3xl bg-[rgba(139,92,246,0.1)] flex items-center justify-center mb-4">
                            <School className="w-7 h-7 text-[#8B5CF6]" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No posts found</h3>
                        <p className="text-sm text-[rgba(240,238,233,0.5)]">Try changing your filters</p>
                    </div>
                )}

                {/* Load more */}
                {filtered.length > 0 && (
                    <div className="text-center py-6">
                        <button className="btn-ghost text-xs">
                            <RefreshCw className="w-3.5 h-3.5" /> Load more posts
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { School, MapPin, GraduationCap, Search, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { colleges } from "@/lib/feed-data";

const tierColors = {
    T1: { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Tier 1" },
    T2: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Tier 2" },
    T3: { color: "#F43F5E", bg: "rgba(244,63,94,0.1)", label: "Tier 3" },
};

const typeColors: Record<string, string> = {
    IIT: "#8B5CF6", NIT: "#06B6D4", BITS: "#F59E0B", State: "#10B981",
    Private: "#3B82F6", Deemed: "#F43F5E",
};

function DNABar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="space-y-1">
            <div className="flex items-center justify-between">
                <span className="text-[10px] text-[rgba(240,238,233,0.5)]">{label}</span>
                <span className="text-[10px] font-bold" style={{ color }}>{value}/100</span>
            </div>
            <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full rounded-full" style={{ background: color }} />
            </div>
        </div>
    );
}

export default function CollegesPage() {
    const [search, setSearch] = useState("");
    const [tierFilter, setTierFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selected, setSelected] = useState<number | null>(null);

    const filtered = useMemo(() => {
        let d = colleges;
        if (search) d = d.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase()));
        if (tierFilter !== "all") d = d.filter(c => c.tier === tierFilter);
        if (typeFilter !== "all") d = d.filter(c => c.type === typeFilter);
        return d;
    }, [search, tierFilter, typeFilter]);

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3">
                    <School className="w-6 h-6 text-[#06B6D4]" /> College Hub
                </h1>
                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Transparent placement data, ROI scores, and honest college DNA</p>
            </motion.div>

            <div className="glass-card p-4 mb-5">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(240,238,233,0.4)]" />
                        <input className="input-glass pl-10" placeholder="Search college or city..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    {search && <button onClick={() => setSearch("")} className="btn-ghost text-xs"><X className="w-3.5 h-3.5" /> Clear</button>}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                    {[{ id: "all", label: "All" }, { id: "T1", label: "Tier 1" }, { id: "T2", label: "Tier 2" }, { id: "T3", label: "Tier 3" }].map(f => (
                        <button key={f.id} onClick={() => setTierFilter(f.id)}
                            className={`text-[10px] px-3 py-1.5 rounded-xl border transition-all ${tierFilter === f.id ? "bg-[rgba(139,92,246,0.12)] border-[rgba(139,92,246,0.3)] text-[#8B5CF6]" : "border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.4)]"}`}>
                            {f.label}
                        </button>
                    ))}
                    <div className="w-px h-5 self-center bg-[rgba(255,255,255,0.08)] mx-1" />
                    {["IIT", "NIT", "BITS", "Deemed", "Private"].map(t => (
                        <button key={t} onClick={() => setTypeFilter(typeFilter === t ? "all" : t)}
                            className={`text-[10px] px-3 py-1.5 rounded-xl border transition-all ${typeFilter === t ? "border-[rgba(6,182,212,0.3)] text-[#06B6D4] bg-[rgba(6,182,212,0.08)]" : "border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.4)]"}`}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                    {filtered.map((college, i) => {
                        const tier = tierColors[college.tier];
                        const isOpen = selected === college.id;
                        return (
                            <motion.div key={college.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.08 }}
                                className="glass-card overflow-hidden cursor-pointer group" onClick={() => setSelected(isOpen ? null : college.id)}>
                                <div className="h-14 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${tier.color}20, ${typeColors[college.type] || "#8B5CF6"}10)` }}>
                                    <div className="absolute inset-0 flex items-center justify-between px-5">
                                        <div className="w-10 h-10 rounded-2xl bg-[rgba(0,0,0,0.3)] backdrop-blur-sm flex items-center justify-center text-sm font-bold border border-[rgba(255,255,255,0.1)]"
                                            style={{ color: tier.color }}>{college.image}</div>
                                        <div className="flex gap-2">
                                            <span className="text-[9px] px-2 py-1 rounded-md font-medium border" style={{ color: tier.color, background: tier.bg, borderColor: `${tier.color}30` }}>{tier.label}</span>
                                            <span className="text-[9px] px-2 py-1 rounded-md font-medium border" style={{ color: typeColors[college.type] || "#8B5CF6", background: `${typeColors[college.type] || "#8B5CF6"}15`, borderColor: `${typeColors[college.type] || "#8B5CF6"}30` }}>{college.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-sm font-bold group-hover:text-[#8B5CF6] transition-colors">{college.name}</h3>
                                            <p className="text-[11px] text-[rgba(240,238,233,0.4)] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {college.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-[rgba(240,238,233,0.4)]">{college.ranking}</p>
                                            <p className="text-[10px] text-[rgba(240,238,233,0.4)] mt-0.5">{college.fees}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {[{ label: "Avg Pkg", value: college.avgPackage, color: "#10B981" }, { label: "Highest", value: college.highestPackage, color: "#F59E0B" }, { label: "Placed %", value: `${college.placementPercent}%`, color: "#8B5CF6" }].map((s, j) => (
                                            <div key={j} className="text-center p-2 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                                <p className="text-xs font-bold" style={{ color: s.color }}>{s.value}</p>
                                                <p className="text-[9px] text-[rgba(240,238,233,0.4)]">{s.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2">College DNA Score</p>
                                        <DNABar label="Placement Reality" value={college.placementPercent} color="#10B981" />
                                        <DNABar label="Internship Exposure" value={college.internshipExposure} color="#8B5CF6" />
                                        <DNABar label="ROI Score" value={college.roi} color="#F59E0B" />
                                    </div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                                                    <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2">Branch-wise Stats</p>
                                                    <div className="space-y-2">
                                                        {college.branches.map((branch, j) => (
                                                            <div key={j} className="flex items-center justify-between p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-7 h-7 rounded-lg bg-[rgba(139,92,246,0.1)] flex items-center justify-center">
                                                                        <GraduationCap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                                                                    </div>
                                                                    <span className="text-xs font-medium">{branch.name}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-right">
                                                                    <div><p className="text-[10px] font-bold text-[#10B981]">{branch.avg}</p><p className="text-[9px] text-[rgba(240,238,233,0.4)]">Avg pkg</p></div>
                                                                    <div><p className="text-[10px] font-bold text-[#8B5CF6]">{branch.placed}%</p><p className="text-[9px] text-[rgba(240,238,233,0.4)]">Placed</p></div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <p className="text-xs text-[rgba(240,238,233,0.55)] mt-3 leading-relaxed">{college.description}</p>
                                                    <Link href="/feed" onClick={e => e.stopPropagation()} className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium border border-dashed border-[rgba(139,92,246,0.3)] text-[#8B5CF6] hover:bg-[rgba(139,92,246,0.05)] transition-colors">
                                                        View College Feed <ChevronRight className="w-3.5 h-3.5" />
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 rounded-3xl bg-[rgba(6,182,212,0.1)] flex items-center justify-center mb-4"><School className="w-7 h-7 text-[#06B6D4]" /></div>
                    <h3 className="text-lg font-semibold mb-1">No colleges found</h3>
                    <p className="text-sm text-[rgba(240,238,233,0.5)]">Try different filters</p>
                </div>
            )}
        </div>
    );
}

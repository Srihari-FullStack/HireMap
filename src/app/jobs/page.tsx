"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, MapPin, IndianRupee, GraduationCap, Search, Filter,
    Clock, Users, Zap, X, Bookmark, ChevronRight, Building2, Sparkles, Target
} from "lucide-react";
import Link from "next/link";
import { jobPostings } from "@/lib/jobs-data";

const difficultyConfig = {
    easy: { color: "#10B981", label: "Easy to crack" },
    medium: { color: "#F59E0B", label: "Moderate prep" },
    hard: { color: "#F43F5E", label: "Hard to crack" },
};

const categoryConfig = {
    product: { color: "#8B5CF6", label: "Product" },
    service: { color: "#06B6D4", label: "Service" },
    consulting: { color: "#F59E0B", label: "Consulting" },
    startup: { color: "#F43F5E", label: "Startup" },
    data: { color: "#10B981", label: "Data/AI" },
};

export default function JobsPage() {
    const [search, setSearch] = useState("");
    const [minSalary, setMinSalary] = useState(0);
    const [myCgpa, setMyCgpa] = useState(0);
    const [typeFilter, setTypeFilter] = useState<"all" | "full-time" | "internship">("all");
    const [modeFilter, setModeFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [smartFilter, setSmartFilter] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [savedJobs, setSavedJobs] = useState<number[]>([]);

    const filtered = useMemo(() => {
        let d = jobPostings;
        if (search) d = d.filter(j => j.role.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));
        if (typeFilter !== "all") d = d.filter(j => j.type === typeFilter);
        if (modeFilter !== "all") d = d.filter(j => j.mode === modeFilter);
        if (categoryFilter !== "all") d = d.filter(j => j.category === categoryFilter);
        if (minSalary > 0) d = d.filter(j => j.salaryValue >= minSalary);
        if (smartFilter === "qualify" && myCgpa > 0) d = d.filter(j => j.cgpaCutoff === 0 || myCgpa >= j.cgpaCutoff);
        if (smartFilter === "low-competition") d = d.filter(j => j.applicants < 10000);
        if (smartFilter === "high-package") d = d.filter(j => j.salaryValue >= 15);
        return d;
    }, [search, typeFilter, modeFilter, categoryFilter, minSalary, smartFilter, myCgpa]);

    const toggleSave = (id: number) => setSavedJobs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-[#10B981]" /> Job Hub
                </h1>
                <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">
                    {filtered.length} opportunities · eligibility + prep data included
                </p>
            </motion.div>

            {/* Smart Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
                {[
                    { id: "qualify", label: "Jobs I Qualify For", icon: Target, color: "#10B981", desc: "Based on your CGPA" },
                    { id: "low-competition", label: "Low Competition", icon: Users, color: "#8B5CF6", desc: "< 10,000 applicants" },
                    { id: "high-package", label: "High Package", icon: Zap, color: "#F59E0B", desc: "15 LPA+" },
                ].map(sf => (
                    <motion.button
                        key={sf.id} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSmartFilter(smartFilter === sf.id ? "" : sf.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${smartFilter === sf.id ? "border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.06)]" : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"}`}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: `${sf.color}15` }}>
                                <sf.icon className="w-3.5 h-3.5" style={{ color: sf.color }} />
                            </div>
                            <span className="text-xs font-semibold" style={{ color: smartFilter === sf.id ? sf.color : undefined }}>{sf.label}</span>
                        </div>
                        <p className="text-[10px] text-[rgba(240,238,233,0.4)]">{sf.desc}</p>
                    </motion.button>
                ))}
            </div>

            {/* Search & Filters bar */}
            <div className="glass-card p-4 mb-4">
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(240,238,233,0.4)]" />
                        <input className="input-glass pl-10" placeholder="Search roles or companies..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} className={`btn-ghost text-xs ${showFilters ? "!border-[#8B5CF6] !text-[#8B5CF6]" : ""}`}>
                        <Filter className="w-3.5 h-3.5" /> Filters
                    </button>
                </div>

                {/* Type & Mode pills */}
                <div className="flex gap-1.5 flex-wrap mb-2">
                    {[{ id: "all", label: "All Types" }, { id: "full-time", label: "Full-Time" }, { id: "internship", label: "Internship" }].map(t => (
                        <button key={t.id} onClick={() => setTypeFilter(t.id as typeof typeFilter)}
                            className={`text-[10px] px-3 py-1.5 rounded-xl border transition-all ${typeFilter === t.id ? "bg-[rgba(139,92,246,0.12)] border-[rgba(139,92,246,0.3)] text-[#8B5CF6]" : "border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.4)]"}`}>
                            {t.label}
                        </button>
                    ))}
                    <div className="w-px h-5 self-center bg-[rgba(255,255,255,0.08)] mx-1" />
                    {["all", "remote", "onsite", "hybrid"].map(m => (
                        <button key={m} onClick={() => setModeFilter(m)}
                            className={`text-[10px] px-3 py-1.5 rounded-xl border transition-all ${modeFilter === m ? "bg-[rgba(6,182,212,0.12)] border-[rgba(6,182,212,0.3)] text-[#06B6D4]" : "border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.4)]"}`}>
                            {m === "all" ? "Any Mode" : m.charAt(0).toUpperCase() + m.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Category pills */}
                <div className="flex gap-1.5 flex-wrap">
                    {[{ id: "all", label: "All Categories", color: "#8B5CF6" }, ...Object.entries(categoryConfig).map(([id, v]) => ({ id, label: v.label, color: v.color }))].map(c => (
                        <button key={c.id} onClick={() => setCategoryFilter(c.id)}
                            className={`text-[10px] px-3 py-1.5 rounded-xl border transition-all ${categoryFilter === c.id ? "border-[rgba(255,255,255,0.2)]" : "border-[rgba(255,255,255,0.05)] text-[rgba(240,238,233,0.4)]"}`}
                            style={categoryFilter === c.id ? { color: c.color, background: `${c.color}12`, borderColor: `${c.color}35` } : {}}>
                            {c.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)] mt-3">
                                <div>
                                    <label className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider mb-1 block">Min Salary (LPA)</label>
                                    <input type="number" className="input-glass" placeholder="0" value={minSalary || ""} onChange={e => setMinSalary(Number(e.target.value))} />
                                </div>
                                <div>
                                    <label className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider mb-1 block">Your CGPA (for smart filter)</label>
                                    <input type="number" step="0.1" className="input-glass" placeholder="e.g. 7.5" value={myCgpa || ""} onChange={e => setMyCgpa(Number(e.target.value))} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Job Cards */}
            <div className="space-y-3">
                <AnimatePresence>
                    {filtered.map((job, i) => {
                        const diff = difficultyConfig[job.difficulty];
                        const cat = categoryConfig[job.category];
                        const isSaved = savedJobs.includes(job.id);
                        const eligPct = myCgpa > 0 ? (job.cgpaCutoff === 0 || myCgpa >= job.cgpaCutoff ? 100 : Math.round((myCgpa / job.cgpaCutoff) * 85)) : null;

                        return (
                            <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                                className="glass-card p-5 group hover:border-[rgba(255,255,255,0.15)] transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(6,182,212,0.15)] flex items-center justify-center text-sm font-bold border border-[rgba(139,92,246,0.2)]"
                                            style={{ color: cat.color }}>
                                            {job.companyInitial}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold group-hover:text-[#8B5CF6] transition-colors">{job.role}</h3>
                                            <p className="text-xs text-[rgba(240,238,233,0.5)] flex items-center gap-1 mt-0.5">
                                                <Building2 className="w-3 h-3" /> {job.company}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => toggleSave(job.id)} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isSaved ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]" : "bg-[rgba(255,255,255,0.04)] text-[rgba(240,238,233,0.4)] hover:text-[#F59E0B]"}`}>
                                            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-[#F59E0B]" : ""}`} />
                                        </button>
                                    </div>
                                </div>

                                {/* Tags row */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    <span className="text-[10px] px-2 py-1 rounded-md border" style={{ color: cat.color, background: `${cat.color}10`, borderColor: `${cat.color}25` }}>{cat.label}</span>
                                    <span className="text-[10px] px-2 py-1 rounded-md border" style={{ color: diff.color, background: `${diff.color}10`, borderColor: `${diff.color}25` }}>{diff.label}</span>
                                    <span className="text-[10px] px-2 py-1 rounded-md border border-[rgba(255,255,255,0.08)] text-[rgba(240,238,233,0.5)]">
                                        {job.type === "internship" ? "Internship" : "Full-Time"}
                                    </span>
                                    <span className="text-[10px] px-2 py-1 rounded-md border border-[rgba(255,255,255,0.08)] text-[rgba(240,238,233,0.5)]">
                                        {job.mode.charAt(0).toUpperCase() + job.mode.slice(1)}
                                    </span>
                                </div>

                                {/* Key info grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <IndianRupee className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-[#10B981]">{job.stipend || job.salary}</p>
                                            <p className="text-[9px] text-[rgba(240,238,233,0.4)]">Package</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-[#8B5CF6]">{job.cgpaCutoff > 0 ? `${job.cgpaCutoff}+` : "No cutoff"}</p>
                                            <p className="text-[9px] text-[rgba(240,238,233,0.4)]">CGPA req.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-[#06B6D4] shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold truncate max-w-[90px]">{job.location}</p>
                                            <p className="text-[9px] text-[rgba(240,238,233,0.4)]">Location</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold">{job.openings} / {(job.applicants / 1000).toFixed(0)}k</p>
                                            <p className="text-[9px] text-[rgba(240,238,233,0.4)]">Seats / Apps</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Eligibility readiness bar */}
                                {eligPct !== null && (
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] text-[rgba(240,238,233,0.4)]">Your CGPA Eligibility</span>
                                            <span className="text-[10px] font-bold" style={{ color: eligPct >= 100 ? "#10B981" : "#F59E0B" }}>
                                                {eligPct >= 100 ? "✓ Eligible" : `${eligPct}% match`}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(eligPct, 100)}%` }}
                                                transition={{ duration: 0.8 }} className="h-full rounded-full"
                                                style={{ background: eligPct >= 100 ? "#10B981" : "#F59E0B" }} />
                                        </div>
                                    </div>
                                )}

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {job.skills.slice(0, 4).map((s, j) => (
                                        <span key={j} className="text-[10px] px-2 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-[rgba(240,238,233,0.6)]">{s}</span>
                                    ))}
                                    {job.skills.length > 4 && <span className="text-[10px] px-2 py-1 rounded-md text-[rgba(240,238,233,0.4)]">+{job.skills.length - 4} more</span>}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
                                    <div className="flex items-center gap-3 text-[10px] text-[rgba(240,238,233,0.4)]">
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.postedAgo}</span>
                                        <span>Deadline: {job.deadline}</span>
                                    </div>
                                    <Link href={`/jobs/${job.id}`}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#A78BFA] transition-colors">
                                        View Details <ChevronRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {filtered.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 rounded-3xl bg-[rgba(16,185,129,0.1)] flex items-center justify-center mb-4"><Briefcase className="w-7 h-7 text-[#10B981]" /></div>
                    <h3 className="text-lg font-semibold mb-1">No jobs found</h3>
                    <p className="text-sm text-[rgba(240,238,233,0.5)]">Try changing your filters</p>
                </div>
            )}
        </div>
    );
}

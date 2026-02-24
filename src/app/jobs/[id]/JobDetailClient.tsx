"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Briefcase, MapPin, IndianRupee, GraduationCap, Clock,
    CheckCircle2, AlertCircle, Zap, BookOpen, Bookmark,
    ChevronLeft, Building2, Target, Shield, BarChart2
} from "lucide-react";
import Link from "next/link";
import { type JobPosting, generateRoadmap } from "@/lib/jobs-data";

const difficultyConfig = {
    easy: { color: "#10B981", label: "Easy" },
    medium: { color: "#F59E0B", label: "Medium" },
    hard: { color: "#F43F5E", label: "Hard" },
};

const categoryConfig = {
    product: { color: "#8B5CF6", label: "Product" },
    service: { color: "#06B6D4", label: "Service" },
    consulting: { color: "#F59E0B", label: "Consulting" },
    startup: { color: "#F43F5E", label: "Startup" },
    data: { color: "#10B981", label: "Data/AI" },
};

export default function JobDetailClient({ job }: { job: JobPosting }) {
    const [myCgpa, setMyCgpa] = useState(0);
    const [mySkills, setMySkills] = useState<string[]>([]);
    const [roadmapGenerated, setRoadmapGenerated] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const diff = difficultyConfig[job.difficulty];
    const cat = categoryConfig[job.category];

    const matchedSkills = job.skills.filter(s =>
        mySkills.some(ms => ms.toLowerCase().includes(s.toLowerCase().split(" ")[0]))
    );
    const missingSkills = job.skills.filter(s => !matchedSkills.includes(s));
    const cgpaEligible = myCgpa > 0 ? (job.cgpaCutoff === 0 || myCgpa >= job.cgpaCutoff) : null;
    const skillMatch = mySkills.length > 0 ? Math.round((matchedSkills.length / job.skills.length) * 100) : null;
    const overallReadiness = skillMatch !== null ? Math.round((skillMatch * 0.7) + (cgpaEligible ? 30 : 0)) : null;
    const roadmapWeeks = roadmapGenerated ? generateRoadmap(job.role, overallReadiness ?? 50) : [];

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back */}
            <Link href="/jobs" className="flex items-center gap-2 text-xs text-[rgba(240,238,233,0.5)] hover:text-[rgba(240,238,233,0.8)] mb-5 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" /> Back to Jobs
            </Link>

            {/* Job Hero Card */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[rgba(139,92,246,0.15)] to-[rgba(6,182,212,0.15)] flex items-center justify-center text-2xl font-bold border border-[rgba(139,92,246,0.2)]"
                            style={{ color: cat.color }}>
                            {job.companyInitial}
                        </div>
                        <div>
                            <h1 className="text-xl font-bold font-[family-name:var(--font-outfit)]">{job.role}</h1>
                            <p className="text-sm text-[rgba(240,238,233,0.6)] flex items-center gap-2 mt-1">
                                <Building2 className="w-3.5 h-3.5" /> {job.company}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="text-[10px] px-2 py-1 rounded-md border" style={{ color: cat.color, background: `${cat.color}10`, borderColor: `${cat.color}25` }}>{cat.label}</span>
                                <span className="text-[10px] px-2 py-1 rounded-md border" style={{ color: diff.color, background: `${diff.color}10`, borderColor: `${diff.color}25` }}>{diff.label}</span>
                                <span className="text-[10px] px-2 py-1 rounded-md border border-[rgba(255,255,255,0.08)] text-[rgba(240,238,233,0.5)]">{job.type === "internship" ? "Internship" : "Full-Time"}</span>
                                <span className="text-[10px] px-2 py-1 rounded-md border border-[rgba(255,255,255,0.08)] text-[rgba(240,238,233,0.5)]">{job.mode}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsSaved(!isSaved)}
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0 ${isSaved ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]" : "bg-[rgba(255,255,255,0.04)] text-[rgba(240,238,233,0.4)]"}`}>
                        <Bookmark className={`w-4 h-4 ${isSaved ? "fill-[#F59E0B]" : ""}`} />
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Left: Job details */}
                <div className="md:col-span-2 space-y-4">

                    {/* Overview */}
                    <div className="glass-card p-5">
                        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#8B5CF6]" /> Job Overview</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: "Package", value: job.stipend || job.salary, icon: IndianRupee, color: "#10B981" },
                                { label: "Location", value: job.location, icon: MapPin, color: "#06B6D4" },
                                { label: "Posted", value: job.postedAgo, icon: Clock, color: "#F59E0B" },
                                { label: "Deadline", value: job.deadline, icon: Clock, color: "#F43F5E" },
                            ].map((item, j) => (
                                <div key={j} className="flex items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${item.color}15` }}>
                                        <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-[rgba(240,238,233,0.4)]">{item.label}</p>
                                        <p className="text-xs font-semibold truncate max-w-[100px]">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-[rgba(240,238,233,0.65)] leading-relaxed mt-4">{job.description}</p>
                    </div>

                    {/* Eligibility */}
                    <div className="glass-card p-5">
                        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-[#06B6D4]" /> Eligibility Criteria</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[#8B5CF6]" /><span className="text-xs">CGPA Requirement</span></div>
                                <span className="text-xs font-bold text-[#8B5CF6]">{job.cgpaCutoff > 0 ? `${job.cgpaCutoff}+` : "No cutoff"}</span>
                            </div>
                            <div className="flex items-start justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-[#10B981]" /><span className="text-xs">Branches Allowed</span></div>
                                <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                                    {job.branchAllowed.slice(0, 5).map((b, j) => (
                                        <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(16,185,129,0.08)] text-[#10B981] border border-[rgba(16,185,129,0.15)]">{b}</span>
                                    ))}
                                    {job.branchAllowed.length > 5 && <span className="text-[9px] text-[rgba(240,238,233,0.4)]">+{job.branchAllowed.length - 5}</span>}
                                </div>
                            </div>
                            <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                <p className="text-xs mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#F59E0B]" /> Degree Required</p>
                                <div className="flex flex-wrap gap-1">
                                    {job.degreeRequired.map((d, j) => (
                                        <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(245,158,11,0.08)] text-[#F59E0B] border border-[rgba(245,158,11,0.15)]">{d}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Allocation Data */}
                    <div className="glass-card p-5">
                        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-[#F59E0B]" /> Allocation Data</h2>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {[
                                { label: "Openings", value: job.openings, color: "#10B981" },
                                { label: "Applicants", value: `${(job.applicants / 1000).toFixed(0)}k`, color: "#F43F5E" },
                                { label: "Shortlist", value: job.shortlistRatio, color: "#8B5CF6" },
                            ].map((s, j) => (
                                <div key={j} className="text-center p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                                    <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                                    <p className="text-[10px] text-[rgba(240,238,233,0.4)]">{s.label}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.35)] mb-2">Interview Rounds</p>
                        <div className="space-y-2">
                            {job.interviewRounds.map((round, j) => (
                                <div key={j} className="flex items-start gap-2 text-xs">
                                    <div className="w-5 h-5 rounded-md bg-[rgba(139,92,246,0.1)] flex items-center justify-center text-[9px] font-bold text-[#8B5CF6] shrink-0 mt-0.5">{j + 1}</div>
                                    <span className="text-[rgba(240,238,233,0.7)] leading-relaxed">{round}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Eligibility + Readiness */}
                <div className="space-y-4">
                    {/* CGPA Check */}
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Target className="w-4 h-4 text-[#8B5CF6]" /> Check Eligibility</h3>
                        <label className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.4)] mb-1 block">Your CGPA</label>
                        <input type="number" step="0.1" className="input-glass mb-3" placeholder="e.g. 7.5"
                            value={myCgpa || ""} onChange={e => setMyCgpa(Number(e.target.value))} />
                        <AnimatePresence>
                            {myCgpa > 0 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    className={`p-3 rounded-xl border ${cgpaEligible ? "bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.2)]" : "bg-[rgba(244,63,94,0.08)] border-[rgba(244,63,94,0.2)]"}`}>
                                    <div className="flex items-center gap-2">
                                        {cgpaEligible ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <AlertCircle className="w-4 h-4 text-[#F43F5E]" />}
                                        <span className="text-xs font-semibold" style={{ color: cgpaEligible ? "#10B981" : "#F43F5E" }}>
                                            {cgpaEligible ? "You are eligible!" : "Below cutoff"}
                                        </span>
                                    </div>
                                    {!cgpaEligible && <p className="text-[10px] text-[rgba(240,238,233,0.5)] mt-1">Need {job.cgpaCutoff} CGPA — you have {myCgpa}</p>}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Readiness Meter */}
                    <div className="glass-card p-5">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Zap className="w-4 h-4 text-[#F59E0B]" /> Readiness Meter</h3>
                        <div className="relative w-28 h-28 mx-auto mb-4">
                            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                                <circle cx="60" cy="60" r="50" fill="none"
                                    stroke={overallReadiness !== null ? (overallReadiness >= 70 ? "#10B981" : overallReadiness >= 40 ? "#F59E0B" : "#F43F5E") : "#8B5CF6"}
                                    strokeWidth="10" strokeDasharray={`${(overallReadiness ?? 0) * 3.14} 314`} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold">{overallReadiness !== null ? `${overallReadiness}%` : "?"}</span>
                                <span className="text-[9px] text-[rgba(240,238,233,0.4)]">Ready</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-center text-[rgba(240,238,233,0.4)] mb-3">Enter CGPA and skills to see score</p>
                        <label className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.4)] mb-1 block">Your Skills (comma-separated)</label>
                        <input className="input-glass text-xs" placeholder="React, Python, SQL..."
                            onChange={e => setMySkills(e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
                        <AnimatePresence>
                            {mySkills.length > 0 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 space-y-2">
                                    <div>
                                        <p className="text-[10px] text-[#10B981] mb-1">✓ Matched ({matchedSkills.length})</p>
                                        <div className="flex flex-wrap gap-1">
                                            {matchedSkills.map((s, j) => <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(16,185,129,0.08)] text-[#10B981] border border-[rgba(16,185,129,0.15)]">{s}</span>)}
                                        </div>
                                    </div>
                                    {missingSkills.length > 0 && (
                                        <div>
                                            <p className="text-[10px] text-[#F43F5E] mb-1">✗ Missing ({missingSkills.length})</p>
                                            <div className="flex flex-wrap gap-1">
                                                {missingSkills.map((s, j) => <span key={j} className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(244,63,94,0.08)] text-[#F43F5E] border border-[rgba(244,63,94,0.15)]">{s}</span>)}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setRoadmapGenerated(true)}
                        className="w-full btn-primary justify-center">
                        <BookOpen className="w-4 h-4" /> Generate Prep Roadmap
                    </motion.button>
                </div>
            </div>

            {/* Roadmap section */}
            <AnimatePresence>
                {roadmapGenerated && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
                        <h2 className="text-lg font-bold font-[family-name:var(--font-outfit)] mb-2 flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-[#8B5CF6]" /> Your Personalised Roadmap — {job.role}
                        </h2>
                        <p className="text-xs text-[rgba(240,238,233,0.5)] mb-6">{roadmapWeeks.length}-week prep plan based on your readiness</p>

                        <div className="relative">
                            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(139,92,246,0.4)] to-transparent" />
                            <div className="space-y-4">
                                {roadmapWeeks.map((week, i) => (
                                    <motion.div key={week.week} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }} className="flex gap-4">
                                        <div className="relative shrink-0">
                                            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold border-2 z-10 relative"
                                                style={{ background: "rgba(139,92,246,0.15)", borderColor: "rgba(139,92,246,0.4)", color: "#8B5CF6" }}>
                                                W{week.week}
                                            </div>
                                        </div>
                                        <div className="flex-1 glass-card p-4">
                                            <h4 className="text-sm font-semibold mb-2">{week.title}</h4>
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {week.skills.map((s, j) => (
                                                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-md bg-[rgba(139,92,246,0.08)] text-[#8B5CF6] border border-[rgba(139,92,246,0.15)]">{s}</span>
                                                ))}
                                            </div>
                                            <div className="space-y-1 mb-3">
                                                {week.tasks.map((task, j) => (
                                                    <div key={j} className="flex items-start gap-2 text-[11px] text-[rgba(240,238,233,0.65)]">
                                                        <span className="text-[#8B5CF6] mt-0.5">◦</span> {task}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {week.resources.map((r, j) => (
                                                    <a key={j} href={r.url} target="_blank" rel="noreferrer"
                                                        className="text-[10px] px-2 py-1 rounded-md bg-[rgba(6,182,212,0.06)] text-[#06B6D4] border border-[rgba(6,182,212,0.15)] hover:bg-[rgba(6,182,212,0.12)] transition-colors">
                                                        {r.type === "video" ? "▶" : r.type === "practice" ? "⌨" : "📄"} {r.label}
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                                                <p className="text-[10px] text-[rgba(240,238,233,0.35)]">
                                                    🎯 Checkpoint: <span className="text-[rgba(240,238,233,0.6)]">{week.checkpoint}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

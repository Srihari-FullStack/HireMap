"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trophy, Zap, CheckCircle2, Star, Flame, Target,
    BookOpen, Award, TrendingUp, Calendar, Plus, X
} from "lucide-react";

const badges = [
    { id: 1, name: "First Step", desc: "Set up your profile", icon: "🚀", earned: true, color: "#10B981" },
    { id: 2, name: "DSA Warrior", desc: "Solved 50+ problems", icon: "⚔️", earned: true, color: "#8B5CF6" },
    { id: 3, name: "Consistent Learner", desc: "7-day streak", icon: "🔥", earned: true, color: "#F59E0B" },
    { id: 4, name: "Resume Ready", desc: "Complete your resume", icon: "📄", earned: false, color: "#06B6D4" },
    { id: 5, name: "Job Hunter", desc: "Apply to 10 jobs", icon: "🎯", earned: false, color: "#F43F5E" },
    { id: 6, name: "Roadmap Pro", desc: "Complete a full roadmap", icon: "🗺️", earned: false, color: "#3B82F6" },
];

const weeklyData = [
    { day: "Mon", hours: 2.5, date: "Feb 17" },
    { day: "Tue", hours: 1.5, date: "Feb 18" },
    { day: "Wed", hours: 3, date: "Feb 19" },
    { day: "Thu", hours: 2, date: "Feb 20" },
    { day: "Fri", hours: 0, date: "Feb 21" },
    { day: "Sat", hours: 4, date: "Feb 22" },
    { day: "Sun", hours: 1.5, date: "Feb 23" },
];

const skills = [
    { name: "Data Structures", level: 68, color: "#8B5CF6" },
    { name: "Algorithms", level: 55, color: "#06B6D4" },
    { name: "System Design", level: 30, color: "#F59E0B" },
    { name: "React / Frontend", level: 72, color: "#10B981" },
    { name: "SQL / Databases", level: 60, color: "#F43F5E" },
];

const roadmaps = [
    { id: 1, role: "SDE at Product Company", company: "Amazon", weeks: 8, completed: 3, color: "#8B5CF6" },
    { id: 2, role: "Full Stack Developer", company: "HighRadius", weeks: 6, completed: 6, color: "#10B981" },
];

export default function ProgressPage() {
    const [streak, setStreak] = useState(7);
    const [totalProblems, setTotalProblems] = useState(87);
    const [jobsApplied, setJobsApplied] = useState(4);
    const [showLogStudy, setShowLogStudy] = useState(false);
    const [logHours, setLogHours] = useState("");

    const maxHours = Math.max(...weeklyData.map(d => d.hours));

    return (
        <div>
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-[#F59E0B]" /> Progress
                        </h1>
                        <p className="text-xs text-[rgba(240,238,233,0.5)] mt-1">Track your career prep journey</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setShowLogStudy(true)} className="btn-primary text-xs">
                        <Plus className="w-3.5 h-3.5" /> Log Study
                    </motion.button>
                </div>
            </motion.div>

            {/* Log Study Modal */}
            <AnimatePresence>
                {showLogStudy && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogStudy(false)} />
                        <motion.div className="relative glass-card p-6 w-full max-w-sm border border-[rgba(139,92,246,0.3)]">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold">Log Today&apos;s Study</h3>
                                <button onClick={() => setShowLogStudy(false)} className="w-7 h-7 rounded-xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <label className="text-[10px] uppercase tracking-wider text-[rgba(240,238,233,0.4)] mb-1 block">Hours studied today</label>
                            <input type="number" step="0.5" className="input-glass mb-4" placeholder="e.g. 2.5" value={logHours} onChange={e => setLogHours(e.target.value)} autoFocus />
                            <div className="flex gap-2">
                                <button onClick={() => setShowLogStudy(false)} className="btn-ghost text-xs flex-1">Cancel</button>
                                <button onClick={() => { setStreak(s => s + (streak < 7 ? 1 : 0)); setShowLogStudy(false); setLogHours(""); }} className="btn-primary text-xs flex-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Log It
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                    { label: "Day Streak", value: streak, icon: Flame, color: "#F59E0B", suffix: " days" },
                    { label: "Problems Solved", value: totalProblems, icon: Target, color: "#8B5CF6", suffix: "+" },
                    { label: "Jobs Applied", value: jobsApplied, icon: BookOpen, color: "#10B981", suffix: "" },
                    { label: "Roadmaps Done", value: 1, icon: Award, color: "#06B6D4", suffix: "/2" },
                ].map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        className="glass-card p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px]" style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }} />
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${stat.color}15` }}>
                            <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                        </div>
                        <p className="text-2xl font-bold font-[family-name:var(--font-outfit)]">
                            {stat.value}<span className="text-sm font-normal text-[rgba(240,238,233,0.5)]">{stat.suffix}</span>
                        </p>
                        <p className="text-[10px] text-[rgba(240,238,233,0.4)] uppercase tracking-wider mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Weekly Activity */}
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#06B6D4]" /> This Week's Activity
                    </h3>
                    <div className="flex items-end gap-2 h-24">
                        {weeklyData.map((d, i) => {
                            const pct = maxHours > 0 ? (d.hours / maxHours) * 100 : 0;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <div className="w-full rounded-lg bg-[rgba(255,255,255,0.03)] overflow-hidden flex flex-col justify-end" style={{ height: "80px" }}>
                                        <motion.div
                                            initial={{ height: 0 }} animate={{ height: `${pct}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.1 }}
                                            className="w-full rounded-lg"
                                            style={{ background: d.hours > 0 ? "linear-gradient(to top, #8B5CF6, #06B6D4)" : "transparent" }}
                                        />
                                    </div>
                                    <span className="text-[9px] text-[rgba(240,238,233,0.4)]">{d.day}</span>
                                    {d.hours > 0 && <span className="text-[9px] text-[#8B5CF6]">{d.hours}h</span>}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                        <p className="text-[10px] text-[rgba(240,238,233,0.4)]">Total: <span className="text-[rgba(240,238,233,0.7)] font-medium">{weeklyData.reduce((a, b) => a + b.hours, 0)}h this week</span></p>
                    </div>
                </div>

                {/* Skills Progress */}
                <div className="glass-card p-5">
                    <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#F59E0B]" /> Skills Mastery
                    </h3>
                    <div className="space-y-3">
                        {skills.map((skill, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-[rgba(240,238,233,0.7)]">{skill.name}</span>
                                    <span className="text-[10px] font-bold" style={{ color: skill.color }}>{skill.level}%</span>
                                </div>
                                <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 0.9, delay: i * 0.1 }}
                                        className="h-full rounded-full" style={{ background: skill.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Active Roadmaps */}
            <div className="glass-card p-5 mb-4">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#8B5CF6]" /> Active Roadmaps
                </h3>
                <div className="space-y-3">
                    {roadmaps.map((rm) => {
                        const pct = Math.round((rm.completed / rm.weeks) * 100);
                        return (
                            <div key={rm.id} className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="text-sm font-semibold">{rm.role}</h4>
                                        <p className="text-[11px] text-[rgba(240,238,233,0.5)]">for {rm.company}</p>
                                    </div>
                                    <span className="text-sm font-bold" style={{ color: rm.color }}>{pct}%</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    {Array.from({ length: rm.weeks }).map((_, j) => (
                                        <div key={j} className="flex-1 h-2 rounded-full"
                                            style={{ background: j < rm.completed ? rm.color : "rgba(255,255,255,0.06)" }} />
                                    ))}
                                </div>
                                <p className="text-[10px] text-[rgba(240,238,233,0.4)]">Week {rm.completed} of {rm.weeks} completed</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Badges */}
            <div className="glass-card p-5">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#F59E0B]" /> Achievements
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {badges.map((badge, i) => (
                        <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06 }}
                            className={`p-4 rounded-2xl border text-center transition-all ${badge.earned
                                ? "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)]"
                                : "bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.04)] opacity-50"}`}>
                            <div className="text-2xl mb-2">{badge.earned ? badge.icon : "🔒"}</div>
                            <p className="text-xs font-semibold mb-0.5" style={{ color: badge.earned ? badge.color : undefined }}>{badge.name}</p>
                            <p className="text-[9px] text-[rgba(240,238,233,0.4)]">{badge.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    MapPin, LayoutDashboard, Building2, User, FileText,
    Upload, BarChart3, Sparkles, Menu, X,
    School, Briefcase, Trophy, Newspaper, ChevronRight
} from "lucide-react";
import { useState } from "react";

const navGroups = [
    {
        label: "Discovery",
        items: [
            { href: "/", label: "Dashboard", icon: LayoutDashboard },
            { href: "/feed", label: "College Feed", icon: Newspaper },
            { href: "/colleges", label: "Colleges", icon: School },
            { href: "/jobs", label: "Job Hub", icon: Briefcase },
        ],
    },
    {
        label: "Career Prep",
        items: [
            { href: "/companies", label: "Placements", icon: Building2 },
            { href: "/match", label: "AI Match", icon: Sparkles },
            { href: "/resume", label: "Resume ATS", icon: FileText },
            { href: "/progress", label: "Progress", icon: Trophy },
        ],
    },
    {
        label: "More",
        items: [
            { href: "/profile", label: "My Profile", icon: User },
            { href: "/analytics", label: "Analytics", icon: BarChart3 },
            { href: "/admin", label: "Admin", icon: Upload },
        ],
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-4 left-4 z-[60] lg:hidden w-10 h-10 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center backdrop-blur-xl"
            >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Overlay */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 z-[49] lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-[240px] z-[50] bg-[#0A0A0A]/95 backdrop-blur-xl border-r border-[rgba(255,255,255,0.06)] flex flex-col transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>

                {/* Logo */}
                <div className="p-5 flex items-center gap-3 border-b border-[rgba(255,255,255,0.06)]">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold font-[family-name:var(--font-outfit)] tracking-tight">HireMap</h1>
                        <p className="text-[10px] text-[rgba(240,238,233,0.4)]">Career Intelligence</p>
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="text-[9px] uppercase tracking-[0.15em] text-[rgba(240,238,233,0.3)] px-3 mb-2 font-medium">{group.label}</p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group ${isActive
                                                ? "text-white bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.2)]"
                                                : "text-[rgba(240,238,233,0.55)] hover:text-[rgba(240,238,233,0.9)] hover:bg-[rgba(255,255,255,0.04)] border border-transparent"
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[#8B5CF6]"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#8B5CF6]" : ""}`} />
                                            <span className="flex-1">{item.label}</span>
                                            {isActive && <ChevronRight className="w-3 h-3 text-[#8B5CF6] opacity-60" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Bottom Profile */}
                <div className="p-3 border-t border-[rgba(255,255,255,0.06)]">
                    <Link href="/profile" onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.05)] transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#F43F5E] flex items-center justify-center text-[11px] font-bold text-white shrink-0">S</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold truncate">Student</p>
                            <p className="text-[9px] text-[rgba(240,238,233,0.4)]">View Profile →</p>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
}

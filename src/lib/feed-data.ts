export interface FeedPost {
    id: number;
    type: "placement" | "internship" | "experience" | "warning" | "alumni";
    college: string;
    collegeTier: "T1" | "T2" | "T3";
    branch: string;
    author: string;
    isAnonymous: boolean;
    avatar: string;
    timeAgo: string;
    content: string;
    tags: string[];
    likes: number;
    comments: number;
    saves: number;
    isLiked?: boolean;
    isSaved?: boolean;
    stats?: {
        placed?: string;
        avgPackage?: string;
        highestPackage?: string;
        companies?: number;
    };
}

export const feedPosts: FeedPost[] = [
    {
        id: 1,
        type: "placement",
        college: "IIT Bombay",
        collegeTier: "T1",
        branch: "CS",
        author: "Placement Cell",
        isAnonymous: false,
        avatar: "IB",
        timeAgo: "2h ago",
        content:
            "🎉 IIT Bombay Placement 2025-26 Update! Microsoft, Google, and Meta opened for Day 1. Record 42 LPA average for CS batch this year. Students with strong DSA and system design cleared rounds in 2 days. Full placement season kicks off Dec 1.",
        tags: ["placement", "IITBombay", "MAANG", "highpackage"],
        likes: 3420,
        comments: 234,
        saves: 891,
        isLiked: false,
        isSaved: false,
        stats: {
            placed: "95%",
            avgPackage: "42 LPA",
            highestPackage: "2.1 Cr",
            companies: 180,
        },
    },
    {
        id: 2,
        type: "experience",
        college: "KIIT University",
        collegeTier: "T2",
        branch: "CSE",
        author: "Anonymous",
        isAnonymous: true,
        avatar: "AN",
        timeAgo: "4h ago",
        content:
            "Honest review of KIIT placements: If you're CSE Tier-1 student with a decent CGPA (7.5+), you'll likely get 6-12 LPA offers. Wipro, TCS, Infosys mostly for average students. But if you prep DSA independently and apply off-campus, Microsoft/Amazon is possible even from KIIT. Don't rely on college placements alone.",
        tags: ["KIITreview", "offcampus", "honest", "reality"],
        likes: 1823,
        comments: 412,
        saves: 634,
        isLiked: false,
        isSaved: false,
    },
    {
        id: 3,
        type: "internship",
        college: "VIT Vellore",
        collegeTier: "T2",
        branch: "CS",
        author: "Riya Mehta",
        isAnonymous: false,
        avatar: "RM",
        timeAgo: "6h ago",
        content:
            "VIT Internship Season 2025 Summary 📊: Goldman Sachs (12k/month), Qualcomm (40k/month), DE Shaw (60k/month) were the highlights. Most internships had CGPA cutoff of 8.0. Around 1200 students got internship offers. 60% of intern-to-PPO conversion rate for top companies.",
        tags: ["VIT", "internship", "Goldman", "DEShaw"],
        likes: 2156,
        comments: 187,
        saves: 445,
        isLiked: false,
        isSaved: false,
        stats: {
            placed: "68%",
            avgPackage: "18k/month",
            highestPackage: "60k/month",
            companies: 45,
        },
    },
    {
        id: 4,
        type: "warning",
        college: "Random Private University",
        collegeTier: "T3",
        branch: "IT",
        author: "Anonymous",
        isAnonymous: true,
        avatar: "AN",
        timeAgo: "8h ago",
        content:
            "⚠️ Reality Check: My college claims '80% placement' but the fine print says it includes students who got offers below 3 LPA from companies nobody knows. Only 12% got anything above 5 LPA, and those were students who self-prepped. Don't trust placement brochures blindly. Ask alumni directly.",
        tags: ["reality", "placement-myth", "warning", "T3colleges"],
        likes: 4201,
        comments: 678,
        saves: 1234,
        isLiked: false,
        isSaved: false,
    },
    {
        id: 5,
        type: "alumni",
        college: "NIT Trichy",
        collegeTier: "T1",
        branch: "ECE",
        author: "Surya Prakash",
        isAnonymous: false,
        avatar: "SP",
        timeAgo: "1d ago",
        content:
            "Alumni perspective 2 years out: Graduated from NIT Trichy ECE in 2023. Started at TCS (6.5 LPA), switched to Accenture in 6 months (10 LPA), now at Goldman Sachs SDE (28 LPA). Key lesson: placement is just a starting point. First job doesn't define you. Build skills aggressively first 2 years.",
        tags: ["alumni", "jobswitch", "careeradvice", "growth"],
        likes: 5670,
        comments: 892,
        saves: 2341,
        isLiked: false,
        isSaved: false,
    },
    {
        id: 6,
        type: "placement",
        college: "DTU Delhi",
        collegeTier: "T1",
        branch: "CS",
        author: "DTU TPO",
        isAnonymous: false,
        avatar: "DT",
        timeAgo: "1d ago",
        content:
            "DTU Placement Drive Day 2 Update: Amazon selected 8 students for SDE-1, Microsoft picked 5, Walmart Labs 12. Average package for top 50 students crossing 35 LPA. All students in this batch with 8+ CGPA and 150+ LeetCode problems solved landed offers before Day 5.",
        tags: ["DTU", "Amazon", "Microsoft", "placementdrive"],
        likes: 2840,
        comments: 156,
        saves: 678,
        isLiked: false,
        isSaved: false,
        stats: {
            placed: "87%",
            avgPackage: "18 LPA",
            highestPackage: "1.2 Cr",
            companies: 120,
        },
    },
    {
        id: 7,
        type: "experience",
        college: "Manipal Institute of Technology",
        collegeTier: "T2",
        branch: "IT",
        author: "Karan Joshi",
        isAnonymous: false,
        avatar: "KJ",
        timeAgo: "2d ago",
        content:
            "Just cracked my Google interview as a Manipal student! 🚀 It took 14 months of prep, 400+ LC problems, 3 mock interviews per week, and building 4 real projects. College brand doesn't matter as much as people think. Focus on skills. I rejected TCS PPO, prepped hard, and got Google SWE at 45 LPA.",
        tags: ["Google", "Manipal", "motivation", "cracked"],
        likes: 8923,
        comments: 1234,
        saves: 3567,
        isLiked: false,
        isSaved: false,
    },
    {
        id: 8,
        type: "internship",
        college: "SRM Institute",
        collegeTier: "T2",
        branch: "CSE",
        author: "Anonymous",
        isAnonymous: true,
        avatar: "AN",
        timeAgo: "2d ago",
        content:
            "SRM Internship honest stats: Out of 4000+ CSE students, only ~300 got off-campus worthy internships (above 15k stipend). Cognizant, TCS, Wipro took ~2200 students via mass hiring. If you want a good internship, apply off-campus from 2nd year itself. Core CS placements require active self-prep.",
        tags: ["SRM", "internshipreality", "offcampus", "honest"],
        likes: 3120,
        comments: 445,
        saves: 987,
        isLiked: false,
        isSaved: false,
    },
    {
        id: 9,
        type: "alumni",
        college: "BITS Pilani",
        collegeTier: "T1",
        branch: "CS",
        author: "Priya Sharma",
        isAnonymous: false,
        avatar: "PS",
        timeAgo: "3d ago",
        content:
            "BITS Practice School is genuinely the biggest advantage we have. 6-month industry internship in 3rd year at real companies changed everything. Got PPO from DE Shaw (72 LPA), which I joined. For anyone asking — the BITS premium comes from PS2, alumni network, and peer quality, not just the degree.",
        tags: ["BITS", "PracticeSchool", "PPO", "DEShaw"],
        likes: 4560,
        comments: 567,
        saves: 1890,
        isLiked: false,
        isSaved: false,
    },
    {
        id: 10,
        type: "warning",
        college: "Tier-3 Private College",
        collegeTier: "T3",
        branch: "CSE",
        author: "Anonymous",
        isAnonymous: true,
        avatar: "AN",
        timeAgo: "3d ago",
        content:
            "Don't waste 4 years waiting for your college placement cell to save you if you're in a T3 college. My college promised 'MAANG tie-ups', got us Wipro NLTH at 3.5 LPA. I self-studied, cracked Atlassian off-campus at 32 LPA. The game is: build skills, build projects, apply off-campus aggressively from 2nd year.",
        tags: ["T3colleges", "ofcampus", "reality", "selfprep"],
        likes: 7840,
        comments: 1123,
        saves: 4231,
        isLiked: false,
        isSaved: false,
    },
];

export interface CollegeProfile {
    id: number;
    name: string;
    location: string;
    tier: "T1" | "T2" | "T3";
    type: "IIT" | "NIT" | "BITS" | "State" | "Private" | "Deemed";
    fees: string;
    ranking: string;
    avgPackage: string;
    highestPackage: string;
    placementPercent: number;
    internshipExposure: number;
    roi: number;
    image: string;
    branches: { name: string; placed: number; avg: string }[];
    description: string;
}

export const colleges: CollegeProfile[] = [
    {
        id: 1,
        name: "IIT Bombay",
        location: "Mumbai, Maharashtra",
        tier: "T1",
        type: "IIT",
        fees: "₹8.5 L total",
        ranking: "NIRF #2",
        avgPackage: "42 LPA",
        highestPackage: "2.1 Cr",
        placementPercent: 96,
        internshipExposure: 98,
        roi: 99,
        image: "IITB",
        branches: [
            { name: "CS", placed: 98, avg: "58 LPA" },
            { name: "EE", placed: 94, avg: "32 LPA" },
            { name: "ME", placed: 88, avg: "18 LPA" },
        ],
        description:
            "India's premier engineering institution with unmatched placement records and research opportunities.",
    },
    {
        id: 2,
        name: "KIIT University",
        location: "Bhubaneswar, Odisha",
        tier: "T2",
        type: "Deemed",
        fees: "₹14.8 L total",
        ranking: "NIRF #21",
        avgPackage: "8.2 LPA",
        highestPackage: "62 LPA",
        placementPercent: 78,
        internshipExposure: 62,
        roi: 55,
        image: "KI",
        branches: [
            { name: "CSE", placed: 85, avg: "10.5 LPA" },
            { name: "IT", placed: 75, avg: "7.5 LPA" },
            { name: "ECE", placed: 65, avg: "6.2 LPA" },
        ],
        description:
            "Strong private university with decent tech placements for CSE. Good for off-campus opportunities.",
    },
    {
        id: 3,
        name: "VIT Vellore",
        location: "Vellore, Tamil Nadu",
        tier: "T2",
        type: "Deemed",
        fees: "₹20 L total",
        ranking: "NIRF #11",
        avgPackage: "7.8 LPA",
        highestPackage: "72 LPA",
        placementPercent: 82,
        internshipExposure: 71,
        roi: 48,
        image: "VIT",
        branches: [
            { name: "CS", placed: 90, avg: "11 LPA" },
            { name: "ECE", placed: 72, avg: "5.8 LPA" },
            { name: "IT", placed: 83, avg: "8.2 LPA" },
        ],
        description:
            "Large private university with strong industry connections. Known for mass hiring by top IT companies.",
    },
    {
        id: 4,
        name: "NIT Trichy",
        location: "Tiruchirappalli, Tamil Nadu",
        tier: "T1",
        type: "NIT",
        fees: "₹5.9 L total",
        ranking: "NIRF #8",
        avgPackage: "22 LPA",
        highestPackage: "1.05 Cr",
        placementPercent: 91,
        internshipExposure: 84,
        roi: 95,
        image: "NT",
        branches: [
            { name: "CSE", placed: 96, avg: "28 LPA" },
            { name: "ECE", placed: 88, avg: "16 LPA" },
            { name: "Mech", placed: 78, avg: "8.5 LPA" },
        ],
        description:
            "Best NIT with exceptional ROI. Strong placement records especially in core CS/ECE.",
    },
];

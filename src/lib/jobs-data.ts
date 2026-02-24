export interface JobPosting {
    id: number;
    role: string;
    company: string;
    companyInitial: string;
    type: "full-time" | "internship";
    mode: "remote" | "onsite" | "hybrid";
    location: string;
    salary: string;
    salaryValue: number;
    stipend?: string;
    cgpaCutoff: number;
    branchAllowed: string[];
    degreeRequired: string[];
    openings: number;
    applicants: number;
    shortlistRatio: string;
    interviewRounds: string[];
    skills: string[];
    postedAgo: string;
    deadline: string;
    description: string;
    responsibilities: string[];
    isSaved?: boolean;
    category: "product" | "service" | "consulting" | "startup" | "data";
    difficulty: "easy" | "medium" | "hard";
}

export const jobPostings: JobPosting[] = [
    {
        id: 1,
        role: "Software Development Engineer - I",
        company: "Amazon",
        companyInitial: "A",
        type: "full-time",
        mode: "onsite",
        location: "Bangalore, India",
        salary: "32 LPA",
        salaryValue: 32,
        cgpaCutoff: 7.0,
        branchAllowed: ["CSE", "IT", "ECE", "EEE", "MCA"],
        degreeRequired: ["B.Tech", "B.E", "MCA"],
        openings: 12,
        applicants: 8400,
        shortlistRatio: "1 in 700",
        interviewRounds: [
            "Online Assessment (2 DSA problems, 90 min)",
            "Technical Phone Screen (DSA + Java/Python)",
            "On-site Loop: 4 rounds (2 DSA, 1 System Design, 1 Leadership Principles)",
        ],
        skills: ["Data Structures", "Algorithms", "Java/Python", "System Design", "OOP"],
        postedAgo: "2 days ago",
        deadline: "March 15, 2026",
        description:
            "Amazon is looking for talented SDE-I engineers to join our rapidly growing teams. You will work on distributed systems serving millions of customers worldwide.",
        responsibilities: [
            "Design and implement scalable backend services",
            "Write high-quality, well-tested code",
            "Participate in code reviews and system design discussions",
            "Collaborate with cross-functional teams to deliver customer-focused features",
        ],
        isSaved: false,
        category: "product",
        difficulty: "hard",
    },
    {
        id: 2,
        role: "Software Engineer",
        company: "Microsoft",
        companyInitial: "M",
        type: "full-time",
        mode: "hybrid",
        location: "Hyderabad, India",
        salary: "38 LPA",
        salaryValue: 38,
        cgpaCutoff: 7.5,
        branchAllowed: ["CSE", "IT", "ECE"],
        degreeRequired: ["B.Tech", "B.E"],
        openings: 8,
        applicants: 12000,
        shortlistRatio: "1 in 1500",
        interviewRounds: [
            "Online Coding Assessment (2 problems, 60 min)",
            "Video Interview Round 1 (DSA)",
            "Video Interview Round 2 (DSA + CS Fundamentals)",
            "Hiring Manager Round (Behavioral + System Design)",
        ],
        skills: ["C#/.NET or Java", "DSA", "System Design", "Azure", "OOP", "OS Concepts"],
        postedAgo: "1 day ago",
        deadline: "March 20, 2026",
        description:
            "Join Microsoft's IDC Hyderabad team and build products used by billions of people worldwide. Work on cutting-edge cloud, AI, and productivity tools.",
        responsibilities: [
            "Build features for Microsoft's productivity suite",
            "Work on large-scale distributed systems",
            "Mentor junior developers and interns",
            "Drive technical decisions in your team",
        ],
        isSaved: false,
        category: "product",
        difficulty: "hard",
    },
    {
        id: 3,
        role: "Associate Software Engineer",
        company: "Accenture",
        companyInitial: "Ac",
        type: "full-time",
        mode: "hybrid",
        location: "Multiple Cities",
        salary: "4.5 LPA",
        salaryValue: 4.5,
        cgpaCutoff: 0,
        branchAllowed: ["CSE", "IT", "ECE", "EEE", "Mech", "Civil", "All"],
        degreeRequired: ["B.Tech", "B.E", "BCA", "B.Sc", "Any"],
        openings: 10000,
        applicants: 250000,
        shortlistRatio: "Open drive",
        interviewRounds: [
            "Online Assessment (Aptitude + English + Coding)",
            "Communication Test",
            "HR Interview",
        ],
        skills: ["Communication", "Basic Programming", "Aptitude", "Teamwork"],
        postedAgo: "5 days ago",
        deadline: "April 10, 2026",
        description:
            "Accenture's mass hiring drive for fresh graduates. Join one of the world's largest IT services companies and work on global client projects.",
        responsibilities: [
            "Work on client-facing IT projects",
            "Learn enterprise technologies (SAP, Salesforce, Java)",
            "Collaborate with global teams",
            "Grow through Accenture's training programs",
        ],
        isSaved: false,
        category: "service",
        difficulty: "easy",
    },
    {
        id: 4,
        role: "Data Scientist",
        company: "Fractal Analytics",
        companyInitial: "FA",
        type: "full-time",
        mode: "hybrid",
        location: "Mumbai / Bangalore",
        salary: "14 LPA",
        salaryValue: 14,
        cgpaCutoff: 7.0,
        branchAllowed: ["CSE", "IT", "ECE", "Math", "Stats", "MCA"],
        degreeRequired: ["B.Tech", "B.E", "B.Sc (Math/Stats)", "MCA"],
        openings: 6,
        applicants: 4200,
        shortlistRatio: "1 in 700",
        interviewRounds: [
            "Online Assessment (Python + Stats + SQL)",
            "Technical Interview 1 (ML Concepts)",
            "Case Study Round (Take-home, 48 hours)",
            "HR + Culture Fit",
        ],
        skills: ["Python", "Pandas", "SQL", "Machine Learning", "Statistics", "Power BI"],
        postedAgo: "3 days ago",
        deadline: "March 25, 2026",
        description:
            "Join Fractal's elite team of data scientists solving real-world business problems for Fortune 500 companies using advanced analytics and AI.",
        responsibilities: [
            "Build and deploy ML models for client use-cases",
            "Analyze large datasets to extract business insights",
            "Present findings to non-technical stakeholders",
            "Collaborate with engineers and product teams",
        ],
        isSaved: false,
        category: "data",
        difficulty: "medium",
    },
    {
        id: 5,
        role: "SDE Intern (Summer 2026)",
        company: "Meesho",
        companyInitial: "Me",
        type: "internship",
        mode: "onsite",
        location: "Bangalore, India",
        salary: "SDE Intern",
        salaryValue: 0,
        stipend: "₹85,000/month",
        cgpaCutoff: 7.0,
        branchAllowed: ["CSE", "IT", "ECE"],
        degreeRequired: ["B.Tech", "B.E"],
        openings: 15,
        applicants: 22000,
        shortlistRatio: "1 in 1467",
        interviewRounds: [
            "Online Assessment (2 DSA, 90 min)",
            "Technical Interview (DSA + Backend)",
            "HR Interview",
        ],
        skills: ["DSA", "Python/Java/Go", "Backend Development", "APIs"],
        postedAgo: "1 week ago",
        deadline: "March 5, 2026",
        description:
            "Join Meesho's summer internship program and build features for India's largest social commerce platform. High conversion to full-time (PPO rate 80%+).",
        responsibilities: [
            "Own a feature end-to-end during the internship",
            "Work with senior engineers on real production systems",
            "Present project demo at end of internship",
        ],
        isSaved: false,
        category: "product",
        difficulty: "hard",
    },
    {
        id: 6,
        role: "Business Analyst",
        company: "Deloitte",
        companyInitial: "De",
        type: "full-time",
        mode: "hybrid",
        location: "Mumbai / Delhi / Bangalore",
        salary: "8 LPA",
        salaryValue: 8,
        cgpaCutoff: 6.5,
        branchAllowed: ["CSE", "IT", "Mech", "Civil", "MBA", "Any"],
        degreeRequired: ["B.Tech", "B.E", "BCA", "Any"],
        openings: 40,
        applicants: 35000,
        shortlistRatio: "1 in 875",
        interviewRounds: [
            "Online Assessment (Aptitude + Verbal + Logical Reasoning)",
            "Group Discussion / Case Study",
            "Technical Interview (Domain Knowledge)",
            "Partner Round",
        ],
        skills: ["Analytical Thinking", "Excel", "SQL", "Presentation Skills", "Business Acumen"],
        postedAgo: "4 days ago",
        deadline: "April 1, 2026",
        description:
            "Deloitte is seeking sharp analytical minds for its growing consulting practice. Work on strategy, technology, and operations projects for global clients.",
        responsibilities: [
            "Analyze client business processes and identify improvements",
            "Create detailed reports and presentations for stakeholders",
            "Collaborate with tech teams on digital transformation projects",
            "Support client engagement delivery",
        ],
        isSaved: false,
        category: "consulting",
        difficulty: "medium",
    },
    {
        id: 7,
        role: "Full Stack Developer",
        company: "HighRadius",
        companyInitial: "HR",
        type: "full-time",
        mode: "onsite",
        location: "Bhubaneswar, Odisha",
        salary: "10 LPA",
        salaryValue: 10,
        cgpaCutoff: 7.5,
        branchAllowed: ["CSE", "IT"],
        degreeRequired: ["B.Tech", "B.E"],
        openings: 25,
        applicants: 6800,
        shortlistRatio: "1 in 272",
        interviewRounds: [
            "Online Coding Test (DSA + Web)",
            "Technical Interview (React + NodeJS + DB)",
            "Project Round (Build a small app)",
            "HR Interview",
        ],
        skills: ["React", "Node.js", "SQL/MongoDB", "REST APIs", "DSA"],
        postedAgo: "2 weeks ago",
        deadline: "March 30, 2026",
        description:
            "HighRadius is a fintech SaaS company using AI for finance automation. Join their growing engineering team to build enterprise-grade financial applications.",
        responsibilities: [
            "Build and maintain frontend and backend features",
            "Work on HighRadius's AI-powered fintech platform",
            "Optimize application performance and scalability",
            "Write clean, well-tested code",
        ],
        isSaved: false,
        category: "startup",
        difficulty: "medium",
    },
    {
        id: 8,
        role: "Graduate Engineer Trainee",
        company: "Wipro",
        companyInitial: "W",
        type: "full-time",
        mode: "onsite",
        location: "Pan India",
        salary: "3.5 LPA",
        salaryValue: 3.5,
        cgpaCutoff: 6.0,
        branchAllowed: ["CSE", "IT", "ECE", "EEE", "Civil", "Mech", "Any"],
        degreeRequired: ["B.Tech", "B.E", "BSc", "Any"],
        openings: 15000,
        applicants: 400000,
        shortlistRatio: "1 in 26",
        interviewRounds: [
            "Wipro NLTH Online Test (Aptitude + Programming + English)",
            "Technical Interview (Basic CS + Communication)",
            "HR Interview",
        ],
        skills: ["Basic Programming", "Aptitude", "Communication", "Teamwork"],
        postedAgo: "2 weeks ago",
        deadline: "April 30, 2026",
        description:
            "Wipro's flagship fresher program. Join the IT giant and get trained in enterprise technologies. Good stepping stone for a tech career.",
        responsibilities: [
            "Complete Wipro's 3-month training program",
            "Rotate across different technology domains",
            "Work on client projects after training",
        ],
        isSaved: false,
        category: "service",
        difficulty: "easy",
    },
];

export interface RoadmapWeek {
    week: number;
    title: string;
    skills: string[];
    resources: { label: string; url: string; type: "video" | "article" | "practice" }[];
    tasks: string[];
    checkpoint: string;
    completed?: boolean;
}

export const generateRoadmap = (role: string, readiness: number): RoadmapWeek[] => {
    const baseWeeks: RoadmapWeek[] = [
        {
            week: 1,
            title: "Foundation & Assessment",
            skills: ["Data Structures Review", "Time Complexity", "Problem-Solving Framework"],
            resources: [
                { label: "Striver's A2Z DSA Sheet", url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", type: "article" },
                { label: "NeetCode.io - Getting Started", url: "https://neetcode.io/", type: "practice" },
                { label: "CS50 - Week 5 (Data Structures)", url: "https://cs50.harvard.edu/", type: "video" },
            ],
            tasks: ["Solve 10 Easy LeetCode problems", "Review Big O notation", "Create a problem-solving journal"],
            checkpoint: "Can solve Easy LeetCode problems confidently",
            completed: false,
        },
        {
            week: 2,
            title: "Arrays, Strings & Hashing",
            skills: ["Array Manipulation", "String Operations", "HashMap Patterns", "Two Pointers"],
            resources: [
                { label: "Striver's Array Series (YouTube)", url: "https://www.youtube.com/@takeUforward", type: "video" },
                { label: "LeetCode Array Study Plan", url: "https://leetcode.com/studyplan/top-interview-150/", type: "practice" },
            ],
            tasks: ["Solve 20 Array/String problems (Medium)", "Master sliding window technique", "Learn HashMap patterns"],
            checkpoint: "Can solve Medium array problems in < 30 mins",
            completed: false,
        },
        {
            week: 3,
            title: "Trees & Recursion",
            skills: ["Binary Trees", "DFS/BFS", "Recursion", "Tree Traversals"],
            resources: [
                { label: "Striver's Tree Series", url: "https://takeuforward.org/", type: "video" },
                { label: "NeetCode Trees Playlist", url: "https://neetcode.io/", type: "video" },
            ],
            tasks: ["Complete all Easy/Medium tree problems in Striver Sheet", "Implement 5 tree algorithms from scratch", "Solve 3 Hard tree problems"],
            checkpoint: "Can traverse trees in all 4 ways without looking",
            completed: false,
        },
        {
            week: 4,
            title: "Dynamic Programming",
            skills: ["1D DP", "2D DP", "Memoization", "Bottom-up DP"],
            resources: [
                { label: "Striver's DP Series (56 videos)", url: "https://takeuforward.org/dynamic-programming/", type: "video" },
                { label: "LeetCode DP Study Plan", url: "https://leetcode.com/studyplan/dynamic-programming/", type: "practice" },
            ],
            tasks: ["Complete DP on 1D arrays problems", "Solve Knapsack variants", "Do 15 DP problems this week"],
            checkpoint: "Can identify if a problem needs DP",
            completed: false,
        },
        {
            week: 5,
            title: "Graphs & Advanced Topics",
            skills: ["Graph BFS/DFS", "Dijkstra", "Topological Sort", "Union-Find"],
            resources: [
                { label: "Striver's Graph Series", url: "https://takeuforward.org/graph/", type: "video" },
                { label: "Graph Algorithms Visualizer", url: "https://visualgo.net/en/graphds", type: "article" },
            ],
            tasks: ["Complete all graph problems in Striver Sheet", "Understand shortest path algorithms", "Practice grid-based BFS problems"],
            checkpoint: "Can implement BFS and DFS on a graph from memory",
            completed: false,
        },
        {
            week: 6,
            title: "System Design & CS Fundamentals",
            skills: ["System Design Basics", "OS Concepts", "DBMS", "Computer Networks"],
            resources: [
                { label: "System Design Primer (GitHub)", url: "https://github.com/donnemartin/system-design-primer", type: "article" },
                { label: "Gaurav Sen - System Design", url: "https://www.youtube.com/@gkcs", type: "video" },
                { label: "InterviewBit CS Fundamentals", url: "https://www.interviewbit.com/courses/system-design/", type: "article" },
            ],
            tasks: ["Study 3 System Design case studies", "Revise OS, DBMS, CN fundamentals", "Do 2 mock system design interviews"],
            checkpoint: "Can explain how to design a URL shortener",
            completed: false,
        },
        {
            week: 7,
            title: "Mock Interviews & Resume Polish",
            skills: ["Interview Communication", "Behavioral Questions", "STAR Method", "Resume Optimization"],
            resources: [
                { label: "Pramp - Free Mock Interviews", url: "https://www.pramp.com/", type: "practice" },
                { label: "Interviewing.io", url: "https://interviewing.io/", type: "practice" },
                { label: "STAR Method Guide", url: "https://www.themuse.com/advice/star-interview-method", type: "article" },
            ],
            tasks: ["Do 3 mock interviews on Pramp", "Polish resume to 1 page", "Prepare 5 behavioral stories using STAR"],
            checkpoint: "Getting positive feedback from mock interviewers",
            completed: false,
        },
        {
            week: 8,
            title: "Final Sprint & Application",
            skills: ["Revision", "Application Strategy", "Company Research", "Confidence Building"],
            resources: [
                { label: "LinkedIn Job Board", url: "https://www.linkedin.com/jobs/", type: "practice" },
                { label: "LeetCode Contest", url: "https://leetcode.com/contest/", type: "practice" },
            ],
            tasks: ["Revise all weak areas", "Apply to 20+ companies on LinkedIn", "Participate in 1 LeetCode weekly contest", "Schedule 5 warm referral outreaches"],
            checkpoint: "Have applied to 20+ companies and completed 10 mock interviews",
            completed: false,
        },
    ];

    const totalWeeks = readiness >= 70 ? 6 : readiness >= 40 ? 8 : 10;
    const extraWeeks: RoadmapWeek[] = readiness < 40
        ? [
            {
                week: 9,
                title: "Weak Spots & Pattern Reinforcement",
                skills: ["Problem Identification", "Pattern Library", "Speed Improvement"],
                resources: [
                    { label: "AlgoExpert Practice", url: "https://www.algoexpert.io/", type: "practice" },
                ],
                tasks: ["Identify top 3 weak patterns", "Drill 30 targeted problems", "Speed round: 5 easy problems in 30 min"],
                checkpoint: "Comfortable with all medium problem categories",
                completed: false,
            },
            {
                week: 10,
                title: "Advanced Mock & Final Push",
                skills: ["Advanced System Design", "Live Coding Practice", "Nerves Management"],
                resources: [
                    { label: "HackerRank Contests", url: "https://www.hackerrank.com/contests", type: "practice" },
                ],
                tasks: ["Complete 5 timed mock OAs", "Review all failed mock problems", "Final applications batch"],
                checkpoint: "Consistently solving 2/2 in timed OAs",
                completed: false,
            },
        ]
        : [];

    return [...baseWeeks.slice(0, totalWeeks), ...extraWeeks];
};

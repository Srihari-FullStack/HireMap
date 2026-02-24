import { jobPostings } from "@/lib/jobs-data";
import JobDetailClient from "./JobDetailClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return jobPostings.map((job) => ({ id: String(job.id) }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = jobPostings.find(j => j.id === parseInt(id));

    if (!job) {
        notFound();
    }

    return <JobDetailClient job={job} />;
}

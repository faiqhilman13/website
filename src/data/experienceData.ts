export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    company: "EY",
    role: "Technology Consultant",
    location: "Kuala Lumpur, Malaysia",
    period: "Aug 2024 - Present",
    highlights: [
      "Technical backbone of RM10M+ enterprise AI program serving 30,000+ employees at top 5 KLSE company",
      "Application lead (>90% solo development) for 3 production AI systems: multi-agent RAG chatbot, domain-specific AI assistant, RM 2M+ enterprise HR talent evaluation system",
      "Delivered cloud deployment 6 weeks ahead of schedule—took system from 60% local to fully deployed in 3 days solo",
      "Built multi-agent integration framework using factory/strategy patterns, reducing new agent deployment from weeks to days",
      "Reduced hallucination rate ~40% on compliance-critical responses through systematic prompt engineering",
      "Solo-shipped React Native mobile app (iOS/Android) with streaming multi-agent chat"
    ],
    technologies: ["React", "TypeScript", ".NET", "FastAPI", "AWS Bedrock", "PostgreSQL", "Redis", "Docker"]
  },
  {
    company: "Cherengin Hills",
    role: "Corporate Sales & Strategy Associate",
    location: "Kuala Lumpur, Malaysia",
    period: "Jan 2021 - Jun 2022",
    highlights: [
      "Secured and negotiated corporate sales agreements, generating RM80,000 in revenue"
    ],
    technologies: ["Corporate Sales", "Negotiation", "Strategic Planning"]
  },
  {
    company: "PricewaterhouseCoopers",
    role: "Assurance Associate",
    location: "Kuala Lumpur, Malaysia",
    period: "Mar 2020 - Jul 2020",
    highlights: [
      "Performed trend analytics on financial statements; identified accounting errors leading to recovery of over $25,000 in variances"
    ],
    technologies: ["Financial Analysis", "Audit", "Analytics"]
  }
];

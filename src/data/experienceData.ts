export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    company: "EY",
    role: "Technology Consultant",
    location: "Kuala Lumpur, Malaysia",
    period: "Aug 2024 - Present",
    responsibilities: [
      "Production Engineer on a flagship enterprise GenAI platform deployed at a top-5 Malaysian public company (30,000+ employees). Joined during mid-phase 2, rapidly onboarded to an 8-microservice distributed architecture (React/.NET/Python/AWS), and delivered production features within 2 weeks of joining despite minimal documentation. Currently the primary application engineer in phase 3 and completed a full UI/UX revamp in 9 days (4 weeks ahead of schedule).",
      "Architected a reusable AI agent integration framework, reducing future deployment time from weeks to days and powering 4+ production agents, enabling rapid enterprise-scale GenAI expansion without re-engineering core systems.",
      "Delivered the first production agent (Comparison Analyzer) end-to-end in 6 days for 30k+ users, implementing dual-document diff analysis across 8 microservices (FastAPI/React/.NET/Redis/Postgres/Bedrock) and resolving 5 critical infra issues that had stalled local development.",
      "Built AWS S3 document management system with citation-enabled downloads and time-based expiry algorithms, integrating React.js frontend, .NET API gateway, and Python FastAPI microservices to enable secure access to 1,000+ internal client documents.",
      "Resolved critical production failures within 24–48 hours, including restoring multi-agent LLM chat functionality, fixing voice transcription pipeline (AWS Bedrock/Textract), and debugging cross-layer JWT/SQL issues across React–FastAPI–.NET stacks, recognized as go-to engineer for firefighting and rapid delivery under pressure."
    ],
    technologies: ["React", "TypeScript", ".NET Core", "Python", "FastAPI", "AWS Bedrock", "AWS S3", "Redis", "PostgreSQL", "Docker", "Kubernetes", "Microservices", "AI Agents", "LLMs", "RAG"]
  },
  {
    company: "Cherengin Hills",
    role: "Corporate Sales & Strategy Associate",
    location: "Kuala Lumpur, Malaysia",
    period: "Jan 2021 - Jun 2022",
    responsibilities: [
      "Acquired and negotiated corporate sales agreements, securing RM80,000 in revenue by orchestrating corporate training seminars for multiple companies, through good relationship-building and negotiation skills with key corporate representatives."
    ],
    technologies: ["Corporate Sales", "Negotiation", "Relationship Building", "Strategic Planning"]
  },
  {
    company: "PricewaterhouseCoopers",
    role: "Assurance Associate",
    location: "Kuala Lumpur, Malaysia", 
    period: "Mar 2020 - Jul 2020",
    responsibilities: [
      "Conducted trend analytics and technical and reasonableness analysis on the PPE, Intangible Assets, Overhead expenses, Payroll expenses and subordinated obligations financial statement line items.",
      "Identified accounting errors via detailed analysis and understanding of client's business cash flow enabled recovery of errors could result in $25000 of variances."
    ],
    technologies: ["Financial Analysis", "Trend Analytics", "Accounting", "Audit"]
  }
];
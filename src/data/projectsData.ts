export interface ProjectItem {
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
  linkLabel?: string;
}

export const projectsData: ProjectItem[] = [
  {
    title: "Health Canvas",
    tag: "Hackathon",
    description: "AI-powered clinical canvas platform built in 48 hours. RAG pipeline with FAISS vector search processing 15-page medical histories at 90%+ extraction accuracy.",
    highlights: [
      "Top 5 as only solo developer among 150+ participants (30+ teams)",
      "Government-backed hackathon by Malaysian Ministry of Health and National AI Office"
    ],
    technologies: ["React", "TypeScript", "FastAPI", "GPT-4", "FAISS"],
    link: "https://github.com/faiqhilman13/HospitalCanvas",
    linkLabel: "GitHub"
  },
  {
    title: "ImuAI",
    tag: "Production",
    description: "Production RAG system serving Malaysian Muslim community with grounded, cited answers from 40k+ Islamic sources across Quran, hadith, and fiqh rulings.",
    highlights: [
      "Parsed and embedded 250k+ knowledge chunks from heterogeneous sources",
      "Hybrid search (pgvector + BM25), two-stage reranking, real-time streaming"
    ],
    technologies: ["React", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Docker"],
    link: "https://timely-tulumba-ac41cb.netlify.app/",
    linkLabel: "Live"
  },
  {
    title: "LLM Evaluation Harness",
    tag: "Research",
    description: "Production-grade evaluation harness comparing base models, API models, and fine-tuned variants using GPT-4o-mini as judge. ~87% accuracy on domain-specific benchmarks.",
    highlights: [
      "QLoRA fine-tuning pipeline on consumer hardware (single 12GB GPU)",
      "TinyLlama-1.1B Malay instruction scores lifted ~200%"
    ],
    technologies: ["Python", "QLoRA", "Hugging Face", "SQLite"],
    link: "https://github.com/faiqhilman13/LLM-eval",
    linkLabel: "GitHub"
  },
  {
    title: "Mini IDP",
    tag: "Platform",
    description: "Unified AI/ML workflow and RAG platform with 89.65% R² model training across 10+ algorithms, featuring adaptive preprocessing and sub-second inference.",
    highlights: [
      "Multi-stage RAG pipeline improving document recall by 60%",
      "Deployed on FastAPI/React/Supabase with Docker and CI/CD"
    ],
    technologies: ["FastAPI", "React", "Supabase", "LangChain", "Docker"],
    link: "#",
    linkLabel: "Demo"
  }
];

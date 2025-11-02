export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

export const skillsData: Record<string, SkillCategory> = {
  enterpriseai: {
    title: "Enterprise AI & Distributed Systems",
    icon: "🚀",
    description: "Multi-agent architectures, microservices, and production systems",
    skills: [
      "Multi-Agent AI Architecture",
      "AWS Bedrock Integration",
      "Microservices Orchestration",
      "Service Mesh Communication",
      "Production System Integration",
      "Cross-Service Debugging",
      "Vector Database Operations (pgvector)",
      "Knowledge Fusion Pipelines"
    ]
  },
  machinelearning: {
    title: "Machine Learning, AI & Automation",
    icon: "🧠",
    description: "LLMs, RAG, neural networks, and agentic workflows",
    skills: [
      "LLM Prompt Engineering",
      "RAG Pipelines (LangChain, FAISS, Ollama)",
      "Document Processing & Embeddings",
      "Neural Networks",
      "Random Forest",
      "SVM",
      "Feature Engineering",
      "Agentic Workflows",
      "Conversational AI",
      "Natural Language Processing"
    ]
  },
  fullstack: {
    title: "Fullstack Development",
    icon: "💻",
    description: "Frontend, backend, and full-stack frameworks",
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "Python",
      "C#/.NET Core",
      "HTML/CSS",
      "FastAPI",
      "SQLAlchemy",
      "Material-UI",
      "TailwindCSS",
      "Vite",
      "Real-time State Management",
      "Responsive UI Design",
      "API Integration Patterns"
    ]
  },
  cloud: {
    title: "Cloud & Infrastructure",
    icon: "☁️",
    description: "AWS, Kubernetes, Docker, and deployment pipelines",
    skills: [
      "AWS (Bedrock, S3, Secrets Manager, ECR, Textract)",
      "Kubernetes",
      "Docker",
      "CI/CD Pipelines",
      "PostgreSQL",
      "SQLite",
      "Database Migration",
      "Environment Management",
      "Container Orchestration",
      "Production Deployment"
    ]
  },
  security: {
    title: "Enterprise Security & Integration",
    icon: "🔒",
    description: "Authentication, compliance, and security frameworks",
    skills: [
      "SAML 2.0/ADFS Integration",
      "JWT Authentication",
      "Role-Based Access Control (RBAC)",
      "Enterprise Authentication Flows",
      "Secure API Design",
      "OT Cybersecurity",
      "Network Security",
      "Risk Assessment",
      "Compliance Frameworks"
    ]
  },
  dataengineering: {
    title: "Data Engineering & Analytics",
    icon: "📊",
    description: "ETL pipelines, data processing, and analytics",
    skills: [
      "ETL Pipelines",
      "Data Validation",
      "Webhooks",
      "SQL/SPARQL",
      "Pandas",
      "NumPy",
      "PySpark",
      "Distributed Computing",
      "Database Optimization",
      "Analytics Dashboard Design",
      "Business Intelligence Tools"
    ]
  }
};
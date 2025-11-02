export interface ProjectItem {
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  keyFeatures?: string[];
  outcome?: string;
}

export const projectsData: ProjectItem[] = [
  {
    title: "Health Canvas - Hackathon Project",
    icon: "🏥",
    shortDescription: "AI-powered clinical canvas platform with RAG for medical document processing and analysis.",
    fullDescription: "Single-handedly designed and developed an AI-powered clinical canvas platform using modern tech stack (React, TypeScript, FastAPI, OpenAI GPT-4). Engineered scalable healthcare application with real-time patient data visualization, automated clinical documentation, and semantic search capabilities. Processing complex 15-page medical histories with 90%+ accuracy using retrieval-augmented generation (RAG) with FAISS vector search.",
    technologies: ["React", "TypeScript", "FastAPI", "OpenAI GPT-4", "FAISS", "RAG", "Healthcare"],
    keyFeatures: [
      "AI-powered clinical canvas with real-time patient data visualization",
      "Retrieval-augmented generation (RAG) with FAISS vector search",
      "Automated clinical documentation and semantic search",
      "Processing of complex 15-page medical histories with 90%+ accuracy"
    ],
    outcome: "Placed top 5 as the only solo participant in competitive government-backed AI hackathon (30+ teams, 2-4 developers each) hosted by AI Tinkerers, Malaysian Ministry of Health, and Malaysian National AI Office."
  },
  {
    title: "Mini IDP - AI Workflow Platform",
    icon: "🤖",
    shortDescription: "Unified AI/ML workflow platform with RAG pipelines, model training, and document intelligence.",
    fullDescription: "Built a unified AI/ML workflow and retrieval-augmented generation (RAG) platform combining model training, document intelligence, and conversational analytics. Achieved 89.65% R² performance with sub-second model training across 10+ algorithms (Random Forest, SVM, Logistic Regression). Developed multi-stage RAG pipeline improving document recall by 60% with semantic clustering, cross-encoder reranking, and LangChain orchestration with FAISS vector search. Integrated llama3:8b LLM with session-based authentication and sliding-window chunking.",
    technologies: ["FastAPI", "React", "Supabase", "PostgreSQL", "LangChain", "FAISS", "llama3", "Docker", "AWS"],
    keyFeatures: [
      "Sub-second model training on 10+ ML algorithms with 89.65% R² accuracy",
      "Multi-stage RAG pipeline with 60% improved document recall",
      "Enterprise-grade backend with Row-Level Security (RLS) and JSONB indexing",
      "Session-based authentication with real-time evaluation"
    ],
    outcome: "Delivered production-level ML platform with optimized 6-table schema, Docker containers, CI/CD pipelines, and AWS orchestration enabling secure, scalable data operations and rapid iteration."
  },
  {
    title: "Intelligent B2B Lead Generation Platform",
    icon: "🚀",
    shortDescription: "Fully orchestrated workflow automation engine for B2B lead ingestion, LLM-powered email generation, and campaign tracking.",
    fullDescription: "Built a fully orchestrated workflow automation engine using n8n for lead ingestion, personalized email generation via LLM prompts, PDF proposal attachments, and campaign tracking, built for B2B marketers to automate cold outreach using personalized LLM-generated emails and campaign tracking, enabling consistent lead flow without manual effort.",
    technologies: ["n8n", "LLM", "Workflow Automation", "PDF Generation", "Campaign Tracking"],
    keyFeatures: [
      "Automated lead ingestion and enrichment",
      "Personalized LLM-powered email generation",
      "PDF proposal attachments",
      "Campaign tracking and analytics"
    ],
    outcome: "Automated and personalized B2B lead generation, reducing manual effort and increasing lead flow."
  },
  {
    title: "RAG-Powered Knowledge Chatbot",
    icon: "💬",
    shortDescription: "Local RAG chatbot for semantic Q&A across multiple PDFs using LangChain, FAISS, FastAPI, and Ollama.",
    fullDescription: "Built a fullstack local RAG chatbot using LangChain, FAISS, FastAPI, and Ollama, enabling semantic question-answering across multiple uploaded PDFs. Engineered dynamic context filtering with vector index rebuilding and cross-encoder re-ranking, solving ghost context issues and boosting LLM answer precision.",
    technologies: ["LangChain", "FAISS", "FastAPI", "Ollama", "RAG", "Vector Search"],
    keyFeatures: [
      "Semantic Q&A over multiple PDFs",
      "Dynamic context filtering and vector index rebuilding",
      "Cross-encoder re-ranking for improved answer precision"
    ],
    outcome: "Boosted LLM answer precision and solved ghost context issues for enterprise document Q&A."
  },
  {
    title: "Exploring Health Disparities in the UK",
    icon: "🔍",
    shortDescription: "Spatial analysis of health outcomes using GWR and machine learning to identify socioeconomic factors affecting public health.",
    fullDescription: "This research project analyzed the spatial relationships between socioeconomic factors and public health outcomes across the UK. By combining geodemographic techniques with advanced machine learning models, we were able to identify significant patterns in how occupation, economic status, and ethnicity correlated with health disparities across different regions.",
    technologies: [
      "Python", "GeoPandas", "Machine Learning", "Neural Networks", "Random Forest", 
      "SVM", "Geographically Weighted Regression", "Optuna", "Feature Selection"
    ],
    keyFeatures: [
      "Geodemographic analysis using Geographically Weighted Regression (GWR)",
      "Implementation of multiple machine learning models including Neural Networks, Random Forest, and SVM",
      "Rigorous feature selection process to identify the most significant socioeconomic indicators",
      "Hyperparameter optimization using Optuna",
      "Spatial visualization of health outcome variability"
    ],
    outcome: "The analysis provided actionable insights for public health interventions by identifying key socioeconomic factors with the strongest correlation to health disparities across different UK regions, creating a foundation for more targeted urban development strategies."
  },
  {
    title: "Cloud-Based Big Data Optimization Project",
    icon: "☁️",
    shortDescription: "High-performance distributed data processing implementation using PySpark and TensorFlow on Google Cloud.",
    fullDescription: "Implemented an optimized Big Data processing system using distributed computing technologies. The project focused on maximizing throughput and minimizing processing time for large-scale image datasets by leveraging Apache Spark's distributed processing capabilities combined with TensorFlow for efficient computation. The system was deployed on Google Cloud Dataproc to take advantage of scalable cloud resources.",
    technologies: [
      "PySpark", "TensorFlow", "Google Cloud Platform", "Dataproc", "Cloud Storage", 
      "Distributed Computing", "TFRecord", "Data Processing Optimization"
    ],
    keyFeatures: [
      "Distributed data ingestion and processing workflows using Apache Spark (PySpark)",
      "TensorFlow integration for optimized image processing",
      "Cloud-based speed tests and workload distribution experiments",
      "TFRecord optimization for improved storage and retrieval",
      "Benchmarking against traditional processing methods"
    ],
    outcome: "Achieved a peak throughput of 363.21 images/second and reduced data processing time by up to 74% compared to standard image decoding methods. TFRecord-based storage yielded a 2.5x improvement in reading speed over traditional image file loading."
  }
];
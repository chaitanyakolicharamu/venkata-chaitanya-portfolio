import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Shield, Database, Cloud, Terminal, Cpu, Layout, FileText, ChevronRight } from 'lucide-react';
import ParticleNetwork from '@/components/ParticleNetwork';
import { Button } from '@/components/ui/button';

const TypingEffect = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : subIndex === words[index].length ? 2000 : 100, Math.random() * 50));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return <span className="text-primary font-mono">{`${words[index].substring(0, subIndex)}|`}</span>;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 dark">
      <ParticleNetwork />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="font-bold tracking-[0.18em] text-white"
              style={{
                fontSize: '1.25rem',
                textShadow: '0 0 16px rgba(0,212,255,0.5)',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              KVC
            </span>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-xs font-mono text-white/30 tracking-widest hidden sm:block uppercase">
              Portfolio
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#flagship" className="hover:text-primary transition-colors">Flagship</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/venkataKolicharamu" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors" data-testid="link-github-nav">
              <Github size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors" data-testid="link-linkedin-nav">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-16 overflow-hidden z-10">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6" data-testid="badge-availability">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3">
              Venkata Chaitanya <br className="hidden md:block"/> Kolicharamu
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/60 mb-5 tracking-wide">
              AI Platform Architect &nbsp;·&nbsp; GenAI Security Engineer
            </p>
            <div className="text-xl md:text-2xl font-light text-muted-foreground mb-6 h-9">
              <TypingEffect words={[
                "GenAI Security Engineer",
                "Applied AI Engineer",
                "AI Platform Architect",
                "Edge AI Builder",
                "Computer Vision Researcher"
              ]} />
            </div>
            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              Building Secure Enterprise GenAI Systems, Agentic AI Platforms, and Cloud-Native AI Infrastructure
            </p>
            <p className="text-sm text-muted-foreground/70 mb-10 max-w-2xl leading-relaxed">
              Former Ford Emerging Technology Engineer with 3+ years of experience in enterprise AI research, LLM security, secure RAG pipelines, cloud AI architecture, and edge AI systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-view-projects">
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10" data-testid="button-download-resume">
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRight className="rotate-90 text-muted-foreground" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative z-10 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center text-8xl font-black text-white/10">VCK</div>
              <div className="absolute inset-0 border border-primary/30 rounded-2xl group-hover:border-primary/60 transition-colors duration-500 shadow-[0_0_30px_rgba(0,212,255,0.1)] group-hover:shadow-[0_0_50px_rgba(0,212,255,0.2)]" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white/90">About</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Venkat is a GenAI Security and Applied AI Engineer focused on building enterprise-grade LLM platforms, secure RAG systems, prompt injection defenses, AI governance layers, and cloud-native AI infrastructure. He brings hands-on experience from Ford Motor Company, where he worked on emerging technology research, GenAI security evaluations, AI infrastructure, and enterprise technology roadmaps.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {[
                  { value: "5", label: "APAC Awards" },
                  { value: "3+", label: "Enterprise Experience" },
                  { value: "15+", label: "AI/ML Projects" },
                  { value: "6", label: "Cloud & AI Certifications" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-4xl font-bold text-primary mb-1">{stat.value}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {["GenAI Security", "LLM Systems", "RAG Pipelines", "Edge AI", "Computer Vision", "Cloud Architecture"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-sm font-medium hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Flagship Project */}
      <section id="flagship" className="py-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-primary font-mono mb-4 text-sm tracking-widest uppercase">
              <Shield size={16} /> Flagship Project
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">PromptGuardian AI</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">An enterprise GenAI security control plane for protecting LLM applications from prompt injection, PII leakage, unsafe tool use, and insecure RAG workflows.</p>
          </motion.div>

          <div className="bg-black/60 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Database className="text-primary" /> Architecture & Features
                </h3>
                <div className="space-y-4 mb-8">
                  {[
                    "Prompt Injection Detection",
                    "PII Masking",
                    "OWASP LLM Top 10 Alignment",
                    "Secure RAG Pipeline",
                    "Real-time Risk Scoring",
                    "SIEM Integration"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {["FastAPI", "Vertex AI", "LangChain", "Pub/Sub", "BigQuery", "GCP", "AWS"].map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                      {tech}
                    </span>
                  ))}
                </div>

                <Button className="gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20" data-testid="btn-promptguardian-github">
                  <Github size={16} /> View on GitHub
                </Button>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-sm space-y-4">
                  <div className="flex justify-between items-center text-muted-foreground border-b border-white/5 pb-2">
                    <span>System Metrics</span>
                    <span className="text-primary flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"/> LIVE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/50 text-xs mb-1">Threat Detection</div>
                      <div className="text-2xl text-primary font-bold">99.2%</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Latency</div>
                      <div className="text-2xl text-secondary font-bold">&lt; 50ms</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">OWASP Coverage</div>
                      <div className="text-xl text-white/90">Top 10</div>
                    </div>
                    <div>
                      <div className="text-white/50 text-xs mb-1">Infrastructure</div>
                      <div className="text-xl text-white/90">GCP+AWS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-24 relative z-10 bg-black/40">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-white/90">Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "PromptGuardian AI",
                desc: "Enterprise GenAI Security Control Plane.",
                stack: ["FastAPI", "Vertex AI", "LangChain", "GCP"],
                icon: Shield
              },
              {
                title: "RacePulse",
                desc: "AI-powered Formula 1 telemetry intelligence platform.",
                stack: ["Python", "ML", "Real-time", "FastAPI"],
                icon: Cloud
              },
              {
                title: "WISN Glaucoma Detection",
                desc: "Wavelet Scattering Networks for medical imaging.",
                stack: ["PyTorch", "CV", "CNNs"],
                icon: Layout
              },
              {
                title: "FireSight",
                desc: "Wildfire prediction system using satellite/sensor data.",
                stack: ["TensorFlow", "GCP", "Satellite Data"],
                icon: Database
              },
              {
                title: "Edge GenAI IoT",
                desc: "GenAI inference on edge devices.",
                stack: ["ONNX", "Raspberry Pi", "LangChain"],
                icon: Cpu
              },
              {
                title: "RAG Enterprise Chatbot",
                desc: "Secure RAG pipeline with enterprise knowledge base.",
                stack: ["LangChain", "FAISS", "PostgreSQL"],
                icon: Terminal
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                data-testid={`project-card-${i}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                <project.icon className="text-primary mb-4 w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold mb-2 text-white/90">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, j) => (
                    <span key={j} className="px-2 py-1 bg-black/40 rounded text-xs font-mono text-white/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section id="skills" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-white/90">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: "GenAI & Agentic AI",
                skills: ["LangChain", "Vertex AI", "LlamaIndex", "RAG", "Prompt Engineering", "Agentic Workflows"]
              },
              {
                category: "AI Security",
                skills: ["Prompt Injection Defense", "PII Detection", "OWASP LLM Top 10", "Zero Trust AI", "JWT"]
              },
              {
                category: "Cloud & DevOps",
                skills: ["GCP", "AWS", "Terraform", "Docker", "Kubernetes", "Pub/Sub", "BigQuery", "CI/CD"]
              },
              {
                category: "ML & Deep Learning",
                skills: ["PyTorch", "TensorFlow", "ONNX", "Scikit-learn", "FAISS", "Vector DBs"]
              },
              {
                category: "Backend Systems",
                skills: ["Python", "FastAPI", "PostgreSQL", "REST APIs", "Microservices"]
              },
              {
                category: "Computer Vision & Observability",
                skills: ["OpenCV", "CNNs", "Medical Imaging", "Edge Inference", "OpenTelemetry", "Grafana", "SIEM/SOAR"]
              }
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4 text-white/80">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <span key={j} className="px-3 py-1 bg-black/50 border border-white/10 rounded-full text-sm text-primary/80 hover:text-primary hover:border-primary/50 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-24 relative z-10 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-16 text-white/90">Experience</h2>
          <div className="relative pl-8 md:pl-0">
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-primary/20" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative md:w-1/2 md:pr-12"
            >
              <div className="absolute -left-10 md:-right-3 md:left-auto top-2 w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_rgba(0,212,255,0.5)] border-4 border-background" />
              <div className="bg-white/5 border border-white/10 p-6 rounded-xl relative group hover:border-primary/50 transition-colors">
                <div className="absolute top-6 -right-6 w-6 h-px bg-primary/20 hidden md:block group-hover:bg-primary/50 transition-colors" />
                <span className="text-primary font-mono text-sm mb-2 block">2021 – 2024</span>
                <h3 className="text-2xl font-bold text-white/90 mb-1">Emerging Technology Research Engineer</h3>
                <p className="text-muted-foreground font-medium mb-4">Ford Motor Company</p>
                <ul className="space-y-3">
                  {[
                    "Led GenAI Security initiatives, Gartner roadmap analysis",
                    "Built edge AI research systems and cloud deployments",
                    "Designed AI infrastructure for enterprise LLM systems",
                    "5 Asia Pacific Recognition Awards",
                    "Pioneered prompt injection defense systems",
                    "Cloud-native AI architecture on GCP + AWS"
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <ChevronRight size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Mindset */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16 font-mono text-white/90">How I Think About AI Systems</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 overflow-x-auto pb-8">
            {[
              "User", "AI Gateway", "Policy Engine", "Risk Scorer", "LLM Inference", "Monitoring"
            ].map((node, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/60 border border-primary/30 text-primary px-4 py-3 rounded-lg shadow-[0_0_15px_rgba(0,212,255,0.1)] whitespace-nowrap"
                >
                  {node}
                </motion.div>
                {i < 5 && (
                  <ArrowRight className="text-muted-foreground rotate-90 md:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-muted-foreground text-sm">
            {["Zero Trust AI", "Full Observability", "Governance First", "Scalable Inference", "Enterprise Deployment"].map((philosophy, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                {philosophy}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Publications & Certifications */}
      <section className="py-24 relative z-10 bg-black/40">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-12 text-white/90">Research & Publications</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "On-Device Prompt Injection & PII Detection using Edge-based GenAI Security Filters",
                    tags: ["Security", "Edge AI", "GenAI"]
                  },
                  {
                    title: "Generative AI for Predictive Maintenance in Edge IoT Systems",
                    tags: ["IoT", "GenAI", "Predictive Maintenance"]
                  },
                  {
                    title: "Computer Vision for Glaucoma Detection using Wavelet Scattering Networks",
                    tags: ["Computer Vision", "Medical Imaging"]
                  }
                ].map((pub, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-secondary/50 transition-colors"
                  >
                    <h3 className="font-bold text-white/90 mb-3">{pub.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pub.tags.map((tag, j) => (
                        <span key={j} className="text-xs text-secondary bg-secondary/10 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="link" className="text-primary p-0 h-auto gap-1">
                      Read More <ArrowRight size={14} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-12 text-white/90">Certifications</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "GCP Professional ML Engineer (In Progress)",
                  "Salesforce AI Associate",
                  "NVIDIA RAG Agents",
                  "Azure AI Fundamentals",
                  "Azure Fundamentals",
                  "OCI Generative AI"
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <FileText className="text-primary shrink-0" size={20} />
                    <span className="text-sm font-medium text-white/80">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-24 relative z-10 border-t border-white/10 bg-black/80">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 font-mono text-white/90">&gt;_ Initialize_Contact</h2>
              <p className="text-xl text-muted-foreground">Let's build secure, scalable, production-ready AI systems.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase">Name</label>
                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase">Email</label>
                    <input type="email" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted-foreground uppercase">Subject</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Opportunity" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted-foreground uppercase">Message</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors min-h-[120px]" placeholder="Hello..." />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mt-2">
                  <Terminal size={16} /> Send Message
                </Button>
              </form>
            </div>

            <div className="flex justify-center gap-6 mb-12">
              <a href="https://github.com/venkataKolicharamu" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all">
                <Github size={24} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all">
                <Linkedin size={24} />
              </a>
              <a href="mailto:contact@example.com" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 hover:text-primary transition-all">
                <Mail size={24} />
              </a>
            </div>
            
            <p className="text-sm text-white/40 font-mono text-center">
              &copy; {new Date().getFullYear()} Venkata Chaitanya Kolicharamu. Systems Operational.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

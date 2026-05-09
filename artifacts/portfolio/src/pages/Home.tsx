import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Mail, ArrowRight,
  Shield, Database, Cloud, Cpu, FileText,
  Server, Eye, Layers, Activity, Lock, ChevronRight,
} from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import ParticleNetwork from '@/components/ParticleNetwork';
import { Button } from '@/components/ui/button';

/* ─── Animated counter ─────────────────────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let val = 0;
        const step = Math.max(1, Math.ceil(target / 36));
        const timer = setInterval(() => {
          val += step;
          if (val >= target) { setCount(target); clearInterval(timer); }
          else setCount(val);
        }, 40);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Experience role card ──────────────────────────────────────────────── */
interface RoleProps {
  period: string;
  title: string;
  company: string;
  tags: string[];
  description: string;
  bullets: string[];
  delay?: number;
}

function RoleCard({ period, title, company, tags, description, bullets, delay = 0 }: RoleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      className="relative flex gap-6"
    >
      {/* Timeline spine */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary mt-1.5 shrink-0 shadow-[0_0_10px_rgba(0,212,255,0.6)]" />
        <div className="w-px flex-1 bg-primary/15 mt-2" />
      </div>

      <div className="flex-1 bg-white/4 border border-white/8 rounded-xl p-6 md:p-7 mb-6 hover:border-white/14 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white leading-snug">{title}</h3>
            <p className="text-primary/75 text-sm font-medium mt-0.5">{company}</p>
          </div>
          <span className="text-xs font-mono text-muted-foreground bg-white/5 border border-white/8 px-3 py-1 rounded-full shrink-0">
            {period}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((t) => (
            <span key={t} className="text-xs px-2.5 py-0.5 rounded-full border border-primary/20 text-primary/60 bg-primary/5">
              {t}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{description}</p>

        <ul className="space-y-2.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
              <ChevronRight size={13} className="text-primary/50 shrink-0 mt-1" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 dark">
      <ParticleNetwork />

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span
            className="font-bold tracking-[0.2em] text-white select-none"
            style={{ fontSize: '1.1rem', textShadow: '0 0 14px rgba(0,212,255,0.4)' }}
          >
            KVC
          </span>

          <div className="hidden md:flex gap-7 text-sm font-medium text-muted-foreground">
            {[
              ['About', '#about'],
              ['Flagship Project', '#flagship'],
              ['Projects', '#projects'],
              ['Skills', '#skills'],
              ['Experience', '#experience'],
              ['Research', '#research'],
              ['Contact', '#contact'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="hover:text-white transition-colors duration-200">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a href="https://github.com/chaitanyakolicharamu" target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-100 opacity-60 hover:text-white text-white"
              data-testid="link-github-nav">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/venkat017" target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200 opacity-60 hover:opacity-100"
              style={{ color: '#0A66C2' }}
              data-testid="link-linkedin-nav">
              <Linkedin size={18} />
            </a>
            <a href="https://leetcode.com/u/venkat017/" target="_blank" rel="noopener noreferrer"
              className="transition-colors duration-200 hover:opacity-100 opacity-60 hover:text-white text-white"
              data-testid="link-leetcode-nav">
              <SiLeetcode size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden z-10">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs mb-10" data-testid="badge-availability">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Open to Opportunities
            </div>

            <h1 className="text-5xl md:text-[4.25rem] font-bold tracking-tight leading-[1.07] mb-6">
              Venkata Chaitanya<br />Kolicharamu
            </h1>

            <p className="text-base md:text-lg font-medium text-white/50 mb-8 tracking-wide">
              Applied AI Engineer &nbsp;·&nbsp; GenAI Engineer &nbsp;·&nbsp; AI Platform Architect
            </p>

            <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-2xl leading-relaxed">
              Building Enterprise AI Systems, Agentic AI Platforms, Cloud-Native ML Infrastructure, and Secure LLM Applications.
            </p>

            <p className="text-sm text-white/38 mb-12 max-w-2xl leading-relaxed">
              AI engineer with 5+ years of overall technology experience spanning enterprise AI research, Generative AI systems, applied machine learning, cloud AI infrastructure, secure RAG architectures, AI governance workflows, and edge AI platforms.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/85 rounded-lg font-medium px-7"
                data-testid="button-view-projects"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white/80 hover:bg-white/6 hover:border-white/28 rounded-lg font-medium px-7"
                data-testid="button-download-resume"
              >
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <ArrowRight className="rotate-90 text-white" size={18} />
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 relative z-10 bg-black/35 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-[280px_1fr] gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="relative aspect-square rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/12 to-secondary/8" />
              <div className="absolute inset-0 flex items-center justify-center select-none">
                <span className="text-[7rem] font-black text-white/5">VCK</span>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/15 group-hover:ring-primary/35 transition-all duration-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">About</h2>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Venkat is an Applied AI and GenAI Engineer focused on building enterprise-grade AI platforms, scalable LLM applications, agentic workflows, secure RAG systems, and cloud-native AI infrastructure. His experience spans Generative AI engineering, AI platform architecture, edge AI systems, machine learning pipelines, and enterprise AI security frameworks.
              </p>
              <p className="text-base text-muted-foreground mb-10 leading-relaxed">
                He has worked on enterprise AI initiatives involving LLM governance, prompt security, AI observability, intelligent automation, and production AI deployment strategies across cloud-native environments.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pb-10 border-b border-white/6">
                {[
                  { target: 5, suffix: '+', label: 'Years Overall Experience' },
                  { target: 15, suffix: '+', label: 'AI & ML Projects' },
                  { target: 5, suffix: '', label: 'APAC Recognition Awards' },
                  { target: 6, suffix: '', label: 'Cloud & AI Certifications' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-4xl font-bold text-primary mb-1.5 tabular-nums">
                      <Counter target={stat.target} suffix={stat.suffix} />
                    </span>
                    <span className="text-xs text-white/40 leading-snug">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {['GenAI Engineering', 'LLM Applications', 'Agentic AI', 'Secure RAG', 'AI Platform Architecture', 'Edge AI', 'Cloud AI Infrastructure', 'Applied ML'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-md bg-white/4 border border-white/8 text-sm text-white/60 hover:border-primary/35 hover:text-white/85 transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Flagship Project ────────────────────────────────────────────── */}
      <section id="flagship" className="py-28 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/4 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary/70 text-xs tracking-widest uppercase font-medium mb-4">Flagship Project</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">PromptGuardian AI</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enterprise AI Governance &amp; Security Platform — securing and governing LLM applications through prompt protection, AI risk analysis, secure RAG enforcement, observability pipelines, and policy-driven AI controls.
            </p>
          </motion.div>

          <div className="bg-black/50 border border-white/8 rounded-2xl p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/6 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-secondary/6 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-10 relative z-10">
              <div>
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-5">Platform Capabilities</h3>
                <div className="space-y-3 mb-7">
                  {[
                    'Prompt Injection & Jailbreak Detection',
                    'PII Detection & Automated Redaction',
                    'OWASP LLM Top 10 Coverage',
                    'Secure RAG Pipeline Enforcement',
                    'Real-time AI Risk Scoring',
                    'SIEM / SOAR Integration',
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-7">
                  {['FastAPI', 'Vertex AI', 'LangChain', 'Pub/Sub', 'BigQuery', 'GCP', 'AWS'].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-xs text-white/55 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="gap-2 border-white/12 hover:bg-white/7 text-white/70 hover:text-white" data-testid="btn-promptguardian-github">
                  <Github size={14} /> View on GitHub
                </Button>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-black/40 border border-white/8 rounded-xl p-5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-5">
                    <span className="text-xs tracking-widest uppercase text-white/35 font-mono">Platform Metrics</span>
                    <span className="text-primary flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { label: 'Threat Detection', value: '99.2%', color: 'text-primary' },
                      { label: 'Response Latency', value: '< 50ms', color: 'text-secondary' },
                      { label: 'OWASP Coverage', value: 'Top 10', color: 'text-white/80' },
                      { label: 'Infrastructure', value: 'GCP + AWS', color: 'text-white/80' },
                    ].map((m, i) => (
                      <div key={i}>
                        <div className="text-xs text-white/35 mb-1.5">{m.label}</div>
                        <div className={`text-xl font-bold ${m.color}`}>{m.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 relative z-10 bg-black/35">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2 text-white">Projects</h2>
          <p className="text-sm text-muted-foreground mb-12">Production-grade AI systems across multiple domains.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'PromptGuardian AI', desc: 'Enterprise AI governance and security platform for LLM applications — prompt protection, risk scoring, and policy enforcement.', stack: ['FastAPI', 'Vertex AI', 'LangChain', 'GCP'], icon: Shield },
              { title: 'RacePulse', desc: 'AI-powered Formula 1 telemetry intelligence platform for real-time performance analytics and race strategy prediction.', stack: ['Python', 'ML', 'Real-time Analytics', 'FastAPI'], icon: Activity },
              { title: 'WISN Glaucoma Detection', desc: 'Medical imaging system using Wavelet Scattering Networks for automated glaucoma detection from retinal scans.', stack: ['PyTorch', 'Computer Vision', 'CNNs'], icon: Eye },
              { title: 'FireSight', desc: 'Wildfire prediction system leveraging satellite data and ML models for early detection and risk assessment.', stack: ['TensorFlow', 'GCP', 'Geospatial ML'], icon: Cloud },
              { title: 'Edge GenAI IoT', desc: 'On-device GenAI inference architecture for IoT and edge environments with optimized model deployment pipelines.', stack: ['ONNX', 'LangChain', 'Quantization'], icon: Cpu },
              { title: 'Enterprise RAG Chatbot', desc: 'Scalable RAG-based enterprise chatbot with vector search, multi-turn context, and secure knowledge base retrieval.', stack: ['LangChain', 'FAISS', 'FastAPI', 'PostgreSQL'], icon: Database },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="group relative bg-white/4 border border-white/8 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                data-testid={`project-card-${i}`}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <p.icon className="text-primary/55 group-hover:text-primary/80 mb-4 w-6 h-6 transition-colors duration-300" />
                <h3 className="text-sm font-semibold mb-2 text-white/90">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-black/45 border border-white/7 rounded text-xs text-white/45 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Skills ───────────────────────────────────────────── */}
      <section id="skills" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2 text-white">Technical Skills</h2>
          <p className="text-sm text-muted-foreground mb-12">Spanning the full AI engineering stack.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { category: 'GenAI & Agentic AI', icon: Layers, skills: ['LangChain', 'LlamaIndex', 'Vertex AI', 'RAG Architecture', 'Prompt Engineering', 'Agentic Workflows', 'LLM Fine-tuning', 'Function Calling'] },
              { category: 'AI Governance & Security', icon: Lock, skills: ['OWASP LLM Top 10', 'MITRE ATLAS', 'AI Governance', 'AI Risk Management', 'Prompt Injection Defense', 'PII Detection', 'Secure RAG', 'Guardrails', 'LLM Evaluation'] },
              { category: 'Cloud & DevOps', icon: Cloud, skills: ['GCP', 'AWS', 'Terraform', 'Docker', 'Kubernetes', 'Pub/Sub', 'BigQuery', 'Cloud Run', 'CI/CD'] },
              { category: 'ML & Deep Learning', icon: Cpu, skills: ['PyTorch', 'TensorFlow', 'ONNX', 'Scikit-learn', 'FAISS', 'Vector Databases', 'Model Optimization', 'Hugging Face'] },
              { category: 'Backend & Infrastructure', icon: Server, skills: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Microservices', 'gRPC', 'Async Python'] },
              { category: 'Observability & Computer Vision', icon: Activity, skills: ['OpenTelemetry', 'Grafana', 'AI Observability', 'Model Monitoring', 'OpenCV', 'CNNs', 'Medical Imaging', 'Edge Inference'] },
            ].map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="bg-white/4 border border-white/8 rounded-xl p-6 hover:border-white/14 transition-colors duration-300"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <g.icon size={15} className="text-primary/60" />
                  <h3 className="text-sm font-semibold text-white/75">{g.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-black/40 border border-white/7 rounded-full text-xs text-white/55 hover:text-primary/80 hover:border-primary/28 transition-colors cursor-default">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 relative z-10 bg-black/35 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-2 text-white">Experience</h2>
          <p className="text-sm text-muted-foreground mb-14">Enterprise AI and research engineering at scale.</p>

          <div className="md:pl-4">
            <RoleCard
              period="2021 – Jan 2022"
              title="Emerging Technology Research Engineer"
              company="Ford Motor Company"
              tags={['Enterprise AI', 'Cloud Infrastructure', 'Edge Systems', 'Technology Research']}
              description="Worked on emerging technology research and enterprise innovation initiatives focused on AI adoption, infrastructure modernization, intelligent automation, and next-generation enterprise platforms."
              bullets={[
                'Conducted research and evaluation across emerging AI, cloud, infrastructure, and automation technologies for enterprise-scale initiatives.',
                'Analyzed Gartner technology roadmaps, vendor ecosystems, and enterprise technology strategies to support long-term platform planning.',
                'Contributed to proof-of-concept implementations involving edge computing, AI-driven automation, and intelligent infrastructure systems.',
                'Collaborated with engineering and business teams to identify scalable AI and cloud use cases aligned with operational requirements.',
                'Supported internal innovation programs focused on enterprise modernization and future-ready technology adoption.',
              ]}
              delay={0}
            />

            <RoleCard
              period="Jan 2022 – 2024"
              title="GenAI & Advanced Infrastructure Engineer"
              company="Ford Motor Company"
              tags={['Generative AI', 'AI Infrastructure', 'Cloud AI', 'Secure LLMs', 'AI Governance']}
              description="Contributed to enterprise Generative AI initiatives involving secure LLM workflows, AI infrastructure research, cloud-native AI systems, and governance-driven AI deployment strategies."
              bullets={[
                'Contributed to enterprise Generative AI initiatives across research and production-oriented environments.',
                'Worked on AI platform architecture, secure LLM workflows, cloud-native AI systems, and intelligent automation pipelines.',
                'Evaluated 5+ enterprise GenAI security and governance platforms aligned with OWASP LLM Top 10 and MITRE ATLAS frameworks.',
                'Researched secure RAG architectures, prompt protection strategies, AI observability pipelines, and governance-focused AI deployment models.',
                'Built proof-of-concept systems around prompt injection defense, AI risk analysis, and scalable AI workflow automation.',
                'Supported cloud-native AI infrastructure initiatives using GCP and AWS services for scalable deployment architectures.',
                'Contributed to enterprise AI discussions involving model governance, monitoring, scalability, and secure AI adoption strategies.',
                'Recipient of 5 Asia Pacific Recognition Awards for engineering innovation and technology contributions.',
              ]}
              delay={0.1}
            />
          </div>
        </div>
      </section>

      {/* ── Enterprise AI Architecture Principles ──────────────────────── */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold mb-3 text-white">Enterprise AI Architecture Principles</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">A structured approach to building reliable, governed, and production-ready AI systems.</p>
          </motion.div>

          <div className="flex flex-col items-center max-w-md mx-auto mb-14">
            {[
              'Users & Applications',
              'AI Gateway & Orchestration',
              'Policy Enforcement & Guardrails',
              'RAG / Tools / Agentic Workflows',
              'LLM Inference Layer',
              'Observability, Risk Monitoring & Governance',
              'Enterprise Security & Compliance',
            ].map((node, i, arr) => (
              <div key={i} className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="w-full bg-black/45 border border-white/9 hover:border-primary/28 text-white/70 hover:text-white/90 text-sm px-5 py-3 rounded-lg text-center transition-all duration-250"
                >
                  {node}
                </motion.div>
                {i < arr.length - 1 && <div className="w-px h-4 bg-primary/18" />}
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Server, label: 'Scalable AI Infrastructure', desc: 'Cloud-native, horizontally scalable AI platform design.' },
              { icon: Shield, label: 'AI Governance & Risk Controls', desc: 'Policy-driven controls across the full AI lifecycle.' },
              { icon: Lock, label: 'Secure Agentic Systems', desc: 'Safe, bounded agentic AI with guardrails and audit trails.' },
              { icon: Activity, label: 'Production-Grade Observability', desc: 'End-to-end tracing, monitoring, and model performance tracking.' },
              { icon: Layers, label: 'Enterprise AI Reliability', desc: 'Fault-tolerant inference pipelines with SLA-driven design.' },
              { icon: Eye, label: 'Responsible AI Engineering', desc: 'Ethical, fair, and accountable AI system delivery.' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="bg-white/4 border border-white/8 rounded-xl p-5 hover:border-primary/22 hover:bg-white/5 transition-all duration-300"
              >
                <card.icon size={16} className="text-primary/55 mb-3" />
                <h4 className="text-sm font-semibold text-white/80 mb-1.5">{card.label}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research & Certifications ───────────────────────────────────── */}
      <section id="research" className="py-24 relative z-10 bg-black/35">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Research & Publications</h2>
              <p className="text-sm text-muted-foreground mb-10">Applied AI research across security, edge computing, and medical imaging.</p>
              <div className="space-y-4">
                {[
                  { title: 'On-Device Prompt Injection & PII Detection using Edge-based GenAI Security Filters', tags: ['AI Security', 'Edge AI', 'GenAI'] },
                  { title: 'Generative AI for Predictive Maintenance in Edge IoT Systems', tags: ['IoT', 'GenAI', 'Edge AI', 'Predictive Maintenance'] },
                  { title: 'Computer Vision for Glaucoma Detection using Wavelet Scattering Networks', tags: ['Computer Vision', 'Medical Imaging', 'Deep Learning'] },
                ].map((pub, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09, duration: 0.45 }}
                    className="bg-white/4 border border-white/8 rounded-xl p-5 hover:border-white/13 transition-colors duration-300"
                  >
                    <h3 className="text-sm font-medium text-white/82 mb-3 leading-relaxed">{pub.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pub.tags.map((tag) => (
                        <span key={tag} className="text-xs text-primary/65 bg-primary/7 border border-primary/14 px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-xs text-primary/55 hover:text-primary transition-colors flex items-center gap-1">
                      Read More <ArrowRight size={11} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2 text-white">Certifications</h2>
              <p className="text-sm text-muted-foreground mb-10">Cloud and AI certifications across major platforms.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: 'GCP Professional ML Engineer', status: 'In Progress' },
                  { name: 'Salesforce AI Associate', status: 'Certified' },
                  { name: 'NVIDIA — Building RAG Agents with LLMs', status: 'Certified' },
                  { name: 'Azure AI Fundamentals', status: 'Certified' },
                  { name: 'Azure Fundamentals', status: 'Certified' },
                  { name: 'OCI Generative AI Professional', status: 'Certified' },
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-xl p-4 hover:border-white/13 transition-colors duration-300"
                  >
                    <FileText className="text-primary/55 shrink-0 mt-0.5" size={15} />
                    <div>
                      <span className="text-sm font-medium text-white/78 block leading-snug">{cert.name}</span>
                      <span className={`text-xs mt-1 block ${cert.status === 'In Progress' ? 'text-amber-400/55' : 'text-primary/50'}`}>
                        {cert.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <footer id="contact" className="py-24 relative z-10 border-t border-white/5 bg-black/65">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 text-white">Get in Touch</h2>
              <p className="text-muted-foreground text-sm">
                Let's build secure, scalable, production-ready AI systems.
              </p>
            </div>

            <div className="bg-white/3 border border-white/7 rounded-2xl p-7 mb-9 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/35 uppercase tracking-widest">Name</label>
                    <input type="text" data-testid="input-name"
                      className="w-full bg-black/35 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/35 uppercase tracking-widest">Email</label>
                    <input type="email" data-testid="input-email"
                      className="w-full bg-black/35 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/35 uppercase tracking-widest">Subject</label>
                  <input type="text" data-testid="input-subject"
                    className="w-full bg-black/35 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder="Opportunity or collaboration" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/35 uppercase tracking-widest">Message</label>
                  <textarea data-testid="input-message"
                    className="w-full bg-black/35 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-primary/40 transition-colors min-h-[100px] resize-none"
                    placeholder="Hello..." />
                </div>
                <Button data-testid="button-send-message" className="w-full bg-primary text-primary-foreground hover:bg-primary/85 rounded-lg font-medium">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="flex justify-center gap-4 mb-10">
              {[
                { href: 'https://github.com/chaitanyakolicharamu', icon: Github, label: 'GitHub', color: 'text-white' },
                { href: 'https://www.linkedin.com/in/venkat017', icon: Linkedin, label: 'LinkedIn', color: '' },
                { href: 'https://leetcode.com/u/venkat017/', icon: SiLeetcode as typeof Github, label: 'LeetCode', color: 'text-white' },
                { href: 'mailto:venkatkolicharamu@gmail.com', icon: Mail, label: 'Email', color: 'text-white' },
              ].map(({ href, icon: Icon, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center hover:bg-white/8 hover:border-white/18 transition-all duration-200 ${color}`}
                  style={label === 'LinkedIn' ? { color: '#0A66C2' } : {}}
                  data-testid={`link-${label.toLowerCase()}-footer`}>
                  <Icon size={17} />
                </a>
              ))}
            </div>

            <p className="text-xs text-white/22 text-center">
              &copy; {new Date().getFullYear()} Venkata Chaitanya Kolicharamu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

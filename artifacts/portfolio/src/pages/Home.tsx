import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Shield, Database, Cloud, Cpu, Layout, FileText, ChevronRight, Server, Eye, Layers, Activity, Lock } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import ParticleNetwork from '@/components/ParticleNetwork';
import { Button } from '@/components/ui/button';

/* ─── Inline KVC brand reveal ─────────────────────────────────────────── */
function KVCReveal() {
  const [phase, setPhase] = useState<'kvc' | 'full' | 'back'>('kvc');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('full'), 700);
    const t2 = setTimeout(() => setPhase('back'), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="h-7 flex items-center mb-8 overflow-hidden" aria-hidden="true">
      <AnimatePresence mode="wait">
        {phase === 'kvc' && (
          <motion.span
            key="kvc-start"
            className="font-bold tracking-[0.22em] text-white"
            style={{ fontSize: '1.05rem', textShadow: '0 0 18px rgba(0,212,255,0.55)' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(3px)', y: -4 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            KVC
          </motion.span>
        )}
        {phase === 'full' && (
          <motion.span
            key="full-name"
            className="font-light text-white/70 tracking-wide"
            style={{ fontSize: '0.9rem', textShadow: '0 0 12px rgba(0,212,255,0.3)' }}
            initial={{ opacity: 0, filter: 'blur(6px)', scaleX: 0.7 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scaleX: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', scaleX: 0.7 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Kolicharamu Venkata Chaitanya
          </motion.span>
        )}
        {phase === 'back' && (
          <motion.span
            key="kvc-end"
            className="font-bold tracking-[0.22em] text-white"
            style={{ fontSize: '1.05rem', textShadow: '0 0 18px rgba(0,212,255,0.45)' }}
            initial={{ opacity: 0, filter: 'blur(3px)', y: 4 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            KVC
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Typing effect ────────────────────────────────────────────────────── */
function TypingEffect({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1800);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (reverse ? -1 : 1)),
      Math.max(reverse ? 40 : subIndex === words[index].length ? 1800 : 90, Math.random() * 40)
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-primary">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

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
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 40);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
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
            style={{ fontSize: '1.15rem', textShadow: '0 0 14px rgba(0,212,255,0.45)' }}
          >
            KVC
          </span>

          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
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
            <a href="https://github.com/venkataKolicharamu" target="_blank" rel="noreferrer"
              className="text-muted-foreground hover:text-white transition-colors" data-testid="link-github-nav">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/venkata-kolicharamu" target="_blank" rel="noreferrer"
              className="text-muted-foreground hover:text-white transition-colors" data-testid="link-linkedin-nav">
              <Linkedin size={18} />
            </a>
            <a href="https://leetcode.com/venkataKolicharamu" target="_blank" rel="noreferrer"
              className="text-muted-foreground hover:text-white transition-colors" data-testid="link-leetcode-nav">
              <SiLeetcode size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden z-10">
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <KVCReveal />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs mb-8" data-testid="badge-availability">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Open to Opportunities
            </div>

            <h1 className="text-5xl md:text-[4.5rem] font-bold tracking-tight leading-[1.08] mb-5">
              Venkata Chaitanya<br />Kolicharamu
            </h1>

            <p className="text-lg md:text-xl font-medium text-white/55 mb-5 tracking-wide">
              Applied AI Engineer &nbsp;·&nbsp; GenAI Engineer &nbsp;·&nbsp; AI Platform Architect
            </p>

            <div className="text-lg md:text-xl text-muted-foreground mb-7 h-8">
              <TypingEffect words={[
                'Applied AI Engineer',
                'GenAI Engineer',
                'AI Platform Architect',
                'ML Engineer',
                'Edge AI Engineer',
              ]} />
            </div>

            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              Building Enterprise AI Systems, Agentic AI Platforms, Cloud-Native ML Infrastructure, and Secure LLM Applications.
            </p>
            <p className="text-sm text-white/40 mb-10 max-w-2xl leading-relaxed">
              AI engineer with 5+ years of overall technology experience spanning enterprise AI research, Generative AI systems, applied machine learning, cloud AI infrastructure, secure RAG architectures, and edge AI platforms.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/85 rounded-lg font-medium" data-testid="button-view-projects">
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="border-white/15 hover:bg-white/8 hover:border-white/30 rounded-lg font-medium" data-testid="button-download-resume">
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ArrowRight className="rotate-90 text-white" size={20} />
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 relative z-10 bg-black/35 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square rounded-2xl overflow-hidden border border-white/8 bg-white/4 backdrop-blur-xl group max-w-xs mx-auto w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl font-black text-white/6 select-none">VCK</span>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20 group-hover:ring-primary/45 transition-all duration-500" style={{ boxShadow: '0 0 40px rgba(0,212,255,0.06)' }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">About</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                Venkat is an Applied AI and GenAI Engineer focused on building enterprise-grade AI platforms, scalable LLM applications, agentic workflows, secure RAG systems, and cloud-native AI infrastructure. His experience spans Generative AI engineering, AI platform architecture, edge AI systems, machine learning pipelines, and enterprise AI security frameworks.
              </p>
              <p className="text-base text-muted-foreground mb-10 leading-relaxed">
                He has worked on enterprise AI initiatives involving LLM governance, prompt security, AI observability, intelligent automation, and production AI deployment strategies across cloud-native environments.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                {[
                  { target: 5, suffix: '+', label: 'Years Overall Experience' },
                  { target: 15, suffix: '+', label: 'AI & ML Projects' },
                  { target: 5, suffix: '', label: 'APAC Recognition Awards' },
                  { target: 6, suffix: '', label: 'Cloud & AI Certifications' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-4xl font-bold text-primary mb-1">
                      <Counter target={stat.target} suffix={stat.suffix} />
                    </span>
                    <span className="text-xs text-muted-foreground tracking-wide leading-snug">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  'GenAI Engineering', 'LLM Applications', 'Agentic AI',
                  'RAG Systems', 'AI Platform Architecture', 'Edge AI',
                  'Cloud AI Infrastructure', 'Applied ML',
                ].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/8 text-sm text-white/70 hover:border-primary/40 hover:text-white/90 transition-all cursor-default">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 text-primary/80 mb-4 text-xs tracking-widest uppercase font-medium">
              <Shield size={13} /> Flagship Project
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">PromptGuardian AI</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Enterprise AI Governance &amp; Security Platform — securing and governing LLM applications through prompt protection, AI risk analysis, secure RAG enforcement, observability pipelines, and policy-driven AI controls.
            </p>
          </motion.div>

          <div className="bg-black/55 border border-white/8 rounded-2xl p-8 md:p-10 backdrop-blur-xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary/8 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary/8 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid md:grid-cols-2 gap-10 relative z-10">
              <div>
                <h3 className="text-lg font-semibold mb-5 text-white/80">Platform Capabilities</h3>
                <div className="space-y-3 mb-7">
                  {[
                    'Prompt Injection & Jailbreak Detection',
                    'PII Detection & Redaction',
                    'OWASP LLM Top 10 Coverage',
                    'Secure RAG Pipeline Enforcement',
                    'Real-time AI Risk Scoring',
                    'SIEM / SOAR Integration',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-7">
                  {['FastAPI', 'Vertex AI', 'LangChain', 'Pub/Sub', 'BigQuery', 'GCP', 'AWS'].map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-xs text-white/60 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <Button variant="outline" className="gap-2 border-white/15 hover:bg-white/8 text-white/80 hover:text-white" data-testid="btn-promptguardian-github">
                  <Github size={15} /> View on GitHub
                </Button>
              </div>

              <div className="flex flex-col justify-center gap-4">
                <div className="bg-black/40 border border-white/8 rounded-xl p-5 font-mono text-sm">
                  <div className="flex justify-between items-center text-muted-foreground border-b border-white/5 pb-3 mb-4">
                    <span className="text-xs tracking-widest uppercase">Platform Metrics</span>
                    <span className="text-primary flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { label: 'Threat Detection', value: '99.2%', color: 'text-primary' },
                      { label: 'Response Latency', value: '< 50ms', color: 'text-secondary' },
                      { label: 'OWASP Coverage', value: 'Top 10', color: 'text-white/85' },
                      { label: 'Infrastructure', value: 'GCP+AWS', color: 'text-white/85' },
                    ].map((m, i) => (
                      <div key={i}>
                        <div className="text-white/40 text-xs mb-1">{m.label}</div>
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
          <h2 className="text-3xl font-bold mb-3 text-white">Projects</h2>
          <p className="text-muted-foreground mb-12 text-sm">Production-grade AI systems across multiple domains.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'PromptGuardian AI',
                desc: 'Enterprise AI governance and security platform for LLM applications — prompt protection, risk scoring, and policy enforcement.',
                stack: ['FastAPI', 'Vertex AI', 'LangChain', 'GCP'],
                icon: Shield,
              },
              {
                title: 'RacePulse',
                desc: 'AI-powered Formula 1 telemetry intelligence platform for real-time performance analytics and race strategy prediction.',
                stack: ['Python', 'ML', 'Real-time Analytics', 'FastAPI'],
                icon: Activity,
              },
              {
                title: 'WISN Glaucoma Detection',
                desc: 'Medical imaging system using Wavelet Scattering Networks for automated glaucoma detection from retinal scans.',
                stack: ['PyTorch', 'Computer Vision', 'CNNs', 'Medical Imaging'],
                icon: Eye,
              },
              {
                title: 'FireSight',
                desc: 'Wildfire prediction system leveraging satellite data and ML models for early detection and risk assessment.',
                stack: ['TensorFlow', 'GCP', 'Satellite Data', 'Geospatial ML'],
                icon: Cloud,
              },
              {
                title: 'Edge GenAI IoT',
                desc: 'On-device GenAI inference architecture for IoT and edge environments with optimized model deployment pipelines.',
                stack: ['ONNX', 'Edge Devices', 'LangChain', 'Quantization'],
                icon: Cpu,
              },
              {
                title: 'Enterprise RAG Chatbot',
                desc: 'Scalable RAG-based enterprise chatbot with vector search, multi-turn context, and secure knowledge base retrieval.',
                stack: ['LangChain', 'FAISS', 'FastAPI', 'PostgreSQL'],
                icon: Database,
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="group relative bg-white/4 border border-white/8 rounded-xl p-6 hover:bg-white/7 hover:border-primary/35 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                data-testid={`project-card-${i}`}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <project.icon className="text-primary/60 group-hover:text-primary/90 mb-4 w-7 h-7 transition-colors duration-300" />
                <h3 className="text-base font-semibold mb-2 text-white/90">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed flex-1">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-black/50 border border-white/8 rounded text-xs text-white/50 font-mono">
                      {tech}
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
          <h2 className="text-3xl font-bold mb-3 text-white">Technical Skills</h2>
          <p className="text-muted-foreground mb-12 text-sm">Spanning the full AI engineering stack.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                category: 'GenAI & Agentic AI',
                icon: Layers,
                skills: ['LangChain', 'LlamaIndex', 'Vertex AI', 'RAG Architecture', 'Prompt Engineering', 'Agentic Workflows', 'LLM Fine-tuning', 'Function Calling'],
              },
              {
                category: 'AI Governance & Security',
                icon: Lock,
                skills: ['OWASP LLM Top 10', 'MITRE ATLAS', 'AI Governance', 'AI Risk Management', 'Prompt Injection Defense', 'PII Detection', 'Secure RAG', 'Guardrails', 'LLM Evaluation'],
              },
              {
                category: 'Cloud & DevOps',
                icon: Cloud,
                skills: ['GCP', 'AWS', 'Terraform', 'Docker', 'Kubernetes', 'Pub/Sub', 'BigQuery', 'Cloud Run', 'CI/CD'],
              },
              {
                category: 'ML & Deep Learning',
                icon: Cpu,
                skills: ['PyTorch', 'TensorFlow', 'ONNX', 'Scikit-learn', 'FAISS', 'Vector Databases', 'Model Optimization', 'Hugging Face'],
              },
              {
                category: 'Backend & Infrastructure',
                icon: Server,
                skills: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Microservices', 'gRPC', 'Async Python'],
              },
              {
                category: 'Observability & Computer Vision',
                icon: Activity,
                skills: ['OpenTelemetry', 'Grafana', 'AI Observability', 'Model Monitoring', 'OpenCV', 'CNNs', 'Medical Imaging', 'Edge Inference'],
              },
            ].map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="bg-white/4 border border-white/8 rounded-xl p-6 hover:border-white/15 transition-colors duration-300"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <group.icon size={16} className="text-primary/70" />
                  <h3 className="text-sm font-semibold text-white/80">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-1 bg-black/40 border border-white/8 rounded-full text-xs text-white/60 hover:text-primary/80 hover:border-primary/30 transition-colors cursor-default">
                      {skill}
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
          <h2 className="text-3xl font-bold mb-12 text-white">Experience</h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/4 border border-white/8 rounded-xl p-7 hover:border-white/15 transition-colors duration-300"
          >
            <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Emerging Technology Research Engineer</h3>
                <p className="text-primary/80 font-medium text-sm">Ford Motor Company</p>
              </div>
              <span className="text-xs font-mono text-muted-foreground bg-white/5 border border-white/8 px-3 py-1 rounded-full">
                2021 – 2024
              </span>
            </div>
            <ul className="space-y-3">
              {[
                'Contributed to enterprise AI and Generative AI initiatives across research and production environments.',
                'Worked on AI platform research and cloud-native AI systems architecture.',
                'Evaluated enterprise GenAI security and governance solutions for production deployment.',
                'Built AI infrastructure and intelligent automation workflows at scale.',
                'Researched scalable AI deployment strategies and edge AI architectures.',
                'Recipient of 5 Asia Pacific Recognition Awards.',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                  <ChevronRight size={14} className="text-primary/60 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Enterprise AI Architecture Principles ──────────────────────── */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold mb-3 text-white">Enterprise AI Architecture Principles</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">A structured approach to building reliable, governed, and production-ready AI systems.</p>
          </motion.div>

          <div className="flex flex-col items-center gap-0 mb-14 max-w-sm mx-auto">
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
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="w-full bg-black/50 border border-white/10 hover:border-primary/30 text-white/75 hover:text-white/95 text-sm font-medium px-5 py-3 rounded-lg text-center transition-all duration-300"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
                >
                  {node}
                </motion.div>
                {i < arr.length - 1 && (
                  <div className="w-px h-5 bg-primary/20" />
                )}
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Server, label: 'Scalable AI Infrastructure', desc: 'Cloud-native, horizontally scalable AI platform design.' },
              { icon: Shield, label: 'AI Governance & Risk Controls', desc: 'Policy-driven controls across the AI lifecycle.' },
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
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="bg-white/4 border border-white/8 rounded-xl p-5 hover:border-primary/25 hover:bg-white/6 transition-all duration-300"
              >
                <card.icon size={18} className="text-primary/60 mb-3" />
                <h4 className="text-sm font-semibold text-white/85 mb-1.5">{card.label}</h4>
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
              <h2 className="text-3xl font-bold mb-3 text-white">Research & Publications</h2>
              <p className="text-muted-foreground text-sm mb-10">Applied AI research across security, edge computing, and medical imaging.</p>
              <div className="space-y-5">
                {[
                  {
                    title: 'On-Device Prompt Injection & PII Detection using Edge-based GenAI Security Filters',
                    tags: ['AI Security', 'Edge AI', 'GenAI'],
                  },
                  {
                    title: 'Generative AI for Predictive Maintenance in Edge IoT Systems',
                    tags: ['IoT', 'GenAI', 'Predictive Maintenance', 'Edge AI'],
                  },
                  {
                    title: 'Computer Vision for Glaucoma Detection using Wavelet Scattering Networks',
                    tags: ['Computer Vision', 'Medical Imaging', 'Deep Learning'],
                  },
                ].map((pub, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.45 }}
                    className="bg-white/4 border border-white/8 rounded-xl p-5 hover:border-white/15 transition-colors duration-300"
                  >
                    <h3 className="font-medium text-white/85 mb-3 text-sm leading-relaxed">{pub.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pub.tags.map((tag) => (
                        <span key={tag} className="text-xs text-primary/70 bg-primary/8 border border-primary/15 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-xs text-primary/60 hover:text-primary transition-colors flex items-center gap-1">
                      Read More <ArrowRight size={12} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-3 text-white">Certifications</h2>
              <p className="text-muted-foreground text-sm mb-10">Cloud and AI certifications across major platforms.</p>
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-3 bg-white/4 border border-white/8 rounded-xl p-4 hover:border-white/15 transition-colors duration-300"
                  >
                    <FileText className="text-primary/60 shrink-0 mt-0.5" size={16} />
                    <div>
                      <span className="text-sm font-medium text-white/80 block leading-snug">{cert.name}</span>
                      <span className={`text-xs mt-1 block ${cert.status === 'In Progress' ? 'text-yellow-400/60' : 'text-primary/50'}`}>
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
      <footer id="contact" className="py-24 relative z-10 border-t border-white/6 bg-black/70">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Get in Touch</h2>
              <p className="text-muted-foreground">
                Let's build secure, scalable, production-ready AI systems.
              </p>
            </div>

            <div className="bg-white/4 border border-white/8 rounded-2xl p-7 mb-10 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/40 uppercase tracking-wider">Name</label>
                    <input type="text" data-testid="input-name"
                      className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/40 uppercase tracking-wider">Email</label>
                    <input type="email" data-testid="input-email"
                      className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Subject</label>
                  <input type="text" data-testid="input-subject"
                    className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Opportunity" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-white/40 uppercase tracking-wider">Message</label>
                  <textarea data-testid="input-message"
                    className="w-full bg-black/40 border border-white/8 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-primary/50 transition-colors min-h-[110px] resize-none"
                    placeholder="Hello..." />
                </div>
                <Button data-testid="button-send-message" className="w-full bg-primary text-primary-foreground hover:bg-primary/85 rounded-lg font-medium">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="flex justify-center gap-5 mb-10">
              {[
                { href: 'https://github.com/venkataKolicharamu', icon: Github, label: 'GitHub' },
                { href: 'https://linkedin.com/in/venkata-kolicharamu', icon: Linkedin, label: 'LinkedIn' },
                { href: 'mailto:venkat@example.com', icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center hover:bg-primary/15 hover:border-primary/35 hover:text-primary text-muted-foreground transition-all duration-200"
                  data-testid={`link-${label.toLowerCase()}-footer`}>
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <p className="text-xs text-white/25 text-center">
              &copy; {new Date().getFullYear()} Venkata Chaitanya Kolicharamu
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

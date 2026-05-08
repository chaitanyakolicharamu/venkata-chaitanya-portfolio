import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase =
  | 'fadeIn'
  | 'kvcIdle'
  | 'expanding'
  | 'fullName'
  | 'collapsing'
  | 'kvcReturn'
  | 'fadeOut'
  | 'done';

interface LogoIntroProps {
  onComplete: () => void;
}

const PHASE_TIMINGS: Record<Phase, number> = {
  fadeIn: 0,
  kvcIdle: 600,
  expanding: 1800,
  fullName: 3400,
  collapsing: 5200,
  kvcReturn: 6500,
  fadeOut: 7600,
  done: 8800,
};

function usePhaseSequence(onComplete: () => void) {
  const [phase, setPhase] = useState<Phase>('fadeIn');

  useEffect(() => {
    const phases: Phase[] = [
      'kvcIdle',
      'expanding',
      'fullName',
      'collapsing',
      'kvcReturn',
      'fadeOut',
      'done',
    ];

    const timers = phases.map((p) =>
      setTimeout(() => {
        setPhase(p);
        if (p === 'done') onComplete();
      }, PHASE_TIMINGS[p])
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return phase;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animId: number;

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; trail: { x: number; y: number }[];
    };

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      trail: [],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 12) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = `rgba(0, 200, 255, ${p.opacity * 0.3})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 180, 255, ${(1 - dist / 120) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60"
    />
  );
}

function ShimmerOverlay({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12"
            initial={{ left: '-20%' }}
            animate={{ left: '120%' }}
            transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function LogoIntro({ onComplete }: LogoIntroProps) {
  const phase = usePhaseSequence(onComplete);

  if (phase === 'done') return null;

  const showKVC = phase === 'fadeIn' || phase === 'kvcIdle' || phase === 'kvcReturn';
  const showExpanding = phase === 'expanding';
  const showFullName = phase === 'fullName';
  const showCollapsing = phase === 'collapsing';
  const isFadingOut = phase === 'fadeOut';

  const glowPulse = phase === 'kvcIdle' || phase === 'kvcReturn';

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #080e1a 0%, #020408 100%)' }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: isFadingOut ? 1.2 : 0.4, ease: 'easeInOut' }}
    >
      <ParticleCanvas />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative flex items-center justify-center w-full select-none">
        <AnimatePresence mode="wait">

          {(showKVC) && (
            <motion.div
              key="kvc"
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="font-bold tracking-[0.25em] text-white select-none"
                style={{
                  fontSize: 'clamp(5rem, 16vw, 11rem)',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  letterSpacing: '0.2em',
                  textShadow: glowPulse
                    ? '0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.25)'
                    : '0 0 20px rgba(0,212,255,0.3)',
                }}
                animate={glowPulse ? {
                  textShadow: [
                    '0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)',
                    '0 0 50px rgba(0,212,255,0.8), 0 0 100px rgba(0,212,255,0.35)',
                    '0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(0,212,255,0.2)',
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                KVC
              </motion.span>
              <motion.div
                className="mt-4 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80%', opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <ShimmerOverlay active={glowPulse} />
            </motion.div>
          )}

          {showExpanding && (
            <motion.div
              key="expanding"
              className="relative flex flex-col items-center overflow-hidden"
              initial={{ opacity: 0, scaleX: 0.3 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="font-bold text-white tracking-widest whitespace-nowrap"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  textShadow: '0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)',
                  letterSpacing: '0.35em',
                }}
              >
                KVC
              </motion.span>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent mt-4"
                initial={{ width: '40%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          )}

          {showFullName && (
            <motion.div
              key="fullname"
              className="relative flex flex-col items-center px-8"
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="font-light text-white/90 text-center whitespace-nowrap"
                style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 3.5rem)',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  letterSpacing: '0.08em',
                  textShadow: '0 0 30px rgba(0,212,255,0.35)',
                }}
                animate={{
                  textShadow: [
                    '0 0 20px rgba(0,212,255,0.3)',
                    '0 0 40px rgba(0,212,255,0.55)',
                    '0 0 20px rgba(0,212,255,0.3)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                Kolicharamu Venkata Chaitanya
              </motion.span>

              <motion.div
                className="mt-5 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent w-full"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              <motion.span
                className="mt-4 text-xs font-mono tracking-[0.4em] uppercase text-cyan-400/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                AI Platform Architect &nbsp;·&nbsp; GenAI Security Engineer
              </motion.span>

              <ShimmerOverlay active />
            </motion.div>
          )}

          {showCollapsing && (
            <motion.div
              key="collapsing"
              className="relative flex flex-col items-center overflow-hidden"
              initial={{ opacity: 1, scaleX: 1 }}
              animate={{ opacity: 0.6, scaleX: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: [0.55, 0, 0.78, 0] }}
            >
              <span
                className="font-light text-white/70 text-center whitespace-nowrap"
                style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 3.5rem)',
                  fontFamily: "'Inter', system-ui, sans-serif",
                  letterSpacing: '0.08em',
                }}
              >
                Kolicharamu Venkata Chaitanya
              </span>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadingOut ? 0 : 0.35 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-mono tracking-[0.3em] text-white/30 uppercase">
          Loading Portfolio
        </span>
        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
      </motion.div>
    </motion.div>
  );
}

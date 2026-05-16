"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  angle: number;
  spin: number;
}

const MORANDI_COLORS = [
  "rgba(139, 126, 116, A)",  // warm brown
  "rgba(155, 142, 132, A)",  // taupe
  "rgba(139, 142, 160, A)",  // dusty blue
  "rgba(160, 139, 139, A)",  // dusty rose
  "rgba(143, 160, 139, A)",  // sage green
  "rgba(168, 155, 145, A)",  // sand
  "rgba(145, 139, 160, A)",  // lavender grey
];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, pressed: false });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const trailRef = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const randomColor = () => MORANDI_COLORS[Math.floor(Math.random() * MORANDI_COLORS.length)];

    const createParticle = (x?: number, y?: number, fast?: boolean): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: fast ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 0.4,
      vy: fast ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 0.4 - 0.15,
      size: Math.random() * 4 + 1.5,
      opacity: Math.random() * 0.5 + 0.15,
      color: randomColor(),
      life: 0,
      maxLife: Math.random() * 300 + 150,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
    });

    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(createParticle());
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      trailRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (trailRef.current.length > 20) trailRef.current.shift();
    };

    const handleMouseDown = () => { mouseRef.current.pressed = true; };
    const handleMouseUp = () => { mouseRef.current.pressed = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let lastSpawn = 0;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;
      const now = Date.now();
      frame++;

      // Draw mouse trail
      if (trailRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
        for (let i = 1; i < trailRef.current.length; i++) {
          const t = trailRef.current[i];
          ctx.lineTo(t.x, t.y);
          t.age++;
        }
        ctx.strokeStyle = "rgba(139, 126, 116, 0.08)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
        trailRef.current = trailRef.current.filter((t) => t.age < 30);
      }

      // Spawn particles near mouse
      if (now - lastSpawn > 150 && mouse.x > 0) {
        const count = mouse.pressed ? 3 : 1;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(
            createParticle(
              mouse.x + (Math.random() - 0.5) * 60,
              mouse.y + (Math.random() - 0.5) * 60,
              mouse.pressed
            )
          );
        }
        lastSpawn = now;
      }

      if (particlesRef.current.length > 150) {
        particlesRef.current.splice(0, particlesRef.current.length - 150);
      }

      particlesRef.current.forEach((p, i) => {
        p.life++;
        p.angle += p.spin;

        // Mouse interaction: attract when pressed, repel otherwise
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          if (mouse.pressed) {
            // Attract + orbit
            p.vx -= (dx / dist) * force * 0.08;
            p.vy -= (dy / dist) * force * 0.08;
            p.spin += 0.005;
          } else {
            // Repel gently
            p.vx += (dx / dist) * force * 0.03;
            p.vy += (dy / dist) * force * 0.03;
          }
        }

        // Gentle wandering
        p.vx += Math.sin(frame * 0.01 + p.y * 0.01) * 0.005;
        p.vy += Math.cos(frame * 0.01 + p.x * 0.01) * 0.005;

        // Damping
        p.vx *= 0.985;
        p.vy *= 0.985;

        p.x += p.vx;
        p.y += p.vy;

        // Lifecycle fading
        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(p.life / 20, 1);
        const fadeOut = lifeRatio > 0.6 ? 1 - (lifeRatio - 0.6) / 0.4 : 1;
        const alpha = p.opacity * fadeIn * fadeOut;

        // Draw soft ellipse particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("A", String(alpha));
        ctx.fill();

        // Larger soft glow
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 4, p.size * 3, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("A", String(alpha * 0.1));
        ctx.fill();
        ctx.restore();

        // Reset dead particles
        if (p.life > p.maxLife || p.x < -80 || p.x > canvas.width + 80 || p.y < -80 || p.y > canvas.height + 80) {
          particlesRef.current[i] = createParticle();
        }
      });

      // Connection lines between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139, 126, 116, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Mouse cursor glow ring
      if (mouse.x > 0) {
        const pulseSize = 20 + Math.sin(frame * 0.05) * 5;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = mouse.pressed ? "rgba(160, 139, 139, 0.25)" : "rgba(139, 126, 116, 0.1)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ opacity: 0.85 }}
    />
  );
}

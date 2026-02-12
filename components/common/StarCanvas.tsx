"use client"

import React, { useRef, useEffect } from 'react';

class Ember {
  x: number; y: number; vx: number; vy: number; size: number; life: number; color: string;

  constructor(x: number, y: number, angle: number, scale = 1) {
    this.x = x;
    this.y = y;

    const spread = angle + Math.PI + (Math.random() - 0.5) * 0.5;
    const speed = (Math.random() * 1.5 + 0.3) * scale;

    this.vx = Math.cos(spread) * speed;
    this.vy = Math.sin(spread) * speed;
    this.size = (Math.random() * 1.8) * scale;
    this.life = 1;
    this.color = Math.random() > 0.5 ? '#FFD700' : '#FF4500';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= 0.02;
  }
}

class ShootingStar {
  x!: number; y!: number; vx!: number; vy!: number; angle!: number;
  history: { x: number; y: number }[] = [];
  embers: Ember[] = [];
  leftScreen = false;
  isDead = false;
  scale: number;

  constructor(startX?: number, startY?: number, scale = 1) {
    this.scale = scale;
    this.init(startX, startY);
  }

  init(startX?: number, startY?: number) {
    this.history = [];
    this.embers = [];
    this.leftScreen = false;
    this.isDead = false;

    this.angle = (Math.random() * 10 + 10) * (Math.PI / 180);
    const speed = (Math.random() * 3 + 6) * (1 / Math.max(1, this.scale * 0.5));

    this.vx = Math.cos(this.angle) * speed;
    this.vy = Math.sin(this.angle) * speed;

    if (startX !== undefined && startY !== undefined) {
      this.x = startX;
      this.y = startY;
    } else {
      this.x = -Math.random() * 300 - 50;
      this.y = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000) * 0.5;
    }
  }

  update() {
    if (this.isDead) return;

    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > 25) this.history.shift();

    this.x += this.vx;
    this.y += this.vy;

    if (!this.leftScreen && (this.x > window.innerWidth + 50 || this.y > window.innerHeight + 50)) {
      this.leftScreen = true;
    }

    if (!this.leftScreen) {
      if (Math.random() > 0.6) {
        for (let i = 0; i < 4; i++) {
          this.embers.push(new Ember(this.x, this.y, this.angle, this.scale));
        }
      }
    }

    this.embers.forEach(e => e.update());
    this.embers = this.embers.filter(e => e.life > 0);

    if (this.leftScreen && this.embers.length === 0) {
      this.isDead = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.embers.forEach(e => {
      ctx.globalAlpha = Math.max(0, e.life);
      ctx.fillStyle = e.color;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    if (this.history.length > 1) {
      for (let i = 1; i < this.history.length; i++) {
        const r = i / this.history.length;
        ctx.strokeStyle = `rgba(255, 255, 220, ${r * 0.5})`;
        ctx.lineWidth = r * 3 * this.scale;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.history[i - 1].x, this.history[i - 1].y);
        ctx.lineTo(this.history[i].x, this.history[i].y);
        ctx.stroke();
      }
    }

    ctx.save();
    ctx.shadowBlur = 10 * this.scale;
    ctx.shadowColor = '#fff';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2 * this.scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let starsCanvasActive = false;

const StarsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeStars = useRef<ShootingStar[]>([]);
  const staticStars = useRef<{ x: number; y: number; r: number; o: number }[]>([]);
  
  const nextSpawnTime = useRef<number>(0);
  const globalLastClickTime = useRef<number>(0);

  const SPAM_TRIGGER_COUNT = 12;
  const SPAM_COOLDOWN_MS = 10000;

  const spamCount = useRef<number>(0);
  const spamCooldownUntil = useRef<number>(0);

  const CLICK_COOLDOWN = 200;
  const LOOP_SPAWN_MIN = 8000;
  const LOOP_SPAWN_MAX = 20000;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (starsCanvasActive) return;
    starsCanvasActive = true;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let raf = 0;

    const initStaticStars = () => {
      staticStars.current = Array.from({ length: 150 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2,
        o: Math.random() * 0.5 + 0.1,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStaticStars();
    };

    resize();
    window.addEventListener('resize', resize);
    nextSpawnTime.current = performance.now() + 5000;

    const handleGlobalPointerUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const now = performance.now();

      if (now < spamCooldownUntil.current) return;
      if (now - globalLastClickTime.current < CLICK_COOLDOWN) return;

      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"], nav')) return;

      const contentTags = ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'IMG', 'LI', 'UL', 'OL', 'STRONG', 'EM', 'I', 'B'];
      if (contentTags.includes(target.tagName)) return;

      activeStars.current.push(new ShootingStar(e.clientX, e.clientY));

      spamCount.current += 1;

      if (spamCount.current >= SPAM_TRIGGER_COUNT) {
        activeStars.current.push(new ShootingStar(e.clientX, e.clientY, 3));
        spamCount.current = 0;
        spamCooldownUntil.current = now + SPAM_COOLDOWN_MS;
      }

      globalLastClickTime.current = now;
    };

    window.addEventListener('pointerup', handleGlobalPointerUp);

    const render = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      staticStars.current.forEach(s => {
        ctx.fillStyle = `rgba(255,255,255,${s.o})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (timestamp >= nextSpawnTime.current) {
        activeStars.current.push(new ShootingStar());
        nextSpawnTime.current = timestamp + LOOP_SPAWN_MIN + Math.random() * (LOOP_SPAWN_MAX - LOOP_SPAWN_MIN);
      }

      activeStars.current.forEach(star => {
        star.update();
        star.draw(ctx);
      });

      activeStars.current = activeStars.current.filter(star => !star.isDead);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      starsCanvasActive = false;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1, 
      }}
    />
  );
};

export default StarsCanvas;
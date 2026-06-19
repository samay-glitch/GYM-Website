import { useRef, useEffect, useMemo } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Pure CSS + Canvas2D hero animation — no WebGL, no context loss
export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Generate particles once
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 3 + 1,
      speedY: (Math.random() * 0.3 + 0.1) * 0.002,
      speedX: (Math.random() - 0.5) * 0.0005,
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }));
  }, []);

  // Dumbbell shape config
  const dumbbell = useMemo(() => ({
    x: 0.72,
    y: 0.45,
    angle: 0,
    targetAngle: 0,
    floatOffset: 0,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = 0.5;
    let mouseY = 0.5;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const drawDumbbell = (ctx, cx, cy, w, h, angle, t) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      const handleLen = w * 0.38;
      const handleThick = h * 0.06;
      const plateW = w * 0.06;
      const plateH1 = h * 0.32;
      const plateH2 = h * 0.26;

      // Glow behind dumbbell
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.35);
      glow.addColorStop(0, 'rgba(255, 60, 31, 0.08)');
      glow.addColorStop(1, 'rgba(255, 60, 31, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, w * 0.35, 0, Math.PI * 2);
      ctx.fill();

      // Handle - metallic gradient
      const handleGrad = ctx.createLinearGradient(0, -handleThick, 0, handleThick);
      handleGrad.addColorStop(0, '#555');
      handleGrad.addColorStop(0.3, '#444');
      handleGrad.addColorStop(0.5, '#666');
      handleGrad.addColorStop(0.7, '#444');
      handleGrad.addColorStop(1, '#333');
      ctx.fillStyle = handleGrad;
      ctx.beginPath();
      ctx.roundRect(-handleLen, -handleThick, handleLen * 2, handleThick * 2, handleThick * 0.5);
      ctx.fill();

      // Weight plates function
      const drawPlate = (offsetX, plateHeight) => {
        const plateGrad = ctx.createLinearGradient(offsetX - plateW / 2, 0, offsetX + plateW / 2, 0);
        plateGrad.addColorStop(0, '#1a1a1a');
        plateGrad.addColorStop(0.3, '#2a2a2a');
        plateGrad.addColorStop(0.5, '#333');
        plateGrad.addColorStop(0.7, '#2a2a2a');
        plateGrad.addColorStop(1, '#1a1a1a');
        ctx.fillStyle = plateGrad;
        ctx.beginPath();
        ctx.roundRect(offsetX - plateW / 2, -plateHeight / 2, plateW, plateHeight, 3);
        ctx.fill();

        // Rim highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      // Left plates
      drawPlate(-handleLen * 0.75, plateH1);
      drawPlate(-handleLen * 0.92, plateH2);

      // Right plates
      drawPlate(handleLen * 0.75, plateH1);
      drawPlate(handleLen * 0.92, plateH2);

      // Accent edge lighting
      ctx.strokeStyle = `rgba(255, 60, 31, ${0.15 + Math.sin(t * 2) * 0.05})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-handleLen, -handleThick, handleLen * 2, handleThick * 2, handleThick * 0.5);
      ctx.stroke();

      ctx.restore();
    };

    const animate = () => {
      if (prefersReducedMotion) return;

      time += 0.016;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Draw particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.pulse += 0.02;

        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        const px = p.x * w;
        const py = p.y * h;
        const pulseOpacity = p.opacity * (0.7 + Math.sin(p.pulse) * 0.3);

        // Particle glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.size * 3);
        grad.addColorStop(0, `rgba(255, 60, 31, ${pulseOpacity})`);
        grad.addColorStop(1, 'rgba(255, 60, 31, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.fillStyle = `rgba(255, 80, 50, ${pulseOpacity})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animate dumbbell — float + mouse tracking
      dumbbell.floatOffset = Math.sin(time * 0.8) * 15;
      dumbbell.targetAngle = (mouseX - 0.5) * 0.3 + Math.sin(time * 0.5) * 0.08;
      dumbbell.angle += (dumbbell.targetAngle - dumbbell.angle) * 0.05;

      const dbX = dumbbell.x * w + (mouseX - 0.5) * 40;
      const dbY = dumbbell.y * h + dumbbell.floatOffset + (mouseY - 0.5) * 20;

      drawDumbbell(ctx, dbX, dbY, w * 0.45, h * 0.45, dumbbell.angle, time);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particles, dumbbell, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        background: 'transparent',
      }}
    />
  );
}

import { useEffect, useRef, type HTMLAttributes } from 'react';

interface BackgroundCanvasProps extends HTMLAttributes<HTMLDivElement> {
    particleCount?: number;
    connectionDistance?: number;
}

export function BackgroundCanvas({
    className,
    particleCount = 60,
    connectionDistance = 120,
    ...props
}: BackgroundCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const canvas = document.createElement('canvas');

        canvas.className = 'pointer-events-none absolute inset-0 h-full w-full';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            color: string;
            radius: number;
        }[] = [];

        const colors = [
            '#2c8668',
            '#904db2',
            '#b8502e',
            '#1d90c9',
            '#ac7300',
            '#5b8624',
            '#bf535a',
            '#717cbb'
        ];

        const parent = container.parentElement;
        let animationFrameId: number;
        const mouse = { x: -1000, y: -1000 };

        const resize = () => {
            if (!parent) return;

            const rect = parent.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${String(rect.width)}px`;
            canvas.style.height = `${String(rect.height)}px`;
            ctx.scale(dpr, dpr);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();

            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        if (parent) {
            parent.addEventListener('mousemove', handleMouseMove);
            parent.addEventListener('mouseleave', handleMouseLeave);
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * (canvas.width || 800),
                y: Math.random() * (canvas.height || 600),
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                color: colors[Math.floor(Math.random() * colors.length)],
                radius: Math.random() * 2 + 1
            });
        }

        const animate = () => {
            if (!ctx || !parent) return;

            const rect = parent.getBoundingClientRect();

            if (
                canvas.width !== rect.width * (window.devicePixelRatio || 1) ||
                canvas.height !== rect.height * (window.devicePixelRatio || 1)
            ) {
                resize();
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const maxDistSq = connectionDistance * connectionDistance;
            const mouseDistSq = 150 * 150;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;

                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const mDistSq = dx * dx + dy * dy;

                if (mDistSq < mouseDistSq) {
                    p.x -= dx * 0.008;
                    p.y -= dy * 0.008;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.6;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const cdx = p.x - p2.x;
                    const cdy = p.y - p2.y;
                    const cdistSq = cdx * cdx + cdy * cdy;

                    if (cdistSq < maxDistSq) {
                        const cdist = Math.sqrt(cdistSq);

                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = 0.08 * (1 - cdist / connectionDistance);
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            ctx.globalAlpha = 1;
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        const cleanup = () => {
            window.removeEventListener('resize', resize);

            if (parent) {
                parent.removeEventListener('mousemove', handleMouseMove);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            }

            cancelAnimationFrame(animationFrameId);
            canvas.remove();
        };

        window.addEventListener('resize', resize);

        return cleanup;
    }, [particleCount, connectionDistance]);

    return (
        <div
            ref={containerRef}
            className={className}
            {...props}
        />
    );
}

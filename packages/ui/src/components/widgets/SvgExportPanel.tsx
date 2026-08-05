/**
 * SvgExportPanel — TEMPORARY dev tool.
 *
 * Wrap whatever live SVG(s) you want a raster of (e.g. your original
 * EdgeField component) as `children`. It renders them completely normally —
 * so the browser evaluates the real feTurbulence / feConvolveMatrix chain
 * exactly as on screen — then a small floating panel lets you export a PNG
 * or WebP at a resolution you choose.
 *
 * If `children` contains more than one <svg> (e.g. a base + hot layer),
 * they're all captured and composited in DOM order onto one canvas, matching
 * how they're stacked visually.
 *
 * Usage:
 *   <SvgExportPanel filename="edge-field">
 *     <EdgeFieldOriginal />
 *   </SvgExportPanel>
 *
 * Mount this somewhere in your app temporarily, click Export, grab the file
 * from your downloads, then remove SvgExportPanel (and go back to rendering
 * <EdgeFieldOriginal /> directly, or swap in the static rasterized version).
 */

import { useRef, useState, type ReactNode } from 'react';

interface SvgExportPanelProps {
        children: ReactNode;
        filename?: string;
        defaultWidth?: number;
        defaultHeight?: number;
}

export function SvgExportPanel({
        children,
        filename = 'edge-field',
        defaultWidth = 1920,
        defaultHeight = 1080
}: SvgExportPanelProps) {
        const containerRef = useRef<HTMLDivElement>(null);
        const [width, setWidth] = useState(defaultWidth);
        const [height, setHeight] = useState(defaultHeight);
        const [format, setFormat] = useState<'png' | 'webp'>('png');
        const [status, setStatus] = useState<string | null>(null);
        const [busy, setBusy] = useState(false);

        async function handleExport() {
                const container = containerRef.current;
                if (!container) return;

                const svgEls = Array.from(container.querySelectorAll('svg'));
                if (svgEls.length === 0) {
                        setStatus('No <svg> found inside — check what you passed as children.');
                        return;
                }

                setBusy(true);
                setStatus('Rendering…');
                try {
                        const blob = await exportSvgsAsImage(svgEls, { width, height, format });
                        if (format === 'webp' && blob.type !== 'image/webp') {
                                setStatus(
                                        'This browser can\u2019t encode WebP via canvas \u2014 saved as PNG instead.'
                                );
                        } else {
                                setStatus(
                                        `Saved ${filename}.${blob.type === 'image/webp' ? 'webp' : 'png'}`
                                );
                        }
                        downloadBlob(
                                blob,
                                `${filename}.${blob.type === 'image/webp' ? 'webp' : 'png'}`
                        );
                } catch (err) {
                        console.error(err);
                        setStatus('Export failed \u2014 see console.');
                } finally {
                        setBusy(false);
                }
        }

        return (
                <div>
                        {/* The live SVG(s) being captured, rendered exactly as normal. */}
                        <div ref={containerRef}>{children}</div>

                        <div
                                style={{
                                        position: 'fixed',
                                        bottom: 16,
                                        right: 16,
                                        zIndex: 9999,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 8,
                                        padding: 12,
                                        borderRadius: 10,
                                        background: 'rgba(20,20,20,0.88)',
                                        color: '#fff',
                                        fontFamily: 'system-ui, sans-serif',
                                        fontSize: 13,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                                        pointerEvents: 'auto'
                                }}
                        >
                                <div style={{ fontWeight: 600, opacity: 0.9 }}>
                                        SVG Export (temp)
                                </div>

                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <label style={{ opacity: 0.8 }}>W</label>
                                        <input
                                                type="number"
                                                value={width}
                                                onChange={(e) => {
                                                        setWidth(
                                                                Math.max(
                                                                        1,
                                                                        Number(e.target.value) || 1
                                                                )
                                                        );
                                                }}
                                                style={{ width: 70 }}
                                        />
                                        <label style={{ opacity: 0.8 }}>H</label>
                                        <input
                                                type="number"
                                                value={height}
                                                onChange={(e) => {
                                                        setHeight(
                                                                Math.max(
                                                                        1,
                                                                        Number(e.target.value) || 1
                                                                )
                                                        );
                                                }}
                                                style={{ width: 70 }}
                                        />
                                </div>

                                <div style={{ display: 'flex', gap: 12 }}>
                                        <label
                                                style={{
                                                        display: 'flex',
                                                        gap: 4,
                                                        alignItems: 'center'
                                                }}
                                        >
                                                <input
                                                        type="radio"
                                                        checked={format === 'png'}
                                                        onChange={() => {
                                                                setFormat('png');
                                                        }}
                                                />
                                                PNG
                                        </label>
                                        <label
                                                style={{
                                                        display: 'flex',
                                                        gap: 4,
                                                        alignItems: 'center'
                                                }}
                                        >
                                                <input
                                                        type="radio"
                                                        checked={format === 'webp'}
                                                        onChange={() => {
                                                                setFormat('webp');
                                                        }}
                                                />
                                                WebP
                                        </label>
                                </div>

                                <button
                                        onClick={() => {
                                                void (async () => {
                                                        await handleExport();
                                                })();
                                        }}
                                        disabled={busy}
                                        style={{
                                                padding: '6px 10px',
                                                borderRadius: 6,
                                                border: 'none',
                                                background: busy ? '#555' : '#fff',
                                                color: busy ? '#ccc' : '#111',
                                                cursor: busy ? 'default' : 'pointer',
                                                fontWeight: 600
                                        }}
                                >
                                        {busy ? 'Exporting…' : `Export ${format.toUpperCase()}`}
                                </button>

                                {status && (
                                        <div style={{ opacity: 0.8, maxWidth: 220 }}>{status}</div>
                                )}
                        </div>
                </div>
        );
}

/**
 * Serializes each live <svg>, rasterizes them individually at the target
 * resolution, then composites them onto one canvas in DOM order (so a
 * base + hot layer stack ends up in the same relationship as on screen).
 */
async function exportSvgsAsImage(
        svgEls: SVGSVGElement[],
        opts: { width: number; height: number; format: 'png' | 'webp'; quality?: number }
): Promise<Blob> {
        const canvas = document.createElement('canvas');
        canvas.width = opts.width;
        canvas.height = opts.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('2D context unavailable');

        for (const svgEl of svgEls) {
                const img = await rasterizeOneSvg(svgEl, opts.width, opts.height);
                ctx.drawImage(img, 0, 0, opts.width, opts.height);
        }

        const mime = opts.format === 'webp' ? 'image/webp' : 'image/png';
        return new Promise<Blob>((resolve, reject) => {
                const bloblCallback = (blob: Blob | null) => {
                        if (blob) {
                                resolve(blob);
                        } else {
                                reject(new Error('canvas.toBlob returned null'));
                        }
                };
                canvas.toBlob(bloblCallback, mime, opts.quality ?? 0.95);
        });
}

function rasterizeOneSvg(
        svgEl: SVGSVGElement,
        width: number,
        height: number
): Promise<HTMLImageElement> {
        const clone = svgEl.cloneNode(true) as SVGSVGElement;

        // Force explicit pixel dimensions so the raster comes out at the
        // requested export size, regardless of how the live SVG is laid out
        // (e.g. width/height: 100% inside a fixed fullscreen wrapper).
        clone.setAttribute('width', String(width));
        clone.setAttribute('height', String(height));
        if (!clone.getAttribute('xmlns')) {
                clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        }
        if (!clone.getAttribute('viewBox')) {
                const rect = svgEl.getBoundingClientRect();
                const vbWidth = rect.width || width;
                const vbHeight = rect.height || height;
                clone.setAttribute('viewBox', `0 0 ${vbWidth} ${vbHeight}`);
        }

        const svgString = new XMLSerializer().serializeToString(clone);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                        URL.revokeObjectURL(url);
                        resolve(img);
                };
                img.onerror = (e) => {
                        URL.revokeObjectURL(url);
                        reject(new Error('Failed to load rasterized SVG image', { cause: e }));
                };
                img.src = url;
        });
}

function downloadBlob(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
}

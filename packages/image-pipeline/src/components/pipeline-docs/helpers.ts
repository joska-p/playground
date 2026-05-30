import jcJpg from "../../assets/jc.jpg";

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

async function loadDemoImage(size: number): Promise<ImageData> {
  try {
    const img = await loadImage(jcJpg);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, size, size);
    return ctx.getImageData(0, 0, size, size);
  } catch {
    return generateTestImage(size);
  }
}

function generateTestImage(size: number): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  grad.addColorStop(0, "#ff6b6b");
  grad.addColorStop(0.2, "#feca57");
  grad.addColorStop(0.4, "#48dbfb");
  grad.addColorStop(0.6, "#54a0ff");
  grad.addColorStop(0.8, "#5f27cd");
  grad.addColorStop(1, "#222");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${size * 0.22}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("p5", cx, cy - size * 0.12);
  ctx.fillText("js", cx, cy + size * 0.12);

  ctx.strokeStyle = "rgba(255,255,255,0.5)";
  ctx.lineWidth = 3;
  ctx.strokeRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const x1 = cx;
    const y1 = cy;
    const x2 = cx + Math.cos(angle) * r * 0.9;
    const y2 = cy + Math.sin(angle) * r * 0.9;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `hsla(${i * 60}, 80%, 60%, 0.3)`;
    ctx.stroke();
  }

  return ctx.getImageData(0, 0, size, size);
}

function imageDataToUrl(img: ImageData): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

export { generateTestImage, imageDataToUrl, loadDemoImage };

import { geant } from './geant';

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = url;
  });
}

async function loadDemoImage(size: number) {
  try {
    const image = await loadImage(geant);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('No context');
    context.drawImage(image, 0, 0, size, size);
    return context.getImageData(0, 0, size, size);
  } catch {
    return generateTestImage(size);
  }
}

function generateTestImage(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (context) {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;

    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(0.2, '#feca57');
    gradient.addColorStop(0.4, '#48dbfb');
    gradient.addColorStop(0.6, '#54a0ff');
    gradient.addColorStop(0.8, '#5f27cd');
    gradient.addColorStop(1, '#222');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    context.fillStyle = '#ffffff';
    context.font = `bold ${String(size * 0.22)}px sans-serif`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('p5', centerX, centerY - size * 0.12);
    context.fillText('js', centerX, centerY + size * 0.12);

    context.strokeStyle = 'rgba(255,255,255,0.5)';
    context.lineWidth = 3;
    context.strokeRect(size * 0.1, size * 0.1, size * 0.8, size * 0.8);

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x1 = centerX;
      const y1 = centerY;
      const x2 = centerX + Math.cos(angle) * radius * 0.9;
      const y2 = centerY + Math.sin(angle) * radius * 0.9;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = `hsla(${String(i * 60)}, 80%, 60%, 0.3)`;
      context.stroke();
    }

    return context.getImageData(0, 0, size, size);
  }
  return null;
}

function imageDataToUrl(imageData: ImageData) {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  const context = canvas.getContext('2d');
  if (context) {
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }
  return null;
}

export { imageDataToUrl, loadDemoImage };

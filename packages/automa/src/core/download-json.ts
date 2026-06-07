import { JSON_INDENT, MIME_TYPE_JSON } from '../config.ts';

const downloadJson = (data: unknown, filename: string): void => {
  const json = JSON.stringify(data, null, JSON_INDENT);
  const blob = new Blob([json], { type: MIME_TYPE_JSON });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export { downloadJson };

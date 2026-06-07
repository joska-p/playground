const MAX_JSON_SIZE = 5 * 1024 * 1024;

const readJsonFile = (file: File): Promise<unknown> =>
  new Promise((resolve, reject) => {
    if (file.size > MAX_JSON_SIZE) {
      reject(new Error('File too large (max 5MB)'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(JSON.parse(reader.result as string));
      } catch {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });

export { readJsonFile };

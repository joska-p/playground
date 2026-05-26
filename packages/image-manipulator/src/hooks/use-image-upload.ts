import { useState } from "react";

type UseImageUploadReturn = [string | null, (event: React.ChangeEvent<HTMLInputElement>) => void];

function useImageUpload(): UseImageUploadReturn {
  const [imageFile, setImageFile] = useState<string | null>(null);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageFile(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  return [imageFile, handleImageUpload];
}

export { useImageUpload };

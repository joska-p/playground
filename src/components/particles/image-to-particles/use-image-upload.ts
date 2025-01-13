import { useState } from "react";

function useImageUpload() {
  const [imageFile, setImageFile] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFile(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return [imageFile, handleImageUpload] as const;
}

export { useImageUpload };

import { setManipulatorImageFile } from "../store/manipulatorStore";

type UseImageUploadReturn = {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function useImageUpload(): UseImageUploadReturn {
  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setManipulatorImageFile(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  return { handleImageUpload };
}

export { useImageUpload };

import { useCallback } from "react";

export const useImageFallback = () => {
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = "none";
    const placeholder = target.nextElementSibling as HTMLElement;
    if (placeholder) {
      placeholder.classList.remove("hidden");
    }
  }, []);

  return { handleImageError };
};
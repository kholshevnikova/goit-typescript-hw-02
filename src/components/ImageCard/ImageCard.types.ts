export interface ImageCardProps {
   urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  alt_description: string;
  onImageClick: (url: string, alt: string) => void;
}
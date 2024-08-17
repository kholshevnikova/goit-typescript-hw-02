import css from "./ImageCard.module.css";
import {ImageCardProps} from "./ImageCard.types";

export default function ImageCard({ urls, alt_description, onImageClick }: ImageCardProps) {
  return (
    <div>
      <img
        src={urls.small}
        alt={alt_description}
        className={css.img}
        onClick={() => onImageClick(urls.regular, alt_description)}
      />
    </div>
  );
}

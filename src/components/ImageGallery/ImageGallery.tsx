import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import {Image} from "../App/App.types";

interface Props {
  items: Image[];
  onImageClick: (url: string, alt: string) => void;
}

export default function ImageGallery({ items, onImageClick }: Props) {
  
  return (
    <ul className={css.list}>
      {items.map(({ id, urls, alt_description }) => (
        <li key={id} className={css.listItem}>
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            onImageClick={onImageClick}
          />
        </li>
      ))}
    </ul>
  );
}

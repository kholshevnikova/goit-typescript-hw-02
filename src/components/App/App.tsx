import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { ColorRing } from "react-loader-spinner";
import { getPhotos } from "../images-api";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "../ImageModal/ImageModal";
import { Image, PhotoResponse } from "./App.types";



export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [item, setItem] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [totalImages, setTotalImages] = useState<number>(0);
  const [urlModal, setUrlModal] = useState<string>("");
  const [altModal, setAltModal] = useState<string>("");

  const handleSearch = (topic: string): void => {
    setImages([]);
    setItem(topic);
    setPage(1);
  };

  const handleLoadMore = ():void => {
    // console.log("load more");
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (item === "") return;


    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const data: PhotoResponse = await getPhotos(item, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalImages(data.total);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [page, item]);

  const openModal = (url: string, alt: string) :void => {
    setIsOpen(true);
    setAltModal(alt);
    setUrlModal(url);
  };

  const closeModal = (): void => {
    setIsOpen(false);
    setAltModal("");
    setUrlModal("");
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={openModal} />
      )}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ColorRing />
        </div>
      )}
      <Toaster />
      {images.length > 0 && images.length < totalImages && (
        <LoadMoreBtn onClick={handleLoadMore}/>
      )}
      <ImageModal
        modalIsOpen={isOpen}
        closeModal={closeModal}
        url={urlModal}
        alt={altModal}
      />
    </div>
  );
}

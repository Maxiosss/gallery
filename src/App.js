import { useState, useEffect, useCallback, useRef } from "react";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import fetchImages from "./services/api";
import Button from "./components/Button";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const buttonRef = useRef(null);

  const handleScrollToBottom = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setIsLoading(true);
      const newImages = await fetchImages(query, page);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setIsLoading(false);
    };
    fetchData();
  }, [query, page]);

  const handleFormSubmit = useCallback((newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  }, []);

  const handleImageClick = useCallback((largeImageURL) => {
    setSelectedImage(largeImageURL);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) handleScrollToBottom();
  }, [images, page]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={handleLoadMore} ref={buttonRef} />
      )}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={closeModal} />}
    </div>
  );
}

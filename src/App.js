import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import Button from "./components/Button";
import { useImageSearch } from "./hooks/useImageSearch";
import "./App.css";

export default function App() {
  const {
    images,
    isLoading,
    selectedImage,
    error,
    setQuery,
    loadMore,
    selectImage,
    closeModal,
    buttonRef,
  } = useImageSearch();

  return (
    <div className="App">
      <Searchbar onSubmit={setQuery} />
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ImageGallery images={images} onImageClick={selectImage} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <Button onClick={loadMore} ref={buttonRef} />
      )}
      {selectedImage && (
        <Modal largeImageURL={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}

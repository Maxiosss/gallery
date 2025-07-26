import { useState, useEffect, useCallback, useRef } from "react";
import fetchImages from "../services/api";

export function useImageSearch() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const buttonRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const newImages = await fetchImages(query, page);
        setImages((prev) => (page === 1 ? newImages : [...prev, ...newImages]));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const scrollToButton = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (page > 1) scrollToButton();
  }, [images.length, page, scrollToButton]);

  const onSetQuery = useCallback(
    (newQuery) => {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
      setError(null);
    },
    []
  );

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const selectImage = useCallback((url) => {
    setSelectedImage(url);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return {
    query,
    images,
    isLoading,
    error,
    selectedImage,
    buttonRef,
    setQuery: onSetQuery,
    loadMore,
    selectImage,
    closeModal,
  };
}
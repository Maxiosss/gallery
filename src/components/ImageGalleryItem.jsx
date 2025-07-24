import { useMemo } from "react";

export default function ImageGalleryItem({ smallUrl, largeUrl, onClick }) {
  const handleClick = useMemo(
    () => () => onClick(largeUrl),
    [largeUrl, onClick]
  );

  return (
    <li className="gallery-item">
      <img
        src={smallUrl}
        alt="preview"
        onClick={handleClick}
        className="gallery-image"
      />
    </li>
  );
}
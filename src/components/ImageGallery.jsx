import { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;
    return (
      <ul className="ImageGallery ">
        {images.map((image) => (
          <ImageGalleryItem
            key={image.id}
            smallUrl={image.webformatURL}
            largeUrl={image.largeImageURL}
            onClick={onImageClick}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;

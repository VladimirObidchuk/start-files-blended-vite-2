import { useEffect, useState } from 'react';

import Form from '../components/Form/Form';
import Text from '../components/Text/Text';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery.jsx';
import Loader from '../components/Loader/Loader.jsx';
import { getPhotos } from '../apiService/photos.js';
import Button from '../components/Button/Button.jsx';
import { ImageModal } from '../components/ImageModal/ImageModak.jsx';

const Photos = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const data = await getPhotos(query, page);
        console.log(' data', data);
        if (!data.photos.length) {
          return setIsEmpty(true);
        }
        setImages(prevImage => [...prevImage, ...data.photos]);
        setIsVisible(page < Math.ceil(data.total_results / data.per_page));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit = value => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openMadal = (src, alt) => {
    setIsOpen(true);
    setModalSrc(src);
    setModalAlt(alt);
  };
  const closeMadal = () => {
    setIsOpen(false);
    setModalSrc('');
    setModalAlt('');
  };

  return (
    <>
      <Form onSubmit={onHandleSubmit} />
      {images.length > 0 && (
        <PhotosGallery images={images} openModal={openMadal} />
      )}
      {isVisible && (
        <Button onClick={onLoadMore} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </Button>
      )}
      {!images.length && !isEmpty && (
        <Text textAlign="center">Let`s begin search 🔎</Text>
      )}

      {isLoading && <Loader />}

      {error && <Text textAlign="center">Somseing wrong</Text>}
      {isEmpty && <Text textAlign="center">Sorry. There are is</Text>}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeMadal}
        src={modalSrc}
        alt={modalAlt}
      />
    </>
  );
};

export default Photos;

import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImage } from '../Api/Api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [loade, setLoade] = useState(false);
  const [page, setPage] = useState(0);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (page === 0 || !name) {
      return;
    }
    setLoade(true);

    async function fatch() {
      try {
        const { hits } = await getImage(name, page);
        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        }));
        setImages(images => [...images, ...data]);
        setLoade(false);
      } catch (error) {
        console.log(error)
        setLoade(false);
        setError(error);
      }
    }

    fatch();
  }, [name, page]);

  const onSearch = searchName => {
    //перевірка на однаковий пошук
    if (searchName !== name) {
      setName(searchName);
      setPage(1);
      setImages([]);
    }
  };

  const openModal = (src, alt) => {
    setSrc(src);
    setAlt(alt);
  };

  return (
    <div className="App">
      <Searchbar onSearch={onSearch} onChange={setSearch} search={search} />
      {images.length > 0 && <ImageGallery images={images} click={openModal} />}
      {loade && <Loader />}
      {images.length > 0 && (
        <Button onClick={() => setPage(page => page + 1)} />
      )}
      {src && <Modal close={() => setSrc('')} src={src} alt={alt} />}
      {error && <p>{error.message}</p>}
    </div>
  );
}

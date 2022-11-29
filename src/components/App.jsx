import { React, Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { getImage } from '../Api/Api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

// import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    images: [],
    loade: false,
    page: 1,
    name: '',
    search: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      getImage(this.state.name, this.state.page)
        .then(({ hits }) => {
          const data = hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
          this.setState(state => ({
            images: [...state.images, ...data],
            loade: false,
          }));
        })
        .catch(console.error);
    }
  }

  onSearch = name => {
    //перевірка на однаковий пошук
    if (name!==this.state.name)
      this.setState(state => ({
        images: [],
        loade: true,
        page: 1,
        name: state.search,
      }));
  };

  onChangeSearch = search => {
    this.setState({
      search,
    });
  };

  loadeMore = () => {
    this.setState(state => ({
      loade: true,
      page: state.page + 1,
    }));
  };

  openModal = (src, alt) => {
    this.setState({
      src,
      alt,
    });
  };

  closeModal = () => {
    this.setState({
      src: '',
      alt: '',
    });
  };

  render() {
    const { search, images, loade, src, alt } = this.state;
    return (
      <div className="App">
        <Searchbar
          onSearch={this.onSearch}
          onChange={this.onChangeSearch}
          search={search}
        />
        {images.length > 0 && (
          <ImageGallery images={images} click={this.openModal} />
        )}
        {loade && <Loader />}
        {images.length > 0 && <Button onClick={this.loadeMore} />}
        {src && <Modal close={this.closeModal} src={src} alt={alt} />}
      </div>
    );
  }
}

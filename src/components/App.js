import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Notification from './Notification';
import Spinner from './Spinner';
import Button from './Button';
import Modal from './Modal';
import imagesApi from '../services/imagesApi';

export default class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    loading: false,
    error: null,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    imagesApi
      .fetchImagesWithQuery(searchQuery, page)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ loading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleSearchFormSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  showModal = imageScr => {
    this.setState({ largeImageURL: imageScr });
  };

  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { images, error, loading, largeImageURL } = this.state;
    return (
      <>
        <div className="App">
          <Searchbar onSubmit={this.handleSearchFormSubmit} />

          {error && (
            <Notification
              message={`Oops, something went wrong: ${error.message}`}
            />
          )}

          {images.length > 0 && (
            <ImageGallery images={images} onClick={this.showModal} />
          )}
          {loading && <Spinner />}

          {images.length > 0 && !loading && (
            <Button onClick={this.fetchImages} />
          )}
        </div>

        {largeImageURL.length > 0 && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

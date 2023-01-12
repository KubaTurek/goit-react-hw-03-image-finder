import css from './App.module.css';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import axios from 'axios';

class App extends Component {
  state = {
    images: [],
    page: 1,
    searchedWord: '',
    isLoading: false,
    largeImageUrl: '',
    loadMore: true,
  };

  fetchApi = async (searchedWord, page) => {
    this.setState({
      isLoading: true,
    });

    const newUrl =
      'https://pixabay.com/api/?q=' +
      searchedWord +
      '&page=' +
      page +
      '&key=31180890-6e7b1107714fce14b72fdcb4e&image_type=photo&orientation=horizontal&per_page=12';

    try {
      const response = await axios.get(newUrl);
      return response.data.hits;
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onSubmit = async event => {
    event.preventDefault();

    const enterredValue = event.target.input.value;

    if (enterredValue === '') {
      this.setState({
        isLoading: false,
      });

      alert('You need to insert something');
      return;
    }
    event.target.input.value = '';

    const results = await this.fetchApi(enterredValue, 1);

    if (results.length === 0) {
      this.setState({
        isLoading: false,
      });
      alert('There are no results, try with a different searchword');
      return;
    }
    this.setState({
      searchedWord: enterredValue,
      page: 1,
      isLoading: false,
      images: results,
    });
  };

  showGallery = url => {
    this.setState(
      {
        largeImageUrl: url,
      },
      () => {
        window.addEventListener('keydown', event => {
          if (event.key === 'Escape') {
            this.setState({
              largeImageUrl: '',
            });
          }
        });
      }
    );
  };

  hideGallery = event => {
    if (event.target.nodeName === 'DIV') {
      this.setState({
        largeImageUrl: '',
      });
    }
  };

  handleLoadMore = async () => {
    const results = await this.fetchApi(
      this.state.searchedWord,
      this.state.page + 1
    );

    if (results.length < 12) {
      this.setState({
        loadMore: false,
      });
    }

    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        images: [...prevState.images, ...results],
      };
    });
  };

  render() {
    const images = this.state.images;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          <ImageGalleryItem images={images} handleClick={this.showGallery} />
        </ImageGallery>
        {this.state.images.length > 0 && this.state.loadMore === true && (
          <Button handleClick={this.handleLoadMore} />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.largeImageUrl && (
          <Modal onClose={this.hideGallery} url={this.state.largeImageUrl} />
        )}
      </div>
    );
  }
}

export default App;

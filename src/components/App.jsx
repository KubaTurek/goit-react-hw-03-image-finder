import css from './App.module.css';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const DEFAULT_URL =
  '/?q=cat&page=1&key=31180890-6e7b1107714fce14b72fdcb4e&image_type=photo&orientation=horizontal&per_page=12';

class App extends Component {
  state = {
    images: [],
    url: DEFAULT_URL,
    page: 1,
    searchedWord: 'cat',
    isLoading: false,
    largeImageUrl: '',
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const response = await axios.get(this.state.url);
    this.setState({
      images: response.data.hits,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 400);
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true,
    });
    const enterredValue = event.target.input.value;

    if (enterredValue === '') {
      this.setState({
        isLoading: false,
      });

      alert('You need to insert something');
      return;
    }
    event.target.input.value = '';

    const newUrl =
      'https://pixabay.com/api/?q=' +
      enterredValue +
      '&page=' +
      1 +
      '&key=31180890-6e7b1107714fce14b72fdcb4e&image_type=photo&orientation=horizontal&per_page=12';
    const response = await axios.get(newUrl);

    if (response.data.hits.length === 0) {
      this.setState({
        isLoading: false,
      });
      alert('There are no results, try with a different searchword');
      return;
    }
    this.setState({
      url: newUrl,
      searchedWord: enterredValue,
      page: 1,
    });

    setTimeout(() => {
      this.setState({
        isLoading: false,
        images: response.data.hits,
      });
    }, 400);
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
    this.setState({
      isLoading: true,
    });
    const url =
      'https://pixabay.com/api/?q=' +
      this.state.searchedWord +
      '&page=' +
      [this.state.page + 1] +
      '&key=31180890-6e7b1107714fce14b72fdcb4e&image_type=photo&orientation=horizontal&per_page=12';
    const response = await axios.get(url);

    setTimeout(() => {
      this.setState(prevState => {
        return {
          page: prevState.page + 1,
          images: [...prevState.images, ...response.data.hits],
          isLoading: false,
        };
      });
    }, 400);
  };

  render() {
    const images = this.state.images;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery>
          <ImageGalleryItem images={images} handleClick={this.showGallery} />
        </ImageGallery>
        {this.state.images.length > 0 && (
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

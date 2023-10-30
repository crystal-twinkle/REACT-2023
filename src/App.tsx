import React from 'react';
import './assets/App.css';
import Search from './components/Search';
import PostList from './components/PostList';
import { IPost } from './components/models';
import PokemonApi from './API/api';
import Loading from './components/Loading';

class App extends React.Component {
  state = {
    data: [],
    newData: [],
    isLoading: false,
    query: localStorage.getItem('search') || '',
    isError: false,
  };

  inputSearch = (query?: string) => {
    this.setState({ query });
    const searchString = localStorage.getItem('search');
    this.setState({ isLoading: false });
    searchString
      ? PokemonApi.getByName(searchString.toLowerCase())
          .then((data) => {
            const newArr: IPost[] = [];
            newArr.push(data);
            this.setState({ newData: newArr });
          })
          .catch(() => this.setState({ newData: [] }))
      : this.setState({ newData: this.state.data });
    this.setState({ isLoading: true });
  };

  componentDidMount() {
    this.setState({ isLoading: false });
    PokemonApi.getALL().then((data: IPost[]) => {
      this.setState({ data });
      if (localStorage.getItem('search')) {
        this.inputSearch();
      } else {
        this.setState({ newData: data });
      }
      this.setState({ isLoading: true });
    });
  }

  errorClick = () => {
    this.setState({ isError: true });
  };

  render() {
    const { newData, isLoading, isError } = this.state;
    if (isError) {
      throw new Error('Test error');
    }
    return (
      <div className="app">
        <button className="error-btn" onClick={this.errorClick}>
          Generate Error
        </button>
        <Search title="Write something" inputSearch={this.inputSearch} />
        {isLoading ? (
          <PostList posts={newData} title="You List" />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default App;

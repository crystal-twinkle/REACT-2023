import React, { FormEvent } from 'react';

interface SearchProps {
  title: string;
  inputSearch: (arg: string) => void;
}

interface SearchState {
  inputValue: string | null;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('search') || '',
    };
  }

  componentDidMount() {
    this.setState({ inputValue: localStorage.getItem('search') });
  }

  inputHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;
    localStorage.setItem('search', query);
    this.setState({ inputValue: query });
  };

  searchClick = (): void => {
    const query = this.state.inputValue;
    if (query != null) {
      this.props.inputSearch(query);
    }
  };

  render() {
    const { title } = this.props;
    const { inputValue } = this.state;

    return (
      <form
        className="search-form"
        onSubmit={(event: FormEvent) => event.preventDefault()}
      >
        <span style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {' '}
          {title}
        </span>
        <input
          className="input"
          type="text"
          placeholder=""
          onChange={this.inputHandler}
          value={inputValue || ''}
        />
        <button type="submit" className="search-btn" onClick={this.searchClick}>
          search
        </button>
      </form>
    );
  }
}

export default Search;

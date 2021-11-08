import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookCard from "./Book";

class SearchPage extends Component {
  state = {
    searchResults: [],
    textSearch: "",
  };

  handleChange = (event) => {
    this.setState({ textSearch: event.target.value });
    console.log(this.state.textSearch);
    BooksAPI.search(event.target.value).then((books) => {
      console.log(books);
      books.error
        ? this.setState({ searchResults: [] })
        : this.setState({ searchResults: books });
    });
  };
  resetSearch = () => {
    this.setState({ searchResults: [] });
  };
  render() {
    const { books, onUpdateShelf } = this.props;
    console.log(this.state.searchResults);
    console.log(books);
    this.state.searchResults.forEach(function(searchedBook) {
      books.map((book) => {
        if (book.id === searchedBook.id) {
          searchedBook.shelf = book.shelf;
        }
      });
      if (!searchedBook.shelf) {
        searchedBook.shelf = "none";
      }
    });
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={this.resetSearch}>
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.textSearch}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchResults.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onUpdateShelf={onUpdateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;

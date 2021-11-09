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
    const query = event.target.value;
    this.setState({ textSearch: query });

    query.length > 0
      ? BooksAPI.search(query).then((books) => {
          console.log("books", books);
          books.error
            ? this.setState({ searchResults: [] })
            : this.setState({ searchResults: books });
        })
      : this.setState({ searchResults: [] });
  };
  resetSearch = () => {
    this.setState({ searchResults: [] });
  };

  render() {
    const { books, onUpdateShelf } = this.props;
    console.log("search results", this.state.searchResults);
    this.state.searchResults.forEach(function(searchedBook) {
      books.forEach((book) =>
        book.id === searchedBook.id ? (searchedBook.shelf = book.shelf) : ""
      );
      return !searchedBook.shelf ? (searchedBook.shelf = "none") : "";
    });
    console.log("searchpage: ", this.state.searchResults);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.resetSearch}>
            Close
          </button>
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

import React, { Component } from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    const { books, shelves, onUpdateShelf } = this.props;
    function filterBook(shelf) {
      return books.filter((book) => book.shelf === shelf.key);
    }
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {shelves.map((shelf) => (
            <Shelf
              key={shelf.key}
              books={filterBook(shelf)}
              shelf={shelf}
              onUpdateShelf={onUpdateShelf}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}
export default HomePage;

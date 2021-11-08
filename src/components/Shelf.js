import React, { Component } from "react";
import BookCard from "./Book";

class Shelf extends Component {
  render() {
    const { books, shelf, onUpdateShelf } = this.props;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf.name}</h2>
        </div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
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
export default Shelf;

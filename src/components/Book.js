import React, { Component } from "react";
import BookShelfChanger from "./BookShelfChanger";

class BookCard extends Component {
  render() {
    const { book, onUpdateShelf } = this.props;
    console.log(book);
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks && book.imageLinks.thumbnail
                })`,
              }}
            />
            <BookShelfChanger onUpdateShelf={onUpdateShelf} book={book} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.join(", ")}
          </div>
        </div>
      </li>
    );
  }
}
export default BookCard;

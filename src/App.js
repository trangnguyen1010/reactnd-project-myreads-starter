import React from "react";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./components/SearchPage";
import HomePage from "./components/HomePage";

class App extends React.Component {
  state = {
    books: [],
  };

  shelves = [
    { key: "currentlyReading", name: "Currently Reading" },
    { key: "wantToRead", name: "Want to Read" },
    { key: "read", name: "Read" },
  ];

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateShelf = (book, shelf) => {
    this.updateBookShelf(book, shelf);
    BooksAPI.update(book, shelf);
  };

  updateBookShelf(book, shelf) {
    let books = this.state.books;
    books.forEach((curBook) => {
      if (curBook.id === book.id) {
        curBook.shelf = shelf;
      }
    });
    this.setState({ books: books });
  }

  render() {
    const { books } = this.state;
    console.log("App page");
    console.log({ books });
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route
              exact
              path="/"
              element={() => (
                <HomePage
                  books={books}
                  shelves={this.shelves}
                  onUpdateShelf={this.updateShelf}
                />
              )}
            />
            <Route
              path="/search"
              element={() => (
                <SearchPage
                  books={books}
                  shelves={this.shelves}
                  onUpdateShelf={this.updateShelf}
                />
              )}
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

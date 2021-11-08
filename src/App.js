import React from "react";
import "./App.css";
import {
  Route,
  Routes,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
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

  UpdateShelf = (book, shelf) => {
    this.updateBookShelf(book, shelf);
    BooksAPI.update(book, shelf).then((books) => {
      book.shelf === "none" &&
        shelf !== "none" &&
        this.setState((curState) => ({ books: curState.books.concat(book) }));
      console.log("book has been updated");
    });
  };

  updateBookShelf(book, shelf) {
    let books = this.state.books;
    books.map((curBook) =>
      curBook.id === book.id ? (curBook.shelf = shelf) : curBook
    );
    this.setState({ books: books });
    shelf === "none" &&
      this.setState((curState) => {
        const newBook = curState.books.filter(
          (deletedBook) => deletedBook.id !== book.id
        );
        return { books: newBook };
      });
  }

  render() {
    const { books } = this.state;
    console.log("App page", books);
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route
              path="/search"
              component={() => (
                <SearchPage
                  books={books}
                  shelves={this.shelves}
                  onUpdateShelf={this.UpdateShelf}
                />
              )}
            />
            <Route
              exact
              path="/"
              component={() => (
                <HomePage
                  books={books}
                  shelves={this.shelves}
                  onUpdateShelf={this.UpdateShelf}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import React, { ReactElement } from "react";

import Search from "./components/Search";
import List from "./components/List";
import * as api from "./BooksAPI";
import * as conf from "./conf";
import { BookData, BookRef } from "./model/Book";

function App(): ReactElement {
  const initialBooks = [] as BookData[];
  const [books, setBooks] = useState(initialBooks);

  useEffect(() => {
    api
      .getAll()
      .then((res) => (res.length > 1 ? setBooks(res) : setBooks([])))
      .catch(() => setBooks([]));
  }, []);

  const updateBook = async (book: BookData | BookRef): Promise<void> => {
    const existingBook = books.find((b) => b.id === book.id);
    try {
      if (existingBook) {
        const shelf = existingBook.shelf;
        if (shelf === book.shelf) {
          //No change
          console.log("Target and origin are the same", book);
          return;
        } else if (shelf === "none") {
          //Remove
          await api.update(book, book.shelf);
          setBooks(books.filter((b) => b.id !== existingBook.id));
        } else {
          //Change
          await api.update(book, book.shelf);
          Object.assign(existingBook, book);
          setBooks([...books]);
        }
      } else {
        await api.update(book, book.shelf);
        setBooks([...books, book] as BookData[]);
      }
    } catch (e) {
      console.log("Error updating book:", e);
    }
  };

  const ListInstance: ReactElement = (
    <List onUpdateBook={updateBook} books={books} />
  );
  const SearchInstance: ReactElement = (
    <Search onUpdateBook={updateBook} books={books} />
  );

  return (
    <Routes>
      <Route path={conf.PATHS.list} element={ListInstance} />
      <Route path={conf.PATHS.search} element={SearchInstance} />
    </Routes>
  );
}

export default App;

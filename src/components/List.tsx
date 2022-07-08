import Bookshelf from "./Bookshelf";
import * as conf from "../conf";

import { Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BookData, BookRef } from "../model/Book";
import { ReactElement } from "react";
import React from "react";

type ListProps = {
  books: BookData[];
  onUpdateBook: (book: BookData | BookRef) => void;
};

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function List({
  onUpdateBook,
  books,
}: ListProps): ReactElement<ListProps> {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <DndProvider backend={HTML5Backend}>
          <div>
            <Bookshelf
              id={"currentlyReading"}
              title={conf.shelves.currentlyReading}
              books={books.filter((book) => book.shelf === "currentlyReading")}
              onUpdateBook={onUpdateBook}
            />
            <Bookshelf
              id={"wantToRead"}
              title={conf.shelves.wantToRead}
              books={books.filter((book) => book.shelf === "wantToRead")}
              onUpdateBook={onUpdateBook}
            />
            <Bookshelf
              id={"read"}
              title={conf.shelves.read}
              books={books.filter((book) => book.shelf === "read")}
              onUpdateBook={onUpdateBook}
            />
          </div>
        </DndProvider>
      </div>
      <div className="open-search">
        <Link to={conf.PATHS.search}>Add a book</Link>
      </div>
    </div>
  );
}

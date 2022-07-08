import React, { ReactElement } from "react";
import { BookData, BookRef } from "../model/Book";
import Book from "./Book";

type BookgridProps = {
  className?: string;
  books: BookData[];
  onUpdateBook: (book: BookData | BookRef) => void;
};

export default function Bookgrid({
  books = [],
  onUpdateBook,
  className = "bookshelf-books",
}: BookgridProps): ReactElement<BookgridProps> {
  return (
    <div className={className}>
      <ol className="books-grid">
        {books.map((book) => {
          return (
            <li key={book.id}>
              <Book book={book} onUpdateBook={onUpdateBook} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

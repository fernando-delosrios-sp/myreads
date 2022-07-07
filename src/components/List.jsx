import Bookshelf from "./Bookshelf";
import * as conf from "../conf";

import { Link } from "react-router-dom";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function List({ onUpdateBook, books }) {
	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					<Bookshelf
						title={conf.shelves.currentlyReading}
						books={books.filter((book) => book.shelf === "currentlyReading")}
						onUpdateBook={onUpdateBook}
					/>
					<Bookshelf
						title={conf.shelves.wantToRead}
						books={books.filter((book) => book.shelf === "wantToRead")}
						onUpdateBook={onUpdateBook}
					/>
					<Bookshelf
						title={conf.shelves.read}
						books={books.filter((book) => book.shelf === "read")}
						onUpdateBook={onUpdateBook}
					/>
				</div>
			</div>
			<div className="open-search">
				<Link to={conf.PATHS.search}>Add a book</Link>
			</div>
		</div>
	);
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Bookgrid from "./Bookgrid";
import * as api from "../BooksAPI";
import * as conf from "../conf";

export default function Search({ onUpdateBook, books }) {
	const SEARCH_INPUT = "search-input";
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);

	const updateBookshelf = (book) => {
		const existingBook = books.find((b) => b.id === book.id);
		return {
			...book,
			shelf: existingBook ? existingBook.shelf : "none",
		};
	};

	const handleOnChange = (e) => {
		const term = e.target.value.trim();
		setSearch(e.target.value);
		if (term.length > 0) {
			api
				.search(term, conf.MAX_RESULTS)
				.then((res) => (res.length > 1 ? setResults(res) : setResults([])))
				.catch((e) => setResults([]));
		} else {
			setResults([]);
		}
	};

	const handleOnEsc = (event) => {
		if (event.key === "Escape") navigate(conf.PATHS.list);
	};

	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link className="close-search" to={conf.PATHS.list}>
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						id={SEARCH_INPUT}
						autoFocus={true}
						type="text"
						placeholder="Search by title, author, or ISBN"
						value={search}
						onChange={handleOnChange}
						onKeyUp={handleOnEsc}
					/>
				</div>
			</div>
			<Bookgrid
				className="search-books-results"
				books={results.map(updateBookshelf)}
				onUpdateBook={onUpdateBook}
			/>
			{/* {console.log(results)} */}
		</div>
	);
}

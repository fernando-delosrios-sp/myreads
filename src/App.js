import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";


import Search from "./components/Search";
import List from "./components/List";
import * as api from "./BooksAPI";
import * as conf from "./conf";

function App() {
	const initialBooks = [];
	const [books, setBooks] = useState(initialBooks);

	useEffect(() => {
		api
			.getAll()
			.then((res) => (res.length > 1 ? setBooks(res) : setBooks([])))
			.catch((e) => setBooks([]));
	}, []);

	const updateBook = async (book) => {
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
				setBooks([...books, book]);
			}
		} catch (e) {
			console.log("Error updating book:", e);
		}
	};

	const ListInstance = <List onUpdateBook={updateBook} books={books} />;
	const SearchInstance = <Search onUpdateBook={updateBook} books={books} />;

	return (
		<Routes>
			<Route exact path={conf.PATHS.list} element={ListInstance} />
			<Route exact path={conf.PATHS.search} element={SearchInstance} />
		</Routes>
	);
}

export default App;

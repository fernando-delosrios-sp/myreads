import Book from "./Book";

export default function Bookgrid({ books = [], onUpdateBook }) {
	return (
		<div className="bookshelf-books">
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

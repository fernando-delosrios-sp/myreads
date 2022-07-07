import Bookgrid from "./Bookgrid";

export default function Bookshelf({ title, books, onUpdateBook }) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<Bookgrid onUpdateBook={onUpdateBook} books={books} />
		</div>
	);
}

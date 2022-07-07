import { useState } from "react";
import { useDrag } from "react-dnd";
import * as conf from "../conf";

export default function Book({ book, onUpdateBook }) {
	const bookCover =
		book.imageLinks && book.imageLinks.thumbnail
			? book.imageLinks.thumbnail
			: conf.DEFAULT_BOOK_COVER;
	const [shelf, setShelf] = useState(book.shelf);
	const handleChangeshelf = (b, shelf) => {
		const updatedBook = { ...b, shelf };
		setShelf(shelf);
		onUpdateBook(updatedBook);
	};

	const [{ isDragging }, drag] = useDrag(() => ({
		type: conf.DND.type,
		item: { title: book.title, id: book.id, shelf: book.shelf },
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				if (item.shelf !== dropResult.id) {
					handleChangeshelf(item, dropResult.id);
				}
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}));
	const opacity = isDragging ? 0.4 : 1;
	return (
		<div ref={drag} className="book" style={{ opacity }}>
			<div className="book-top">
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage: `url("${bookCover}")`,
					}}
				></div>
				<div className="book-shelf-changer">
					<select
						onChange={(e) => handleChangeshelf(book, e.target.value)}
						defaultValue={shelf}
					>
						<option value="move" disabled>
							Move to...
						</option>
						{Object.keys(conf.shelves).map((s) => {
							return (
								<option key={s} value={s}>
									{conf.shelves[s]}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">
				{book.authors && (
					<ul>
						{book.authors.map((author) => (
							<li key={author}>{author}</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

import Bookgrid from "./Bookgrid";
import { useDrop } from "react-dnd";
import * as conf from "../conf";

export default function Bookshelf({ id, title, books, onUpdateBook }) {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: conf.DND.type,
		drop: () => ({ id }),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));
	const isActive = canDrop && isOver;
	return (
		<div id={id} ref={drop} className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className={isActive ? "active" : "inactive"}>
				<Bookgrid onUpdateBook={onUpdateBook} books={books} />
			</div>
		</div>
	);
}

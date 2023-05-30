const GRIDSIZE = 4;
const CELLSIZE = 15;
const CELLGAP = 0.5;

export default class Grid {
	#cells;
	constructor (grid) {
		grid?.style.setProperty("--grid-size", `${GRIDSIZE}`);
		grid?.style.setProperty("--cell-size", `${CELLSIZE}vmin`);
		grid?.style.setProperty("--cell-gap", `${CELLGAP}vmin`);
		this.#cells = createCells(grid).map(
			(cellElement, index) =>
				new Cell(
					cellElement,
					index % GRIDSIZE,
					Math.floor(index / GRIDSIZE
					)
				));
	}

	get cellsByCol() {
		return this.#cells.reduce( (acc, c) => {
			acc[c.x] ||= [];
			acc[c.x][c.y] = c;
			return acc;
		}, [])
	}

	get cellsByRow() {
		return this.#cells.reduce( (acc, c) => {
			acc[c.y] ||= [];
			acc[c.y][c.x] = c;
			return acc;
		}, [])
	}

	get #emptyCells() {
		return this.#cells.filter(cell => cell.tile === null);
	}
	get cells() { return this.#cells;}

	randomEmptyCell() {
		const rand = Math.floor(Math.random() * this.#emptyCells.length);
		return this.#emptyCells[rand];
	}

}

class Cell {
	#cellEl;
	#tile;
	#mergeTile;
	#x;
	#y;
	constructor (cellEl, x, y) {
		this.#cellEl = cellEl;
		this.#x = x;
		this.#y = y;
		this.#tile = null;
	}

	get x() {
		return this.#x;
	}
	get y() {
		return this.#y;
	}
	get mergeTile() { return this.#mergeTile;}
	get tile() {
		return this.#tile;
	}

	set tile(value) {
		this.#tile = value;
		if (!value) return;
		this.#tile.x = this.#x;
		this.#tile.y = this.#y;
	}

	set mergeTile(value) {
		this.#mergeTile = value;
		if (!value) return;

		this.#mergeTile.x = this.#x;
		this.#mergeTile.y = this.#y;
	}

	canAccept(tile) {
		return (this.#tile === null || (this.#mergeTile == null && this.#tile.value === tile.value))
		//                                               ^ null && undefined check
	}

	mergeTiles() {
		if (!this.#tile || !this.#mergeTile) return;
		this.#tile.value += this.#mergeTile.value;
		this.#mergeTile.remove();
		this.#mergeTile = null;
	}
}


function createCells(gridElement) {
	const cells = [];
	for (let i = 0; i < GRIDSIZE*GRIDSIZE; i++){
		const c = document.createElement("div");
		c.classList.add("cell");
		cells.push(c);
		gridElement.append(c);
	}
	return cells;
}

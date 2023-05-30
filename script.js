import Grid from "./Grid.js";
import Tile from "./Tile.js";
import {canMove, slideTiles} from "./Handlers.js";

window.onload = () => {

const gameBoard = document.getElementById("game-board");
const grid = new Grid(gameBoard);

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

function setupInput() {
	window.addEventListener("keydown", handleInput, {once:true});
}

async function handleInput(e) {
	const colGrid = grid.cellsByCol;
	const revColGrid = grid.cellsByCol.map( col => [...col].reverse());
	const rowGrid = grid.cellsByRow;
	const revRowGrid = grid.cellsByRow.map( row => [...row].reverse())
	switch (e.key) {
		case "ArrowUp":
			if (!canMove(colGrid)) {
				setupInput();
				return;
			}
			await slideTiles(colGrid);
			break;
		case "ArrowDown":
			if (!canMove(revColGrid)) {
				setupInput();
				return;
			}
			await slideTiles(revColGrid);
			break;
		case "ArrowLeft":
			if (!canMove(rowGrid)) {
				setupInput();
				return;
			}
			await slideTiles(rowGrid);
			break;
		case "ArrowRight":
			if (!canMove(revRowGrid)) {
				setupInput();
				return;
			}
			await slideTiles(revRowGrid);
			break;
		default:
			setupInput();
			return;
	}

	// other game logic here;
	grid.cells.forEach( cell => cell.mergeTiles() )
	const newTile = new Tile(gameBoard);
	grid.randomEmptyCell().tile = newTile;

	if (!canMove(colGrid) && !canMove(revRowGrid) && !canMove(rowGrid) && !canMove(revRowGrid)) {
		newTile.waitForTransition(true).then( () => alert("Game Over!"))
		return;
	}
	setupInput();
}

}

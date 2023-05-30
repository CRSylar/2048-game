export function slideTiles(grid) {
	return Promise.all(

	grid.flatMap( (group) => {
		const promises = [];
		for (let i= 1; i < group.length; i++) {
			const cell = group[i];
			if (!cell.tile) continue;

			let lastValidTile;
			for (let j= i - 1; j >= 0; j--) {
				const moveToCell = group[j];
				if (!moveToCell.canAccept(cell.tile)) break;

				lastValidTile = moveToCell
			}
			if (lastValidTile) {
				promises.push(cell.tile.waitForTransition())
				if (lastValidTile.tile)
					lastValidTile.mergeTile = cell.tile;
				else
					lastValidTile.tile = cell.tile;
				cell.tile = null;
			}
		}
	return promises;
	}));
}

export function canMove( cells) {
	return cells.some( group =>
		group.some( (cell, i) => {
			if (i === 0) return false; // is this is the first element in a column cannot move ever
			if (cell.tile == null) return false; // cannot move an empty tile
			return group[i - 1].canAccept(cell.tile) // if the cell above this can accept a merge a move is allowed
		} ))
}

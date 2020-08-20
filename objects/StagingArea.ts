import { Tile } from './GameTiles';
import { Wall, WallRow } from './Wall';

class StagingArea {
	rows: Array<StagingAreaRow>;

	constructor() {
		this.rows = this.initializeRows();
	}

	initializeRows() {
		const rows = [];
		for (let i = 0; i < 5; i++) {
			rows.push(new StagingAreaRow(i + 1));
		}
		return rows;
	}

	// TODO: Capture invalid responses from StagingAreaRow
	add(rowIndex: number, tiles: Array<Tile>, wall: Wall) {
		this.rows[rowIndex].add(tiles, wall.rows[rowIndex]);
	}

	reset() {
		for (let row of this.rows) {
			row.reset();
		}
	}

}

class StagingAreaRow {
	tiles: Array<Tile>;
	maxLength: number;

	constructor(maxLength: number) {
		this.tiles = [];
		this.maxLength = maxLength;
	}

	add(tiles: Array<Tile>, wallRow: WallRow) {
		if (this.willOverflow(tiles)) {
			return 'ERROR: Overflow!'
		}
		if (this.doesNotMatch(tiles)) {
			return 'ERROR: Does not match!'
		}
		if (this.conflictsWithWall(tiles, wallRow)) {
			return 'ERROR: Conflicts with wall!'
		}

		this.tiles.push(...tiles);
	}

	doesNotMatch(newTiles: Array<Tile>) {
		if (this.tiles.length === 0) { return false; }
		return (newTiles[0].color !== this.tiles[0].color);
	}

	conflictsWithWall(newTiles: Array<Tile>, wallRow: WallRow) {
		const builtColors = wallRow.showBuiltTiles().map(tile => tile.color);
		return (builtColors.includes(newTiles[0].color));
	}

	willOverflow(newTiles: Array<Tile>) {
		return (this.tiles.length + newTiles.length > this.maxLength)
	}

	reset() {
		this.tiles = [];
	}

}

export { StagingAreaRow, StagingArea };
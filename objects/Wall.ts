const FIRST_ROW_PATTERN = ['blue', 'yellow', 'red', 'black', 'white'];

class Wall {
	rows: Array<WallRow>;

	constructor() {
		this.rows = this.initializeRows();
	}

	initializeRows() {
		let rowPattern = FIRST_ROW_PATTERN;
		const rows = [];
		for (let i = 0; i < 5; i++) {
			rows.push(new WallRow(rowPattern));
			rowPattern.unshift(rowPattern.pop());
		}
		return rows;
	}

	build(rowIndex: number, color: string) {
		const row = this.rows[rowIndex];
		row.build(color);
	}

	showPattern() {
  	const pattern = [];
  	for (let row of this.rows) {
    	pattern.push(row.tiles.map(tile => tile.color));
  	}
  	return pattern;
	}
}

class WallRow {
	tiles: Array<WallTile>;

	constructor(pattern: Array<string>) {
		this.tiles = this.initializeTiles(pattern);
	}

	initializeTiles(pattern: Array<string>) {
		let tiles = [];
		for (let i = 0; i < 5; i++) {
			tiles.push(new WallTile(pattern[i]));
		}
		return tiles;
	}

	build(color: string) {
		for (let tile of this.tiles) {
			if (tile.color === color) {
				tile.build();
			}
		}
	}

	showBuiltTiles() {
		return this.tiles.filter(tile => tile.isBuilt);
	}
}

class WallTile {
	color: string;
	isBuilt: boolean;

	constructor(color: string) {
		this.color = color;
		this.isBuilt = false;
	}

	build() {
		this.isBuilt = true;
	}
}

export { WallTile, WallRow, Wall, FIRST_ROW_PATTERN };

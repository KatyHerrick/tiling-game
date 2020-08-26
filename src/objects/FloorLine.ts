import { Tile } from './GameTiles';

const POINT_VALUES = [-1, -1, -2, -2, -2, -3, -3];

class FloorLine {
	tiles: Tile[];

	constructor() {
		this.tiles = [];
	}

	add(tiles: Tile[]) {
		this.tiles.push(...tiles);
	}

	countPoints() {
		return POINT_VALUES.slice(0, this.tiles.length)
			.reduce((x, y) => x + y, 0);
	}

	reset() {
		this.tiles = [];
	}
}

export { FloorLine };
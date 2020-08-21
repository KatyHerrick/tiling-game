import { Tile } from './GameTiles';

const MAX_TILES = 7;
const POINT_VALUES = [-1, -1, -2, -2, -2, -3, -3];

class FloorLine {
	tiles: Tile[];

	constructor() {
		this.tiles = [];
	}

	add(tiles: Tile[]) {
		if (this.willOverflow(tiles)) {
			// TODO: Logic for discarding extras
		} else {
			this.tiles.push(...tiles);
		}
	}

	willOverflow(newTiles: Tile[]) {
		return (this.tiles.length + newTiles.length > MAX_TILES)
	}

	reset() {
		this.tiles = [];
	}
}

export { FloorLine };
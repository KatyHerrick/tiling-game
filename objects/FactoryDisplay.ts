import { Tile } from './GameTiles';

class FactoryDisplay {
	tiles: Array<Tile>;

	constructor() {
		this.tiles = [];
	}

	deal(tiles: Array<Tile>) {
		this.tiles.push(...tiles);
	}

	chooseTiles(color: string) {
		const forPlayer = this.tiles.filter(tile => tile.color === color);
		const forCenter = this.tiles.filter(tile => tile.color !== color);
		this.tiles = [];

		return [forPlayer, forCenter];
	}

	availableColors() {
		return this.tiles.map(tile => tile.color);
	}

}

class TableCenter extends FactoryDisplay {
	constructor() {
		super();
	}

	deal() {
		this.tiles.push(new Tile('firstPlayerToken'));
	}

	add(tiles: Array<Tile>) {
		this.tiles.push(...tiles);
	}

	// TODO: Refactor so destructuring output isn't necessary
	// TypeScript doesn't like the overriding return change from [][] to []
	chooseTiles(color: string) {
		const tiles = this.tiles.filter(tile => tile.color === color);
		if (this.tiles[0].color === 'firstPlayerToken') {
			tiles.push(this.tiles.shift());
		}
		return [tiles];
	}

}

export { FactoryDisplay, TableCenter };

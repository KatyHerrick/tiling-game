import * as shuffle from 'lodash/shuffle';

const COLORS = ['blue', 'yellow', 'red', 'black', 'white'];

class GameTiles {
	inBag: Tile[];
	discarded: Tile[];

	constructor() {
		this.inBag = this.initializeBag();
		this.discarded = [];
	}

	initializeBag() {
		const tiles = [];
		for (const color of COLORS) {
			for (let i = 0; i < 20; i++) {
				tiles.push(new Tile(color));
			}
		}
		return shuffle(tiles);
	}

	deal(numTiles: number) {
		if (this.inBag.length < numTiles) {
			this.reshuffleDiscarded();
		}
		return this.inBag.splice(0, numTiles);
	}

	discard(tiles: Tile[]) {
		this.discarded.push(...tiles);
	}

	reshuffleDiscarded() {
		this.inBag.push(...shuffle(this.discarded));
	};

}

class Tile {
	color: string;

	constructor(color: string) {
		this.color = color;
	}
}

export { Tile, GameTiles };
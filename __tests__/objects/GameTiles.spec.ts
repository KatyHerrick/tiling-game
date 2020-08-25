import { Tile, GameTiles } from 'src/objects/GameTiles';

describe('Tile', () => {
	it('has a color', () => {
		const tile = new Tile('red');
		expect(tile.color).toBe('red');
	});
});

describe('GameTiles', () => {
	it('is initialized with 100 available Tiles', () => {
		const gameTiles = new GameTiles();
		expect(gameTiles.inBag.length).toBe(100);
	});

	it('is shuffled upon initialization', () => {
		const gameTiles1 = new GameTiles();
		const gameTiles2 = new GameTiles();
		expect(gameTiles1).not.toEqual(gameTiles2);
	});

	it('deals a given number of tiles', () => {
		const gameTiles = new GameTiles();
		const dealtTiles = gameTiles.deal(20);
		expect(dealtTiles.length).toBe(20);
	});

	it('removes dealt tiles from the bag', () => {
		const gameTiles = new GameTiles();
		const dealtTiles = gameTiles.deal(20);
		expect(gameTiles.inBag.length).toBe(80);
	});

	it('discards a single tile', () => {
		const gameTiles = new GameTiles();
		gameTiles.discard([new Tile('red')]);
		expect(gameTiles.discarded.length).toBe(1);
	});

	it('discards multiple tiles', () => {
		const gameTiles = new GameTiles();
		gameTiles.discard([new Tile('red'), new Tile('yellow')]);
		expect(gameTiles.discarded.length).toBe(2);
	});

	it('reshuffles discarded tiles when empty', () => {
		const gameTiles = new GameTiles();
		const dealtTiles = gameTiles.deal(99);
		expect(gameTiles.inBag.length).toBe(1);
		gameTiles.discard([new Tile('red')]);
		const reshuffledDealtTiles = gameTiles.deal(2);
		expect(reshuffledDealtTiles.length).toBe(2);
	});

	it('places reshuffled tiles at the end', () => {
		for (let i = 0; i < 5; i++) {
			const gameTiles = new GameTiles();
			const dealtTiles = gameTiles.deal(99);
			expect(gameTiles.inBag.length).toBe(1);
			gameTiles.discard([new Tile('discarded'), new Tile('discarded')]);
			const reshuffledDealtTiles = gameTiles.deal(3);
			expect(reshuffledDealtTiles[0].color).not.toBe('discarded');
		}
	});

});
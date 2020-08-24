import { PlayerBoard } from '../objects/PlayerBoard';
import { Tile } from '../objects/GameTiles';

// TODO: Remove setup redundancy
describe('PlayerBoard', () => {
	it('has all of the proper components', () => {
		const player = new PlayerBoard();
		expect(player).toHaveProperty('stagingArea');
		expect(player).toHaveProperty('wall');
		expect(player).toHaveProperty('floor');
		expect(player).toHaveProperty('points');
	});

	it('initializes with 0 points', () => {
		const player = new PlayerBoard();
		expect(player.points).toBe(0);
	});

	it('can place tiles in the staging area', () => {
		const player = new PlayerBoard();
		const chosenTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
		];
		player.moveToStagingArea(chosenTiles, 2);
		expect(player.stagingArea.rows[2].tiles.length).toBe(3);
	});

	it('can build tiles from the staging area', () => {
		const player = new PlayerBoard();
		const chosenTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
		];
		player.moveToStagingArea(chosenTiles, 2);
		player.buildAll();
		expect(player.wall.rows[2].tiles
			.filter(tile => tile.isBuilt).length).toBe(1);
	});

	it('empties previously full staging rows after building', () => {
		const player = new PlayerBoard();
		const chosenTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
		];
		player.moveToStagingArea(chosenTiles, 2);
		player.buildAll();
		expect(player.stagingArea.rows[2].tiles.length).toBe(0);
	});

	it('does not empty partially full staging rows after building', () => {
		const player = new PlayerBoard();
		const chosenTiles = [
			new Tile('red'),
		];
		player.moveToStagingArea(chosenTiles, 2);
		player.buildAll();
		expect(player.stagingArea.rows[2].tiles.length).toBe(1);
	});

	it('returns used tiles to caller after building', () => {
		const player = new PlayerBoard();
		const redTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
		];
		const blueTiles = [
			new Tile('blue')
		];
		player.moveToStagingArea(redTiles, 2);
		player.moveToStagingArea(blueTiles, 0);
		const usedTiles = player.buildAll();
		expect(usedTiles.length).toBe(4);
	});

});
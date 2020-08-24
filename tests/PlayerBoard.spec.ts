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

describe('PlayerBoard point counting', () => {
	it('counts row points when building a tile', () => {
		const player = new PlayerBoard();
		player.wall.build(0, 'yellow');
		player.wall.build(0, 'red');
		const rowPoints = player.countRowPoints(0, 2); // new tile is at [0][2]
		expect(rowPoints).toBe(2);
	});

	it('counts column points when building a tile', () => {
		const player = new PlayerBoard();
		player.wall.build(0, 'red');
		player.wall.build(1, 'yellow');
		const colPoints = player.countColPoints(1, 2); // new tile is at [1][2]
		expect(colPoints).toBe(2);
	});

	it('calculates the correct points when building a tile', () => {
		const player = new PlayerBoard();
		player.wall.build(0, 'yellow');
		player.wall.build(0, 'red');
		player.wall.build(1, 'blue');
		player.wall.build(1, 'yellow');
		player.addPoints(1, 'yellow'); // new tile is at [1][2]
		expect(player.points).toBe(4);
	});

	// TODO: Write cucumber stories to test different permutations
	// of building tiles and doling out points

});
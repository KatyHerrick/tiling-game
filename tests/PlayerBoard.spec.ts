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
});
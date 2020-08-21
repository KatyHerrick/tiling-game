import { FactoryDisplay, TableCenter } from '../objects/FactoryDisplay';
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

	it('can take tiles given a display and color', () => {
		const player = new PlayerBoard();
		const display = new FactoryDisplay();
		const tilesToDeal = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
			new Tile('yellow')
		];
		display.deal(tilesToDeal);
		const chosenTiles = player.takeFromDisplay(display, 'red');
		expect(chosenTiles.length).toBe(3);
	});

	it('can move tiles from a display to the staging area', () => {
		const player = new PlayerBoard();
		const display = new FactoryDisplay();
		const tilesToDeal = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
			new Tile('yellow')
		];
		display.deal(tilesToDeal);
		const chosenTiles = player.takeFromDisplay(display, 'red');
		player.moveToStagingArea(chosenTiles, 2);
		expect(player.stagingArea.rows[2].tiles.length).toBe(3);
	});
});
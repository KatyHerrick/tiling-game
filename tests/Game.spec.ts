import { Game } from '../objects/Game';
import { PlayerBoard } from '../objects/PlayerBoard';
import { Tile } from '../objects/GameTiles';

describe('GameSetup', () => {
	it('initializes the correct number of players', () => {
		const game = new Game(3);
		expect(game.players.length).toBe(3);
	});

	it('initializes the correct number of displays for 2 players', () => {
		const game = new Game(2);
		expect(game.factoryDisplays.length).toBe(5);
	});

	it('initializes the correct number of displays for 3 players', () => {
		const game = new Game(3);
		expect(game.factoryDisplays.length).toBe(7);
	});

	it('initializes the correct number of displays for 4 players', () => {
		const game = new Game(4);
		expect(game.factoryDisplays.length).toBe(9);
	});

	it('sets up displays for a new round', () => {
		const game = new Game(2);
		game.setUpRound();
		for (const display of game.factoryDisplays) {
			expect(display.tiles.length).toBe(4);
		}
	});

	it('sets up table center for a new round', () => {
		const game = new Game(2);
		game.setUpRound();
		expect(game.tableCenter.tiles.length).toBe(1);
	});

	it('allows a given player to take a given color tile from a display', () => {
		const game = new Game(2);
		game.setUpRound();
		const factoryDisplayTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
			new Tile('blue')
		];
		// TODO: Test this a better/safer way
		// Setting this display manually for testing purposes
		// Do not do this in prod code!
		game.factoryDisplays[0].tiles = factoryDisplayTiles;
		const chosenTiles = game.doPlayerTake(0, game.factoryDisplays[0], 'red')
		expect(chosenTiles.length).toBe(3);
	});

	it('moves unchosen tiles to the table center', () => {
		const game = new Game(2);
		game.setUpRound();
		const factoryDisplayTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
			new Tile('blue')
		];
		// TODO: Test this a better/safer way
		// Setting this display manually for testing purposes
		// Do not do this in prod code!
		game.factoryDisplays[0].tiles = factoryDisplayTiles;
		game.doPlayerTake(0, game.factoryDisplays[0], 'red')
		expect(game.tableCenter.tiles.length).toBe(2);
	});

	it("places a player's tiles in the specified staging area row", () => {
		const game = new Game(2);
		const chosenTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
		];
		const rowIndex = 2;
		game.doPlayerPlace(0, chosenTiles, rowIndex);
		expect(game.players[0].stagingArea.rows[rowIndex].tiles.length).toBe(3);
	});

	it('performs the build phase for one player', () => {
		const game = new Game(2);
		// TODO: Test this in a better/safer way
		const chosenTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
		];
		const rowIndex = 2;
		game.doPlayerPlace(0, chosenTiles, rowIndex);
		game.doBuildPhase();
		expect(game.players[0].wall.rows[rowIndex].tiles
			.filter(tile => tile.isBuilt).length).toBe(1);
	});


	it('performs the build phase for all players', () => {
		const game = new Game(4);
		// TODO: Test this in a better/safer way
		const redTiles = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
		];
		const blueTiles = [
			new Tile('blue'),
		];
		const rowIndexRed = 2;
		const rowIndexBlue = 0;
		game.doPlayerPlace(0, redTiles, rowIndexRed);
		game.doPlayerPlace(1, blueTiles, rowIndexBlue);
		game.doBuildPhase();
		expect(game.players[0].wall.rows[rowIndexRed].tiles
			.filter(tile => tile.isBuilt).length).toBe(1);
		expect(game.players[1].wall.rows[rowIndexBlue].tiles
			.filter(tile => tile.isBuilt).length).toBe(1);

	});

});
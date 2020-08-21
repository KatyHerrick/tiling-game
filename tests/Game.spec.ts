import { Game } from '../objects/Game';

describe('GameSetup', () => {
	it('initializes the correct number of players', () => {
		const game = new Game(3);
		expect(game.players.length).toBe(3);
	});

	it('initializes the correct number of displays for 2 players', () => {
		const game = new Game(2);
		expect(game.factoryDisplays.length).toBe(5);
	});

	it('initializes the correct number of displays for 2 players', () => {
		const game = new Game(3);
		expect(game.factoryDisplays.length).toBe(7);
	});

	it('initializes the correct number of displays for 2 players', () => {
		const game = new Game(4);
		expect(game.factoryDisplays.length).toBe(9);
	});
});
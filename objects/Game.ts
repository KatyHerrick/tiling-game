import { PlayerBoard } from './PlayerBoard';
import { Tile, GameTiles } from './GameTiles';
import { FactoryDisplay, TableCenter } from './FactoryDisplay';

class Game {
	players: Array<PlayerBoard>;
	gameTiles: GameTiles;
	factoryDisplays: Array<FactoryDisplay>;
	tableCenter: TableCenter;

	constructor(numPlayers: number) {
		this.players = this.initializePlayers(numPlayers);
		this.gameTiles = new GameTiles();
		this.factoryDisplays = this.initializeDisplays(numPlayers);
		this.tableCenter = new TableCenter();
	}

	initializePlayers(numPlayers: number) {
		const players = []
		for (let i = 0; i < numPlayers; i++) {
			players.push(new PlayerBoard);
		}
		return players;
	}

	initializeDisplays(numPlayers: number) {
		const numDisplays = (numPlayers * 2) + 1;
		const displays = [];
		for (let i = 0; i < numDisplays; i++) {
			displays.push(new FactoryDisplay);
		}
		return displays;
	}

}

export { Game };
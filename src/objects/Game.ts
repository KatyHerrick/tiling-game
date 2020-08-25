import { FactoryDisplay, TableCenter } from './FactoryDisplay';
import { PlayerBoard } from './PlayerBoard';
import { StagingAreaRow } from './StagingArea';
import { Tile, GameTiles } from './GameTiles';

class Game {
	players: PlayerBoard[];
	gameTiles: GameTiles;
	factoryDisplays: FactoryDisplay[];
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
			players.push(new PlayerBoard());
		}
		return players;
	}

	initializeDisplays(numPlayers: number) {
		const numDisplays = (numPlayers * 2) + 1;
		const displays = [];
		for (let i = 0; i < numDisplays; i++) {
			displays.push(new FactoryDisplay());
		}
		return displays;
	}

	setUpRound() {
		for (const display of this.factoryDisplays) {
			display.deal(this.gameTiles.deal(4));
		}
		this.tableCenter.deal();
	}

	doPlayerTake(playerNum: number, display, color) {
		const player = this.players[playerNum];
		const [tilesForPlayer, tilesForCenter] = display.chooseTiles(color);
		this.tableCenter.add(tilesForCenter);
		return tilesForPlayer;
	}

	doPlayerPlace(playerNum: number, tiles: Tile[], row: number) {
		const player = this.players[playerNum];
		player.moveToStagingArea(tiles, row);
	}

	finishRound() {
		for (const player of this.players) {
			const usedTiles = player.buildAll();
			this.gameTiles.discard(usedTiles);
		}
	}

}

export { Game };
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

	doBuildPhase() {
		for (const player of this.players) {
			for (let rowNum = 0; rowNum < 5; rowNum++) {
				const row = player.stagingArea.rows[rowNum];
				if (row.tiles.length === row.maxLength) {
					this.buildTile(player, row, rowNum);
					// TODO: Logic to count up points
				}
			}
		}
	}

	// TODO: Refactor so rowNum isn't passed around
	buildTile(player: PlayerBoard, row: StagingAreaRow, rowNum: number) {
		player.wall.build(rowNum, row.tiles[0].color);
		this.gameTiles.discard(row.tiles);
		row.reset();
	}

}

export { Game };
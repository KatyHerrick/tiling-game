import { FloorLine } from './FloorLine';
import { StagingArea, StagingAreaRow } from './StagingArea';
import { Tile } from './GameTiles';
import { Wall } from './Wall';


class PlayerBoard {
	stagingArea: StagingArea;
	wall: Wall;
	floor: FloorLine;
	points: number;

	constructor() {
		this.stagingArea = new StagingArea();
		this.wall = new Wall();
		this.floor = new FloorLine();
		this.points = 0;
	}

	moveToStagingArea(tiles: Tile[], row: number) {
		this.stagingArea.add(tiles, row, this.wall);
	}

	buildAll() {
		const usedTiles = [];
		for (let i = 0; i < 5; i++) {
			const row = this.stagingArea.rows[i];
			if (row.tiles.length === row.maxLength) {
				usedTiles.push(...this.buildTile(row, i));
			}
		}
		return usedTiles;
	}

	// TODO: Refactor so rowNum isn't passed around
	buildTile(row: StagingAreaRow, rowNum: number) {
		this.wall.build(rowNum, row.tiles[0].color);
		const usedTiles = row.tiles;
		row.reset();

		return usedTiles;
	}

}

export { PlayerBoard };
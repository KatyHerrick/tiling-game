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
		const excessTiles = this.stagingArea.add(tiles, row, this.wall);
		this.floor.add(excessTiles);
	}

	clearFloorLine() {
		this.points += this.floor.countPoints();
		if (this.points < 0) {
			this.points = 0;
		}
		const usedTiles = this.floor.tiles;
		this.floor.reset();

		return usedTiles;
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

	buildTile(row: StagingAreaRow, rowNum: number) {
		const color = row.tiles[0].color;

		// Build and remove one tile to build with
		this.wall.build(rowNum, color);
		row.tiles.pop();
		this.addBuildPoints(rowNum, color);

		// Reset row and return unused tiles to game
		const usedTiles = row.tiles;
		row.reset();
		return usedTiles;
	}

	addBuildPoints(rowIndex: number, color: string) {
		const colIndex = this.wall.rows[rowIndex].tiles
		.map(tile => tile.color).indexOf(color);

		const rowPoints = this.countRowPoints(rowIndex, colIndex);
		const colPoints = this.countColPoints(rowIndex, colIndex);
		const points = this.addRowAndColPoints(rowPoints, colPoints);
		this.points += points;
	}

	countRowPoints(rowIndex: number, colIndex: number) {
		const builtRowTiles = this.wall.rows[rowIndex].tiles
			.map(tile => tile.isBuilt);

		const points = this.countLeft(colIndex, builtRowTiles)
			+ this.countRight(colIndex + 1, builtRowTiles);

		// Return 0 because an independent tile in a row counts
		// only if it is independent in both axes
		if (points === 1) { return 0 }

		return points;
	}

	countColPoints(rowIndex: number, colIndex: number) {
		const builtColTiles = this.wall.rows
			.map(row => row.tiles[colIndex].isBuilt);

		const points = this.countLeft(rowIndex, builtColTiles)
			+ this.countRight(rowIndex + 1, builtColTiles);

		// Return 0 because an independent tile in a col counts
		// only if it is independent in both axes
		if (points === 1) { return 0 }

		return points;
	}

	countLeft(i: number, builtWallTiles: boolean[]) {
		let points = 0;
		while (i >= 0 && builtWallTiles[i]) {
			points += 1;
			i--;
		}
		return points;
	}

	countRight(i: number, builtWallTiles: boolean[]) {
		let points = 0;
		while (i <= 4 && builtWallTiles[i]) {
			points += 1;
			i++;
		}
		return points;
	}

	addRowAndColPoints(rowPoints: number, colPoints: number) {
		const points = rowPoints + colPoints;
		if (points === 0) {
			return 1;
		}
		return points;
	}

}

export { PlayerBoard };
import { FactoryDisplay, TableCenter } from '../objects/FactoryDisplay';
import { FloorLine } from './FloorLine';
import { StagingArea } from './StagingArea';
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

	takeFromDisplay(display: FactoryDisplay, color: string) {
		const [forPlayer] = display.chooseTiles(color);
		return forPlayer;
	}

	moveToStagingArea(tiles: Array<Tile>, row: number) {
		this.stagingArea.add(tiles, row, this.wall);
	}
}

export { PlayerBoard };
import { FloorLine } from '../objects/FloorLine';
import { Tile } from '../objects/GameTiles';

describe('FloorLine', () => {
	it('initializes with no tiles', () => {
		const floor = new FloorLine();
		expect(floor.tiles.length).toBe(0);
	});

	it('adds tiles to self', () => {
		const floor = new FloorLine();
		floor.add([new Tile('red')])
		expect(floor.tiles.length).toBe(1);
	});

	it('will only add up to 7 tiles', () => {
		const floor = new FloorLine();
		for (let i = 0; i < 8; i++) {
			floor.add([new Tile('red')])
		}
		expect(floor.tiles.length).toBe(7);
	});

	it('can reset itself', () => {
		const floor = new FloorLine();
		floor.add([new Tile('red')])
		floor.reset();
		expect(floor.tiles.length).toBe(0);
	});

});
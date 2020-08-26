import { FloorLine } from 'src/objects/FloorLine';
import { Tile } from 'src/objects/GameTiles';

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

	it('counts its negative point value for one tile', () => {
		const floor = new FloorLine();
		floor.add([new Tile('red')])
		const points = floor.countPoints();
		expect(points).toBe(-1);
	});

	it('counts its negative point value for several tiles', () => {
		const floor = new FloorLine();
		floor.add([new Tile('red'), new Tile('blue'), new Tile('blue')]);
		const points = floor.countPoints();
		expect(points).toBe(-4);
	});

	it('counts its negative point value with more than 7 tiles', () => {
		const floor = new FloorLine();
		floor.add([
			new Tile('red'),
			new Tile('white'),
			new Tile('white'),
			new Tile('blue'),
			new Tile('blue'),
			new Tile('blue'),
			new Tile('yellow'),
			new Tile('yellow')
			]);
		const points = floor.countPoints();
		expect(points).toBe(-14);
	});

	it('can reset itself', () => {
		const floor = new FloorLine();
		floor.add([new Tile('red')])
		floor.reset();
		expect(floor.tiles.length).toBe(0);
	});

});
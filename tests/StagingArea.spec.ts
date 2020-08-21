import { StagingArea, StagingAreaRow } from '../objects/StagingArea';
import { Tile } from '../objects/GameTiles';
import { Wall, WallRow, FIRST_ROW_PATTERN } from '../objects/Wall';

describe('StagingArea', () => {
	it('initializes 5 rows', () => {
		const area = new StagingArea();
		expect(area.rows.length).toBe(5);
	});

	it('initializes rows with the correct lengths', () => {
		const expectedLengths = [1, 2, 3, 4, 5];
		const area = new StagingArea();
		const rowLengths = area.rows.map(row => row.maxLength);
		expect(rowLengths).toEqual(expectedLengths);
	});

	it('adds tiles to itself given a row, tiles, and the wall', () => {
		const area = new StagingArea();
		const wall = new Wall();
		area.add([new Tile('red'), new Tile('red')], 1, wall);
		expect(area.rows[1].tiles.length).toBe(2);
	});

	it('can reset all rows', () => {
		const area = new StagingArea();
		const wall = new Wall();
		area.add([new Tile('blue')], 0, wall);
		area.add([new Tile('red'), new Tile('red')], 1, wall);
		area.reset();
		for (const row of area.rows) {
			expect(row.tiles.length).toBe(0);
		}
	});
});

describe('StagingAreaRow', () => {
	it('is initialized empty', () => {
		const row = new StagingAreaRow(3);
		expect(row.tiles.length).toBe(0);
	});

	it('can add a single tile to a row', () => {
		const row = new StagingAreaRow(3);
		const wallRow = new WallRow(FIRST_ROW_PATTERN);
		row.add([new Tile('red')], wallRow);
		expect(row.tiles.length).toBe(1);
	});

	it('can add multiple tiles to a row', () => {
		const row = new StagingAreaRow(3);
		const wallRow = new WallRow(FIRST_ROW_PATTERN);
		row.add([new Tile('red'), new Tile('red')], wallRow);
		expect(row.tiles.length).toBe(2);
	});

	it('will not add more tiles past the max length', () => {
		const row = new StagingAreaRow(1);
		const wallRow = new WallRow(FIRST_ROW_PATTERN);
		row.add([new Tile('red'), new Tile('red')], wallRow);
		expect(row.tiles.length).toBe(0);
	});

	it('will not add tiles that do not match existing tiles', () => {
		const row = new StagingAreaRow(3);
		const wallRow = new WallRow(FIRST_ROW_PATTERN);
		row.add([new Tile('red')], wallRow);
		row.add([new Tile('blue')], wallRow);
		expect(row.tiles.length).toBe(1);
	});

	it('will not add tiles if the color in the corresponding WallRow is already built', () => {
		const row = new StagingAreaRow(3);
		const wallRow = new WallRow(FIRST_ROW_PATTERN);
		wallRow.build('red');
		row.add([new Tile('red')], wallRow);
		expect(row.tiles.length).toBe(0);
	});

	it('can reset itself', () => {
		const row = new StagingAreaRow(3);
		const wallRow = new WallRow(FIRST_ROW_PATTERN);
		row.add([new Tile('red')], wallRow);
		row.reset()
		expect(row.tiles.length).toBe(0);
	});

});
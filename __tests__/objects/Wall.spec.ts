import { Wall, WallRow, WallTile, FIRST_ROW_PATTERN } from 'src/objects/Wall';

describe('Wall', () => {
	it('has 5 rows', () => {
		const wall = new Wall();
		expect(wall.rows.length).toBe(5);
	});

	it('has a given pattern', () => {
		const expectedPattern = [
			['blue', 'yellow', 'red', 'black', 'white'],
			['white', 'blue', 'yellow', 'red', 'black'],
			['black', 'white', 'blue', 'yellow', 'red'],
			['red', 'black', 'white', 'blue', 'yellow'],
			['yellow', 'red', 'black', 'white', 'blue']
		];
		const wall = new Wall();
		const wallPattern = wall.showPattern();
		expect(wallPattern).toEqual(expectedPattern);
	});

	it('can build a tile given a row and color', () => {
		const wall = new Wall();
		wall.build(2, 'blue');
		expect(wall.rows[2].tiles[2].color).toBe('blue');
		expect(wall.rows[2].tiles[2].isBuilt).toBe(true);
	});
});

describe('WallRow', () => {
	it('has 5 tiles', () => {
		const row = new WallRow(FIRST_ROW_PATTERN);
		expect(row.tiles.length).toBe(5);
	});

	it('can build a tile given a color', () => {
		const row = new WallRow(FIRST_ROW_PATTERN);
		row.build('blue');
		expect(row.tiles[0].isBuilt).toBe(true);
	});

	it('shows built tiles', () => {
		const row = new WallRow(FIRST_ROW_PATTERN);
		row.build('red');
		row.build('blue');
		const builtTiles = row.showBuiltTiles();
		expect(builtTiles.length).toBe(2);
	});

	it('does not build a tile for an invalid color', () => {
		const row = new WallRow(FIRST_ROW_PATTERN);
		row.build('invalidColor');
		const builtTiles = row.showBuiltTiles();
		expect(builtTiles.length).toBe(0);
	});
});

describe('WallTile', () => {
	it('has a color', () => {
		const tile = new WallTile('red');
		expect(tile.color).toBe('red');
	});

	it('is initialized unbuilt', () => {
		const tile = new WallTile('red');
		expect(tile.isBuilt).toBe(false);
	});

	it('can be built', () => {
		const tile = new WallTile('red');
		tile.build();
		expect(tile.isBuilt).toBe(true);
	});
});
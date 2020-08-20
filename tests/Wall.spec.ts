import { WallTile, WallRow, Wall } from '../objects/Wall';

const FIRST_ROW_PATTERN = ['blue', 'yellow', 'red', 'black', 'white'];

describe('Wall', function() {
  it('has 5 rows', function() {
  	const wall = new Wall();
    expect(wall.rows.length).toBe(5);
  });

  it('has a given pattern', function() {
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

  it('can build a tile given a row and color', function() {
    const wall = new Wall();
    wall.build(2, 'blue');
    expect(wall.rows[2].tiles[2].color).toBe('blue');
    expect(wall.rows[2].tiles[2].isBuilt).toBe(true);
  });
});

describe('WallRow', function() {
  it('has 5 tiles', function() {
  	const row = new WallRow(FIRST_ROW_PATTERN);
    expect(row.tiles.length).toBe(5);
  });

  it('can build a tile given a color', function() {
  	const row = new WallRow(FIRST_ROW_PATTERN);
  	row.build('blue');
    expect(row.tiles[0].isBuilt).toBe(true);
  });

  it('does not build a tile for an invalid color', function() {
  	const row = new WallRow(FIRST_ROW_PATTERN);
  	row.build('invalidColor');
  	const builtTiles = row.tiles.filter(tile => tile.isBuilt);
    expect(builtTiles.length).toBe(0);
  });
});

describe('WallTile', function() {
  it('has a color', function() {
  	const tile = new WallTile('red');
    expect(tile.color).toBe('red');
  });

  it('is initialized unbuilt', function() {
  	const tile = new WallTile('red');
    expect(tile.isBuilt).toBe(false);
  });

  it('can be built', function() {
  	const tile = new WallTile('red');
  	tile.build();
    expect(tile.isBuilt).toBe(true);
  });
});
import { FactoryDisplay, TableCenter } from '../objects/FactoryDisplay';
import { Tile } from '../objects/GameTiles';

describe('FactoryDisplay', function() {
  it('is initialized empty', function() {
		const display = new FactoryDisplay();
    expect(display.tiles.length).toBe(0);
  });

  it('can deal tiles to self', function() {
		const display = new FactoryDisplay();
		const tilesToDeal = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
			new Tile('yellow')
		];
		display.deal(tilesToDeal)
    expect(display.tiles.length).toBe(4);
  });

  it('can choose tiles of a given color', function() {
		const display = new FactoryDisplay();
		const tilesToDeal = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
			new Tile('yellow')
		];
		display.deal(tilesToDeal);
		const [forPlayer, forCenter] = display.chooseTiles('red');
    expect(forPlayer.length).toBe(3);
  });

  it('returns unchosen tiles to move to the center', function() {
		const display = new FactoryDisplay();
		const tilesToDeal = [
			new Tile('red'),
			new Tile('red'),
			new Tile('red'),
			new Tile('yellow')
		];
		display.deal(tilesToDeal);
		const [forPlayer, forCenter] = display.chooseTiles('red');
		expect(forCenter.length).toBe(1);
  });
});

describe('TableCenter', function() {
  it('is initialized empty', function() {
    const center = new TableCenter();
    expect(center.tiles.length).toBe(0);
  });

  it('puts the first player token in upon deal', function() {
    const center = new TableCenter();
    center.deal();
    expect(center.tiles[0].color).toBe('firstPlayerToken');
  });

  it('can add given tiles to self', function() {
    const center = new TableCenter();
    center.deal();
    center.add([new Tile('red')]);
    expect(center.tiles.length).toBe(2);
  });

  it('returns the first player token if it exists', function() {
    const center = new TableCenter();
    center.deal();
    center.add([new Tile('red'), new Tile('blue')]);
    const [chosenTiles] = center.chooseTiles('red');
    expect(chosenTiles.length).toBe(2);
    expect(chosenTiles[1].color).toBe('firstPlayerToken');
  });
});
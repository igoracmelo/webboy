import { TileType, tilesets } from "./tilesets";

const canvas = document.getElementById("canvas") as HTMLCanvasElement

const ctx = canvas.getContext('2d')
if (!ctx) {
  throw new Error("");
}

canvas.width = 160
canvas.height = 144

canvas.onclick = () => canvas.requestFullscreen()

const fgTiles: Tile[] = []
const bgTiles: Tile[] = []


const colors: Record<string, string> = {
  '.': '#0000',
  '0': 'hsl(96deg 74% 89%)',
  'x': 'hsl(102deg 39% 60%)',
  '@': 'hsl(159deg 33% 31%)',
  '#': 'hsl(200deg 60% 8%)',
}


const newTileMap = () => {
  const tileMap: number[][] = []
  for (let l = 0; l < 18; l++) {
    const row: number[] = []
    tileMap.push(row)
    for (let c = 0; c < 20; c++) {
      row.push(TileType.EMPTY)
    }
  }
  return tileMap
}

// const fgTileMap = newTileMap()
// const bgTileMap = newTileMap()

export const init = () => {
  for (let i = 0; i < 18; i++) {
    // const tile = new Tile(TileType.BRICK, new Position(3*8, i*8))
    // tiles.push(tile)
    for (let j = 0; j < 4; j++) {
      bgTiles.push(new Tile(TileType.BLACK, new Position(j*8, i*8)))
      bgTiles.push(new Tile(TileType.BLACK, new Position((19 - j)*8, i*8)))
    }
    // bgTiles.push(new Tile(TileType.BLACK, new Position(1*8, i*8)))
    bgTiles.push(new Tile(TileType.BRICK, new Position(4*8, i*8)))
    bgTiles.push(new Tile(TileType.BRICK, new Position(15*8, i*8)))
  }

  const clampY1: AutoClamp = { min: 0*8, max: 16*8 }
  const clampY: AutoClamp = { min: 0*8, max: 17*8 }

  fgTiles.push(new Tile(TileType.TETRIS, new Position(10*8, 10*8, undefined, clampY1)))
  fgTiles.push(new Tile(TileType.TETRIS, new Position(10*8, 11*8, undefined, clampY)))
  fgTiles.push(new Tile(TileType.TETRIS, new Position(11*8, 11*8, undefined, clampY)))
  fgTiles.push(new Tile(TileType.TETRIS, new Position(12*8, 11*8, undefined, clampY)))

  // for (let l = 0; l < 18; l++) {
  //   const row: number[] = []
  //   bgTileMap.push(row)
  //   for (let c = 0; c < 20; c++) {
  //     row.push(TileType.EMPTY)
  //   }
  // }

  // for (let l = 0; l < 18; l++) {
  //   bgTileMap[l][4] = TileType.BRICK
  //   bgTileMap[l][15] = TileType.BRICK
  // }

  // bgTileMap[5][8] = TileType.TETRIS
  // bgTileMap[6][8] = TileType.TETRIS
  // bgTileMap[6][9] = TileType.TETRIS
  // bgTileMap[6][10] = TileType.TETRIS

  // let x = 9
  // let y = 4
  // fgTileMap[y][x] = TileType.MARIO_HEAD1
  // fgTileMap[y][x+1] = TileType.MARIO_HEAD2

  // fgTileMap[y+1][x] = TileType.MARIO_LEG1
  // fgTileMap[y+1][x+1] = TileType.MARIO_LEG2

  // for (let l = 0; l < 18; l++) {
  //   for (let c = 0; c < 4; c++) {
  //     bgTileMap[l][c] = TileType.BLACK
  //   }
  // }

  // for (let l = 0; l < 18; l++) {
  //   for (let c = 16; c < 20; c++) {
  //     bgTileMap[l][c] = TileType.BLACK
  //   }
  // }
}

const paintTileMap = (tileMap: number[][]) => {
  for (let dl = 0; dl < 18; dl++) {
    for (let dc = 0; dc < 20; dc++) {
      const tileIndex = tileMap[dl][dc]
      const curr = tilesets[tileIndex]
      const rows = curr.trim().split('\n').map(row => row.trim())

      rows.forEach((row, l) => {
        row.split('').forEach((symbol, c) => {
          const color = colors[symbol]
          ctx.fillStyle = color
          ctx.fillRect(c + (dc * 8), l + (dl * 8), 1, 1)
        })
      })
    }
  }
}

const paintTiles = (ctx: CanvasRenderingContext2D, tiles: Tile[]) => {
  for (const tile of tiles) {
    TilePainter.paint(ctx, tile)
  }
}

// const paintForeground = () => {
//   paintTileMap(fgTileMap)
// }

// const paintBackground = () => {
//   paintTileMap(bgTileMap)
// }

export const paint = () => {
  ctx.fillStyle = colors['0']
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // paintTileMap(bgTileMap)
  // paintTileMap(fgTileMap)

  paintTiles(ctx, bgTiles)
  paintTiles(ctx, fgTiles)

  // for (const tile of tiles) {
  //   TilePainter.paint(ctx, tile)
  // }
  // paintBackground()
  // paintForeground()
}

setInterval(() => {
  paint()
  for (const tile of fgTiles) {
    tile.position.y += 8
  }
}, 500)

type AutoClamp = { min: number, max: number }

const clamp = (val: number, min: number, max: number) => {
  console.log(val, min, max);

  return Math.min(max, Math.max(min, val))
}

class Position {
  _x: number

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    if (this.autoclampX) {
      value = clamp(value, this.autoclampX.min, this.autoclampX.max)
    }
    this._x = value;
  }

  _y: number

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    if (this.autoclampY) {
      value = clamp(value, this.autoclampY.min, this.autoclampY.max)
    }
    this._y = value;
  }

  autoclampX?: AutoClamp
  autoclampY?: AutoClamp

  constructor(x: number, y: number, autoclampX?: AutoClamp, autoclampY?: AutoClamp) {
    this._x = x;
    this._y = y;
    this.autoclampX = autoclampX;
    this.autoclampY = autoclampY;
  }
}

class Tile {
  tileType: TileType
  position: Position
  // flipX = false
  // repeatX = 1
  // repeatY = 1

  constructor(tileType: TileType, position: Position) {
    this.tileType = tileType
    this.position = position
  }
}

class TilePainter {
  static paint(ctx: CanvasRenderingContext2D, tile: Tile): void {
    const rows = tilesets[tile.tileType]
      .split('\n')
      .map(row => row.trim())
      .filter(row => row)

    const width = rows.reduce((a, b) => a > b.length ? a : b.length, 0)
    const height = rows.length
    // console.log(width, height);

    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        // console.log(dx, dy);

        const symbol = rows[dy][dx]
        ctx.fillStyle = colors[symbol]
        ctx.fillRect(tile.position.x + dx, tile.position.y + dy, 1, 1)
      }
    }
  }
}

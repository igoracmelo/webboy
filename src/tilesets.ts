export enum TileType {
  EMPTY = 0,
  BRICK,
  TETRIS,
  BLACK,
  MARIO_HEAD1,
  MARIO_HEAD2,
  MARIO_LEG1,
  MARIO_LEG2,
}

export const tilesets = [
  `
  ........
  ........
  ........
  ........
  ........
  ........
  ........
  ........
  `,
  `
  ########
  .xx#.xx#
  xxx#xxx#
  xxx#xxx#
  ########
  x#.xx#.x
  x#xxx#xx
  x#xxx#xx
  `,
  `
  ########
  #xxxxxx#
  #x####x#
  #x#..#x#
  #x#..#x#
  #x####x#
  #xxxxxx#
  ########
  `,
  `
  ########
  ########
  ########
  ########
  ########
  ########
  ########
  ########
  `,
  `
  ........
  ........
  ........
  ........
  ......##
  .....###
  ....###x
  ...##x##
  `,
  `
  ........
  ........
  ........
  ........
  ##......
  #####...
  xx#x....
  xxxxx...
  `,
  `
  ...##xxx
  .....xxx
  ....##@#
  ...###@#
  ...xx#.@
  ...xx@@@
  .....##.
  ....###.
  `,
  `
  xx##x...
  xxxx....
  #@......
  #@##....
  @.##x...
  @@@xx...
  .##.....
  .###....
  `
]
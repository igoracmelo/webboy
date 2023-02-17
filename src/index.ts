import * as input from './input';
import * as screen from './screen';

// import { Tile, tilesets } from './tilesets';
input.init()
screen.init()
screen.paint()

// const s = `
//       ########
//       .xx#.xx#
//       xxx#xxx#
//       ########
//       x#.xx#.x
//       x#xxx#xx

//       ########
//       #xxxxxx#
//       #x####x#
//       #x#..#x#
//       #x#..#x#
//       #x####x#
//       #xxxxxx#
//       ########
//     `



// const pixelColors = []

// for (let l = 0; l < ctx.height; l++) {
//   const row = []
//   pixelColors.push(row)

//   for (let c = 0; c < ctx.width; c++) {
//     const index = Math.floor(Math.random() * (symbols.length))
//     const symbol = '.'
//     row.push(symbol)
//     // debugger
//   }
// }

// const lines = s.split('\n')
// console.log(lines);

// lines.forEach((cols, c) => {
//   const chars = cols.trim().split('')
//   chars.forEach((char, l) => {
//     // debugger
//     if (char) {
//       pixelColors[l][c] = char
//     }
//   })
// })
// // for (const line of lines) {
// // }

// for (let l = 0; l < ctx.height; l++) {
//   for (let c = 0; c < ctx.width; c++) {
//     const symbol = pixelColors[l][c]
//     ctx.fillStyle = colors[symbol]
//     // console.log(symbol)
//     ctx.fillRect(l, c, 1, 1)
//   }
// }

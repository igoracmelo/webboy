
const ctx = canvas.getContext('2d')
canvas.width = 160
canvas.height = 144

canvas.onclick = () => canvas.requestFullscreen()

const symbols = [
  '.',
  'x',
  '@',
  '#'
]

const colors = {
  '.': 'hsl(96deg 74% 89%)',
  'x': 'hsl(102deg 39% 60%)',
  '@': 'hsl(159deg 33% 31%)',
  '#': 'hsl(200deg 60% 8%)',
}


const tilesets = [
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
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
        xxxxxxxx
      `
]

const s = `
      ########
      .xx#.xx#
      xxx#xxx#
      ########
      x#.xx#.x
      x#xxx#xx

      ########
      #xxxxxx#
      #x####x#
      #x#..#x#
      #x#..#x#
      #x####x#
      #xxxxxx#
      ########
    `

// `
//   ........####
//   .......########
//   ......###xxx#x
//   .....##x##xxxxx
//   .....##xxxxx##x
//   .......xxxxxxx
//   ......##@##@
//   .....###@##@##
//   .....xx#.@@.##x
//   .....xx@@@@@@xx
//   .......##..##
//   ......###..###
// `


const tileMap = []

for (let l = 0; l < 18; l++) {
  const row = []
  tileMap.push(row)
  for (let c = 0; c < 20; c++) {
    row.push(0)
  }
}

for (let l = 0; l < 18; l++) {
  tileMap[l][4] = 1
  tileMap[l][15] = 1
}

tileMap[5][8] = 2
tileMap[6][8] = 2
tileMap[6][9] = 2
tileMap[6][10] = 2

for (let l = 0; l < 18; l++) {
  for (let c = 0; c < 4; c++) {
    tileMap[l][c] = 3
  }
}

for (let l = 0; l < 18; l++) {
  for (let c = 16; c < 20; c++) {
    tileMap[l][c] = 3
  }
}

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

const keyToButtonName = {
  'x': 'B',
  'z': 'A',
  'Enter': 'START',
  'Shift': 'SELECT',
  'ArrowUp': 'UP',
  'ArrowDown': 'DOWN',
  'ArrowLeft': 'LEFT',
  'ArrowRight': 'RIGHT',
}

const activateButton = (btnName) => {
  console.log('activated', btnName);
  const id = 'btn-' + btnName.toLowerCase();
  const button = document.getElementById(id)

  if (!button.classList.contains('active')) {
    button.classList.add('active')
  }
}

const deactivateButton = (btnName) => {
  console.log('deactivated', btnName);
  const id = 'btn-' + btnName.toLowerCase();
  const button = document.getElementById(id)

  if (button.classList.contains('active')) {
    button.classList.remove('active')
  }
}

window.addEventListener('keydown', (e) => {
  const btnName = keyToButtonName[e.key]

  if (btnName) {
    activateButton(btnName)
  }
})

window.addEventListener('keyup', (e) => {
  const btnName = keyToButtonName[e.key]

  if (btnName) {
    deactivateButton(btnName)
  }
})
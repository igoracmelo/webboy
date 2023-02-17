
const buttonNames = [
  'B',
  'A',
  'START',
  'SELECT',
  'UP',
  'DOWN',
  'LEFT',
  'RIGHT',
]

const keyToButtonName: Record<string, string> = {
  'x': 'B',
  'z': 'A',
  'Enter': 'START',
  'Shift': 'SELECT',
  'ArrowUp': 'UP',
  'ArrowDown': 'DOWN',
  'ArrowLeft': 'LEFT',
  'ArrowRight': 'RIGHT',
}

const activateButton = (btnName: string) => {
  console.log('activated', btnName);
  const id = 'btn-' + btnName.toLowerCase();
  const button = document.getElementById(id)

  if (!button) {
    throw new Error()
  }

  if (!button.classList.contains('active')) {
    button.classList.add('active')
  }
}

const deactivateButton = (btnName: string) => {
  console.log('deactivated', btnName);
  const id = 'btn-' + btnName.toLowerCase();
  const button = document.getElementById(id)

  if (!button) {
    throw new Error()
  }

  if (button.classList.contains('active')) {
    button.classList.remove('active')
  }
}

export const init = () => {
  for (const btnName of buttonNames) {
    const id = 'btn-' + btnName.toLowerCase()
    const el = document.getElementById(id)

    if (!el) {
      throw new Error()
    }

    el.addEventListener('touchstart', () => activateButton(btnName))
    el.addEventListener('touchend', () => deactivateButton(btnName))
    // el.addEventListener("touchmove", () => deactivateButton(btnName))
    el.addEventListener('mousedown', () => activateButton(btnName))
    el.addEventListener('mouseup', () => deactivateButton(btnName))
    el.addEventListener('mouseout', () => deactivateButton(btnName))
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
}

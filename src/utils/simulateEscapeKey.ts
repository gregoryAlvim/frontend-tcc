export function simulateEscapeKey() {
  const event = new KeyboardEvent('keydown', {
    key: 'Escape',
    keyCode: 27,
    which: 27,
    bubbles: true,
    cancelable: true,
  })

  document.dispatchEvent(event)
}

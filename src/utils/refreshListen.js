export function refreshListen(fn) {
  setInterval(() => {
    fn && fn();
    console.clear()
  }, 3e3)
}

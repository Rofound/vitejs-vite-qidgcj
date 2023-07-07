export function refreshListen(fn) {
  return setInterval(() => {
    fn && fn();
    // console.clear()
  }, 3e3)
}

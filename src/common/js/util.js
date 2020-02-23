/**
 * @author lenovo
 * @date 2020/2/22 11:14
 * @desc 工具类
 */

export function shuffle (arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * 节流函数避免频繁操作
 * @param func
 * @param delay
 * @returns {Function}
 */
export function debounce (func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @author lenovo
 * @date 2020/2/23 18:13
 * @desc 利用localStorage缓存
 */
import storage from 'good-storage'

// 存储key
const SEARCH_KEY = '__search__'
// 最大存储空间
const SEARCH_MAX_LENGTH = 15

/**
 * 存储搜索记录
 * @param query
 * @returns {*|undefined}
 */
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

/**
 * 读取存储数据
 * @returns {*|undefined}
 */
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

/**
 * 插入数组
 * @param arr
 * @param val
 * @param compare
 * @param maxLen
 */
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  // 如果index > 0就代表传入的数据原先已经存在需要先删除
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 在数组开头处添加val
  arr.unshift(val)
  // 如果存储数据长度超过最大容量，就删除最后一个
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

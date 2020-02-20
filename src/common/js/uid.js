/**
 * @author lenovo
 * @date 2020/2/20 17:17
 * @desc 获取uid
 */
let _uid = ''
export function getUid () {
  if (_uid) {
    return _uid
  }
  if (!_uid) {
    const t = (new Date()).getUTCMilliseconds()
    _uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10
  }
  return _uid
}

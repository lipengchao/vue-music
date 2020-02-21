/**
 * @author lenovo
 * @date 2020/2/20 14:12
 * @desc 多次调用mutation或者异步操作就使用acitons
 */

import * as types from './mutation-type'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

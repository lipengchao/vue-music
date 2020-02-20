/**
 * @author lenovo
 * @date 2020/2/20 14:11
 * @desc 用mutation修改数据
 */
import * as types from './mutation-type'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }
}

export default mutations

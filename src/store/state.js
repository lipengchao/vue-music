/**
 * @author lenovo
 * @date 2020/2/20 14:11
 * @desc 状态管理中的数据
 */

import { playMode } from 'common/js/config'
import { loadSearch, loadPlay, loadFavorite } from 'common/js/cache'

const state = {
  // 歌手信息
  singer: {},
  // 是否播放
  playing: true,
  // 是否全屏
  fullScreen: false,
  // 播放列表
  playlist: [],
  // 顺序播放
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 当前播放索引
  currentIndex: -1,
  // 歌单对象
  disc: {},
  // 榜单对象
  topList: {},
  // 搜索历史
  searchHistory: loadSearch(),
  // 播放历史
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state

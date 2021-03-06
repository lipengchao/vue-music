/**
 * @author lenovo
 * @date 2020/2/20 14:13
 * @desc 包装mutation
 */

// 返回state中的singer
export const singer = state => state.singer

// 返回state中的音乐播放的相关状态
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
// 返回歌单对象
export const disc = state => state.disc
// 返回榜单对象
export const topList = state => state.topList
// 返回搜索对象
export const searchHistory = state => state.searchHistory
// 返回播放历史
export const playHistory = state => state.playHistory
// 返回收藏列表
export const favoriteList = state => state.favoriteList

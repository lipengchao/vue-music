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

/**
 * @author lenovo
 * @date 2020/2/20 14:12
 * @desc 多次调用mutation或者异步操作就使用acitons
 */

import * as types from './mutation-type'
import { playMode } from 'common/js/config'
import {shuffle} from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

/**
 * 选择歌曲播放
 * @param commit
 * @param state
 * @param list
 * @param index
 */
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
/**
 * 随机播放歌曲
 * @param commit
 * @param list
 */
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

/**
 * 搜索插入歌曲
 * @param commit
 * @param state
 * @param song
 */
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequnceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 判断当前列表里是否已经有该歌曲并返回索引
  let fpIndex = findIndex(playlist, song)
  // 向当前位置后面插入这首歌曲
  // 当前位置为currentIndex，它的后面一个位置是currentIndex++
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // 当前sequnceList中的索引
  let currentSIndex = findIndex(sequnceList, currentSong)
  currentSIndex++
  let fsIndex = findIndex(sequnceList, song)
  sequnceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequnceList.splice(fsIndex, 1)
    } else {
      sequnceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequnceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

/**
 * 保存搜索历史记录
 * @param commit
 * @param query
 */
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

/**
 * 删除单条历史记录
 * @param commit
 * @param query
 */
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

/**
 * 清空搜索历史
 * @param commit
 */
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

/**
 * 删除单条歌曲
 * @param commit
 */
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequnceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequnceList, song)
  sequnceList.splice(sIndex, 1)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequnceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

/**
 * 清空播放列表
 * @param commit
 */
export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYING_STATE, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

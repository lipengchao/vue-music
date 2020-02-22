/**
 * @author lenovo
 * @date 2020/2/18 19:37
 * @desc 推荐模块的相关接口方法
 */
import { commonParams } from './config'
import axios from 'axios'

const debug = process.env.NODE_ENV !== 'production'

// 获取轮播图数据
export function getRecommend () {
  // 线上环境地址，同学们根据自己的需要配置修改
  const url = debug ? '/api/getTopBanner' : 'http://ustbhuangyi.com/music/api/getTopBanner'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    inCharset: 'utf8',
    format: 'json',
    '-': 'recom' + (Math.random() + '').replace('0.', ''),
    data: {
      'comm': { 'ct': 24 },
      'category': { 'method': 'get_hot_category', 'param': { 'qq': '' }, 'module': 'music.web_category_svr' },
      'recomPlaylist': {
        'method': 'get_hot_recommend',
        'param': { 'async': 1, 'cmd': 2 },
        'module': 'playlist.HotRecommendServer'
      },
      'playlist': {
        'method': 'get_playlist_by_category',
        'param': { 'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8 },
        'module': 'playlist.PlayListPlazaServer'
      },
      'new_song': { 'module': 'newsong.NewSongServer', 'method': 'get_new_song_info', 'param': { 'type': 5 } },
      'new_album': {
        'module': 'newalbum.NewAlbumServer',
        'method': 'get_new_album_info',
        'param': { 'area': 1, 'sin': 0, 'num': 10 }
      },
      'new_album_tag': { 'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_area', 'param': {} },
      'toplist': { 'module': 'musicToplist.ToplistInfoServer', 'method': 'GetAll', 'param': {} },
      'focus': { 'module': 'QQMusic.MusichallServer', 'method': 'GetFocus', 'param': {} }
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return res.data
  })
}

// 获取推荐列表数据
export function getDiscList () {
  // 线上环境地址，同学们根据自己的需要配置修改
  const url = debug ? '/api/getDiscList' : 'http://ustbhuangyi.com/music/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取歌单详情页数据
export function getSongList (disstid) {
  const url = debug ? '/api/getCdInfo' : 'http://ustbhuangyi.com/music/api/getCdInfo'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

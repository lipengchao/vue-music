/*
 * @Description: 排行榜数据
 * @Author: 雪中无处寻
 * @Date: 2020-05-25 08:35:29
 * @LastEditTime: 2020-05-25 09:25:27
 * @LastEditors: 雪中无处寻
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

class RankApi {
  url
  /**
   * 获取排行榜数据列表
   */
  getTopList () {
    this.url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    const data = Object.assign({}, commonParams, {
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    })

    return jsonp(this.url, data, options)
  }

  /**
   * 获取歌单列表
   * @param {*} topid
   */
  getMusicList (topid) {
    this.url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    const data = Object.assign({}, commonParams, {
      topid,
      needNewCode: 1,
      uin: 0,
      tpl: 3,
      page: 'detail',
      type: 'top',
      platform: 'h5'
    })

    return jsonp(this.url, data, options)
  }
}

export default new RankApi()

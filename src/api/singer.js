/*
 * @Description: 歌手数据
 * @Author: 雪中无处寻
 * @Date: 2020-05-25 08:35:29
 * @LastEditTime: 2020-05-25 09:17:19
 * @LastEditors: 雪中无处寻
 */
import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

class SingerApi {
  url
  /**
   * 获取歌手列表
   */
  getSingerList () {
    this.url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq'
    })

    return jsonp(this.url, data, options)
  }

  /**
   * 获取歌手详情
   * @param {*} singerId
   */
  getSingerDetail (singerId) {
    this.url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 80,
      songstatus: 1,
      singermid: singerId
    })

    return jsonp(this.url, data, options)
  }
}

export default new SingerApi()

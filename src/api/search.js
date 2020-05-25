/*
 * @Description: 搜索页面的数据处理
 * @Author: 雪中无处寻
 * @Date: 2020-05-25 08:35:29
 * @LastEditTime: 2020-05-25 09:25:51
 * @LastEditors: 雪中无处寻
 */

import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

// const debug = process.env.NODE_ENV !== 'production'
class SearchApi {
  url
  /**
   * 热门搜索词
   */
  getHotKey () {
    this.url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
      uin: 0,
      needNewCode: 1,
      platform: 'h5'
    })

    return jsonp(this.url, data, options)
  }

  /**
   * 搜索功能
   * @param query 查询关键词
   * @param page
   * @param zhida
   * @param perpage
   * @returns {Promise<T | never>}
   */
  search (query, page, zhida, perpage) {
    // const url = debug ? '/api/search' : 'http://ustbhuangyi.com/music/api/search'
    this.url = '/api/search'

    const data = Object.assign({}, commonParams, {
      w: query,
      p: page,
      perpage,
      n: perpage,
      catZhida: zhida ? 1 : 0,
      zhidaqu: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      remoteplace: 'txt.mqq.all',
      uin: 0,
      needNewCode: 1,
      platform: 'h5',
      format: 'json'
    })

    return axios.get(this.url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }
}

export default new SearchApi()

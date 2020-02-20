/**
 * @author lenovo
 * @date 2020/2/19 20:06
 * @desc 歌手数据的封装
 */
export default class Singer {
  constructor ({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}

<template>
    <div class="singer" ref="singer">
      <list-view ref="listview" @select="selectSinger" :data="singers"></list-view>
      <router-view></router-view>
    </div>
</template>

<script>
  import SingerApi from 'api/singer'
  import { ERR_OK } from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  import { playlistMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGER = 10

  export default {
    mixins: [playlistMixin],
    name: 'singer',
    components: {
      ListView
    },
    data () {
      return {
        singers: []
      }
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.listview.refresh()
      },
      selectSinger (singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList () {
        SingerApi.getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      // 规范歌手列表数据
      // 因为返回的数据不是我们想要的形式
      _normalizeSinger (list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        // 为了得到有序列表，需要处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    created () {
      this._getSingerList()
    }
  }
</script>

<style lang="stylus" scoped>
  .singer
    position: absolute
    top: 88px
    bottom: 0
    width: 100%
</style>

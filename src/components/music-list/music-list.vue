<template>
    <div class="music-list">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title" ref="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper" @click="randomPlayList">
          <div class="play" v-show="songs.length" ref="playBtn">
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
          </div>
        </div>
        <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll @onScroll="scroll" :listenScroll="listenScroll" :probeType = "probeType" :data="songs" class="list" ref="list">
        <div class="song-list-wrapper">
          <song-list @select="selectItem" :songs="songs"></song-list>
        </div>
        <div class="loading-container" v-show="!songs.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Loading from 'base/loading/loading'
  import { playlistMixin } from 'common/js/mixin'
  import { prefixStyle } from 'common/js/dom'
  import { mapActions } from 'vuex'

  const transform = prefixStyle('transform')
  export default {
    mixins: [playlistMixin],
    name: 'music-list.vue',
    components: {
      Scroll,
      SongList,
      Loading
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default () {
          return []
        }
      },
      bgImage: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      back () {
        this.$router.back()
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      // 随机播放
      randomPlayList () {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY (newY) {
        // console.log(this.minTranslateY, newY)
        let translateY = Math.max(this.minTranslateY, newY)
        // 因为向上滑动后，默认列表会显示在图片上，所以需要将图片的层级调高盖住列表
        let zIndex = 0
        // 缩放
        let scale = 1
        // 高斯模糊
        let blur = 0
        this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`
        // 向下拉
        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }
        // 设置高斯模糊
        this.$refs.filter.style['backdrop-filter'] = `blur(${blur}px)`
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${this.titleHeight}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = 'block'
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = `scale(${scale})`
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted () {
      // 获取背景图片的高度
      this.imageHeight = this.$refs.bgImage.clientHeight
      // 获取标题栏高度
      this.titleHeight = this.$refs.title.clientHeight
      // 最小滚动距离 + 预留标题栏的高度
      this.minTranslateY = -this.imageHeight + this.titleHeight
      this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: $color-background
    .back
      position: absolute
      z-index: 50
      top: 0
      left: 6px
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      z-index: 40
      top: 0
      left: 10%
      width: 80%
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
      no-wrap()
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      background-size: cover
      transform-origin: top
      .play-wrapper
        position: absolute
        z-index: 50
        bottom: 20px
        width: 100%
        .play
          margin: 0 auto
          padding: 7px 0
          width: 135px
          box-sizing: border-box
          text-align: center
          border: 1px solid $color-theme
          border-radius: 100px
          font-size: 0
          color: $color-theme
          .icon-play
            display: inline-block
            margin-right: 6px
            vertical-align: middle
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

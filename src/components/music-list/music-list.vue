<template>
    <div class="music-list">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title" ref="title"></h1>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll @onScroll="scroll" :listenScroll="listenScroll" :probeType = "probeType" :data="songs" class="list" ref="list">
        <div class="song-list-wrapper">
          <song-list :songs="songs"></song-list>
        </div>
      </scroll>
    </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'

  export default {
    name: 'music-list.vue',
    components: {
      Scroll,
      SongList
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
      back () {
        this.$router.back()
      },
      scroll (pos) {
        this.scrollY = pos.y
      }
    },
    watch: {
      scrollY (newY) {
        // console.log(this.minTranslateY, newY)
        let translateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`
        this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${this.titleHeight}px`
        } else {
          zIndex = 0
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
        }
        this.$refs.bgImage.style.zIndex = zIndex
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

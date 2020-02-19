<template>
    <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots">
        <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { addClass } from 'common/js/dom'

  export default {
    name: 'slider',
    props: {
      // 循环轮播
      loop: {
        type: Boolean,
        default: true
      },
      // 自动轮播
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 间隔时间
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted () {
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)
      // 当浏览器窗口改变的时候重新计算
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    activated () {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated () {
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    methods: {
      // 设置轮播图的宽度
      _setSliderWidth (isResize) {
        // 获取sliderGroup的所有子元素
        this.children = this.$refs.sliderGroup.children

        let width = 0
        // 拿到slider的宽度
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // !isResize 防止再改变窗口大小的时候加宽度
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      // 初始化slider
      // 用BScroll 横向滚动
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })
        this.slider.on('scrollEnd', this._onScrollEnd)
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      // 滑动结束
      _onScrollEnd () {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      },
      // 初始化小圆点
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      // 自动轮播
      _play () {
        this.timer = setTimeout(() => {
          this.slider.next(400)
        }, this.interval)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .slider
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        overflow: hidden
        box-sizing: border-box
        text-align: center
        a
          display: block
          overflow: hidden
          width: 100%
          img
            display: block
            width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>

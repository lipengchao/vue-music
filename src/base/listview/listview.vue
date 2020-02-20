<template>
  <scroll
    class="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType = "probeType"
    @onScroll="onScroll"
    ref="listview"
  >
    <ul>
      <li v-for="(group, index) in data" class="list-group" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item in group.items" :key="item.id" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="index"
          class="item"
          :class="{current: currentIndex === index }"
          :data-index="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{ fixedTitle }}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { getData } from 'common/js/dom'
  // 每个字母所占的高度
  const ANCHOR_HEIGHT = 18
  // title的高度
  const TITLE_HEIGHT = 30

  export default {
    name: 'listview',
    components: {
      Scroll,
      Loading
    },
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    },
    created () {
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    data () {
      return {
        currentIndex: 0,
        scrollY: -1,
        // 当滚动的位置上限 - scrollY
        diff: -1
      }
    },
    computed: {
      // 右侧字母快速入口列表
      shortcutList () {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      // 固定导航栏标题
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY (newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部时，newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        newY = Math.abs(newY)
        // 在中间部份滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (newY >= height1 && newY < height2) {
            this.currentIndex = i
            this.diff = height2 - newY
            return
          }
        }
        // 当滚动到底部，且newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      }
    },
    methods: {
      // 监听右侧字母快速导航栏点击事件
      onShortcutTouchStart (e) {
        let anchorIndex = parseInt(getData(e.target, 'index'))
        let startTouch = e.touches[0]
        this.touch.startY = startTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
        // this.currentIndex = anchorIndex
      },
      // 监听右侧字母快速导航栏移动事件
      onShortcutTouchMove (e) {
        let moveTouch = e.touches[0]
        this.touch.moveY = moveTouch.pageY
        // 计算滑动了几个字母
        // "| 0" 就相当于 Math.floor() 向下取整
        let delta = (this.touch.moveY - this.touch.startY) / ANCHOR_HEIGHT | 0
        // 计算滑动后的索引
        let anchorIndex = this.touch.anchorIndex + delta
        this._scrollTo(anchorIndex)
      },
      onScroll (pos) {
        this.scrollY = pos.y
      },
      _scrollTo (index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      // 计算每个list-group的高度
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .listview
    position: relative
    overflow: hidden
    width: 100%
    height: 100%
    .list-group
      padding-bottom: 30px
      .list-group-title
        padding-left: 20px
        height: 30px
        line-height: 30px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium

    .list-shortcut
      position: absolute
      right: 0
      top: 50%
      transform: translateY(-50%)
      padding: 20px 0
      width: 20px
      text-align: center
      border-radius: 10px
      font-family: Helvetica
      background: $color-background-d
      .item
        padding: 3px
        line-height: 1
        font-size: $font-size-small
        color: $color-text-l
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

<template>
    <div class="recommend">
      <div class="recommend-content">
        <!-- 轮播图 -->
        <div class="slider-wrapper">
          <div v-if="sliders.length" class="slider-content">
            <slider>
              <div v-for="item in sliders" :key="item.id">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <!-- 热门歌单推荐 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul></ul>
        </div>
      </div>
    </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import { getRecommend } from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    name: 'recommend',
    components: {
      Slider
    },
    data () {
      return {
        focus: []
      }
    },
    created () {
      this._getRecommend()
    },
    methods: {
      _getRecommend () {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.focus = res.focus.data.content
            console.log(this.focus)
          }
        })
      }
    },
    computed: {
      sliders () {
        const slider = []
        const jumpPrefix = 'https://y.qq.com/n/yqq/album/'
        if (this.focus) {
          for (let i = 0; i < this.focus.length; i++) {
            const item = this.focus[i]
            const sliderItem = {}
            sliderItem.id = item.id
            sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html'
            sliderItem.picUrl = item.pic_info.url
            slider.push(sliderItem)
          }
        }
        return slider || []
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .recommend
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        overflow: hidden
        width: 100%
        height: 0
        padding-bottom: 40%
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
</style>

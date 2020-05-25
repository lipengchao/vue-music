<template>
    <div class="recommend" ref="recommend">
      <scroll ref="scroll" class="recommend-content" :data="discList">
        <div>
          <!-- 轮播图 -->
          <div class="slider-wrapper">
            <div v-if="sliders.length" class="slider-content">
              <slider>
                <div v-for="item in sliders" :key="item.id">
                  <a :href="item.linkUrl">
                    <!-- fastclick 如果发现 class="needsclick" 就不会拦截-->
                    <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
                  </a>
                </div>
              </slider>
            </div>
          </div>
          <!-- 热门歌单推荐 -->
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li v-for="item in discList" :key="item.dissid" class="item" @click="selectItem(item)">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl" alt="">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { playlistMixin } from 'common/js/mixin'
  import { mapMutations } from 'vuex'
  import RecommendApi from 'api/recommend'
  import { ERR_OK } from 'api/config'

  export default {
    mixins: [playlistMixin],
    name: 'recommend',
    components: {
      Slider,
      Scroll,
      Loading
    },
    data () {
      return {
        sliders: [],
        discList: []
      }
    },
    created () {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      // 点击进入歌单详情页
      selectItem (item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      // 获取轮播图
      _getRecommend () {
        RecommendApi.getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.sliders = res.data.slider
          }
        })
      },
      // 获取推荐歌曲列表
      _getDiscList () {
        RecommendApi.getDiscList().then((res) => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      // 图片触发onload
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
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
        .item
          display: flex
          padding: 0 20px 20px 20px
          align-items: center
          .icon
            flex: 0 0 60px
            padding-right: 20px
            width: 60px
          .text
            display: flex
            overflow: hidden
            flex-direction: column
            flex: 1
            justify-content: center
            line-height: 20px
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

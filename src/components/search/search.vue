<template>
    <div class="search">
      <div class="search-box-wrapper">
        <search-box @query="onQueryChange" ref="searchBox"></search-box>
      </div>
      <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
        <scroll ref="shortcut" class="shortcut" :data="shortcut">
          <div>
            <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                <li @click="addQuery(key.k)" class="item" v-for="key in hotKeys" :key="key.n">
                  <span>{{ key.k }}</span>
                </li>
              </ul>
            </div>
            <div class="search-history" v-show="searchHistory.length">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <div class="clear" @click="showConfirm">
                  <i class="icon-clear"></i>
                </div>
              </h1>
              <search-list @delete="deleteOne" @select="addQuery" :searches="searchHistory"></search-list>
            </div>
          </div>
        </scroll>
      </div>
      <div class="search-result" v-show="query" ref="searchResult">
        <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
      </div>
      <confirm @confirm="clearSearchHistory" ref="confirm" title="清空所有历史记录吗"></confirm>
      <router-view></router-view>
    </div>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import { getHotKey } from 'api/search'
  import { ERR_OK } from 'api/config'
  import { mapActions } from 'vuex'
  import SearchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import Scroll from 'base/scroll/scroll'
  import { playlistMixin, searchMixin } from 'common/js/mixin'

  export default {
    mixins: [playlistMixin, searchMixin],
    name: 'search',
    components: {
      Scroll,
      Confirm,
      SearchList,
      SearchBox,
      Suggest
    },
    data () {
      return {
        hotKeys: []
        // 此处代码封装到searchMixin中
        // query: ''
      }
    },
    computed: {
      shortcut () {
        return this.hotKeys.concat(this.searchHistory)
      }
      // 此处代码封装到searchMixin中
      // ...mapGetters([
      //   'searchHistory'
      // ])
    },
    methods: {
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''

        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()

        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
      },
      // 点击热门搜索词查询
      // 此处代码封装到searchMixin中
      // addQuery (query) {
      //   this.$refs.searchBox.setQuery(query)
      // },
      // 此处代码封装到searchMixin中
      // onQueryChange (query) {
      //   this.query = query
      // },
      // 使input失去焦点
      // 此处代码封装到searchMixin中
      // blurInput () {
      //   this.$refs.searchBox.blur()
      // },
      // 存储数据
      // 此处代码封装到searchMixin中
      // saveSearch () {
      //   this.saveSearchHistory(this.query)
      // },
      // 删除数据
      deleteOne (item) {
        this.deleteSearchHistory(item)
      },
      // 清空历史数据
      showConfirm () {
        this.$refs.confirm.show()
      },
      _getHotKey () {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKeys = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions([
        // 此处代码封装到searchMixin中
        // 'saveSearchHistory',
        // 此处代码封装到searchMixin中
        // 'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
    watch: {
      query (newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    created () {
      this._getHotKey()
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>

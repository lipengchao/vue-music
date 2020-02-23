<template>
    <div class="search-box">
      <i class="icon-search"></i>
      <input class="box" v-model="query" :placeholder="placeholder">
      <i v-show="query" class="icon-dismiss" @click="clear"></i>
    </div>
</template>

<script>
  export default {
    name: 'search-box',
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query: ''
      }
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      }
    },
    created () {
      // query发生改变时派发事件
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .search-box
      display: flex
      align-items: center
      box-sizing: border-box
      width: 100%
      padding: 0 6px
      height: 40px
      border-radius: 6px
      background: $color-highlight-background
      .icon-search
        font-size: 24px
        color: $color-background
      .box
        flex: 1
        margin: 0 5px
        line-height: 18px
        color: $color-text
        font-size: $font-size-medium
        outline: none
        /*caret-color: $color-text-d*/
        background: $color-highlight-background
        &::placeholder
          color: $color-text-d
      .icon-dismiss
        font-size: 16px
        color: $color-background
</style>

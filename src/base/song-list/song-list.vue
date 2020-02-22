<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs" :key="song.id">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
        </div>
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'song-list',
    props: {
      songs: {
        type: Array,
        default () {
          return []
        }
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      getDesc (song) {
        return `${song.singer}·${song.album}`
      },
      // 奖杯class
      getRankCls (index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      // 奖杯文案
      getRankText (index) {
        if (index > 2) {
          return index + 1
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('./imgs/first')
          &.icon1
            bg-image('./imgs/second')
          &.icon2
            bg-image('./imgs/third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        overflow: hidden
        line-height: 20px
        .name
          color: $color-text
          no-wrap()
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d

</style>

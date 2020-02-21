<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs" :key="song.id">
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
      }
    },
    methods: {
      selectItem (item, index) {
        this.$emit('select', item, index)
      },
      getDesc (song) {
        return `${song.singer}·${song.album}`
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

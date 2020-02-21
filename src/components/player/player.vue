<template>
    <div class="player" v-show="playlist.length">
      <div class="normal-player" v-show="fullScreen">
        播放器
      </div>
      <div class="mini-player" v-show="!fullScreen"></div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'player',
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .player
    .normal-player
      position: fixed
      z-index: 150
      top: 0
      bottom: 0
      left: 0
      right: 0
      background: $color-background
    .mini-player
      position: fixed
      z-index: 180
      left: 0
      bottom: 0
      width: 100%
      height: 60px
      background: $color-highlight-background
</style>

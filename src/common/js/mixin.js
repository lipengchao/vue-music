/**
 * @author lenovo
 * @date 2020/2/22 19:18
 */
import { mapGetters } from 'vuex'
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  watch: {
    playlist (newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist () {
      throw new Error('component must implement handlePlaylist method')
    }
  },
  mounted () {
    this.handlePlaylist(this.playlist)
  },
  activated () {
    this.handlePlaylist(this.playlist)
  }
}

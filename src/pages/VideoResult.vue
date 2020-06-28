<template>
  <q-page class="row center justify-center">
    <div v-if="searching" class="SearchResultsSpinner column justify-center">
      <q-spinner-bars
        color="primary"
        size="2em"
      />
      <div>Searching</div>
    </div>
      <video-player
      :videoUrl="this.videoUrl"
      :episodeData="this.$props.episodeData"
      >
      </video-player>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import VideoPlayer from 'components/VideoPlayer.vue'

export default Vue.extend({
  name: 'VideoResult',
  props: [
    'animeName',
    'episode',
    'episodeData'
  ],
  components: { VideoPlayer },
  mounted () {
    this.grabSearchData(this.$props.animeName, this.$props.episode)
  },
  methods: {
    async grabSearchData (name: string, ep: string) {
      this.searching = true
      return await this.$axios.get(
          `http://157.245.246.238:3000/getvideolink?anime=${name}&episode=${ep}`,
          {
            headers: { 'Access-Control-Allow-Origin': '*' }
          }
      )
        .then((response) => {
          if (response.status === 404 || (response.status === 200 && response.data.length === 0)) {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'We searched high and low. We could not find any anime to match your search.',
              icon: 'report_problem'
            })
            this.searching = false
            return
          }
          this.$q.notify({
            color: 'positive',
            position: 'top',
            message: 'Loading success',
            icon: 'check'
          })
          this.searching = false
          this.videoUrl = response.data.videoLink
          console.log(response.data.videoLink)
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Failed to grab video',
            icon: 'report_problem'
          })
          this.searching = false
        })
    }
  },
  data () {
    return {
      videoUrl: '',
      searching: false
    }
  }
})
</script>

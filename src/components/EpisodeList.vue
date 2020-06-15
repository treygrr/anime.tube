<template>
<div class="q-pa-md SearchCardWrapper row">
  <div v-for="anime in episodeData" :key="anime.id" class="q-pa-xs" style="width: 33%;">
    <q-btn push color="white" text-color="primary" icon="movie" style="width: 100%;">{{ anime.title }}</q-btn>
  </div>
</div>
</template>

<style lang="sass">
.SearchCardWrapper
  width: 100%
  .SearchCard
    width: 100%
</style>

<script>

export default {
  name: 'EpisodeList',
  props: {
    searchTerm: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    episodeData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async getVideoUrl (animeName, episode) {
      return await this.$axios.get(
          `http://localhost:3001/getvideolink?anime=${animeName}&episode=${episode}`,
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
          console.log(response)
          this.episodeData = response.data
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: err,
            icon: 'report_problem'
          })
          this.searching = false
        })
    }
  },
  data () {
    return {
      videoLink: ''
    }
  }
}

</script>

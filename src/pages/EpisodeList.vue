<template>
  <q-page class="row-reverse items-center justify-evenly">
    <div v-if="searching" class="SearchResultsSpinner column items-center">
      <q-spinner-bars
        color="primary"
        size="2em"
      />
      <div class="q-pt-md">Searching</div>
    </div>
    <episode-list
        v-if="passingData.length > 0"
        active
        :episodeData="this.passingData"
    />

  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

import EpisodeList from 'components/EpisodeList.vue'

export default Vue.extend({
  name: 'SearchResults',
  props: [
    'animeTitle',
    'episodeData'
  ],
  watch: {
    searchTerm: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.grabSearchData(newVal)
      if (this.$props.animeTitle === '') {
        if (this.$route.path !== '') this.$router.push({ name: 'home' })
      }
    }
  },
  components: { EpisodeList },
  mounted () {
    if (this.$props.episodeData) {
      this.passingData = this.$props.episodeData
      return
    }
    if (this.$props.animeTitle === '') return
    this.grabSearchData(this.$props.animeTitle)
  },
  methods: {
    async grabSearchData (animeName: string) {
      this.passingData = []
      if (animeName === '') return
      this.searching = true
      return await this.$axios.get(
          `http://157.245.246.238:3001/getepisodes?anime=${this.$props.animeTitle}`,
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
          this.passingData = response.data
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
      searching: false,
      passingData: []
    }
  }
})
</script>

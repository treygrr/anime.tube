<template>
  <div class="q-pa-md SearchCardWrapper row" v-if="episodeData.length > 0">
    <div
      v-for="anime in episodeData"
      :key="anime.id"
      class="q-pa-xs"
      style="width: 33%;"
    >
      <q-btn
        push
        color="white"
        @click="getToVideoUrl(anime.title, anime.animeName, episodeData)"
        text-color="primary"
        icon="movie"
        style="width: 100%;"
      >
        {{ anime.seoTitle }}
      </q-btn>
    </div>
  </div>
</template>

<style lang="scss">
.SearchCardWrapper {
  // width: 100%;

  // .SearchCard {
  //   width: 100%;
  // }
}
</style>

<script>
export default {
  name: 'EpisodeList',
  props: ['episodeData'],
  methods: {
    getToVideoUrl (episode, animeName, episodeData) {
      if (this.$route.path !== '') {
        this.$router.push({
          name: 'video',
          params: { animeName: animeName, episode: episode, episodeData }
        })
      }
      console.log(episode, animeName, 'this on eipose list thing')
    }
  }
}
</script>

<style lang="scss">
.search-results {
  //
}
</style>

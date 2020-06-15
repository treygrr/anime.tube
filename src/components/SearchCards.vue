<template>
<div class="q-pa-xs SearchCardWrapper">
  <div v-for="anime in animeSearchData" :key="anime.id" class="q-pa-xs">
      <q-card @click="lol()" class="SearchCard">
        <q-card-section horizontal>
            <q-img
            class="col-5"
            :src="`https://www.animefreak.tv/meta/anime/${anime.anime_id}/${anime.seo_name}.jpg`"
            />

            <q-card-section>
            {{ anime.name }}
            </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn glossy color="light-blue-9" label="Type: Movie" v-if="anime.episodes[0].episode_name === 'Movie'">
            </q-btn>
            <q-btn glossy color="red-9" v-else-if="anime.episodes[0].episode_name === 'Special'">
              Type: Special
            </q-btn>
            <q-btn glossy color="purple-9" label="Series" v-else>
            </q-btn>
          <q-btn flat>
          Rating: {{ anime.score }} / 10
          </q-btn>
          <q-btn flat color="primary">
          Watch {{ anime.seo_name }} now
          </q-btn>
          <q-btn :click="setAnimeTitle()" clickable>watch now</q-btn>
        </q-card-actions>
      </q-card>
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
  name: 'SearchCards',
  props: {
    searchTerm: {
      default: ''
    },
    animeSearchData: {
      default: () => []
    }
  },
  data () {
    return {
      animeTitle: ''
    }
  },
  methods: {
    setAnimeTitle () {
      console.log('I got clicked to set a name.')
      // this.$emit('setAnimeTitle')
    }
  }
}
</script>

<template>
<div class="q-pa-xs SearchCardWrapper">
  <div v-for="anime in animeSearchData" :key="anime.name" class="q-pa-xs">
      <q-card class="SearchCard">
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
          <q-btn v-if="anime.seo_name"
            @click="setAnimeTitle(anime.seo_name)"
            flat
            class="text-primary"
            style="width:100%;"
            >watch now</q-btn
          >
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SearchCards',
  computed: {
    ...mapGetters(['name'])
  },
  props: [
    'animeSearchData'
  ],
  methods: {
    ...mapMutations(['SET_ANIME_NAME']),
    setAnimeTitle (val) {
      console.log('I got clicked to set a name.', val)
      this.SET_ANIME_NAME(val)

      if (this.$route.path !== '') this.$router.push({ name: 'episodes', params: { animeTitle: val } })
    }
  }
}
</script>

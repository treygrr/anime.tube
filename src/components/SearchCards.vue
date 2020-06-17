<template>
<div v-if="this.$props.animeSearchData" class="q-pa-xs q-pa-md row justify-evenly q-gutter-md ">
  <div v-for="anime in filteredResults(this.$props.animeSearchData)" :key="anime.name" class="q-pa-xs SearchCard">
    <q-card class="my-card">
      <q-img :src="`https://www.animefreak.tv/meta/anime/${anime.anime_id}/${anime.seo_name}.jpg`">
        <div class="absolute-bottom">
          <div class="text-h6">{{ anime.name }}</div>
          <div v-if="anime.episodes[0].episode_name != 'Movie' && anime.episodes[0].episode_name != 'Special'" class="text-subtitle2">Latest: {{ anime.episodes[0].episode_name }}</div>
        </div>
      </q-img>

      <q-card-actions>
        <q-btn glossy color="light-blue-9" label="Movie" v-if="anime.episodes[0].episode_name === 'Movie'">
        </q-btn>
        <q-btn glossy color="red-9" v-else-if="anime.episodes[0].episode_name === 'Special'">
          Special
        </q-btn>
        <q-btn glossy color="purple-9" label="Series" v-else>
        </q-btn>
        <q-btn flat>
          Rating: {{ anime.score }} / 10
        </q-btn>
        <q-btn v-if="anime.seo_name"
          glossy
          color="green-9"
          @click="setAnimeTitle(anime.seo_name)"
          class="text-primary"
          >watch now
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</div>
</template>

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
      this.SET_ANIME_NAME(val)
      if (this.$route.path !== '') this.$router.push({ name: 'episodes', params: { animeTitle: val } })
    },
    filteredResults: function (yeet) {
      const results = yeet
      const type = results
      return type.filter(function (name) {
        if (name.episodes[0].episode_name === 'Special') return
        if (name.episodes[0].episode_name === 'Movie') return
        return name.episodes[0].episode_name
      })
    }
  }
}
</script>

<template>
  <!-- Card Wrapper -->
  <div v-if="this.$props.animeSearchData" class="q-pa-md row justify-center">
    <!-- Anime Card -->
    <q-card
      v-for="anime in filteredResults(this.$props.animeSearchData)"
      :key="anime.name"
      class="q-ma-md"
    >
      <q-card-section
        class="no-padding card-image q-img__content"
        :style="
          `background-image: url('https://www.animefreak.tv/meta/anime/${anime.anime_id}/${anime.seo_name}.jpg')`
        "
      >
        <!-- Card Label -->
        <div class="absolute-bottom">
          <div class="text-h6 ellipsis">{{ anime.name }}</div>

          <!-- If not movie or special -->
          <div
            v-if="
              anime.episodes[0].episode_name != 'Movie' &&
                anime.episodes[0].episode_name != 'Special'
            "
            class="text-subtitle2"
          >
            Latest: {{ anime.episodes[0].episode_name }}
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="row justify-between">
        <q-btn
          glossy
          color="light-blue-9"
          label="Movie"
          v-if="anime.episodes[0].episode_name === 'Movie'"
        />

        <q-btn
          glossy
          color="red-9"
          label="special"
          v-else-if="anime.episodes[0].episode_name === 'Special'"
        />

        <q-btn glossy color="purple-9" label="Series" v-else class="no-hover" />

        <span class="q-mx-sm text-subtitle2">
          Rating: {{ anime.score }} / 10
        </span>

        <q-btn
          v-if="anime.seo_name"
          glossy
          color="green-9"
          @click="setAnimeTitle(anime.seo_name)"
          class="text-primary"
          label="Watch Now"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SearchCards',
  computed: {
    ...mapGetters(['name'])
  },

  props: ['animeSearchData'],

  methods: {
    ...mapMutations(['SET_ANIME_NAME']),

    setAnimeTitle (val) {
      this.SET_ANIME_NAME(val)
      if (this.$route.path !== '') {
        this.$router.push({ name: 'episodes', params: { animeTitle: val } })
      }
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

<style lang="scss">
// Maintains consistent sizing for all card images
.card-image {
  background-repeat: no-repeat;
  background-size: cover;
  height: 425px;
  width: 325px;
}

// Removes hover from series/move button to look more like a badge
.no-hover {
  &:hover {
    cursor: initial;
    opacity: 1;
  }
}
</style>

<template>
  <q-page class="flex flex-center">
    <div v-if="searching" class="column text-center">
      <q-spinner-bars color="primary" size="2em" class="q-mx-auto" />
      <div class="q-pa-sm">Searching</div>
    </div>

    <search-cards active :animeSearchData="animeSearchData" />
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchCards from 'components/SearchCards.vue'

export default Vue.extend({
  name: 'SearchResults',
  props: ['searchTerm'],
  watch: {
    searchTerm: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.grabSearchData(newVal)
      if (this.searchTerm === '') {
        if (this.$route.path !== '') this.$router.push({ name: 'home' })
      }
    }
  },
  components: { SearchCards },
  mounted () {
    if (this.searchTerm === '') return
    this.grabSearchData(this.searchTerm)
  },
  methods: {
    setAnimeTitle (val: string) {
      console.log('we pushed to page')
      // this.animeTitleProp = val
      console.log(val)
    },
    async grabSearchData (animeName: string) {
      this.animeSearchData = []
      if (animeName === '') return
      this.searching = true
      return await this.$axios
        .get(`http://157.245.246.238:3000/search?anime=${animeName}`, {
          headers: { 'Access-Control-Allow-Origin': '*' }
        })
        .then(response => {
          if (
            response.status === 404 ||
            (response.status === 200 && response.data.length === 0)
          ) {
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: 'We could not find any anime that matched your search.',
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
          this.animeSearchData = response.data
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
      animeTitleProp: '',
      searching: false,
      animeSearchData: []
    }
  }
})
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="searching" class="SearchResultsSpinner column items-center">
      <q-spinner-bars
        color="primary"
        size="2em"
      />
      <div>Searching</div>
    </div>
    <search-cards v-if="animeSearchData.length > 0"
      active
      :animeSearchData="animeSearchData"
    ></search-cards>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchCards from 'components/SearchCards.vue'

export default Vue.extend({
  name: 'SearchResults',
  props: [
    'searchTerm'
  ],
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
    console.log('hi')
    this.grabSearchData(this.searchTerm)
  },
  methods: {
    async grabSearchData (animeName: string) {
      this.animeSearchData = []
      if (animeName === '') return
      this.searching = true
      return await this.$axios.get(
          `http://localhost:3001/search?anime=${animeName}`,
          {
            headers: { 'Access-Control-Allow-Origin': '*' }
          }
      )
        .then((response) => {
          if (response.status === 404 || (response.status === 200 && response.data.length === 0)) {
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

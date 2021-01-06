<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      style="height: 125px;"
      class="q-pt-sm q-mb-none q-pb-none"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawer = !leftDrawer"
        />

        <q-toolbar-title>
          anime.tube
        </q-toolbar-title>

        <div>beta v1.0</div>
      </q-toolbar>
      <!-- Search input -->
      <q-input
        filled
        class="MainLayout-Input q-pa-none q-ma-none absolute-bottom"
        @keydown.enter.prevent="submit('myInput')"
        ref="myInput"
        style="color:white;"
        label="Search"
        label-color="white"
        v-model="text"
        clearable
        dark
      >
        <template v-slot:prepend>
          <q-icon name="search" color="white" />
        </template>
      </q-input>
    </q-header>

    <!-- Navigation Drawer -->
    <q-drawer v-model="leftDrawer" bordered content-class="bg-grey-1">
      <q-list class="q-pa-md">
        <q-item clickable v-ripple :to="{ name: 'home' }">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            Home
          </q-item-section>
        </q-item>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view :searchTerm="this.searchTerm" :animeName="animeTitle">
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },
  methods: {
    submit (refKey) {
      // Setting the variable only when submitted
      this.test = this.$refs[refKey].model
      this.getSearchResults(this.text)
      if (this.searchTerm === null) {
        this.searchTerm = ''
      }
      if (this.$route.path !== '/search') this.$router.push('/search')
    },
    getSearchResults (searchTerm) {
      this.searchTerm = searchTerm
    }
  },
  data () {
    return {
      animeTitle: '',
      text: '',
      searchTerm: '',
      leftDrawer: false,
      essentialLinks: [
        {
          title: 'Developer',
          caption: 'Trey',
          icon: 'code',
          link: 'https://github.com/treygrr'
        }
      ]
    }
  }
}
</script>

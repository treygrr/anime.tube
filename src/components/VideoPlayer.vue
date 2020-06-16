<template>
<div class="q-pa-md SearchCardWrapper column" v-if="this.$props.videoUrl">
  <q-btn @click="goback">Back to Episodes</q-btn>
  <div>
    <div>
    <q-video
      :src="this.$props.videoUrl"
    />
  </div>
</div>
</div>
</template>

<script>

export default {
  name: 'VideoPlayer',
  props: [
    'videoUrl'
  ],
  mounted () {
    console.log(this.$props.videoUrl)
    this.getToVideoUrl(this.$props.videoUrl)
  },
  methods: {
    goback () {
      this.$router.push({ name: 'episodes' })
    },
    getToVideoUrl (link) {
      this.link = link
      console.log(this.link)
    }
  }
}

</script>

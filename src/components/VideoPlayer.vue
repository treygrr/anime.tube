<template>
<div class="q-pa-md" style="width: 100%;" v-if="this.$props.videoUrl">
  <q-btn @click="goback" style="width: 100%; max-height: 70px;">Back to Episodes</q-btn>
  <video controls class="videoPlayer" autoplay>
    <source :src="this.$props.videoUrl" type="video/mp4">
    <source :src="this.$props.videoUrl" type="video/ogg">
  </video>
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

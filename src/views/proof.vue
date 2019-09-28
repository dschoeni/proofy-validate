<template>
  <div>
    <div class="d-flex flex-column align-items-center">
      <b-form-input v-model="url" placeholder="https://www.example.com"></b-form-input>

      <div class="btn-group">
        <button class="btn btn-primary my-4" :disabled="!url" @click="notarize(url)">Generate Proof</button>
        <a
          class="btn btn-secondary my-4"
          :href="'data:' + downloadData"
          :class="{ 'disabled': !downloadData, 'btn-success': downloadData }"
          download="notarized.proof"
        >Download Proof</a>
      </div>
    </div>

    <hr />

    <Diff :proofs="proofs" />
  </div>
</template>

<script>
import validationService from '@/services/validator'

export default {
  name: 'Notarize',
  components: {
    Diff: () => import('@/views/diff.vue')
  },
  mounted() {
    if (this.$route.query.url) {
      this.url = this.$route.query.url
      this.notarize(this.url)
    }
  },
  methods: {
    async notarize(url) {
      if(!url.startsWith('http')){
        url = 'https://' + url
      }
      this.proofs = []

      await Promise.all(
        this.validators.map(async validator => {
          const response = await fetch(`https://proof.viser.ch?url=${encodeURIComponent(url)}`)
          const jsonAnswer = await response.json()
          jsonAnswer.validator = validator.key
          jsonAnswer.url = url
          this.proofs.push(jsonAnswer)
        })
      )

      this.downloadData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.proofs))
    }
  },
  data() {
    return {
      validators: validationService.validators(),
      url: 'https://www.example.com',
      fileSrc: '',
      downloadData: null,
      proofs: []
    }
  }
}
</script>

<style scoped>
.iframe {
  width: 100%;
  min-height: 300px;
  border: 1px solid green;
}
</style>

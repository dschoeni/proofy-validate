<template>
  <div>
      <div class="d-flex flex-column align-items-center">
        <div class="col-10">
        
        <b-form-input v-model="url" placeholder="Enter URL to notarize"></b-form-input>

        <div class="btn-group">
          <button class="btn btn-success my-4" :disabled="!url" @click="notarize(url)">Generate Proof</button>
          <a class="btn btn-secondary my-4" :href="'data:' + downloadData" :class="{ 'disabled': !downloadData, 'btn-success': downloadData }" download="notarized.proof">Download Proof</a>
        </div>

        </div>
        <div class="col-12" v-if="proofs.length > 0">
          <Diff :proofs="proofs" />
        </div>
      </div>
  </div>
</template>

<script>
import validationService from '@/services/validator'

export default {
  name: "Notarize",
  components: {
    Diff: () => import('@/views/diff.vue')
  },
  methods: {
    async notarize(url) {
      this.proofs = []

      await Promise.all(this.validators.map(async (validator) => {
        const response = await fetch(`https://proof.viser.ch?url=${encodeURIComponent(url)}`)
        const jsonAnswer = await response.json()
        jsonAnswer.validator = validator.key
        jsonAnswer.url = url
        this.proofs.push(jsonAnswer)
      }))
      
      this.downloadData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.proofs));
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
};
</script>

<style scoped>
.iframe {
  width: 100%;
  min-height: 300px;
  border: 1px solid green;
}
</style>

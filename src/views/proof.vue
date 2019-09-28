<template>
  <div>
      <div class="d-flex flex-column align-items-center">
        <div class="col-10">
        
        <b-form-input v-model="url" placeholder="Enter URL to notarize"></b-form-input>

        <button class="btn btn-primary my-4" :disabled="!url" @click="notarize(url)">Notarize</button>

        <a class="btn btn-primary my-4" :href="'data:' + downloadData" :class="{ 'disabled': !downloadData }" download="notarized.proof">Download Proof</a>

        </div>
        <div class="col-12">
          <iframe :srcdoc="fileSrc" class="iframe"></iframe>
        </div>
      </div>
  </div>
</template>

<script>
import validationService from '@/services/validator'

export default {
  name: "Notarize",
  methods: {
    async notarize(url) {
      const validatedData = []

      await Promise.all(this.validators.map(async (validator) => {
        const response = await fetch(`https://proof.viser.ch?url=${encodeURIComponent(url)}`)
        const jsonAnswer = await response.json()
        jsonAnswer.validator = validator.key
        validatedData.push(jsonAnswer)
      }))
      
      this.downloadData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(validatedData));
    }
  },
  data() {
    return {
      validators: validationService.validators(),
      url: null,
      fileSrc: '',
      downloadData: null
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

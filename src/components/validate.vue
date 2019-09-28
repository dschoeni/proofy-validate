<template>
  <div>
      <div class="d-flex justify-content-center">
        <div class="col-6">
        <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
        />

        <button class="btn btn-primary" :disabled="!fileContent" @click="validate(fileContent)">Validate</button>

        {{ isValidated }}

        <div class="validators">
            
        </div>

        <iframe v-if="isValidated" :srcdoc="fileSrc">

        </iframe>
      </div>
      </div>
  </div>
</template>

<script>
import validationService from '@/services/validator'

export default {
  name: "Validate",
  watch: {
    file(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.fileContent = JSON.parse(event.target.result)
      }
      reader.readAsText(file)
    }
  },
  methods: {
    async validate(fileContent) {
      console.log(fileContent)

      const hashOfSource = await window.crypto.subtle.digest(
        "SHA-256",
        new TextEncoder("utf-8").encode(fileContent.signed.timestamp + fileContent.signed.source)
      );

      const result = await validationService.validate(fileContent.signature, hashOfSource)
      
      this.fileSrc = fileContent.signed.source
      this.isValidated = result
    }
  },
  data() {
    return {
      fileContent: null,
      isValidated: false,
      file: null
    }
  }
};
</script>

<style scoped>
.test {

}
</style>

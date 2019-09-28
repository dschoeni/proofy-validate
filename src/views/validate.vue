<template>
  <div>
      <div class="d-flex flex-column align-items-center">
        <div class="col-10">
        <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
        />

        <button class="btn btn-primary my-4" :disabled="!fileContent" @click="validate(fileContent)">Validate</button>

        <div class="validators d-flex flex-row justify-content-center">
          <div class="validator px-3" v-for="validator in validators" :key="validator.key">
            <shield-icon size="3x"  :style="{ color: validator.validated ? 'green' : 'red' }"></shield-icon><br>
            {{ validator.label }}
          </div>           
        </div>

        </div>
        <div class="col-12">
          <Diff :proofs="fileSrcArray" :current="fileSrcArray[0]" />
        </div>
      </div>
  </div>
</template>

<script>
import validationService from '@/services/validator'
import { ShieldIcon } from 'vue-feather-icons'
import Diff from '@/views/diff.vue'

export default {
  name: "Validate",
  components: {
    ShieldIcon,
    Diff
  },
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

      await Promise.all(fileContent.map(async (validationPart) => {
        const hashOfSource = await window.crypto.subtle.digest("SHA-256",
          new TextEncoder("utf-8").encode(validationPart.signed.timestamp + validationPart.signed.source)
        );

        const result = await validationService.validate(validationPart.signature, hashOfSource)

        const correctValidator = this.validators.find(validator => validator.key === validationPart.validator).validated = result
        this.fileSrcArray.push(validationPart) 
      }))
    }
  },
  data() {
    return {
      validators: validationService.validators(),
      fileSrcArray: [],
      fileContent: null,
      file: null
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

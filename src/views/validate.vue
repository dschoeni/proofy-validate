<template>
  <div>
      <div class="d-flex flex-column align-items-center">
        <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
        />

        <button class="btn btn-primary my-4" :disabled="!fileContent" @click="validate(fileContent)">Validate</button>

        <div class="card bg-white m-4 p-4 validators d-flex flex-row justify-content-center text-center">
          <div class="validator px-3" v-for="validator in validators" :key="validator.key">
            <shield-icon size="3x" class="non-validated" :class="{ 'validated' : validator.validated }"></shield-icon><br>
            {{ validator.label }}
          </div>           
        </div>

        </div>
        
        <hr />

        <Diff :proofs="fileSrcArray" :current="current" />
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
  computed: {
    validators() {
      return validationService.validators
    } 
  },
  methods: {
    async validate(fileContent) {
      this.fileSrcArray.length = 0
      
      await Promise.all(fileContent.map(async (validationPart) => {
        const hashOfSource = await window.crypto.subtle.digest("SHA-256",
          new TextEncoder("utf-8").encode(validationPart.signed.timestamp + validationPart.signed.source)
        );

        const result = await validationService.validate(validationPart.signature, hashOfSource)

        const correctValidator = this.validators.find(validator => validator.key === validationPart.validator).validated = result
        this.fileSrcArray.push(validationPart) 
      }))

      const response = await fetch(`https://proof.viser.ch?url=${encodeURIComponent(fileContent[0].url)}`)
      this.current = await response.json()
    }
  },
  data() {
    return {
      current: null,
      fileSrcArray: [],
      fileContent: null,
      file: null
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../custom.scss';

.non-validated {
  color: $green;
}

.validated {
  color: $blue
}

.iframe {
  width: 100%;
  min-height: 600px;
  border: 1px solid white;
  background-color: white;
}
</style>

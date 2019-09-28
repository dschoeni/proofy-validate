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
            <font-awesome-icon size="3x" :icon="['fal', validator.validated ? 'shield-check' : 'shield']" :style="{ color: validator.validated ? 'green' : 'red' }" /><br>
            {{ validator.label }}
          </div>           
        </div>

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
      const hashOfSource = await window.crypto.subtle.digest(
        "SHA-256",
        new TextEncoder("utf-8").encode(fileContent.signed.timestamp + fileContent.signed.source)
      );

      const result = await validationService.validate(fileContent.signature, hashOfSource)

      this.validators.forEach((validator) => {
        setTimeout(() => {
          validator.validated = result
        }, Math.floor(Math.random() * 500) + 1)
      })

      this.fileSrc = fileContent.signed.source
      this.isValidated = result
    }
  },
  data() {
    return {
      validators: [{
        key: 'swisslex',
        label: 'Swisslex',
        validated: false
      },{
        key: 'schellenberg',
        label: 'Schellenberg Wittmer',
        validated: false
      },{
        key: 'kellerhals-carrard',
        label: 'Kellerhals Carrard',
        validated: false
      },{
        key: 'niederer-kraft-frey',
        label: 'Niederer Kraft Frey',
        validated: false
      }],
      fileSrc: "",
      fileContent: null,
      isValidated: false,
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

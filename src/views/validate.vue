<template>
  <div>
      <div class="d-flex flex-column align-items-center">
        <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
        />

        <div class="btn-group">
          <button class="btn btn-primary my-4" :disabled="!fileContent" @click="validate(fileContent)">Validate</button>
          <button class="btn btn-outline-primary my-4" :class="{ 'btn-success': fileSrcArray.length > 0 }" :disabled="fileSrcArray.length === 0" @click="createDiffs">Create Diffs</button>
        </div>

        <div v-if="hasBeenTampered" class="alert alert-danger">
          Warning: This proof has been tampered with. Check the invidiual proofs below to see which one was modified.
        </div>

      </div>

    <div v-if="generatingDiffs" class="text-center text-white py-3">
      <font-awesome-icon spin :icon="['fas', 'circle-notch']" />
      Finding differences to current version...
    </div>

    <hr />

    <Diff 
    :proofs="fileSrcArray"
    :validationResults="validationResults"
    :diffs="diffs"
    />
  </div>
</template>

<script>
import validationService from '@/services/validator'
import Diff from '@/views/diff.vue'
import HtmlDiff from 'htmldiff-js'

export default {
  name: "Validate",
  components: {
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
    async createDiffs() {
      this.generatingDiffs = true

      const response = await fetch(`https://proof.viser.ch?url=${encodeURIComponent(this.fileContent[0].url)}`)
      const current = await response.json()

      this.diffs = await Promise.all(this.fileSrcArray.map(async proof => {

        // demo
        const demoSource = current.signed.source.replace(' und absolut rostfrei.', '.')

        // if tampered, highlight the difference, else to current
        let diff = await (new Promise((resolve, reject) => {
          return resolve(this.validationResults[proof.validator] ? HtmlDiff.execute(proof.signed.source, demoSource) : HtmlDiff.execute(demoSource, proof.signed.source))
        }))

        // let diff = HtmlDiff.execute(proof.signed.source, this.current.signed.source)

        diff += `
          <style>
          ins {
            background: lightgreen;
            text-decoration: none;
          }

          del {
            background: pink;
          }
          </style>
        `

        return {
          signed: {
            source: diff
          }
        }
      }))

      console.log(this.diffs)
      
      this.generatingDiffs = false
    },
    async validate(fileContent) {
      this.fileSrcArray.length = 0
      this.hasBeenTampered = false

      this.fileSrcArray.push(...await Promise.all(fileContent.map(async (validationPart) => {
        const hashOfSource = await window.crypto.subtle.digest("SHA-256",
          new TextEncoder("utf-8").encode(validationPart.signed.timestamp + validationPart.signed.source)
        );

        const result = await validationService.validate(validationPart.signature, hashOfSource)

        if (!result) {
          this.hasBeenTampered = true
        }

        this.validationResults[validationPart.validator] = result

        return validationPart
      })))
    }
  },
  data() {
    return {
      generatingDiffs: false,
      diffs: [],
      hasBeenTampered: false,
      validationResults: {},
      fileSrcArray: [],
      fileContent: null,
      file: null
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../custom.scss';

.failed {
  color: $red;
}

.non-validated {
  color: $dark;
}

.validated {
  color: $green;
}
</style>

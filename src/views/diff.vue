<template>
    <b-tabs pills justified content-class="mt-3">
      <b-tab v-for="(validator, index) in validators" :key="validator.key" :disabled="!proofs[index]">
        <template v-slot:title>
          <font-awesome-icon v-if="validator.isGenerating" spin :icon="['fas', 'circle-notch']" />
          <font-awesome-icon v-if="proofs[index]" :icon="['fas', 'file-alt']" />
           {{ validator.label }}
        </template>

        <div v-if="proofs[index]">
          <div><small>Hash: <br><span class="text-white">{{ convertToString(proofs[index].hash) }}</span></small></div>
          <div class="pb-3"><small>Signature: <br><span class="text-white">{{ convertToString(proofs[index].signature) }}</span></small></div>

          <iframe sandbox class="iframe" v-if="diffs[index]" :srcDoc="baseUrlCorrection(diffs[index])" />
          <iframe sandbox class="iframe" v-if="!diffs[index]" :srcDoc="baseUrlCorrection(proofs[index])" />
        </div>
      </b-tab>
    </b-tabs>
</template>

<script>
import HtmlDiff from 'htmldiff-js'
import validationService from '@/services/validator'

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};

export default {
  name: "Diff",
  props: ['proofs', 'current', { name: 'isGenerating', default: false }],
  methods: {
    baseUrlCorrection(proof) {
      return proof.signed.source.insert(proof.signed.source.indexOf('<head>'), `<base href="${proof.url}" />`)
    },
    convertToString(arrayBuffer) {
      return buf2hex(new Uint8Array(arrayBuffer).buffer)
    }
  },
  computed: {
    validators() {
      return validationService.validators
    },
    diffs() {
      return this.proofs.map(proof => {
        if (!this.current) {
          return null
        }

        // demo
        this.current.signed.source = this.current.signed.source.replace(' und absolut rostfrei.', '.')

        let diff = HtmlDiff.execute(this.current.signed.source, proof.signed.source)

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

        return diff
      })
    }
  }
};
</script>

<style lang="scss">
.nav-link.disabled {
  opacity: 0.5;
}
.nav .nav-link.active:hover {
  color: white !important;
}

.iframe {
  width: 100%;
  min-height: 800px;
  border: 1px solid white;
  background: white;
}
</style>

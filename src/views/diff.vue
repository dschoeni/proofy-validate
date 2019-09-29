<template>
  <div>
    <b-tabs pills justified content-class="mt-3">
      <b-tab v-for="(validator, index) in validators" :key="validator.key" 
      :disabled="!proofs[index]"
      :title-link-class="validationResults && validationResults[validator.key] === false ? ['tampered'] : []">
        <template v-slot:title>
          <font-awesome-icon v-if="validator.isGenerating" spin :icon="['fas', 'circle-notch']" />
          <font-awesome-icon v-if="proofs[index]" :icon="validationResults && !validationResults[validator.key] ? ['fas', 'exclamation-triangle'] : ['fas', 'check']" />
           {{ validator.label }}
        </template>

        <div v-if="proofs[index]">
          <div v-if="validationResults && validationResults[validator.key] === true">
            <div><small>Integrity: <br><span class="text-white">Verified & Intact</span></small></div>
          </div>

          <div v-if="validationResults && validationResults[validator.key] === false">
            <div><small>Integrity: <br>
            <font-wesome-icon :icon="['fas', 'exclamation-triangle']" /><span class="text-white">Tampered</span></small></div>
          </div>

          <div><small>Time: <br><span class="text-white">{{ new Date(proofs[index].signed.timestamp) }}</span></small></div>
          <div><small>Hash: <br><span class="text-white">{{ convertToString(proofs[index].hash) }}</span></small></div>
          <div class="pb-3"><small>Signature: <br><span class="text-white">{{ convertToString(proofs[index].signature) }}</span></small></div>
          <iframe sandbox class="iframe" v-if="diffs[index]" :srcDoc="baseUrlCorrection(diffs[index])" />
          <iframe sandbox class="iframe" v-if="!diffs[index]" :srcDoc="baseUrlCorrection(proofs[index])" />
        </div>
      </b-tab>
    </b-tabs>

</div>
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
  props: {
    'proofs': Array,
    'current': Object,
    'isGenerating': { type: Boolean, default: false },
    'validationResults': Object,
    'diffs': { type: Array, default: () => [] }
  },
  computed: {
    validators() {
      return validationService.validators
    }
  },
  methods: {
    baseUrlCorrection(proof) {
      return proof.signed.source.insert(proof.signed.source.indexOf('<head>'), `<base href="${proof.url}" />`)
    },
    convertToString(arrayBuffer) {
      return buf2hex(new Uint8Array(arrayBuffer).buffer)
    }
  }
};
</script>

<style lang="scss">
@import '../custom.scss';

.tampered {
  background: theme-color('danger') !important;
}

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

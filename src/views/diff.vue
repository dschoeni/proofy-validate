<template>
    <b-tabs content-class="mt-3">
      <b-tab v-for="(proof, index) in proofs" :key="proof.validator" :title="proof.validator">
        <iframe class="iframe" v-if="diffs[index]" :srcDoc="baseUrlCorrection(diffs[index])" />
        <iframe class="iframe" v-if="!diffs[index]" :srcDoc="baseUrlCorrection(proof)" />
      </b-tab>
    </b-tabs>
</template>

<script>
import HtmlDiff from 'htmldiff-js'

String.prototype.insert = function (index, string) {
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};

export default {
  name: "Diff",
  props: ['proofs', 'current'],
  methods: {
    baseUrlCorrection(proof) {
      return proof.signed.source.insert(proof.signed.source.indexOf('<head>'), `<base href="${proof.url}" />`)
    }
  },
  computed: {
    diffs() {
      return this.proofs.map(proof => {
        if (!this.current) {
          return null
        }

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

<style scoped>
.iframe {
  width: 100%;
  min-height: 300px;
  border: 1px solid green;
}

</style>

<template>
    <b-tabs content-class="mt-3">
      <b-tab :title="proof.validator" v-for="proof in proofs" :key="proof.validator">
        <iframe class="iframe" v-if="diffs[proof.validator]" :srcDoc="diffs[proof.validator]" />
        <iframe class="iframe" v-if="!diffs[proof.validator]" :srcDoc="proof.signed.source" />
      </b-tab>
    </b-tabs>
</template>

<script>
import HtmlDiff from 'htmldiff-js'
import proof from './proof.json'

export default {
  name: "Diff",
  props: ['proofs', 'current'],
  watch: {
    current(current) {
      if (this.$props.current) {
        this.diff()
      }
    }
  },
  methods: {
    async diff() {
      this.$props.proofs.forEach(proof => {
        this.diffs[proof.validator] = HtmlDiff.execute(this.$props.current.signed.source, proof.signed.source)

        this.diffs[proof.validator] += `
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
      })
    }
  },
  data() {
    return {
      diffs: {}
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

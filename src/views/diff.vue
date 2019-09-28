<template>
  <div class="row">
    <button @click="diff">Diff </button>

    <iframe class="iframe" v-if="diffHtml" :srcDoc="diffHtml" />
  </div>
</template>

<script>
import HtmlDiff from 'htmldiff-js'
import proof from './proof.json'

export default {
  name: "Diff",
  methods: {
    diff() {
      const html1 = proof[0].signed.source
      const html2 = proof[1].signed.source

      const doc1 = new Document(html1)
      const doc2 = new Document(html2)

      this.diffHtml = HtmlDiff.execute(doc1, doc2);

      console.log(this.diffHtml, HtmlDiff)
    }
  },
  data() {
    return {
      diffHtml: null
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

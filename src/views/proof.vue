<template>
  <div>
      <div class="d-flex flex-column align-items-center">
        <div class="col-10">
        
        <b-form-input v-model="url" placeholder="Enter URL to notarize"></b-form-input>

        <button class="btn btn-primary my-4" :disabled="!url" @click="notarize(url)">Notarize</button>

        </div>
        <div class="col-12">
          <iframe :srcdoc="fileSrc" class="iframe"></iframe>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: "Notarize",
  methods: {
    async notarize(url) {
      
    }
  },
  data() {
    return {
      url: null
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

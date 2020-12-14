<template>
  <div class="source-code">
    <p>Source code:</p>
    <a
      href="https://github.com/energywebfoundation/iam-client-lib/tree/develop/examples/vue-dapp"
    >
      <img src="../assets/GitHub-Mark-32px.png" />
    </a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SourceCode"
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.source-code {
  display: flex;
  position: fixed;
  right: 0;
  top: 0;

  img {
    margin: 10px;
  }
}
</style>
